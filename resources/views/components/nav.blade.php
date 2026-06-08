<nav id="nav" role="navigation" aria-label="Main navigation">
  <a href="#hero" class="nav-logo" aria-label="Back to top">RJL.</a>
  <ul class="nav-links" id="nav-links" role="list">
    @foreach([['hero','Home'],['about','About'],['skills','Skills'],['certs','Certs'],['projects','Projects'],['journey','Journey'],['github','GitHub']] as [$id, $label])
      <li role="listitem">
        <a href="#{{ $id }}" data-nav="{{ $id }}">{{ $label }}</a>
      </li>
    @endforeach
    <li role="listitem">
      <a href="#contact" class="nav-cta">Contact</a>
    </li>
  </ul>
  <button class="hamburger" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-links">
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
  </button>
</nav>
