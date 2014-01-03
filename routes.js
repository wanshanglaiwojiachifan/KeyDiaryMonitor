/*!
 * KeyDiaryMonitor - url routes
 */

'use strict';

/**
 * Module dependencies.
 */

var homeCtrl = require('./controllers/home');

module.exports = function (app) {

  app.get('/', homeCtrl.page);
};
