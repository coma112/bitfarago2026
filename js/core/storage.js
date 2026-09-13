(function (App) {
  'use strict';

  var PREFIX = 'bitfarago2026:';

  var KEYS = {
    THEME: PREFIX + 'theme'
  };

  function get(key, fallback) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (err) {
      console.warn('[storage] Failed to read:', key, err);
      return fallback;
    }
  }

  function set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.warn('[storage] Failed to write:', key, err);
      return false;
    }
  }

  function remove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (err) {
      console.warn('[storage] Failed to remove:', key, err);
    }
  }

  App.storage = { KEYS: KEYS, get: get, set: set, remove: remove };
})(window.App);
