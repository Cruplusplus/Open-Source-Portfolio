/*!
  ========================================================
  * Portfolio Web Template
  * Diseñado y desarrollado por: Juan Cruz Dominguez Pistoia
  * GitHub: https://github.com/Cruplusplus/Open-Source-Portfolio
  * Proyecto Open Source
  ========================================================
*/

let currentLang = 'es';
let currentFilter = 'Todos';

// LocalStorage translation cache
const TRANSLATION_CACHE = JSON.parse(localStorage.getItem('auto_translation_cache') || '{}');

// Clean raw translations: strip XML/HTML tags (e.g. <g id="1"> from MyMemory) and decode entities
function cleanTranslatedText(raw) {
    if (!raw || typeof raw !== 'string') return raw;
    let text = raw.replace(/<[^>]+>/g, '');
    text = text
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
    return text.trim();
}

// Escape HTML attributes to avoid broken markup from quotes or special characters
function escapeAttr(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// Sanitize and purge corrupted strings from existing translation cache in localStorage
try {
    let dirty = false;
    for (const key in TRANSLATION_CACHE) {
        if (typeof TRANSLATION_CACHE[key] === 'string') {
            const cleaned = cleanTranslatedText(TRANSLATION_CACHE[key]);
            if (cleaned !== TRANSLATION_CACHE[key]) {
                TRANSLATION_CACHE[key] = cleaned;
                dirty = true;
            }
        }
    }
    if (dirty) {
        localStorage.setItem('auto_translation_cache', JSON.stringify(TRANSLATION_CACHE));
    }
} catch (e) {}

// Save translation cache with safety
function saveTranslationCache() {
    try {
        localStorage.setItem('auto_translation_cache', JSON.stringify(TRANSLATION_CACHE));
    } catch (e) {
        console.warn('Unable to persist translation cache to localStorage', e);
    }
}

// Static trusted translations for core academic and course items
const STATIC_TRANSLATIONS = {
    'Curso Python': 'Python Course',
    'Curso HTML/CSS': 'HTML/CSS Course',
    'Curso de Desarrollo con IA': 'AI Development Course',
    'Técnico Universitario en Programación': 'University Technician in Programming',
    'Bachiller en Economía y Administración': 'High School Diploma in Economics and Administration',
    'Posee Título Secundario': 'High School Degree'
};

// Translate single text string with fallbacks
async function translateText(text, fromLang = 'es', toLang = 'en') {
    if (!text || typeof text !== 'string' || !text.trim()) return text;
    const cleanText = text.trim();

    // Preserve code blocks as-is (e.g. <code><port/f></code>)
    if (cleanText.startsWith('<code>') && cleanText.endsWith('</code>')) {
        return cleanText;
    }

    if (STATIC_TRANSLATIONS[cleanText] && toLang === 'en') {
        return STATIC_TRANSLATIONS[cleanText];
    }

    const cacheKey = `${fromLang}_${toLang}_${cleanText}`;
    if (TRANSLATION_CACHE[cacheKey]) {
        return cleanTranslatedText(TRANSLATION_CACHE[cacheKey]);
    }

    // Attempt 1: Google Translate API
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(cleanText)}`;
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            const translated = data[0].map(item => item[0]).join('');
            if (translated && translated.trim()) {
                const cleaned = cleanTranslatedText(translated);
                TRANSLATION_CACHE[cacheKey] = cleaned;
                saveTranslationCache();
                return cleaned;
            }
        }
    } catch (e) {
        // Fallback to MyMemory API
    }

    // Attempt 2: MyMemory API
    try {
        const url2 = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanText)}&langpair=${fromLang}|${toLang}`;
        const res2 = await fetch(url2);
        if (res2.ok) {
            const data2 = await res2.json();
            const translated2 = data2.responseData?.translatedText;
            if (translated2 && translated2.trim()) {
                const cleaned2 = cleanTranslatedText(translated2);
                TRANSLATION_CACHE[cacheKey] = cleaned2;
                saveTranslationCache();
                return cleaned2;
            }
        }
    } catch (e) {
        console.warn('Translation fallback error:', e);
    }

    // Return original if failed and avoid repetitive failing network hits
    TRANSLATION_CACHE[cacheKey] = text;
    saveTranslationCache();
    return text;
}

// Synchronous data resolver for current language
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
    const translatableKeys = ['title', 'category', 'summary', 'role', 'company', 'desc', 'period'];

    for (const key of translatableKeys) {
        if (typeof baseData[key] === 'string' && baseData[key].trim()) {
            const str = baseData[key].trim();

            if (str.startsWith('<code>') && str.endsWith('</code>')) {
                continue;
            }

            if (STATIC_TRANSLATIONS[str]) {
                autoData[key] = STATIC_TRANSLATIONS[str];
                continue;
            }

            const cacheKey = `es_en_${str}`;
            if (TRANSLATION_CACHE[cacheKey]) {
                autoData[key] = cleanTranslatedText(TRANSLATION_CACHE[cacheKey]);
            }
        }
    }

    return autoData;
}

// Background batch translation
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

    if (typeof PROJECTS_DATA !== 'undefined') {
        PROJECTS_DATA.forEach(p => {
            const d = p.es || p;
            addToQueue(d.title);
            addToQueue(d.category);
            addToQueue(d.summary);
        });
    }

    if (typeof SKILLS_DATA !== 'undefined') {
        SKILLS_DATA.forEach(g => {
            const d = g.es || g;
            addToQueue(d.category);
            (g.skills || []).forEach(s => addToQueue(s.level || s.level_es));
        });
    }

    if (typeof TIMELINE_DATA !== 'undefined') {
        TIMELINE_DATA.forEach(t => {
            const d = t.es || t;
            addToQueue(d.role);
            addToQueue(d.company);
            addToQueue(d.desc);
        });
    }

    if (typeof I18N !== 'undefined') {
        Object.values(I18N).forEach(val => addToQueue(val));
    }

    if (queue.length > 0) {
        for (const text of queue) {
            await translateText(text, 'es', toLang);
            await new Promise(r => setTimeout(r, 50));
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
    if (typeof I18N === 'undefined') return '';
    const baseText = I18N[key];
    if (!baseText) return '';
    if (currentLang === 'es') return baseText;

    const cacheKey = `es_en_${baseText.trim()}`;
    return TRANSLATION_CACHE[cacheKey] || baseText;
}

function applyI18nText(el, key) {
    const translated = getI18nText(key);
    if (!translated) return;
    if (key === 'hero_desc') {
        el.innerHTML = `${translated}<span class="typewriter-cursor" aria-hidden="true"></span>`;
        syncCursorBlink();
    } else {
        el.innerHTML = translated;
    }
}

function updateI18nDOM(animate = false) {
    const elements = document.querySelectorAll('[data-i18n]');
    if (!animate) {
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if ((key === 'hero_role' || key === 'hero_desc') && !heroTypewriterDone) return;
            applyI18nText(el, key);
        });
        return;
    }

    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if ((key === 'hero_role' || key === 'hero_desc') && !heroTypewriterDone) return;
        el.classList.add('i18n-transitioning');
    });

    setTimeout(() => {
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if ((key === 'hero_role' || key === 'hero_desc') && !heroTypewriterDone) return;
            applyI18nText(el, key);
            el.classList.remove('i18n-transitioning');
        });
    }, 100);
}

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // Persist language preference across reloads
    try { localStorage.setItem('preferred_lang', lang); } catch (e) {}

    // Option 1: Fast-forward / complete typewriter immediately if user changes language while typing
    if (heroTypewriterStarted && !heroTypewriterDone) {
        clearTypewriterTimers();
        typewriterRunId++;
        heroTypewriterDone = true;
        const bioEl = document.querySelector('.hero-bio');
        if (bioEl) bioEl.style.minHeight = '';
    }

    const btnEs = document.getElementById('btn-lang-es');
    const btnEn = document.getElementById('btn-lang-en');

    if (btnEs && btnEn) {
        if (lang === 'es') {
            btnEs.classList.add('active');
            btnEn.classList.remove('active');
        } else {
            btnEn.classList.add('active');
            btnEs.classList.remove('active');
        }
    }

    // Dynamic CV download link: MiCV.pdf for Spanish, MyResume.pdf for English
    const cvPath = lang === 'es' ? 'sources/MiCV.pdf' : 'sources/MyResume.pdf';
    document.querySelectorAll('[data-cv-link]').forEach(el => {
        el.setAttribute('href', cvPath);
    });

    currentFilter = getI18nText('filter_all') || 'Todos';

    updateI18nDOM(true);
    renderFilters();
    renderProjects();
    renderSkills();
    renderTimeline();

    // Prioritize immediate hero translations if not cached yet
    if (lang !== 'es' && typeof I18N !== 'undefined') {
        Promise.all([
            translateText(I18N.hero_role, 'es', lang),
            translateText(I18N.hero_desc, 'es', lang)
        ]).then(([transRole, transBio]) => {
            if (currentLang !== lang) return;
            const roleEl = document.querySelector('.hero-role');
            const bioEl = document.querySelector('.hero-bio');
            if (roleEl && transRole) roleEl.innerHTML = transRole;
            if (bioEl && transBio) {
                bioEl.innerHTML = `${transBio}<span class="typewriter-cursor" aria-hidden="true"></span>`;
                syncCursorBlink();
            }
        });
    }

    if (lang === 'en') {
        translateAllData('en');
    }
}

// Containers
const projectsGrid = document.getElementById('projects-grid');
const filtersContainer = document.getElementById('projects-filters');
const skillsGrid = document.getElementById('skills-grid');
const timelineContainer = document.getElementById('timeline-container');

// Render Category Filters with precise styles.css integration
function renderFilters() {
    if (!filtersContainer || typeof PROJECTS_DATA === 'undefined') return;

    const allLabel = getI18nText('filter_all') || 'Todos';
    const categories = [allLabel, ...new Set(PROJECTS_DATA.map(p => getItemData(p).category).filter(Boolean))];

    if (!categories.includes(currentFilter)) {
        currentFilter = allLabel;
    }

    filtersContainer.innerHTML = categories.map(cat => {
        const isActive = currentFilter === cat;
        return `
            <button
                type="button"
                onclick="filterProjects('${cat.replace(/'/g, "\\'")}')"
                class="filter-btn ${isActive ? 'active' : ''}"
                aria-pressed="${isActive}"
            >
                ${cat}
            </button>
        `;
    }).join('');
}

window.filterProjects = (category) => {
    currentFilter = category;
    renderFilters();
    renderProjects();
};

// Render Projects 2x2 Grid (Only footer button enters the repo)
function renderProjects() {
    if (!projectsGrid || typeof PROJECTS_DATA === 'undefined') return;

    const allLabel = getI18nText('filter_all') || 'Todos';
    const filtered = currentFilter === allLabel
        ? PROJECTS_DATA
        : PROJECTS_DATA.filter(p => getItemData(p).category === currentFilter);

    projectsGrid.innerHTML = filtered.map((project, idx) => {
        const data = getItemData(project);
        const hasGithub = Boolean(project.githubUrl && project.githubUrl !== '#' && project.githubUrl.trim() !== '');
        const hasDemo = Boolean(project.liveDemoUrl && project.liveDemoUrl !== '#' && project.liveDemoUrl.trim() !== '');

        const codeBtnLabel = getI18nText('btn_code') || 'Ver Repositorio';
        const demoBtnLabel = getI18nText('btn_demo') || 'Ver Demo';

        return `
            <article class="project-card" style="--card-idx: ${idx};">
                <div class="card-header-row">
                    <div class="arch-badge">
                        <span>${data.category || 'Software'}</span>
                    </div>
                </div>

                <h3 class="project-title">${data.title}</h3>

                <p class="project-summary">${data.summary}</p>

                <div class="tags-row">
                    ${(project.tags || []).map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                </div>

                <div class="card-footer">
                    ${hasGithub ? `
                        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" class="btn-icon-img invert" style="width: 15px; height: 15px;">
                            <span>${codeBtnLabel}</span>
                        </a>
                    ` : ''}
                    ${hasDemo ? `
                        <a href="${project.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-accent">
                            <i data-lucide="external-link" style="width: 14px; height: 14px;"></i>
                            <span>${demoBtnLabel}</span>
                        </a>
                    ` : ''}
                </div>
            </article>
        `;
    }).join('');

    if (window.lucide) {
        lucide.createIcons();
    }
    initSpotlight();
}

// Render Skills Matrix with authentic devicons
function renderSkills() {
    if (!skillsGrid || typeof SKILLS_DATA === 'undefined') return;

    const skillIcons = {
        "C# & .NET": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
        "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
        "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
        "Go": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg",
        "HTML/CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
        "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        "SQL Server": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg",
        "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
        "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
        "AWS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
        "Git / GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
        "Linux": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg"
    };

    skillsGrid.innerHTML = SKILLS_DATA.map(group => {
        const data = getItemData(group);
        return `
            <div class="stack-category-block">
                <div class="stack-category-header">
                    <div class="category-icon">
                        <i data-lucide="${group.icon || 'code'}" style="width: 17px; height: 17px;"></i>
                    </div>
                    <span class="category-name">${data.category}</span>
                </div>

                <div class="skills-list">
                    ${(group.skills || []).map(skill => {
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

                        const lower = (level || '').toLowerCase();
                        let levelClass = 'level-beginner';
                        if (lower.includes('avanzad') || lower.includes('advanc')) {
                            levelClass = 'level-advanced';
                        } else if (lower.includes('intermed') || lower.includes('interm')) {
                            levelClass = 'level-intermediate';
                        }

                        const iconUrl = skillIcons[skill.name];
                        const shouldInvert = skill.name === 'Git / GitHub' || skill.name === 'AWS' || skill.name === 'Go';
                        const iconHtml = iconUrl
                            ? `<img src="${iconUrl}" alt="${skill.name}" class="skill-tech-icon ${shouldInvert ? 'invert-icon' : ''}">`
                            : `<span class="skill-dot-icon">●</span>`;

                        return `
                            <div class="skill-row">
                                <div class="skill-name-wrapper">
                                    ${iconHtml}
                                    <span class="skill-name">${skill.name}</span>
                                </div>
                                <span class="skill-level-pill ${levelClass}">${level}</span>
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
    initSpotlight();
}

// Render Timeline & Progress Bar
function renderTimeline() {
    if (!timelineContainer || typeof TIMELINE_DATA === 'undefined') return;

    timelineContainer.innerHTML = TIMELINE_DATA.map(item => {
        const data = getItemData(item);
        const safeAlt = escapeAttr(data.company || data.role);
        const imgTag = item.img
            ? `<img src="${item.img}" alt="${safeAlt}" class="timeline-org-logo">`
            : '';
        const linkText = currentLang === 'es' ? 'Ver credencial / curso' : 'View credential / course';
        const linkTag = item.link
            ? `
                <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="timeline-link">
                    <span>${linkText}</span>
                    <span class="arrow-diag">↗</span>
                </a>
            `
            : '';

        let progressCardHtml = '';
        if (item.progress) {
            const percentage = Math.round((item.progress.approved / item.progress.total) * 100);
            const degreeProgressLabel = currentLang === 'es' ? 'Progreso de carrera universitaria' : 'University degree progress';
            const approvedLabel = currentLang === 'es' ? 'Materias aprobadas' : 'Approved subjects';
            const inProgressLabel = currentLang === 'es' ? 'Cursando actualmente' : 'Currently taking';

            progressCardHtml = `
                <div class="progress-card">
                    <div class="progress-header">
                        <div class="progress-label">
                            <span class="status-dot"></span>
                            <span>${degreeProgressLabel}</span>
                        </div>
                        <span class="progress-pct">${percentage}%</span>
                    </div>
                    <div class="progress-track">
                        <div class="progress-fill" data-progress-width="${percentage}%" style="width: 0%;"></div>
                    </div>
                    <div class="progress-metrics">
                        <span>${approvedLabel}: <strong class="metric-highlight">${item.progress.approved} / ${item.progress.total}</strong></span>
                        <span>${inProgressLabel}: <strong class="metric-highlight" style="color: var(--accent);">${item.progress.inProgress}</strong></span>
                    </div>
                </div>
            `;
        }

        return `
            <div class="timeline-item">
                <div class="timeline-marker ${item.active ? 'active' : ''}"></div>
                <div class="timeline-period">${item.period}</div>
                <div class="timeline-header-row">
                    <h3 class="timeline-role">${data.role}</h3>
                    ${imgTag}
                </div>
                ${data.company ? `<div class="timeline-company">${data.company}</div>` : ''}
                ${progressCardHtml}
                <p class="timeline-desc">${data.desc}</p>
                ${linkTag}
            </div>
        `;
    }).join('');

    if (window.lucide) {
        lucide.createIcons();
    }
    observeProgressBars();
}

// Mobile drawer controls
window.toggleMobileMenu = () => {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) {
        drawer.classList.toggle('open');
    }
};

window.closeMobileMenu = () => {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) {
        drawer.classList.remove('open');
    }
};

// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.closeMobileMenu();
    }
});

// Copy email to clipboard with instant dual-button feedback
window.copyEmail = () => {
    const emailEl = document.getElementById('email-text');
    const email = emailEl ? emailEl.innerText.trim() : 'juancruzdominguezpistoia@gmail.com';
    const copiedText = getI18nText('copied_email') || '¡Copiado!';

    navigator.clipboard.writeText(email).then(() => {
        // Feedback on card button
        const btnCard = document.getElementById('btn-copy-email-card');
        let cardOriginalHTML = '';
        if (btnCard) {
            cardOriginalHTML = btnCard.innerHTML;
            btnCard.innerHTML = `<i data-lucide="check" style="width: 14px; height: 14px; color: var(--accent);"></i> <span style="color: var(--accent);">${copiedText}</span>`;
        }

        // Feedback on footer button
        const btnFooter = document.getElementById('btn-copy');
        let footerOriginalHTML = '';
        if (btnFooter) {
            footerOriginalHTML = btnFooter.innerHTML;
            btnFooter.innerHTML = `<i data-lucide="check" style="width: 14px; height: 14px; color: var(--accent);"></i> <span style="color: var(--accent);">${copiedText}</span>`;
        }

        if (window.lucide) lucide.createIcons();

        setTimeout(() => {
            if (btnCard && cardOriginalHTML) {
                btnCard.innerHTML = cardOriginalHTML;
            }
            if (btnFooter && footerOriginalHTML) {
                btnFooter.innerHTML = footerOriginalHTML;
            }
            if (window.lucide) lucide.createIcons();
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy email:', err);
    });
};

// Interactive spotlight border illumination (Linear / Vercel style)
function initSpotlight() {
    const cards = document.querySelectorAll('.project-card, .stack-category-block, .contact-cell');
    cards.forEach(card => {
        if (card.dataset.spotlightInit) return;
        card.dataset.spotlightInit = 'true';
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

// Progress bar animation on scroll with IntersectionObserver
function observeProgressBars() {
    const progressCards = document.querySelectorAll('.progress-card');
    if (!progressCards.length) return;

    if (!('IntersectionObserver' in window)) {
        progressCards.forEach(card => {
            const fill = card.querySelector('.progress-fill');
            if (fill && fill.dataset.progressWidth) {
                fill.style.width = fill.dataset.progressWidth;
            }
        });
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.progress-fill');
                if (fill && fill.dataset.progressWidth) {
                    setTimeout(() => {
                        fill.style.width = fill.dataset.progressWidth;
                    }, 140);
                }
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    progressCards.forEach(card => observer.observe(card));
}

// Terminal Typewriter Effect for Hero (Role & Bio)
let typewriterTimers = [];
let typewriterRunId = 0;
let heroTypewriterStarted = false;
let heroTypewriterDone = false;

function clearTypewriterTimers() {
    typewriterTimers.forEach(t => clearTimeout(t));
    typewriterTimers = [];
    document.querySelectorAll('.typewriter-cursor').forEach(c => c.remove());
}

function runTypewriter(targetEl, text, baseSpeed, onComplete, keepCursor = false) {
    if (!targetEl) return;
    targetEl.textContent = '';

    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    targetEl.appendChild(cursor);

    let idx = 0;
    function step() {
        if (idx < text.length) {
            const char = text.charAt(idx);
            cursor.before(char);
            idx++;

            let delay = baseSpeed;
            if (char === '.' || char === '!' || char === '?') {
                delay += 120;
            } else if (char === ',' || char === ';' || char === ':') {
                delay += 60;
            } else {
                // Subtle human typing rhythm jitter (±4ms)
                delay += Math.floor(Math.random() * 8) - 4;
            }

            const t = setTimeout(step, Math.max(14, delay));
            typewriterTimers.push(t);
        } else {
            if (!keepCursor) {
                cursor.remove();
            }
            if (onComplete) onComplete();
        }
    }
    step();
}

async function initHeroTypewriter() {
    if (heroTypewriterDone) return;
    heroTypewriterStarted = true;
    clearTypewriterTimers();
    const runId = ++typewriterRunId;

    const roleEl = document.querySelector('.hero-role');
    const bioEl = document.querySelector('.hero-bio');
    if (!roleEl || !bioEl) return;

    // Retrieve texts; if non-es, ensure translations are loaded before typing starts
    let roleText = (typeof I18N !== 'undefined' ? I18N.hero_role : '') || roleEl.textContent.trim() || 'Full-Stack - Part/Full Time';
    let bioText = (typeof I18N !== 'undefined' ? I18N.hero_desc : '') || bioEl.textContent.trim();

    if (currentLang !== 'es' && typeof I18N !== 'undefined') {
        const [transRole, transBio] = await Promise.all([
            translateText(I18N.hero_role, 'es', currentLang),
            translateText(I18N.hero_desc, 'es', currentLang)
        ]);

        // If language switched again while waiting for network translation, abort stale run
        if (runId !== typewriterRunId) return;

        roleText = transRole || roleText;
        bioText = transBio || bioText;
    }

    if (runId !== typewriterRunId) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        roleEl.textContent = roleText;
        bioEl.innerHTML = `${bioText}<span class="typewriter-cursor" aria-hidden="true"></span>`;
        heroTypewriterDone = true;
        syncCursorBlink();
        return;
    }

    // Set temporary minHeight on bio to avoid layout shift while typing
    const measuredHeight = bioEl.offsetHeight;
    if (measuredHeight > 0) {
        bioEl.style.minHeight = `${measuredHeight}px`;
    }

    bioEl.textContent = '';

    // Calibrated natural terminal typing cadence: ~48ms for role, ~22ms for bio
    runTypewriter(roleEl, roleText, 48, () => {
        if (runId !== typewriterRunId) return;
        const pauseTimer = setTimeout(() => {
            if (runId !== typewriterRunId) return;
            // keepCursor = true leaves the terminal blinking cursor at the end of bio
            runTypewriter(bioEl, bioText, 22, () => {
                bioEl.style.minHeight = '';
                heroTypewriterDone = true;
                // Sync all cursors to the same blink phase once bio cursor appears
                syncCursorBlink();
            }, true);
        }, 280);
        typewriterTimers.push(pauseTimer);
    }, false);
}

// Linux Window Terminal Animation ('whoami' command typing + portrait reveal)
let terminalAnimationTimer = null;

function initTerminalWindowAnimation() {
    const cmdEl = document.querySelector('.prompt-cmd');
    const portraitEl = document.querySelector('.linux-portrait');
    const frameEl = document.querySelector('.linux-image-frame');
    if (!cmdEl || !portraitEl || !frameEl) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        cmdEl.textContent = 'whoami';
        frameEl.classList.add('frame-visible');
        portraitEl.classList.remove('terminal-hidden');
        portraitEl.classList.add('terminal-loaded');
        return;
    }

    if (terminalAnimationTimer) {
        clearTimeout(terminalAnimationTimer);
        terminalAnimationTimer = null;
    }

    cmdEl.textContent = '';
    portraitEl.classList.add('terminal-hidden');
    portraitEl.classList.remove('terminal-loaded');

    const cmdText = 'whoami';
    let idx = 0;

    // Brief terminal ready delay before typing command
    terminalAnimationTimer = setTimeout(() => {
        function typeChar() {
            if (idx < cmdText.length) {
                cmdEl.textContent += cmdText.charAt(idx);
                idx++;
                const delay = 75 + Math.floor(Math.random() * 30);
                terminalAnimationTimer = setTimeout(typeChar, delay);
            } else {
                // Simulates pressing Enter, then portrait fades in
                terminalAnimationTimer = setTimeout(() => {
                    frameEl.classList.add('frame-visible');
                    setTimeout(() => {
                        portraitEl.classList.remove('terminal-hidden');
                        portraitEl.classList.add('terminal-loaded');
                        // Sync the terminal cursor with any typewriter cursors
                        syncCursorBlink();
                    }, 60);
                }, 220);
            }
        }
        typeChar();
    }, 320);
}

// Sync all blinking cursors to the same animation phase
function syncCursorBlink() {
    const cursors = document.querySelectorAll('.typewriter-cursor, .terminal-cursor');
    cursors.forEach(c => {
        c.style.animation = 'none';
        // Force reflow so the browser registers the reset
        void c.offsetWidth;
        c.style.animation = '';
    });
}

// Keyboard Shortcuts Modal
let shortcutsSequence = '';
let shortcutsTimeout = null;

function showShortcutsModal() {
    const modal = document.getElementById('shortcuts-modal');
    if (modal) {
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        const closeBtn = modal.querySelector('.shortcuts-close-btn');
        if (closeBtn) closeBtn.focus();
    }
}

function closeShortcutsModal() {
    const modal = document.getElementById('shortcuts-modal');
    if (modal) {
        modal.hidden = true;
        document.body.style.overflow = '';
    }
}

function scrollToSection(selector) {
    const el = document.querySelector(selector);
    if (el) {
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 68;
        const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
    }
    closeShortcutsModal();
}

function handleKeyboardShortcuts(e) {
    const active = document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) {
        return;
    }

    const key = e.key.toLowerCase();

    if (key === '?') {
        e.preventDefault();
        showShortcutsModal();
        return;
    }

    if (key === 'escape') {
        closeShortcutsModal();
        window.closeMobileMenu();
        return;
    }

    if (key === 'j') {
        e.preventDefault();
        window.scrollBy({ top: 60, behavior: 'smooth' });
        return;
    }
    if (key === 'k') {
        e.preventDefault();
        window.scrollBy({ top: -60, behavior: 'smooth' });
        return;
    }

    if (key === 'g') {
        shortcutsSequence = 'g';
        if (shortcutsTimeout) clearTimeout(shortcutsTimeout);
        shortcutsTimeout = setTimeout(() => { shortcutsSequence = ''; }, 1000);
        return;
    }

    if (shortcutsSequence === 'g') {
        shortcutsSequence = '';
        if (shortcutsTimeout) clearTimeout(shortcutsTimeout);
        switch (key) {
            case 'h': e.preventDefault(); scrollToSection('#inicio'); break;
            case 'a': e.preventDefault(); scrollToSection('#sobre-mi'); break;
            case 'p': e.preventDefault(); scrollToSection('#proyectos'); break;
            case 's': e.preventDefault(); scrollToSection('#stack'); break;
            case 't': e.preventDefault(); scrollToSection('#trayectoria'); break;
            case 'c': e.preventDefault(); scrollToSection('#contacto'); break;
        }
    }
}

document.addEventListener('click', (e) => {
    const modal = document.getElementById('shortcuts-modal');
    if (modal && !modal.hidden && e.target === modal.querySelector('.shortcuts-modal-backdrop')) {
        closeShortcutsModal();
    }
});

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = (() => { try { return localStorage.getItem('preferred_lang'); } catch (e) { return null; } })();
    setLanguage(savedLang === 'en' ? 'en' : 'es');
    initSpotlight();
    observeProgressBars();
    initTerminalWindowAnimation();
    initHeroTypewriter();

    document.addEventListener('keydown', handleKeyboardShortcuts);

    console.log(
        "%c<port/f> Portfolio | Juan Cruz Dominguez Pistoia %c\nFull-Stack & Systems Engineering // UTN-FRGP",
        "background: #0c0d10; color: #10b981; font-family: monospace; font-size: 12px; font-weight: bold; padding: 6px 10px; border: 1px solid #10b981; border-radius: 4px;",
        "color: #8e939e; font-size: 11px; padding: 4px;"
    );
});
