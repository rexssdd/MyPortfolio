<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="csrf-token" content="{{ csrf_token() }}" />
  <meta name="description" content="Rexcel Jay A. Lusica — Full Stack Developer specializing in Laravel, React, MySQL, and Cybersecurity." />
  <title>Rexcel Jay A. Lusica</title>

  <!-- Google Fonts — display + body + mono triad -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />

  @vite(['resources/css/app.css', 'resources/js/app.js'])
  @stack('head')
</head>
<body>

  {{-- Aurora ambient background --}}
  <div id="aurora-bg" aria-hidden="true">
    <div class="aurora-orb orb-a"></div>
    <div class="aurora-orb orb-b"></div>
    <div class="aurora-orb orb-c"></div>
  </div>

  {{-- Scroll progress bar --}}
  <div id="prog" role="progressbar"
       aria-label="Page scroll progress"
       aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>

  {{-- Navigation --}}
  @include('components.nav')

  {{-- Main content --}}
  <main id="main-content">
    @yield('content')
  </main>

  {{-- Footer --}}
  @include('components.footer')

  {{-- Scroll to top --}}
  <button id="st" aria-label="Back to top">↑</button>

  {{-- Toast --}}
  <div id="toast" role="status" aria-live="polite" aria-atomic="true"></div>

  @stack('scripts')
</body>
</html>