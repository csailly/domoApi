'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', findAll);

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
