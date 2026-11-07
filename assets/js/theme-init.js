/* Runs in <head> before first paint: applies a saved light/dark choice and flags JS support. */
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  try {
    var saved = localStorage.getItem('auris-theme');
    if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  } catch (e) { /* storage unavailable: follow the system setting */ }
})();
