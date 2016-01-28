'use strict';

var parameterDao = require('../dao/parameter.dao');

module.exports = {
  update: update,
  findAll: findAll,
  findById: findById
};

//---------------------------
function findById(id) {
  return parameterDao.findById(id)
    .then(function (parameter) {
      return parameter;
    });
}

function update(id, newType, newValue, newDescription, newValues) {
  var entity = {};
  if (newType !== undefined) {
    entity.type = newType;
  }
  if (newValue !== undefined) {
    entity.value = newValue;
  }
  if (newDescription !== undefined) {
    entity.description = newDescription;
  }
  if (newValues !== undefined) {
    entity.values = newValues;
  }

  return parameterDao.update(id, entity)
    .then(function (updatedEntity) {
      return updatedEntity;
    });
}

function findAll() {
  return parameterDao.findAll()
    .then(function (parameters) {
      return parameters;
    });
}
