<section id="github" aria-labelledby="gh-title">
  <div class="sec-wrap">
    <div class="sec-head rev" data-reveal>
      <div class="sec-tag">// open source</div>
      <h2 class="sec-title" id="gh-title">GitHub <span class="g">Activity</span></h2>
    </div>

    <div class="gh-card rev vis">
      <div class="gh-av-wrap" aria-label="GitHub avatar">
  <img src="{{ asset('images/profilePicture.png') }}"
       alt="rexssdd"
       style="width:70px;height:70px;border-radius:50%;object-fit:cover;object-position:top;" />
</div>
      <div class="gh-info">
        <h3>rexssdd</h3>
        <p>Full Stack Developer · PHP · JavaScript · Java enthusiast · Aspiring Web Developer · Proud Filipino dev 🇵🇭</p>
        <dl class="gh-stats" aria-label="GitHub statistics">
          <div class="ghs"><dd class="ghs-n">6+</dd><dt class="ghs-l">Repos</dt></div>
          <div class="ghs"><dd class="ghs-n">⭐</dd><dt class="ghs-l">Open Source</dt></div>
          <div class="ghs"><dd class="ghs-n">🟢</dd><dt class="ghs-l">Active</dt></div>
        </dl>
      </div>
    </div>

    <div class="rev vis" style="margin-bottom:16px;">
      <div class="sec-tag">// language breakdown</div>
    </div>

        <ul class="lang-grid rev vis" aria-label="Programming language usage">
        @foreach($langs as $lang)
          <li class="lang-row">

            <div class="lang-head">
              <div class="lang-left">
                <div class="lang-dot"
                    style="background:{{ $lang['color'] }}"
                    aria-hidden="true"></div>

                <span class="lang-name">{{ $lang['name'] }}</span>
              </div>

              <span class="lang-pct">{{ $lang['percent'] }}%</span>
            </div>

            <div class="lang-bar">
              <div class="lang-fill"
                  style="width: {{ $lang['percent'] }}%; background: {{ $lang['color'] }}">
              </div>
            </div>

          </li>
        @endforeach
      </ul>

    <div style="margin-top:22px;text-align:center;">
      <a href="https://github.com/rexssdd" target="_blank" rel="noopener noreferrer"
         class="btn btn-o" aria-label="Visit GitHub profile (opens in new tab)">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
             width="16" height="16"
             style="vertical-align:middle;margin-right:6px;filter:invert(1);" alt="" />
        GitHub Profile
      </a>
    </div>
  </div>
</section>
