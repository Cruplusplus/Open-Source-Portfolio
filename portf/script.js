/*!
 * Portfolio Website Template
 * Designed & Developed by Juan Cruz Dominguez Pistoia
 * GitHub: https://github.com/Cruplusplus/Open-Source-Portfolio
 */

const I18N = {
    es: {
        nav_start: "Inicio",
        nav_projects: "Proyectos",
        nav_stack: "Stack",
        nav_path: "Trayectoria",
        nav_contact: "Contacto",
        btn_cv: "CV",
        status_badge: "Status: Abierto a oportunidades",
        hero_title: "Juan Cruz Dominguez <br><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500\">Desarrollador Junior</span>",
        hero_desc: "Estudiante de la Tecnicatura Universitaria en Programación (UTN - FRGP). Actualmente orientado al desarrollo backend. Creando proyectos con código estructurado y legible, abierto para poder generar experiencias.",
        btn_explore: "Explorar Proyectos",
        section_projects: "Proyectos Destacados",
        section_stack: "Stack & Habilidades",
        section_path: "Trayectoria",
        footer_text: "Proyecto de portafolio para uso personal open source",
        filter_all: "Todos",
        btn_code: "Ver Repositorio",
        btn_demo: "Ver Demo"
    },
    en: {
        nav_start: "Home",
        nav_projects: "Projects",
        nav_stack: "Stack",
        nav_path: "Experience",
        nav_contact: "Contact",
        btn_cv: "Resume",
        status_badge: "Status: Open to opportunities",
        hero_title: "Juan Cruz Dominguez <br><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500\">Junior Developer</span>",
        hero_desc: "Student of the University Degree in Programming (UTN - FRGP). Currently focused on backend development. Building projects with structured and readable code, open to gaining new experiences.",
        btn_explore: "Explore Projects",
        section_projects: "Featured Projects",
        section_stack: "Stack & Skills",
        section_path: "Experience",
        footer_text: "Creating scalable and efficient software.",
        filter_all: "All",
        btn_code: "View Repo",
        btn_demo: "Live Demo"
    }
};

const PROJECTS_DATA = [
    {
        id: 1,
        es:
        {
            title: "Videojuego Roguelike en 2D",
            category: "Backend",
            summary: `Simulador de mapa extensible y lógica RPG desarrollado en C++ utilizando la librería SFML. Este proyecto fue creado como trabajo integrador para la materia Programación II (UTN), enfocado en la aplicación de conceptos avanzados de programación orientada a objetos y gestión de recursos.
                    `
        },
        en: {
            title: "2D Roguelike Video Game",
            category: "Backend",
            summary: "Extensible map simulator and RPG logic developed in C++ using the SFML library. This project was created as a course project for Programming II (UTN), focused on applying advanced object-oriented programming and resource management concepts."
        },
        tags: ["C++", "SFML", "GitHub", "JSON"],
        githubUrl: "https://github.com/Cruplusplus/TP-Programacion-2.-Extendible-map-RPG-in-C-",
        liveDemoUrl: "#"
    },
    {
        id: 2,
        es:
        {
            title: "Sistema de Gestión de Gimnasio y Club",
            category: "Bases de Datos",
            summary: "Diseño e implementación de una base de datos relacional para un Sistema de Gestión de Gimnasio y Club Deportivo. El sistema está desarrollado bajo el motor SQL Server sobre contenedores Docker."
        },
        en: {
            title: "Gym & Club Management System",
            category: "Databases",
            summary: "Design and implementation of a relational database for a Gym and Sports Club Management System. The system is developed using the SQL Server engine on Docker containers."
        },
        tags: ["SQL Server", "Docker", "GitHub"],
        githubUrl: "https://github.com/Cruplusplus/UTNFRGP-TUP-BD2-TPI-G17",
        liveDemoUrl: ""
    },
    {
        id: 3,
        es:
        {
            title: "Portafolio",
            category: "Desarrollo Web",
            summary: "Creación de un portafolio para poner en práctica lo aprendido en cursos de HTML/CSS y JavaScript"
        },
        en: {
            title: "Portfolio",
            category: "Web Development",
            summary: "Creation of a portfolio to put into practice the knowledge acquired in HTML/CSS and JavaScript courses."
        },
        tags: ["HTML/CSS", "JavaScript", "GitHub"],
        githubUrl: "https://github.com/Cruplusplus/Open-Source-Portfolio",
        liveDemoUrl: ""
    }
];

const SKILLS_DATA = [
    {
        icon: "terminal",
        es: { category: "Lenguajes de Programación" },
        en: { category: "Programming Languages" },
        skills: [
            { name: "C# / .NET", level_es: "Avanzado", level_en: "Advanced" },
            { name: "C++", level_es: "Avanzado", level_en: "Advanced" },
            { name: "Python", level_es: "Intermedio", level_en: "Intermediate" },
            { name: "Go", level_es: "Principiante", level_en: "Beginner" },
            { name: "HTML/CSS", level_es: "Intermedio", level_en: "Intermediate" },
            { name: "JavaScript", level_es: "Principiante", level_en: "Beginner" },

        ]
    },
    {
        icon: "database",
        es: { category: "Bases de Datos & Cloud" },
        en: { category: "Databases & Cloud" },
        skills: [
            { name: "SQL Server", level_es: "Avanzado", level_en: "Advanced" },
            { name: "MongoDB", level_es: "Intermedio", level_en: "Intermediate" },
            { name: "Docker", level_es: "Principiante", level_en: "Beginner" },
            { name: "AWS", level_es: "Principiante", level_en: "Beginner" }
        ]
    },
    {
        icon: "layers",
        es: { category: "Arquitectura & Herramientas" },
        en: { category: "Architecture & Tools" },
        skills: [
            { name: "Git / GitHub", level_es: "Avanzado", level_en: "Advanced" },
            { name: "Linux", level_es: "Principiante", level_en: "Beginner" }
        ]
    }
];

const TIMELINE_DATA = [
    {
        period: "2025 - ~2027 (Cursando)",
        es: {
            role: "Técnico Universitario en Programación",
            company: "Universidad Tecnológica Nacional - Facultad Regional General Pacheco",
            desc: `Formación en programación con lógica, POO y lenguajes como C++ y C#.
                   Diseño e implementación de aplicaciones web y móviles (.NET).
                   Modelado y gestión de bases de datos relacionales y NoSQL con SQL Server y MongoDB.
                   Conocimientos de sistemas operativos, redes, arquitectura de computadoras y metodologías ágiles.
                   Integración de conocimientos en proyectos reales mediante laboratorios y práctica supervisada.
                  `
        },
        en: {
            role: "University Degree in Programming",
            company: "Universidad Tecnológica Nacional - General Pacheco Regional University",
            desc: `Programming training covering logic, OOP, and languages such as C++ and C#.
                   Design and implementation of web and mobile applications (.NET).
                   Modeling and management of relational and NoSQL databases with SQL Server and MongoDB.
                   Knowledge of operating systems, networking, computer architecture, and agile methodologies.
                   Integration of knowledge in real-world projects through laboratories and supervised practice.
                  `
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
        period: "2026 - ~Dic2026 (Cursando)",
        es: {
            role: "Curso Python",
            company: "",
            desc: `Incluye el manejo práctico de módulos, paquetes y archivos TXT/CSV para el procesamiento de datos.
                   Introduce herramientas avanzadas como excepciones y expresiones regulares.
                   El aprendizaje se consolida mediante ejercicios prácticos, enfocado en la resolución de problemas reales y el desarrollo de software profesional.
                  `
        },
        en: {
            role: "Python Course",
            company: "",
            desc: `Includes practical handling of modules, packages, and TXT/CSV files for data processing.
                   Introduces advanced tools like exceptions and regular expressions.
                   Learning is consolidated through practical exercises, focusing on solving real-world problems and professional software development.
                  `
        },
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        link: "https://www.youtube.com/watch?v=nKPbfIU442g",
        active: true
    },
    {
        period: "2024 (Certificado)",
        es: {
            role: "First Certificate Exam",
            company: "Cambridge University Press & Assessment",
            desc: `Nivel B2 del marco europeo (CEFR), permite comprender ideas principales de textos complejos, interactuar con fluidez en conversaciones cotidianas y profesionales, y producir textos claros y detallados sobre diversos temas.
                    Me pudo aportar autonomía en el estudio y lectura de documentación además de poder intercambiar ideas academicas con gente de otros países.
                    `
        },
        en: {
            role: "First Certificate Exam",
            company: "Cambridge University Press & Assessment",
            desc: `B2 level of the Common European Framework of Reference for Languages (CEFR), enabling understanding of the main ideas of complex texts, fluent interaction in everyday and professional conversations, and production of clear, detailed text on a variety of subjects.
                   It provided me with autonomy in studying and reading documentation, as well as the ability to exchange academic ideas with people from other countries.
                  `
        },
        img: "https://i.pinimg.com/736x/a5/44/53/a544531318d501c26443dc2378a8c150.jpg",
        link: "https://www.linkedin.com/in/juan-cruz-dominguez-pistoia-1830b4384/details/certifications/",
        active: false
    },
    {
        period: "2020 - 2021 (Finalizado)",
        es: {
            role: "Curso HTML/CSS",
            company: "",
            desc: `HTML y CSS, de estructura básica de etiquetas y el Box Model hasta conceptos avanzados como Flexbox, Grid, animaciones y diseño responsivo.
                   Creación práctica de proyectos web, enfatizando la semántica, la accesibilidad y el uso de herramientas modernas como Visual Studio Code para un flujo de trabajo profesional.
                   Optimización avanzada, el uso de variables, funciones matemáticas CSS y pasos esenciales para el hosting y despliegue exitoso de sitios web en internet.`
        },
        en: {
            role: "HTML/CSS Course",
            company: "",
            desc: `HTML and CSS, from basic tag structure and the Box Model to advanced concepts like Flexbox, Grid, animations, and responsive design.
                   Practical creation of web projects, emphasizing semantics, accessibility, and the use of modern tools like Visual Studio Code for a professional workflow.
                   Advanced optimization, the use of variables, CSS mathematical functions, and essential steps for successful hosting and deployment of websites on the internet.`
        },
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        link: "https://www.youtube.com/watch?v=ELSm-G201Ls",
        active: false
    },
    {
        period: "2019 - 2024 (Graduado)",
        es: {
            role: "Bachiller en Economía y Administración",
            company: "Instituto Marcelo Torcuato de Alvear",
            desc: "Posee Título Secundario"
        },
        en: {
            role: "Bachelor's degree in Economics and Administration",
            company: "Instituto Marcelo Torcuato de Alvear",
            desc: "High School Degree"
        },
        img: "https://www.micole.net/imagenes/colegio/logo/300037471/marcelo-torcuato-de-alvear_128.png?v=MjAyNi0wOC0xMyAxODowMTo1Nw==",
        link: "",
        active: false
    }
];

let currentLang = 'es';
let currentFilter = 'All';

function setLanguage(lang) {
    currentLang = lang;

    // Update UI buttons
    const btnEs = document.getElementById('btn-lang-es');
    const btnEn = document.getElementById('btn-lang-en');

    if (lang === 'es') {
        btnEs.className = "px-3 py-1 text-xs font-bold rounded-full transition-colors bg-cyan-500/20 text-cyan-400";
        btnEn.className = "px-3 py-1 text-xs font-bold rounded-full transition-colors text-slate-400 hover:text-white";
        currentFilter = I18N['es'].filter_all;
    } else {
        btnEn.className = "px-3 py-1 text-xs font-bold rounded-full transition-colors bg-cyan-500/20 text-cyan-400";
        btnEs.className = "px-3 py-1 text-xs font-bold rounded-full transition-colors text-slate-400 hover:text-white";
        currentFilter = I18N['en'].filter_all;
    }

    // Update static translations
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (I18N[lang][key]) {
            el.innerHTML = I18N[lang][key];
        }
    });

    renderFilters();
    renderProjects();
    renderSkills();
    renderTimeline();
}

const projectsGrid = document.getElementById('projects-grid');
const filtersContainer = document.getElementById('projects-filters');
const skillsGrid = document.getElementById('skills-grid');
const timelineContainer = document.getElementById('timeline-container');

function renderFilters() {
    const allLabel = I18N[currentLang].filter_all;
    const categories = [allLabel, ...new Set(PROJECTS_DATA.map(p => p[currentLang].category))];

    // If current filter is not in the new language's categories, reset to All
    if (!categories.includes(currentFilter)) {
        currentFilter = allLabel;
    }

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
        const data = project[currentLang];
        const hasGithub = project.githubUrl && project.githubUrl !== '#' && project.githubUrl !== '';
        const hasDemo = project.liveDemoUrl && project.liveDemoUrl !== '#' && project.liveDemoUrl !== '';

        return `
        <div class="glass-card rounded-xl p-6 flex flex-col h-full group animate-fade-in">
            <div class="flex justify-between items-start mb-4">
                <div class="px-2 py-1 bg-slate-800 rounded text-xs font-mono text-cyan-400 border border-slate-700">
                    ${data.category}
                </div>
                <div class="flex gap-2 text-slate-400">
                    ${hasGithub ? `<a href="${project.githubUrl}" class="hover:text-cyan-400 transition-colors" target="_blank" title="GitHub"><i data-lucide="github" class="w-5 h-5"></i></a>` : ''}
                    ${hasDemo ? `<a href="${project.liveDemoUrl}" class="hover:text-cyan-400 transition-colors" target="_blank" title="Demo"><i data-lucide="external-link" class="w-5 h-5"></i></a>` : ''}
                </div>
            </div>
            
            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                ${hasGithub ? `<a href="${project.githubUrl}" target="_blank" class="hover:underline flex items-center gap-2">${data.title}</a>` : data.title}
            </h3>
            
            <p class="text-slate-400 text-sm mb-6 flex-grow">${data.summary}</p>
            
            <div class="flex flex-wrap gap-2 mb-4">
                ${project.tags.map(tag => `<span class="text-xs font-mono text-slate-300 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800">#${tag}</span>`).join('')}
            </div>

            <div class="flex items-center gap-3 pt-4 border-t border-slate-800/50 mt-auto">
                ${hasGithub ? `
                    <a href="${project.githubUrl}" target="_blank" class="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-mono font-medium transition-colors flex items-center gap-2 border border-slate-700">
                        <i data-lucide="github" class="w-4 h-4 text-cyan-400"></i> ${I18N[currentLang].btn_code}
                    </a>
                ` : ''}
                ${hasDemo ? `
                    <a href="${project.liveDemoUrl}" target="_blank" class="px-3.5 py-1.5 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 rounded text-xs font-mono font-medium transition-colors flex items-center gap-2 border border-cyan-500/30">
                        <i data-lucide="external-link" class="w-4 h-4"></i> ${I18N[currentLang].btn_demo}
                    </a>
                ` : ''}
            </div>
        </div>
    `}).join('');

    if (window.lucide) lucide.createIcons();
}

function renderSkills() {
    const skillIcons = {
        "C# / .NET": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
        "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
        "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
        "Go": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg",
        "HTML/CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        "SQL Server": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg",
        "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
        "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
        "AWS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
        "Git / GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
        "Linux": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg"
    };

    skillsGrid.innerHTML = SKILLS_DATA.map(group => {
        const data = group[currentLang];
        return `
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
            const level = currentLang === 'es' ? skill.level_es : skill.level_en;
            const isAdvanced = level === 'Avanzado' || level === 'Advanced';
            const iconUrl = skillIcons[skill.name];
            const iconTag = iconUrl ? `<img src="${iconUrl}" class="w-5 h-5 ${skill.name === 'Git / GitHub' || skill.name === 'AWS' || skill.name === 'Go' ? 'invert opacity-90' : ''}" alt="${skill.name}">` : `<div class="w-5 h-5 rounded-full bg-slate-700"></div>`;

            let dots = '';
            let dotCount = isAdvanced ? 3 : (level === 'Intermedio' || level === 'Intermediate' ? 2 : 1);
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
                        </div>
                        <div class="flex flex-col items-end gap-1.5">
                            <span class="text-[10px] uppercase font-mono tracking-wider text-slate-500 group-hover/skill:text-slate-400 transition-colors">${level}</span>
                            <div class="flex gap-1">${dots}</div>
                        </div>
                    </div>
                `}).join('')}
            </div>
        </div>
    `}).join('');
}

function renderTimeline() {
    timelineContainer.innerHTML = TIMELINE_DATA.map(item => {
        const data = item[currentLang];
        const imgTag = item.img ? `<img src="${item.img}" alt="Logo" class="h-8 w-auto rounded-sm object-contain bg-slate-100/10 p-1">` : '';
        const linkText = currentLang === 'es' ? 'Ver certificado' : 'View certificate';
        const linkTag = item.link ? `<a href="${item.link}" target="_blank" class="text-cyan-400 hover:underline text-sm inline-flex items-center gap-1 mt-2">${linkText} <i data-lucide="external-link" class="w-3 h-3"></i></a>` : '';

        let progressTag = '';
        if (item.progress) {
            const percentage = Math.round((item.progress.approved / item.progress.total) * 100);
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
                </div>
            </div>
            `;
        }

        return `
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
            ${linkTag}
        </div>
    `}).join('');

    if (window.lucide) lucide.createIcons();
}

window.copyEmail = () => {
    const email = document.getElementById('email-text').innerText;
    navigator.clipboard.writeText(email).then(() => {
        const btn = document.getElementById('email-text').nextElementSibling;
        btn.setAttribute('data-lucide', 'check');
        btn.classList.add('text-emerald-400');
        if (window.lucide) lucide.createIcons();

        setTimeout(() => {
            btn.setAttribute('data-lucide', 'copy');
            btn.classList.remove('text-emerald-400');
            if (window.lucide) lucide.createIcons();
        }, 2000);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    currentFilter = I18N[currentLang].filter_all;
    setLanguage('es'); // Initializes everything

    console.log(
        "%cPortfolio Template creado por Juan Cruz Dominguez Pistoia %c\n GitHub: https://github.com/Cruplusplus",
        "background: #080c14; color: #06b6d4; font-size: 13px; font-weight: bold; padding: 6px 10px; border: 1px solid #06b6d4; border-radius: 4px;",
        "color: #94a3b8; font-size: 11px; padding: 4px;"
    );
});
