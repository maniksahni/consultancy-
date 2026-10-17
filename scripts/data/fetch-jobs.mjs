// Fetches real, currently open job listings for the seven destinations.
//   public/data/jobs/live.json          — counts per country, sources, update time
//   public/data/jobs/list-<country>.json — one country's list (no descriptions), loaded on demand
//   public/data/jobs/desc/<chunk>.json  — full descriptions, loaded when a job is opened
// Every listing keeps its source and the source's own URL, so visitors apply where
// the job is actually posted.
//
// Sources that need no key run every time: company career sites (see BOARDS), Arbeitnow (on-site jobs in France, the UK,
// Germany, Ireland) and Jobicy (remote jobs open to each country). These switch on
// automatically when their free keys are set in .env.local or the build environment:
//   FRANCE_TRAVAIL_CLIENT_ID, FRANCE_TRAVAIL_CLIENT_SECRET  (francetravail.io — official French job board)
//   ADZUNA_APP_ID, ADZUNA_APP_KEY                            (developer.adzuna.com)
//   MUSE_API_KEY                                             (themuse.com/developers)
// A failing source never empties the feed: the previous listings are kept.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { placeOf } from './job-places.mjs';

const DIR = 'public/data/jobs';
const OUT = `${DIR}/live.json`;
const MAX_AGE_DAYS = 45;
const PER_COUNTRY = 2500;
const CHUNK = 40;
const UA = 'AltheaConsulting-JobsFeed/1.1 (+https://altheaconsulting.in/jobs)';
const COUNTRIES = ['france', 'uk', 'usa', 'canada', 'germany', 'australia', 'ireland'];
const COUNTRY_NAMES = { france: 'France', uk: 'United Kingdom', usa: 'United States', canada: 'Canada', germany: 'Germany', australia: 'Australia', ireland: 'Ireland' };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function getJson(url, init = {}) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(url, { ...init, headers: { 'User-Agent': UA, Accept: 'application/json', ...(init.headers || {}) }, signal: AbortSignal.timeout(30000) });
      if (res.status === 429) { await sleep(3000 * (attempt + 1)); continue; }
      if (res.status === 204) return {};
      if (!res.ok && res.status !== 206) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (error) { if (attempt === 2) throw error; await sleep(1500); }
  }
}

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', ndash: '–', mdash: '—', hellip: '…', eacute: 'é', egrave: 'è', agrave: 'à', ccedil: 'ç', euro: '€' };
const decode = (s = '') => String(s).replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e) => e[0] === '#' ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : (ENTITIES[e.toLowerCase()] ?? m));
const text = (html = '', max = 220) => {
  // Some boards send escaped HTML; decode before and after stripping tags.
  const t = decode(decode(String(html)).replace(/<[^>]*>/g, ' ')).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return t.length > max ? t.slice(0, max).replace(/\s+\S*$/, '') + '…' : t;
};
/** Full description as plain text that keeps paragraphs and bullet points. */
const rich = (html = '', max = 7000) => {
  let s = decode(String(html));
  s = s.replace(/<\s*li[^>]*>/gi, '\n• ').replace(/<\s*(br|\/p|\/div|\/h\d|\/ul|\/ol|\/li)[^>]*>/gi, '\n').replace(/<[^>]*>/g, ' ');
  s = decode(s).replace(/[ \t ]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n{3,}/g, '\n\n').replace(/^• *$/gm, '').trim();
  return s.length > max ? s.slice(0, max).replace(/\s+\S*$/, '') + '…' : s;
};
const safeUrl = (u) => { try { const url = new URL(u); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; } };
/** en / fr / de by common words; null when too short to tell. */
function language(s) {
  const t = ` ${String(s).toLowerCase()} `;
  const score = (words) => words.reduce((n, w) => n + (t.split(` ${w} `).length - 1), 0);
  const en = score(['the', 'and', 'you', 'your', 'we', 'with', 'for', 'our', 'will', 'are']);
  const fr = score(['le', 'la', 'les', 'et', 'vous', 'nous', 'des', 'pour', 'une', 'avec', 'votre']);
  const de = score(['der', 'die', 'und', 'sie', 'wir', 'mit', 'für', 'ein', 'eine', 'ihre', 'bei']);
  const best = Math.max(en, fr, de);
  if (best < 5) return null;
  return best === en ? 'en' : best === fr ? 'fr' : 'de';
}

function job(fields) {
  const url = safeUrl(fields.url);
  const posted = new Date(fields.posted);
  if (!url || !fields.title || Number.isNaN(posted.getTime())) return null;
  const description = fields.description ? rich(fields.description) : '';
  return {
    id: fields.id, country: fields.country, title: decode(fields.title).trim(), company: decode(fields.company || 'Company not named').trim(),
    location: decode(fields.location || COUNTRY_NAMES[fields.country]).trim(), remote: Boolean(fields.remote),
    type: fields.type || null, category: fields.category ? decode(fields.category).trim() : null, level: fields.level || null,
    salary: fields.salary || null, summary: text(fields.summary || fields.description, 170), lang: language(`${fields.title} ${description}`),
    posted: posted.toISOString(), url, source: fields.source, description,
  };
}

// A deploy reuses jobs fetched in the last 12 hours (the full fetch takes about ten minutes).
// `npm run data:jobs` forces a fresh fetch.
try {
  const previous = JSON.parse(await readFile(OUT, 'utf8'));
  const age = Date.now() - new Date(previous.updatedAt).getTime();
  if (!process.env.JOBS_REFRESH && age < 12 * 36e5 && previous.counts) {
    await readFile(`${DIR}/list-france.json`);
    console.log(`Jobs feed: reusing ${Object.values(previous.counts).reduce((a, b) => a + b, 0)} listings fetched ${Math.round(age / 6e4)} min ago.`);
    process.exit(0);
  }
} catch {}

// ---------- Sources ----------
const JOBICY_GEO = { france: 'france', uk: 'uk', usa: 'usa', canada: 'canada', germany: 'germany', australia: 'australia', ireland: 'ireland' };
async function jobicy(country) {
  const data = await getJson(`https://jobicy.com/api/v2/remote-jobs?count=100&geo=${JOBICY_GEO[country]}`);
  return (data.jobs || []).map((j) => job({
    id: `jobicy-${j.id}`, country, title: j.jobTitle, company: j.companyName,
    location: `Remote · ${j.jobGeo === 'Anywhere' ? `open to ${COUNTRY_NAMES[country]}` : decode(j.jobGeo).replace(/\s*,\s*/g, ', ')}`,
    remote: true, type: [].concat(j.jobType || []).join(', ') || null, category: [].concat(j.jobIndustry || [])[0],
    level: j.jobLevel && j.jobLevel !== 'Any' ? j.jobLevel : null,
    salary: j.annualSalaryMin && j.annualSalaryMax ? `${j.salaryCurrency || ''} ${Number(j.annualSalaryMin).toLocaleString('en-GB')}–${Number(j.annualSalaryMax).toLocaleString('en-GB')} / year`.trim() : null,
    summary: text(j.jobExcerpt || j.jobDescription), description: j.jobDescription, posted: j.pubDate, url: j.url, source: 'Jobicy',
  })).filter(Boolean);
}



async function arbeitnow() {
  const out = [];
  for (let page = 1; page <= 12; page++) {
    const data = await getJson(`https://www.arbeitnow.com/api/job-board-api?page=${page}`);
    for (const j of data.data || []) {
      const country = placeOf(j.location);
      if (!['france', 'uk', 'ireland', 'germany'].includes(country)) continue;
      const item = job({
        id: `arbeitnow-${j.slug}`, country, title: j.title, company: j.company_name, location: j.remote ? `${j.location} · remote possible` : j.location,
        remote: j.remote, type: (j.job_types || []).join(', ') || null, category: (j.tags || [])[0], description: j.description,
        posted: j.created_at * 1000, url: j.url, source: 'Arbeitnow',
      });
      if (item) out.push(item);
    }
    if (!data.links?.next) break;
    await sleep(800);
  }
  return out;
}

// France Travail (official French public employment service). Free API access:
// francetravail.io → create an application → enable "API Offres d'emploi v2".
async function franceTravail() {
  const { FRANCE_TRAVAIL_CLIENT_ID: id, FRANCE_TRAVAIL_CLIENT_SECRET: secret } = process.env;
  if (!id || !secret) return [];
  const token = await getJson('https://entreprise.francetravail.fr/connexion/oauth2/access_token?realm=%2Fpartenaire', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'client_credentials', client_id: id, client_secret: secret, scope: 'api_offresdemploiv2 o2dsoffre' }),
  });
  const auth = { headers: { Authorization: `Bearer ${token.access_token}` } };
  const out = [];
  // Newest first; graduate-friendly ("débutant accepté") roles, then internships and work-study.
  for (const query of ['experienceExige=D', 'motsCles=stage', 'motsCles=alternance']) {
    for (let start = 0; start < 450; start += 150) {
      const data = await getJson(`https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search?sort=1&range=${start}-${start + 149}&${query}`, auth);
      for (const o of data.resultats || []) {
        const item = job({
          id: `francetravail-${o.id}`, country: 'france', title: o.intitule, company: o.entreprise?.nom || 'Entreprise non communiquée',
          location: o.lieuTravail?.libelle?.replace(/^\d+\s*-\s*/, ''), remote: /télétravail/i.test(o.description || ''),
          type: [o.typeContratLibelle, o.dureeTravailLibelleConverti].filter(Boolean).join(' · ') || null,
          category: o.secteurActiviteLibelle || o.romeLibelle, level: o.experienceLibelle || null, salary: o.salaire?.libelle || null,
          description: o.description, posted: o.dateCreation,
          url: o.origineOffre?.urlOrigine || `https://candidat.francetravail.fr/offres/recherche/detail/${o.id}`, source: 'France Travail',
        });
        if (item) out.push(item);
      }
      if ((data.resultats || []).length < 150) break;
      await sleep(400);
    }
  }
  return out;
}

const ADZUNA = { france: 'fr', uk: 'gb', usa: 'us', canada: 'ca', germany: 'de', australia: 'au' };
async function adzuna(country) {
  const { ADZUNA_APP_ID: id, ADZUNA_APP_KEY: key } = process.env;
  if (!id || !key || !ADZUNA[country]) return [];
  const out = [];
  for (let page = 1; page <= 4; page++) {
    const query = new URLSearchParams({ app_id: id, app_key: key, results_per_page: '50', what_or: 'graduate junior intern internship trainee entry english', sort_by: 'date', max_days_old: String(MAX_AGE_DAYS), 'content-type': 'application/json' });
    const data = await getJson(`https://api.adzuna.com/v1/api/jobs/${ADZUNA[country]}/search/${page}?${query}`);
    for (const j of data.results || []) {
      const item = job({
        id: `adzuna-${j.id}`, country, title: j.title, company: j.company?.display_name, location: j.location?.display_name,
        remote: /remote|télétravail|home office/i.test(`${j.title} ${j.description}`), type: j.contract_time === 'part_time' ? 'Part-time' : j.contract_time === 'full_time' ? 'Full-time' : null,
        category: j.category?.label, salary: j.salary_min && j.salary_max && !j.salary_is_predicted ? `${Math.round(j.salary_min).toLocaleString('en-GB')}–${Math.round(j.salary_max).toLocaleString('en-GB')} / year` : null,
        description: j.description, posted: j.created, url: j.redirect_url, source: 'Adzuna',
      });
      if (item) out.push(item);
    }
    if ((data.results || []).length < 50) break;
    await sleep(400);
  }
  return out;
}

const MUSE_CITIES = {
  france: ['Paris, France', 'Lyon, France', 'Toulouse, France'], uk: ['London, United Kingdom', 'Manchester, United Kingdom', 'Edinburgh, United Kingdom'],
  usa: ['New York, NY', 'San Francisco, CA', 'Boston, MA', 'Chicago, IL'], canada: ['Toronto, Canada', 'Vancouver, Canada', 'Montreal, Canada'],
  germany: ['Berlin, Germany', 'Munich, Germany'], australia: ['Sydney, Australia', 'Melbourne, Australia'], ireland: ['Dublin, Ireland'],
};
async function muse(country) {
  const key = process.env.MUSE_API_KEY;
  if (!key) return [];
  const query = new URLSearchParams({ api_key: key, page: '0', descending: 'true' });
  for (const level of ['Entry Level', 'Mid Level', 'Internship']) query.append('level', level);
  for (const city of MUSE_CITIES[country]) query.append('location', city);
  const data = await getJson(`https://www.themuse.com/api/public/jobs?${query}`);
  const wanted = MUSE_CITIES[country].map((c) => c.split(',')[0].toLowerCase());
  return (data.results || []).flatMap((j) => {
    const locs = (j.locations || []).map((l) => l.name);
    const local = locs.filter((l) => wanted.some((w) => l.toLowerCase().includes(w)));
    if (!local.length) return [];
    const item = job({
      id: `muse-${j.id}`, country, title: j.name, company: j.company?.name, location: local.join(' · '), remote: locs.some((l) => /remote/i.test(l)),
      category: j.categories?.[0]?.name, level: j.levels?.[0]?.name, description: j.contents, posted: j.publication_date, url: j.refs?.landing_page, source: 'The Muse',
    });
    return item ? [item] : [];
  });
}


// ---------- Company career sites ----------
// Employers publish open roles through their applicant-tracking system's public job-board feed
// (Greenhouse, Lever, Ashby, SmartRecruiters, Workable, Recruitee, Personio, Workday). These feeds
// exist so anyone can list the company's jobs; each listing keeps the company's own description
// and apply link. The employer list lives in job-boards.json (see discover-job-boards.mjs).
const { boards: BOARDS } = JSON.parse(await readFile(new URL('./job-boards.json', import.meta.url), 'utf8'));
const SR_COUNTRY = { france: 'fr', uk: 'gb', usa: 'us', canada: 'ca', germany: 'de', australia: 'au', ireland: 'ie' };
const PER_COMPANY = 50;
const PER_COMPANY_FRANCE = 150; // France is the priority destination: show more of each employer's roles there
const capFor = (country) => (country === 'france' ? PER_COMPANY_FRANCE : PER_COMPANY);
const isEntry = (title) => /\b(intern|internship|stage|stagiaire|alternance|alternant|apprenti|apprentice|apprenticeship|graduate|junior|trainee|werkstudent|working student|praktikum|praktikant|new grad|entry|v\.?i\.?e)\b/i.test(title);
/** One company's roles in one country: internships and junior roles first, then the newest. */
const pickForStudents = (rows, n = PER_COMPANY) => rows.sort((a, b) => (isEntry(b.title) - isEntry(a.title)) || (new Date(b.posted) - new Date(a.posted))).slice(0, n);
async function pool(items, size, fn) {
  const out = []; let i = 0;
  await Promise.all(Array.from({ length: size }, async () => { while (i < items.length) { const item = items[i++]; try { out.push(...await fn(item)); } catch {} } }));
  return out;
}
const direct = (fields) => { const row = job({ ...fields, source: `${fields.company} careers` }); if (row) row.direct = true; return row; };
const placed = (rows) => rows.filter(Boolean);
async function getText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

const FETCHERS = {
  async greenhouse({ slug, company }) {
    const data = await getJson(`https://boards-api.greenhouse.io/v1/boards/${slug}/jobs?content=true`);
    return placed((data.jobs || []).map((j) => {
      const location = j.location?.name || ''; const country = placeOf(location);
      return country && direct({ id: `gh-${slug}-${j.id}`, country, title: j.title, company, location, remote: /remote/i.test(location),
        category: j.departments?.[0]?.name, description: j.content, posted: j.first_published || j.updated_at, url: j.absolute_url });
    }));
  },
  async lever({ slug, company }, host = 'api.lever.co') {
    const data = await getJson(`https://${host}/v0/postings/${slug}?mode=json`);
    return placed((Array.isArray(data) ? data : []).map((j) => {
      const location = [...new Set([j.categories?.location, ...(j.categories?.allLocations || [])].filter(Boolean))].join(' · ');
      const country = placeOf(location);
      const lists = (j.lists || []).map((l) => `<h3>${l.text}</h3><ul>${l.content}</ul>`).join('');
      return country && direct({ id: `lever-${slug}-${j.id}`, country, title: j.text, company, location, remote: j.workplaceType === 'remote',
        type: j.categories?.commitment, category: j.categories?.team, description: `${j.description || ''}${lists}${j.additional || ''}`, posted: j.createdAt, url: j.hostedUrl });
    }));
  },
  levereu(board) { return FETCHERS.lever(board, 'api.eu.lever.co'); },
  async ashby({ slug, company }) {
    const data = await getJson(`https://api.ashbyhq.com/posting-api/job-board/${slug}?includeCompensation=true`);
    return placed((data.jobs || []).map((j) => {
      if (j.isListed === false) return null;
      const where = [j.location, j.address?.postalAddress?.addressCountry, ...(j.secondaryLocations || []).map((l) => l.location)].filter(Boolean).join(' · ');
      const country = placeOf(where);
      return country && direct({ id: `ashby-${slug}-${j.id}`, country, title: j.title, company, remote: Boolean(j.isRemote),
        location: [...new Set([j.location, ...(j.secondaryLocations || []).map((l) => l.location)].filter(Boolean))].join(' · '),
        type: j.employmentType?.replace(/([a-z])([A-Z])/g, '$1 $2'), category: j.department || j.team,
        salary: j.compensation?.compensationTierSummary || null, description: j.descriptionHtml, posted: j.publishedAt, url: j.jobUrl });
    }));
  },
  async workable({ slug, company }) {
    const data = await getJson(`https://apply.workable.com/api/v1/widget/accounts/${slug}?details=true`);
    return placed((data.jobs || []).map((j) => {
      const location = [j.city, j.state, j.country].filter(Boolean).join(', '); const country = placeOf(location);
      return country && direct({ id: `workable-${slug}-${j.shortcode}`, country, title: j.title, company, location, remote: Boolean(j.telecommuting),
        type: j.employment_type, category: j.department, level: j.experience, description: j.description, posted: j.published_on || j.created_at,
        url: j.url || `https://apply.workable.com/${slug}/j/${j.shortcode}/` });
    }));
  },
  async recruitee({ slug, company }) {
    const data = await getJson(`https://${slug}.recruitee.com/api/offers/`);
    return placed((data.offers || []).map((o) => {
      const location = [o.city, o.country].filter(Boolean).join(', '); const country = placeOf(location);
      return country && direct({ id: `recruitee-${slug}-${o.id}`, country, title: o.title, company, location, remote: Boolean(o.remote),
        type: o.employment_type_code?.replace(/_/g, ' '), category: o.department, description: `${o.description || ''}${o.requirements ? `<h3>Requirements</h3>${o.requirements}` : ''}`,
        posted: o.published_at || o.created_at, url: o.careers_url });
    }));
  },
  async personio({ slug, company }) {
    const xml = await getText(`https://${slug}.jobs.personio.de/xml?language=en`);
    const tag = (s, t) => (s.match(new RegExp(`<${t}>([\\s\\S]*?)</${t}>`)) || [])[1]?.replace(/^<!\[CDATA\[|\]\]>$/g, '').trim() || '';
    return placed([...xml.matchAll(/<position>([\s\S]*?)<\/position>/g)].map(([, p]) => {
      const offices = [tag(p, 'office'), ...[...(tag(p, 'additionalOffices').matchAll(/<office>([^<]*)<\/office>/g))].map((m) => m[1])].filter(Boolean);
      const location = offices.join(' · '); const country = placeOf(location);
      const description = [...p.matchAll(/<jobDescription>([\s\S]*?)<\/jobDescription>/g)].map(([, d]) => `<h3>${tag(d, 'name')}</h3>${tag(d, 'value')}`).join('');
      const id = tag(p, 'id');
      return country && direct({ id: `personio-${slug}-${id}`, country, title: tag(p, 'name'), company, location, remote: /remote/i.test(location),
        type: tag(p, 'schedule'), category: tag(p, 'department'), level: tag(p, 'seniority'), description, posted: tag(p, 'createdAt'),
        url: `https://${slug}.jobs.personio.de/job/${id}` });
    }));
  },
};

/** SmartRecruiters and Workday need one request per job for the description: list per country, pick, then fetch details. */
async function smartRecruitersRoles(boards) {
  const picked = await pool(boards.flatMap((b) => COUNTRIES.filter((c) => b.counts?.[c]).map((country) => ({ ...b, country }))), 6, async ({ slug, company, country }) => {
    const data = await getJson(`https://api.smartrecruiters.com/v1/companies/${slug}/postings?country=${SR_COUNTRY[country]}&limit=100`);
    const rows = (data.content || []).map((p) => ({ slug, company, country, p, title: p.name, posted: p.releasedDate }));
    return pickForStudents(rows, country === 'france' ? 100 : PER_COMPANY);
  });
  return placed(await pool(picked, 10, async ({ slug, company, country, p }) => {
    const d = await getJson(`https://api.smartrecruiters.com/v1/companies/${slug}/postings/${p.id}`);
    const sections = d.jobAd?.sections || {};
    const html = ['companyDescription', 'jobDescription', 'qualifications', 'additionalInformation'].map((k) => sections[k]?.text ? `<h3>${sections[k].title || ''}</h3>${sections[k].text}` : '').join('');
    return [direct({ id: `sr-${slug}-${p.id}`, country, title: p.name, company, location: [p.location?.city, p.location?.region, COUNTRY_NAMES[country]].filter(Boolean).join(', '),
      remote: Boolean(p.location?.remote), type: p.typeOfEmployment?.label, category: p.function?.label || p.department?.label, level: p.experienceLevel?.label,
      description: html, posted: p.releasedDate, url: d.postingUrl || `https://jobs.smartrecruiters.com/${slug}/${p.id}` })];
  }));
}

const WD_COUNTRY = { france: /^france$/i, uk: /^united kingdom$/i, usa: /^united states( of america)?$/i, canada: /^canada$/i, germany: /^germany$/i, australia: /^australia$/i, ireland: /^ireland$/i };
const ago = (text) => { const n = /today/i.test(text) ? 0 : /yesterday/i.test(text) ? 1 : parseInt((text.match(/(\d+)/) || [])[1] || '30', 10); return Date.now() - n * 864e5; };
async function workdayRoles(boards) {
  const picked = await pool(boards, 4, async ({ slug, company }) => {
    const [tenant, wd, site] = slug.split('/');
    const api = `https://${tenant}.${wd}.myworkdayjobs.com/wday/cxs/${tenant}/${site}`;
    const search = (body) => getJson(`${api}/jobs`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ appliedFacets: {}, limit: 20, offset: 0, searchText: '', ...body }) });
    const first = await search({});
    // The country facet's name differs between employers; find the one listing country names.
    const facets = (first.facets || []).flatMap((f) => [f, ...(f.values || []).filter((v) => v.facetParameter)]);
    const countryFacet = facets.find((f) => (f.values || []).some((v) => /^(france|germany|united kingdom)$/i.test(v.descriptor || '')));
    if (!countryFacet) return [];
    const out = [];
    for (const country of COUNTRIES) {
      const value = countryFacet.values.find((v) => WD_COUNTRY[country].test(v.descriptor || ''));
      if (!value) continue;
      const rows = [];
      const want = country === 'france' ? 120 : 40;
      for (let offset = 0; offset < Math.min(value.count || 0, want * 2); offset += 20) {
        const page = await search({ appliedFacets: { [countryFacet.facetParameter]: [value.id] }, offset });
        rows.push(...(page.jobPostings || []).map((p) => ({ api, tenant, wd, site, company, country, p, title: p.title, posted: ago(p.postedOn || '') })));
      }
      out.push(...pickForStudents(rows, want));
    }
    return out;
  });
  return placed(await pool(picked, 10, async ({ api, tenant, wd, site, company, country, p }) => {
    const d = (await getJson(`${api}${p.externalPath}`)).jobPostingInfo || {};
    return [direct({ id: `wd-${tenant}-${d.jobReqId || p.externalPath.split('_').pop()}`, country, title: d.title || p.title, company,
      location: [d.location, ...(d.additionalLocations || [])].filter(Boolean).join(' · ') || COUNTRY_NAMES[country], remote: /remote/i.test(d.remoteType || ''),
      type: d.timeType, description: d.jobDescription, posted: d.startDate || ago(p.postedOn || ''), url: d.externalUrl || `https://${tenant}.${wd}.myworkdayjobs.com/${site}${p.externalPath}` })];
  }));
}

async function companyCareerSites() {
  const simple = BOARDS.filter((b) => FETCHERS[b.provider]);
  const rows = await pool(simple, 8, async (board) => FETCHERS[board.provider](board));
  // Cap each company per country so one employer cannot fill a list.
  const groups = new Map();
  for (const r of rows) { const k = `${r.country}|${r.company}`; groups.set(k, [...(groups.get(k) || []), r]); }
  const capped = [...groups.values()].flatMap((g) => pickForStudents(g, capFor(g[0].country)));
  const sr = await smartRecruitersRoles(BOARDS.filter((b) => b.provider === 'smartrecruiters'));
  const wd = await workdayRoles(BOARDS.filter((b) => b.provider === 'workday'));
  console.log(`  career sites: ${capped.length} from ATS feeds, ${sr.length} SmartRecruiters, ${wd.length} Workday`);
  return [...capped, ...sr, ...wd];
}

// ---------- Run ----------
// When every source fails, the files from the previous run are left untouched.
const byCountry = Object.fromEntries(COUNTRIES.map((c) => [c, []]));
const used = new Set(), failed = [];
const collect = async (name, fn) => {
  try { const rows = await fn(); if (rows.length) used.add(name); return rows; }
  catch (error) { failed.push(`${name}: ${error.message}`); return []; }
};

for (const country of COUNTRIES) {
  byCountry[country].push(...await collect('Adzuna', () => adzuna(country)));
  byCountry[country].push(...await collect('The Muse', () => muse(country)));
  byCountry[country].push(...await collect('Jobicy', () => jobicy(country)));
  await sleep(1200);
}
byCountry.france.push(...await collect('France Travail', franceTravail));
for (const row of await collect('Company career sites', companyCareerSites)) byCountry[row.country].push(row);
for (const row of await collect('Arbeitnow', arbeitnow)) byCountry[row.country].push(row);

const cutoff = Date.now() - MAX_AGE_DAYS * 864e5;
const countries = {};
for (const country of COUNTRIES) {
  const seen = new Set();
  // Newest first; on-site roles lead, remote roles fill the rest (at most a third when on-site roles exist).
  // The same job on a board and on the company's own site keeps the company's listing.
  const fresh = byCountry[country]
    .filter((j) => j.direct || new Date(j.posted).getTime() >= cutoff)
    .sort((a, b) => (b.direct ? 1 : 0) - (a.direct ? 1 : 0))
    .filter((j) => { const k = `${j.title}|${j.company}`.toLowerCase().replace(/[^a-z0-9|]+/g, ''); if (seen.has(k)) return false; seen.add(k); return true; })
    .sort((a, b) => new Date(b.posted) - new Date(a.posted));
  const onsite = fresh.filter((j) => !j.remote);
  const remoteRoom = onsite.length ? Math.max(Math.round(PER_COUNTRY / 3), PER_COUNTRY - onsite.length) : PER_COUNTRY;
  const remote = fresh.filter((j) => j.remote).slice(0, remoteRoom);
  countries[country] = [...onsite.slice(0, PER_COUNTRY - remote.length), ...remote];
}

const total = Object.values(countries).reduce((n, rows) => n + rows.length, 0);
if (!total) {
  console.warn(`Jobs feed: no listings fetched (${failed.join('; ')}); keeping the previous files.`);
} else {
  // Descriptions go into small chunk files; the list keeps a pointer to its chunk.
  await rm(`${DIR}/desc`, { recursive: true, force: true });
  await mkdir(`${DIR}/desc`, { recursive: true });
  const list = {};
  for (const country of COUNTRIES) {
    const rows = countries[country];
    list[country] = [];
    for (let i = 0; i < rows.length; i += CHUNK) {
      const chunk = `${country}-${i / CHUNK}`;
      const part = rows.slice(i, i + CHUNK);
      await writeFile(`${DIR}/desc/${chunk}.json`, JSON.stringify(Object.fromEntries(part.map((j) => [j.id, j.description || j.summary]))));
      for (const { description, direct: _direct, ...rest } of part) list[country].push({ ...rest, d: description ? chunk : null });
    }
  }
  for (const country of COUNTRIES) await writeFile(`${DIR}/list-${country}.json`, JSON.stringify(list[country]));
  await writeFile(OUT, JSON.stringify({ updatedAt: new Date().toISOString(), sources: [...used], counts: Object.fromEntries(COUNTRIES.map((c) => [c, list[c].length])) }));
  console.log(`Jobs feed: ${total} listings from ${[...used].join(', ') || 'no source'}${failed.length ? ` · skipped ${failed.length} failed request(s): ${failed.join('; ')}` : ''}.`);
  for (const c of COUNTRIES) console.log(`  ${c}: ${countries[c].length}`);
}
