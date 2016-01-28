'use strict';

function errorHandler(err, req, res) {
  console.error('lastErrors response');
  res.status(500).send(err.toString());
}

module.exports = errorHandler;
