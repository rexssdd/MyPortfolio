<section id="contact" aria-labelledby="contact-title">
  <div class="sec-wrap">
    <div class="sec-head rev" data-reveal>
      <div class="sec-tag">// reach out</div>
      <h2 class="sec-title" id="contact-title">Get In <span class="g">Touch</span></h2>
      <p class="sec-sub">Open to internships, collaborations, and interesting projects.</p>
    </div>

    <div class="contact-card rev vis">

      <form id="contact-form" action="{{ route('contact.send') }}" method="POST" novalidate>
        @csrf

        <div class="fg">
          <label for="cf-n">Your Name</label>
          <input id="cf-n" name="name" class="fi"
                 type="text" placeholder="John Doe" autocomplete="name"
                 aria-required="true" />
          <div id="en" class="ferr" role="alert" style="display:none;"></div>
        </div>

        <div class="fg">
          <label for="cf-e">Email Address</label>
          <input id="cf-e" name="email" class="fi"
                 type="email" placeholder="hello@example.com" autocomplete="email"
                 aria-required="true" />
          <div id="ee" class="ferr" role="alert" style="display:none;"></div>
        </div>

        <div class="fg">
          <label for="cf-m">Message</label>
          <textarea id="cf-m" name="message" class="ft"
                    placeholder="Tell me about your project or opportunity…"
                    aria-required="true"></textarea>
          <div id="em" class="ferr" role="alert" style="display:none;"></div>
        </div>

        <button type="submit" class="btn btn-p" id="contact-submit"
                style="width:100%;justify-content:center;font-size:13px;">
          <span id="contact-btn-text">Send Message →</span>
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

@push('scripts')
<script>
(function () {
  const form        = document.getElementById('contact-form');
  const btn         = document.getElementById('contact-submit');
  const btnText     = document.getElementById('contact-btn-text');
  const fieldErrors = { name: 'en', email: 'ee', message: 'em' };

  function clearErrors() {
    Object.values(fieldErrors).forEach(id => {
      const el = document.getElementById(id);
      el.textContent = '';
      el.style.display = 'none';
    });
    form.querySelectorAll('.fi, .ft').forEach(f => f.classList.remove('err'));
  }

  function showFieldErrors(errors) {
    Object.entries(errors).forEach(([field, messages]) => {
      const errId = fieldErrors[field];
      if (!errId) return;
      const el = document.getElementById(errId);
      el.textContent = messages[0];
      el.style.display = 'block';
      const input = form.querySelector(`[name="${field}"]`);
      if (input) input.classList.add('err');
    });
  }

  function setLoading(loading) {
    btn.disabled = loading;
    btn.style.opacity = loading ? '0.7' : '1';
    btn.style.cursor  = loading ? 'not-allowed' : '';
    btnText.textContent = loading ? 'Sending…' : 'Send Message →';
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    clearErrors();
    setLoading(true);

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: new FormData(form),
      });

      const data = await res.json();

      if (res.ok) {
        window.toast(data.message, 'ok');
        form.reset();
      } else if (res.status === 422 && data.errors) {
        showFieldErrors(data.errors);
        window.toast('Please fix the errors below.', 'err');
      } else {
        window.toast(data.message || 'Something went wrong. Please try again.', 'err');
      }
    } catch (err) {
      window.toast('Network error. Please check your connection and try again.', 'err');
    } finally {
      setLoading(false);
    }
  });
})();
</script>
@endpush