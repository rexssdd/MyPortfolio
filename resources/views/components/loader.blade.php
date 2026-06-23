<div id="loader" aria-busy="true" aria-label="Loading portfolio">
  <div id="loader-grid" aria-hidden="true"></div>
  <div id="loader-glow" aria-hidden="true"></div>

  <div class="loader-ring ring1" aria-hidden="true"><div class="ring-dot"></div></div>
  <div class="loader-ring ring2" aria-hidden="true"><div class="ring-dot"></div></div>
  <div class="loader-ring ring3" aria-hidden="true"><div class="ring-dot"></div></div>

  <div id="loader-avatar" aria-hidden="true">
    <img
      src="{{ asset('images/loadingProfile2.png') }}"
      alt="Rexcel Jay A. Lusica"
    />
  </div>

  <div id="loader-text">
    <div id="loader-name">Rexcel Jay A. Lusica</div>
    <div id="loader-role">Full Stack Developer</div>
    <div id="loader-tagline">Building elegant systems — one commit at a time.</div>
  </div>

  <div id="loader-track">
    <div id="loader-label">
      <span id="loader-status-lbl">Initializing…</span>
      <span id="loader-pct-lbl">0%</span>
    </div>
    <div id="loader-bar-bg">
      <div id="loader-bar" role="progressbar"
           aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  </div>
  <div id="loader-status" aria-live="polite"></div>

  <button id="loader-skip" onclick="skipLoader()" aria-label="Skip loading animation">
    Skip intro →
  </button>
</div>
