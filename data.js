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
        liveDemoUrl: ""
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
            { name: "C# & .NET", level_es: "Avanzado", level_en: "Advanced" },
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
        period: "Ago2026 - ~Nov2026 (Cursando)",
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

