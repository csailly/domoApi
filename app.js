'use strict';

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// MIDDLEWARE
// =============================================================================
// middleware to use for all requests
app.use(require('./middlewares/logger'));


// ROUTES FOR OUR API
// =============================================================================
var routes = require('./routes');


//All routes are prefixed with /api/vx

app.use('/api/v1/account', routes.account);
app.use('/api/v1/heaterMode', routes.heaterMode);
app.use('/api/v1/heaterPeriod', routes.heaterPeriod);
app.use('/api/v1/mczFrameHistory', routes.mczFrameHistory);
app.use('/api/v1/parameter', routes.parameter);
app.use('/api/v1/temperatureHistory', routes.temperatureHistory);

app.get('*', function(req, res){
  res.status(404).send('Not Found');
});

// ERRORS HANDLING
// =============================================================================
app.use(require('./middlewares/logErrors'));
app.use(require('./middlewares/clientErrorHandler'));
app.use(require('./middlewares/errorHandler'));

// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080;        // set our port
app.listen(port);
console.log('Magic happens on port ' + port);
console.log('Environment ' + app.get('env'));
