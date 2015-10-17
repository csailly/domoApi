"use strict";

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');

gulp.task('lint', function () {
  gulp.src('./app/**/*.js')
    .pipe(jshint())
});

gulp.task('develop', ['lint'], function () {
  nodemon({ script: './app.js'
    , ext: 'js'
    , tasks: ['lint'] })
    .on('restart', function () {
      console.log('restarted!')
    })
});
