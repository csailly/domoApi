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
  return models.TemperatureHistory.findAll({
      where: {
        sensorId: sensorId,
        date: {
          $gte: date
        }
      },
    order: [
      ['date', 'DESC'],
    ]
    });
}

function create(entity) {
  models.TemperatureHistory.removeAttribute('id');
  return models.TemperatureHistory.create(entity);
}
