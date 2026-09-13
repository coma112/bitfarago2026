(function (App) {
  'use strict';

  App.page('team', function () {
    var qs = App.dom.qs;
    var data = App.teamData;

    App.clock.init(qs('[data-clock]'));
    App.teamMembers.render(qs('[data-members]'), data.members);

    App.teamGallery.init({
      button: qs('[data-gallery-next]'),
      stage: qs('[data-gallery-stage]'),
      images: data.gallery
    });

    App.icons.refresh();
  });
})(window.App);
