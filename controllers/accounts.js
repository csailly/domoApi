var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.Account.findAll().then(function(accounts) {
    res.send(accounts);
  });
});

module.exports = router;