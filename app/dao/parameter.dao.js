'use strict';

var model = require('../models').Parameter;

module.exports = {
  findAll: findAll,
  findById: findById,
  update: update
};

//---------------------------
function findAll() {
  return model.findAll()
    .then(function (parameters) {
      return parameters;
    });
}

function findById(id) {
  return model.find({
    where: {
      code: id
    }
  })
    .then(function (parameter) {
      return parameter;
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
        return parameter.update(entity)
          .then(function (parameter) {
            return parameter;
          });
      } else {
        return null;
      }
    });
}
