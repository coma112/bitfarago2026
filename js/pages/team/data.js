(function (App) {
  'use strict';

  var TEAM = {
    name: 'Papírlyukasztók',

    school: {
      name: 'Ceglédi SZC Közgazdasági és Informatikai Technikum',
      city: 'Cegléd',
      photo: 'assets/img/team/suli.jpg'
    },

    members: [
      {
        name: 'Pusztai Attila',
        role: 'Fullstack',
        photo: 'assets/img/team/Pusztai.png',
        bio: 'TODO: rövid bemutatkozás (2-3 mondat).'
      },
      {
        name: 'Kulás Dominik',
        role: 'Fullstack',
        photo: 'assets/img/team/domi.png',
        bio: 'TODO: rövid bemutatkozás (2-3 mondat).'
      },
      {
        name: 'Sós Dávid',
        role: 'Fullstack',
        photo: 'assets/img/team/david.png',
        bio: 'TODO: rövid bemutatkozás (2-3 mondat).'
      }
    ],

    teachers: [
      {
        name: 'Farkas Norbert',
        subject: 'Informatika',
        photo: 'assets/img/team/fnl.jpg'
      }
    ],

    gallery: [
      { image: 'assets/img/gallery/0emeletsuliBejarat.jpg', caption: 'TODO: képaláírás' },
      { image: 'assets/img/gallery/0emeletsuliBejarat.jpg', caption: 'TODO: képaláírás' },
      { image: 'assets/img/gallery/0emeletsuliBejarat.jpg', caption: 'TODO: képaláírás' }
    ]
  };

  App.teamData = TEAM;

  App.asset = function (path) {
    if (!path) return '';
    if (/^(https?:)?\/\//.test(path) || path.charAt(0) === '/') return path;
    var base = (document.body && document.body.dataset.base) || '';
    return base + path;
  };
})(window.App);