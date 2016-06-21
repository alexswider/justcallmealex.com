// Load Gulp
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    image = require('gulp-image'),
    notify = require("gulp-notify"),
    plugins = require('gulp-load-plugins')({
        rename: {
            'gulp-live-server': 'serve'
        }
    });

// Start default: Run "gulp"
gulp.task('default', ['build-images','build-js','build-html','squish-jquery','greensock','build-json','build-less','watch']);

// Run "gulp server"
gulp.task('server', ['serve', 'watch']);

// Minify jQuery Plugins: Run manually with: "gulp squish-jquery"
gulp.task('squish-jquery', function () {
    return gulp.src('src/assets/js/libs/**/*.js')
        .pipe(plugins.uglify({
            output: {
                'ascii_only': true
            }
        }))
        .pipe(plugins.concat('jquery.plugins.min.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('build-html',function(){
    return gulp.src('src/assets/**/*.html')
        .pipe(gulp.dest("build"))
});

gulp.task('greensock',function(){
    return gulp.src('src/assets/js/greensock/minified/**/*')
        .pipe(gulp.dest("build/js/greensock/minified/"))
});





//images optimalization tool
gulp.task('build-images', function(){
  return gulp.src('src/assets/images/**/*.png')
  // Caching images that ran through imagemin
  .pipe(image({
      pngquant: true,
      optipng: false,
      zopflipng: true,
      advpng: true,
      jpegRecompress: false,
      jpegoptim: true,
      mozjpeg: true,
      gifsicle: true,
      svgo: true
    }))
  .pipe(gulp.dest('build/images'))
});

// svg optimalization tool
gulp.task('build-svg', function(){
  return gulp.src('src/assets/images/svg/*')
  // Caching images that ran through imagemin
  .pipe(gulp.dest('build/images/svg'))
});


// Minify Custom JS: Run manually with: "gulp build-js"
gulp.task('build-js', function () {
    return gulp.src('src/assets/js/*.js')
        
        .pipe(plugins.jshint())
        // Use gulp-notify as jshint reporter 
        .pipe(notify(function (file) {
          if (file.jshint.success) {
            // Don't show something if success 
            return false;
          }
     
          var errors = file.jshint.results.map(function (data) {
            if (data.error) {
              return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
            }
          }).join("\n");
          return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
        }))
        .pipe(plugins.uglify({
            output: {
                'ascii_only': true
            }
        }))
        .pipe(plugins.concat('scripts.min.js'))
        .pipe(gulp.dest('build/js'));
});

//copy css and minimize
gulp.task('build-css',function(){
    return gulp.src('src/assets/css/**')
        .pipe(plugins.cssmin())
        .pipe(gulp.dest('build/css')).on('error',gutil.log);
});

//copy json and minimize
gulp.task('build-json', function () {
    return gulp.src(['src/assets/json/*.json'])
        .pipe(plugins.jsonminify())
        .pipe(gulp.dest('build/json')).on('error',gutil.log);
});

// Less to CSS: Run manually with: "gulp build-less"
gulp.task('build-less', function () {
    return gulp.src('src/assets/less/*.less')
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(plugins.autoprefixer({
            browsers: [
                    '> 1%',
                    'last 2 versions',
                    'firefox >= 4',
                    'safari 7',
                    'safari 8',
                    'IE 8',
                    'IE 9',
                    'IE 10',
                    'IE 11'
                ],
            cascade: false
        }))
        .pipe(plugins.cssmin())
        .pipe(gulp.dest('build/css')).on('error', gutil.log);
});

// Default task
gulp.task('watch', function () {
    gulp.watch('src/assets/js/libs/**/*.js', ['squish-jquery']);
    gulp.watch('src/assets/js/greensock/magnified/**/*', ['greensock']);
    gulp.watch('src/assets/js/*.js', ['build-js']);
    gulp.watch('src/assets/less/**/*.less', ['build-less']);
    gulp.watch('src/assets/**/*.html', ['build-html']);
    gulp.watch('src/assets/images/**/*', ['build-images']);
    gulp.watch('src/assets/css/*', ['build-css']);
    gulp.watch('src/assets/json/*', ['build-json']);
    gulp.watch('src/assets/images/svg/*.svg', ['build-svg']);

});

// Folder "/" serving at http://localhost:8888
// Should use Livereload (http://livereload.com/extensions/)
gulp.task('serve', function () {
    var server = plugins.serve.static('build/', 8888);
    server.start();
    gulp.watch(['build/**/*'], function (file) {
        server.notify.apply(server, [file]);
    });
});