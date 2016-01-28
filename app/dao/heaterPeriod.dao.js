'use strict';

var models = require('../models');
var moment = require('moment');

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
    })
    .then(function (heaterPeriod) {
      return heaterPeriod;
    });
}

function create(entity) {
  return models.HeaterPeriod.create(entity)
    .then(function (heaterPeriod) {
      return heaterPeriod;
    });
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
      } else {
        return null;
      }
    })
    .then(function (heaterPeriod) {
      return heaterPeriod;
    });
}

function deletePeriod(idHeaterPeriod) {
  return models.HeaterPeriod.destroy({
      where: {
        id: idHeaterPeriod
      }
    })
    .then(function (affectedRows) {
      return affectedRows;
    });
}

function findAll() {
  return models.HeaterPeriod.findAll()
    .then(function (heaterModes) {
      return heaterModes;
    });
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
    })
    .then(function (heaterPeriod) {
      return heaterPeriod;
    });
}
