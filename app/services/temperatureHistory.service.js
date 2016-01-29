'use strict';

var temperatureHistoryDao = require('../dao/temperatureHistory.dao');

module.exports = {
  findAll: findAll,
  findBySensorFromDate: findBySensorFromDate,
  create: create
};

//---------------------------
function create(entity) {
  return temperatureHistoryDao.create(entity);
}

function findAll() {
  return temperatureHistoryDao.findAll();
}

function findBySensorFromDate(sensorId, date) {
  return temperatureHistoryDao.findBySensorFromDate(sensorId, date);
}
