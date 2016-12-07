'use strict';

var es6promise = require('es6-promise')
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    rename = require("gulp-rename"),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    webserver = require('gulp-webserver');


/***********
*** SASS ***
************/
gulp.task('sass', function () {
    console.log('COMPILING SASS');
    return gulp.src('./sass/**/*.scss')
        .pipe(plumber(function (error) {
            console.log('sass error: compile plumber', error);
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Explorer >= 10', 'Android >= 4.1', 'Safari >= 7', 'iOS >= 7'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest('./css'))
        // minify
        .pipe(cssmin())
		.pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./css'));
});


/*****************
*** SASS WATCH ***
******************/
gulp.task('sass:watch', function () {
    var watcher = gulp.watch('./sass/**/*.scss', ['sass']);
    watcher.on('change', function (e) {
        console.log('watcher.on.change type: ' + e.type + ' path: ' + e.path);
    });
    return watcher;
});


/*********
*** JS ***
**********/
gulp.task('js', function () {
    console.log('MINIFYING JS');
    return gulp.src('./js/main.js')
        // minify
        .pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./js'));
});


/***************
*** JS WATCH ***
****************/
gulp.task('js:watch', function () {
    var watcher = gulp.watch('./js/main.js', ['js']);
    watcher.on('change', function (e) {
        console.log('watcher.on.change type: ' + e.type + ' path: ' + e.path);
    });
    return watcher;
});


/*************
*** IMAGES ***
**************/
<<<<<<< HEAD
gulp.task('images', function () {
    return gulp.src('./img/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('./img'));
=======
gulp.task('images', function () {
    return gulp.src('./img/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('./img'));
>>>>>>> 3d5412465489908939cf7d58a5dc55761137de01
});


/****************
*** WEBSERVER ***
*****************/
gulp.task('webserver', function () {
    return gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            port: 8888,
            open: true
        }));
});


/***************************
*** PUBLISH TO WEBSERVER ***
****************************/
gulp.task('publish', function () {
    gulp.src(['./**/*', '!./node_modules/**/*', '!./**/*.db'])
    .pipe(gulp.dest('W:/cartella/'));
});



/************
*** START ***
*************/
gulp.task('start', ['sass', 'sass:watch']);