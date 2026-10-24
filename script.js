let currentLang = 'es';
let currentFilter = 'All';

const TRANSLATION_CACHE = JSON.parse(localStorage.getItem('auto_translation_cache') || '{}');

const SKILL_ICONS = {
    "C# & .NET": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
    "C# / .NET": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
    "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
    "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
    "Go": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg",
    "HTML/CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    "HTML5 / CSS3": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    "SQL Server": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg",
    "SQL Server (T-SQL)": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg",
    "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
    "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    "AWS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    "AWS Fundamentals": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
    "Git / GitHub": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    "Git & GitHub Workflow": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
    "Linux": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
    "Linux / Shell": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg"
};

async function translateText(text, fromLang = 'es', toLang = 'en') {
    if (!text || typeof text !== 'string' || !text.trim()) return text;
    const cleanText = text.trim();

    if (cleanText.startsWith('<code>') && cleanText.endsWith('</code>')) {
        return cleanText;
    }

    const cacheKey = `${fromLang}_${toLang}_${cleanText}`;
    if (TRANSLATION_CACHE[cacheKey]) {
        return TRANSLATION_CACHE[cacheKey];
    }

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
    }

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
        console.warn('Translation API error:', e);
    }

    TRANSLATION_CACHE[cacheKey] = text;
    localStorage.setItem('auto_translation_cache', JSON.stringify(TRANSLATION_CACHE));
    return text;
}

function getItemData(item) {
    if (!item) return {};

    if (item[currentLang]) {
        return item[currentLang];
    }
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
            if (str.startsWith('<code>') && str.endsWith('</code>')) continue;

            const cacheKey = `es_en_${str}`;
            if (TRANSLATION_CACHE[cacheKey]) {
                autoData[key] = TRANSLATION_CACHE[cacheKey];
            }
        }
    }
    return autoData;
}

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
        const sourceI18N = I18N[currentLang] || I18N;
        Object.values(sourceI18N).forEach(val => addToQueue(val));
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
    if (typeof I18N === 'undefined') return "";

    if (I18N[currentLang] && I18N[currentLang][key]) {
        return I18N[currentLang][key];
    }
    const baseText = (I18N.es && I18N.es[key]) ? I18N.es[key] : I18N[key];
    if (!baseText) return "";
    if (currentLang === 'es') return cleanAIGradients(baseText);

    const cacheKey = `es_en_${baseText.trim()}`;
    return cleanAIGradients(TRANSLATION_CACHE[cacheKey] || baseText);
}

function cleanAIGradients(html) {
    if (typeof html !== 'string') return html;
    return html.replace(/bg-gradient-to-r\s+from-[^\s"]+\s+(via-[^\s"]+\s+)?to-[^\s"]+/g, 'text-emerald-400');
}

function updateI18nDOM() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const val = getI18nText(key);
        if (val) el.innerHTML = val;
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

    currentFilter = getI18nText('filter_all') || (lang === 'es' ? 'Todos' : 'All');

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

function deriveArchitecture(project) {
    if (project.arch) return project.arch;
    const tags = project.tags || [];
    const cat = project.category || "";

    if (tags.includes("SFML") || tags.includes("C++")) return "SYSTEMS & OOP // SFML";
    if (tags.includes("Docker") || tags.includes("SQL Server")) return "RELATIONAL DB // DOCKER";
    if (tags.includes("aiohttp") || tags.includes("API")) return "REST API // ASYNC COROUTINES";
    if (tags.includes("HTML/CSS") || tags.includes("JavaScript")) return "SWISS MINIMAL // VANILLA WEB";
    return `${cat.toUpperCase()} // ARCHITECTURE`;
}

const projectsGrid = document.getElementById('projects-grid');
const filtersContainer = document.getElementById('projects-filters');
const skillsGrid = document.getElementById('skills-grid');
const timelineContainer = document.getElementById('timeline-container');

function renderFilters() {
    if (!filtersContainer || typeof PROJECTS_DATA === 'undefined') return;

    const allLabel = getI18nText('filter_all') || (currentLang === 'es' ? 'Todos' : 'All');
    const categories = [allLabel, ...new Set(PROJECTS_DATA.map(p => getItemData(p).category).filter(Boolean))];

    if (!categories.includes(currentFilter)) {
        currentFilter = allLabel;
    }

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
}

window.filterProjects = (category) => {
    currentFilter = category;
    renderFilters();
    renderProjects();
};

function renderProjects() {
    if (!projectsGrid || typeof PROJECTS_DATA === 'undefined') return;

    const allLabel = getI18nText('filter_all') || (currentLang === 'es' ? 'Todos' : 'All');
    const filtered = currentFilter === allLabel
        ? PROJECTS_DATA
        : PROJECTS_DATA.filter(p => getItemData(p).category === currentFilter);

    projectsGrid.innerHTML = filtered.map((project, idx) => {
        const data = getItemData(project);
        const hasGithub = project.githubUrl && project.githubUrl !== '#' && project.githubUrl !== '';
        const hasDemo = project.liveDemoUrl && project.liveDemoUrl !== '#' && project.liveDemoUrl !== '';
        const isFeatured = (project.tags && project.tags.includes('SFML')) || (idx === 0 && currentFilter === allLabel);
        const arch = deriveArchitecture(project);

        return `
        <article class="project-card ${isFeatured ? 'featured' : ''}">
            <div class="card-header-row">
                <div class="arch-badge">
                    <span style="display:inline-block; width:5px; height:5px; border-radius:50%; background:var(--accent);"></span>
                    <span>${arch}</span>
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
                ${(project.tags || []).map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
            </div>

            <div class="card-footer">
                ${hasGithub ? `
                    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                        <i data-lucide="github" style="width: 13px; height: 13px;"></i>
                        <span>${getI18nText('btn_code') || 'Código'}</span>
                    </a>
                ` : ''}
                ${hasDemo ? `
                    <a href="${project.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-accent">
                        <i data-lucide="external-link" style="width: 13px; height: 13px;"></i>
                        <span>${getI18nText('btn_demo') || 'Demo'}</span>
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
    if (!skillsGrid || typeof SKILLS_DATA === 'undefined') return;

    skillsGrid.innerHTML = SKILLS_DATA.map(group => {
        const data = getItemData(group);
        return `
        <div class="stack-category-block">
            <div class="stack-category-header">
                <span class="category-icon">
                    <i data-lucide="${group.icon || 'layers'}" style="width: 16px; height: 16px;"></i>
                </span>
                <span class="category-name">${data.category}</span>
            </div>
            <div class="skills-list">
                ${(group.skills || []).map(skill => {
                    const rawLevel = skill.level || skill.level_es || '';
                    let levelLabel = rawLevel;

                    if (currentLang === 'en') {
                        if (skill.level_en) {
                            levelLabel = skill.level_en;
                        } else if (rawLevel) {
                            const cacheKey = `es_en_${rawLevel.trim()}`;
                            levelLabel = TRANSLATION_CACHE[cacheKey] || rawLevel;
                        }
                    }

                    const lower = String(levelLabel).toLowerCase();
                    let levelClass = 'level-beginner';
                    if (lower.includes('avanzad') || lower.includes('advanc')) {
                        levelClass = 'level-advanced';
                    } else if (lower.includes('intermed') || lower.includes('interm')) {
                        levelClass = 'level-intermediate';
                    }

                    const iconUrl = SKILL_ICONS[skill.name];
                    const isWhiteIcon = skill.name.includes('Git') || skill.name.includes('AWS') || skill.name === 'Go';
                    const iconImg = iconUrl
                        ? `<img src="${iconUrl}" class="skill-tech-icon ${isWhiteIcon ? 'invert-icon' : ''}" alt="${skill.name}">`
                        : `<span class="skill-dot-icon">●</span>`;

                    return `
                        <div class="skill-row">
                            <div class="skill-name-wrapper">
                                ${iconImg}
                                <span class="skill-name">${skill.name}</span>
                            </div>
                            <span class="skill-level-pill ${levelClass}">${levelLabel}</span>
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
    if (!timelineContainer || typeof TIMELINE_DATA === 'undefined') return;

    timelineContainer.innerHTML = TIMELINE_DATA.map(item => {
        const data = getItemData(item);
        const periodText = (currentLang === 'en' && item.period_en) ? item.period_en : item.period;
        const imgTag = item.img ? `<img src="${item.img}" alt="Logo" class="timeline-org-logo">` : '';
        const certLabel = getI18nText('cert_link') || (currentLang === 'es' ? 'Ver Certificado' : 'View Certificate');
        const linkTag = item.link ? `
            <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="timeline-link">
                <span>${certLabel}</span>
                <i data-lucide="arrow-up-right" style="width: 12px; height: 12px;"></i>
            </a>
        ` : '';

        let progressMarkup = '';
        if (item.progress) {
            const percentage = Math.round((item.progress.approved / item.progress.total) * 100);
            const degLabel = getI18nText('degree_progress') || (currentLang === 'es' ? 'Progreso de la carrera' : 'Degree progress');
            const appLabel = getI18nText('approved_subjects') || (currentLang === 'es' ? 'Materias aprobadas' : 'Approved subjects');
            const inProgLabel = getI18nText('in_progress_subjects') || (currentLang === 'es' ? 'Cursando actualmente' : 'Currently taking');

            progressMarkup = `
            <div class="progress-card">
                <div class="progress-header">
                    <span class="progress-label">
                        <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:var(--accent);"></span>
                        <span>${degLabel}</span>
                    </span>
                    <span class="progress-pct">${percentage}%</span>
                </div>
                <div class="progress-track">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <div class="progress-metrics">
                    <span>${appLabel}: <strong class="metric-highlight">${item.progress.approved}/${item.progress.total}</strong></span>
                    <span>${inProgLabel}: <strong class="metric-highlight">${item.progress.inProgress}</strong></span>
                </div>
            </div>
            `;
        }

        return `
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
            ${linkTag}
        </div>
        `;
    }).join('');

    if (window.lucide) {
        lucide.createIcons();
    }
}

window.toggleMobileMenu = () => {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) drawer.classList.toggle('open');
};

window.closeMobileMenu = () => {
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) drawer.classList.remove('open');
};

window.copyEmail = () => {
    const emailEl = document.getElementById('email-text');
    const email = emailEl ? emailEl.innerText.trim() : 'juancruzdominguezpistoia@gmail.com';

    navigator.clipboard.writeText(email).then(() => {
        const btnCard = document.getElementById('btn-copy-email-card');
        const btnFooter = document.getElementById('btn-copy');
        const iconFooter = document.getElementById('copy-status-icon');
        const copiedText = getI18nText('copied_email') || '¡Copiado!';

        if (btnCard) {
            btnCard.innerHTML = `<i data-lucide="check" style="width: 13px; height: 13px; color: var(--accent);"></i> <span style="color: var(--accent);">${copiedText}</span>`;
            if (window.lucide) lucide.createIcons();
        }

        if (btnFooter && iconFooter) {
            btnFooter.style.borderColor = 'var(--accent)';
            iconFooter.setAttribute('data-lucide', 'check');
            iconFooter.style.color = 'var(--accent)';
            if (window.lucide) lucide.createIcons();
        }

        setTimeout(() => {
            if (btnCard) {
                btnCard.innerHTML = `<i data-lucide="copy" style="width: 13px; height: 13px;"></i> <span>${getI18nText('btn_copy_email') || 'Copiar Email'}</span>`;
                if (window.lucide) lucide.createIcons();
            }
            if (btnFooter && iconFooter) {
                btnFooter.style.borderColor = '';
                iconFooter.setAttribute('data-lucide', 'copy');
                iconFooter.style.color = '';
                if (window.lucide) lucide.createIcons();
            }
        }, 2200);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    setLanguage('es');

    console.log(
        "%c JUAN CRUZ DOMINGUEZ PISTOIA // BACKEND & SYSTEMS %c\n https://github.com/Cruplusplus",
        "background: #16181D; color: #10B981; font-family: monospace; font-size: 11px; padding: 4px 8px; border: 1px solid #262930;",
        "color: #8A8F98; font-family: monospace; font-size: 10px; padding: 4px;"
    );
});
