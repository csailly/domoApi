'use strict';

var models = require('../models');
var Q = require('q');

module.exports = {
  findAll: findAll,
  create: create,
  findById: findById,
  update: update,
  delete: _delete
};

function findAll() {
  return models.HeaterMode.findAll();
}

function create(entity) {
  return models.HeaterMode.create(entity);
}

function findById(id) {
  return models.HeaterMode.find({
    where: {
      id: id
    }
  });
}

function update(entity) {
  return models.HeaterMode.find({
      where: {
        id: entity.id
      }
    })
    .then(function (heaterMode) {
      if (heaterMode !== null) {
        return heaterMode.update(entity);
      }
      return Q.when();
    });
}

function _delete(id) {
  return models.HeaterMode.destroy({
    where: {
      id: id
    }
  });
}
