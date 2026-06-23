<section id="hero" aria-labelledby="hero-name">
  <div class="hero-left">
    <div class="hero-badge rev" data-reveal role="status">
      <span class="badge-blink" aria-hidden="true"></span>
      Available for opportunities
    </div>
    <h1 class="hero-name rev" data-reveal id="hero-name" style="transition-delay:.08s">
      Rexcel Jay<br><span class="grad">A. Lusica</span>
    </h1>
    <div class="hero-role rev" data-reveal id="typed-role" style="transition-delay:.16s" aria-live="polite" aria-atomic="true">
      <span id="typed-text"></span><span class="cursor" aria-hidden="true"></span>
    </div>
    <p class="hero-desc rev" data-reveal style="transition-delay:.22s">
      Building elegant, scalable web systems — from pixel-perfect frontends to
      rock-solid backends. Passionate about clean code, database architecture,
      and cybersecurity.
    </p>
    <div class="hero-btns rev" data-reveal role="group" aria-label="Quick actions" style="transition-delay:.3s">
      <a href="#projects" class="btn btn-p">⚡ View Projects</a>
      <a href="#contact"  class="btn btn-g">📩 Contact Me</a>
      <a href="{{ asset('Resume/Rexcel_Jay_Lusica_Resume.pdf') }}" target="_blank" rel="noopener noreferrer" class="btn btn-o" id="resume-btn" aria-label="View resume (opens in new tab)">↓ View Resume</a>
    </div>
    <dl class="hero-stats rev" data-reveal aria-label="Key statistics" style="transition-delay:.38s">
      @foreach([['7','Projects'],['2','Certs'],['5+','Technologies'],['∞','Curiosity']] as [$num, $label])
        <div class="stat">
          <dt class="stat-label">{{ $label }}</dt>
          <dd class="stat-num">{{ $num }}</dd>
        </div>
      @endforeach
    </dl>
  </div>

  <div class="hero-right rev-right" data-reveal aria-label="Profile card">
    <div class="profile-card">
      <img src="{{ asset('images/profilePicture.png') }}"
           alt="Rexcel Jay A. Lusica"
           style="display:block;position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" />
      <div class="profile-label">
        <div class="profile-name">Rexcel Jay A. Lusica</div>
        <div class="profile-role-label">Full Stack Developer</div>
      </div>
    </div>
    <div class="profile-badge" role="status">
      <div class="pib-dot" style="background:#10B981;box-shadow:0 0 7px #10B981" aria-hidden="true"></div>
      <div>
        <div class="pib-text">Open to Work</div>
        <div class="pib-sub">Intern · Junior Dev · Freelance</div>
      </div>
    </div>
    <div class="profile-badge">
      <div class="pib-dot" style="background:#2563EB" aria-hidden="true"></div>
      <div>
        <div class="pib-text">Based in Philippines</div>
        <div class="pib-sub">Davao Region</div>
      </div>
    </div>
  </div>
</section>