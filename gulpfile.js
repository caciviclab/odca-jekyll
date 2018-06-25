const { Transform } = require('stream');
const path = require('path');

const del = require('del');
const gulp = require('gulp');

const backendStaticRepoPath = process.env.BACKEND_STATIC_REPO || path.resolve('..', 'disclosure-backend-static');

const loader = require('./gulp/data-loader')(backendStaticRepoPath);

const OAKLAND_2016_REFERENDUM_NUMBERS = ['g1', 'hh', 'ii', 'jj', 'kk', 'll'];
const OAKLAND_REFERENDUM_ELECTION_MAP = {
  'g1': '2016-11-08',
  'hh': '2016-11-08',
  'ii': '2016-11-08',
  'jj': '2016-11-08',
  'kk': '2016-11-08',
  'll': '2016-11-08',
  'd': '2018-06-05',
  'tbd1': '2018-11-06',
  'tbd2': '2018-11-06',
};

function guessElection (data) {
  const number = data.number && data.number.toLowerCase();
  return number in OAKLAND_REFERENDUM_ELECTION_MAP ?  OAKLAND_REFERENDUM_ELECTION_MAP[number] : '2018-11-06';
}

function dataDir(...pathParts) {
  return path.join(backendStaticRepoPath, 'build', ...pathParts);
}


function slugify(text) {
  return (text || '').toLowerCase().replace(/[\._~!$&'()+,;=@]+/g, '').replace(/[^a-z0-9-]+/g, '-');
}

function candidatePath(candidate) {
  const officeElection = loader.officeElection(candidate.office_election);
  const ballot = loader.ballot(officeElection.ballot_id);

  // Backend serializes localities as arrays
  const locality = loader.locality(ballot.locality_id)[0];

  return path.join(slugify(locality.name), ballot.date, `${slugify(candidate.name)}.json`);
}

function transformPath(fn) {
  return new Transform({
    objectMode: true,
    transform(file, enc, callback) {
      const data = JSON.parse(file.contents);
      const newPath = fn(data);

      file.path = path.join(file.base, newPath);
      this.push(file);
      callback();
    },
  });
}

function contributions() {
  return new Transform({
    objectMode: true,
    transform(file, enc, callback) {
      // Rename the file
      const match = /\/committee\/(.+)\/contributions\//.exec(file.path);
      const filerId = match[1];
      file.path = path.join(file.base, `${filerId}.json`);

      // Restructure into an object
      const contributions = JSON.parse(file.contents);
      file.contents = new Buffer(JSON.stringify({ contributions }, null, 2));

      this.push(file);
      callback();
    },
  });
}

gulp.task('clean', function () {
  return del([
    '_data/candidates',
    '_data/contributions',
    '_data/referendum_opposing',
    '_data/referendum_supporting',
  ]);
});

gulp.task('pull:candidates', function () {
  return gulp.src(dataDir('candidate', '*', 'index.json'))
    .pipe(transformPath(candidatePath))
    .pipe(gulp.dest('_data/candidates'));
});

gulp.task('pull:contributions', function () {
  return gulp.src(dataDir('committee', '*', 'contributions', 'index.json'))
    .pipe(contributions())
    .pipe(gulp.dest('_data/contributions'));
});

gulp.task('pull:referendum_opposing', function () {
  return gulp.src(dataDir('referendum', '*', 'opposing', 'index.json'))
    .pipe(transformPath((data) => {
      const election = guessElection(data);
      return `oakland/${election}/${slugify(data.title)}.json`
    }))
    .pipe(gulp.dest('_data/referendum_opposing'));
});

gulp.task('pull:referendum_supporting', function () {
  return gulp.src(dataDir('referendum', '*', 'supporting', 'index.json'))
    .pipe(transformPath((data) => {
      const election = guessElection(data);
      return `oakland/${election}/${slugify(data.title)}.json`
    }))
    .pipe(gulp.dest('_data/referendum_supporting'));
});

gulp.task('pull', gulp.parallel(
  'pull:candidates',
  'pull:contributions',
  'pull:referendum_opposing',
  'pull:referendum_supporting',
));
