(function (App) {
  'use strict';

  var LOCALE = 'hu-HU';

  function num(value, decimals) {
    return new Intl.NumberFormat(LOCALE, {
      minimumFractionDigits: decimals === undefined ? 2 : decimals,
      maximumFractionDigits: decimals === undefined ? 2 : decimals
    }).format(Number(value) || 0);
  }

  function date(iso) {
    var d = iso instanceof Date ? iso : new Date(iso);
    if (isNaN(d)) return '—';
    return new Intl.DateTimeFormat(LOCALE, { year: 'numeric', month: 'short', day: 'numeric' }).format(d);
  }

  function time(value) {
    return new Intl.DateTimeFormat(LOCALE, {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }).format(value);
  }

  App.format = { num: num, date: date, time: time };
})(window.App);
