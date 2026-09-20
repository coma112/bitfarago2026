(function (App) {
  'use strict';

  function row(icon, text) {
    var wrap = document.createElement('div');
    wrap.className = 'card__row';

    var i = document.createElement('i');
    i.setAttribute('data-lucide', icon);
    i.className = 'icon--sm';

    var span = document.createElement('span');
    span.textContent = text;

    wrap.appendChild(i);
    wrap.appendChild(span);
    return wrap;
  }

  function prependImage(card, path, alt) {
    if (!card || !path) return;
    var img = document.createElement('img');
    img.className = 'card__image';
    img.src = App.asset(path);
    img.alt = alt || '';
    card.insertBefore(img, card.firstChild);
  }

  App.page('team', function () {
    var qs = App.dom.qs;
    var data = App.teamData;

    App.clock.init(qs('[data-clock]'));

    var nameEl = qs('[data-team-name]');
    if (nameEl) nameEl.textContent = data.name || '';

    var schoolEl = qs('[data-school]');
    if (schoolEl && data.school) {
      prependImage(qs('[data-school-card]'), data.school.photo, data.school.name);
      schoolEl.appendChild(row('graduation-cap', data.school.name));
      if (data.school.city) schoolEl.appendChild(row('map-pin', data.school.city));
    }

    var teachersEl = qs('[data-teachers]');
    if (teachersEl) {
      (data.teachers || []).forEach(function (teacher, i) {
        if (i === 0) {
          prependImage(qs('[data-teacher-card]'), teacher.photo, teacher.name);
        }
        teachersEl.appendChild(row('user', teacher.name));
        if (teacher.subject) teachersEl.appendChild(row('laptop', teacher.subject));
      });
    }

    App.teamMembers.render(qs('[data-members]'), data.members);

    App.teamGallery.init({
      button: qs('[data-gallery-next]'),
      stage: qs('[data-gallery-stage]'),
      images: data.gallery
    });

    App.icons.refresh();
  });
})(window.App);


function saveRefuel(refuel) {
  const refuels = getRefuels();
  refuels.push(refuel);
  refuels.sort((a, b) => new Date(a.date) - new Date(b.date));
  localStorage.setItem(REFUEL_KEY, JSON.stringify(refuels));

  renderStatCards(document.querySelector('#statCards'), refuels);
}

App.page('refuel', function () {
  var refuels = getRefuels();

  renderStatCards(document.querySelector('#statCards'), refuels);

  var form = document.querySelector('#refuelForm');
  if (form) form.addEventListener('submit', handleRefuelSubmit);

  App.icons.refresh();
});