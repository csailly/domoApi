'use strict';

// BASE SETUP
// =============================================================================

// call the packages we need
//var cors = require('cors');
var app = require('express')();// define our app using express
var bodyParser = require('body-parser');
var compress = require('compression');
var expressValidator = require('express-validator');
var moment = require('moment');

var config = require('yaml-config').readConfig('./app/config/app.yml');

//Use CORS @see https://github.com/expressjs/cors
//app.use(cors());

//Configure compression for response
app.use(compress());
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// this line must be immediately after express.bodyParser()!
app.use(expressValidator({
  customValidators: {
    isDate: function (value) {
      return moment(value, 'YYYY-MM-DD[T]HH:mm:ss', true).isValid();
    },
    isTime: function (value) {
      return moment(value, 'HH:mm', true).isValid();
    },
    isEnumeration: function(value, acceptedValues){
      var ok = false;

      var i;
      for(i=0 ;i < acceptedValues.length; i++ ){
          if(value === acceptedValues[i]){
            ok = true;
          }
      }

      return ok;
    }
  }
}));

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
app.use('/api/v1/stove', routes.stove);

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
app.use(require('./middlewares/logErrors'));
app.use(require('./middlewares/clientErrorHandler'));
app.use(require('./middlewares/errorHandler'));

// START THE SERVER
// =============================================================================
var port = process.env.PORT || config.server.port || 8080;        // set our port
app.listen(port);
console.log('Magic happens on port ' + port);
console.log('Environment ' + app.get('env'));

module.exports = {app: app}; // for testing
