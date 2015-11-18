'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', findAll);

module.exports = router;

//---------------------------

function findAll(req, res, next){
  models.TemperatureHistory.removeAttribute('id');
  models.TemperatureHistory.findAll()
    .then(function (temperatureHistory) {
      res.send(temperatureHistory);
    })
    .catch(function (error) {
      next(error);
    });
}
