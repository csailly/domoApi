'use strict';

var router = require('express').Router();
var moment = require('moment');
var Q = require('q');

var profilService = require('../services/profil.service.js');

module.exports = router;

//Create a profile
router.post('/', create);

//Find all
router.get('/', findAll);

//Find current
router.get('/current', findCurrent);

//Activate a profil
router.put('/:id/activate', activate);


function create(req, res, next) {
  // VALIDATION
  req.checkBody('name', 'Mandatory').notEmpty();
  req.checkBody('startDate', 'Invalid Format').optional().isDateTime();
  req.checkBody('endDate', 'Invalid Format').optional().isDateTime();
  req.checkBody('isActive', 'Invalid Format').optional().isBoolean();
  req.checkBody('isDefault', 'Invalid Format').optional().isBoolean();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  if (req.body.startDate && !req.body.endDate || !req.body.startDate && req.body.endDate) {
    errors = errors || [];
    errors.push({
      "param": "startDate",
      "msg": "Both startDate and endDate must be filled",
      "value": req.body.startDate + " - " + req.body.endDate
    });
    errors.push({
      "param": "endDate",
      "msg": "Both startDate and endDate must be filled",
      "value": req.body.startDate + " - " + req.body.endDate
    });
  } else if (req.body.startDate && req.body.endDate && moment(req.body.endDate).diff(moment(req.body.startDate)) < 0) {
    errors = errors || [];
    errors.push({
      "param": "startDate",
      "msg": "endDate must be posterior to startDate",
      "value": req.body.startDate + " - " + req.body.endDate
    });
    errors.push({
      "param": "endDate",
      "msg": "endDate must be posterior to startDate",
      "value": req.body.startDate + " - " + req.body.endDate
    });
  }

  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  var newProfil = {
    name: req.body.name
  };

  if (req.body.startDate) {
    newProfil.startDate = req.body.startDate;
  }

  if (req.body.endDate) {
    newProfil.endDate = req.body.endDate;
  }

  if (req.body.isDefault !== undefined) {
    newProfil.isDefault = req.body.isDefault;
  }

  if (req.body.isActive !== undefined) {
    newProfil.isActive = req.body.isActive;
  }

  //All seems ok, go to create !!
  profilService.create(newProfil)
    .then(function (profil) {
      res.status(201).send(profil);
    })
    .catch(function (error) {
      res.status(500).send({error: error});
      next(error);
    });

}

function findAll(req, res, next) {
  return profilService.findAll()
    .then(function (profils) {
      if (profils) {
        res.status(200).send(profils);
      } else {
        res.status(204);
      }
    })
    .catch(function (error) {
      res.status(500).send({error: error});
      next(error);
    });
}

function findCurrent(req, res, next) {
  return profilService.findCurrent()
    .then(function (profil) {
      if (profil) {
        res.status(200).send(profil);
      } else {
        res.status(204);
      }
    })
    .catch(function (error) {
      res.status(500).send({error: error});
      next(error);
    });
}

function activate(req, res, next) {
  // VALIDATION
  req.checkParams('id', 'Mandatory').notEmpty().isInt();
  req.checkBody('startDate', 'Invalid Format').optional().isDateTime();
  req.checkBody('endDate', 'Invalid Format').optional().isDateTime();

  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  if (req.body.startDate && !req.body.endDate || !req.body.startDate && req.body.endDate) {
    errors = errors || [];
    errors.push({
      "param": "startDate",
      "msg": "Both startDate and endDate must be filled",
      "value": req.body.startDate + " - " + req.body.endDate
    });
    errors.push({
      "param": "endDate",
      "msg": "Both startDate and endDate must be filled",
      "value": req.body.startDate + " - " + req.body.endDate
    });
  } else if (req.body.startDate && req.body.endDate && moment(req.body.endDate).diff(moment(req.body.startDate)) < 0) {
    errors = errors || [];
    errors.push({
      "param": "startDate",
      "msg": "endDate must be posterior to startDate",
      "value": req.body.startDate + " - " + req.body.endDate
    });
    errors.push({
      "param": "endDate",
      "msg": "endDate must be posterior to startDate",
      "value": req.body.startDate + " - " + req.body.endDate
    });
  }

  if (errors) {
    res.status(400).send({message: 'There have been validation errors: ', errors: errors});
    return;
  }

  if (req.body.startDate !== undefined) {
    profilService.update({id: req.params.id, startDate: req.body.startDate, endDate: req.body.endDate})
      .then(function (profil) {
        if (profil !== null) {
          return profilService.activate(req.params.id);
        } else {
          return Q.when();
        }
      })
      .then(function (profil) {
        if (profil !== null) {
          res.status(200).send(profil);
        } else {
          res.status(204).end();
        }
      })
      .catch(function (error) {
        res.status(500).send({error: error});
        next(error);
      });
  } else {
    profilService.activate(req.params.id)
      .then(function (profil) {
        if (profil !== null) {
          res.status(200).send(profil);
        } else {
          res.status(204).end();
        }
      })
      .catch(function (error) {
        res.status(500).send({error: error});
        next(error);
      });
  }


}
