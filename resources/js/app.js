/* ── Toast ── */
window.toast = function (msg, type = 'ok') {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.className = type + ' show';
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => el.classList.remove('show'), 4500);
};

document.addEventListener('DOMContentLoaded', () => {

  /* ── Aurora ambient background ── */
  const auroraOrbs = document.querySelectorAll('.aurora-orb');
  requestAnimationFrame(() => {
    auroraOrbs.forEach(o => o.classList.add('ready'));
  });

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── Typing Effect ── */
  const roles = window.portfolioData?.roles ?? [];
  const typedEl = document.getElementById('typed-text');
  if (typedEl && roles.length) {
    let idx = 0, ci = 0, deleting = false;
    const typeMs = 90, deleteMs = 50, pauseMs = 1900;
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
      if (window.scrollY >= s.offsetTop - 140) cur = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.dataset.nav === cur);
      if (a.dataset.nav === cur) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    // Scroll-class for nav
    const nav = document.getElementById('nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── Hamburger ── */
  const ham = document.querySelector('.hamburger');
  const navList = document.getElementById('nav-links');
  if (ham && navList) {
    ham.addEventListener('click', () => {
      const open = navList.classList.toggle('open');
      ham.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navList.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        navList.classList.remove('open');
        ham.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      })
    );
  }

  /* ── Scroll progress bar ── */
  const prog = document.getElementById('prog');
  function updateProg() {
    if (!prog) return;
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    prog.style.width = Math.min(pct, 100) + '%';
  }
  window.addEventListener('scroll', updateProg, { passive: true });

  /* ── Enhanced Intersection reveal with multiple animation types ── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

  // All reveal elements
  document.querySelectorAll('[data-reveal], .rev, .rev-left, .rev-right, .rev-scale, .tl-item').forEach(el => {
    revealObs.observe(el);
  });

  // Rev-stagger: observe parent, children animate via CSS
  document.querySelectorAll('.rev-stagger').forEach(el => revealObs.observe(el));

  /* ── Staggered card reveals ── */
  const cardObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const cards = e.target.querySelectorAll('.sk-card, .proj-card, .cert-card, .lang-row');
        cards.forEach((card, i) => {
          setTimeout(() => card.classList.add('vis'), i * 60);
        });
        cardObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.05 });

  // Temporarily make cards invisible for reveal
  document.querySelectorAll('.skills-grid, .proj-grid, .certs-grid, .lang-grid').forEach(grid => {
    grid.querySelectorAll('.sk-card, .proj-card, .cert-card, .lang-row').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(16px)';
      card.style.transition = 'opacity .5s ease, transform .5s ease';
      card.addEventListener('transitionend', () => {
        card.style.opacity = '';
        card.style.transform = '';
        card.style.transition = '';
      }, { once: true });
    });
    // Override card .vis to set visible
    grid.querySelectorAll('.sk-card, .proj-card, .cert-card, .lang-row').forEach(card => {
      // Patch: add vis class handler
      const origAddClass = card.classList.add.bind(card.classList);
    });
    cardObs.observe(grid);
  });

  // Simple observer that adds visible class
  const simpleCardObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const cards = e.target.querySelectorAll('.sk-card, .proj-card, .cert-card, .lang-row');
        cards.forEach((card, i) => {
          card.style.transitionDelay = (i * 55) + 'ms';
          card.style.opacity = '1';
          card.style.transform = 'none';
        });
        simpleCardObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.04 });

  document.querySelectorAll('.skills-grid, .proj-grid, .certs-grid, .lang-grid').forEach(g => {
    simpleCardObs.observe(g);
  });

  /* ── Skill bars ── */
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.querySelectorAll('.sk-bar:not([data-animated])').forEach(b => {
            b.style.width = (b.dataset.w || '0') + '%';
            b.dataset.animated = '1';
          });
        }, 100);
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  const skillGrid = document.getElementById('skills-grid');
  if (skillGrid) barObs.observe(skillGrid);

  /* ── Language bars ── */
  const langObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.lang-fill[data-pct]').forEach((bar, i) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.pct + '%';
          }, i * 80);
        });
        langObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.lang-grid').forEach(g => langObs.observe(g));

  /* ── Skill category filter ── */
  const skillCats = document.getElementById('skill-cats');
  if (skillCats && skillGrid) {
    skillCats.addEventListener('click', e => {
      const btn = e.target.closest('[data-cat]');
      if (!btn) return;
      const cat = btn.dataset.cat;
      skillCats.querySelectorAll('.scat').forEach(b => {
        b.classList.toggle('on', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      skillGrid.querySelectorAll('.sk-card').forEach((card, i) => {
        const show = cat === 'all' || card.dataset.category === cat;
        card.style.display = show ? '' : 'none';
        if (show) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          card.style.transition = 'opacity .4s ease, transform .4s ease';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'none';
          }, i * 40);
          // Re-animate bar
          const bar = card.querySelector('.sk-bar');
          if (bar) {
            bar.style.width = '0%';
            delete bar.dataset.animated;
            setTimeout(() => {
              bar.style.width = (bar.dataset.w || '0') + '%';
              bar.dataset.animated = '1';
            }, i * 40 + 80);
          }
        }
      });
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
      let visIdx = 0;
      projGrid.querySelectorAll('.proj-card').forEach(card => {
        const filters = card.dataset.filters.split(',');
        const show = filter === 'all' || filters.includes(filter);
        if (show) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(14px) scale(.98)';
          card.style.transition = `opacity .4s ease ${visIdx * 60}ms, transform .4s ease ${visIdx * 60}ms`;
          requestAnimationFrame(() => requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'none';
          }));
          visIdx++;
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  /* ── Hero subtle parallax ── */
  const heroLeft = document.querySelector('.hero-left');
  const heroRight = document.querySelector('.hero-right');
  if (heroLeft && heroRight && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    function heroParallax() {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.5) {
        heroLeft.style.transform  = `translateY(${y * 0.08}px)`;
        heroRight.style.transform = `translateY(${y * 0.05}px)`;
      }
    }
    window.addEventListener('scroll', heroParallax, { passive: true });
  }

  /* ── Magnetic effect on primary buttons ── */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.btn-p, .btn-g, #resume-btn').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.28;
        const dy = (e.clientY - cy) * 0.28;
        btn.style.transform = `translate(${dx}px, ${dy - 3}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* ── Cursor glow ── */
  const cursorGlow = document.createElement('div');
  cursorGlow.id = 'cursor-glow';
  cursorGlow.style.cssText = `
    position: fixed; width: 400px; height: 400px;
    border-radius: 50%; pointer-events: none; z-index: 0;
    background: radial-gradient(circle, rgba(255,107,74,.07) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity .3s;
    will-change: left, top;
  `;
  document.body.appendChild(cursorGlow);

  let cursorX = 0, cursorY = 0;
  let glowX = 0, glowY = 0;
  document.addEventListener('mousemove', e => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });
  function animateCursorGlow() {
    glowX += (cursorX - glowX) * 0.08;
    glowY += (cursorY - glowY) * 0.08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top  = glowY + 'px';
    requestAnimationFrame(animateCursorGlow);
  }
  animateCursorGlow();

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
      stBtn.classList.toggle('vis', window.scrollY > 500);
    }, { passive: true });
    stBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── Flash toast from session ── */
  const successAlert = document.querySelector('.alert-success');
  if (successAlert) { window.toast(successAlert.textContent.trim(), 'ok'); successAlert.style.display = 'none'; }
  const errorAlert = document.querySelector('.alert-error');
  if (errorAlert) { window.toast(errorAlert.textContent.trim(), 'err'); errorAlert.style.display = 'none'; }

  /* ── Count-up animation for hero stats ── */
  const statObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.stat-num').forEach(el => {
        const raw = el.textContent.trim();
        const num = parseInt(raw);
        if (isNaN(num)) return;
        const suffix = raw.replace(/[0-9]/g, '');
        let start = 0;
        const duration = 1200;
        const startTime = performance.now();
        function countUp(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // ease out
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * num) + suffix;
          if (progress < 1) requestAnimationFrame(countUp);
        }
        requestAnimationFrame(countUp);
      });
      statObs.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statObs.observe(heroStats);

});
