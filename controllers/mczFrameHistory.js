'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
  //models.MczFrameHistory.removeAttribute('id');
  models.MczFrameHistory.findAll()
    .then(function (mczFrameHistory) {
      res.send(mczFrameHistory);
    })
    .catch(function (error) {
      res.status(500).send('Something broke! ' + error.message);
    });
});

module.exports = router;
