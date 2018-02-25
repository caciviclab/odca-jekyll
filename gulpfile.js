const { Transform } = require('stream');
const path = require('path');
const gulp = require('gulp');
const jsonToYaml = require('gulp-json-to-yaml');
const header = require('gulp-header');
const footer = require('gulp-footer');
const ext = require('gulp-ext');

const BACKEND_STATIC_REPO = path.join('..', 'disclosure-backend-static');

function dataDir(...pathParts) {
  return path.join(BACKEND_STATIC_REPO, 'build', ...pathParts);
}


function slugify(text) {
  return (text || '').toLowerCase().replace(/[^a-z0-9-]+/g, '-');
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

gulp.task('pull:referendums', function () {
  return gulp.src(dataDir('referendum', '*', 'index.json'))
    .pipe(extract('summary'))
    .pipe(slugifyName((data) => `oakland/2016-11-08/${slugify(data.number)}.json`))
    .pipe(jsonToYaml({ safe: true }))
    .pipe(header('---\n'))
    .pipe(footer('---\n'))
    .pipe(ext.replace('md'))
    .pipe(append('summary'))
    .pipe(gulp.dest('_referendums'));
});

gulp.task('pull:referendums:opposing', function () {
  return gulp.src(dataDir('referendum', '*', 'opposing', 'index.json'))
    .pipe(slugifyName((data) => `oakland/2016-11-08/${slugify(data.number)}.json`))
    .pipe(gulp.dest(path.join('_data', 'referendum_opposing')));
});

gulp.task('pull:referendums:supporting', function () {
  return gulp.src(dataDir('referendum', '*', 'supporting', 'index.json'))
    .pipe(slugifyName((data) => `oakland/2016-11-08/${slugify(data.number)}.json`))
    .pipe(gulp.dest(path.join('_data', 'referendum_supporting')));
});

gulp.task('pull', gulp.parallel(
  'pull:candidates',
  'pull:referendums',
  'pull:referendums:opposing',
  'pull:referendums:supporting'
));
