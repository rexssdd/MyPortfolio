/**
 * app.js — Portfolio interactivity (Laravel/Blade version)
 * Handles: typing effect, scroll spy, skill/project filters,
 *          intersection reveal, scroll-to-top, toast, canvas bg.
 */

/* ── Toast ── */
window.toast = function (msg, type = 'ok') {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.className = type + ' show';
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    el.classList.remove('show');
  }, 4500);
};

document.addEventListener('DOMContentLoaded', () => {

  /* ── Typing Effect ── */
  const roles = window.portfolioData?.roles ?? [];
  const typedEl = document.getElementById('typed-text');
  if (typedEl && roles.length) {
    let idx = 0, ci = 0, deleting = false;
    const typeMs = 95, deleteMs = 55, pauseMs = 1800;
    function tick() {
      const cur = roles[idx];
      if (!deleting) {
        typedEl.textContent = cur.slice(0, ci + 1);
        ci++;
        if (ci >= cur.length) { deleting = true; return setTimeout(tick, pauseMs); }
      } else {
        typedEl.textContent = cur.slice(0, ci - 1);
        ci--;
        if (ci <= 0) { deleting = false; idx = (idx + 1) % roles.length; }
      }
      setTimeout(tick, deleting ? deleteMs : typeMs);
    }
    tick();
  }

  /* ── Scroll spy nav ── */
  const navLinks = document.querySelectorAll('[data-nav]');
  function updateNav() {
    let cur = 'hero';
    document.querySelectorAll('section[id]').forEach(s => {
      if (window.scrollY >= s.offsetTop - 130) cur = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.dataset.nav === cur);
      if (a.dataset.nav === cur) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }
  window.addEventListener('scroll', updateNav, { passive: true });

  /* ── Hamburger ── */
  const ham = document.querySelector('.hamburger');
  const navList = document.getElementById('nav-links');
  if (ham && navList) {
    ham.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      ham.setAttribute('aria-expanded', open);
    });
    navList.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        navList.classList.remove('open');
        ham.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* ── Scroll progress bar ── */
  const prog = document.getElementById('prog');
  function updateProg() {
    if (!prog) return;
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    prog.style.width = Math.min(pct, 100) + '%';
    prog.setAttribute('aria-valuenow', Math.round(pct));
  }
  window.addEventListener('scroll', updateProg, { passive: true });

  /* ── Intersection reveal ── */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('vis'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));

  /* ── Skill bars ── */
  function animateBars() {
    setTimeout(() => {
      document.querySelectorAll('.sk-bar:not([data-animated])').forEach(b => {
        b.style.width = (b.dataset.w || '0') + '%';
        b.dataset.animated = '1';
      });
    }, 80);
  }
  animateBars();

  /* ── Skill category filter ── */
  const skillCats = document.getElementById('skill-cats');
  const skillGrid = document.getElementById('skills-grid');
  if (skillCats && skillGrid) {
    skillCats.addEventListener('click', e => {
      const btn = e.target.closest('[data-cat]');
      if (!btn) return;
      const cat = btn.dataset.cat;
      skillCats.querySelectorAll('.scat').forEach(b => {
        b.classList.toggle('on', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      skillGrid.querySelectorAll('.sk-card').forEach(card => {
        const show = cat === 'all' || card.dataset.category === cat;
        card.style.display = show ? '' : 'none';
        if (show) { card.querySelector('.sk-bar').style.width = ''; }
      });
      skillGrid.setAttribute('aria-label',
        cat === 'all' ? 'All skills' : `Skills — ${btn.textContent}`);
      animateBars();
    });
  }

  /* ── Project filter ── */
  const projFilters = document.getElementById('proj-filters');
  const projGrid = document.getElementById('proj-grid');
  if (projFilters && projGrid) {
    projFilters.addEventListener('click', e => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      const filter = btn.dataset.filter;
      projFilters.querySelectorAll('.pfb').forEach(b => {
        b.classList.toggle('on', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      projGrid.querySelectorAll('.proj-card').forEach(card => {
        const filters = card.dataset.filters.split(',');
        card.style.display = (filter === 'all' || filters.includes(filter)) ? '' : 'none';
      });
    });
  }

  /* ── Demo buttons ── */
  document.querySelectorAll('.demo-btn').forEach(btn => {
    btn.addEventListener('click', () => window.toast('Live demo coming soon!', 'ok'));
  });

  /* ── LinkedIn button ── */
  document.getElementById('linkedin-btn')?.addEventListener('click', () => {
    window.toast('LinkedIn coming soon!', 'ok');
  });

  /* ── Scroll to top ── */
  const stBtn = document.getElementById('st');
  if (stBtn) {
    window.addEventListener('scroll', () => {
      stBtn.classList.toggle('vis', window.scrollY > 400);
    }, { passive: true });
    stBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }


  /* ── Flash toast (from session, non-contact pages) ── */
  const successAlert = document.querySelector('.alert-success');
  if (successAlert) { window.toast(successAlert.textContent.trim(), 'ok'); successAlert.style.display = 'none'; }
  const errorAlert = document.querySelector('.alert-error');
  if (errorAlert) { window.toast(errorAlert.textContent.trim(), 'err'); errorAlert.style.display = 'none'; }

});