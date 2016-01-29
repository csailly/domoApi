'use strict';

var models = require('../models');
var moment = require('moment');
var Q = require('q');

module.exports = {
  create: create,
  update: update,
  delete: deletePeriod,
  findAll: findAll,
  findCurrent: findCurrent,
  findById: findById
};

//---------------------------
function findById(idHeaterPeriod) {
  return models.HeaterPeriod.find({
      where: {
        id: idHeaterPeriod
      }
    });
}

function create(entity) {
  return models.HeaterPeriod.create(entity);
}

function update(idHeaterPeriod, entity) {
  return models.HeaterPeriod.find({
      where: {
        id: idHeaterPeriod
      }
    })
    .then(function (heaterPeriod) {
      if (heaterPeriod !== null) {
        return heaterPeriod.update(entity);
      }
      return Q.when();
    });
}

function deletePeriod(idHeaterPeriod) {
  return models.HeaterPeriod.destroy({
      where: {
        id: idHeaterPeriod
      }
    });
}

function findAll() {
  return models.HeaterPeriod.findAll();
}

function findCurrent() {
  var dateNow = moment().hour(0).minute(0).second(0).millisecond(0).format('YYYYMMDD');
  dateNow = moment(dateNow + "+0000", 'YYYYMMDDZ').utc().format();
  var timeNow = moment().format("HH:mm");

  return models.HeaterPeriod.find({
      where: {
        $or: [
          //Period at the current date
          {
            startDate: {
              $lte: dateNow
            },
            endDate: {
              $gte: dateNow
            },
            startTime: {
              $lte: timeNow
            },
            endTime: {
              $gte: timeNow
            }
          },
          //Period at the current day
          {
            day: moment().day(),
            startTime: {
              $lte: timeNow
            },
            endTime: {
              $gte: timeNow
            }
          }]
      },
      //Sort to get period with current date first
      //@see https://github.com/sequelize/sequelize/issues/4810
      order: [['dateDebut', 'DESC'], ['dateFin', 'ASC']]
    });
}
