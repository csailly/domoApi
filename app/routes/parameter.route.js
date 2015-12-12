'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();
var parameterService = require('../services/parameter.service.js');

router.get('/', findAll);
router.put('/:code', updateParameter);
router.get('/:code', findById);

module.exports = router;

//---------------------------

function findAll(req, res, next) {
  parameterService.findAll()
    .then(function (parameters) {
      res.send(parameters);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send('Something broke! ' + error.message);
    });
}

function updateParameter(req, res, next) {
  // VALIDATION
  req.checkParams('code', 'Invalid code').notEmpty();
  req.checkBody('type', 'Invalid type').isAlpha();
  req.checkBody('value', 'Invalid value').isAlphanumeric();
  req.checkBody('description', 'Invalid description').optional().isAlphanumeric();
  req.checkBody('values', 'Invalid values').optional().isAlphanumeric();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  //All seems ok, let's update !!
  parameterService.update(req.params.code, req.body.type, req.body.value, req.body.description, req.body.values)
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

function findById(req, res, next) {
  // VALIDATION
  req.checkParams('code', 'Invalid code').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  parameterService.findById(req.params.code)
    .then(function (parameter) {
      if (parameter !== null) {
        res.send(parameter);
      } else {
        res.status(204).end();
      }
    })
    .catch(function (error) {
      next(error);
    });

}
