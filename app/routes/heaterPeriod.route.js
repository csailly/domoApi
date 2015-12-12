'use strict';

var express = require('express');
var router = express.Router();
var moment = require('moment');
var heaterPeriodService = require('../services/heaterPeriod.service.js');

//Get all HeaterPeriod
router.get('/', findAllHeaterPeriod);

//Create a HeaterPeriod
router.post('/', createHeaterPeriod);

//Find current Heater period
router.get('/current', findCurrent);

//Get a single HeaterPeriod
router.get('/:heaterPeriod_id', findHeaterPeriodById);

//Update a HeaterPeriod
router.put('/:heaterPeriod_id', updateHeaterPeriod);

//Delete a HeaterPeriod
router.delete('/:heaterPeriod_id', deleteHeaterPeriod);

//Update current Mode
router.post('/currentMode/', updateCurrentMode);


module.exports = router;

//---------------------------

function findAllHeaterPeriod(req, res, next) {
  heaterPeriodService.findAll()
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
  req.checkBody('startTime', 'Invalid startTime').notEmpty().isTime();
  req.checkBody('endTime', 'Invalid endTime').notEmpty().isTime();
  req.checkBody('modeId', 'Invalid modeId').notEmpty().isInt();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  errors = validateEntityFromRequest(req);

  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  //All seems ok, go to create !!
  heaterPeriodService.create(buildEntityFromRequest(req))
    .then(function (heaterPeriod) {
      res.status(201).send(heaterPeriod)
    })
    .catch(function (error) {
      next(error);
    });
}

function findHeaterPeriodById(req, res, next) {
  // VALIDATION
  req.checkParams('heaterPeriod_id', 'Invalid id').notEmpty().isInt();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  heaterPeriodService.findById(req.params.heaterPeriod_id)
    .then(function (heaterPeriod) {
      if (heaterPeriod !== null) {
        res.send(heaterPeriod);
      } else {
        res.status(204).end();
      }
    })
    .catch(function (error) {
      next(error);
    });
}

function updateHeaterPeriod(req, res, next) {
  // VALIDATION
  req.checkParams('heaterPeriod_id', 'Invalid id').notEmpty().isInt();
  req.checkBody('day', 'Invalid day').optional().isInt();
  req.checkBody('startDate', 'Invalid startDate').optional().isDate();
  req.checkBody('endDate', 'Invalid endDate').optional().isDate();
  req.checkBody('startTime', 'Invalid startTime').notEmpty().isTime();
  req.checkBody('endTime', 'Invalid endTime').notEmpty().isTime();
  req.checkBody('modeId', 'Invalid modeId').notEmpty().isInt();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  errors = validateEntityFromRequest(req);

  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  //All seems ok, let's update !!
  heaterPeriodService.update(req.params.heaterPeriod_id, buildEntityFromRequest(req))
    .then(function (heaterPeriod) {
      if (heaterPeriod !== null) {
        res.send(heaterPeriod);
      } else {
        res.status(204).end();
      }
    })
    .catch(function (error) {
      next(error);
    });
}

function deleteHeaterPeriod(req, res, next) {
  // VALIDATION
  req.checkParams('heaterPeriod_id', 'Invalid id').notEmpty().isInt();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  heaterPeriodService.delete(req.params.heaterPeriod_id)
    .then(function (affectedRows) {
      if (affectedRows === 0) {
        res.status(204).end();
      } else {
        res.status(200).end();
      }

    })
    .catch(function (error) {
      next(error);
    });
}

function findCurrent(req, res, next) {
  heaterPeriodService.findCurrent()
    .then(function (heaterPeriod) {
      if (heaterPeriod) {
        res.send(heaterPeriod);
      } else {
        res.status(204).end();
      }
    })
    .catch(function (error) {
      next(error);
    });
}

function updateCurrentMode(req, res, next) {
  heaterPeriodService.setCurrentMode(req.body.modeId)
    .then(function (heaterPeriod) {
      res.send(heaterPeriod);
    })
    .catch(function (error) {
      next(error);
    });
}

function buildEntityFromRequest(req) {
  var entity = {
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    modeId: req.body.modeId
  };
  if (req.body.day) {
    entity.day = req.body.day;
  } else {
    var startDate = moment(req.body.startDate + "+0000", ['DD/MM/YYYYZ', 'YYYYMMDDZ']);
    entity.startDate = startDate.utc().format();

    var endDate = moment(req.body.endDate + "+0000", ['DD/MM/YYYYZ', 'YYYYMMDDZ']);
    entity.endDate = endDate.utc().format();
  }
  return entity;
}

function validateEntityFromRequest(req) {
  var errors = undefined;

  //Check Hours
  if (moment(req.body.endTime, 'HH:MM').diff(moment(req.body.startTime, 'HH:MM')) < 0) {
    errors = errors || [];
    errors.push({
      "param": "startTime",
      "msg": "endTime must be posterior to startTime",
      "value": req.body.startTime + " - " + req.body.endTime
    });
    errors.push({
      "param": "endTime",
      "msg": "endTime must be posterior to startTime",
      "value": req.body.startTime + " - " + req.body.endTime
    });
  }

  //Check Dates
  if (!req.body.day) {
    if (!req.body.startDate || !req.body.endDate) {
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

    } else if (moment(req.body.endDate, ['DD/MM/YYYY', 'YYYYMMDD']).diff(moment(req.body.startDate, ['DD/MM/YYYY', 'YYYYMMDD'])) < 0) {
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
  return errors;
}
