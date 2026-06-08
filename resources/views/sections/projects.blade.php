<section id="projects" aria-labelledby="proj-title">
  <div class="sec-wrap">
    <div class="sec-head rev" data-reveal>
      <div class="sec-tag">// built by me</div>
      <h2 class="sec-title" id="proj-title">Featured <span class="g">Projects</span></h2>
      <p class="sec-sub">Systems and applications engineered from concept to deployment.</p>
    </div>

    {{-- Filter buttons (JS-driven) --}}
    <div class="proj-filters" role="group" aria-label="Filter projects by technology" id="proj-filters">
      @foreach($projectFilters as $filter)
        <button class="pfb {{ $loop->first ? 'on' : '' }}"
                data-filter="{{ $filter['key'] }}"
                aria-pressed="{{ $loop->first ? 'true' : 'false' }}">
          {{ $filter['label'] }}
        </button>
      @endforeach
    </div>

    <div class="proj-grid" role="list" id="proj-grid" aria-live="polite" aria-label="Project list">
      @foreach($projects as $project)
        @php
          $isCollab  = $project['collab'] ?? false;
          $filters   = $project['filters'];
          if ($isCollab) { $filters[] = 'collab'; }
          $filterStr = implode(',', $filters);
        @endphp
        <article class="proj-card {{ $isCollab ? 'proj-card--collab' : '' }}"
                 role="listitem"
                 data-filters="{{ $filterStr }}"
                 aria-label="Project: {{ $project['title'] }}">

          {{-- Collab badge --}}
          @if($isCollab)
            <div class="proj-collab-badge" aria-label="Collaborative project">
              🤝 {{ $project['collab_label'] }}
            </div>
          @endif

          <div class="proj-num">Project {{ $project['number'] }}</div>
          <h3 class="proj-title">{{ $project['title'] }}</h3>
          <p class="proj-desc">{{ $project['desc'] }}</p>
          <ul class="proj-techs" aria-label="Technologies used">
            @foreach($project['techs'] as $tech)
              <li class="proj-tech">{{ $tech }}</li>
            @endforeach
          </ul>
          <div class="proj-links">
            <a href="{{ $project['github'] }}" target="_blank" rel="noopener noreferrer"
               class="proj-link" aria-label="{{ $project['title'] }} GitHub repository">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                   width="16" height="16"
                   style="vertical-align:middle;margin-right:6px;filter:invert(1);" alt="" />GitHub
            </a>
            <button class="proj-link demo-btn" aria-label="{{ $project['title'] }} live demo (coming soon)">
              🚀 Demo
            </button>
          </div>
        </article>
      @endforeach
    </div>
  </div>
</section>