/**
 * Module dependencies.
 */
var express     = require('express');
var config   = require('./config/config.js');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load Configurations


var app = express();

//Initialize Express
require('./config/express')(app);

//Initialize Routes
require('./config/routes').init(app);

app.listen(config.port);
console.log('Express app started on port ' + config.port);

//expose app
exports = module.exports = app;
