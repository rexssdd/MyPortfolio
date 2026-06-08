<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function index()
    {
        $skills = $this->skills();
        $projects = $this->projects();
        $timeline = $this->timeline();
        $langs = $this->langs();
        $roles = $this->roles();
        $skillCategories = $this->skillCategories();
        $projectFilters = $this->projectFilters();

        return view('portfolio', compact(
            'skills', 'projects', 'timeline', 'langs',
            'roles', 'skillCategories', 'projectFilters'
        ));
    }

    private function skills(): array
    {
        return [
            ['name' => 'Java',           'icon' => 'java/java-original.svg',                     'level' => 80, 'category' => 'lang',  'color' => '#F59E0B'],
            ['name' => 'JavaScript',     'icon' => 'javascript/javascript-original.svg',          'level' => 85, 'category' => 'lang',  'color' => '#F7DF1E'],
            ['name' => 'HTML5',          'icon' => 'html5/html5-original.svg',                    'level' => 90, 'category' => 'lang',  'color' => '#E34F26'],
            ['name' => 'CSS3',           'icon' => 'css3/css3-original.svg',                      'level' => 88, 'category' => 'lang',  'color' => '#264DE4'],
            ['name' => 'PHP',            'icon' => 'php/php-original.svg',                        'level' => 78, 'category' => 'lang',  'color' => '#777BB3'],
            ['name' => 'React.js',       'icon' => 'react/react-original.svg',                    'level' => 82, 'category' => 'fw',    'color' => '#61DAFB'],
            ['name' => 'Laravel',        'icon' => 'laravel/laravel-original.svg',                'level' => 80, 'category' => 'fw',    'color' => '#FF2D20'],
            ['name' => 'Vite',           'icon' => 'vitejs/vitejs-original.svg',                  'level' => 75, 'category' => 'fw',    'color' => '#646CFF'],
            ['name' => 'MySQL',          'icon' => 'mysql/mysql-original.svg',                    'level' => 83, 'category' => 'db',    'color' => '#00758F'],
            ['name' => 'REST APIs',      'icon' => 'nodejs/nodejs-original.svg',                  'level' => 80, 'category' => 'db',    'color' => '#3B82F6'],
            ['name' => 'CRUD Systems',   'icon' => 'postgresql/postgresql-original.svg',          'level' => 85, 'category' => 'db',    'color' => '#10B981'],
            ['name' => 'Cybersecurity',  'icon' => 'linux/linux-original.svg',                    'level' => 65, 'category' => 'other', 'color' => '#8B5CF6'],
            ['name' => 'Git & GitHub',   'icon' => 'git/git-original.svg',                        'level' => 78, 'category' => 'other', 'color' => '#F1502F'],
            ['name' => 'UI/UX Design',   'icon' => 'figma/figma-original.svg',                    'level' => 72, 'category' => 'other', 'color' => '#EC4899'],
            ['name' => 'System Analysis','icon' => 'vscode/vscode-original.svg',                  'level' => 75, 'category' => 'other', 'color' => '#F59E0B'],
        ];
    }

    private function projects(): array
    {
        return [
            [
                'number' => '01',
                'title'  => 'Water Refilling Station POS',
                'desc'   => 'Complete point-of-sale system for water refilling businesses with inventory tracking, sales reports, and customer management.',
                'techs'  => ['Laravel', 'MySQL', 'Bootstrap'],
                'filters'=> ['laravel', 'mysql'],
                'github' => 'https://github.com/rexssdd',
            ],
            [
                'number' => '02',
                'title'  => 'Pizza Ordering System',
                'desc'   => 'Online food ordering platform with real-time order tracking, menu management, and an admin dashboard for order processing.',
                'techs'  => ['PHP', 'MySQL', 'JavaScript'],
                'filters'=> ['mysql'],
                'github' => 'https://github.com/rexssdd',
            ],
            [
                'number' => '03',
                'title'  => 'School Management System',
                'desc'   => 'Comprehensive academic platform handling student records, grading, enrollment, and faculty management with multi-role access.',
                'techs'  => ['Laravel', 'React', 'MySQL', 'REST API'],
                'filters'=> ['laravel', 'react', 'mysql'],
                'github' => 'https://github.com/rexssdd',
            ],
            [
                'number' => '04',
                'title'  => 'Java GUI Desktop App',
                'desc'   => 'Desktop application built with Java Swing featuring a clean GUI for data management and processing tasks.',
                'techs'  => ['Java', 'Swing', 'OOP'],
                'filters'=> ['java'],
                'github' => 'https://github.com/rexssdd',
            ],
            [
                'number' => '05',
                'title'  => 'Library Management System',
                'desc'   => 'Full CRUD database app for managing book inventories, member registrations, and borrowing records with search capabilities.',
                'techs'  => ['Laravel', 'MySQL', 'Blade'],
                'filters'=> ['laravel', 'mysql'],
                'github' => 'https://github.com/rexssdd',
            ],
            [
                'number' => '06',
                'title'  => 'React Dashboard UI',
                'desc'   => 'Modern admin dashboard built with React.js featuring responsive charts, data tables, and a clean component-based architecture.',
                'techs'  => ['React.js', 'JavaScript', 'CSS3'],
                'filters'=> ['react'],
                'github' => 'https://github.com/rexssdd',
            ],
        ];
    }

    private function timeline(): array
    {
        return [
            [
                'date'  => '2024 — Present',
                'title' => 'School Management System (DevDynamos)',
                'desc'  => 'Lead developer on a full Laravel/React high school management system with multi-role access, notifications, and reporting modules.',
            ],
            [
                'date'  => '2024',
                'title' => 'Pearson IT Specialist — Databases Certification',
                'desc'  => 'Earned Certiport-validated Pearson IT Specialist Databases certification demonstrating SQL and RDBMS proficiency.',
            ],
            [
                'date'  => '2024',
                'title' => 'Pearson IT Specialist — Cybersecurity Certification',
                'desc'  => 'Completed Certiport Pearson IT Specialist Cybersecurity certification covering network security, threat identification, and risk management.',
            ],
            [
                'date'  => '2023',
                'title' => 'First Full-Stack Laravel Application',
                'desc'  => 'Built Water Refilling Station POS — first complete end-to-end Laravel application with MySQL integration and real business logic.',
            ],
            [
                'date'  => '2023',
                'title' => 'Java GUI Application Development',
                'desc'  => 'Completed Java Swing desktop application projects, deepening OOP principles and GUI programming skills.',
            ],
            [
                'date'  => '2022',
                'title' => 'Started Web Development Journey',
                'desc'  => 'Began learning HTML, CSS, and JavaScript — quickly progressing to PHP and discovering a passion for full-stack development.',
            ],
        ];
    }

    private function langs(): array
    {
        return [
            ['name' => 'PHP / Laravel',      'percent' => 35, 'color' => '#3B82F6'],
            ['name' => 'JavaScript / React', 'percent' => 28, 'color' => '#8B5CF6'],
            ['name' => 'HTML & CSS',          'percent' => 20, 'color' => '#10B981'],
            ['name' => 'Java',               'percent' => 12, 'color' => '#F59E0B'],
            ['name' => 'SQL',                'percent' =>  5, 'color' => '#F43F5E'],
        ];
    }

    private function roles(): array
    {
        return [
            'Full Stack Developer',
            'Laravel Engineer',
            'React Developer',
            'Database Designer',
            'Cybersecurity Learner',
            'Problem Solver',
        ];
    }

    private function skillCategories(): array
    {
        return [
            ['key' => 'all',   'label' => 'All'],
            ['key' => 'lang',  'label' => 'Languages'],
            ['key' => 'fw',    'label' => 'Frameworks'],
            ['key' => 'db',    'label' => 'Database'],
            ['key' => 'other', 'label' => 'Other'],
        ];
    }

    private function projectFilters(): array
    {
        return [
            ['key' => 'all',    'label' => 'All'],
            ['key' => 'laravel','label' => 'Laravel'],
            ['key' => 'react',  'label' => 'React'],
            ['key' => 'java',   'label' => 'Java'],
            ['key' => 'mysql',  'label' => 'MySQL'],
        ];
    }
}
