'use strict';

var Q = require('q');
var heaterPeriodDao = require('../dao/heaterPeriod.dao');
var moment = require('moment');

module.exports = {
  create: create,
  update: update,
  delete: deletePeriod,
  findAll: findAll,
  findCurrent: findCurrent,
  findById: findById,
  setCurrentMode: setCurrentMode
};


//---------------------------
function findById(idHeaterPeriod) {
  return heaterPeriodDao.findById(idHeaterPeriod)
    .then(function (heaterPeriod) {
      return heaterPeriod;
    });
}


function create(entity) {
  return heaterPeriodDao.create(entity)
    .then(function (heaterPeriod) {
      return heaterPeriod;
    });
}

function update(idHeaterPeriod, entity) {
  return heaterPeriodDao.update(idHeaterPeriod, entity)
    .then(function (updatedEntity) {
      return updatedEntity;
    });
}

function deletePeriod(idHeaterPeriod) {
  return heaterPeriodDao.delete(idHeaterPeriod)
    .then(function (affectedRows) {
      return affectedRows;
    });
}

function findAll() {
  return heaterPeriodDao.findAll()
    .then(function (heaterPeriods) {
      return heaterPeriods;
    });
}

function findCurrent() {
  return heaterPeriodDao.findCurrent()
    .then(function (heaterPeriod) {
      return heaterPeriod;
    });
}

function setCurrentMode(modeId) {
  var dateNow = moment().hour(0).minute(0).second(0).millisecond(0).format('YYYYMMDD');
  dateNow = moment(dateNow + "+0000", 'YYYYMMDDZ').utc().format();
  var timeNow = moment().format("HH:mm");

  var currentHeaterPeriod;
  return findCurrent()
    .then(function (current) {
      currentHeaterPeriod = current;
      if (!currentHeaterPeriod.day || currentHeaterPeriod.startDate === currentHeaterPeriod.endDate) {
        //1° update current period to end now
        return update(currentHeaterPeriod.id, {endTime: timeNow});
      } else {
        return Q.when();
      }
    })
    //2° create new period starting now and ending at the currentPeriod end
    .then(function () {
      return create({
        startDate: dateNow,
        endDate: dateNow,
        startTime: timeNow,
        endTime: currentHeaterPeriod.endTime,
        modeId: modeId
      });
    })
    .then(function (heaterPeriod) {
      return heaterPeriod;
    });

}
