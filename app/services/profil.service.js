'use strict';

var profilDao = require('../dao/profil.dao');
var moment = require('moment');

module.exports = {
  create: create,
  update: update,
  delete: deletePeriod,
  findAll: findAll,
  findCurrent: findCurrent
};


//---------------------------
function create(entity) {
  return profilDao.create(entity);
}

function update(id, entity) {
  return profilDao.update(id, entity);
}

function deletePeriod(id) {
  return profilDao.delete(id);
}

function findAll() {
  return profilDao.findAll();
}

function findCurrent() {
  return profilDao.findCurrent();
}
