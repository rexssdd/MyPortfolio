<section id="contact" aria-labelledby="contact-title">
  <div class="sec-wrap">
    <div class="sec-head rev" data-reveal>
      <div class="sec-tag">// reach out</div>
      <h2 class="sec-title" id="contact-title">Get In <span class="g">Touch</span></h2>
      <p class="sec-sub">Open to internships, collaborations, and interesting projects.</p>
    </div>

    <div class="contact-card rev vis">

      {{-- Success message --}}
      @if(session('success'))
        <div class="alert-success" role="alert">{{ session('success') }}</div>
      @elseif(session('error'))
        <div class="alert-error" role="alert">{{ session('error') }}</div>
      @endif

      <form action="{{ route('contact.send') }}" method="POST" novalidate>
        @csrf

        <div class="fg">
          <label for="cf-n">Your Name</label>
          <input id="cf-n" name="name" class="fi {{ $errors->has('name') ? 'err' : '' }}"
                 type="text" placeholder="John Doe" autocomplete="name"
                 value="{{ old('name') }}"
                 aria-required="true"
                 aria-invalid="{{ $errors->has('name') ? 'true' : 'false' }}"
                 aria-describedby="en" />
          @error('name')
            <div id="en" class="ferr" role="alert">{{ $message }}</div>
          @enderror
        </div>

        <div class="fg">
          <label for="cf-e">Email Address</label>
          <input id="cf-e" name="email" class="fi {{ $errors->has('email') ? 'err' : '' }}"
                 type="email" placeholder="hello@example.com" autocomplete="email"
                 value="{{ old('email') }}"
                 aria-required="true"
                 aria-invalid="{{ $errors->has('email') ? 'true' : 'false' }}"
                 aria-describedby="ee" />
          @error('email')
            <div id="ee" class="ferr" role="alert">{{ $message }}</div>
          @enderror
        </div>

        <div class="fg">
          <label for="cf-m">Message</label>
          <textarea id="cf-m" name="message" class="ft {{ $errors->has('message') ? 'err' : '' }}"
                    placeholder="Tell me about your project or opportunity…"
                    aria-required="true"
                    aria-invalid="{{ $errors->has('message') ? 'true' : 'false' }}"
                    aria-describedby="em">{{ old('message') }}</textarea>
          @error('message')
            <div id="em" class="ferr" role="alert">{{ $message }}</div>
          @enderror
        </div>

        <button type="submit" class="btn btn-p"
                style="width:100%;justify-content:center;font-size:13px;">
          Send Message →
        </button>
      </form>

      <nav class="socials" aria-label="Social links">
        <a href="https://github.com/rexssdd" class="soc-btn"
           target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in new tab)">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
               width="16" height="16" style="vertical-align:middle;margin-right:6px;filter:invert(1);" alt="" />GitHub
        </a>
        <button class="soc-btn" id="linkedin-btn">💼 LinkedIn</button>
        <a href="mailto:lusicarexceljay@gmail.com,r.lusica.545469@umindanao.edu.ph"
           class="soc-btn" aria-label="Send email">✉️ Email</a>
      </nav>
    </div>
  </div>
</section>