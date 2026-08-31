let currentLang = 'es';
let currentFilter = 'All';

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang; // Accessibility: Update HTML lang attribute

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
                    ${hasGithub ? `<a href="${project.githubUrl}" class="hover:text-cyan-400 transition-colors" target="_blank" rel="noopener noreferrer" title="GitHub"><i data-lucide="github" class="w-5 h-5"></i></a>` : ''}
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
                        <i data-lucide="github" class="w-4 h-4 text-cyan-400"></i> ${I18N[currentLang].btn_code}
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
