/* @file Gulpfile */

var gulp = require('gulp');
var del = require('del');
var jade = require('gulp-jade');
var less = require('gulp-less');
var uglify = require('gulp-uglify');

var buildFolder = './build';

gulp.task('build', [
    'clean',
    'compile:jade',
    'compile:less',
    'compile:js',
    'compile:libraries',
    'compile:static'
]);

// Delete Auto-generated files
gulp.task('clean', function(){
    del([
        './src/**/*.css',
        './build/**/*'
    ]);
});

// Compile Jade Files
gulp.task('compile:jade', function(){
    gulp.src('./src/**/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(buildFolder));
});

// Compile Less Files
gulp.task('compile:less', function(){
    gulp.src('./src/**/*.less')
        .pipe(less())
        .pipe(gulp.dest(buildFolder));
});

// Compile Javascript Files
gulp.task('compile:js', function () {
    gulp.src('./src/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(buildFolder));
});

// Compile Libraries
gulp.task('compile:libraries', function(){
    // Copy Bower packages to libraries
    gulp.src([
        './bower_components/**/*.js',
        './bower_components/**/*.css',
        './bower_components/**/*.eot',
        './bower_components/**/*.ttf',
        './bower_components/**/*.woff',
        './bower_components/**/*.woff2',
        './bower_components/**/*.less',
        './bower_components/**/*.json',
        './bower_components/**/*.map'
    ]).pipe(gulp.dest(buildFolder + '/libraries'));
});

// Copy static files into build
gulp.task('compile:static', function(){
    gulp.src('./src/static/**/*').pipe(gulp.dest(buildFolder + '/static'));
});

gulp.task('default', ['build']);