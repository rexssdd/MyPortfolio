/**
 * loader.js
 * Vanilla JS loader animation — runs before React mounts.
 * Exposes: skipLoader(), setAllImages(), toast() as globals.
 */

(function () {
  'use strict';

  /* ── Config ─────────────────────────────────────────── */
  const TOTAL_MS = 6500;
  const STEPS = [
    { pct:  8, msg: 'Booting up systems…' },
    { pct: 22, msg: 'Loading portfolio assets…' },
    { pct: 38, msg: 'Rendering UI components…' },
    { pct: 55, msg: 'Connecting to the stack…' },
    { pct: 68, msg: 'Parsing project data…' },
    { pct: 80, msg: 'Optimising experience…' },
    { pct: 92, msg: 'Almost there…' },
    { pct:100, msg: 'Welcome. ✓' },
  ];

  let done     = false;
  let stepIdx  = 0;
  let interval = null;

  /* ── Elements ───────────────────────────────────────── */
  const $ = (id) => document.getElementById(id);

  function runLoader () {
    const bar    = $('loader-bar');
    const lbl    = $('loader-status-lbl');
    const pctLbl = $('loader-pct-lbl');
    const stat   = $('loader-status');
    const ms     = TOTAL_MS / STEPS.length;

    interval = setInterval(function () {
      if (stepIdx >= STEPS.length) { clearInterval(interval); return; }
      const s = STEPS[stepIdx];
      bar.style.width         = s.pct + '%';
      bar.setAttribute('aria-valuenow', s.pct);
      lbl.textContent         = s.msg;
      pctLbl.textContent      = s.pct + '%';
      stat.textContent        = '> ' + s.msg;
      stepIdx++;
      if (stepIdx === STEPS.length) setTimeout(finishLoader, 400);
    }, ms);
  }

  function finishLoader () {
    if (done) return;
    done = true;
    clearInterval(interval);

    const bar = $('loader-bar');
    if (bar) { bar.style.width = '100%'; bar.setAttribute('aria-valuenow', 100); }
    const lbl = $('loader-status-lbl'); if (lbl) lbl.textContent = 'Complete ✓';
    const pct = $('loader-pct-lbl');   if (pct) pct.textContent = '100%';

    setTimeout(function () {
      const loader = $('loader');
      if (!loader) return;
      loader.classList.add('exit');

      const nav = document.getElementById('nav');
      if (nav) nav.classList.add('ready');

      setTimeout(function () {
        if (loader) loader.style.display = 'none';
        if (typeof window.initParticles === 'function') window.initParticles();
      }, 900);
    }, 500);
  }

  /* Public: called by Skip button */
  window.skipLoader = function () {
    clearInterval(interval);
    const bar = $('loader-bar');
    if (bar) { bar.style.transition = 'width .2s'; bar.style.width = '100%'; }
    setTimeout(finishLoader, 200);
  };

  /* Public: sync photo across all image slots */
  window.setAllImages = function (url) {
    ['loader-ph-img', 'profile-img', 'about-img'].forEach(function (id) {
      const img = $(id);
      if (!img) return;
      img.src = url;
      img.onload = function () { img.classList.add('loaded'); };
    });
    /* Hide SVG placeholders once a real photo is provided */
    ['loader-avatar-svg', 'profile-placeholder', 'about-initials-svg'].forEach(function (id) {
      const el = $(id); if (el) el.style.display = 'none';
    });
  };

  /* File input listeners */
  function bindFileInput (inputId) {
    const el = $(inputId);
    if (!el) return;
    el.addEventListener('change', function () {
      if (this.files && this.files[0]) {
        window.setAllImages(URL.createObjectURL(this.files[0]));
      }
    });
  }

  /* Toast (global — used by React components too) */
  let toastTimer;
  window.toast = function (msg, type) {
    type = type || 'ok';
    const t = $('toast');
    if (!t) return;
    t.textContent = msg;
    t.className   = '';
    void t.offsetWidth; /* force reflow */
    t.classList.add('show', type);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 3500);
  };

  /* ── Scroll handlers (shared; React reads #prog) ───── */
  window.addEventListener('scroll', function () {
    const sy = window.scrollY;
    const dh = document.documentElement.scrollHeight - window.innerHeight;
    const prog = $('prog');
    if (prog) {
      const pct = dh > 0 ? (sy / dh * 100) : 0;
      prog.style.width = pct + '%';
      prog.setAttribute('aria-valuenow', Math.round(pct));
    }
    const nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('scrolled', sy > 50);
    const st = $('st');
    if (st) st.classList.toggle('vis', sy > 400);
  });

  /* ── Particle canvas ────────────────────────────────── */
  let particles = [];
  let animId    = null;

  window.initParticles = function () {
    const canvas = document.getElementById('cv');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize () {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const n = Math.min(50, Math.floor(window.innerWidth / 24));
    particles = [];
    for (let i = 0; i < n; i++) {
      particles.push({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - .5) * .22,
        vy: (Math.random() - .5) * .22,
        r:  Math.random() * 1.1 + .4,
        op: Math.random() * .3 + .07,
      });
    }

    function draw () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(function (p) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37,99,235,' + p.op + ')';
        ctx.fill();
      });
      particles.forEach(function (p, i) {
        particles.slice(i + 1).forEach(function (q) {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 85) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = 'rgba(37,99,235,' + (.04 * (1 - d / 85)) + ')';
            ctx.lineWidth = .5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    }
    if (animId) cancelAnimationFrame(animId);
    draw();
  };

  /* ── Boot ─────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    bindFileInput('loader-file-input');
    /* Loader avatar click → file input */
    const av = $('loader-avatar');
    if (av) av.addEventListener('click', function () {
      const fi = $('loader-file-input'); if (fi) fi.click();
    });
    setTimeout(runLoader, 1500);
  });
}());
