import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Lenis smooth scroll ──
   Replaces native scroll with an inertia-based scroller (the same
   underlying approach awwwards-style sites use). Falls back to native
   scroll for users who prefer reduced motion. */
let lenis = null;
if (!reduceMotion) {
  lenis = new Lenis({
    duration: 1.1,                 // higher = floatier
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  });

  // Drive Lenis from the browser's own RAF loop
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Keep GSAP ScrollTrigger in sync with Lenis instead of native scroll
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  window.lenis = lenis; // exposed for debugging / future use
}

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

  /* ── Matrix rain background ── */
  (function initMatrixRain() {
    const canvas = document.getElementById('matrix-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01';
    const fontSize = 16;
    let columns, drops;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -50);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function draw() {
      ctx.fillStyle = 'rgba(10,14,12,0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + 'px monospace';
      for (let i = 0; i < columns; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillStyle = Math.random() > 0.96 ? '#bfffd6' : '#39FF6A';
        ctx.fillText(text, x, y);
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
      setInterval(draw, 45);
    } else {
      ctx.fillStyle = '#0A0E0C';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  })();

  /* ── Aurora ambient background ── */
  const auroraOrbs = document.querySelectorAll('.aurora-orb');
  requestAnimationFrame(() => {
    auroraOrbs.forEach(o => o.classList.add('ready'));
  });

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetSel = link.getAttribute('href');
      if (!targetSel || targetSel === '#') return;
      const target = document.querySelector(targetSel);
      if (!target) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -16, duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
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
  // All reveal elements — same .vis class contract your CSS already uses,
  // now driven by ScrollTrigger for smoother, Lenis-synced timing.
  document.querySelectorAll('[data-reveal], .rev, .rev-left, .rev-right, .rev-scale, .tl-item, .rev-stagger').forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top bottom-=40px',
      once: true,
      onEnter: () => el.classList.add('vis'),
    });
  });

  /* ── Staggered card reveals ──
     One observer per grid (previously three overlapping ones fought over
     the same cards). Cards animate via GSAP stagger instead of CSS
     transition-delay hacks, which plays nicer with Lenis's inertia scroll. */
  document.querySelectorAll('.skills-grid, .proj-grid, .certs-grid, .lang-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.sk-card, .proj-card, .cert-card, .lang-row');
    if (!cards.length) return;

    gsap.set(cards, { opacity: 0, y: 16 });
    ScrollTrigger.create({
      trigger: grid,
      start: 'top bottom-=20px',
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.055,
        });
      },
    });
  });

  /* ── Profile detail reveals ──
     Granular, item-by-item scroll animations for your actual profile
     content — About paragraphs, trait tags, floating skill badges, and
     hero stats — instead of those blocks just appearing all at once.
     Purely additive: doesn't touch the matrix rain or aurora backgrounds. */

  // About section: intro paragraphs reveal line by line
  const aboutCol = document.querySelector('#about .sec-head');
  if (aboutCol) {
    const paras = aboutCol.querySelectorAll('p');
    if (paras.length) {
      gsap.set(paras, { opacity: 0, y: 14 });
      ScrollTrigger.create({
        trigger: aboutCol,
        start: 'top bottom-=60px',
        once: true,
        onEnter: () => gsap.to(paras, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.12 }),
      });
    }
  }

  // About trait tags — pop in one after another
  document.querySelectorAll('.about-tags').forEach(list => {
    const tags = list.querySelectorAll('.tag');
    if (!tags.length) return;
    gsap.set(tags, { opacity: 0, y: 10, scale: 0.92 });
    ScrollTrigger.create({
      trigger: list,
      start: 'top bottom-=30px',
      once: true,
      onEnter: () => gsap.to(tags, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.7)', stagger: 0.06 }),
    });
  });

  // Floating skill badges on the About profile photo
  document.querySelectorAll('.about-visual').forEach(visual => {
    const badges = visual.querySelectorAll('.fl-badge');
    if (!badges.length) return;
    gsap.set(badges, { opacity: 0, y: 0, scale: 0.85 });
    ScrollTrigger.create({
      trigger: visual,
      start: 'top bottom-=20px',
      once: true,
      onEnter: () => gsap.to(badges, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.6)', stagger: 0.18 }),
    });
  });

  // Hero stats (Projects / Certs / Technologies / Curiosity) — each eases in separately
  document.querySelectorAll('.hero-stats').forEach(dl => {
    const stats = dl.querySelectorAll('.stat');
    if (!stats.length) return;
    gsap.set(stats, { opacity: 0, y: 16 });
    ScrollTrigger.create({
      trigger: dl,
      start: 'top bottom-=30px',
      once: true,
      onEnter: () => gsap.to(stats, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.1 }),
    });
  });

  // Hero profile badges ("Open to Work", "Based in Philippines")
  document.querySelectorAll('.hero-right').forEach(col => {
    const badges = col.querySelectorAll('.profile-badge');
    if (!badges.length) return;
    gsap.set(badges, { opacity: 0, y: 12, scale: 0.95 });
    ScrollTrigger.create({
      trigger: col,
      start: 'top bottom-=20px',
      once: true,
      onEnter: () => gsap.to(badges, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out', stagger: 0.12 }),
    });
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
  window.toast('Opening LinkedIn...', 'ok');

  setTimeout(() => {
    window.open('https://www.linkedin.com/in/rexcel-jay-lusica-7a898436b', '_blank');
  }, 500);
});

  /* ── Scroll to top ── */
  const stBtn = document.getElementById('st');
  if (stBtn) {
    window.addEventListener('scroll', () => {
      stBtn.classList.toggle('vis', window.scrollY > 500);
    }, { passive: true });
    stBtn.addEventListener('click', () => {
      if (lenis) lenis.scrollTo(0, { duration: 1.2 });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
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

  /* ── Code Sprint: typing speed game ──
     A small showcase game: type the code snippet as fast/accurately as
     possible. Tracks WPM, accuracy, time, and a localStorage best score.
     Pure vanilla JS — no backend needed. */
  (function initCodeSprint() {
    const codeEl    = document.getElementById('sprint-code');
    const inputEl   = document.getElementById('sprint-input');
    const wpmEl     = document.getElementById('sprint-wpm');
    const accEl     = document.getElementById('sprint-acc');
    const timeEl    = document.getElementById('sprint-time');
    const bestEl    = document.getElementById('sprint-best');
    const msgEl     = document.getElementById('sprint-msg');
    const restartBtn = document.getElementById('sprint-restart');
    if (!codeEl || !inputEl) return;

    const SNIPPETS = [
      `function debounce(fn, wait) {\n  let t;\n  return (...args) => {\n    clearTimeout(t);\n    t = setTimeout(() => fn(...args), wait);\n  };\n}`,
      `Route::middleware('auth')->group(function () {\n    Route::get('/dashboard', [DashboardController::class, 'index']);\n});`,
      `public function index() {\n    return User::where('active', true)\n        ->orderBy('created_at', 'desc')\n        ->paginate(15);\n}`,
      `const [data, setData] = useState(null);\nuseEffect(() => {\n  fetch('/api/profile').then(r => r.json()).then(setData);\n}, []);`,
      `SELECT name, email FROM users\nWHERE role = 'admin'\nORDER BY created_at DESC\nLIMIT 10;`,
      `try {\n    $hashed = Hash::make($password);\n} catch (Exception $e) {\n    Log::error($e->getMessage());\n}`,
    ];

    const STORAGE_KEY = 'codeSprintBestWpm';
    let chars = [];
    let startTime = null;
    let timerInterval = null;
    let finished = false;

    function loadBest() {
      const best = localStorage.getItem(STORAGE_KEY);
      bestEl.textContent = best ? best : '—';
    }

    function pickSnippet() {
      return SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)];
    }

    function renderCode(target, typed) {
      codeEl.innerHTML = '';
      const frag = document.createDocumentFragment();
      for (let i = 0; i < target.length; i++) {
        const span = document.createElement('span');
        span.textContent = target[i];
        if (i < typed.length) {
          span.className = typed[i] === target[i] ? 'ch-correct' : 'ch-incorrect';
        } else if (i === typed.length) {
          span.className = 'ch-current';
        }
        frag.appendChild(span);
      }
      codeEl.appendChild(frag);
    }

    function reset() {
      finished = false;
      clearInterval(timerInterval);
      startTime = null;
      chars = pickSnippet().split('');
      inputEl.value = '';
      renderCode(chars.join(''), '');
      wpmEl.textContent = '0';
      accEl.textContent = '100%';
      timeEl.textContent = '0.0s';
      msgEl.textContent = 'Click the terminal and start typing to begin.';
      msgEl.classList.remove('win');
      loadBest();
    }

    function startTimerLoop() {
      timerInterval = setInterval(() => {
        if (!startTime) return;
        const elapsed = (Date.now() - startTime) / 1000;
        timeEl.textContent = elapsed.toFixed(1) + 's';
      }, 100);
    }

    function finish(typed) {
      finished = true;
      clearInterval(timerInterval);
      const elapsedSec = Math.max((Date.now() - startTime) / 1000, 0.1);
      const target = chars.join('');
      let correct = 0;
      for (let i = 0; i < typed.length; i++) if (typed[i] === target[i]) correct++;
      const accuracy = Math.round((correct / target.length) * 100);
      const words = target.length / 5; // standard WPM word unit
      const wpm = Math.round(words / (elapsedSec / 60));

      wpmEl.textContent = wpm;
      accEl.textContent = accuracy + '%';
      timeEl.textContent = elapsedSec.toFixed(1) + 's';

      const best = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
      if (wpm > best) {
        localStorage.setItem(STORAGE_KEY, String(wpm));
        bestEl.textContent = wpm;
        msgEl.textContent = `🔥 New personal best — ${wpm} WPM at ${accuracy}% accuracy!`;
      } else {
        msgEl.textContent = `Done! ${wpm} WPM at ${accuracy}% accuracy. Try again for a new best?`;
      }
      msgEl.classList.add('win');
      inputEl.blur();
    }

    codeEl.addEventListener('click', () => inputEl.focus());
    codeEl.addEventListener('keydown', () => inputEl.focus());

    inputEl.addEventListener('input', () => {
      if (finished) { inputEl.value = ''; return; }
      const typed = inputEl.value;
      const target = chars.join('');

      if (!startTime && typed.length > 0) {
        startTime = Date.now();
        startTimerLoop();
        msgEl.textContent = 'Go! Keep typing…';
      }

      renderCode(target, typed);

      if (typed.length >= target.length) {
        finish(typed);
      }
    });

    restartBtn?.addEventListener('click', reset);

    reset();
  })();

});
