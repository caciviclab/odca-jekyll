const path = require('path');

const del = require('del');
const gulp = require('gulp');

const BACKEND_STATIC_REPO = path.join('..', 'disclosure-backend-static');

function dataDir(...pathParts) {
  return path.join(BACKEND_STATIC_REPO, 'build', ...pathParts);
}

gulp.task('clean', function () {
  return del([
    '_ballots',
    '_elections',
    '_candidates',
    '_office_elections',
    '_committees',
    '_referendums',
    '_data/candidates',
    '_data/committees',
    '_data/elections',
    '_data/referendum_opposing',
    '_data/referendum_supporting',
    '_data/stats.json',
  ]);
});

gulp.task('pull:ballots', function () {
  return gulp.src(dataDir('_ballots', '**', '*.md'))
    .pipe(gulp.dest('_ballots'));
});

gulp.task('pull:elections', function () {
  return gulp.src(dataDir('_elections', '**', '*.md'))
    .pipe(gulp.dest('_elections'));
});

gulp.task('pull:elections-totals', function () {
  return gulp.src(dataDir('_data', 'elections', '**', '*.json'))
    .pipe(gulp.dest('_data/elections'));
})

gulp.task('pull:referendums', function () {
  return gulp.src(dataDir('_referendums', '**', '*.md'))
    .pipe(gulp.dest('_referendums'));
});

gulp.task('pull:referendums', function () {
  return gulp.src(dataDir('_referendums', '**', '*.md'))
    .pipe(gulp.dest('_referendums'));
});

gulp.task('pull:candidates-finance', function () {
  return gulp.src(dataDir('_data', 'candidates', '**', '*.json'))
    .pipe(gulp.dest('_data/candidates'));
});

gulp.task('pull:candidates', function () {
  return gulp.src(dataDir('_candidates', '**', '*.md'))
    .pipe(gulp.dest('_candidates'));
});

gulp.task('pull:committees', function () {
  return gulp.src(dataDir('_committees', '**', '*.md'))
    .pipe(gulp.dest('_committees'));
});

gulp.task('pull:committees-finance', function () {
  return gulp.src(dataDir('_data', 'committees', '*.json'))
    .pipe(gulp.dest('_data/committees'));
});

gulp.task('pull:office_elections', function () {
  return gulp.src(dataDir('_office_elections', '**', '*.md'))
    .pipe(gulp.dest('_office_elections'));
});

gulp.task('pull:referendum_opposing', function () {
  return gulp.src(dataDir('_data', 'referendum_opposing', '**', '*.json'))
    .pipe(gulp.dest('_data/referendum_opposing'));
});

gulp.task('pull:referendum_supporting', function () {
  return gulp.src(dataDir('_data', 'referendum_supporting', '**', '*.json'))
    .pipe(gulp.dest('_data/referendum_supporting'));
});

gulp.task('pull:stats', function () {
  return gulp.src(dataDir('_data', 'stats.json'))
    .pipe(gulp.dest('_data'));
});
gulp.task('pull:totals', function () {
  return gulp.src(dataDir('_data', 'totals.json'))
    .pipe(gulp.dest('_data'));
});


gulp.task('pull', gulp.parallel(
  'pull:ballots',
  'pull:elections',
  'pull:elections-totals',
  'pull:candidates',
  'pull:candidates-finance',
  'pull:committees',
  'pull:committees-finance',
  'pull:office_elections',
  'pull:referendums',
  'pull:referendum_opposing',
  'pull:referendum_supporting',
  'pull:stats',
  'pull:totals',
));
