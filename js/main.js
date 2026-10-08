/* ==========================================================
   A. Rajesh — Portfolio scripts (vanilla JS, no dependencies)
   ========================================================== */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Footer year ---------- */
  $('#year').textContent = new Date().getFullYear();

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var themeBtn = $('#themeToggle');
  function syncThemeIcon() {
    var dark = root.getAttribute('data-theme') !== 'light';
    themeBtn.innerHTML = dark ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', dark ? '#0b0d17' : '#f6f7fc');
  }
  themeBtn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncThemeIcon();
  });
  syncThemeIcon();

  /* ---------- Mobile menu ---------- */
  var menuBtn = $('#menuBtn');
  var navLinks = $('#navLinks');
  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.innerHTML = open ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
  }
  menuBtn.addEventListener('click', function () { setMenu(!navLinks.classList.contains('open')); });
  $$('a', navLinks).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Typing effect ---------- */
  var typedEl = $('#typed');
  var words = ['a Student', 'a Quick Learner', 'a Problem Solver', 'a Chess Player', 'an Aspiring Developer'];
  if (reduceMotion) {
    typedEl.textContent = words[0];
  } else {
    var w = 0, c = 0, deleting = false;
    (function tick() {
      var word = words[w];
      typedEl.textContent = word.substring(0, c);
      var delay = deleting ? 45 : 95;
      if (!deleting && c === word.length) { delay = 1600; deleting = true; }
      else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
      else { c += deleting ? -1 : 1; }
      setTimeout(tick, delay);
    })();
  }

  /* ---------- Scroll: progress bar, sticky nav, back-to-top ---------- */
  var nav = $('#nav');
  var progress = $('#scrollProgress');
  var toTop = $('#toTop');
  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    nav.classList.toggle('scrolled', y > 20);
    toTop.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });

  /* ---------- Active nav link ---------- */
  var sections = $$('main section[id]');
  var links = $$('a', navLinks);
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Reveal on scroll + counters + progress meters ---------- */
  function animateCount(el) {
    var to = parseFloat(el.dataset.to);
    var decimals = parseInt(el.dataset.decimals || '0', 10);
    if (reduceMotion) { el.textContent = to.toFixed(decimals); return; }
    var dur = 1600, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (to * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function onReveal(el) {
    el.classList.add('visible');
    $$('.count', el).forEach(animateCount);
    $$('.meter-fill', el).forEach(function (m) { m.style.width = m.dataset.fill + '%'; });
  }

  var revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { onReveal(en.target); io.unobserve(en.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(onReveal);
  }

  /* ---------- Contact form (opens the visitor's email app) ---------- */
  var form = $('#contactForm');
  var note = $('#formNote');
  var TO = 'rajeshambati187@gmail.com';
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    ['name', 'email', 'message'].forEach(function (id) {
      var input = $('#' + id);
      var valid = input.value.trim() !== '' && (id !== 'email' || /^\S+@\S+\.\S+$/.test(input.value.trim()));
      input.parentElement.classList.toggle('error', !valid);
      if (!valid) ok = false;
    });
    if (!ok) {
      note.textContent = 'Please fill in all fields with a valid email.';
      note.classList.add('error');
      return;
    }
    note.classList.remove('error');
    var name = $('#name').value.trim();
    var email = $('#email').value.trim();
    var msg = $('#message').value.trim();
    var subject = encodeURIComponent('Portfolio message from ' + name);
    var body = encodeURIComponent(msg + '\n\n— ' + name + ' (' + email + ')');
    window.location.href = 'mailto:' + TO + '?subject=' + subject + '&body=' + body;
    note.textContent = 'Thanks! Your email app should open now.';
    form.reset();
  });
})();
