'use strict';

var model = require('../models').Parameter;
var Q = require('q');

module.exports = {
  findAll: findAll,
  findById: findById,
  update: update
};

//---------------------------
function findAll() {
  return model.findAll();
}

function findById(id) {
  return model.find({
      where: {
        code: id
      }
    });
}

function update(id, entity) {
  return model.find({
      where: {
        code: id
      }
    })
    .then(function (parameter) {
      if (parameter !== null) {
        return parameter.update(entity);
      }
        return Q.when();

    });
}
