const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const browserSync = require('browser-sync');

const conf = require('./conf/gulp.conf');

// Load some files into the registry
const hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('build', gulp.series('clean', gulp.parallel('other', 'webpack:dist')));
gulp.task('serve', gulp.series('webpack:watch', 'watch', 'browsersync'));
gulp.task('serve:dist', gulp.series('build', 'browsersync:dist'));
gulp.task('default', gulp.series('build'));
gulp.task('watch', watch);

function reloadBrowserSync(done) {
  browserSync.reload();
  done();
}

function watch(done) {
  gulp.watch(conf.path.tmp('index.html'), reloadBrowserSync);
  gulp.watch(conf.path.src('**/*.json'), reloadBrowserSync);
  done();
}
