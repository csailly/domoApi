'use strict';

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
function findById(id) {
  return heaterPeriodDao.findById(id);
}

function create(entity) {
  return heaterPeriodDao.create(entity);
}

function update(id, entity) {
  return heaterPeriodDao.update(id, entity);
}

function deletePeriod(id) {
  return heaterPeriodDao.delete(id);
}

function findAll() {
  return heaterPeriodDao.findAll();
}

function findCurrent() {
  return heaterPeriodDao.findCurrentByProfilId(-1);
}

function setCurrentMode(idMode) {
  var now = {
    date: moment().hour(0).minute(0).second(0).millisecond(0).format('YYYY-MM-DD'),
    time: moment().format("HH:mm"),
    day: moment().day()
  };

  var currentHeaterPeriod;
  return findCurrent()
    .then(function (current) {
      currentHeaterPeriod = current;
      if (currentHeaterPeriod.idType === 'DATE') {
        //1° update current period
        return update(currentHeaterPeriod.id, {idMode: idMode});
      } else {
        //2° create new period starting now and ending at the currentPeriod end
        return create({
          idProfil : currentHeaterPeriod.idProfil,
          idMode: idMode,
          idType: 'DATE',
          date: now.date,
          startTime: now.time,
          endTime: currentHeaterPeriod.endTime
        });
      }
    });
}
