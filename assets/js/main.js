/* AURIS — small progressive enhancements: mobile menu and theme toggle. */
(function () {
  var root = document.documentElement;

  /* ---- Mobile navigation ------------------------------------------------ */
  var navToggle = document.querySelector('[data-nav-toggle]');
  var nav = document.getElementById('site-nav');

  function setNav(open) {
    if (!navToggle || !nav) return;
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      setNav(navToggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        setNav(false);
        navToggle.focus();
      }
    });
  }

  /* ---- Theme toggle ----------------------------------------------------- */
  var themeToggle = document.querySelector('[data-theme-toggle]');
  var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function currentTheme() {
    var forced = root.getAttribute('data-theme');
    if (forced) return forced;
    return media && media.matches ? 'dark' : 'light';
  }

  function updateLabel() {
    if (!themeToggle) return;
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    themeToggle.setAttribute('aria-label', 'Switch to ' + next + ' theme');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('auris-theme', next); } catch (e) { /* ignore */ }
      updateLabel();
    });
    if (media && media.addEventListener) media.addEventListener('change', updateLabel);
    updateLabel();
  }
})();
