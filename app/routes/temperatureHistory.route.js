'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();
var moment = require('moment');

router.get('/', findAll);

router.get('/sensor/:sensorId/from/:startDate', findBySensorFromDate);

router.post('/', create);

module.exports = router;

//---------------------------

function findAll(req, res, next) {
  models.TemperatureHistory.removeAttribute('id');
  models.TemperatureHistory.findAll()
    .then(function (temperatureHistory) {
      res.send(temperatureHistory);
    })
    .catch(function (error) {
      next(error);
    });
}

function create(req, res, next) {
  // VALIDATION
  req.checkBody('date', 'Invalid date').notEmpty().isDate();
  req.checkBody('time', 'Invalid time').notEmpty().isTime();
  req.checkBody('sensorId', 'Invalid sensorId').notEmpty().isInt();
  req.checkBody('temp', 'Invalid temp').notEmpty().isFloat();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  var date = moment(req.body.date+"+0000", 'YYYYMMDDZ');

  models.TemperatureHistory.removeAttribute('id');
  models.TemperatureHistory.create({
    date: date.utc().toDate(),
    time: req.body.time,
    sensorId: req.body.sensorId,
    temp: req.body.temp
  })
    .then(function (history) {
      res.status(201).send(history)
    })
    .catch(function (error) {
      next(error);
    });
}

function findBySensorFromDate(req, res, next){
  // VALIDATION
  req.checkParams('sensorId', 'Invalid id').notEmpty().isInt();
  req.checkParams('startDate', 'Invalid startDate').notEmpty().isDate();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  var date = moment(req.params.startDate+"+0000", 'YYYYMMDDZ');

  models.TemperatureHistory.removeAttribute('id');
  models.TemperatureHistory.findAll({
    where: {
      sensorId: req.params.sensorId,
      date: {
        $gte: date.utc().toDate()
      }
    }
  })
    .then(function (temperature) {
      if (temperature !== null) {
        res.send(temperature);
      } else {
        res.status(204).end();
      }
    })
    .catch(function (error) {
      next(error);
    });
}
