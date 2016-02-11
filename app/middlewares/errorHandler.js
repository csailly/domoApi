'use strict';

function errorHandler(err, req, res) {
  console.error('----------errorHandler----------');
  res.status(500).send({error: err.toString()});
}

module.exports = errorHandler;
