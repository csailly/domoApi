'use strict';

var Q = require('q');
var parameterDao = require('../dao/parameter.dao');

module.exports = {
  update: update,
  findAll: findAll,
  findById: findById
};


//---------------------------
function findById(id) {
  var deferred = Q.defer();

  parameterDao.findById(id)
    .then(function (parameter) {
      deferred.resolve(parameter);
    })
    .catch(function (e) {
      deferred.reject(e);
    });

  return deferred.promise;
}

function update(id, newType, newValue, newDescription, newValues) {
  var deferred = Q.defer();

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


  parameterDao.update(id, entity)
    .then(function (updatedEntity) {
      deferred.resolve(updatedEntity);
    })
    .catch(function (e) {
      deferred.reject(e);
    });

  return deferred.promise;
}

function findAll() {
  var deferred = Q.defer();

  parameterDao.findAll()
    .then(function (parameters) {
      deferred.resolve(parameters);
    })
    .catch(function (e) {
      deferred.reject(e);
    });

  return deferred.promise;
}
