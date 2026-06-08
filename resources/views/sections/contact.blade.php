<section id="contact" aria-labelledby="contact-title">
  <div class="sec-wrap">
    <div class="sec-head rev" data-reveal>
      <div class="sec-tag">// reach out</div>
      <h2 class="sec-title" id="contact-title">Get In <span class="g">Touch</span></h2>
      <p class="sec-sub">Open to internships, collaborations, and interesting projects.</p>
    </div>

    <div class="contact-card rev vis">

      <form id="contact-form" novalidate>
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

<script>
document.addEventListener('DOMContentLoaded', function () {
  var form    = document.getElementById('contact-form');
  var btn     = document.getElementById('contact-submit');
  var btnText = document.getElementById('contact-btn-text');

  if (!form) return;

  function clearErrors() {
    ['en','ee','em'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) { el.textContent = ''; el.style.display = 'none'; }
    });
    form.querySelectorAll('.err').forEach(function(f) { f.classList.remove('err'); });
  }

  function showFieldErrors(errors) {
    var map = { name: 'en', email: 'ee', message: 'em' };
    Object.keys(errors).forEach(function(field) {
      var elId = map[field];
      if (!elId) return;
      var el = document.getElementById(elId);
      if (el) { el.textContent = errors[field][0]; el.style.display = 'block'; }
      var input = form.querySelector('[name="' + field + '"]');
      if (input) input.classList.add('err');
    });
  }

  function setLoading(on) {
    btn.disabled = on;
    btn.style.opacity = on ? '0.7' : '1';
    btn.style.cursor  = on ? 'not-allowed' : '';
    btnText.textContent = on ? 'Sending…' : 'Send Message →';
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();
    setLoading(true);

    var csrfToken = document.querySelector('meta[name="csrf-token"]');

    fetch('{{ route("contact.send") }}', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-TOKEN': csrfToken ? csrfToken.content : '',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        name:    form.querySelector('[name="name"]').value,
        email:   form.querySelector('[name="email"]').value,
        message: form.querySelector('[name="message"]').value
      })
    })
    .then(function(res) {
      return res.json().then(function(data) {
        return { status: res.status, data: data };
      });
    })
    .then(function(result) {
      if (result.status === 200) {
        window.toast(result.data.message, 'ok');
        form.querySelector('[name="name"]').value    = '';
        form.querySelector('[name="email"]').value   = '';
        form.querySelector('[name="message"]').value = '';
      } else if (result.status === 422 && result.data.errors) {
        showFieldErrors(result.data.errors);
        window.toast('Please fix the errors below.', 'err');
      } else {
        window.toast(result.data.message || 'Something went wrong. Please try again.', 'err');
      }
    })
    .catch(function(err) {
      console.error('Contact fetch error:', err);
      window.toast('Could not connect. Please email me directly at lusicarexceljay@gmail.com', 'err');
    })
    .finally(function() {
      setLoading(false);
    });
  });
});
</script> 