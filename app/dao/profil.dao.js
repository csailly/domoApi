'use strict';

var models = require('../models');

module.export = {
  create: create,
  update: update,
  delete: deleteProfil,
  findCurrent: findCurrent,
  findAll: findAll
};
//---------------------------

function create(entity) {
  return models.Profil.create(entity);
}

function update(id, entity) {
  return models.Profil.find({
      where: {
        id: id
      }
    })
    .then(function (profil) {
      if (profil !== null) {
        return profil.update(entity);
      }
      return Q.when();
    });
}

function deleteProfil(id) {
  return models.Profil.destroy({
    where: {
      id: id
    }
  });
}

function findCurrent() {
  var now = {
    datetime: moment().format('YYYY-MM-DD HH:mm'),
    time: moment().format("HH:mm"),
    day: moment().day().toString()
  };

  return models.Profil.find({
    where: {
      $or: [
        {
          startDate: {
            $lte: now.datetime
          }
          ,
          endDate: {
            $gte: now.datetime
          }
        },
        {
          isActive: true
        },
        {
          isDefault: true
        }
      ]
    },
    order: [
      ['startDate', 'DESC'], ['isActive', 'DESC'], ['isDefault', 'DESC']
    ]
  })
    ;
}

function findAll() {
  return models.Profil.findAll();
}
