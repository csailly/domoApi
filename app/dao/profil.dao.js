'use strict';

var models = require('../models');
var moment = require('moment');
var Sequelize = require("sequelize");
//var env       = process.env.NODE_ENV || "development";
var config = require('yaml-config').readConfig('./app/config/app.yml');
var sequelize = new Sequelize(null, null, null, config.database);
var Q = require('q');

module.exports = {
  create: create,
  delete: deleteProfil,
  findCurrent: findCurrent,
  findAll: findAll,
  activate: activate,
  update: update
};
//---------------------------

function create(entity) {
  return models.Profil.create(entity);
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
          },
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
  });
}

function findAll() {
  return models.Profil.findAll();
}

function activate(id) {
  return sequelize.query("UPDATE PROFILS SET isActive = 0", {type: sequelize.QueryTypes.UPDATE})
    .then(function () {
      return models.Profil.find({
        where: {
          id: id
        }
      });
    })
    .then(function (profil) {
      if (profil) {
        return profil.update({isActive: true});
      } else {
        return Q.when();
      }
    });
}

function update(profilToUpdate) {
  return models.Profil.find({
    where: {
      id: profilToUpdate.id
    }
  }).then(function (profil) {
    if (profil) {
      return profil.update(profilToUpdate);
    } else {
      return Q.when();
    }
  });
}
