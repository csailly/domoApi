"use strict";

var gulp = require('gulp');

var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');

gulp.task('test', function () {
  gulp.src([paths.app + '/**/*.js', '!' + paths.app + '/**/*.spec.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(paths.app + '/**/*.spec.js', {read: false})
        .pipe(mocha({reporter: 'nyan'}))
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({thresholds: {global: 90}}))
        .once('error', function (err) {
          console.log(err);
          process.exit(1);
        })
        .once('end', function (err) {
          console.log(err);
          process.exit();
        });
    })

});
