(function (App) {
  'use strict';

  var warned = false;

  function refresh(root) {
    if (typeof window.lucide === 'undefined') {
      if (!warned) {
        warned = true;
        console.warn(
          '[icons] The Lucide library did not load. No internet connection? ' +
          'See the "Offline icons" section of the README.'
        );
      }
      return;
    }
    window.lucide.createIcons(root ? { nameAttr: 'data-lucide', root: root } : {});
  }

  function iconEl(name, className) {
    return App.dom.el('i', { 'data-lucide': name, class: className || 'icon' });
  }

  App.icons = { refresh: refresh, el: iconEl };
})(window.App);
