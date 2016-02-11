'use strict';

function clientErrorHandler(err, req, res, next) {
  console.error('----------clientErrorHandler----------');
  if (req.xhr) {
    console.error('clientErrors response');
    res.status(500).json({error: err.toString()});
  } else {
    next(err);
  }
}

module.exports = clientErrorHandler;
