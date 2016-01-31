'use strict';

var express = require('express');
var router = express.Router();

var mczFrameHistoryService = require('../services/mczFrameHistory.service');

router.get('/', findAll);

module.exports = router;

//---------------------------

function findAll(req, res, next) {
  mczFrameHistoryService.findAll()
    .then(function (mczFrameHistory) {
      res.send(mczFrameHistory);
    })
    .catch(function (error) {
      next(error);
    });
}
