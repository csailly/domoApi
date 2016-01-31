'use strict';

var heaterModeDao = require('../dao/heaterMode.dao');

module.exports = {
  findAll: findAll,
  create: create,
  findById: findById,
  update: update,
  delete: _delete
};

function findAll() {
  return heaterModeDao.findAll();
}

function create(entity) {
  return heaterModeDao.create(entity);
}

function findById(id) {
  return heaterModeDao.findById(id);
}

function update(entity) {
  return heaterModeDao.update(entity);
}

function _delete(id) {
  return heaterModeDao.delete(id);
}
