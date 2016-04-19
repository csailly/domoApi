'use strict';

var express = require('express');
var router = express.Router();
var stoveService = require('../services/stove.service.js');

router.put('/order', setOrder);
//router.put('/forcedStart/:order', setForcedStart);
//router.put('/forcedStop/:order', setForcedStop);
//router.put('/manual/:order', setManual);
router.put('/forcedSetPoint', updateForcedSetPointTemp);
router.put('/forcedMaxPoint', updateForcedMaxTemp);
router.put('/configuration', updateConfiguration);
router.get('/configuration', readConfiguration);
router.get('/state', readState);

module.exports = router;

//---------------------------
function setForcedStart(req, res, next) {
  // VALIDATION
  req.checkParams('order', 'Invalid order').isInt();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }
  //All seems ok, let's update !!
  stoveService.setForced(req.params.order === '1')
    .then(function (result) {
      if (result !== null) {
        res.send(result);
      } else {
        res.status(204).end();
      }
    })
    .catch(function (error) {
      next(error);
    });
}

function setForcedStop(req, res, next) {
  // VALIDATION
  req.checkParams('order', 'Invalid order').isInt();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }
  //All seems ok, let's update !!
  stoveService.setForced(req.params.order !== '1')
    .then(function (result) {
      if (result !== null) {
        res.send(result);
      } else {
        res.status(204).end();
      }
    })
    .catch(function (error) {
      next(error);
    });
}

function setManual(req, res, next) {
  // VALIDATION
  req.checkParams('order', 'Invalid order').isInt();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }
  //All seems ok, let's update !!
  stoveService.setManual(req.params.order === '1')
    .then(function (result) {
      if (result !== null) {
        res.send(result);
      } else {
        res.status(204).end();
      }
    })
    .catch(function (error) {
      next(error);
    });
}

function setOrder(req, res, next) {
  // VALIDATION
  req.checkBody('order', 'Invalid order').isEnumeration(['on', 'off']);

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  var order = req.body.order;

  stoveService.getConfiguration().
    then(function (parameter) {
      if (parameter.value === 'AUTO') {
        stoveService.setForced(order === 'on').then(function () {
          //TODO LAUNCH STOVE SCRIPT
          res.send('TODO LAUNCH STOVE SCRIPT');
        });
      } else if (parameter.value === 'MANU') {
        stoveService.setManual(order === 'on').then(function () {
          //TODO LAUNCH STOVE SCRIPT
          res.send('TODO LAUNCH STOVE SCRIPT');
        });
      } else {
        res.status(204).end();
      }
    })
    .catch(function (error) {
      next(error);
    });

}

function updateForcedSetPointTemp(req, res, next) {
  // VALIDATION
  req.checkBody('temp', 'Invalid temp').isFloat();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  stoveService.updateForcedSetPointTemp(req.body.temp)
    .then(function (result) {
      if (result !== null) {
        res.send(result);
      } else {
        res.status(204).end();
      }
    })
    .catch(function (error) {
      next(error);
    });
}

function updateForcedMaxTemp(req, res, next) {
  // VALIDATION
  req.checkBody('temp', 'Invalid temp').isFloat();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  stoveService.updateForcedMaxTemp(req.body.temp)
    .then(function (result) {
      if (result !== null) {
        res.send(result);
      } else {
        res.status(204).end();
      }
    })
    .catch(function (error) {
      next(error);
    });
}

function updateConfiguration(req, res, next) {
  // VALIDATION
  req.checkBody('config', 'Invalid config').isEnumeration(['AUTO', 'MANU', 'STOP']);

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  stoveService.updateConfiguration(req.body.config)
    .then(function (result) {
      if (result !== null) {
        res.send(result);
      } else {
        res.status(204).end();
      }
    })
    .catch(function (error) {
      next(error);
    });
}

function readConfiguration(req, res, next) {
  stoveService.getConfiguration()
    .then(function (parameter) {
      if (parameter !== null) {
        res.send({value: parameter.value});
      } else {
        res.status(204).end();
      }
    })
    .catch(function (error) {
      next(error);
    });
}

function readState(req, res, next) {
  stoveService.getState()
    .then(function (parameter) {
      if (parameter !== null) {
        res.send(parameter);
      } else {
        res.status(204).end();
      }
    })
    .catch(function (error) {
      next(error);
    });
}
