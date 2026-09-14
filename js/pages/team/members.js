(function (App) {
  'use strict';

  function createCard(member) {
    var card = document.createElement('article');
    card.className = 'card member-card';

    var img = document.createElement('img');
    img.className = 'card__image';
    img.src = App.asset(member.photo);
    img.alt = member.name || '';
    card.appendChild(img);

    var header = document.createElement('div');
    header.className = 'card__header';
    var title = document.createElement('h3');
    title.className = 'card__title';
    title.textContent = member.name || '';
    header.appendChild(title);
    card.appendChild(header);

    var role = document.createElement('p');
    role.className = 'member-card__role';
    role.textContent = member.role || '';
    card.appendChild(role);

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'badge';
    button.setAttribute('data-toggle', '');
    button.textContent = 'Show intro';
    card.appendChild(button);

    var intro = document.createElement('p');
    intro.className = 'member-card__intro';
    intro.setAttribute('data-intro', '');
    intro.hidden = true;
    intro.textContent = member.bio || '';
    card.appendChild(intro);

    button.addEventListener('click', function () {
      var opening = intro.hidden;
      intro.hidden = !opening;
      button.textContent = opening ? 'Hide intro' : 'Show intro';
    });

    return card;
  }

  function render(root, members) {
    if (!root) return;

    root.innerHTML = '';
    var list = members || [];

    if (!list.length) {
      var empty = document.createElement('p');
      empty.className = 'section__description';
      empty.textContent = 'Nincs megjeleníthető csapattag.';
      root.appendChild(empty);
      return;
    }

    var frag = document.createDocumentFragment();
    list.forEach(function (member) {
      frag.appendChild(createCard(member));
    });
    root.appendChild(frag);
  }

  App.teamMembers = { render: render };
})(window.App);