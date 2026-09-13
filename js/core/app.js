(function (window) {
  'use strict';

  var App = {
    pages: {},
    base: '',
    page: function (name, fn) {
      App.pages[name] = fn;
    },

    url: function (path) {
      return App.base + String(path).replace(/^\/+/, '');
    },

    boot: function () {
      var body = document.body;
      App.base = body.getAttribute('data-base') || '';

      var name = body.getAttribute('data-page');
      var run = function () {
        App.layout.render();
        if (name && typeof App.pages[name] === 'function') {
          try {
            App.pages[name]();
          } catch (err) {
            console.error('[App] Failed to start the "' + name + '" page:', err);
          }
        }
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
      } else {
        run();
      }
    }
  };

  window.App = App;
})(window);
