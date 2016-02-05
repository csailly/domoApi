'use strict';

var accountDao = require('../dao/account.dao');

module.exports = {
  findAll: findAll,
  authenticate: authenticate
};

//---------------------------
function findAll() {
  return accountDao.findAll();
}

function authenticate(login, password) {
  return accountDao.findByLogin(login)
    .then(function (credentials) {
      return (credentials && (credentials.password === password));
    });
}
