# <port/f>

Un portafolio web de página única (SPA) diseñado con una estética de developer futurista pero no tan cargada de cosas, construido completamente con **Vanilla HTML5, Tailwind CSS y JavaScript**.

---

## Características Principales

- **Estilo Visual Técnico & Moderno:** Efectos de *glassmorphism* (frosted glass), bordes brillantes en *hover*, paleta en tonos slate oscuros y acentos en cian eléctrico y violeta.
- **Soporte Multilingüe (i18n):** Selector dinámico Español/Inglés sin recargar la página, actualizando automáticamente el atributo `lang` del DOM para garantizar accesibilidad.
- **Stack & Habilidades (Estilo Bento Box):** Diseño visual tipo *bento grid* interactivo con logotipos oficiales (Devicons) e indicadores visuales de nivel (puntos de dominio).
- **Proyectos Filtrables:** Galería de proyectos interactiva con filtrado dinámico por categorías (Backend, Bases de Datos, Desarrollo Web, etc.) y enlaces directos a código/demo.
- **Trayectoria / Timeline:** Línea de tiempo interactiva con barra de progreso animada para la carrera universitaria y enlaces a certificados.
- **Buenas Prácticas & SEO:** 
  - Separación de responsabilidades: `data.js` (estado/datos) y `script.js` (lógica de UI).
  - Enlaces externos protegidos con `rel="noopener noreferrer"`.
  - Configuración completa de metadatos Open Graph, Twitter Cards y favicon SVG.

---

## Tecnologías Utilizadas

- **HTML5** (Estructura semántica y SEO)
- **Tailwind CSS** vía CDN (Diseño responsivo y utilidades de estilo)
- **JavaScript Vanilla (ES6+)** (Lógica de renderizado e i18n)
- **Lucide Icons & Devicons** (Iconografía técnica y logos oficiales)
- **Google Fonts** ('Inter' & 'JetBrains Mono' / 'Fira Code')

---

## Estructura del Proyecto

```text
Open-Source-Portfolio/
├── index.html        # Estructura principal de la SPA y Meta Tags de SEO
├── styles.css        # Estilos personalizados (scrollbar, animaciones, glassmorphism)
├── script.js        # Lógica de renderizado, eventos y cambio de idioma
├── data.js          # Datos estáticos (Proyectos, Habilidades, Trayectoria, Traducciones)
└── sources/         # Recursos locales (Fotografía de perfil, CV en PDF)
    ├── Portrait.png
    └── MyResume.pdf
```

---

## Instalación y Uso Local

No requiere ningún entorno de ejecución complejo (Node.js, npm, bundlers, etc.).

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Cruplusplus/Open-Source-Portfolio.git
   ```
2. Abre el archivo `index.html` directamente en tu navegador preferido.
3. Actualmente el mío está en linea en la web de GitHub Pages: https://cruplusplus.github.io/Open-Source-Portfolio/
---

## Autor

Desarrollado por **Juan Cruz Dominguez Pistoia**  
- **GitHub:** [@Cruplusplus](https://github.com/Cruplusplus)  
- **LinkedIn:** [Juan Cruz Dominguez Pistoia](https://www.linkedin.com/in/juan-cruz-dominguez-pistoia-1830b4384)

---

## Licencia

Este proyecto es Open Source y está disponible bajo la licencia [MIT](LICENSE). ¡Cualquiera es libre de usarlo como plantilla para tu propio portafolio!
