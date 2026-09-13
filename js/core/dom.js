(function (App) {
  'use strict';

  function qs(selector, root) {
    return (root || document).querySelector(selector);
  }

  function qsa(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);

    Object.keys(attrs || {}).forEach(function (key) {
      var value = attrs[key];
      if (value === null || value === undefined || value === false) return;
      if (key === 'text') node.textContent = value;
      else if (key === 'html') node.innerHTML = value;
      else node.setAttribute(key, value);
    });

    (children || []).forEach(function (child) {
      node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    });

    return node;
  }

  function fill(root, children) {
    root.innerHTML = '';
    (Array.isArray(children) ? children : [children]).forEach(function (child) {
      root.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    });
    return root;
  }

  function on(root, type, selector, handler) {
    root.addEventListener(type, function (event) {
      var target = event.target.closest(selector);
      if (target && root.contains(target)) handler(event, target);
    });
  }

  App.dom = { qs: qs, qsa: qsa, el: el, fill: fill, on: on };
})(window.App);
