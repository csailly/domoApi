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
  var deferred = Q.defer();

  heaterPeriodDao.findById(idHeaterPeriod)
    .then(function (heaterPeriod) {
      deferred.resolve(heaterPeriod);
    })
    .catch(function (e) {
      deferred.reject(e);
    });

  return deferred.promise;
}


function create(entity) {
  var deferred = Q.defer();

  heaterPeriodDao.create(entity)
    .then(function (heaterPeriod) {
      deferred.resolve(heaterPeriod);
    })
    .catch(function (e) {
      deferred.reject(e);
    });

  return deferred.promise;
}

function update(idHeaterPeriod, entity) {
  var deferred = Q.defer();
  heaterPeriodDao.update(idHeaterPeriod, entity)
    .then(function (updatedEntity) {
      deferred.resolve(updatedEntity);
    })
    .catch(function (e) {
      deferred.reject(e);
    });

  return deferred.promise;
}

function deletePeriod(idHeaterPeriod) {
  var deferred = Q.defer();

  heaterPeriodDao.deletePeriod(idHeaterPeriod)
    .then(function (affectedRows) {
      deferred.resolve(affectedRows);
    })
    .catch(function (e) {
      deferred.reject(e);
    });

  return deferred.promise;
}

function findAll() {
  var deferred = Q.defer();

  heaterPeriodDao.findAll()
    .then(function (heaterPeriods) {
      deferred.resolve(heaterPeriods);
    })
    .catch(function (e) {
      deferred.reject(e);
    });

  return deferred.promise;
}

function findCurrent() {
  var deferred = Q.defer();

  heaterPeriodDao.findCurrent()
    .then(function (heaterPeriod) {
      deferred.resolve(heaterPeriod);
    })
    .catch(function (e) {
      deferred.reject(e);
    });

  return deferred.promise;
}

function setCurrentMode(modeId) {
  var deferred = Q.defer();

  var dateNow = moment().hour(0).minute(0).second(0).millisecond(0).format('YYYYMMDD');
  dateNow = moment(dateNow + "+0000", 'YYYYMMDDZ').utc().format();
  var timeNow = moment().format("HH:mm");

  findCurrent()
    .then(function (currentHeaterPeriod) {
      if (!currentHeaterPeriod.day || currentHeaterPeriod.startDate === currentHeaterPeriod.endDate) {
        console.log("- 2 -");

        //1° update current period to end now
        heaterPeriodDao.update(currentHeaterPeriod.id, {endTime: timeNow})
          .then(function () {
            console.log("- 3 -");

            heaterPeriodDao.create({
              startDate: dateNow,
              endDate: dateNow,
              startTime: timeNow,
              endTime: currentHeaterPeriod.endTime,
              modeId: modeId
            })
              .then(function (heaterPeriod) {
                console.log("- 4 -");

                deferred.resolve(heaterPeriod);
              });
          });
      } else {
        console.log("- 5 -");

        //2° create new period starting now and ending at the currentPeriod end
        heaterPeriodDao.create({
          startDate: dateNow,
          endDate: dateNow,
          startTime: timeNow,
          endTime: currentHeaterPeriod.endTime,
          modeId: modeId
        })
          .then(function (heaterPeriod) {
            console.log("- 6 -");

            deferred.resolve(heaterPeriod);
          });
      }

    });

  return deferred.promise;
}
