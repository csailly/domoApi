"use strict";

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');


gulp.task('serve:dev', ['lint'], function () {
  nodemon({ script: './app/app.js'
    , ext: 'js'
    , tasks: ['lint'] })
    .on('restart', function () {
      console.log('restarted!');
    })
});
