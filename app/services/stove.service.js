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

  var deferred = Q.defer();


  Q.allSettled([promise1, promise2]).spread(function (diskVal, cloudVal) {
    deferred.resolve([diskVal, cloudVal]);
  });

  return deferred.promise;
}

function setManual(start) {
  var deferred = Q.defer();

  parameterDao.update('ORDRE_MANU', {value: (start ? "ON" : "OFF")})
    .then(function (updatedEntity) {
      deferred.resolve(updatedEntity);
    })
    .catch(function (e) {
      deferred.reject(e);
    });

  return deferred.promise;
}

function updateForcedSetPointTemp(temp) {
  var deferred = Q.defer();

  parameterDao.update('TEMP_CONSIGNE_MARCHE_FORCEE', {value: temp})
    .then(function (updatedEntity) {
      deferred.resolve(updatedEntity);
    })
    .catch(function (e) {
      deferred.reject(e);
    });

  return deferred.promise;
}

function updateForcedMaxTemp(temp) {
  var deferred = Q.defer();

  parameterDao.update('TEMP_MAXI_MARCHE_FORCEE', {value: temp})
    .then(function (updatedEntity) {
      deferred.resolve(updatedEntity);
    })
    .catch(function (e) {
      deferred.reject(e);
    });

  return deferred.promise;
}

function updateConfiguration(configValue) {
  var deferred = Q.defer();

  parameterDao.update('POELE_CONFIG', {value: configValue})
    .then(function () {
      parameterDao.findById('POELE_ETAT')
        .then(function (parameter) {
          parameterDao.update('ORDRE_MANU', {value: parameter.value})
            .then(function () {
              deferred.resolve(configValue);
            })
        })
    })
    .catch(function (e) {
      deferred.reject(e);
    });

  return deferred.promise;
}

function getConfiguration(){
  var deferred = Q.defer();

  parameterDao.findById('POELE_CONFIG')
    .then(function(parameter){
      deferred.resolve(parameter);
    })
    .catch(function (e) {
      deferred.reject(e);
    });

  return deferred.promise;
}

function getState(){
  var deferred = Q.defer();

  parameterDao.findById('POELE_ETAT')
    .then(function(parameter){
      deferred.resolve(parameter);
    })
    .catch(function (e) {
      deferred.reject(e);
    });

  return deferred.promise;
}
