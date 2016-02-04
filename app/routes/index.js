'use strict';

module.exports = function (router) {
  return {
    account: require('./account.route')(router),
    heaterMode: require('./heaterMode.route'),
    heaterPeriod: require('./heaterPeriod.route'),
    mczFrameHistory: require('./mczFrameHistory.route'),
    parameter: require('./parameter.route'),
    temperatureHistory: require('./temperatureHistory.route'),
    stove: require('./stove.route')
  };
};
