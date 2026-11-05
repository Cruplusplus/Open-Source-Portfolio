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

// Save translation cache with safety
function saveTranslationCache() {
    try {
        localStorage.setItem('auto_translation_cache', JSON.stringify(TRANSLATION_CACHE));
    } catch (e) {
        console.warn('Unable to persist translation cache to localStorage', e);
    }
}

// Translate single text string with fallbacks
async function translateText(text, fromLang = 'es', toLang = 'en') {
    if (!text || typeof text !== 'string' || !text.trim()) return text;
    const cleanText = text.trim();

    // Preserve code blocks as-is (e.g. <code><port/f></code>)
    if (cleanText.startsWith('<code>') && cleanText.endsWith('</code>')) {
        return cleanText;
    }

    const cacheKey = `${fromLang}_${toLang}_${cleanText}`;
    if (TRANSLATION_CACHE[cacheKey]) {
        return TRANSLATION_CACHE[cacheKey];
    }

    // Attempt 1: Google Translate API
    try {
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(cleanText)}`;
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            const translated = data[0].map(item => item[0]).join('');
            if (translated && translated.trim()) {
                TRANSLATION_CACHE[cacheKey] = translated;
                saveTranslationCache();
                return translated;
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
                TRANSLATION_CACHE[cacheKey] = translated2;
                saveTranslationCache();
                return translated2;
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

function updateI18nDOM() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translated = getI18nText(key);
        if (translated) {
            el.innerHTML = translated;
        }
    });
}

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

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

    updateI18nDOM();
    renderFilters();
    renderProjects();
    renderSkills();
    renderTimeline();

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

    projectsGrid.innerHTML = filtered.map((project) => {
        const data = getItemData(project);
        const hasGithub = Boolean(project.githubUrl && project.githubUrl !== '#' && project.githubUrl.trim() !== '');
        const hasDemo = Boolean(project.liveDemoUrl && project.liveDemoUrl !== '#' && project.liveDemoUrl.trim() !== '');

        const codeBtnLabel = getI18nText('btn_code') || 'Ver Repositorio';
        const demoBtnLabel = getI18nText('btn_demo') || 'Ver Demo';

        return `
            <article class="project-card">
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
}

// Render Timeline & Progress Bar
function renderTimeline() {
    if (!timelineContainer || typeof TIMELINE_DATA === 'undefined') return;

    timelineContainer.innerHTML = TIMELINE_DATA.map(item => {
        const data = getItemData(item);
        const imgTag = item.img
            ? `<img src="${item.img}" alt="${data.company || data.role}" class="timeline-org-logo">`
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
                        <div class="progress-fill" style="width: ${percentage}%"></div>
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

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    setLanguage('es');

    console.log(
        "%c<port/f> Portfolio | Juan Cruz Dominguez Pistoia %c\nBackend & Systems Engineering // UTN-FRGP",
        "background: #0c0d10; color: #10b981; font-family: monospace; font-size: 12px; font-weight: bold; padding: 6px 10px; border: 1px solid #10b981; border-radius: 4px;",
        "color: #8e939e; font-size: 11px; padding: 4px;"
    );
});
