(function (App) {
  'use strict';

  function init(root) {
    if (!root) return function () {};

    function update() {
      var now = new Date();
      root.textContent = App.format.time(now);
      root.setAttribute('datetime', now.toISOString());
    }

    update();
    var id = window.setInterval(update, 1000);
    return function stop() { window.clearInterval(id); };
  }

  App.clock = { init: init };
})(window.App);
