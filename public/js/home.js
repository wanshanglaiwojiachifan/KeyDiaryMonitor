$(function () {
  var ONE_DAY = 3600 * 1000 * 24;

  // Calculate day count
  var startDay = (new Date(2013, 2, 10)).valueOf();
  var endDay = (new Date()).valueOf();
  var diff = Math.floor((endDay - startDay) / ONE_DAY);
  $('.online-day-count').html(diff);

  // Daily diaries info
  function formatDailyData(origin) {
    origin = origin || [];
    var labels = [];
    var data = [];
    for (var i = origin.length - 1; i >= 0; i--) {
      var daily = origin[i];
      labels.push(daily.created);
      data.push(daily.c);
    }
    return {
      labels: labels,
      data: data
    };
  }
  var dailyData = formatDailyData(DAILY_DIARIES);
  $('#daily-diaries-chart').highcharts({
    title: {
      text: ''
    },
    xAxis: {
      categories: dailyData.labels
    },
    colors: ['#45d4da', '#f1c40f', '#F7464A'],
    legend: {
      verticalAlign: 'top',
      borderWidth: 0
    },
    tooltip: {
      pointFormat: '<strong>{point.y}</strong>'
    },
    series: [
    {
      name: '每日新增日记',
      data: dailyData.data
    },
    {
      name: '每日新增用户',
      data: DAILY_USERS
    },
    {
      name: '每日活跃用户',
      data: DAILY_USERS_ACT
    }]
  });

  var PIE_COLORS = ['#F7464A', '#E2EAE9', '#D4CCC5', '#949FB1', '#4D5360'];
  // Diaries sources info
  var SOURCE_MAP = {
    1: 'Web',
    2: '微信',
    3: 'iPhone App',
    4: 'Android App'
  };
  function formatSourcesData(origin) {
    origin = origin || [];
    var results = [];
    for (var i = 0; i < origin.length; i++) {
      var o = origin[i];
      results.push([SOURCE_MAP[o.sid], o.c]);
    }
    return results;
  }
  var sourcesData = formatSourcesData(DIARIES_SOURCES);
  $('#diaries-sources-chart').highcharts({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: '日记来源'
    },
    colors: PIE_COLORS,
    tooltip: {
      pointFormat: '{point.y}条, {point.percentage:.1f}%'
    },
    series: [{
      type: 'pie',
      data: sourcesData
    }]
  });
  $('#regulars-users-chart').highcharts({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false
    },
    title: {
      text: '用户黏性'
    },
    colors: PIE_COLORS,
    tooltip: {
      pointFormat: '{point.y}人, {point.percentage:.1f}%'
    },
    series: [{
      type: 'pie',
      data: [
        ['100+条日记', USER_DIARY_SEG[0]],
        ['10+条日记', USER_DIARY_SEG[1]],
        ['不到10条日记', USER_DIARY_SEG[2]],
        ['从未写过日记', USER_DIARY_SEG[3]]
      ]
    }]
  });

});