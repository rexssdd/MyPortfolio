@extends('layouts.app')

@push('head')
  {{-- Pass PHP data to JS for interactive features --}}
  <script>
    window.portfolioData = {
      roles: @json($roles),
      skills: @json($skills),
      projects: @json($projects),
      skillCategories: @json($skillCategories),
      projectFilters: @json($projectFilters),
    };
  </script>
@endpush

@section('content')

  {{-- ── HERO ── --}}
  @include('sections.hero')
  <div class="divider" aria-hidden="true"></div>

  {{-- ── ABOUT ── --}}
  @include('sections.about')
  <div class="divider" aria-hidden="true"></div>

  {{-- ── SKILLS ── --}}
  @include('sections.skills', ['skills' => $skills, 'skillCategories' => $skillCategories])
  <div class="divider" aria-hidden="true"></div>

  {{-- ── CERTIFICATIONS ── --}}
  @include('sections.certs')
  <div class="divider" aria-hidden="true"></div>

  {{-- ── PROJECTS ── --}}
  @include('sections.projects', ['projects' => $projects, 'projectFilters' => $projectFilters])
  <div class="divider" aria-hidden="true"></div>

  {{-- ── JOURNEY ── --}}
  @include('sections.journey', ['timeline' => $timeline])
  <div class="divider" aria-hidden="true"></div>

  {{-- ── GITHUB ── --}}
  @include('sections.github', ['langs' => $langs])
  <div class="divider" aria-hidden="true"></div>

  {{-- ── CONTACT ── --}}
  @include('sections.contact')

@endsection