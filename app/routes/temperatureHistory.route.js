'use strict';

var express = require('express');
var router = express.Router();
var moment = require('moment');
var temperatureHistoryService = require('../services/temperatureHistory.service.js');

router.get('/', findAll);

router.get('/sensor/:sensorId/from/:startDate', findBySensorFromDate);

router.post('/', create);

module.exports = router;

//---------------------------

function findAll(req, res, next) {
  temperatureHistoryService.findAll()
    .then(function (heaterModes) {
      res.send(heaterModes);
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

  var date = moment(req.body.date, 'YYYY-MM-DD[T]HH:mm:ss', true).format();

  temperatureHistoryService.create({
      date: date,
      time: req.body.time,
      sensorId: req.body.sensorId,
      temp: req.body.temp
    })
    .then(function (temperatureHistory) {
      if (temperatureHistory) {
        res.status(201).end();
      } else {
        res.status(500).end();
      }
    })
    .catch(function (error) {
      next(error);
    });
}

function findBySensorFromDate(req, res, next) {
  // VALIDATION
  req.checkParams('sensorId', 'Invalid id').notEmpty().isInt();
  req.checkParams('startDate', 'Invalid startDate').notEmpty().isDate();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  var date = moment(req.params.startDate, 'YYYY-MM-DD[T]HH:mm:ss', true).format();

  temperatureHistoryService.findBySensorFromDate(req.params.sensorId, date)
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
