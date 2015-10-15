'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
  models.TemperatureHistory.removeAttribute('id');
  models.TemperatureHistory.findAll()
    .then(function (temperatureHistory) {
      res.send(temperatureHistory);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send('Something broke! ' + error.message);
    });
});

module.exports = router;
