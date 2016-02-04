'use strict';

var models = require('../models');
var moment = require('moment');
var Q = require('q');

module.exports = {
  create: create,
  update: update,
  delete: deletePeriod,
  findAll: findAll,
  findCurrentByProfilId: findCurrentByProfilId,
  findById: findById
};

//---------------------------
function findById(id) {
  return models.HeaterPeriod.find({
    where: {
      id: id
    }
  });
}

function create(entity) {
  return models.HeaterPeriod.create(entity);
}

function update(id, entity) {
  return models.HeaterPeriod.find({
      where: {
        id: id
      }
    })
    .then(function (heaterPeriod) {
      if (heaterPeriod !== null) {
        return heaterPeriod.update(entity);
      }
      return Q.when();
    });
}

function deletePeriod(id) {
  return models.HeaterPeriod.destroy({
    where: {
      id: id
    }
  });
}

function findAll() {
  return models.HeaterPeriod.findAll();
}

function findCurrentByProfilId(idProfil) {
  var now = {
    date: moment().hour(0).minute(0).second(0).millisecond(0).format('YYYY-MM-DD'),
    time: moment().format("HH:mm"),
    day: moment().day().toString()
  };

  return models.HeaterPeriod.find({
    where: {
      $and: {
        idProfil: idProfil,
        $or: [
          //Period at the current date
          {
            idType: 'DATE',
            date: now.date,
            startTime: {
              $lte: now.time
            },
            endTime: {
              $gte: now.time
            }
          },
          //Period at the current day
          {
            idType: 'DAY',
            days: now.day,
            startTime: {
              $lte: now.time
            },
            endTime: {
              $gte: now.time
            }
          },
          //Period including the current day
          {
            idType: 'DAY',
            days: {
              $like: '%' + now.day + '%'
            },
            startTime: {
              $lte: now.time
            },
            endTime: {
              $gte: now.time
            }
          }
        ]
      }
    },
    order: [
      ['date', 'DESC'],
      ['days', 'DESC']
    ]
  });
}
