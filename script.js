/*!
 * Portfolio Website Logic — Swiss Minimal / Technical Editorial
 * Designed & Developed by Juan Cruz Dominguez Pistoia
 * GitHub: https://github.com/Cruplusplus
 */

const I18N = {
    es: {
        nav_projects: "01 // Proyectos",
        nav_stack: "02 // Stack",
        nav_path: "03 // Trayectoria",
        nav_contact: "04 // Contacto",
        btn_cv: "CV.pdf",
        status_badge: "STATUS // DISPONIBLE PARA TRABAJAR",
        hero_title: "Juan Cruz Dominguez Pistoia",
        hero_subtitle: "Backend & Systems Developer",
        hero_desc: "Estudiante de Programación en la UTN (FRGP). Orientado al desarrollo backend, diseño de bases de datos y desarrollo de software con C#, .NET, C++ y SQL Server. Enfocado en la arquitectura limpia, la robustez del código y la resolución técnica de problemas.",
        btn_explore: "Ver Proyectos",
        section_projects: "Proyectos",
        section_stack: "Stack Técnico",
        section_path: "Trayectoria & Formación",
        footer_text: "Desarrollo de software estructurado, backend y modelado de datos.",
        filter_all: "Todos",
        btn_code: "Código Fuente",
        btn_demo: "Demo en Vivo",
        arch_label: "Arquitectura",
        cert_link: "Ver Certificado",
        degree_progress: "Progreso de la carrera",
        approved_subjects: "Materias aprobadas",
        in_progress_subjects: "Cursando actualmente"
    },
    en: {
        nav_projects: "01 // Projects",
        nav_stack: "02 // Stack",
        nav_path: "03 // Experience",
        nav_contact: "04 // Contact",
        btn_cv: "Resume.pdf",
        status_badge: "STATUS // OPEN TO WORK",
        hero_title: "Juan Cruz Dominguez Pistoia",
        hero_subtitle: "Backend & Systems Developer",
        hero_desc: "Programming student at UTN (FRGP). Focused on backend engineering, relational database design, and software systems with C#, .NET, C++, and SQL Server. Dedicated to clean architecture, performance, and maintainable codebases.",
        btn_explore: "View Projects",
        section_projects: "Projects",
        section_stack: "Technical Stack",
        section_path: "Experience & Education",
        footer_text: "Structured software engineering, backend systems, and data modeling.",
        filter_all: "All",
        btn_code: "Source Code",
        btn_demo: "Live Demo",
        arch_label: "Architecture",
        cert_link: "View Certificate",
        degree_progress: "Degree completion",
        approved_subjects: "Approved subjects",
        in_progress_subjects: "Currently taking"
    }
};

const PROJECTS_DATA = [
    {
        id: 1,
        featured: true,
        arch: "Systems & OOP // SFML",
        es: {
            title: "Videojuego Roguelike 2D",
            category: "Backend & Sistemas",
            summary: "Simulador de mapa procedural y motor de lógica RPG desarrollado en C++ utilizando SFML. Diseñado con arquitectura modular orientada a objetos (POO), gestión eficiente de memoria dinámica y serialización de estado mediante JSON para persistencia de partidas."
        },
        en: {
            title: "2D Roguelike Game Engine",
            category: "Backend & Systems",
            summary: "Procedural map simulator and RPG game logic engine built in C++ using SFML. Architected with modular Object-Oriented principles, dynamic memory management, and JSON state serialization for game persistence."
        },
        tags: ["C++", "SFML", "OOP", "JSON", "Git"],
        githubUrl: "https://github.com/Cruplusplus/TP-Programacion-2.-Extendible-map-RPG-in-C-",
        liveDemoUrl: ""
    },
    {
        id: 2,
        featured: false,
        arch: "Relational DB // Docker",
        es: {
            title: "Sistema de Gestión de Gimnasio & Club",
            category: "Bases de Datos",
            summary: "Diseño, normalización e implementación de base de datos relacional para gestión deportiva integral. Desplegado sobre SQL Server en contenedores Docker, con procedimientos almacenados, constraints y planes de indexación optimizados."
        },
        en: {
            title: "Gym & Sports Club Management System",
            category: "Databases",
            summary: "Relational schema design, normalization, and deployment for athletic management. Powered by SQL Server on Docker containers, featuring stored procedures, integrity constraints, and optimized index execution plans."
        },
        tags: ["SQL Server", "Docker", "T-SQL", "Relational Design"],
        githubUrl: "https://github.com/Cruplusplus/UTNFRGP-TUP-BD2-TPI-G17",
        liveDemoUrl: ""
    },
    {
        id: 3,
        featured: false,
        arch: "Swiss Minimal // Semantic Web",
        es: {
            title: "Portfolio Web & Design System",
            category: "Desarrollo Web",
            summary: "Portafolio de ingeniería desarrollado en Vanilla HTML5, CSS moderno (Custom Properties, CSS Grid, Flexbox) y JavaScript ES6+. Sin frameworks externos pesados, con diseño editorial suizo y rendimiento nativo óptimo."
        },
        en: {
            title: "Web Portfolio & Design System",
            category: "Web Development",
            summary: "Technical engineering portfolio built with Vanilla HTML5, modern CSS (Custom Properties, CSS Grid, Flexbox), and modular ES6+ JavaScript. Free of bloated runtime dependencies, focusing on Swiss editorial layout and speed."
        },
        tags: ["HTML5", "CSS3 Grid", "Vanilla JS", "Performance"],
        githubUrl: "https://github.com/Cruplusplus",
        liveDemoUrl: ""
    }
];

const SKILLS_DATA = [
    {
        icon: "terminal",
        es: { category: "Lenguajes & Backend" },
        en: { category: "Languages & Backend" },
        skills: [
            { name: "C# / .NET", level_es: "Avanzado", level_en: "Advanced", class: "level-advanced" },
            { name: "C++", level_es: "Avanzado", level_en: "Advanced", class: "level-advanced" },
            { name: "Python", level_es: "Intermedio", level_en: "Intermediate", class: "level-intermediate" },
            { name: "Go", level_es: "Principiante", level_en: "Beginner", class: "level-beginner" },
            { name: "HTML5 / CSS3", level_es: "Intermedio", level_en: "Intermediate", class: "level-intermediate" },
            { name: "JavaScript (ES6+)", level_es: "Intermedio", level_en: "Intermediate", class: "level-intermediate" }
        ]
    },
    {
        icon: "database",
        es: { category: "Bases de Datos & Contenedores" },
        en: { category: "Databases & Containers" },
        skills: [
            { name: "SQL Server (T-SQL)", level_es: "Avanzado", level_en: "Advanced", class: "level-advanced" },
            { name: "MongoDB", level_es: "Intermedio", level_en: "Intermediate", class: "level-intermediate" },
            { name: "Docker", level_es: "Intermedio", level_en: "Intermediate", class: "level-intermediate" },
            { name: "AWS Fundamentals", level_es: "Principiante", level_en: "Beginner", class: "level-beginner" }
        ]
    },
    {
        icon: "layers",
        es: { category: "Arquitectura & Metodologías" },
        en: { category: "Architecture & Tools" },
        skills: [
            { name: "Git & GitHub Workflow", level_es: "Avanzado", level_en: "Advanced", class: "level-advanced" },
            { name: "Programación Orientada a Objetos", level_es: "Avanzado", level_en: "Advanced", class: "level-advanced" },
            { name: "Linux / Bash Shell", level_es: "Intermedio", level_en: "Intermediate", class: "level-intermediate" },
            { name: "SCRUM / Metodologías Ágiles", level_es: "Intermedio", level_en: "Intermediate", class: "level-intermediate" }
        ]
    }
];

const TIMELINE_DATA = [
    {
        period: "2025 — 2027 (En Curso)",
        period_en: "2025 — 2027 (In Progress)",
        es: {
            role: "Tecnicatura Universitaria en Programación",
            company: "Universidad Tecnológica Nacional (UTN — FRGP)",
            desc: "Formación superior estructurada en ciencias de la computación, desarrollo de software y sistemas.\n• Arquitectura de software, POO avanzada y estructuras de datos con C++ y C# / .NET.\n• Diseño, modelado y administración de bases de datos relacionales (SQL Server) y NoSQL (MongoDB).\n• Metodologías ágiles, análisis de requerimientos, sistemas operativos y redes."
        },
        en: {
            role: "University Degree in Computer Programming",
            company: "National Technological University (UTN — FRGP)",
            desc: "Structured higher education in computer science, software architecture, and systems engineering.\n• Software architecture, advanced OOP, and data structures with C++ and C# / .NET.\n• Design, modeling, and administration of relational (SQL Server) and NoSQL (MongoDB) databases.\n• Agile methodologies, requirements engineering, operating systems, and computer networking."
        },
        progress: {
            approved: 10,
            total: 18,
            inProgress: 4
        },
        img: "https://upload.wikimedia.org/wikipedia/commons/6/67/UTN_logo.jpg",
        link: "",
        active: true
    },
    {
        period: "2026 (En Curso)",
        period_en: "2026 (In Progress)",
        es: {
            role: "Especialización en Python para Backend & Datos",
            company: "Formación Técnica Continua",
            desc: "Dominio de módulos avanzados, estructuras de datos nativas, procesamiento de archivos de flujo (TXT, CSV, JSON), captura estructurada de excepciones y optimización de algoritmos mediante expresiones regulares y automatización."
        },
        en: {
            role: "Python Backend & Data Processing Specialization",
            company: "Continuous Technical Training",
            desc: "Advanced modules, native data structures, stream processing (TXT, CSV, JSON), structured exception handling, and algorithmic optimization using regular expressions and automation scripts."
        },
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        link: "https://www.youtube.com/watch?v=nKPbfIU442g",
        active: true
    },
    {
        period: "2024 (Acreditado)",
        period_en: "2024 (Certified)",
        es: {
            role: "First Certificate in English (FCE — B2 CEFR)",
            company: "Cambridge University Press & Assessment",
            desc: "Competencia bilingüe profesional y técnica. Capacidad para analizar documentación de arquitectura técnica en inglés, coordinar con equipos de desarrollo internacionales y redactar especificaciones de software con fluidez y precisión."
        },
        en: {
            role: "First Certificate in English (FCE — B2 CEFR)",
            company: "Cambridge University Press & Assessment",
            desc: "Professional bilingual technical proficiency. Full capability to read and produce complex architectural specifications, interact with distributed international engineering teams, and document systems clearly."
        },
        img: "https://i.pinimg.com/736x/a5/44/53/a544531318d501c26443dc2378a8c150.jpg",
        link: "https://www.linkedin.com/in/juan-cruz-dominguez-pistoia-1830b4384/details/certifications/",
        active: false
    },
    {
        period: "2020 — 2021 (Finalizado)",
        period_en: "2020 — 2021 (Completed)",
        es: {
            role: "Fundamentos de Desarrollo Web (HTML5 & CSS3)",
            company: "Autodidacta & Cursos Especializados",
            desc: "Estudio profundo del Box Model, CSS Grid, Flexbox, metodologías de maquetado semántico, accesibilidad web (a11y) y responsive design adaptable sin frameworks."
        },
        en: {
            role: "Web Development Fundamentals (HTML5 & CSS3)",
            company: "Independent Study & Technical Courses",
            desc: "In-depth study of the CSS Box Model, Grid, Flexbox, semantic layout standards, accessibility (a11y), and frameworkless responsive design."
        },
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        link: "https://www.youtube.com/watch?v=ELSm-G201Ls",
        active: false
    },
    {
        period: "2019 — 2024 (Graduado)",
        period_en: "2019 — 2024 (Graduated)",
        es: {
            role: "Bachiller en Economía y Administración",
            company: "Instituto Marcelo Torcuato de Alvear",
            desc: "Formación de base en lógica analítica, procesos contables, gestión organizacional y métodos cuantitativos."
        },
        en: {
            role: "High School Diploma in Economics & Administration",
            company: "Instituto Marcelo Torcuato de Alvear",
            desc: "Foundational training in analytical logic, organizational operations, financial workflows, and quantitative methods."
        },
        img: "https://www.micole.net/imagenes/colegio/logo/300037471/marcelo-torcuato-de-alvear_128.png?v=MjAyNi0wOC0xMyAxODowMTo1Nw==",
        link: "",
        active: false
    }
];

let currentLang = 'es';
let currentFilter = 'All';

<<<<<<< Updated upstream
// LocalStorage translation cache
const TRANSLATION_CACHE = JSON.parse(localStorage.getItem('auto_translation_cache') || '{}');

async function translateText(text, fromLang = 'es', toLang = 'en') {
    if (!text || typeof text !== 'string' || !text.trim()) return text;
    const cleanText = text.trim();

    // Preserve code blocks like <code>&lt;port/f&gt;</code> as is
    if (cleanText.startsWith('<code>') && cleanText.endsWith('</code>')) {
        return cleanText;
    }

    const cacheKey = `${fromLang}_${toLang}_${cleanText}`;
    if (TRANSLATION_CACHE[cacheKey]) {
        return TRANSLATION_CACHE[cacheKey];
    }

    // Try Google Translate API first
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(cleanText)}`;
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            const translated = data[0].map(item => item[0]).join('');
            if (translated && translated.trim()) {
                TRANSLATION_CACHE[cacheKey] = translated;
                localStorage.setItem('auto_translation_cache', JSON.stringify(TRANSLATION_CACHE));
                return translated;
            }
        }
    } catch (e) {
        // Fallback to MyMemory API if Google is rate-limited
    }

    // Fallback: MyMemory API
    try {
        const url2 = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanText)}&langpair=${fromLang}|${toLang}`;
        const res2 = await fetch(url2);
        if (res2.ok) {
            const data2 = await res2.json();
            const translated2 = data2.responseData?.translatedText;
            if (translated2 && translated2.trim()) {
                TRANSLATION_CACHE[cacheKey] = translated2;
                localStorage.setItem('auto_translation_cache', JSON.stringify(TRANSLATION_CACHE));
                return translated2;
            }
        }
    } catch (e) {
        console.warn('Translation API fallback error:', e);
    }

    // Cache fallback text to avoid repeated failing requests
    TRANSLATION_CACHE[cacheKey] = text;
    localStorage.setItem('auto_translation_cache', JSON.stringify(TRANSLATION_CACHE));
    return text;
}

// Pure synchronous getter: Reads from base item or translation cache
function getItemData(item) {
    if (!item) return {};
    
    const baseData = item.es ? { ...item.es } : { ...item };

    if (currentLang === 'es') {
        return baseData;
    }

    if (item.en && Object.keys(item.en).length > 0) {
        return item.en;
    }

    const autoData = { ...baseData };
    
    for (const key in baseData) {
        if (typeof baseData[key] === 'string' && baseData[key].trim()) {
            const str = baseData[key].trim();
            
            if (str.startsWith('<code>') && str.endsWith('</code>')) {
                continue;
            }

            const cacheKey = `es_en_${str}`;
            if (TRANSLATION_CACHE[cacheKey]) {
                autoData[key] = TRANSLATION_CACHE[cacheKey];
            }
        }
    }

    return autoData;
}

// Batch background translator with delay to prevent HTTP 429 Rate Limiting
let isTranslating = false;
async function translateAllData(toLang = 'en') {
    if (toLang === 'es' || isTranslating) return;
    isTranslating = true;

    const queue = [];
    const addToQueue = (str) => {
        if (!str || typeof str !== 'string' || !str.trim()) return;
        const cleanStr = str.trim();
        if (cleanStr.startsWith('<code>') && cleanStr.endsWith('</code>')) return;
        const cacheKey = `es_${toLang}_${cleanStr}`;
        if (!TRANSLATION_CACHE[cacheKey]) {
            queue.push(cleanStr);
        }
    };

    PROJECTS_DATA.forEach(p => {
        const d = p.es || p;
        addToQueue(d.title);
        addToQueue(d.category);
        addToQueue(d.summary);
    });

    SKILLS_DATA.forEach(g => {
        const d = g.es || g;
        addToQueue(d.category);
        (g.skills || []).forEach(s => addToQueue(s.level || s.level_es));
    });

    TIMELINE_DATA.forEach(t => {
        const d = t.es || t;
        addToQueue(d.role);
        addToQueue(d.company);
        addToQueue(d.desc);
    });

    Object.values(I18N).forEach(val => addToQueue(val));

    if (queue.length > 0) {
        for (const text of queue) {
            await translateText(text, 'es', toLang);
            await new Promise(r => setTimeout(r, 60)); // Small delay between requests to stay under rate limits
        }

        if (currentLang === toLang) {
            updateI18nDOM();
            renderFilters();
            renderProjects();
            renderSkills();
            renderTimeline();
        }
    }
    isTranslating = false;
}

function getI18nText(key) {
    const baseText = I18N[key];
    if (!baseText) return "";
    if (currentLang === 'es') return baseText;
    
    const cacheKey = `es_en_${baseText.trim()}`;
    return TRANSLATION_CACHE[cacheKey] || baseText;
}

function updateI18nDOM() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.innerHTML = getI18nText(key);
    });
}

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    const btnEs = document.getElementById('btn-lang-es');
    const btnEn = document.getElementById('btn-lang-en');

    if (lang === 'es') {
        btnEs.className = "px-3 py-1 text-xs font-bold rounded-full transition-colors bg-cyan-500/20 text-cyan-400";
        btnEn.className = "px-3 py-1 text-xs font-bold rounded-full transition-colors text-slate-400 hover:text-white";
        currentFilter = getI18nText('filter_all');
    } else {
        btnEn.className = "px-3 py-1 text-xs font-bold rounded-full transition-colors bg-cyan-500/20 text-cyan-400";
        btnEs.className = "px-3 py-1 text-xs font-bold rounded-full transition-colors text-slate-400 hover:text-white";
        currentFilter = getI18nText('filter_all');
    }

    const cvPath = lang === 'es' ? 'sources/MiCV.pdf' : 'sources/MyResume.pdf';
    document.querySelectorAll('[data-cv-link]').forEach(el => {
        el.setAttribute('href', cvPath);
    });

    updateI18nDOM();
    renderFilters();
    renderProjects();
    renderSkills();
    renderTimeline();

    if (lang === 'en') {
        translateAllData('en');
    }
}

=======
// Cache DOM elements
>>>>>>> Stashed changes
const projectsGrid = document.getElementById('projects-grid');
const filtersContainer = document.getElementById('projects-filters');
const skillsGrid = document.getElementById('skills-grid');
const timelineContainer = document.getElementById('timeline-container');

function setLanguage(lang) {
    currentLang = lang;

    // Toggle language buttons
    const btnEs = document.getElementById('btn-lang-es');
    const btnEn = document.getElementById('btn-lang-en');

    if (lang === 'es') {
        btnEs.classList.add('active');
        btnEn.classList.remove('active');
        currentFilter = I18N.es.filter_all;
    } else {
        btnEn.classList.add('active');
        btnEs.classList.remove('active');
        currentFilter = I18N.en.filter_all;
    }

    // Update translated static text
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (I18N[lang] && I18N[lang][key]) {
            el.innerHTML = I18N[lang][key];
        }
    });

    renderFilters();
    renderProjects();
    renderSkills();
    renderTimeline();
}

function renderFilters() {
    const allLabel = I18N[currentLang].filter_all;
    const categories = [allLabel, ...new Set(PROJECTS_DATA.map(p => p[currentLang].category))];

    if (!categories.includes(currentFilter)) {
        currentFilter = allLabel;
    }

<<<<<<< Updated upstream
    filtersContainer.innerHTML = categories.map(cat => `
        <button
            onclick="filterProjects('${cat}')"
            class="px-4 py-1.5 rounded-full text-sm font-mono transition-all ${currentFilter === cat
            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
            : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:bg-slate-800 hover:text-slate-300'
        }"
        >
            ${cat}
        </button>
    `).join('');
=======
    filtersContainer.innerHTML = categories.map(cat => {
        const isActive = currentFilter === cat;
        return `
            <button 
                type="button"
                onclick="filterProjects('${cat}')" 
                class="filter-btn ${isActive ? 'active' : ''}">
                ${cat}
            </button>
        `;
    }).join('');
>>>>>>> Stashed changes
}

window.filterProjects = (category) => {
    currentFilter = category;
    renderFilters();
    renderProjects();
};

function renderProjects() {
    const allLabel = I18N[currentLang].filter_all;
    const filtered = currentFilter === allLabel
        ? PROJECTS_DATA
        : PROJECTS_DATA.filter(p => p[currentLang].category === currentFilter);

    projectsGrid.innerHTML = filtered.map(project => {
<<<<<<< Updated upstream
        const data = getItemData(project);
        const hasGithub = project.githubUrl && project.githubUrl !== '#' && project.githubUrl !== '';
        const hasDemo = project.liveDemoUrl && project.liveDemoUrl !== '#' && project.liveDemoUrl !== '';

        return `
        <div class="glass-card rounded-xl p-6 flex flex-col h-full group animate-fade-in">
            <div class="flex justify-between items-start mb-4">
                <div class="px-2 py-1 bg-slate-800 rounded text-xs font-mono text-cyan-400 border border-slate-700">
                    ${data.category}
                </div>
                <div class="flex gap-2 text-slate-400">
                    ${hasGithub ? `<a href="${project.githubUrl}" class="hover:text-cyan-400 transition-colors" target="_blank" rel="noopener noreferrer" title="GitHub"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" class="w-5 h-5 invert opacity-80 hover:opacity-100 transition-opacity"></a>` : ''}
                    ${hasDemo ? `<a href="${project.liveDemoUrl}" class="hover:text-cyan-400 transition-colors" target="_blank" rel="noopener noreferrer" title="Demo"><i data-lucide="external-link" class="w-5 h-5"></i></a>` : ''}
                </div>
            </div>

            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                ${hasGithub ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="hover:underline flex items-center gap-2">${data.title}</a>` : data.title}
            </h3>

            <p class="text-slate-400 text-sm mb-6 flex-grow">${data.summary}</p>

            <div class="flex flex-wrap gap-2 mb-4">
                ${project.tags.map(tag => `<span class="text-xs font-mono text-slate-300 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">#${tag}</span>`).join('')}
            </div>

            <div class="flex items-center gap-3 pt-4 border-t border-slate-800/50 mt-auto">
                ${hasGithub ? `
                    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-mono font-medium transition-colors flex items-center gap-2 border border-slate-700">
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" class="w-4 h-4 invert"> ${getI18nText('btn_code')}
                    </a>
                ` : ''}
                ${hasDemo ? `
                    <a href="${project.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="px-3.5 py-1.5 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 rounded text-xs font-mono font-medium transition-colors flex items-center gap-2 border border-cyan-500/30">
                        <i data-lucide="external-link" class="w-4 h-4"></i> ${getI18nText('btn_demo')}
=======
        const data = project[currentLang];
        const hasGithub = project.githubUrl && project.githubUrl !== '#' && project.githubUrl !== '';
        const hasDemo = project.liveDemoUrl && project.liveDemoUrl !== '#' && project.liveDemoUrl !== '';
        const isFeatured = project.featured && (currentFilter === allLabel);

        return `
        <article class="project-card ${isFeatured ? 'featured' : ''}">
            <div class="card-header-row">
                <div class="arch-badge">
                    <span style="display:inline-block; width:5px; height:5px; border-radius:50%; background:var(--accent);"></span>
                    <span>${project.arch}</span>
                </div>
                <div class="card-actions-quick">
                    <span class="card-category">${data.category}</span>
                    ${hasGithub ? `
                        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="card-quick-link" title="GitHub">
                            <i data-lucide="github" style="width: 14px; height: 14px;"></i>
                        </a>
                    ` : ''}
                    ${hasDemo ? `
                        <a href="${project.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="card-quick-link" title="Demo">
                            <i data-lucide="external-link" style="width: 14px; height: 14px;"></i>
                        </a>
                    ` : ''}
                </div>
            </div>

            <h3 class="project-title">
                ${hasGithub ? `
                    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer">
                        <span>${data.title}</span>
                        <span class="arrow-diag">↗</span>
                    </a>
                ` : `
                    <span>${data.title}</span>
                `}
            </h3>

            <p class="project-summary">${data.summary}</p>

            <div class="tags-row">
                ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
            </div>

            <div class="card-footer">
                ${hasGithub ? `
                    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                        <i data-lucide="github" style="width: 13px; height: 13px;"></i>
                        <span>${I18N[currentLang].btn_code}</span>
                    </a>
                ` : ''}
                ${hasDemo ? `
                    <a href="${project.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-accent">
                        <i data-lucide="external-link" style="width: 13px; height: 13px;"></i>
                        <span>${I18N[currentLang].btn_demo}</span>
>>>>>>> Stashed changes
                    </a>
                ` : ''}
            </div>
        </article>
        `;
    }).join('');

    if (window.lucide) {
        lucide.createIcons();
    }
}

function renderSkills() {
    skillsGrid.innerHTML = SKILLS_DATA.map(group => {
        const data = group[currentLang];
        return `
<<<<<<< Updated upstream
        <div class="glass-card rounded-2xl p-6 flex flex-col relative overflow-hidden group">
            <div class="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors"></div>

            <div class="flex items-center gap-3 mb-6 relative z-10">
                <div class="p-2.5 bg-slate-800/80 rounded-xl text-cyan-400 border border-slate-700/50 shadow-inner">
                    <i data-lucide="${group.icon}" class="w-5 h-5"></i>
                </div>
                <h3 class="text-lg font-bold text-white tracking-wide">${data.category}</h3>
            </div>

            <div class="flex flex-col gap-3 relative z-10">
                ${group.skills.map(skill => {
            const rawLevel = skill.level || skill.level_es || '';
            let level = rawLevel;

            if (currentLang === 'en') {
                if (skill.level_en) {
                    level = skill.level_en;
                } else if (rawLevel) {
                    const cacheKey = `es_en_${rawLevel.trim()}`;
                    if (TRANSLATION_CACHE[cacheKey]) {
                        level = TRANSLATION_CACHE[cacheKey];
                    }
                }
            }

            const lowerLevel = level.toLowerCase();
            const isAdvanced = lowerLevel.includes('avanzad') || lowerLevel.includes('advanc');
            const isInter = lowerLevel.includes('intermed') || lowerLevel.includes('interm');

            const iconUrl = skillIcons[skill.name];
            const iconTag = iconUrl ? `<img src="${iconUrl}" class="w-5 h-5 ${skill.name === 'Git / GitHub' || skill.name === 'AWS' || skill.name === 'Go' ? 'invert opacity-90' : ''}" alt="${skill.name}">` : `<div class="w-5 h-5 rounded-full bg-slate-700"></div>`;

            let dots = '';
            let dotCount = isAdvanced ? 3 : (isInter ? 2 : 1);
            for (let i = 0; i < 3; i++) {
                dots += `<div class="w-1.5 h-1.5 rounded-full ${i < dotCount ? (isAdvanced ? 'bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.5)]' : 'bg-cyan-400 shadow-[0_0_5px_rgba(6,182,212,0.5)]') : 'bg-slate-700'}"></div>`;
            }

            return `
                    <div class="flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:border-cyan-500/30 hover:bg-slate-800/40 transition-all group/skill">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-lg bg-slate-950/50 flex items-center justify-center border border-slate-800 group-hover/skill:border-slate-700 transition-colors">
                                ${iconTag}
                            </div>
                            <span class="text-sm font-medium text-slate-300 group-hover/skill:text-white transition-colors">${skill.name}</span>
=======
        <div class="stack-category-block">
            <div class="stack-category-header">
                <span class="category-icon">
                    <i data-lucide="${group.icon}" style="width: 16px; height: 16px;"></i>
                </span>
                <span class="category-name">${data.category}</span>
            </div>
            <div class="skills-list">
                ${group.skills.map(skill => {
                    const levelLabel = currentLang === 'es' ? skill.level_es : skill.level_en;
                    return `
                        <div class="skill-row">
                            <span class="skill-name">${skill.name}</span>
                            <span class="skill-level-pill ${skill.class}">${levelLabel}</span>
>>>>>>> Stashed changes
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
        `;
    }).join('');

    if (window.lucide) {
        lucide.createIcons();
    }
}

function renderTimeline() {
    timelineContainer.innerHTML = TIMELINE_DATA.map(item => {
<<<<<<< Updated upstream
        const data = getItemData(item);
        const imgTag = item.img ? `<img src="${item.img}" alt="Logo" class="h-8 w-auto rounded-sm object-contain bg-slate-100/10 p-1">` : '';
        const linkText = currentLang === 'es' ? 'Ver certificado' : 'View certificate';
        const linkTag = item.link ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:underline text-sm inline-flex items-center gap-1 mt-2">${linkText} <i data-lucide="external-link" class="w-3 h-3"></i></a>` : '';
=======
        const data = item[currentLang];
        const periodText = currentLang === 'es' ? item.period : item.period_en;
        const imgTag = item.img ? `<img src="${item.img}" alt="Logo" class="timeline-org-logo">` : '';
        const linkTag = item.link ? `
            <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="timeline-link">
                <span>${I18N[currentLang].cert_link}</span>
                <i data-lucide="arrow-up-right" style="width: 12px; height: 12px;"></i>
            </a>
        ` : '';
>>>>>>> Stashed changes

        let progressMarkup = '';
        if (item.progress) {
            const percentage = Math.round((item.progress.approved / item.progress.total) * 100);
<<<<<<< Updated upstream
            const degreeProgressLabel = currentLang === 'es' ? 'Progreso de la carrera' : 'Degree progress';
            const approvedLabel = currentLang === 'es' ? 'Materias aprobadas' : 'Approved subjects';
            const inProgressLabel = currentLang === 'es' ? 'Cursando actualmente' : 'Currently taking';

            progressTag = `
            <div class="my-3 p-3.5 bg-slate-900/80 border border-slate-800/80 rounded-xl max-w-xl shadow-inner">
                <div class="flex justify-between items-center text-xs font-mono mb-2">
                    <span class="text-slate-300 flex items-center gap-2">
                        <span class="relative flex h-2 w-2">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        <span class="font-medium text-slate-200">${degreeProgressLabel}</span>
                    </span>
                    <span class="text-cyan-400 font-bold bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">${percentage}%</span>
                </div>
                <div class="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2.5">
                    <div class="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full transition-all duration-700" style="width: ${percentage}%"></div>
                </div>
                <div class="flex flex-wrap items-center justify-between gap-2 text-xs font-mono pt-1 border-t border-slate-800/50">
                    <span class="text-slate-400">${approvedLabel}: <strong class="text-emerald-400 font-semibold">${item.progress.approved}/${item.progress.total}</strong></span>
                    <span class="text-slate-400">${inProgressLabel}: <strong class="text-amber-400 font-semibold">${item.progress.inProgress}</strong></span>
=======
            progressMarkup = `
            <div class="progress-card">
                <div class="progress-header">
                    <span class="progress-label">
                        <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:var(--accent);"></span>
                        <span>${I18N[currentLang].degree_progress}</span>
                    </span>
                    <span class="progress-pct">${percentage}%</span>
                </div>
                <div class="progress-track">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <div class="progress-metrics">
                    <span>${I18N[currentLang].approved_subjects}: <strong class="metric-highlight">${item.progress.approved}/${item.progress.total}</strong></span>
                    <span>${I18N[currentLang].in_progress_subjects}: <strong class="metric-highlight">${item.progress.inProgress}</strong></span>
>>>>>>> Stashed changes
                </div>
            </div>
            `;
        }

        return `
<<<<<<< Updated upstream
        <div class="relative pl-8 md:pl-12">
            <div class="absolute -left-1.5 top-1.5 w-3 h-3 ${item.active ? 'bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.8)]' : 'bg-slate-700 border-2 border-slate-900 rounded-full'}"></div>
            <div class="text-sm font-mono text-cyan-400 mb-1">${item.period}</div>
            <div class="flex items-center gap-3 mb-2">
                <h3 class="text-xl font-bold text-white">${data.role}</h3>
                ${imgTag}
            </div>
            <div class="text-slate-400 mb-3 font-semibold">${data.company}</div>
            ${progressTag}
            <p class="text-slate-300 text-sm leading-relaxed whitespace-pre-line">${data.desc}</p>
=======
        <div class="timeline-item">
            <span class="timeline-marker ${item.active ? 'active' : ''}"></span>
            <div class="timeline-period">${periodText}</div>
            <div class="timeline-header-row">
                <h3 class="timeline-role">${data.role}</h3>
                ${imgTag}
            </div>
            ${data.company ? `<div class="timeline-company">${data.company}</div>` : ''}
            ${progressMarkup}
            <p class="timeline-desc">${data.desc}</p>
>>>>>>> Stashed changes
            ${linkTag}
        </div>
        `;
    }).join('');

    if (window.lucide) {
        lucide.createIcons();
    }
}

window.copyEmail = () => {
    const emailEl = document.getElementById('email-text');
    const email = emailEl.innerText;
    
    navigator.clipboard.writeText(email).then(() => {
        const btn = document.getElementById('btn-copy');
        const icon = document.getElementById('copy-status-icon');
        
        btn.style.borderColor = 'var(--accent)';
        icon.setAttribute('data-lucide', 'check');
        icon.style.color = 'var(--accent)';
        if (window.lucide) lucide.createIcons();

        setTimeout(() => {
            btn.style.borderColor = '';
            icon.setAttribute('data-lucide', 'copy');
            icon.style.color = '';
            if (window.lucide) lucide.createIcons();
        }, 2200);
    });
};

// Initialization on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    currentFilter = I18N[currentLang].filter_all;
    setLanguage('es');

    console.log(
        "%c JUAN CRUZ DOMINGUEZ PISTOIA // BACKEND & SYSTEMS %c\n https://github.com/Cruplusplus",
        "background: #16181D; color: #10B981; font-family: monospace; font-size: 11px; padding: 4px 8px; border: 1px solid #262930;",
        "color: #8A8F98; font-family: monospace; font-size: 10px; padding: 4px;"
    );
});
