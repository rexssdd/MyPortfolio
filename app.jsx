/**
 * app.jsx
 * Main React application for the RJL Portfolio.
 *
 * HCI principles applied:
 *  - Visual hierarchy: typography scale, contrast ratios, whitespace
 *  - Affordances: hover states, cursors, focus rings, button shapes
 *  - Feedback: animations, toasts, inline validation, progress indicators
 *  - Fitts' Law: min 44px touch targets on all interactive elements
 *  - Accessibility: aria labels, landmark roles, keyboard navigation
 *  - Consistency: shared design tokens (CSS custom properties)
 *  - Error prevention: real-time form validation with clear messages
 */

const { useState, useEffect, useRef, useCallback } = React;

/* ═══════════════════════════════════════════════════════
   SVG PLACEHOLDER COMPONENTS
   These display until the user uploads a real photo.
   They act as affordances, hinting that a photo can go here.
═══════════════════════════════════════════════════════ */

/** Generic person silhouette — used in profile card and about section */
function AvatarPlaceholder({ size = 120, initials = 'RJL', gradient = ['#2563EB','#7C3AED','#10B981'] }) {
  const id = `grad-${initials.replace(/\s/g, '')}`;
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      width={size} height={size}
      role="img"
      aria-label={`${initials} profile photo placeholder`}
      style={{ display: 'block', flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          {gradient.map((c, i) => (
            <stop key={i} offset={`${i * 50}%`} stopColor={c} />
          ))}
        </linearGradient>
        <clipPath id={`clip-${id}`}>
          <circle cx="60" cy="60" r="60" />
        </clipPath>
      </defs>
      {/* Background */}
      <circle cx="60" cy="60" r="60" fill={`url(#${id})`} />
      {/* Head */}
      <circle cx="60" cy="44" r="18" fill="rgba(255,255,255,0.28)" />
      {/* Body / shoulders */}
      <ellipse cx="60" cy="92" rx="32" ry="22" fill="rgba(255,255,255,0.20)" clipPath={`url(#clip-${id})`} />
      {/* Camera hint icon */}
      <rect x="42" y="74" width="36" height="24" rx="4" fill="rgba(255,255,255,0.12)" />
      <circle cx="60" cy="86" r="7" fill="rgba(255,255,255,0.20)" />
      <circle cx="60" cy="86" r="4" fill="rgba(255,255,255,0.35)" />
      {/* Initials */}
      <text
        x="60" y="47"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Syne, sans-serif"
        fontSize="18"
        fontWeight="800"
        fill="rgba(255,255,255,0.95)"
      >
        {initials}
      </text>
    </svg>
  );
}

/** Database certification badge SVG */
function DbBadge() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="72" height="72" role="img" aria-label="Database Administration Certification badge">
      <defs>
        <linearGradient id="db-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
      </defs>
      {/* Shield shape */}
      <path d="M40 4 L70 16 L70 44 Q70 66 40 76 Q10 66 10 44 L10 16 Z" fill="url(#db-g)" />
      <path d="M40 10 L64 20 L64 44 Q64 62 40 70 Q16 62 16 44 L16 20 Z" fill="rgba(255,255,255,0.10)" />
      {/* Database icon: cylinders */}
      <ellipse cx="40" cy="28" rx="12" ry="4" fill="rgba(255,255,255,0.9)" />
      <rect x="28" y="28" width="24" height="10" fill="rgba(255,255,255,0.7)" />
      <ellipse cx="40" cy="38" rx="12" ry="4" fill="rgba(255,255,255,0.9)" />
      <rect x="28" y="38" width="24" height="10" fill="rgba(255,255,255,0.55)" />
      <ellipse cx="40" cy="48" rx="12" ry="4" fill="rgba(255,255,255,0.9)" />
      {/* Check mark */}
      <circle cx="56" cy="56" r="10" fill="#10B981" />
      <polyline points="51,56 55,60 62,52" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/** Cybersecurity certification badge SVG */
function CyberBadge() {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" width="72" height="72" role="img" aria-label="Cybersecurity Fundamentals Certification badge">
      <defs>
        <linearGradient id="cy-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F766E" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      {/* Hexagon shield */}
      <polygon points="40,4 68,20 68,52 40,68 12,52 12,20" fill="url(#cy-g)" />
      <polygon points="40,10 62,23 62,49 40,62 18,49 18,23" fill="rgba(255,255,255,0.08)" />
      {/* Lock body */}
      <rect x="29" y="36" width="22" height="16" rx="3" fill="rgba(255,255,255,0.9)" />
      {/* Lock shackle */}
      <path d="M33 36 L33 30 Q33 24 40 24 Q47 24 47 30 L47 36" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="3" strokeLinecap="round" />
      {/* Keyhole */}
      <circle cx="40" cy="43" r="3" fill="rgba(15,118,110,0.6)" />
      <rect x="38.5" y="43" width="3" height="5" rx="1" fill="rgba(15,118,110,0.6)" />
      {/* Radiating lines: security signal */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <line
          key={i}
          x1="40" y1="44"
          x2={40 + Math.cos((deg - 90) * Math.PI / 180) * 24}
          y2={44 + Math.sin((deg - 90) * Math.PI / 180) * 24}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
      ))}
      {/* Star badge */}
      <circle cx="56" cy="56" r="10" fill="#F59E0B" />
      <text x="56" y="60" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="800">★</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const SKILLS = [
  { n: 'Java',          i: '☕', l: 80, c: 'lang',  color: '#F59E0B' },
  { n: 'JavaScript',    i: '⚡', l: 85, c: 'lang',  color: '#F7DF1E' },
  { n: 'HTML5',         i: '🌐', l: 90, c: 'lang',  color: '#E34F26' },
  { n: 'CSS3',          i: '🎨', l: 88, c: 'lang',  color: '#264DE4' },
  { n: 'PHP',           i: '🐘', l: 78, c: 'lang',  color: '#777BB3' },
  { n: 'React.js',      i: '⚛️', l: 82, c: 'fw',    color: '#61DAFB' },
  { n: 'Laravel',       i: '🔴', l: 80, c: 'fw',    color: '#FF2D20' },
  { n: 'Vite',          i: '⚡', l: 75, c: 'fw',    color: '#646CFF' },
  { n: 'MySQL',         i: '🗄️', l: 83, c: 'db',    color: '#00758F' },
  { n: 'REST APIs',     i: '🔗', l: 80, c: 'db',    color: '#3B82F6' },
  { n: 'CRUD Systems',  i: '📋', l: 85, c: 'db',    color: '#10B981' },
  { n: 'Cybersecurity', i: '🔐', l: 65, c: 'other', color: '#8B5CF6' },
  { n: 'Git & GitHub',  i: '🐙', l: 78, c: 'other', color: '#F1502F' },
  { n: 'UI/UX Design',  i: '🎯', l: 72, c: 'other', color: '#EC4899' },
  { n: 'System Analysis',i:'📐', l: 75, c: 'other', color: '#F59E0B' },
];

const PROJECTS = [
  {
    n: '01', t: 'Water Refilling Station POS',
    d: 'Complete point-of-sale system for water refilling businesses with inventory tracking, sales reports, and customer management.',
    techs: ['Laravel', 'MySQL', 'Bootstrap'], f: ['laravel', 'mysql'],
  },
  {
    n: '02', t: 'Pizza Ordering System',
    d: 'Online food ordering platform with real-time order tracking, menu management, and an admin dashboard for order processing.',
    techs: ['PHP', 'MySQL', 'JavaScript'], f: ['mysql'],
  },
  {
    n: '03', t: 'School Management System',
    d: 'Comprehensive academic platform handling student records, grading, enrollment, and faculty management with multi-role access.',
    techs: ['Laravel', 'React', 'MySQL', 'REST API'], f: ['laravel', 'react', 'mysql'],
  },
  {
    n: '04', t: 'Java GUI Desktop App',
    d: 'Desktop application built with Java Swing featuring a clean GUI for data management and processing tasks.',
    techs: ['Java', 'Swing', 'OOP'], f: ['java'],
  },
  {
    n: '05', t: 'Library Management System',
    d: 'Full CRUD database app for managing book inventories, member registrations, and borrowing records with search capabilities.',
    techs: ['Laravel', 'MySQL', 'Blade'], f: ['laravel', 'mysql'],
  },
  {
    n: '06', t: 'React Dashboard UI',
    d: 'Modern admin dashboard built with React.js featuring responsive charts, data tables, and a clean component-based architecture.',
    techs: ['React.js', 'JavaScript', 'CSS3'], f: ['react'],
  },
];

const TIMELINE = [
  {
    date: '2024 — Present', t: 'School Management System (DevDynamos)',
    d: 'Lead developer on a full Laravel/React high school management system with multi-role access, notifications, and reporting modules.',
  },
  {
    date: '2024', t: 'Microsoft Database Certification',
    d: 'Earned Certiport-validated Microsoft Database Administration Fundamentals certification demonstrating SQL and RDBMS proficiency.',
  },
  {
    date: '2024', t: 'Cybersecurity Certification',
    d: 'Completed Certiport Cybersecurity Fundamentals covering network security, threat identification, and risk management practices.',
  },
  {
    date: '2023', t: 'First Full-Stack Laravel Application',
    d: 'Built Water Refilling Station POS — first complete end-to-end Laravel application with MySQL integration and real business logic.',
  },
  {
    date: '2023', t: 'Java GUI Application Development',
    d: 'Completed Java Swing desktop application projects, deepening OOP principles and GUI programming skills.',
  },
  {
    date: '2022', t: 'Started Web Development Journey',
    d: 'Began learning HTML, CSS, and JavaScript — quickly progressing to PHP and discovering a passion for full-stack development.',
  },
];

const LANGS = [
  { n: 'PHP / Laravel',      p: 35, c: '#3B82F6' },
  { n: 'JavaScript / React', p: 28, c: '#8B5CF6' },
  { n: 'HTML & CSS',         p: 20, c: '#10B981' },
  { n: 'Java',               p: 12, c: '#F59E0B' },
  { n: 'SQL',                p:  5, c: '#F43F5E' },
];

const SKILL_CATS = [
  { k: 'all',   l: 'All'        },
  { k: 'lang',  l: 'Languages'  },
  { k: 'fw',    l: 'Frameworks' },
  { k: 'db',    l: 'Database'   },
  { k: 'other', l: 'Other'      },
];

const PROJ_FILTERS = [
  { k: 'all',    l: 'All'    },
  { k: 'laravel',l: 'Laravel'},
  { k: 'react',  l: 'React'  },
  { k: 'java',   l: 'Java'   },
  { k: 'mysql',  l: 'MySQL'  },
];

const ROLES = [
  'Full Stack Developer',
  'Laravel Engineer',
  'React Developer',
  'Database Designer',
  'Cybersecurity Learner',
  'Problem Solver',
];

/* ═══════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════ */

/** Typing effect hook */
function useTyping (items, typeMs = 95, deleteMs = 55, pauseMs = 1800) {
  const [text, setText]     = useState('');
  const [deleting, setDel]  = useState(false);
  const [idx, setIdx]       = useState(0);
  const [charIdx, setChar]  = useState(0);

  useEffect(() => {
    const cur = items[idx];
    let timeout;
    if (!deleting) {
      if (charIdx < cur.length) {
        timeout = setTimeout(() => { setText(cur.slice(0, charIdx + 1)); setChar(c => c + 1); }, typeMs);
      } else {
        timeout = setTimeout(() => setDel(true), pauseMs);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => { setText(cur.slice(0, charIdx - 1)); setChar(c => c - 1); }, deleteMs);
      } else {
        setDel(false);
        setIdx(i => (i + 1) % items.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, charIdx]);

  return text;
}

/** Intersection observer for scroll-reveal */
function useReveal () {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, vis];
}

/** Skill bar animation trigger */
function useSkillBars (deps) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      document.querySelectorAll('.sk-bar').forEach(bar => {
        bar.style.width = (bar.dataset.w || '0') + '%';
      });
    }, 80);
    return () => clearTimeout(timeout);
  }, deps);
}

/* ═══════════════════════════════════════════════════════
   NAVIGATION COMPONENT
═══════════════════════════════════════════════════════ */
function Nav ({ profileUrl }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const update = () => {
      const sections = document.querySelectorAll('section[id]');
      let cur = 'hero';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 130) cur = s.id;
      });
      setActive(cur);
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const links = [
    ['hero','Home'], ['about','About'], ['skills','Skills'],
    ['certs','Certs'], ['projects','Projects'], ['journey','Journey'],
    ['github','GitHub'],
  ];

  return (
    <nav id="nav" role="navigation" aria-label="Main navigation">
      <a href="#hero" className="nav-logo" aria-label="Back to top">RJL.</a>

      <ul className={`nav-links${open ? ' open' : ''}`} id="nav-links" role="list">
        {links.map(([id, label]) => (
          <li key={id} role="listitem">
            <a
              href={`#${id}`}
              className={active === id ? 'active' : ''}
              aria-current={active === id ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          </li>
        ))}
        <li role="listitem">
          <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>
            Contact
          </a>
        </li>
      </ul>

      <button
        className="hamburger"
        id="ham"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen(o => !o)}
      >
        <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
      </button>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════════════ */
function Hero ({ profileUrl, onPhotoUpload }) {
  const typed = useTyping(ROLES);

  return (
    <section id="hero" aria-labelledby="hero-name">
      <div className="hero-left">
        <div className="hero-badge" role="status">
          <span className="badge-blink" aria-hidden="true" />
          Available for opportunities
        </div>

        <h1 className="hero-name" id="hero-name">
          Rexcel Jay<br /><span className="grad">A. Lusica</span>
        </h1>

        <div className="hero-role" aria-live="polite" aria-atomic="true">
          {typed}<span className="cursor" aria-hidden="true" />
        </div>

        <p className="hero-desc">
          Building elegant, scalable web systems — from pixel-perfect frontends to
          rock-solid backends. Passionate about clean code, database architecture,
          and cybersecurity.
        </p>

        <nav className="hero-btns" aria-label="Quick actions">
          <a href="#projects" className="btn btn-p">⚡ View Projects</a>
          <a href="#contact"  className="btn btn-g">📩 Contact Me</a>
          <button
            className="btn btn-o"
            onClick={() => window.toast('Resume download coming soon!', 'ok')}
            aria-label="Download resume (coming soon)"
          >
            ↓ Resume
          </button>
        </nav>

        <dl className="hero-stats" aria-label="Key statistics">
          {[['6+','Projects'],['2','Certs'],['5+','Technologies'],['∞','Curiosity']].map(([n, l]) => (
            <div className="stat" key={l}>
              <dt className="stat-label">{l}</dt>
              <dd className="stat-num">{n}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Profile card — right side */}
      <div className="hero-right" aria-label="Profile card">
        <div
          className="profile-card"
          role="button"
          tabIndex={0}
          aria-label="Upload profile photo"
          title="Click to upload your photo"
          onClick={() => document.getElementById('ph-file').click()}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') document.getElementById('ph-file').click(); }}
        >
          {/* SVG placeholder (hidden once photo loaded) */}
          {!profileUrl && (
            <div className="profile-placeholder" id="profile-placeholder" aria-hidden="true">
              <AvatarPlaceholder size={160} initials="RJL" />
            </div>
          )}

          <img
            id="profile-img"
            src={profileUrl || ''}
            alt="Rexcel Jay Lusica profile photo"
            className={profileUrl ? 'loaded' : ''}
            style={{ opacity: profileUrl ? 1 : 0 }}
          />

          <div className="profile-label">
            <div className="profile-name">Rexcel Jay A. Lusica</div>
            <div className="profile-role-label">Full Stack Developer</div>
          </div>
          <div className="profile-upload-hint" aria-hidden="true">📷 Replace</div>
        </div>

        <input
          type="file"
          id="ph-file"
          accept="image/*"
          style={{ display: 'none' }}
          aria-label="Upload profile photo"
          onChange={e => {
            if (e.target.files[0]) onPhotoUpload(URL.createObjectURL(e.target.files[0]));
          }}
        />

        <div className="profile-badge" role="status">
          <div className="pib-dot" style={{ background: '#10B981', boxShadow: '0 0 7px #10B981' }} aria-hidden="true" />
          <div>
            <div className="pib-text">Open to Work</div>
            <div className="pib-sub">Intern · Junior Dev · Freelance</div>
          </div>
        </div>

        <div className="profile-badge">
          <div className="pib-dot" style={{ background: '#2563EB' }} aria-hidden="true" />
          <div>
            <div className="pib-text">Based in Philippines</div>
            <div className="pib-sub">Calabarzon Region</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   ABOUT SECTION
═══════════════════════════════════════════════════════ */
function About ({ profileUrl, onPhotoUpload }) {
  const [ref, vis] = useReveal();
  const [ref2, vis2] = useReveal();

  return (
    <section id="about" aria-labelledby="about-title">
      <div className="sec-wrap">
        <div ref={ref} className={`sec-head rev${vis ? ' vis' : ''}`}>
          <div className="sec-tag">// who I am</div>
          <h2 className="sec-title" id="about-title">About <span className="g">Me</span></h2>

          <p style={{ color: 'var(--t2)', fontSize: 14, lineHeight: 1.8, maxWidth: 380, marginTop: 16 }}>
            I'm a full-stack developer and software engineering student with a passion
            for building purposeful digital products that matter.
          </p>
          <p className="about-p" style={{ marginTop: 12 }}>
            My expertise spans{' '}
            <strong style={{ color: 'var(--azure2)' }}>React.js</strong> frontends,{' '}
            <strong style={{ color: 'var(--jade2)' }}>Laravel</strong> backends, and{' '}
            <strong style={{ color: 'var(--amber2)' }}>MySQL</strong> database systems.
            I engineer complete end-to-end applications with clean architecture and intuitive user experiences.
          </p>
          <p className="about-p">
            Certified in{' '}
            <strong style={{ color: 'var(--t1)' }}>Database Administration</strong> and{' '}
            <strong style={{ color: 'var(--t1)' }}>Cybersecurity Fundamentals</strong>{' '}
            via Certiport — and continuously growing.
          </p>

          <ul className="about-tags" aria-label="Traits and interests">
            {['🎯 Problem Solver','🔐 Cybersecurity','🗄️ Database Design','🎨 UI/UX Aware','📐 Clean Code','🚀 MVC Architecture'].map(tag => (
              <li key={tag} className="tag">{tag}</li>
            ))}
          </ul>
        </div>

        {/* Visual panel */}
        <div ref={ref2} className={`about-visual rev${vis2 ? ' vis' : ''}`} aria-label="Profile visual">
          <div
            className="about-avatar-lg"
            role="button"
            tabIndex={0}
            aria-label="Upload profile photo for About section"
            title="Click to upload photo"
            onClick={() => document.getElementById('ab-file').click()}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') document.getElementById('ab-file').click(); }}
          >
            {/* SVG placeholder */}
            {!profileUrl && (
              <div id="about-initials-svg" aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
                <AvatarPlaceholder size={150} initials="RJL" gradient={['#3B82F6','#10B981']} />
              </div>
            )}
            <img
              id="about-img"
              src={profileUrl || ''}
              alt=""
              className={profileUrl ? 'loaded' : ''}
              style={{ opacity: profileUrl ? 1 : 0 }}
            />
          </div>

          <div className="fl-badge fl1" aria-hidden="true">
            <div className="fl-d" style={{ background: '#2563EB' }} />Laravel Expert
          </div>
          <div className="fl-badge fl2" aria-hidden="true">
            <div className="fl-d" style={{ background: '#10B981' }} />React Dev
          </div>
        </div>

        <input
          type="file"
          id="ab-file"
          accept="image/*"
          style={{ display: 'none' }}
          aria-label="Upload profile photo"
          onChange={e => {
            if (e.target.files[0]) onPhotoUpload(URL.createObjectURL(e.target.files[0]));
          }}
        />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   SKILLS SECTION
   HCI: Category tabs reduce information overload (chunking).
        Progress bars give at-a-glance proficiency feedback.
═══════════════════════════════════════════════════════ */
function Skills () {
  const [cat, setCat]   = useState('all');
  const [ref, vis]      = useReveal();
  const filtered        = cat === 'all' ? SKILLS : SKILLS.filter(s => s.c === cat);

  useSkillBars([cat]);

  return (
    <section id="skills" aria-labelledby="skills-title">
      <div className="sec-wrap">
        <div ref={ref} className={`sec-head rev${vis ? ' vis' : ''}`}>
          <div className="sec-tag">// expertise</div>
          <h2 className="sec-title" id="skills-title">Technical <span className="g">Skills</span></h2>
          <p className="sec-sub">Full-stack technologies I use to build real products.</p>
        </div>

        {/* Category filter — HCI: clear segmented control pattern */}
        <div className="skill-cats" role="group" aria-label="Filter skills by category">
          {SKILL_CATS.map(c => (
            <button
              key={c.k}
              className={`scat${cat === c.k ? ' on' : ''}`}
              aria-pressed={cat === c.k}
              onClick={() => setCat(c.k)}
            >
              {c.l}
            </button>
          ))}
        </div>

        <div
          className="skills-grid"
          role="list"
          aria-label={`Skills — ${cat === 'all' ? 'All categories' : SKILL_CATS.find(c => c.k === cat)?.l}`}
        >
          {filtered.map(s => (
            <article
              key={s.n}
              className="sk-card"
              role="listitem"
              aria-label={`${s.n}: ${s.l}% proficiency`}
            >
              <div className="sk-ico" aria-hidden="true">{s.i}</div>
              <div className="sk-name">{s.n}</div>
              <div className="sk-bg" role="progressbar" aria-valuenow={s.l} aria-valuemin={0} aria-valuemax={100} aria-label={`${s.l}% proficiency`}>
                <div
                  className="sk-bar"
                  data-w={s.l}
                  style={{ background: `linear-gradient(90deg, ${s.color}aa, ${s.color})` }}
                />
              </div>
              <div className="sk-lv">{s.l}% proficiency</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CERTIFICATIONS SECTION
   HCI: Custom SVG badges serve as trust signals.
        Clearly scoped cards reduce information density.
═══════════════════════════════════════════════════════ */
function Certs () {
  const [ref, vis]  = useReveal();
  const [ref2, vis2]= useReveal();
  const [ref3, vis3]= useReveal();

  return (
    <section id="certs" aria-labelledby="certs-title">
      <div className="sec-wrap">
        <div ref={ref} className={`sec-head rev${vis ? ' vis' : ''}`}>
          <div className="sec-tag">// credentials</div>
          <h2 className="sec-title" id="certs-title">Certifi<span className="g">cations</span></h2>
          <p className="sec-sub">Industry-validated credentials that back the expertise.</p>
        </div>

        <div className="certs-grid">
          {/* Database cert */}
          <article ref={ref2} className={`cert-card rev${vis2 ? ' vis' : ''}`} aria-label="Database Administration Certification">
            <div className="cert-badge-wrap" aria-hidden="false">
              <DbBadge />
            </div>
            <div className="cert-body">
              <div className="cert-org">Certiport · Microsoft</div>
              <h3 className="cert-title">Microsoft Database Administration Fundamentals</h3>
              <p className="cert-desc">
                Proficiency in relational database management, SQL, data normalisation,
                query writing, and data integrity — validated by Microsoft and Certiport.
              </p>
              <button
                className="cert-btn"
                onClick={() => window.toast('Verification link coming soon', 'ok')}
                aria-label="Verify Database Administration certificate (coming soon)"
              >
                ✓ Verify Certificate
              </button>
            </div>
          </article>

          {/* Cybersecurity cert */}
          <article ref={ref3} className={`cert-card rev${vis3 ? ' vis' : ''}`} aria-label="Cybersecurity Fundamentals Certification">
            <div className="cert-badge-wrap" aria-hidden="false">
              <CyberBadge />
            </div>
            <div className="cert-body">
              <div className="cert-org">Certiport · CompTIA</div>
              <h3 className="cert-title">Cybersecurity Fundamentals Certification</h3>
              <p className="cert-desc">
                Core cybersecurity principles including network security, threat identification,
                risk management, cryptography basics, and software security practices.
              </p>
              <button
                className="cert-btn"
                onClick={() => window.toast('Verification link coming soon', 'ok')}
                aria-label="Verify Cybersecurity certificate (coming soon)"
              >
                ✓ Verify Certificate
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   PROJECTS SECTION
═══════════════════════════════════════════════════════ */
function Projects () {
  const [filter, setFilter] = useState('all');
  const [ref, vis]          = useReveal();
  const shown = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.f.includes(filter));

  return (
    <section id="projects" aria-labelledby="proj-title">
      <div className="sec-wrap">
        <div ref={ref} className={`sec-head rev${vis ? ' vis' : ''}`}>
          <div className="sec-tag">// built by me</div>
          <h2 className="sec-title" id="proj-title">Featured <span className="g">Projects</span></h2>
          <p className="sec-sub">Systems and applications engineered from concept to deployment.</p>
        </div>

        <div className="proj-filters" role="group" aria-label="Filter projects by technology">
          {PROJ_FILTERS.map(f => (
            <button
              key={f.k}
              className={`pfb${filter === f.k ? ' on' : ''}`}
              aria-pressed={filter === f.k}
              onClick={() => setFilter(f.k)}
            >
              {f.l}
            </button>
          ))}
        </div>

        <div className="proj-grid" role="list" aria-live="polite" aria-label="Project list">
          {shown.map(p => (
            <article key={p.n} className="proj-card" role="listitem" aria-label={`Project: ${p.t}`}>
              <div className="proj-num">Project {p.n}</div>
              <h3 className="proj-title">{p.t}</h3>
              <p className="proj-desc">{p.d}</p>
              <ul className="proj-techs" aria-label="Technologies used">
                {p.techs.map(t => <li key={t} className="proj-tech">{t}</li>)}
              </ul>
              <div className="proj-links">
                <a
                  href="https://github.com/rexssdd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-link"
                  aria-label={`${p.t} GitHub repository`}
                >
                  🐙 GitHub
                </a>
                <button
                  className="proj-link"
                  onClick={() => window.toast('Live demo coming soon!', 'ok')}
                  aria-label={`${p.t} live demo (coming soon)`}
                >
                  🚀 Demo
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   JOURNEY / TIMELINE
═══════════════════════════════════════════════════════ */
function Journey () {
  const [ref, vis] = useReveal();

  return (
    <section id="journey" aria-labelledby="journey-title">
      <div className="sec-wrap">
        <div ref={ref} className={`sec-head rev${vis ? ' vis' : ''}`}>
          <div className="sec-tag">// milestones</div>
          <h2 className="sec-title" id="journey-title">The <span className="g">Journey</span></h2>
          <p className="sec-sub">Key moments that shaped my growth as a developer.</p>
        </div>

        <ol className="timeline" aria-label="Career timeline">
          {TIMELINE.map((item, i) => (
            <TimelineItem key={i} item={item} delay={i * 80} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function TimelineItem ({ item, delay }) {
  const [ref, vis] = useReveal();
  return (
    <li
      ref={ref}
      className={`tl-item${vis ? ' vis' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="tl-dot" aria-hidden="true" />
      <div className="tl-card">
        <time className="tl-date">{item.date}</time>
        <h3 className="tl-title">{item.t}</h3>
        <p className="tl-desc">{item.d}</p>
      </div>
    </li>
  );
}

/* ═══════════════════════════════════════════════════════
   GITHUB SECTION
═══════════════════════════════════════════════════════ */
function GitHub () {
  const [ref, vis] = useReveal();
  return (
    <section id="github" aria-labelledby="gh-title">
      <div className="sec-wrap">
        <div ref={ref} className={`sec-head rev${vis ? ' vis' : ''}`}>
          <div className="sec-tag">// open source</div>
          <h2 className="sec-title" id="gh-title">GitHub <span className="g">Activity</span></h2>
        </div>

        <div className="gh-card rev vis">
          <div className="gh-av" aria-label="GitHub avatar: RJL" role="img">RJL</div>
          <div className="gh-info">
            <h3>rexssdd</h3>
            <p>Full Stack Developer · PHP · JavaScript · Java enthusiast · Proud Filipino dev 🇵🇭</p>
            <dl className="gh-stats" aria-label="GitHub statistics">
              <div className="ghs">
                <dd className="ghs-n">6+</dd><dt className="ghs-l">Repos</dt>
              </div>
              <div className="ghs">
                <dd className="ghs-n">⭐</dd><dt className="ghs-l">Open Source</dt>
              </div>
              <div className="ghs">
                <dd className="ghs-n">🟢</dd><dt className="ghs-l">Active</dt>
              </div>
            </dl>
          </div>
        </div>

        <div className="rev vis" style={{ marginBottom: 16 }}>
          <div className="sec-tag">// language breakdown</div>
        </div>

        <ul className="lang-grid rev vis" aria-label="Programming language usage">
          {LANGS.map(l => (
            <li key={l.n} className="lang-row">
              <div className="lang-dot" style={{ background: l.c }} aria-hidden="true" />
              <span className="lang-name">{l.n}</span>
              <span className="lang-pct" aria-label={`${l.p}%`}>{l.p}%</span>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 22, textAlign: 'center' }}>
          <a
            href="https://github.com/rexssdd"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-o"
            aria-label="Visit Rexcel Jay Lusica's GitHub profile (opens in new tab)"
          >
            🐙 GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CONTACT SECTION
   HCI: Clear labelling, real-time validation feedback,
        distinct error states, accessible error messages.
═══════════════════════════════════════════════════════ */
function Contact () {
  const [ref, vis] = useReveal();
  const [fields, setFields] = useState({ name: '', email: '', msg: '' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const validate = useCallback(() => {
    const errs = {};
    if (!fields.name.trim())    errs.name  = 'Name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
                                 errs.email = 'Please enter a valid email address.';
    if (fields.msg.trim().length < 10)
                                 errs.msg   = 'Message must be at least 10 characters.';
    return errs;
  }, [fields]);

  const handleSubmit = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      window.toast('Please fix the errors above.', 'err');
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setFields({ name: '', email: '', msg: '' });
      setErrors({});
      window.toast("Message sent! I'll get back to you soon ✓", 'ok');
    }, 900);
  };

  const set = (key) => (e) => {
    setFields(f => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors(er => ({ ...er, [key]: '' }));
  };

  return (
    <section id="contact" aria-labelledby="contact-title">
      <div className="sec-wrap">
        <div ref={ref} className={`sec-head rev${vis ? ' vis' : ''}`}>
          <div className="sec-tag">// reach out</div>
          <h2 className="sec-title" id="contact-title">Get In <span className="g">Touch</span></h2>
          <p className="sec-sub">Open to internships, collaborations, and interesting projects.</p>
        </div>

        <div className="contact-card rev vis" role="form" aria-label="Contact form">
          <div className="fg">
            <label htmlFor="cf-n">Your Name</label>
            <input
              id="cf-n"
              className={`fi${errors.name ? ' err' : ''}`}
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              value={fields.name}
              onChange={set('name')}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby="en"
            />
            {errors.name && <div id="en" className="ferr" role="alert">{errors.name}</div>}
          </div>

          <div className="fg">
            <label htmlFor="cf-e">Email Address</label>
            <input
              id="cf-e"
              className={`fi${errors.email ? ' err' : ''}`}
              type="email"
              placeholder="hello@example.com"
              autoComplete="email"
              value={fields.email}
              onChange={set('email')}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby="ee"
            />
            {errors.email && <div id="ee" className="ferr" role="alert">{errors.email}</div>}
          </div>

          <div className="fg">
            <label htmlFor="cf-m">Message</label>
            <textarea
              id="cf-m"
              className={`ft${errors.msg ? ' err' : ''}`}
              placeholder="Tell me about your project or opportunity…"
              value={fields.msg}
              onChange={set('msg')}
              aria-required="true"
              aria-invalid={!!errors.msg}
              aria-describedby="em"
            />
            {errors.msg && <div id="em" className="ferr" role="alert">{errors.msg}</div>}
          </div>

          <button
            className="btn btn-p"
            style={{ width: '100%', justifyContent: 'center', fontSize: 13 }}
            onClick={handleSubmit}
            disabled={sending}
            aria-busy={sending}
            aria-label="Send message"
          >
            {sending ? 'Sending…' : 'Send Message →'}
          </button>

          <nav className="socials" aria-label="Social links">
            <a href="https://github.com/rexssdd" className="soc-btn" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in new tab)">
              🐙 GitHub
            </a>
            <button className="soc-btn" onClick={() => window.toast('LinkedIn coming soon!', 'ok')} aria-label="LinkedIn (coming soon)">
              💼 LinkedIn
            </button>
            <a href="mailto:rexceljay@gmail.com" className="soc-btn" aria-label="Send email to rexceljay@gmail.com">
              ✉️ Email
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════ */
function Footer () {
  return (
    <footer role="contentinfo">
      <nav className="foot-links" aria-label="Footer navigation">
        {['hero','about','skills','projects','contact'].map(id => (
          <a key={id} href={`#${id}`} style={{ textTransform: 'capitalize' }}>
            {id === 'hero' ? 'Home' : id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </nav>
      <p className="foot-copy">
        Built with <span>React &amp; Laravel</span> · © 2025 <span>Rexcel Jay A. Lusica</span>
      </p>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   SCROLL-TO-TOP BUTTON
═══════════════════════════════════════════════════════ */
function ScrollTop () {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const h = () => setVis(window.scrollY > 400);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <button
      id="st"
      className={vis ? 'vis' : ''}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════════════ */
function App () {
  /* Shared profile photo URL — lifted so all photo slots stay in sync */
  const [profileUrl, setProfileUrl] = useState('');

  const handlePhotoUpload = useCallback((url) => {
    setProfileUrl(url);
    /* Also update loader image & about-img via DOM (for slots outside React) */
    if (typeof window.setAllImages === 'function') window.setAllImages(url);
  }, []);

  return (
    <>
      <canvas id="cv" aria-hidden="true" />
      <Nav profileUrl={profileUrl} />

      <main id="main-content">
        <Hero    profileUrl={profileUrl} onPhotoUpload={handlePhotoUpload} />
        <div className="divider" aria-hidden="true" />
        <About   profileUrl={profileUrl} onPhotoUpload={handlePhotoUpload} />
        <div className="divider" aria-hidden="true" />
        <Skills  />
        <div className="divider" aria-hidden="true" />
        <Certs   />
        <div className="divider" aria-hidden="true" />
        <Projects />
        <div className="divider" aria-hidden="true" />
        <Journey />
        <div className="divider" aria-hidden="true" />
        <GitHub  />
        <div className="divider" aria-hidden="true" />
        <Contact />
      </main>

      <Footer />
      <ScrollTop />
    </>
  );
}

/* ── Mount ─────────────────────────────────────────── */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
