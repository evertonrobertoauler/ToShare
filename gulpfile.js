var gulp = require('gulp'),
  bundle = require('gulp-bundle-assets');
 
gulp.task('after:ngc', function() {
  return gulp.src('./bundle.config.js')
    .pipe(bundle())
    .pipe(gulp.dest('./dist/assets'));
});
