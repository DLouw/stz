var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var pug = require('gulp-pug');
var beautify = require('gulp-html-beautify');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');

// Compiles SCSS files from /scss into /css
gulp.task('sass', function() {
  return gulp.src('app/scss/*.scss')
    .pipe(sass())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify compiled CSS
gulp.task('minify-css', ['sass'], function() {
  return gulp.src('app/css/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minify custom JS
gulp.task('minify-js', function() {
  return gulp.src('app/js/*.js')
    .pipe(uglify())
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Compiles Pug files from /pug into the root folder and beautifies the HTML
gulp.task('pug', function buildHTML() {
  return gulp.src('app/pug/*.pug')
    .pipe(pug())
    .pipe(beautify())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Copy vendor files from /node_modules into /vendor
gulp.task('copy', function() {

  //Images
  gulp.src(['app/img/**/*'])
    .pipe(gulp.dest('dist/img'))

  //Bootstrap
  gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap/dist/js/bootstrap.min.js'
    ])
    .pipe(gulp.dest('dist/vendor/bootstrap'))

  //Jquery
  gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(gulp.dest('dist/vendor/jquery'))

  gulp.src(['node_modules/jquery.easing/*.js'])
    .pipe(gulp.dest('dist/vendor/jquery-easing'))

  // Font Awesome
  gulp.src([
      './node_modules/@fortawesome/fontawesome-free/*css/all.css',
      './node_modules/@fortawesome/fontawesome-free/*webfonts/**/*'
    ])
    .pipe(gulp.dest('dist/vendor/font-awesome'))

  gulp.src(['node_modules/simple-line-icons/*/*'])
    .pipe(gulp.dest('dist/vendor/simple-line-icons'))
  
  //Slick
  gulp.src(['node_modules/slick-carousel/slick/slick.min.js',
           'node_modules/slick-carousel/slick/slick.css',
           'node_modules/slick-carousel/slick/slick-theme.css'])
    .pipe(gulp.dest('dist/vendor/slick-carousel'))
  
  //Slick-lightbox
  gulp.src(['node_modules/slick-lightbox/dist/slick-lightbox.min.js',
           'node_modules/slick-lightbox/dist/slick-lightbox.css'])
    .pipe(gulp.dest('dist/vendor/slick-lightbox'))
    
    //PHP Mailer
  gulp.src(['app/serverside/PHPMailer-master/src/*.php'])
    .pipe(gulp.dest('dist/serverside/PHPMailer'))
  
  //Serverside scripts
  gulp.src(['app/serverside/*.php'])
    .pipe(gulp.dest('dist/serverside/'))

});

// Default task
gulp.task('default', ['sass', 'minify-css', 'minify-js', 'pug','copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  })
});

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'sass', 'minify-css', 'minify-js', 'pug'], function() {
  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('app/pug/**/*', ['pug']);
  gulp.watch('app/css/*.css', ['minify-css']);
  gulp.watch('app/js/*.js', ['minify-js']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});
