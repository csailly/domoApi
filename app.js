'use strict';
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES FOR OUR API
// =============================================================================

// middleware to use for all requests
app.use(require('./middlewares/logs'));

//All routes are prefixed with /api/vx
app.use('/api/v1',require('./controllers'));

app.use('/api/v1/account',require('./controllers/account'));
app.use('/api/v1/heaterMode',require('./controllers/heaterMode'));
app.use('/api/v1/heaterPeriod',require('./controllers/heaterPeriod'));
app.use('/api/v1/mczFrameHistory',require('./controllers/mczFrameHistory'));
app.use('/api/v1/parameter',require('./controllers/parameter'));
app.use('/api/v1/temperatureHistory',require('./controllers/temperatureHistory'));

//Error Handling
app.use(require('./middlewares/logErrors'));
app.use(require('./middlewares/clientErrorHandler'));
app.use(require('./middlewares/errorHandler'));

// START THE SERVER
// =============================================================================
var port = process.env.PORT || 8080;        // set our port
app.listen(port);
console.log('Magic happens on port ' + port);
