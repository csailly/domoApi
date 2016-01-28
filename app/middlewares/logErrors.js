'use strict';

function logErrors(err, req, res, next) {
  if (typeof err === 'string') {
    err = new Error(err);
  }
  console.error('logErrors', err.toString());
  next(err);
}

module.exports = logErrors;
