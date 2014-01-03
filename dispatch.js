/*!
 * KeyDiaryMonitor - dispatch.js
 */

'use strict';

/**
 * Module dependencies.
 */

var config = require('./config');
var server = require('./app');

server.listen(config.port);

console.log('[%s] [master:%d] Server started, listen at %d',
  new Date(), process.pid, config.port);