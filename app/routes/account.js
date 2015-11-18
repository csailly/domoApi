'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();

router.get('/',findAll);

module.exports = router;

//---------------------------

function findAll(req, res, next){
  models.Account.findAll()
    .then(function (accounts) {
      res.send(accounts);
    })
    .catch(function (error) {
      next(error);
    });
}
