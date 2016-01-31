'use strict';
var models = require('../models');

module.exports = AccountDao;

function AccountDao() {
  return {
    findAll: findAll,
    findByLogin: findByLogin
  };

  //---------------------------
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
}


