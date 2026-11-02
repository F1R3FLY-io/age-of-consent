(function () {
  // mobile contents rail
  var btn = document.getElementById('railtoggle');
  if (btn) {
    var set = function (open) { document.body.classList.toggle('rail-open', open); btn.setAttribute('aria-expanded', String(open)); btn.textContent = open ? 'Close' : 'Contents'; };
    btn.addEventListener('click', function () { set(!document.body.classList.contains('rail-open')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
    document.addEventListener('click', function (e) {
      if (document.body.classList.contains('rail-open') && !e.target.closest('.rail') && e.target !== btn) set(false);
    });
  }
  // keyboard paging
  document.addEventListener('keydown', function (e) {
    if (e.target.closest('input, textarea') || e.metaKey || e.ctrlKey || e.altKey) return;
    var a = e.key === 'ArrowLeft' ? document.querySelector('.pager .prev') : e.key === 'ArrowRight' ? document.querySelector('.pager .next') : null;
    if (a) location.href = a.href;
  });
  // what is not on the page
  var KEY = 'acx-found';
  var reveal = function () {
    var eggs = document.querySelectorAll('[data-egg]');
    for (var i = 0; i < eggs.length; i++) eggs[i].hidden = false;
    try { localStorage.setItem(KEY, '1'); } catch (e) {}
  };
  var found = false;
  try { found = localStorage.getItem(KEY) === '1'; } catch (e) {}
  if (found || location.hash === '#show-hidden') reveal();
  window.addEventListener('hashchange', function () { if (location.hash === '#show-hidden') reveal(); });
  var typed = '';
  document.addEventListener('keydown', function (e) {
    if (!e.key || e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-5);
    if (typed === 'robin') reveal();
  });
})();
