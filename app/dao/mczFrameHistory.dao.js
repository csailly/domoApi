'use strict';

var models = require('../models');

module.exports = {
  findAll: findAll
};

//--------------------
function findAll(){
  models.MczFrameHistory.removeAttribute('id');
  return models.MczFrameHistory.findAll();
}


