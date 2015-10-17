'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res, next) {
  models.MczFrameHistory.removeAttribute('id');
  models.MczFrameHistory.findAll()
    .then(function (mczFrameHistory) {
      res.send(mczFrameHistory);
    })
    .catch(function (error) {
      next(error);
    });
});

module.exports = router;
