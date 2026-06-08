<section id="skills" aria-labelledby="skills-title">
  <div class="sec-wrap">
    <div class="sec-head rev" data-reveal>
      <div class="sec-tag">// expertise</div>
      <h2 class="sec-title" id="skills-title">Technical <span class="g">Skills</span></h2>
      <p class="sec-sub">Full-stack technologies I use to build real products.</p>
    </div>

    {{-- Filter buttons (JS-driven) --}}
    <div class="skill-cats" role="group" aria-label="Filter skills by category" id="skill-cats">
      @foreach($skillCategories as $cat)
        <button class="scat {{ $loop->first ? 'on' : '' }}"
                data-cat="{{ $cat['key'] }}"
                aria-pressed="{{ $loop->first ? 'true' : 'false' }}">
          {{ $cat['label'] }}
        </button>
      @endforeach
    </div>

    {{-- Skills grid (rendered server-side, filtered by JS) --}}
    <div class="skills-grid" role="list" id="skills-grid"
         aria-label="All skills">
      @foreach($skills as $skill)
        <article class="sk-card"
                 role="listitem"
                 data-category="{{ $skill['category'] }}"
                 aria-label="{{ $skill['name'] }}: {{ $skill['level'] }}% proficiency">
          <div class="sk-ico" aria-hidden="true">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{{ $skill['icon'] }}"
                 alt="{{ $skill['name'] }}"
                 width="36" height="36"
                 style="object-fit:contain;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.4));"
                 onerror="this.style.display='none'" />
          </div>
          <div class="sk-name">{{ $skill['name'] }}</div>
          <div class="sk-bg" role="progressbar"
               aria-valuenow="{{ $skill['level'] }}"
               aria-valuemin="0" aria-valuemax="100"
               aria-label="{{ $skill['level'] }}%">
            <div class="sk-bar"
                 data-w="{{ $skill['level'] }}"
                 style="background:linear-gradient(90deg,{{ $skill['color'] }}aa,{{ $skill['color'] }})"></div>
          </div>
          <div class="sk-lv">{{ $skill['level'] }}% proficiency</div>
        </article>
      @endforeach
    </div>
  </div>
</section>
