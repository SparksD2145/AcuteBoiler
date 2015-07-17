#!/usr/bin/env node

// Load application based on environment, assume production unless development
/*if(process.env.node_env !== 'development'){
 var app = require('./build/app');
 run(app);
 } else {
 var app = require('./src/app');
 run(app);
 }*/

/**
 * @file Application master file, contains primary aspects of launching AcuteBoiler Webservice. Based on Express/Node boilerplate.
 * @author Thomas Ibarra <sparksd2145.dev@gmail.com>
 * @requires module:express
 * @requires module:path
 * @requires module:serve-favicon
 * @requires module:morgan
 * @requires module:cookie-parser
 * @requires module:less-middleware
 * @requires module:Configuration
 * @exports Runner
 */

var favicon = require('serve-favicon');
var logger = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var less = require('less-middleware');
var app = express();

// Load Configuration
var config = require('./config')(process.env.NODE_ENV);
app.set('config', config);

// Load debugger
var debug = require('debug')('AcuteBoiler:server');

// view engine setup
app.set('views', path.join(__dirname, ''));
app.set('view engine', 'jade');

// Use Master.jade as site index.
app.get('/', function(req, res){
    res.render(
        path.join(__dirname, '/src/index'),
        { devMode: process.env.NODE_ENV === 'development' }
    );
});

// Use less engine
app.use(less(__dirname + '/src', {
    force: config.less.force,
    once: config.less.once
}));

// Show Favicon
//app.use(favicon(__dirname + '/src/static/icons/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Mount directory "/public" as public facing directory "/"
app.use(express.static(path.join(__dirname, 'src'), {maxAge: '3d'}));

// Mount directory "/bower_components" as public facing directory "/libraries"
app.use('/libraries', express.static(path.join(__dirname, '/bower_components'), {maxAge: '3d'}));

// Provide Run function for application start
var run = function (app) {
    /** Set the server port of AcuteBoiler. */
    app.set('port', process.env.PORT || 80);

    /** Start AcuteBoiler's Express server */
    var server = app.listen(app.get('port'), function () {
        debug('Express server listening on port ' + server.address().port);
    });
};

run(app);