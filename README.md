# <port/f>

Un portafolio web de página única (SPA) diseñado con estética técnica de ingeniería de software y terminal Linux, construido completamente con **Vanilla HTML5, CSS3 moderno y JavaScript (ES6+)**.

---

## Características Principales

- **Estética Técnica & Ventana Linux:** Marco interactivo en el Hero inspirado en una terminal Linux con controles de ventana, prompt `whoami` y barra de estado del sistema.
- **Soporte Multilingüe (i18n):** Selector dinámico Español/Inglés sin recargar la página, con auto-traducción en segundo plano y persistencia en `localStorage`.
- **CV Dinámico:** Enlace de descarga que conmuta automáticamente entre `MiCV.pdf` (ES) y `MyResume.pdf` (EN).
- **Proyectos en Cuadrícula 2x2:** Galería interactiva equilibrada con filtros por categoría (Backend, Bases de Datos, Desarrollo Web) y acceso directo al repositorio por botón.
- **Stack & Habilidades (Swiss Matrix):** Matriz visual estructurada con logotipos oficiales (Devicon) y niveles de dominio legibles.
- **Trayectoria & Progreso Universitario:** Línea de tiempo con cálculo interactivo de materias aprobadas y en curso en la Universidad Tecnológica Nacional (UTN - FRGP).
- **Copiado Rápido de Email:** Botón con retroalimentación instantánea ("¡Copiado!") y temporizador de restablecimiento.
- **Arquitectura Limpia & Modular:** 
  - `data.js`: Fuente única de verdad para proyectos, habilidades, cronología y traducciones.
  - `styles.css`: Sistema de diseño con variables CSS, microinteracciones ágiles (`cubic-bezier(0.16, 1, 0.3, 1)`) y diseño 100% responsivo para móviles, tablets y desktop.
  - `script.js`: Renderizado dinámico, eventos e internacionalización sin frameworks pesados.

---

## Tecnologías Utilizadas

- **HTML5** (Semántica accesible y SEO)
- **CSS3 Moderno** (Variables CSS, CSS Grid, Flexbox, microinteracciones elásticas y estados táctiles `:active`)
- **JavaScript Vanilla (ES6+)** (Lógica de renderizado dinámico, i18n y eventos)
- **Lucide Icons & Devicon** (Iconografía técnica y logos oficiales de tecnologías)
- **Google Fonts** ('Plus Jakarta Sans' para lectura y 'JetBrains Mono' para datos técnicos)

---

## Estructura del Proyecto

```text
Open-Source-Portfolio/
├── index.html        # Estructura semántica de la SPA y metadatos SEO
├── styles.css        # Sistema de diseño vanilla (paleta carbón, ventana Linux, grid 2x2)
├── script.js        # Lógica de renderizado, i18n y microinteracciones
├── data.js          # Datos estáticos (Proyectos, Habilidades, Trayectoria, i18n)
└── sources/         # Recursos estáticos locales
    ├── Portrait.png  # Fotografía de perfil para la ventana Linux
    ├── MiCV.pdf      # Currículum en español
    └── MyResume.pdf  # Currículum en inglés
```

---

## Instalación y Uso Local

No requiere ningún entorno de ejecución complejo (Node.js, npm, bundlers ni compilación previa):

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Cruplusplus/Open-Source-Portfolio.git
   ```
2. Abre `index.html` directamente en tu navegador preferido o usa una extensión como *Live Server*.
3. Versión en producción en GitHub Pages: [https://cruplusplus.github.io/Open-Source-Portfolio/](https://cruplusplus.github.io/Open-Source-Portfolio/)

---

## Autor

Desarrollado por **Juan Cruz Dominguez Pistoia**  
- **GitHub:** [@Cruplusplus](https://github.com/Cruplusplus)  
- **LinkedIn:** [Juan Cruz Dominguez Pistoia](https://www.linkedin.com/in/juan-cruz-dominguez-pistoia-1830b4384)

---

## Licencia

Este proyecto es Open Source y está disponible bajo la licencia [MIT](LICENSE). ¡Cualquiera es libre de usarlo como plantilla para su propio portafolio!
