'use strict';

var express = require('express');
var router = express.Router();

var accountService = require('../services/account.service');

router.get('/',findAll);
router.post('/authenticate', authenticate);

module.exports = router;

//---------------------------

function findAll(req, res, next) {
  accountService.findAll()
    .then(function (accounts) {
      res.send(accounts);
    })
    .catch(function (error) {
      next(error);
    });
}

function authenticate(req, res, next) {
  // VALIDATION
  req.checkBody('login', 'Invalid login').notEmpty().isEmail();
  req.checkBody('password', 'Invalid password').notEmpty().isAlphanumeric();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  accountService.authenticate(req.body.login, req.body.password)
    .then(function (isAuthenticate){
      if (isAuthenticate){
        res.status(200).end();
      }else{
        res.status(401).end();
      }
    })
    .catch(function (error) {
      next(error);
    });
}
