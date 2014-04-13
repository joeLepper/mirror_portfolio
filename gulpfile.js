var gulp     = require('gulp')
, browserify = require('gulp-browserify')
, plumber    = require('gulp-plumber')
, rename     = require('gulp-rename')
, livereload = require('gulp-livereload')
, uglify     = require('gulp-uglify');

// Concatenate & Minify JS
gulp.task('bundle', function() {
  return gulp.src('src/index.js')
  .pipe(plumber())
  .pipe(browserify({
    debug: true,
    transform: ['browserify-shim', 'brfs']
  }))
  // .pipe(uglify())
  .pipe(rename('bundle.js'))
  .pipe(gulp.dest('app/js'))
  .pipe(livereload());
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['bundle']);
});

//default task
gulp.task('default', ['bundle', 'watch']);
