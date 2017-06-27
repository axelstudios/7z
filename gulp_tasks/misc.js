const path = require('path');

const gulp = require('gulp');
const del = require('del');
const filter = require('gulp-filter');
const jsonminify = require('gulp-jsonminify');

const conf = require('../conf/gulp.conf');

gulp.task('clean', clean);
gulp.task('other', other);

function clean() {
  return del([conf.paths.dist, conf.paths.tmp]);
}

function other() {
  const fileFilter = filter(file => file.stat.isFile());
  const jsonFilter = filter('**/*.json', {restore: true});

  return gulp.src([
    path.join(conf.paths.src, '/**/*'),
    path.join(`!${conf.paths.src}`, '/**/*.{scss,js,html}')
  ])
    .pipe(fileFilter)
    .pipe(jsonFilter)
    .pipe(jsonminify())
    .pipe(jsonFilter.restore)
    .pipe(gulp.dest(conf.paths.dist));
}
