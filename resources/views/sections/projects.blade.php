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

          {{-- Project image banner --}}
          @if(!empty($project['image']))
            <div class="proj-img-wrap">
              <img src="{{ $project['image'] }}"
                   alt="{{ $project['image_alt'] ?? $project['title'] }}"
                   class="proj-img"
                   loading="lazy" />
              <div class="proj-img-overlay"></div>
              <span class="proj-num-overlay">{{ $project['number'] }}</span>
              {{-- Collab badge floated over image --}}
              @if($isCollab)
                <div class="proj-collab-badge proj-collab-badge--img" aria-label="Collaborative project">
                  🤝 {{ $project['collab_label'] }}
                </div>
              @endif
            </div>
          @else
            {{-- Fallback: no image —show old inline badge --}}
            @if($isCollab)
              <div class="proj-collab-badge" aria-label="Collaborative project">
                🤝 {{ $project['collab_label'] }}
              </div>
            @endif
            <div class="proj-num">Project {{ $project['number'] }}</div>
          @endif

          {{-- Card body --}}
          <div class="proj-body">
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
             @if (!empty($project['demo']))
                <a
                    href="{{ $project['demo'] }}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="proj-link demo-btn"
                    aria-label="{{ $project['title'] }} live demo"
                >
                    Live Demo
                </a>
            @endif
                🚀 Demo
              </button>
            </div>
          </div>

        </article>
      @endforeach
    </div>
  </div>
</section>