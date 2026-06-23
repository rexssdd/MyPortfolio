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
        $certificates = $this->certificates();

        return view('portfolio', compact(
            'skills', 'projects', 'timeline', 'langs',
            'roles', 'skillCategories', 'projectFilters', 'certificates'
        ));
    }

    /**
     * Automatically scans public/cert and builds a list of certificate
     * files (PDF/image) to display on the portfolio. Drop a new file in
     * that folder and it will show up here automatically — no code
     * changes required.
     */
    private function certificates(): array
    {
        $dir = public_path('cert');

        if (!is_dir($dir)) {
            return [];
        }

        $allowedExt = ['pdf', 'png', 'jpg', 'jpeg', 'webp'];
        $files = glob($dir . '/*');
        $certificates = [];

        foreach ($files as $path) {
            if (!is_file($path)) {
                continue;
            }

            $filename = basename($path);
            $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

            if (!in_array($ext, $allowedExt, true)) {
                continue;
            }

            $mtime = filemtime($path);

            $certificates[] = [
                'filename'  => $filename,
                'title'     => $this->prettifyCertTitle($filename),
                'url'       => asset('cert/' . rawurlencode($filename)),
                'ext'       => $ext,
                'is_pdf'    => $ext === 'pdf',
                'size_kb'   => round(filesize($path) / 1024),
                'modified'  => date('M Y', $mtime),
                'mtime'     => $mtime,
            ];
        }

        // Newest certificates first.
        usort($certificates, fn ($a, $b) => $b['mtime'] <=> $a['mtime']);

        return $certificates;
    }

    /**
     * Turns a raw filename like "CCE_Certificate_Rexcel_Jay_Lusica.pdf"
     * or "Cert36012358315.pdf" into a readable card title.
     */
    private function prettifyCertTitle(string $filename): string
    {
        $name = pathinfo($filename, PATHINFO_FILENAME);

        // Replace separators with spaces.
        $name = str_replace(['_', '-', '.'], ' ', $name);

        // Drop long numeric IDs (e.g. "Cert36012358315" -> "Cert").
        $name = preg_replace('/\d{4,}/', '', $name);

        // Collapse repeated spaces.
        $name = trim(preg_replace('/\s+/', ' ', $name));

        if ($name === '' || strtolower($name) === 'cert') {
            return 'Certificate';
        }

        return ucwords($name);
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
                'number'        => '01',
                'title'         => 'High School Management System',
                'desc'          => 'Comprehensive academic platform handling student records, grading, enrollment, and faculty management with multi-role access. Built with the DevDynamos team.',
                'techs'         => ['Laravel', 'React', 'MySQL', 'REST API'],
                'filters'       => ['laravel', 'react', 'mysql', 'collab'],
                'image'         => asset('projectDesigns/highschool.png'),
                'image_alt'     => 'High school classroom with students and a blackboard',
                'github'        => 'https://github.com/jasper38/high-school-management-system',
                'collab'        => true,
                'collab_label'  => 'w/ jasper38 · DevDynamos',
            ],
            [
                'number'        => '02',
                'title'         => 'Water Refilling Station System',
                'desc'          => 'Complete point-of-sale system for water refilling businesses with inventory tracking, sales reports, and customer management.',
                'techs'         => ['Laravel', 'MySQL', 'Bootstrap'],
                'filters'       => ['laravel', 'mysql'],
                'image'         => asset('projectDesigns/JZWaters.png'),
                'image_alt'     => 'Jz Waters refilling station landing page',
                'github'        => 'https://github.com/rexssdd/WaterRefillingSystem',
                'collab'        => false,
            ],
            [
                'number'        => '03',
                'title'         => 'Inventory Management System',
                'desc'          => 'Laravel and Vite-powered inventory management platform for tracking stock levels, items, and warehouse operations, styled with Tailwind CSS. Developed in collaboration with cheezypotatoes.',
                'techs'         => ['Laravel', 'MySQL', 'Tailwind'],
                'filters'       => ['laravel', 'mysql', 'collab'],
                'image'         => asset('projectDesigns/inventory.png'),
                'image_alt'     => 'Warehouse shelves stocked with inventory boxes',
                'github'        => 'https://github.com/cheezypotatoes/InventoryManagement',
                'collab'        => true,
                'collab_label'  => 'w/ cheezypotatoes',
            ],
            // ── Solo Projects ─────────────────────────────────────────────
            [
                'number'        => '04',
                'title'         => 'Pizzify',
                'desc'          => 'Java pizza ordering and receipt system built for a CS26 coursework project, generating itemised order receipts and demonstrating core OOP design.',
                'techs'         => ['Java', 'Maven', 'OOP'],
                'filters'       => ['java'],
                'image'         => asset('projectDesigns/Pizzify.webp'),
                'image_alt'     => 'Fresh pizza on a wooden board',
                'github'        => 'https://github.com/rexssdd/Pizzify',
                'collab'        => false,
            ],
        
            [
                'number'        => '05',
                'title'         => 'Classroom Management System',
                'desc'          => 'Django REST backend for a classroom management platform handling student and instructor records.',
                'techs'         => ['Python', 'Django'],
                'filters'       => ['python'],
                'image'         => 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
                'image_alt'     => 'Classroom with desks and a whiteboard',
                'github'        => 'https://github.com/rexssdd/classroom_management_system_backend',
                'collab'        => false,
            ],
            [
                'number'        => '06',
                'title'         => 'Tower of Hanoi',
                'desc'          => 'Interactive Tower of Hanoi puzzle implementation with animated disc movements, step counter, and configurable disc count — demonstrating recursion and algorithm visualisation.',
                'techs'         => ['Java', 'OOP', 'Recursion'],
                'filters'       => ['java'],
                'image'         => asset('projectDesigns/TowerofHanoi.png'),
                'image_alt'     => 'Tower of Hanoi puzzle app with three rods and animated discs',
                'github'        => 'https://github.com/rexssdd/towerOfHanoi',
                'collab'        => false,
            ],

            // ── Collaborative Projects ────────────────────────────────────
            [
                'number'        => '07',
                'title'         => 'Hospital Management System',
                'desc'          => 'Laravel-based hospital management system covering patient records, appointments, and billing workflows. Developed in collaboration with cheezypotatoes.',
                'techs'         => ['Laravel', 'MySQL', 'Blade'],
                'filters'       => ['laravel', 'mysql', 'collab'],
                'image'         => asset('projectDesigns/HospitalManagementSys.png'),
                'image_alt'     => 'Jorge & Co Medical Center login screen',
                'github'        => 'https://github.com/rexssdd/hospital_project_laravel',
                'collab'        => true,
                'collab_label'  => 'w/ cheezypotatoes',
            ],
            [
                'number'        => '08',
                'title'         => 'Banana Plantation Simulation',
                'desc'          => 'Simulation system modelling banana plantation operations, growth cycles, and yield forecasting with interactive data visualisation.',
                'techs'         => ['PHP', 'MySQL', 'JavaScript'],
                'filters'       => ['mysql'],
                'image'         => asset('projectDesigns/Bananaplantation.png'),
                'image_alt'     => 'Banana plantation simulation dashboard showing field cultivation and packinghouse stages',
                'github'        => 'https://github.com/rexssdd/banana-plantation-simulation',
                'collab'        => false,
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
            ['key' => 'python', 'label' => 'Python'],
            ['key' => 'mysql',  'label' => 'MySQL'],
            ['key' => 'collab', 'label' => '🤝 Collab'],
        ];
    }
}