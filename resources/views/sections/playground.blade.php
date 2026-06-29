<section id="playground" aria-labelledby="playground-title">
  <div class="sec-wrap">
    <div class="sec-head rev" data-reveal>
      <div class="sec-tag">// just for fun</div>
      <h2 class="sec-title" id="playground-title">Code <span class="g">Sprint</span></h2>
      <p class="sec-sub">A couple of quick games to mess around with while you're here. 😉</p>
    </div>

    <div class="pg-tabs rev vis" role="tablist" aria-label="Playground games">
      <button class="pg-tab on" id="pg-tab-sprint" role="tab" aria-selected="true" aria-controls="pg-panel-sprint">⌨️ Code Sprint</button>
      <button class="pg-tab" id="pg-tab-dino" role="tab" aria-selected="false" aria-controls="pg-panel-dino">🦖 Dino Run</button>
    </div>

    <div class="sprint-card rev vis" id="pg-panel-sprint" role="tabpanel" aria-label="Typing speed game">
      <div class="sprint-stats" role="status" aria-live="polite">
        <div class="sprint-stat">
          <span class="sprint-stat-num" id="sprint-wpm">0</span>
          <span class="sprint-stat-label">WPM</span>
        </div>
        <div class="sprint-stat">
          <span class="sprint-stat-num" id="sprint-acc">100%</span>
          <span class="sprint-stat-label">Accuracy</span>
        </div>
        <div class="sprint-stat">
          <span class="sprint-stat-num" id="sprint-time">0.0s</span>
          <span class="sprint-stat-label">Time</span>
        </div>
        <div class="sprint-stat">
          <span class="sprint-stat-num" id="sprint-best">—</span>
          <span class="sprint-stat-label">Best WPM</span>
        </div>
      </div>

      <div class="sprint-terminal">
        <div class="sprint-term-bar">
          <span class="sprint-dot" style="background:#FF5F56"></span>
          <span class="sprint-dot" style="background:#FFBD2E"></span>
          <span class="sprint-dot" style="background:#27C93F"></span>
          <span class="sprint-term-title">code-sprint.php</span>
        </div>
        <div class="sprint-code" id="sprint-code" tabindex="0" role="textbox" aria-readonly="true" aria-label="Code snippet to type — click and start typing"></div>
        <textarea id="sprint-input" class="sprint-input" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Type the snippet here"></textarea>
      </div>

      <div class="sprint-foot">
        <span id="sprint-msg" class="sprint-msg">Click the terminal and start typing to begin.</span>
        <button class="btn btn-g" id="sprint-restart" type="button">↻ New Snippet</button>
      </div>
    </div>

    <div class="dino-card rev" id="pg-panel-dino" role="tabpanel" aria-label="Dino Run game" hidden>
      <div class="dino-stats" role="status" aria-live="polite">
        <div class="sprint-stat">
          <span class="sprint-stat-num" id="dino-score">0</span>
          <span class="sprint-stat-label">Score</span>
        </div>
        <div class="sprint-stat">
          <span class="sprint-stat-num" id="dino-best">0</span>
          <span class="sprint-stat-label">Best</span>
        </div>
      </div>
      <div class="dino-wrap">
        <canvas id="dino-canvas" width="640" height="200" aria-label="Dino Run game canvas"></canvas>
        <div class="dino-overlay" id="dino-overlay">
          <p id="dino-overlay-text">Press <kbd>Space</kbd> / <kbd>↑</kbd> or tap to jump</p>
        </div>
      </div>
      <div class="sprint-foot">
        <span class="sprint-msg">Jump the cacti. Speed ramps up the longer you survive.</span>
        <button class="btn btn-g" id="dino-restart" type="button">↻ Restart</button>
      </div>
    </div>
  </div>
</section>
