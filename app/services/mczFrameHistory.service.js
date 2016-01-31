'use strict';

var mczFrameHistoryDao = require('../dao/mczFrameHistory.dao');

module.exports = {
  findAll: findAll
};

//---------------------
function findAll(){
  return mczFrameHistoryDao.findAll();
}
