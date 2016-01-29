'use strict';

process.env.NODE_ENV = 'test';

var request = require('supertest'),
  expect = require("chai").expect;


describe('Server', function () {

  var server,
    app;

  before(function (done) {
    server = require('./app.js');
    app = server.app;
    done();
  });

  it('- should GET infos', function (done) {
    request(app)
      .get('/infos')
      .end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it('- should return 404', function (done) {
    request(app)
      .get('/foo/bar')
      .end(function (err, res) {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(404);
        done();
      });
  });

});
