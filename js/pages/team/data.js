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
        bio: 'Attila vagyok, matek órán sokszor eszem és szeretek programozni!'
      },
      {
        name: 'Kulás Dominik',
        role: 'Fullstack',
        photo: 'assets/img/team/domi.png',
        bio: 'Dominik vagyok, sokat játszok és nem csípem a törit.'
      },
      {
        name: 'Sós Dávid',
        role: 'Fullstack',
        photo: 'assets/img/team/david.png',
        bio: 'Dávid vagyok, szeretem a retró dolgokat és a rockot!'
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
      { image: 'assets/img/gallery/0emeletsuliBejarat.jpg' },
      { image: 'assets/img/gallery/tajkep1.jpg' },
      { image: 'assets/img/gallery/tajkep2.jpg' },
      { image: 'assets/img/gallery/tajkep3.jpg' },
      { image: 'assets/img/gallery/tajkep4.jpg' }
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