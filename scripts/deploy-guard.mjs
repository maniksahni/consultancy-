// Refuses to deploy a build that would remove pages from the live site.
// Runs before every deploy (npm run deploy and the daily GitHub Action). An old checkout or a
// partial build once replaced the 401-page site with a 196-page one; this stops that happening again.
//   - every page in the live sitemap must still exist in out/ (a few may go: up to MAX_LOST)
//   - key pages must be present
//   - the build must not be older than the live site (it records its git commit in out/version.json)
//   - a deploy from a computer must already be pushed, because the daily GitHub deploy rebuilds from GitHub
// To remove pages on purpose, run with ALLOW_PAGE_REMOVAL=1; to roll back on purpose, ALLOW_ROLLBACK=1.
import { access, readdir, writeFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';

const SITE = 'https://altheaconsulting.in';
const MAX_LOST = 3;
const KEY_PAGES = ['/', '/site-map', '/france/universities', '/france/universities/sorbonne-university', '/from-india/timeline', '/france/safety-wellbeing', '/jobs', '/about'];

const exists = async (path) => {
  const file = path === '/' ? 'out/index.html' : `out${path}.html`;
  try { await access(file); return true; } catch { try { await access(`out${path}/index.html`); return true; } catch { return false; } }
};
async function count(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map((e) => e.isDirectory() ? count(`${dir}/${e.name}`) : e.name.endsWith('.html') ? 1 : 0))).reduce((a, b) => a + b, 0);
}

const problems = [];
// Files the site uses must be committed: the daily GitHub build only has what is in git, and a file that
// exists only on one computer made that build fail for days.
try {
  const untracked = execSync('git ls-files --others --exclude-standard public src scripts', { encoding: 'utf8' }).trim();
  if (untracked) problems.push(`uncommitted site files (commit and push them first):\n      ${untracked.split('\n').join('\n      ')}`);
} catch { /* not a git checkout: skip */ }
for (const p of KEY_PAGES) if (!(await exists(p))) problems.push(`missing key page ${p}`);

// Read the live sitemap, retrying; if it cannot be read at all, do not deploy blind.
let live = null;
for (let attempt = 1; attempt <= 4 && !live; attempt++) {
  try {
    const res = await fetch(`${SITE}/sitemap.xml`, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    live = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/\/$/, '') || '/');
  } catch (e) { console.warn(`Deploy guard: live sitemap attempt ${attempt} failed (${e.message}).`); await new Promise((r) => setTimeout(r, 3000 * attempt)); }
}
if (!live) { problems.push('could not read the live sitemap to compare against (set ALLOW_PAGE_REMOVAL=1 to deploy anyway)'); live = []; }
const lost = [];
for (const p of live) if (!(await exists(p))) lost.push(p);
if (lost.length > MAX_LOST) problems.push(`${lost.length} live pages would disappear, e.g. ${lost.slice(0, 5).join(', ')}`);

// Never go backwards. On 26 Oct 2026 the daily GitHub deploy rebuilt a branch that was 13 commits behind
// the live site and wiped a day of work; only 2 pages differed, so the page check above let it through.
const git = (args) => execSync(`git ${args}`, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
const versionProblems = [];
let head = '';
let branch = '';
try {
  head = git('rev-parse HEAD');
  branch = git('rev-parse --abbrev-ref HEAD');
  if (branch === 'HEAD') branch = process.env.DEPLOY_BRANCH || process.env.GITHUB_REF_NAME || '';
} catch { /* not a git checkout */ }
if (head) {
  // CI checkouts are shallow, and a computer may be behind GitHub: fetch so the comparison sees everything.
  try { if (git('rev-parse --is-shallow-repository') === 'true') git('fetch --quiet --unshallow origin'); else git('fetch --quiet origin'); } catch { /* compared with what is available */ }
  let liveVersion = null;
  try {
    const res = await fetch(`${SITE}/version.json`, { signal: AbortSignal.timeout(20000), cache: 'no-store' });
    if (res.ok) liveVersion = await res.json();
  } catch { /* first deploy with versioning, or the site is down */ }
  if (liveVersion?.commit && liveVersion.commit !== head) {
    let included = false;
    try { git(`merge-base --is-ancestor ${liveVersion.commit} HEAD`); included = true; } catch { /* not an ancestor, or unknown here */ }
    if (!included) versionProblems.push(`the live site was built from commit ${liveVersion.commit.slice(0, 7)} (${liveVersion.builtAt || 'unknown time'}), which this checkout (${head.slice(0, 7)}) does not include: deploying would roll the site back. Pull the latest branch and rebuild.`);
  }
  if (!process.env.CI) {
    // Everything deployed from a computer must be on GitHub, or tomorrow's GitHub deploy brings back the old site.
    try {
      const changed = git('status --porcelain -- src public scripts');
      if (changed) versionProblems.push(`uncommitted changes to the site (commit and push them first):\n      ${changed.split('\n').join('\n      ')}`);
    } catch { /* skip */ }
    let pushed = false;
    try { pushed = git(`branch -r --contains ${head}`).split('\n').some((b) => b.trim() === `origin/${branch}`); } catch { /* treated as not pushed */ }
    if (!pushed) versionProblems.push(`commit ${head.slice(0, 7)} is not on GitHub (origin/${branch}). Run: git push origin ${branch}`);
  }
}
if (versionProblems.length && process.env.ALLOW_ROLLBACK !== '1') {
  console.error(`Deploy guard: NOT deploying.\n  - ${versionProblems.join('\n  - ')}`);
  process.exit(1);
}

const built = await count('out');
if (problems.length && process.env.ALLOW_PAGE_REMOVAL !== '1') {
  console.error(`Deploy guard: NOT deploying. Build has ${built} pages; live sitemap lists ${live.length}.\n  - ${problems.join('\n  - ')}\nThis usually means an old checkout. Pull the latest branch and rebuild, or set ALLOW_PAGE_REMOVAL=1 if the removal is intended.`);
  process.exit(1);
}
// Record what is being deployed, so the next deploy can tell whether it would go backwards.
if (head) await writeFile('out/version.json', JSON.stringify({ commit: head, branch, builtAt: new Date().toISOString() }) + '\n');
console.log(`Deploy guard: OK. Build has ${built} pages; all ${live.length} live sitemap pages kept${lost.length ? ` except ${lost.length}` : ''}.${head ? ` Version ${head.slice(0, 7)} on ${branch}.` : ''}`);
