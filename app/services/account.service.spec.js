'use strict';

var chai = require("chai");
chai.should();
var rewire = require("rewire");

describe('Account service', function () {
  var Q;
  var accountService;

  var accountMock = {login: 'foo', password: 'fooPass'};
  var accountsMock = [accountMock];
  var accountDaoMock = {
    findAll: function () {
      return Q.when(accountsMock);
    },
    findByLogin: function (login) {
      switch (login) {
        case accountMock.login :
          return Q.when(accountMock);
        default:
          return Q.when();
      }

    }
  };

  before(function () {


    Q = require('q');

    accountService = rewire("./account.service.js");
    accountService.__set__('accountDao', accountDaoMock);
  });


  it('Should return accounts', function () {
    accountService.findAll().then(function (accounts) {
      accountsMock.should.equal(accounts);
    });
  });

  it('Should fail authenticate non existing user', function () {
    accountService.authenticate('gee', 'geePass').then(function (isOk) {
      isOk.should.equal(false);
    });
  });

  it('Should fail authenticate user due to bad password', function () {
    accountService.authenticate(accountMock.login, 'geePass').then(function (isOk) {
      isOk.should.equal(false);
    });
  });

  it('Should success authenticate user', function () {
    accountService.authenticate(accountMock.login, accountMock.password).then(function (isOk) {
      isOk.should.equal(true);
    });
  });

});
