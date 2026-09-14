(function (App) {
  'use strict';

  function init(options) {
    if (!options || !options.button || !options.stage) return;

    var button = options.button;
    var stage = options.stage;
    var images = options.images || [];
    if (!images.length) return;

    var index = -1;

    var img = document.createElement('img');
    img.className = 'gallery__image';
    img.alt = '';

    var caption = document.createElement('p');
    caption.className = 'gallery__caption';

    function show() {
      index = (index + 1) % images.length;
      var item = images[index];

      img.src = App.asset(item.image);
      img.alt = item.caption || '';
      caption.textContent =
        (index + 1) + ' / ' + images.length + ' — ' + (item.caption || '');

      if (!stage.contains(img)) {
        stage.innerHTML = '';
        stage.appendChild(img);
        stage.appendChild(caption);
      }
    }

    button.addEventListener('click', show);
  }

  App.teamGallery = { init: init };
})(window.App);