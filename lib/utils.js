/*!
 * KeyDiaryMonitor - lib/utils.js
 */

'use strict';

/**
 * Module dependencies.
 */

function pad(n) {
  if (n.length === 1) {
    n = '0' + n;
  }
  return n;
}

exports.formatDate = function (d) {
  if (!(d instanceof Date)) {
    return false;
  }
  var year = String(d.getFullYear());
  var month = String(d.getMonth() + 1);
  var day = String(d.getDate());
  return year + '-' + pad(month) + '-' + pad(day);
};
