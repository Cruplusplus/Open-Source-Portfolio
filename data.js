/*!
  ========================================================
  * Portfolio Web Template
  * Diseñado y desarrollado por: Juan Cruz Dominguez Pistoia
  * GitHub: https://github.com/Cruplusplus/Open-Source-Portfolio
  * Proyecto Open Source
  ========================================================
*/

const I18N = {
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
    btn_demo: "Ver Demo",
    section_contact: "Contacto",
    contact_title: "¿Tienes algún proyecto o propuesta laboral?",
    contact_subtitle: "Estoy abierto a nuevas oportunidades, proyectos backend y colaboraciones open source. ¡Hablemos!",
    btn_copy_email: "Copiar Email",
    contact_view_profile: "Ver perfil",
    contact_view_repo: "Ver repositorios",
    copied_email: "¡Copiado!"
};

const PROJECTS_DATA = [
    {
        id: 1,
        title: "Videojuego Roguelike en 2D",
        category: "Backend",
        summary: "Simulador de mapa extensible y lógica RPG desarrollado en C++ utilizando la librería SFML. Este proyecto fue creado como trabajo integrador para la materia Programación II (UTN), enfocado en la aplicación de conceptos avanzados de programación orientada a objetos y gestión de recursos.",
        tags: ["C++", "SFML", "GitHub", "JSON"],
        githubUrl: "https://github.com/Cruplusplus/TP-Programacion-2.-Extendible-map-RPG-in-C-",
        liveDemoUrl: ""
    },
    {
        id: 2,
        title: "Sistema de Gestión de Gimnasio y Club",
        category: "Bases de Datos",
        summary: "Diseño e implementación de una base de datos relacional para un Sistema de Gestión de Gimnasio y Club Deportivo. El sistema está desarrollado bajo el motor SQL Server sobre contenedores Docker.",
        tags: ["SQL Server", "Docker", "GitHub"],
        githubUrl: "https://github.com/Cruplusplus/UTNFRGP-TUP-BD2-TPI-G17",
        liveDemoUrl: ""
    },
    {
        id: 3,
        title: "<code>&lt;port/f&gt;</code>",
        category: "Desarrollo Web",
        summary: "Es esta página que estás viendo :). Creación de un portafolio para poner en práctica lo aprendido en cursos de HTML/CSS y JavaScript.",
        tags: ["HTML/CSS", "JavaScript", "GitHub"],
        githubUrl: "https://github.com/Cruplusplus/Open-Source-Portfolio",
        liveDemoUrl: ""
    }
];

const SKILLS_DATA = [
    {
        icon: "terminal",
        category: "Lenguajes de Programación",
        skills: [
            { name: "C# & .NET", level: "Avanzado" },
            { name: "C++", level: "Avanzado" },
            { name: "Python", level: "Intermedio" },
            { name: "Go", level: "Principiante" },
            { name: "HTML/CSS", level: "Intermedio" },
            { name: "JavaScript", level: "Principiante" }
        ]
    },
    {
        icon: "database",
        category: "Bases de Datos & Cloud",
        skills: [
            { name: "SQL Server", level: "Avanzado" },
            { name: "MongoDB", level: "Intermedio" },
            { name: "Docker", level: "Principiante" },
            { name: "AWS", level: "Principiante" }
        ]
    },
    {
        icon: "layers",
        category: "Arquitectura & Herramientas",
        skills: [
            { name: "Git / GitHub", level: "Avanzado" },
            { name: "Linux", level: "Principiante" }
        ]
    }
];

const TIMELINE_DATA = [
    {
        period: "2025 - ~2027 (Cursando)",
        role: "Técnico Universitario en Programación",
        company: "Universidad Tecnológica Nacional - Facultad Regional General Pacheco",
        desc: `Formación en programación con lógica, POO y lenguajes como C++ y C#.
Diseño e implementación de aplicaciones web y móviles (.NET).
Modelado y gestión de bases de datos relacionales y NoSQL con SQL Server y MongoDB.
Conocimientos de sistemas operativos, redes, arquitectura de computadoras y metodologías ágiles.
Integración de conocimientos en proyectos reales mediante laboratorios y práctica supervisada.`,
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
        role: "Curso Python",
        company: "",
        desc: `Incluye el manejo práctico de módulos, paquetes y archivos TXT/CSV para el procesamiento de datos.
Introduce herramientas avanzadas como excepciones y expresiones regulares.
El aprendizaje se consolida mediante ejercicios prácticos, enfocado en la resolución de problemas reales y el desarrollo de software profesional.`,
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        link: "https://www.youtube.com/watch?v=nKPbfIU442g",
        active: true
    },
    {
        period: "2024 (Certificado)",
        role: "First Certificate Exam",
        company: "Cambridge University Press & Assessment",
        desc: `Nivel B2 del marco europeo (CEFR), permite comprender ideas principales de textos complejos, interactuar con fluidez en conversaciones cotidianas y profesionales, y producir textos claros y detallados sobre diversos temas.
Me pudo aportar autonomía en el estudio y lectura de documentación además de poder intercambiar ideas académicas con gente de otros países.`,
        img: "https://i.pinimg.com/736x/a5/44/53/a544531318d501c26443dc2378a8c150.jpg",
        link: "https://www.linkedin.com/in/juan-cruz-dominguez-pistoia-1830b4384/details/certifications/",
        active: false
    },
    {
        period: "2020 - 2021 (Finalizado)",
        role: "Curso HTML/CSS",
        company: "",
        desc: `HTML y CSS, de estructura básica de etiquetas y el Box Model hasta conceptos avanzados como Flexbox, Grid, animaciones y diseño responsivo.
Creación práctica de proyectos web, enfatizando la semántica, la accesibilidad y el uso de herramientas modernas como Visual Studio Code para un flujo de trabajo profesional.
Optimización avanzada, el uso de variables, funciones matemáticas CSS y pasos esenciales para el hosting y despliegue exitoso de sitios web en internet.`,
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        link: "https://www.youtube.com/watch?v=ELSm-G201Ls",
        active: false
    },
    {
        period: "2019 - 2024 (Graduado)",
        role: "Bachiller en Economía y Administración",
        company: "Instituto Marcelo Torcuato de Alvear",
        desc: "Posee Título Secundario",
        img: "https://www.micole.net/imagenes/colegio/logo/300037471/marcelo-torcuato-de-alvear_128.png?v=MjAyNi0wOC0xMyAxODowMTo1Nw==",
        link: "",
        active: false
    }
];
