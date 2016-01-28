'use strict';

var Q = require('q');
var parameterDao = require('../dao/parameter.dao');

module.exports = {
  setForced: setForced,
  setManual: setManual,
  updateForcedSetPointTemp: updateForcedSetPointTemp,
  updateForcedMaxTemp: updateForcedMaxTemp,
  updateConfiguration: updateConfiguration,
  getConfiguration: getConfiguration,
  getState: getState
};

//---------------------------

function setForced(order) {
  var promise1 = parameterDao.update('POELE_MARCHE_FORCEE', {value: (order ? "TRUE" : "FALSE")})
    .then(function (updatedEntity) {
      return updatedEntity;
    });

  var promise2 = parameterDao.update("POELE_ARRET_FORCE", {value: (order ? "FALSE" : "TRUE")})
    .then(function (updatedEntity) {
      return updatedEntity;
    });

  return Q.allSettled([promise1, promise2])
    .spread(function (diskVal, cloudVal) {
      return [diskVal, cloudVal];
    });

}

function setManual(start) {
  return parameterDao.update('ORDRE_MANU', {value: (start ? "ON" : "OFF")})
    .then(function (updatedEntity) {
      return updatedEntity;
    });
}

function updateForcedSetPointTemp(temp) {
  return parameterDao.update('TEMP_CONSIGNE_MARCHE_FORCEE', {value: temp})
    .then(function (updatedEntity) {
      return updatedEntity;
    });
}

function updateForcedMaxTemp(temp) {
  return parameterDao.update('TEMP_MAXI_MARCHE_FORCEE', {value: temp})
    .then(function (updatedEntity) {
      return updatedEntity;
    });
}

function updateConfiguration(configValue) {
  return parameterDao.update('POELE_CONFIG', {value: configValue})
    .then(function () {
      return parameterDao.findById('POELE_ETAT');
    })
    .then(function (parameter) {
      return parameterDao.update('ORDRE_MANU', {value: parameter.value});
    })
    .then(function () {
      return configValue;
    });
}

function getConfiguration() {
  return parameterDao.findById('POELE_CONFIG')
    .then(function (parameter) {
      return parameter;
    });
}

function getState() {
  return parameterDao.findById('POELE_ETAT')
    .then(function (parameter) {
      return parameter;
    });
}
