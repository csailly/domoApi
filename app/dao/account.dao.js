'use strict';

/**
 * Module dependencies.
 */
var models = require('../models');

module.exports = {
  findAll: findAll,
  findByLogin: findByLogin
};

//----------------------------

function findAll() {
  return models.Account.findAll();
}

function findByLogin(login) {
  return models.Account.find({
    where: {
      login: login
    }
  });
}
