(function (App) {
  'use strict';

  var el = App.dom.el;

  var PAGES = [
    { id: 'home', title: 'Home',   path: 'index.html',      icon: 'house' },
    { id: 'team', title: 'Task 1', path: 'pages/team.html', icon: 'users' }
  ];

  function nav(activeId) {
    return el('nav', { class: 'nav', 'aria-label': 'Main menu' }, PAGES.map(function (page) {
      var isActive = page.id === activeId;
      return el('a', {
        class: 'nav__link' + (isActive ? ' nav__link--active' : ''),
        href: App.url(page.path),
        'aria-current': isActive ? 'page' : null
      }, [App.icons.el(page.icon), el('span', { text: page.title })]);
    }));
  }

  function header(activeId) {
    return el('div', { class: 'header__inner container' }, [
      el('a', { class: 'logo', href: App.url('index.html') }, [
        App.icons.el('code-xml', 'logo__icon'),
        el('span', { class: 'logo__text', text: 'BitFaragó 2026' })
      ]),
      nav(activeId),
      el('button', {
        class: 'theme-toggle',
        type: 'button',
        'aria-label': 'Toggle light / dark theme',
        'data-theme-toggle': ''
      }, [App.icons.el('sun-moon')])
    ]);
  }

  function footer() {
    return el('div', { class: 'footer__inner container' }, [
      el('p', { text: 'BitFaragó 2026 — team page' }),
      el('p', { class: 'footer__muted', text: 'HTML · CSS · JavaScript' })
    ]);
  }

  function render() {
    var activeId = document.body.getAttribute('data-page');

    var headerRoot = document.getElementById('header');
    if (headerRoot) App.dom.fill(headerRoot, header(activeId));

    var footerRoot = document.getElementById('footer');
    if (footerRoot) App.dom.fill(footerRoot, footer());

    App.theme.init();
    App.icons.refresh();
  }

  App.layout = { render: render, PAGES: PAGES };
})(window.App);
