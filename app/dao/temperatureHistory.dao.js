'use strict';

var models = require('../models');

module.exports = {
  findAll: findAll,
  findBySensorFromDate: findBySensorFromDate,
  create: create
};

//---------------------------

function findAll() {
  models.TemperatureHistory.removeAttribute('id');
  return models.TemperatureHistory.findAll();
}

function findBySensorFromDate(sensorId, date){
  models.TemperatureHistory.removeAttribute('id');
  return models.TemperatureHistory.find({
      where: {
        sensorId: sensorId,
        date: {
          $gte: date
        }
      }
    });
}

function create(entity) {
  models.TemperatureHistory.removeAttribute('id');
  return models.TemperatureHistory.create(entity);
}
