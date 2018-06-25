const path = require('path');

const del = require('del');
const gulp = require('gulp');

const BACKEND_STATIC_REPO = path.join('..', 'disclosure-backend-static');

function dataDir(...pathParts) {
  return path.join(BACKEND_STATIC_REPO, 'build', ...pathParts);
}

gulp.task('clean', function () {
  return del([
    '_referendums',
    '_data/candidates',
    '_data/committees',
    '_data/contributions',
    '_data/referendum_opposing',
    '_data/referendum_supporting',
  ]);
});

gulp.task('pull:referendums', function () {
  return gulp.src(dataDir('_referendums', '**', '*.md'))
    .pipe(gulp.dest('_referendums'));
});

gulp.task('pull:candidates', function () {
  return gulp.src(dataDir('_data', 'candidates', '*.json'))
    .pipe(gulp.dest('_data/candidates'));
});

gulp.task('pull:committees', function () {
  return gulp.src(dataDir('_data', 'committees', '*.json'))
    .pipe(gulp.dest('_data/committees'));
});

gulp.task('pull:referendum_opposing', function () {
  return gulp.src(dataDir('_data', 'referendum_opposing', '**', '*.json'))
    .pipe(gulp.dest('_data/referendum_opposing'));
});

gulp.task('pull:referendum_supporting', function () {
  return gulp.src(dataDir('_data', 'referendum_supporting', '**', '*.json'))
    .pipe(gulp.dest('_data/referendum_supporting'));
});

gulp.task('pull', gulp.parallel(
  'pull:candidates',
  'pull:committees',
  'pull:referendums',
  'pull:referendum_opposing',
  'pull:referendum_supporting',
));
