/* @file Gulpfile */

var gulp = require('gulp');
var jade = require('gulp-jade');
var less = require('gulp-less');
var uglify = require('gulp-uglify');

var buildFolder = './build';

gulp.task('default', function () {
    // Compile Jade Files
    gulp.src('./src/**/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(buildFolder));

    // Compile Less Files
    gulp.src('./src/**/*.less')
        .pipe(less())
        .pipe(gulp.dest(buildFolder));

    // Compress and Copy Javascript Files
    gulp.src('./src/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(buildFolder));

    // Copy Bower packages to p
    gulp.src([
            './bower_components/**/*.js',
            './bower_components/**/*.css',
            './bower_components/**/*.eot',
            './bower_components/**/*.ttf',
            './bower_components/**/*.woff',
            './bower_components/**/*.woff2',
            './bower_components/**/*.less',
            './bower_components/**/*.json',
            './bower_components/**/*.map',
    ])
        .pipe(gulp.dest(buildFolder + '/libraries'));
});