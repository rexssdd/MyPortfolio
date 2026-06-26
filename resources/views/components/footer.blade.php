<footer role="contentinfo">
  <nav class="foot-links" aria-label="Footer navigation">
    @foreach(['hero' => 'Home', 'about' => 'About', 'skills' => 'Skills', 'projects' => 'Projects', 'contact' => 'Contact'] as $id => $label)
      <a href="#{{ $id }}">{{ $label }}</a>
    @endforeach
  </nav>
  <p class="foot-copy">
     · © {{ date('Y') }} <span>Rexcel Jay A. Lusica</span> a· 
  </p>
</footer>
