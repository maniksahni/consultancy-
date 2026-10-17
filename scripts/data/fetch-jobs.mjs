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
import { mkdir, rm, writeFile } from 'node:fs/promises';

const DIR = 'public/data/jobs';
const OUT = `${DIR}/live.json`;
const MAX_AGE_DAYS = 45;
const PER_COUNTRY = 900;
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

// Arbeitnow covers several European countries; place each listing by its city.
const CITY_COUNTRY = [
  [/france|paris|lyon|toulouse|marseille|nice|nantes|bordeaux|lille|strasbourg|montpellier|rennes|grenoble|sophia antipolis|la défense|la defense/i, 'france'],
  [/united kingdom|\buk\b|england|scotland|london|manchester|edinburgh|birmingham|glasgow|bristol|leeds|cambridge|oxford|reading|belfast/i, 'uk'],
  [/ireland|dublin|cork|galway|limerick/i, 'ireland'],
  [/germany|deutschland|berlin|munich|münchen|hamburg|frankfurt|cologne|köln|stuttgart|düsseldorf|dusseldorf|leipzig|dresden|hannover|nuremberg|nürnberg|bremen|essen|dortmund|bonn|karlsruhe|mannheim|heidelberg|freiburg|münster|aachen|augsburg|wiesbaden|potsdam|darmstadt|rosenheim|regensburg|ulm|kiel|lübeck|mainz|bochum|duisburg|wuppertal|bielefeld|braunschweig|kassel|erlangen|ingolstadt|würzburg|jena|magdeburg|rostock|saarbrücken|baden|bayern|bavaria|hessen|nordrhein|sachsen|thüringen|niedersachsen|brandenburg/i, 'germany'],
  [/canada|toronto|vancouver|montr[ée]al|ottawa|calgary|edmonton|waterloo|ontario|qu[ée]bec|british columbia|alberta/i, 'canada'],
  [/australia|sydney|melbourne|brisbane|perth|adelaide|canberra|new south wales|victoria, au|queensland/i, 'australia'],
  [/united states|\busa?\b|new york|san francisco|seattle|boston|chicago|austin|los angeles|denver|atlanta|washington,? d\.?c|miami|dallas|houston|san diego|san jose|palo alto|mountain view|menlo park|sunnyvale|redmond|pittsburgh|philadelphia|portland|salt lake|nashville|raleigh|phoenix|minneapolis|detroit|, (al|ak|az|ar|ca|co|ct|de|fl|ga|hi|id|il|in|ia|ks|ky|la|me|md|ma|mi|mn|ms|mo|mt|ne|nv|nh|nj|nm|ny|nc|nd|oh|ok|or|pa|ri|sc|sd|tn|tx|ut|vt|va|wa|wv|wi|wy)\b/i, 'usa'],
];
const placeOf = (location) => CITY_COUNTRY.find(([re]) => re.test(location || ''))?.[1] || null;

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
// Many employers publish their open roles through their applicant-tracking system's public
// job-board feed (Greenhouse, Lever, Ashby, SmartRecruiters). These feeds exist so anyone can
// list the company's jobs; each listing carries the company's own description and apply link.
const BOARDS = {
  greenhouse: { doctolib: 'Doctolib', datadog: 'Datadog', algolia: 'Algolia', mirakl: 'Mirakl', dataiku: 'Dataiku', dropbox: 'Dropbox', monzo: 'Monzo', n26: 'N26', wise: 'Wise', discord: 'Discord', squarespace: 'Squarespace', figma: 'Figma', twilio: 'Twilio', airbnb: 'Airbnb', intercom: 'Intercom', pinterest: 'Pinterest', asana: 'Asana', robinhood: 'Robinhood', gitlab: 'GitLab', toast: 'Toast', reddit: 'Reddit', coinbase: 'Coinbase', hellofresh: 'HelloFresh', cloudflare: 'Cloudflare', stripe: 'Stripe', celonis: 'Celonis', elastic: 'Elastic', okta: 'Okta', deliveroo: 'Deliveroo', mongodb: 'MongoDB', duolingo: 'Duolingo', chime: 'Chime', instacart: 'Instacart', lyft: 'Lyft', affirm: 'Affirm', epicgames: 'Epic Games', brex: 'Brex', fivetran: 'Fivetran', samsara: 'Samsara', riotgames: 'Riot Games', roblox: 'Roblox', anthropic: 'Anthropic', databricks: 'Databricks', getyourguide: 'GetYourGuide', cognite: 'Cognite', scaleai: 'Scale AI', contentful: 'Contentful', workato: 'Workato', shifttechnology: 'Shift Technology', ivalua: 'Ivalua', adyen: 'Adyen', sumup: 'SumUp' },
  lever: { spotify: 'Spotify', agicap: 'Agicap', palantir: 'Palantir', swile: 'Swile', ogury: 'Ogury', qonto: 'Qonto', zopa: 'Zopa', aircall: 'Aircall' },
  ashby: { cohere: 'Cohere', linear: 'Linear', notion: 'Notion', ramp: 'Ramp', pennylane: 'Pennylane', photoroom: 'Photoroom', synthesia: 'Synthesia', posthog: 'PostHog', elevenlabs: 'ElevenLabs', perplexity: 'Perplexity', alan: 'Alan', openai: 'OpenAI', docker: 'Docker', lovable: 'Lovable', dust: 'Dust', supabase: 'Supabase' },
  smartrecruiters: { Ubisoft2: 'Ubisoft', BoschGroup: 'Bosch', Sodexo: 'Sodexo', ServiceNow: 'ServiceNow', Accor: 'Accor', Mazars: 'Forvis Mazars', Continental: 'Continental', LVMH: 'LVMH', SaintGobain: 'Saint-Gobain' },
};
const SR_COUNTRY = { france: 'fr', uk: 'gb', usa: 'us', canada: 'ca', germany: 'de', australia: 'au', ireland: 'ie' };
const PER_COMPANY = 30;
const isEntry = (title) => /\b(intern|internship|stage|stagiaire|alternance|alternant|apprenti|apprentice|graduate|junior|trainee|werkstudent|working student|praktikum|new grad|entry)\b/i.test(title);
/** One company's roles in one country: internships and junior roles first, then the newest. */
const capCompany = (rows) => rows.sort((a, b) => (isEntry(b.title) - isEntry(a.title)) || (new Date(b.posted) - new Date(a.posted))).slice(0, PER_COMPANY);
async function pool(items, size, fn) {
  const out = []; let i = 0;
  await Promise.all(Array.from({ length: size }, async () => { while (i < items.length) { const item = items[i++]; try { out.push(...await fn(item)); } catch {} } }));
  return out;
}
const direct = (fields) => { const row = job({ ...fields, source: `${fields.company} careers` }); if (row) row.direct = true; return row; };
const spread = (rows) => {
  const groups = new Map();
  for (const r of rows) { const k = `${r.country}|${r.company}`; groups.set(k, [...(groups.get(k) || []), r]); }
  return [...groups.values()].flatMap(capCompany);
};

async function greenhouse() {
  return spread(await pool(Object.entries(BOARDS.greenhouse), 6, async ([slug, company]) => {
    const data = await getJson(`https://boards-api.greenhouse.io/v1/boards/${slug}/jobs?content=true`);
    return (data.jobs || []).flatMap((j) => {
      const location = j.location?.name || '';
      const country = placeOf(location);
      if (!country) return [];
      const row = direct({ id: `gh-${slug}-${j.id}`, country, title: j.title, company, location, remote: /remote/i.test(location),
        category: j.departments?.[0]?.name, description: j.content, posted: j.first_published || j.updated_at, url: j.absolute_url });
      return row ? [row] : [];
    });
  }));
}

async function lever() {
  return spread(await pool(Object.entries(BOARDS.lever), 4, async ([slug, company]) => {
    const data = await getJson(`https://api.lever.co/v0/postings/${slug}?mode=json`);
    return (Array.isArray(data) ? data : []).flatMap((j) => {
      const location = [j.categories?.location, ...(j.categories?.allLocations || [])].filter(Boolean).join(' · ');
      const country = placeOf(location) || placeOf(j.country === 'FR' ? 'France' : j.country === 'GB' ? 'United Kingdom' : j.country === 'DE' ? 'Germany' : '');
      if (!country) return [];
      const lists = (j.lists || []).map((l) => `<h3>${l.text}</h3><ul>${l.content}</ul>`).join('');
      const row = direct({ id: `lever-${slug}-${j.id}`, country, title: j.text, company, location: [...new Set(location.split(' · '))].join(' · '),
        remote: j.workplaceType === 'remote', type: j.categories?.commitment, category: j.categories?.team,
        description: `${j.description || ''}${lists}${j.additional || ''}`, posted: j.createdAt, url: j.hostedUrl });
      return row ? [row] : [];
    });
  }));
}

async function ashby() {
  return spread(await pool(Object.entries(BOARDS.ashby), 4, async ([slug, company]) => {
    const data = await getJson(`https://api.ashbyhq.com/posting-api/job-board/${slug}?includeCompensation=true`);
    return (data.jobs || []).flatMap((j) => {
      if (j.isListed === false) return [];
      const location = [j.location, j.address?.postalAddress?.addressCountry, ...(j.secondaryLocations || []).map((l) => l.location)].filter(Boolean).join(' · ');
      const country = placeOf(location);
      if (!country) return [];
      const row = direct({ id: `ashby-${slug}-${j.id}`, country, title: j.title, company, location: [...new Set([j.location, ...(j.secondaryLocations || []).map((l) => l.location)].filter(Boolean))].join(' · '), remote: Boolean(j.isRemote),
        type: j.employmentType?.replace(/([a-z])([A-Z])/g, '$1 $2'), category: j.department || j.team,
        salary: j.compensation?.compensationTierSummary || null, description: j.descriptionHtml, posted: j.publishedAt, url: j.jobUrl });
      return row ? [row] : [];
    });
  }));
}

async function smartRecruiters() {
  const lists = await pool(Object.entries(BOARDS.smartrecruiters).flatMap(([slug, company]) => COUNTRIES.map((country) => [slug, company, country])), 6, async ([slug, company, country]) => {
    const data = await getJson(`https://api.smartrecruiters.com/v1/companies/${slug}/postings?country=${SR_COUNTRY[country]}&limit=100`);
    const rows = (data.content || []).map((p) => ({ slug, company, country, p }));
    return rows.sort((a, b) => (isEntry(b.p.name) - isEntry(a.p.name)) || (new Date(b.p.releasedDate) - new Date(a.p.releasedDate))).slice(0, PER_COMPANY);
  });
  return pool(lists, 8, async ({ slug, company, country, p }) => {
    const d = await getJson(`https://api.smartrecruiters.com/v1/companies/${slug}/postings/${p.id}`);
    const sections = d.jobAd?.sections || {};
    const html = ['companyDescription', 'jobDescription', 'qualifications', 'additionalInformation']
      .map((k) => sections[k]?.text ? `<h3>${sections[k].title || ''}</h3>${sections[k].text}` : '').join('');
    const loc = [p.location?.city, p.location?.region, COUNTRY_NAMES[country]].filter(Boolean).join(', ');
    const row = direct({ id: `sr-${slug}-${p.id}`, country, title: p.name, company, location: loc, remote: Boolean(p.location?.remote),
      type: p.typeOfEmployment?.label, category: p.function?.label || p.department?.label, level: p.experienceLevel?.label,
      description: html, posted: p.releasedDate, url: d.postingUrl || `https://jobs.smartrecruiters.com/${slug}/${p.id}` });
    return row ? [row] : [];
  });
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
for (const [name, fn] of [['Company career sites', greenhouse], ['Company career sites', lever], ['Company career sites', ashby], ['Company career sites', smartRecruiters]]) {
  for (const row of await collect(name, fn)) byCountry[row.country].push(row);
}
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
