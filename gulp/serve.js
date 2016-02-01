"use strict";

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('serve:dev', ['lint'], function () {
  nodemon({
    script: paths.app + '/app.js',
    verbose: true,
    ext: 'js', tasks: ['lint'],
    ignore: ['**/*spec.js', '.idea']
  })
    .on('restart', function () {
      console.log('restarted!');
    });
});
