const { Transform } = require('stream');
const path = require('path');
const gulp = require('gulp');
const jsonToYaml = require('gulp-json-to-yaml');
const header = require('gulp-header');
const footer = require('gulp-footer');
const ext = require('gulp-ext');

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
  return (text || '').toLowerCase().replace(/[\.']+/g, '').replace(/[^a-z0-9-]+/g, '-');
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

function append(field) {
  return new Transform({
    objectMode: true,
    transform(file, enc, callback) {
      file.contents = Buffer.concat([file.contents, new Buffer(file[field] || '')]);

      this.push(file);
      callback();
    },
  });
}

function extract(field) {
  return new Transform({
    objectMode: true,
    transform(file, enc, callback) {
      const data = JSON.parse(file.contents);
      file[field] = data[field];

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

gulp.task('pull:candidates', function () {
  return gulp.src(dataDir('candidate', '*', 'index.json'))
    .pipe(extract('bio'))
    .pipe(slugifyName((data) => `${slugify(data.name)}.json`))
    .pipe(jsonToYaml({ safe: true }))
    .pipe(header('---\n'))
    .pipe(footer('---\n'))
    .pipe(ext.replace('md'))
    .pipe(append('bio'))
    .pipe(gulp.dest('_candidates'));
});

gulp.task('pull:committees', function () {
  return gulp.src('../disclosure-backend-static/build/committee/*/index.json')
    .pipe(slugifyName((data) => `${data.filer_id}.json`))
    .pipe(jsonToYaml({ safe: true }))
    .pipe(header('---\n'))
    .pipe(footer('---\n'))
    .pipe(ext.replace('md'))
    .pipe(gulp.dest('_committees'));
});

gulp.task('pull:contributions', function () {
  return gulp.src('../disclosure-backend-static/build/committee/*/contributions/index.json')
    .pipe(contributions())
    .pipe(gulp.dest('_data/contributions'));
});

gulp.task('pull:referendums', function () {
  return gulp.src(dataDir('referendum', '*', 'index.json'))
    .pipe(extract('summary'))
    .pipe(slugifyName((data) => {
      const election = guessElection(data);
      return `oakland/${election}/${slugify(data.title)}.json`
    }))
    .pipe(jsonToYaml({ safe: true }))
    .pipe(header('---\n'))
    .pipe(footer('---\n'))
    .pipe(ext.replace('md'))
    .pipe(append('summary'))
    .pipe(gulp.dest('_referendums'));
});

gulp.task('pull:referendums_opposing', function () {
  return gulp.src(dataDir('referendum', '*', 'opposing', 'index.json'))
    .pipe(slugifyName((data) => {
      const election = guessElection(data);
      return `oakland/${election}/${slugify(data.title)}.json`
    }))
    .pipe(jsonToYaml({ safe: true }))
    .pipe(header('---\n'))
    .pipe(footer('---\n'))
    .pipe(ext.replace('md'))
    .pipe(gulp.dest('_referendum_opposing'));
});

gulp.task('pull:referendums_supporting', function () {
  return gulp.src(dataDir('referendum', '*', 'supporting', 'index.json'))
    .pipe(slugifyName((data) => {
      const election = guessElection(data);
      return `oakland/${election}/${slugify(data.title)}.json`
    }))
    .pipe(jsonToYaml({ safe: true }))
    .pipe(header('---\n'))
    .pipe(footer('---\n'))
    .pipe(ext.replace('md'))
    .pipe(gulp.dest('_referendum_supporting'));
});

gulp.task('pull', gulp.parallel(
  'pull:candidates',
  'pull:committees',
  'pull:contributions',
  'pull:referendums',
  'pull:referendums_opposing',
  'pull:referendums_supporting'
));
