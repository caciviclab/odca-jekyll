const { Transform } = require('stream');
const path = require('path');

const del = require('del');
const gulp = require('gulp');

const BACKEND_STATIC_REPO = path.join('..', 'disclosure-backend-static');

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
  return path.join(BACKEND_STATIC_REPO, 'build', ...pathParts);
}


function slugify(text) {
  return (text || '').toLowerCase().replace(/[\._~!$&'()+,;=@]+/g, '').replace(/[^a-z0-9-]+/g, '-');
}

function slugifyName(fn) {
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
    '_data/committees',
    '_data/contributions',
    '_data/referendum_opposing',
    '_data/referendum_supporting',
  ]);
});

gulp.task('pull:candidates', function () {
  return gulp.src(dataDir('candidate', '*', 'index.json'))
    .pipe(slugifyName((data) => `${slugify(data.name)}.json`))
    .pipe(gulp.dest('_data/candidates'));
});

gulp.task('pull:contributions', function () {
  return gulp.src(dataDir('committee', '*', 'contributions', 'index.json'))
    .pipe(contributions())
    .pipe(gulp.dest('_data/contributions'));
});

gulp.task('pull:referendum_opposing', function () {
  return gulp.src(dataDir('referendum', '*', 'opposing', 'index.json'))
    .pipe(slugifyName((data) => {
      const election = guessElection(data);
      return `oakland/${election}/${slugify(data.title)}.json`
    }))
    .pipe(gulp.dest('_data/referendum_opposing'));
});

gulp.task('pull:referendum_supporting', function () {
  return gulp.src(dataDir('referendum', '*', 'supporting', 'index.json'))
    .pipe(slugifyName((data) => {
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
