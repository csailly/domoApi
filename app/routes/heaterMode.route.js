'use strict';

var express = require('express');
var router = express.Router();

var heaterModeService = require('../services/heaterMode.service.js');


//Get all HeaterMode
router.get('/', findAll);

//Create a HeaterMode
router.post('/', create);

//Get a single HeaterMode
router.get('/:heaterMode_id', findById);

//Update a HeaterMode
router.put('/:heaterMode_id', update);

//Delete a HeaterMode
router.delete('/:heaterMode_id', _delete);

module.exports = router;

//---------------------------

function findAll(req, res, next) {
  heaterModeService.findAll()
    .then(function (heaterModes) {
      res.send(heaterModes);
    })
    .catch(function (error) {
      next(error);
    });
}

function create(req, res, next) {
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

  heaterModeService.create({label: req.body.label, order: req.body.order, max: req.body.max})
    .then(function (heaterMode) {
      res.status(201).send(heaterMode);
    })
    .catch(function (error) {
      next(error);
    });
}

function findById(req, res, next) {
  // VALIDATION
  req.checkParams('heaterMode_id', 'Invalid id').notEmpty().isInt();

  // SANITIZATION
  /*  req.sanitizeParams('heaterMode_id').toBoolean();*/

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  heaterModeService.findById(req.params.heaterMode_id)
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

function update(req, res, next) {
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

  heaterModeService.update({
      id: req.params.heaterMode_id,
      label: req.body.label,
      order: req.body.order,
      max: req.body.max
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

function _delete(req, res, next) {
  // VALIDATION
  req.checkParams('heaterMode_id', 'Invalid id').notEmpty().isInt();

  // SANITIZATION
  /*  req.sanitizeParams('heaterMode_id').toBoolean();*/

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  heaterModeService.delete(req.params.heaterMode_id)
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
