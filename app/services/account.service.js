'use strict';

/**
 * Module dependencies.
 */
var accountDao = require('../dao/account.dao');

/**
 * Module exposures.
 */
module.exports = {
  findAll: findAll,
  authenticate: authenticate
};

//---------------------------
/**
 * Module exposures implementation .
 */
function findAll() {
  return accountDao.findAll();
}

function authenticate(login, password) {
  return accountDao.findByLogin(login)
    .then(function (credentials) {
      return (credentials && (credentials.password === password));
    });
}
