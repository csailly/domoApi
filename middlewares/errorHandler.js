'use strict';

function errorHandler(err, req, res, next) {
  res.status(500);
  res.send("An error occured !");
  //res.render('error', { error: err });
}

module.exports = errorHandler;
