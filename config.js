/*!
 * KeyDiaryMonitor - config.js
 */

'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs');

var config = {
  appName: 'KeyDiaryMonitor',
  version: '2014010301',
  port: 8085,
  debug: true,
  mysql: {
    host: 'keydiary.mysql.rds.aliyuncs.com',
    port: 3306,
    user: 'key_test',
    password: 'internet',
    database: 'key_test',
    connectionLimit: 5
  }
};

var onlineConfig = '/root/config/monitor/config.js';
if (fs.existsSync(onlineConfig)) {
  var options = require(onlineConfig);
  for (var k in options) {
    config[k] = options[k];
  }
}

module.exports = config;
