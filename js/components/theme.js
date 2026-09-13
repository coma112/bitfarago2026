(function (App) {
  'use strict';

  var KEY = App.storage.KEYS.THEME;

  function set(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    App.storage.set(KEY, theme);
  }

  function current() {
    return document.documentElement.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  function init() {
    var saved = App.storage.get(KEY, null);
    if (saved) document.documentElement.setAttribute('data-theme', saved);

    App.dom.qsa('[data-theme-toggle]').forEach(function (button) {
      button.addEventListener('click', function () {
        set(current() === 'dark' ? 'light' : 'dark');
      });
    });
  }

  App.theme = { init: init, set: set };
})(window.App);
