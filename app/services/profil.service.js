'use strict';

var profilDao = require('../dao/profil.dao');

module.exports = {
  create: create,
  delete: deletePeriod,
  findAll: findAll,
  findCurrent: findCurrent,
  activate: activate,
  update: update
};


//---------------------------
function create(entity) {
  return profilDao.create(entity);
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

function activate(id) {
  return profilDao.activate(id);
}


function update(entity){
  return profilDao.update(entity);
}
