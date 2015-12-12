'use strict';

var Q = require('q');
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
  var deferred = Q.defer();

  accountDao.findByLogin(login)
    .then(function (credentials) {
      deferred.resolve(credentials && (credentials.password === password));
    })
    .catch(function (e) {
      deferred.reject(e);
    });

  return deferred.promise;
}
