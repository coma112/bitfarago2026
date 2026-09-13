(function (App) {
  'use strict';

  var TEAM = {
    name: 'Papírlyukasztók',
    school: 'Ceglédi SZC Közgazdasági és Informatikai Technikum, Cegléd',

    members: [
      {
        name: 'Pusztai Attila',
        role: 'Fullstack',
        photo: 'assets/img/team/member1.jpg',
        bio: 'TODO: short introduction (2-3 sentences).'
      },
      {
        name: 'Kulás Dominik',
        role: 'Fullstack',
        photo: 'assets/img/team/member2.jpg',
        bio: 'TODO: short introduction (2-3 sentences).'
      },
      {
        name: 'Sós Dávid',
        role: 'Fullstack',
        photo: 'assets/img/team/member3.jpg',
        bio: 'TODO: short introduction (2-3 sentences).'
      }
    ],

    teachers: [
      { name: 'Farkas Norbert', photo: 'assets/img/team/teacher.jpg' }
    ],

    gallery: [
      { image: 'assets/img/gallery/01.jpg', caption: 'TODO: image caption' },
      { image: 'assets/img/gallery/02.jpg', caption: 'TODO: image caption' },
      { image: 'assets/img/gallery/03.jpg', caption: 'TODO: image caption' }
    ]
  };

  App.teamData = TEAM;
})(window.App);
