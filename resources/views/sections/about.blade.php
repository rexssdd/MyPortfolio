<section id="about" aria-labelledby="about-title">
  <div class="sec-wrap">
    <div class="sec-head rev-left" data-reveal>
      <div class="sec-tag">// who I am</div>
      <h2 class="sec-title" id="about-title">About <span class="g">Me</span></h2>
      <p style="color:var(--t2);font-size:14px;line-height:1.8;max-width:380px;margin-top:16px;">
        I'm a full-stack developer and software engineering student with a passion
        for building purposeful digital products that matter.
      </p>
      <p class="about-p" style="margin-top:12px;">
        My expertise spans
        <strong style="color:var(--azure2)">React.js</strong> frontends,
        <strong style="color:var(--jade2)">Laravel</strong> backends, and
        <strong style="color:var(--amber2)">MySQL</strong> database systems.
      </p>
      <p class="about-p">
        Certified in <strong style="color:var(--t1)">Database Administration</strong> and
        <strong style="color:var(--t1)">Cybersecurity Fundamentals</strong> via Pearson/Certiport.
      </p>
      <ul class="about-tags" aria-label="Traits and interests">
        @foreach(['🎯 Problem Solver','🔐 Cybersecurity','🗄️ Database Design','🎨 UI/UX Aware','📐 Clean Code','🚀 MVC Architecture'] as $tag)
          <li class="tag">{{ $tag }}</li>
        @endforeach
      </ul>
    </div>

    <div class="about-visual rev-right" data-reveal aria-label="Profile illustration">
      <div class="about-avatar-lg">
        <img loading="lazy" decoding="async" src="{{ asset('images/profilePicture.png') }}"
             alt="Rexcel Jay A. Lusica"
             style="display:block;width:100%;height:100%;border-radius:50%;object-fit:cover;object-position:top;" />
      </div>
      <div class="fl-badge fl1" aria-hidden="true">
        <div class="fl-d" style="background:#2563EB"></div>Laravel Expert
      </div>
      <div class="fl-badge fl2" aria-hidden="true">
        <div class="fl-d" style="background:#10B981"></div>React Dev
      </div>
    </div>
  </div>
</section>
