/*!
 * KeyDiaryMonitor - app.js
 */

'use strict';

/**
 * Module dependencies.
 */

require('response-patch');
var path = require('path');
var connect = require('connect');
var render = require('connect-render');
var urlrouter = require('urlrouter');
var ms = require('ms');
var config = require('./config');
var routes = require('./routes');

// Init App and Middlewares.
var app = connect();

app.use(function (req, res, next) {
  res.req = req;
  next();
});
app.use(connect.query());
app.use(connect.json({
  strict: true, // json body must use strict mode.
}));
app.use(connect.cookieParser());

// Static file serice
if (config.debug) {
  app.use('/public', connect.static(__dirname + '/public'));
} else {
  app.use('/public', connect.static(__dirname + '/public', { maxAge: ms('1y') }));
}

app.use(connect.bodyParser());
app.use(connect.cookieParser());
app.use(render({
  root: path.join(__dirname, '/views'),
  layout: false,
  viewExt: '.html',
  cache: !config.debug,
  helpers: {
    version: config.version,
    config: config
  }
}));
app.use(urlrouter(routes));

// Error handler.
app.use(function (err, req, res, next) {
  err.url = err.url || req.url;
  console.log(err.stack);
  res.statusCode = 500;
  res.end('oops! error occurred.');
});

// Page not found handler.
app.use(function (req, res, next) {
  res.statusCode = 404;
  res.end('oops! page not found.');
});

module.exports = app;
