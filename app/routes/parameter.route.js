'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', findAll);

router.put('/:code', updateParameter);

router.get('/:code', findById);

module.exports = router;

//---------------------------

function findAll(req, res, next) {
  models.Parameter.findAll()
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
  models.Parameter.find({
    where: {
      code: req.params.code
    }
  })
    .then(function (parameter) {
      if (parameter !== null) {
        parameter.update({
          type: req.body.type,
          value: req.body.value,
          description: req.body.description,
          values: req.body.values
        })
          .then(function () {
            res.send(parameter);
          })
          .catch(function (error) {
            next(error);
          });
      } else {
        res.status(204).end();
      }
    })
    .catch(function (error) {
      next(error);
    });

}

function findById(req, res, next){
  // VALIDATION
  req.checkParams('code', 'Invalid code').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  models.Parameter.find({
    where: {
      code: req.params.code
    }
  })
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
