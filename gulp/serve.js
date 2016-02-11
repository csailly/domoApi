"use strict";

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var path = require('path');

gulp.task('start', ['lint'], function () {
  nodemon({
    script: paths.app + '/app.js',
    verbose: true,
    ignore: ['**/*spec.js', 'store/', '.idea/'],
    ext: 'js',
    watch: paths.app,
    tasks: function (changedFiles) {
      var tasks = [];
      changedFiles.forEach(function (file) {
        if (path.extname(file) === '.js' && !tasks.indexOf('lint') > -1) {
          tasks.push('lint');
        }
      });
      return tasks;
    }
  })
    .on('restart', function () {
      console.log('restarted!');
    });
});
