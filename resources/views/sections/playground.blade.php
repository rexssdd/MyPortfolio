<section id="playground" aria-labelledby="playground-title">
  <div class="sec-wrap">
    <div class="sec-head rev" data-reveal>
      <div class="sec-tag">// just for fun</div>
      <h2 class="sec-title" id="playground-title">Code <span class="g">Sprint</span></h2>
      <p class="sec-sub">A quick typing challenge — type the snippet as fast and accurately as you can. Go ahead, see how you do. 😉</p>
    </div>

    <div class="sprint-card rev vis" aria-label="Typing speed game">
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
  </div>
</section>
