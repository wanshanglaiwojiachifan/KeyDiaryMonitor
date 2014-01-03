/*!
 * KeyDiaryMonitor - controllers/home.js
 */

'use strict';

/**
 * Module dependencies.
 */

var eventproxy = require('eventproxy');
var proxy = require('../proxy');
var utils = require('../lib/utils');

var ONE_DAY = 3600 * 1000 * 24;

function fixDailyData(data) {
  data = data || [];
  var trans = {};
  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    trans[d.created] = d.cnt;
  }

  var results = [];
  var today = (new Date()).valueOf();
  for (var i = 29; i >= 0; i--) {
    var day = today - (i * ONE_DAY);
    day = utils.formatDate(new Date(day));
    results.push(trans[day] || 0);
  }
  return results;
}

function segment(data) {
  data = data || [];
  var groups = [0, 0, 0, 0];
  for (var i = 0; i < data.length; i++) {
    var cnt = data[i].cnt;
    if (cnt >= 100) {
      groups[0] += 1;
    } else if (cnt >= 10) {
      groups[1] += 1;
    } else if (cnt > 0) {
      groups[2] += 1;
    } else {
      groups[3] += 1;
    }
  }
  return groups;
}

exports.page = function (req, res, next) {
  var ep = eventproxy.create();
  ep.fail(next);

  proxy.countUsers(ep.doneLater('countUsers'));
  proxy.countDiaries(ep.doneLater('countDiaries'));
  proxy.dailyDiaries(ep.doneLater('dailyDiaries'));
  proxy.dailyUsersActive(ep.doneLater('dailyUsersActive'));
  proxy.dailyUsers(ep.doneLater('dailyUsers'));
  proxy.getDiariesSources(ep.doneLater('getDiariesSources'));
  proxy.countDiaryByUser(ep.doneLater('countDiaryByUser'));

  ep.all('countUsers', 'countDiaries', 'dailyDiaries', 'dailyUsers',
    'getDiariesSources', 'countDiaryByUser', 'dailyUsersActive',
    function (countUsers, countDiaries, dailyDiaries, dailyUsers,
      diariesSources, countDiaryByUser, dailyUsersActive) {

      var dailyUsersFixed = fixDailyData(dailyUsers);
      var diaryUserSeg = segment(countDiaryByUser);
      var dailyUsersActiveFixed = fixDailyData(dailyUsersActive);

      return res.render('home', {
        viewname: 'home',
        usersCount: countUsers || 0,
        diariesCount: countDiaries || 0,
        dailyDiaries: dailyDiaries || [],
        diariesSources: diariesSources || [],
        diaryUserSeg: diaryUserSeg,
        dailyUsers: dailyUsersFixed,
        dailyUsersActive: dailyUsersActiveFixed
      });
    });
};
