'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();
var util = require('util');


function findAllHeaterPeriod(req, res, next){
  models.HeaterPeriod.findAll()
    .then(function (heaterModes) {
      res.send(heaterModes);
    })
    .catch(function (error) {
      next(error);
    });
}

function createHeaterPeriod(req, res, next){
  res.status(501).send("Not yet implemented");
}

function findHeaterPeriodById(req, res, next){
  res.status(501).send("Not yet implemented");
}

function updateHeaterPeriod(req, res, next){
  res.status(501).send("Not yet implemented");
}

function deleteHeaterPeriod(req, res, next){
  res.status(501).send("Not yet implemented");
}

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
