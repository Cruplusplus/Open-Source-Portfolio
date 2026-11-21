/*!
  ========================================================
  * Build Script: Generate projects.json feed
  * Run: node build-feed.js
  * Output: projects.json (consumible por otros tools/sites)
  ========================================================
*/

const fs = require('fs');
const path = require('path');

// Read data.js and extract PROJECTS_DATA
// Since data.js uses ES6 const, we parse it as text instead of require()
function extractProjectsData() {
    const dataJs = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf8');

    // Find PROJECTS_DATA array using regex
    const match = dataJs.match(/const PROJECTS_DATA\s*=\s*(\[[\s\S]*?\])\s*;/);
    if (!match) {
        throw new Error('Could not find PROJECTS_DATA in data.js');
    }

    // Safely evaluate the array (it's our own trusted file)
    // eslint-disable-next-line no-eval
    const PROJECTS_DATA = eval(match[1]);
    return PROJECTS_DATA;
}

// Clean project data for public feed
function sanitizeProject(project) {
    const base = project.es || project;
    return {
        id: project.id,
        title: base.title,
        category: base.category,
        summary: base.summary,
        tags: project.tags || [],
        githubUrl: project.githubUrl || null,
        liveDemoUrl: project.liveDemoUrl || null
    };
}

function main() {
    try {
        const PROJECTS_DATA = extractProjectsData();
        const projects = PROJECTS_DATA.map(sanitizeProject);

        const feed = {
            version: '1.0',
            author: 'Juan Cruz Dominguez Pistoia',
            url: 'https://cruplusplus.github.io/Open-Source-Portfolio/',
            generatedAt: new Date().toISOString(),
            projects
        };

        const outputPath = path.join(__dirname, 'projects.json');
        fs.writeFileSync(outputPath, JSON.stringify(feed, null, 2));

        console.log(`✅ Generated ${outputPath} with ${projects.length} projects`);
        console.log(`📦 Feed version: ${feed.version}`);
        console.log(`🕒 Generated at: ${feed.generatedAt}`);
    } catch (err) {
        console.error('❌ Failed to generate projects.json:', err.message);
        process.exit(1);
    }
}

main();