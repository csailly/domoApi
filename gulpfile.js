/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are splitted in several files in the gulp directory
 *  because putting all here was really too long
 */

'use strict';

var gulp = require('gulp');
var wrench = require('wrench');

global.paths = {
  gulp: __dirname + '/gulp',
  app: __dirname + '/app'
};

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive(paths.gulp).filter(function (file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function (file) {
  require(paths.gulp + '/' + file);
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', function () {
  gulp.start('serve:dev');
});
