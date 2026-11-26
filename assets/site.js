(function () {
  'use strict';
  var navbar = document.getElementById('navbar');
  var navLinks = document.getElementById('navLinks');
  var hamburger = document.getElementById('hamburger');
  var scrollTopBtn = document.getElementById('scrollTop');
  var groups = document.querySelectorAll('.nav-group');

  function closeGroups(except) {
    groups.forEach(function (g) {
      if (g !== except) {
        g.classList.remove('open');
        g.querySelector('.nav-group-toggle').setAttribute('aria-expanded', 'false');
      }
    });
  }
  groups.forEach(function (g) {
    var btn = g.querySelector('.nav-group-toggle');
    btn.addEventListener('click', function () {
      var open = !g.classList.contains('open');
      closeGroups(g); g.classList.toggle('open', open); btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-group')) closeGroups();
  });
  hamburger.addEventListener('click', function () {
    var open = !navLinks.classList.contains('open');
    navLinks.classList.toggle('open', open); hamburger.classList.toggle('is-open', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var ae = document.activeElement;
    var inGroup = ae && ae.closest && ae.closest('.nav-group');
    closeGroups();
    if (inGroup) { var t = inGroup.querySelector('.nav-group-toggle'); if (ae !== t) t.focus(); t.blur(); }
  });
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    scrollTopBtn.classList.toggle('show', window.scrollY > 500);
  }
  window.addEventListener('scroll', onScroll);
  onScroll();
  scrollTopBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });

  // Deep links such as /cv/#education: scroll below the fixed navigation bar
  if (location.hash.length > 1) {
    var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) requestAnimationFrame(function () {
      window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - 90);
    });
  }

  // Photograph viewer (pages that have photographs)
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;
  var lightboxImg = document.getElementById('lightboxImg');
  var thumbs = [], currentIndex = 0, lastFocus = null;
  function updateLightbox() {
    var t = thumbs[currentIndex];
    lightboxImg.src = t.dataset.full;
    lightboxImg.alt = t.querySelector('img').alt;
  }
  function openLightbox(t) {
    lastFocus = document.activeElement;
    thumbs = Array.from(t.closest('.gallery-grid').querySelectorAll('.gallery-open'));
    currentIndex = thumbs.indexOf(t);
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    var closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.focus();
    requestAnimationFrame(function () { closeBtn.focus(); });
  }
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  function navigateLightbox(dir) {
    currentIndex = (currentIndex + dir + thumbs.length) % thumbs.length;
    updateLightbox();
  }
  document.querySelectorAll('.gallery-open').forEach(function (t) {
    t.addEventListener('click', function () { openLightbox(t); });
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', function () { navigateLightbox(-1); });
  lightbox.querySelector('.lightbox-next').addEventListener('click', function () { navigateLightbox(1); });
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigateLightbox(1);
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'Tab') {
      var f = Array.from(lightbox.querySelectorAll('button'));
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
