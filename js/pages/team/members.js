(function (App) {
  'use strict';

  function render(root, members) {
    if (!root) return;
    console.warn('[team/members] TODO: to be implemented — ' + (members || []).length + ' members');
  }

  App.teamMembers = { render: render };
})(window.App);
