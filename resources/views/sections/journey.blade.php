<section id="journey" aria-labelledby="journey-title">
  <div class="sec-wrap">
    <div class="sec-head rev" data-reveal>
      <div class="sec-tag">// milestones</div>
      <h2 class="sec-title" id="journey-title">The <span class="g">Journey</span></h2>
      <p class="sec-sub">Key moments that shaped my growth as a developer.</p>
    </div>

    <ol class="timeline" aria-label="Career timeline">
      @foreach($timeline as $i => $item)
        <li class="tl-item rev" data-reveal style="transition-delay: {{ $i * 80 }}ms">
          <div class="tl-dot" aria-hidden="true"></div>
          <div class="tl-card">
            <time class="tl-date">{{ $item['date'] }}</time>
            <h3 class="tl-title">{{ $item['title'] }}</h3>
            <p class="tl-desc">{{ $item['desc'] }}</p>
          </div>
        </li>
      @endforeach
    </ol>
  </div>
</section>
