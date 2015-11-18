'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();
var util = require('util');

//Get all HeaterMode
router.get('/', findAllHeaterMode);

//Create a HeaterMode
router.post('/', createHeaterMode);

//Get a single HeaterMode
router.get('/:heaterMode_id', findHeaterModeById);

//Update a HeaterMode
router.put('/:heaterMode_id', updateHeaterMode);

//Delete a HeaterMode
router.delete('/:heaterMode_id', deleteHeaterMode);


module.exports = router;

//---------------------------

function findAllHeaterMode(req, res, next) {
  models.HeaterMode.findAll()
    .then(function (heaterModes) {
      res.send(heaterModes);
    })
    .catch(function (error) {
      next(error);
    });
}

function createHeaterMode(req, res, next) {

  // VALIDATION
  req.checkBody('label', 'Invalid label').notEmpty().isAlphanumeric();
  req.checkBody('order', 'Invalid order').notEmpty().isInt();
  req.checkBody('max', 'Invalid max').notEmpty().isInt();

  // SANITIZATION
/*  req.sanitizeBody('label').toBoolean();
  req.sanitizeBody('order').toBoolean();
  req.sanitizeBody('max').toBoolean();*/

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  models.HeaterMode.create({label: req.body.label, order: req.body.order, max: req.body.max})
    .then(function (heaterMode) {
      res.status(201).send(heaterMode)
    })
    .catch(function (error) {
      next(error);
    });
}

function findHeaterModeById(req, res, next) {
  // VALIDATION
  req.checkParams('heaterMode_id', 'Invalid id').notEmpty().isInt();

  // SANITIZATION
/*  req.sanitizeParams('heaterMode_id').toBoolean();*/

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  models.HeaterMode.find({
    where: {
      id: req.params.heaterMode_id
    }
  })
    .then(function (heaterMode) {
      if (heaterMode !== null) {
        res.send(heaterMode);
      } else {
        res.status(204).end();
      }
    })
    .catch(function (error) {
      next(error);
    });
}

function updateHeaterMode(req, res, next) {
  // VALIDATION
  req.checkParams('heaterMode_id', 'Invalid id').notEmpty().isInt();
  req.checkBody('label', 'Invalid label').notEmpty().isAlphanumeric();
  req.checkBody('order', 'Invalid order').notEmpty().isInt();
  req.checkBody('max', 'Invalid max').notEmpty().isInt();

  // SANITIZATION
/*  req.sanitizeParams('id').toBoolean();
  req.sanitizeBody('label').toBoolean();
  req.sanitizeBody('order').toBoolean();
  req.sanitizeBody('max').toBoolean();*/

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }


  models.HeaterMode.find({
    where: {
      id: req.params.heaterMode_id
    }
  })
    .then(function (heaterMode) {
      if (heaterMode !== null) {
        heaterMode.update({label: req.body.label, order: req.body.order, max: req.body.max})
          .then(function () {
            res.send(heaterMode);
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

function deleteHeaterMode(req, res, next) {
  // VALIDATION
  req.checkParams('heaterMode_id', 'Invalid id').notEmpty().isInt();

  // SANITIZATION
/*  req.sanitizeParams('heaterMode_id').toBoolean();*/

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  models.HeaterMode.destroy({
    where: {
      id: req.params.heaterMode_id
    }
  })
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
