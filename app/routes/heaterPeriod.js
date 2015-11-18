'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();
var util = require('util');
var moment = require('moment');

//Get all HeaterPeriod
router.get('/', findAllHeaterPeriod);

//Create a HeaterPeriod
router.post('/', createHeaterPeriod);

//Get a single HeaterPeriod
router.get('/:heaterPeriod_id', findHeaterPeriodById);

//Update a HeaterPeriod
router.put('/:heaterPeriod_id', updateHeaterPeriod);

//Delete a HeaterPeriod
router.delete('/:heaterPeriod_id', deleteHeaterPeriod);

module.exports = router;

//---------------------------

function findAllHeaterPeriod(req, res, next) {
  models.HeaterPeriod.findAll()
    .then(function (heaterModes) {
      res.send(heaterModes);
    })
    .catch(function (error) {
      next(error);
    });
}

function createHeaterPeriod(req, res, next) {
  // VALIDATION
  req.checkBody('day', 'Invalid day').optional().isInt();
  req.checkBody('startDate', 'Invalid startDate').optional().isDate();
  req.checkBody('endDate', 'Invalid endDate').optional().isDate();
  req.checkBody('startHour', 'Invalid startHour').notEmpty().isTime();
  req.checkBody('endHour', 'Invalid endHour').notEmpty().isTime();
  req.checkBody('modeId', 'Invalid modeId').notEmpty().isInt();

  // SANITIZATION
  /*  req.sanitizeBody('day').toBoolean();
   req.sanitizeBody('startDate').toBoolean();
   req.sanitizeBody('endDate').toBoolean();
   req.sanitizeBody('startHour').toBoolean();
   req.sanitizeBody('endHour').toBoolean();
   req.sanitizeBody('modeId').toBoolean();*/

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }


  //Check Hours
  if (moment(req.body.endHour, 'HH:MM').diff(moment(req.body.startHour, 'HH:MM')) < 0) {
    errors = errors || [];
    errors.push({
      "param": "startHour",
      "msg": "endHour must be posterior to startHour",
      "value": req.body.startHour + " - " + req.body.endHour
    });
    errors.push({
      "param": "endHour",
      "msg": "endHour must be posterior to startHour",
      "value": req.body.startHour + " - " + req.body.endHour
    });
  }

  //Check Dates
  if (!req.body.day) {
    if (!req.body.startDate || req.body.endDate) {
      errors = errors || [];
      errors.push({
        "param": "startDate",
        "msg": "either day or startDate and endDate must not be empty",
        "value": req.body.startDate
      });
      errors.push({
        "param": "endDate",
        "msg": "either day or startDate and endDate must not be empty",
        "value": req.body.endDate
      });
      errors.push({
        "param": "day",
        "msg": "either day or startDate and endDate must not be empty",
        "value": req.body.day
      });

    } else if (moment(req.body.endDate, 'DD/MM/YYYY').diff(moment(req.body.startDate, 'DD/MM/YYYY')) < 0) {
      errors = errors || [];
      errors.push({
        "param": "startDate",
        "msg": "endDate must be posterior to startDate",
        "value": req.body.startDate + " - " + req.body.endDate
      });
      errors.push({
        "param": "endDate",
        "msg": "endDate must be posterior to startDate",
        "value": req.body.startDate + " - " + req.body.endDate
      });
    }
  }

  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  //All seems ok, go to create !!
  var newHeaterPeriod = {
    startHour: req.body.startHour,
    endHour: req.body.endHour,
    modeId: req.body.modeId
  };
  if (req.body.day) {
    newHeaterPeriod.day = req.body.day;
  } else {
    var startDate = moment(req.body.startDate, 'DD/MM/YYYY');
    startDate.utcOffset(0);
    startDate.hour(0);
    newHeaterPeriod.startDate = startDate.toISOString();

    var endDate = moment(req.body.endDate, 'DD/MM/YYYY');
    endDate.utcOffset(0);
    endDate.hour(0);
    newHeaterPeriod.endDate = endDate.toISOString();
  }


  models.HeaterPeriod.create(newHeaterPeriod)
    .then(function (heaterPeriod) {
      res.status(201).send(heaterPeriod)
    })
    .catch(function (error) {
      next(error);
    });
}

function findHeaterPeriodById(req, res, next) {
  res.status(501).send("Not yet implemented");
}

function updateHeaterPeriod(req, res, next) {
  res.status(501).send("Not yet implemented");
}

function deleteHeaterPeriod(req, res, next) {
  res.status(501).send("Not yet implemented");
}
