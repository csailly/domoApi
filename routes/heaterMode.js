'use strict';

var models = require('../models');
var express = require('express');
var router = express.Router();


//Get all HeaterMode
router.get('/', function (req, res, next) {
  models.HeaterMode.findAll()
    .then(function (heaterModes) {
      res.send(heaterModes);
    })
    .catch(function (error) {
      next(error);
    });
});

//Create a HeaterMode
router.post('/', function (req, res, next) {
  models.HeaterMode.create({label: req.body.label, order: req.body.order, max: req.body.max})
    .then(function (heaterMode) {
      res.status(201).send(heaterMode)
    })
    .catch(function (error) {
      next(error);
    });
});

//Get a single HeaterMode
router.get('/:heaterMode_id', function (req, res, next) {
  models.HeaterMode.find({
    where: {
      id: req.params.heaterMode_id
    }
  })
    .then(function (heaterMode) {
      if (heaterMode !== null) {
        res.send(heaterMode);
      } else {
        res.status(204).end();
      }
    })
    .catch(function (error) {
      next(error);
    });
});


//Update a HeaterMode
router.put('/:heaterMode_id', function (req, res, next) {
  models.HeaterMode.find({
    where: {
      id: req.params.heaterMode_id
    }
  })
    .then(function (heaterMode) {
      if (heaterMode !== null) {
        heaterMode.update({label: req.body.label, order: req.body.order, max: req.body.max})
          .then(function () {
            res.send(heaterMode);
          })
          .catch(function (error) {
            next(error);
          });
      } else {
        res.status(204).end();
      }
    })
    .catch(function (error) {
      next(error);
    });
});

//Delete a HeaterMode
router.delete('/:heaterMode_id', function (req, res, next) {
  models.HeaterMode.destroy({
    where: {
      id: req.params.heaterMode_id
    }
  })
    .then(function (affectedRows) {
      if (affectedRows === 0) {
        res.status(204).end();
      } else {
        res.status(200).end();
      }

    })
    .catch(function (error) {
      next(error);
    });
});


module.exports = router;
