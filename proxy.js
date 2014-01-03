/*!
 * KeyDiaryMonitor - proxy.js
 */

'use strict';

/**
 * Module dependencies.
 */

var db = require('./mysql');

var USER_COUNT_SQL = 'SELECT COUNT(DISTINCT email) AS c FROM account';
exports.countUsers = function (callback) {
  db.queryOne(USER_COUNT_SQL, function (err, row) {
    if (err) {
      return callback(err);
    }
    row = row || {};
    return callback(null, row.c);
  });
};

var DIARY_COUNT_SQL = 'SELECT COUNT(DISTINCT did) AS c FROM diary';
exports.countDiaries = function (callback) {
  db.queryOne(DIARY_COUNT_SQL, function (err, row) {
    if (err) {
      return callback(err);
    }
    row = row || {};
    return callback(null, row.c);
  });
};

var DIARY_DAILY_SQL = 'SELECT \
                          SUBSTRING(created, 1, 10) AS created, \
                          COUNT(DISTINCT did) AS c \
                        FROM diary \
                        GROUP BY SUBSTRING(created, 1, 10) \
                        ORDER BY created DESC \
                        LIMIT 30';
exports.dailyDiaries = function (callback) {
  db.query(DIARY_DAILY_SQL, function (err, rows) {
    if (err) {
      return callback(err);
    }
    rows = rows || [];
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      row.created = row.created.toString();
      row.c = Number(row.c);
    }
    return callback(null, rows);
  });
};

var DAILY_USERS_SQL =
  'SELECT \
      SUBSTRING(created, 1, 10) AS created, \
      COUNT(DISTINCT email) AS cnt \
    FROM account \
    GROUP BY SUBSTRING(created, 1, 10) \
    ORDER BY created DESC \
    LIMIT 30';
exports.dailyUsers = function (callback) {
  db.query(DAILY_USERS_SQL, function (err, rows) {
    if (err) {
      return callback(err);
    }
    rows = rows || [];
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      row.created = row.created.toString();
      row.cnt = Number(row.cnt);
    }
    return callback(null, rows);
  });
};

var DAILY_USER_ACTIVE_SQL =
                        'SELECT \
                          SUBSTRING(created, 1, 10) AS created, \
                          COUNT(DISTINCT uid) AS cnt \
                        FROM diary \
                        GROUP BY SUBSTRING(created, 1, 10) \
                        ORDER BY created DESC \
                        LIMIT 30';
exports.dailyUsersActive = function (callback) {
  db.query(DAILY_USER_ACTIVE_SQL, function (err, rows) {
    if (err) {
      return callback(err);
    }
    rows = rows || [];
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      row.created = row.created.toString();
      row.cnt = Number(row.cnt);
    }
    return callback(null, rows);
  });
};

var DIARY_SOURCE_SQL = 'SELECT \
                          sid, \
                          COUNT(DISTINCT did) AS c \
                        FROM diary \
                        GROUP BY sid';
exports.getDiariesSources = function (callback) {
  db.query(DIARY_SOURCE_SQL, function (err, rows) {
    if (err) {
      return callback(err);
    }
    rows = rows || [];
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      row.sid = Number(row.sid);
      row.c = Number(row.c);
    }
    return callback(null, rows);
  });
};

var COUNT_DIARY_BY_USER_SQL =
  'SELECT \
    a.uid, \
    COUNT(DISTINCT b.did) AS cnt \
  FROM \
    account a \
  LEFT JOIN \
    diary b \
  ON \
    a.uid = b.uid \
  GROUP BY a.uid \
  ORDER BY cnt DESC';
exports.countDiaryByUser = function (callback) {
  db.query(COUNT_DIARY_BY_USER_SQL, function (err, rows) {
    if (err) {
      return callback(err);
    }
    rows = rows || [];
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      row.uid = Number(row.uid);
      row.cnt = Number(row.cnt);
    }
    return callback(null, rows);
  });
};
