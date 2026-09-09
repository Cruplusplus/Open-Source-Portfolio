/*!
  ========================================================
  * Portfolio Web Template
  * Diseñado y desarrollado por: Juan Cruz Dominguez Pistoia
  * GitHub: https://github.com/Cruplusplus/Open-Source-Portfolio
  * Proyecto Open Source
  ========================================================
*/

let currentLang = 'es';
let currentFilter = 'All';

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

    if (queue.length > 0) {
        for (const text of queue) {
            await translateText(text, 'es', toLang);
            await new Promise(r => setTimeout(r, 60)); // Small delay between requests to stay under rate limits
        }

        if (currentLang === toLang) {
            renderFilters();
            renderProjects();
            renderSkills();
            renderTimeline();
        }
    }
    isTranslating = false;
}

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

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

    if (lang === 'en') {
        translateAllData('en');
    }
}

const projectsGrid = document.getElementById('projects-grid');
const filtersContainer = document.getElementById('projects-filters');
const skillsGrid = document.getElementById('skills-grid');
const timelineContainer = document.getElementById('timeline-container');

function renderFilters() {
    const allLabel = I18N[currentLang].filter_all;
    const categories = [allLabel, ...new Set(PROJECTS_DATA.map(p => getItemData(p).category).filter(Boolean))];

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
        : PROJECTS_DATA.filter(p => getItemData(p).category === currentFilter);

    projectsGrid.innerHTML = filtered.map(project => {
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
                        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" class="w-4 h-4 invert"> ${I18N[currentLang].btn_code}
                    </a>
                ` : ''}
                ${hasDemo ? `
                    <a href="${project.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="px-3.5 py-1.5 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 rounded text-xs font-mono font-medium transition-colors flex items-center gap-2 border border-cyan-500/30">
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
        "C# & .NET": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
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
        const data = getItemData(group);
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
        const data = getItemData(item);
        const imgTag = item.img ? `<img src="${item.img}" alt="Logo" class="h-8 w-auto rounded-sm object-contain bg-slate-100/10 p-1">` : '';
        const linkText = currentLang === 'es' ? 'Ver certificado' : 'View certificate';
        const linkTag = item.link ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:underline text-sm inline-flex items-center gap-1 mt-2">${linkText} <i data-lucide="external-link" class="w-3 h-3"></i></a>` : '';

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

window.toggleMobileMenu = () => {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
};

window.closeMobileMenu = () => {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.add('hidden');
    }
};

window.copyEmail = () => {
    const emailEl = document.getElementById('email-text');
    const email = emailEl ? emailEl.innerText : 'juancruzdominguezpistoia@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        const btnCard = document.getElementById('btn-copy-email-card');
        if (btnCard) {
            const originalHTML = btnCard.innerHTML;
            btnCard.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> <span class="text-emerald-400">${I18N[currentLang].copied_email || '¡Copiado!'}</span>`;
            if (window.lucide) lucide.createIcons();
            setTimeout(() => {
                btnCard.innerHTML = originalHTML;
                if (window.lucide) lucide.createIcons();
            }, 2000);
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    currentFilter = I18N[currentLang].filter_all;
    setLanguage('es');

    console.log(
        "%cPortfolio Template creado por Juan Cruz Dominguez Pistoia %c\n GitHub: https://github.com/Cruplusplus",
        "background: #080c14; color: #06b6d4; font-size: 13px; font-weight: bold; padding: 6px 10px; border: 1px solid #06b6d4; border-radius: 4px;",
        "color: #94a3b8; font-size: 11px; padding: 4px;"
    );
});
