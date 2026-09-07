(function () {
  var header = document.querySelector('.cos-header');
  if (!header) return;

  var toggle = header.querySelector('.cos-header__toggle');
  var nav    = header.querySelector('.cos-nav');

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  var dropdowns = Array.prototype.slice.call(header.querySelectorAll('.cos-nav__dropdown'));
  var openTimer, closeTimer;

  function closeAll() {
    clearTimeout(openTimer);
    dropdowns.forEach(function (dd) {
      dd.classList.remove('is-open');
      dd.querySelector('.cos-nav__trigger').setAttribute('aria-expanded', 'false');
    });
  }

  dropdowns.forEach(function (dd) {
    var btn   = dd.querySelector('.cos-nav__trigger');
    var panel = dd.querySelector('.cos-nav__panel');

    function openDD() {
      clearTimeout(closeTimer);
      dropdowns.forEach(function (other) {
        if (other !== dd) {
          other.classList.remove('is-open');
          other.querySelector('.cos-nav__trigger').setAttribute('aria-expanded', 'false');
        }
      });
      dd.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
    }

    function closeDD() {
      clearTimeout(openTimer);
      dd.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      clearTimeout(openTimer); clearTimeout(closeTimer);
      dd.classList.contains('is-open') ? closeDD() : openDD();
    });

    dd.addEventListener('mouseenter', function () {
      if (window.innerWidth < 900) return;
      clearTimeout(closeTimer);
      openTimer = setTimeout(openDD, 120);
    });

    dd.addEventListener('mouseleave', function () {
      if (window.innerWidth < 900) return;
      clearTimeout(openTimer);
      closeTimer = setTimeout(closeDD, 200);
    });

    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeDD(); btn.focus(); return; }
      if (e.key === 'ArrowDown' && dd.classList.contains('is-open')) {
        e.preventDefault();
        var items = panel.querySelectorAll('.cos-nav__item');
        if (items[0]) items[0].focus();
      }
    });

    if (panel) {
      panel.addEventListener('keydown', function (e) {
        var items = Array.prototype.slice.call(panel.querySelectorAll('.cos-nav__item'));
        var idx   = items.indexOf(document.activeElement);
        if (e.key === 'ArrowDown') { e.preventDefault(); if (idx < items.length - 1) items[idx + 1].focus(); }
        if (e.key === 'ArrowUp')   { e.preventDefault(); if (idx > 0) items[idx - 1].focus(); else btn.focus(); }
        if (e.key === 'Escape')    { e.preventDefault(); closeDD(); btn.focus(); }
        if (e.key === 'Tab')       { closeDD(); }
      });
    }
  });

  document.addEventListener('click', function (e) {
    if (!header.contains(e.target)) closeAll();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll();
  });
})();
