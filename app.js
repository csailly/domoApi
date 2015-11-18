'use strict';

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var compress = require('compression');
var expressValidator = require('express-validator');
var moment = require('moment');

//Configure compression for response
app.use(compress());
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// this line must be immediately after express.bodyParser()!
app.use(expressValidator({
  customValidators: {
    isDate: function(value) {
      return moment(value, 'DD/MM/YYYY', true).isValid();
    },
    isTime: function(value) {
      return moment(value, 'HH:mm', true).isValid();
    }
  }
}));

// MIDDLEWARE
// =============================================================================
// middleware to use for all requests
app.use(require('./app/middlewares/logger'));


// ROUTES FOR OUR API
// =============================================================================
var routes = require('./app/routes');


//All routes are prefixed with /api/vx
app.use('/api/v1/account', routes.account);
app.use('/api/v1/heaterMode', routes.heaterMode);
  app.use('/api/v1/heaterPeriod', routes.heaterPeriod);
app.use('/api/v1/mczFrameHistory', routes.mczFrameHistory);
app.use('/api/v1/parameter', routes.parameter);
app.use('/api/v1/temperatureHistory', routes.temperatureHistory);

app.get('/infos', function (req, res) {
  res.status(200).send({
    "name": "domo-api",
    "version": "1.0.0",
    "description": "Api for domotic application"
  });
});

app.get('*', function (req, res) {
  res.status(404).send('Not Found');
});

// ERRORS HANDLING
// =============================================================================
app.use(require('./app/middlewares/logErrors'));
app.use(require('./app/middlewares/clientErrorHandler'));
app.use(require('./app/middlewares/errorHandler'));

// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080;        // set our port
app.listen(port);
console.log('Magic happens on port ' + port);
console.log('Environment ' + app.get('env'));
