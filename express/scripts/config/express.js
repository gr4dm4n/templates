/**
 * Module dependencies.
 * // package.json (Express 4.0)
 {
   "name": "starter-node-angular",
   "main": "server.js",
   "dependencies": {
     "express": "~4.0.0",
     "morgan": "~1.0.0",
     "body-parser": "~1.0.0",
     "method-override": "~1.0.0"
   }
 }
 */

var express = require('express');
var compression = require('compression');
var morgan = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var config = require('./config');

module.exports = function(app) {

    console.log('Initializing Express');

    app.set('showStackError', true);

    //Prettify HTML
    app.locals.pretty = true;

    //Should be placed before express.static
    app.use(compression({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));


    app.use(express.static(config.root + '/ts/app'));

    //Don't use logger for test env
    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev'));
    }


    //Enable jsonp
    app.use(bodyParser.json());  // parse application/
    app.use(methodOverride());
    app.enable("jsonp callback");
/*


    app.configure(function() {

        // request body parsing middleware should be above methodOverride
        app.use(express.urlencoded());
        app.use(express.json());
        app.use(express.methodOverride());


    });*/
};
