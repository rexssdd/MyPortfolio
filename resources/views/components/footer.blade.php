<footer role="contentinfo">
  <nav class="foot-links" aria-label="Footer navigation">
    @foreach(['hero' => 'Home', 'about' => 'About', 'skills' => 'Skills', 'projects' => 'Projects', 'contact' => 'Contact'] as $id => $label)
      <a href="#{{ $id }}">{{ $label }}</a>
    @endforeach
  </nav>
  <p class="foot-copy">
    Built with <span>Laravel &amp; Blade</span> · © {{ date('Y') }} <span>Rexcel Jay A. Lusica</span>
  </p>
</footer>
