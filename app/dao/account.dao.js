'use strict';

/**
 * Module dependencies.
 */
var models = require('../models');

/**
 * Module exposures.
 */
module.exports = {
  findAll: findAll,
  findByLogin: findByLogin
};

//----------------------------
/**
 * Module exposures implementation .
 */
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
