var gulp       = require('gulp')
  , browserify = require('gulp-browserify')
  , plumber    = require('gulp-plumber')
  , rename     = require('gulp-rename')
  , refresh    = require('gulp-livereload')
  , lr         = require('tiny-lr')
  , lrServer   = lr()



gulp.task('bundle', function () {
  return gulp.src('src/index.js')
  .pipe(plumber())
  .pipe(browserify({ debug: true
                   , transform: ['brfs'] }))
  .pipe(rename('bundle.js'))
  .pipe(gulp.dest('app/js'))
})

gulp.task('client', function () {
  return gulp.src('src/client.js')
  .pipe(plumber())
  .pipe(browserify({ debug: true
                   , transform: ['brfs'] }))
  .pipe(rename('client.js'))
  .pipe(gulp.dest('client/js'))
})

gulp.task('mirror', function () {
  return gulp.src('src/mirror.js')
  .pipe(plumber())
  .pipe(browserify({ debug: true
                   , transform: ['brfs'] }))
  .pipe(rename('mirror.js'))
  .pipe(gulp.dest('app/js'))
  .pipe(refresh(lrServer))
})

gulp.task('refreshCSS', function () {
    return gulp.src('app/css/style.css')
    .pipe(refresh(lrServer))
  })

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(['src/**/*.js', 'app/control_mirror.html'], ['bundle', 'mirror', 'client'])
  gulp.watch('app/css/style.css', ['refreshCSS'])

  lrServer.listen(35729, function (err) {
    if (err) return console.log(err)
  })
})

//default task
gulp.task('default', ['bundle', 'mirror', 'client', 'watch'])
