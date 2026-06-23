<section id="certs" aria-labelledby="certs-title">
  <div class="sec-wrap">
    <div class="sec-head rev" data-reveal>
      <div class="sec-tag">// credentials</div>
      <h2 class="sec-title" id="certs-title">Certifi<span class="g">cations</span></h2>
      <p class="sec-sub">Industry-validated credentials that back the expertise.</p>
    </div>

    <div class="certs-grid">
      
    <!-- DATABASE -->
    <article class="cert-card rev" data-reveal>
        <div class="cert-showcase">
            <img src="{{ asset('images/database.png') }}"
                 alt="Database Certificate"
                 class="cert-image">

            <img src="{{ asset('images/ITS-Badges-Databases.png') }}"
                 alt="Database Badge"
                 class="cert-badge">
        </div>

        <div class="cert-body">
            <div class="cert-org">Certiport · Pearson</div>
            <h3 class="cert-title">IT Specialist — Databases</h3>

            <p class="cert-desc">
                Certified in relational database management, SQL, normalization,
                database design, data integrity, and query optimization.
            </p>

            <a href="https://www.credly.com/users/rexcel-jay-lusica"
               class="cert-btn"
               target="_blank"
               rel="noopener noreferrer">
                Verify on Credly
            </a>
        </div>
    </article>

    <!-- CYBERSECURITY -->
    <article class="cert-card rev" data-reveal>
        <div class="cert-showcase">
            <img src="{{ asset('images/cybersecurity.png') }}"
                 alt="Cybersecurity Certificate"
                 class="cert-image">

            <img src="{{ asset('images/ITS-Badges-Cybersecurity.png') }}"
                 alt="Cybersecurity Badge"
                 class="cert-badge">
        </div>

        <div class="cert-body">
            <div class="cert-org">Certiport · Pearson</div>
            <h3 class="cert-title">IT Specialist — Cybersecurity</h3>

            <p class="cert-desc">
                Certified in cybersecurity fundamentals including network security,
                threat detection, risk management, cryptography, and secure software practices.
            </p>

            <a href="https://www.credly.com/users/rexcel-jay-lusica"
               class="cert-btn"
               target="_blank"
               rel="noopener noreferrer">
                Verify on Credly
            </a>
        </div>
    </article>


    </div>

    @if(!empty($certificates))
    <div class="certs-grid certs-grid-auto">
      @foreach($certificates as $cert)
        <article class="cert-card cert-card-file rev" data-reveal>
          <a href="{{ $cert['url'] }}" target="_blank" rel="noopener noreferrer" class="cert-file-link">
            <div class="cert-file-icon cert-file-icon-{{ $cert['ext'] }}">
              @if($cert['is_pdf'])
                PDF
              @else
                {{ strtoupper($cert['ext']) }}
              @endif
            </div>
            <div class="cert-body">
              <div class="cert-org">Auto-detected · public/cert</div>
              <h3 class="cert-title">{{ $cert['title'] }}</h3>
              <p class="cert-desc">
                {{ strtoupper($cert['ext']) }} file · {{ $cert['size_kb'] }} KB
                @if($cert['modified']) · added {{ $cert['modified'] }} @endif
              </p>
            </div>
          </a>
          <div class="cert-file-actions">
            <a href="{{ $cert['url'] }}" target="_blank" rel="noopener noreferrer" class="cert-btn">View</a>
            <a href="{{ $cert['url'] }}" download class="cert-btn">Download</a>
          </div>
        </article>
      @endforeach
    </div>
    @endif
  </div>
</section>
