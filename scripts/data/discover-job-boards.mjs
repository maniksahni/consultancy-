// Finds employers whose public applicant-tracking job boards list roles in our seven destinations.
// Each candidate name is tried on Greenhouse, Lever (US and EU), Ashby, SmartRecruiters, Workable,
// Recruitee and Personio; boards with at least one role in a destination are saved to
// scripts/data/job-boards.json, which fetch-jobs.mjs reads. Re-run to pick up new employers:
//   node scripts/data/discover-job-boards.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { placeOf } from './job-places.mjs';

const OUT = 'scripts/data/job-boards.json';
const UA = 'AltheaConsulting-JobsFeed/1.2 (+https://altheaconsulting.in/jobs)';

const NAMES = `
Doctolib|Datadog|Algolia|Mirakl|Dataiku|Alan|Qonto|Pennylane|Swile|Agicap|Aircall|Ogury|Contentsquare|Back Market|BlaBlaCar|Criteo|Deezer|Spendesk|PayFit|Ledger|Pigment|Malt|Ornikar|Vestiaire Collective|Ankorstore|Lydia|Sorare|Voodoo|Getaround|Ulule|ManoMano|Welcome to the Jungle|JobTeaser|Shift Technology|Younited|Libeo|Partoo|Yousign|Meero|Luko|Side|Cegid|Sezane|Botify|Ivalua|Brevo|Sendinblue|Believe|Lacoste|Mistral AI|Gorgias|Exotec|Owkin|Lifen|Withings|Dougs|Payplug|Lemonway|Mangopay|October|Moonshot|Leboncoin|Vinted|BackMarket|Akeneo|Sendcloud|Hivebrite|Skello|Matera|Shine|Spliit|Ector|Cityscoot|Zenchef|Sunday|Ynsect|Ilek|Hellowork|Indy|Swan|Upway|Electra|Beam|Kard|Margo Bank|Fabriq|Livestorm|Lucca|Dashlane|Alma|Pretto|Heetch|Frichti|Cajoo|Dott|Tier|Qover|Ankorstore|Treezor|Hipay|Fintecture|Pricemoov|Wakam|Seyna|Stuart|Ubble|Datasnipper|Hugging Face|Photoroom|Dust|Poolside|H Company|Nabla|Gladia|LightOn|Kili Technology|Giskard|Zama|Pasqal|Quandela|Alice and Bob|Sightness|Cosmian|Flowdesk|Ramify|Finary|Yomoni|Nickel|Boursorama|Lunchr|Tiller|Zelros|Akur8|Descartes Underwriting|Leocare|Getquanty|Tracktor|Padoa|Doctrine|Legalstart|Captain Contrat|Hiboo|Wizbii|OpenClassrooms|Livementor|Studi|Ironhack|Le Wagon|Coursera|Docebo|360Learning|Teach Up|Simplon|Platform.sh|Scaleway|OVHcloud|Clever Cloud|Sqreen|Alan Health|Kelvin|Cedar|
Ubisoft|Ubisoft2|Accor|Sodexo|LVMH|Saint-Gobain|SaintGobain|Thales|Airbus|Safran|Dassault Systemes|Capgemini|Sopra Steria|Atos|Eviden|Orange|Alstom|Valeo|Veolia|Engie|TotalEnergies|Schneider Electric|Michelin|Danone|LOreal|Renault|Stellantis|Carrefour|Decathlon|Leroy Merlin|Kering|Hermes|Chanel|Pernod Ricard|Bouygues|Vinci|Sanofi|Servier|Ipsen|bioMerieux|Legrand|Publicis|Publicis Groupe|Havas|Ipsos|BNP Paribas|Societe Generale|Credit Agricole|AXA|Natixis|Amundi|Allianz|Mazars|Forvis Mazars|Deloitte|KPMG|EY|PwC|Accenture|McKinsey|BCG|Bain|Oliver Wyman|Roland Berger|Wavestone|Devoteam|Alten|Akkodis|Expleo|Assystem|Segula|Infosys|Wipro|TCS|HCLTech|Tech Mahindra|Cognizant|Mphasis|LTIMindtree|Zensar|
Stripe|Airbnb|Figma|Cloudflare|MongoDB|Elastic|GitLab|HubSpot|Dropbox|Pinterest|Reddit|Discord|Twilio|Okta|Databricks|Snowflake|Monzo|Wise|Deliveroo|N26|Celonis|Personio|HelloFresh|Delivery Hero|Trade Republic|Intercom|Toast|Robinhood|Coinbase|Lyft|Asana|Airtable|Squarespace|Duolingo|Grammarly|Brex|Plaid|Affirm|Chime|DoorDash|Instacart|Roblox|Epic Games|Riot Games|Unity|Canva|Atlassian|Anthropic|OpenAI|Scale AI|Samsara|Fivetran|Adyen|Booking|GetYourGuide|SumUp|Klarna|Miro|Babbel|Contentful|Mollie|Bolt|Cognite|Workato|Notion|Ramp|Linear|Vercel|Supabase|Deel|Revolut|Synthesia|ElevenLabs|Lovable|Perplexity|Docker|PostHog|Clay|Cohere|Runway|Spotify|Palantir|Netflix|Zopa|Shopify|Wealthsimple|Faire|Benevity|Clio|Hootsuite|Lightspeed|Coveo|Dialogue|Nuvei|Ada|Cohere Health|Thinkific|Jobber|Vena|KOHO|Neo Financial|Clearco|Hopper|Dapper Labs|Shakepay|Wattpad|Ritual|Course Hero|Top Hat|League|Wave|Freshbooks|PointClickCare|Ceridian|Dayforce|Kinaxis|Open Text|Nulogy|Uberflip|
Canva|Atlassian|Afterpay|Airwallex|Culture Amp|SafetyCulture|Linktree|Employment Hero|Deputy|Rokt|Zip|Tyro|Judo Bank|Xero|Envato|Immutable|Eucalyptus|Go1|Octopus Deploy|Buildkite|Siteminder|Prospa|Brighte|Amber|Mable|Hnry|Tanda|Instaclustr|Pet Circle|Vow|Leonardo.ai|Harrison.ai|Canva Australia|Airtasker|Seek|REA Group|Carsales|Domain|Nine|Telstra|Optus|
Intercom|Stripe Dublin|Workhuman|Fenergo|Wayflyer|Flipdish|Tines|Manna|LetsGetChecked|Personio Dublin|Toast Dublin|HubSpot Dublin|Zendesk|Squarespace Dublin|Indeed|Glofox|Teamwork|CarTrawler|Version 1|Kitman Labs|Nuritas|Evervault|Fire|Payslip|Learnosity|Mailchimp|Etsy|Qualtrics|Salesforce|Workday|Amazon|Google|Meta|Microsoft|Apple|LinkedIn|TikTok|ByteDance|Bytedance|Uber|eBay|PayPal|Visa|Mastercard|American Express|
Monzo|Starling Bank|Revolut|Wise|Checkout.com|GoCardless|Thought Machine|Darktrace|Deliveroo|Ocado|ASOS|Gymshark|Cazoo|Cera|Babylon|Zilch|Curve|Tide|Funding Circle|OakNorth|Octopus Energy|Ovo|Bulb|Improbable|Snyk|Paddle|Hopin|Multiverse|Sky|BT|Vodafone|BBC|Arm|DeepMind|Graphcore|Wayve|Synthesia|Lendable|Marshmallow|Cleo|Moneybox|Freetrade|Nutmeg|Onfido|Truelayer|Yapily|Primer|Pleo|Duffel|Beamery|Paysend|Unmind|Peak|Huma|Quantexa|Signal AI|Faculty|Tractable|PolyAI|Builder.ai|Motorway|Zego|By Miles|Cuvva|Lyst|Farfetch|Depop|Trainline|Skyscanner|Just Eat|Deliveroo|Bloom and Wild|Papier|Hims|
Zalando|Celonis|Personio|N26|Trade Republic|HelloFresh|Delivery Hero|GetYourGuide|Flix|FlixBus|Auto1|Contentful|Babbel|SoundCloud|Raisin|Scalable Capital|Solaris|Mambu|Forto|Sennder|Taxfix|Wefox|Clark|Enpal|1Komma5|Sono Motors|Lilium|Volocopter|Isar Aerospace|Helsing|Aleph Alpha|DeepL|Black Forest Labs|Parloa|Staffbase|Pitch|Miro|Trivago|Zattoo|Komoot|Doctolib Germany|Ottonova|Freeletics|Gorillas|Flink|Tier Mobility|Grover|Moia|Siemens|SAP|Bosch|BoschGroup|Continental|Adidas|Puma|BMW|Mercedes-Benz|Volkswagen|Porsche|Allianz|Deutsche Telekom|Infineon|Zeiss|Henkel|BASF|Bayer|Merck|Lufthansa|DHL|Rocket Internet|Westwing|Home24|Mytheresa|About You|Omio|Blinkist|Ada Health|Adjust|Productsup|Choco|Agora|Billie|Pliant|Moss|Qonto Germany|Finom|Upvest|Lemon Markets|
Equinix|ServiceNow|Okta|Splunk|Datadog|Twilio|Zoom|Slack|Asana|Monday|Wix|Fiverr|Payoneer|Rapyd|Riskified|Gong|Snyk|Wiz|Check Point|CyberArk|SentinelOne|CrowdStrike|Palo Alto Networks|Zscaler|Cloudflare|Fastly|Akamai|HashiCorp|Confluent|Cockroach Labs|Grafana Labs|Sentry|Postman|Retool|Webflow|Zapier|Calendly|Loom|Gusto|Rippling|Mercury|Carta|Benchling|Flexport|Anduril|SpaceX|Rivian|Lucid|Waymo|Cruise|Aurora|Nuro|Zoox|Scale|Hugging Face|Weights and Biases|Pinecone|Replit|Cursor|Anysphere|Character AI|Mistral|Inflection|Adept|Glean|Harvey|Jasper|Writer|Typeface|Synthflow
`;

const slugs = (name) => {
  const base = name.trim();
  const lower = base.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  return [...new Set([base.replace(/[^A-Za-z0-9]/g, ''), lower.replace(/[^a-z0-9]/g, ''), lower.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')])].filter(Boolean);
};

async function get(url, as = 'json') {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(8000), redirect: 'follow' });
    if (!res.ok) return null;
    return as === 'json' ? await res.json() : await res.text();
  } catch { return null; }
}

// Each probe returns the job locations on that board, or null when the board does not exist.
const PROVIDERS = {
  greenhouse: async (s) => (await get(`https://boards-api.greenhouse.io/v1/boards/${s}/jobs`))?.jobs?.map((j) => j.location?.name),
  lever: async (s) => { const d = await get(`https://api.lever.co/v0/postings/${s}?mode=json`); return Array.isArray(d) && d.length ? d.map((j) => [j.categories?.location, ...(j.categories?.allLocations || [])].join(' · ')) : null; },
  levereu: async (s) => { const d = await get(`https://api.eu.lever.co/v0/postings/${s}?mode=json`); return Array.isArray(d) && d.length ? d.map((j) => [j.categories?.location, ...(j.categories?.allLocations || [])].join(' · ')) : null; },
  ashby: async (s) => (await get(`https://api.ashbyhq.com/posting-api/job-board/${s}`))?.jobs?.map((j) => [j.location, j.address?.postalAddress?.addressCountry, ...(j.secondaryLocations || []).map((l) => l.location)].join(' · ')),
  smartrecruiters: async (s) => { const d = await get(`https://api.smartrecruiters.com/v1/companies/${s}/postings?limit=100`); return d?.totalFound ? d.content.map((p) => [p.location?.city, p.location?.country === 'fr' ? 'France' : p.location?.country === 'gb' ? 'United Kingdom' : p.location?.country === 'de' ? 'Germany' : p.location?.country === 'ie' ? 'Ireland' : p.location?.country === 'ca' ? 'Canada' : p.location?.country === 'au' ? 'Australia' : p.location?.country === 'us' ? 'United States' : ''].join(', ')) : null; },
  workable: async (s) => (await get(`https://apply.workable.com/api/v1/widget/accounts/${s}`))?.jobs?.map((j) => [j.city, j.state, j.country].join(', ')),
  recruitee: async (s) => (await get(`https://${s}.recruitee.com/api/offers/`))?.offers?.map((o) => [o.city, o.country].join(', ')),
  personio: async (s) => { const x = await get(`https://${s}.jobs.personio.de/xml`, 'text'); return x && x.includes('<position>') ? [...x.matchAll(/<office>([^<]*)<\/office>/g)].map((m) => m[1]) : null; },
};

async function pool(items, size, fn) {
  let i = 0;
  await Promise.all(Array.from({ length: size }, async () => { while (i < items.length) await fn(items[i++]); }));
}

const names = [...new Set(NAMES.split(/[|\n]/).map((n) => n.trim()).filter(Boolean))];
const tasks = names.flatMap((name) => Object.keys(PROVIDERS).flatMap((provider) => slugs(name).map((slug) => ({ name, provider, slug }))));
const found = new Map(); // provider:slug -> board
console.log(`Probing ${names.length} employers, ${tasks.length} board addresses…`);
let done = 0;
await pool(tasks, 64, async ({ name, provider, slug }) => {
  if (++done % 1000 === 0) console.log(`  ${done}/${tasks.length} checked, ${found.size} boards found`);
  const key = `${provider}:${slug.toLowerCase()}`;
  if (found.has(key)) return;
  const locations = await PROVIDERS[provider](slug);
  if (!locations?.length) return;
  const counts = {};
  for (const l of locations) { const c = placeOf(l); if (c) counts[c] = (counts[c] || 0) + 1; }
  if (!Object.keys(counts).length) return;
  found.set(key, { provider, slug, company: name.replace(/2$/, '').replace(/Group$/, '').trim(), total: locations.length, counts });
});

// Workday career sites need the tenant, data centre and site name; these are known employers.
const WORKDAY = `Sanofi sanofi/wd3/SanofiCareers|Airbus ag/wd3/Airbus|Thales thales/wd3/Careers|Pernod Ricard pernodricard/wd3/pernod-ricard|PwC pwc/wd3/Global_Experienced_Careers|Accenture accenture/wd103/AccentureCareers|Salesforce salesforce/wd12/External_Career_Site|Adobe adobe/wd5/external_experienced|Mastercard mastercard/wd1/CorporateCareers|Intel intel/wd1/External|NVIDIA nvidia/wd5/NVIDIAExternalCareerSite|AstraZeneca astrazeneca/wd3/Careers|Equinix equinix/wd1/External|Barclays barclays/wd3/External_Career_Site_Barclays|Novartis novartis/wd3/Novartis_Careers|Shell shell/wd3/ShellCareers|BlackRock blackrock/wd1/BlackRock_Professional|HP hp/wd5/ExternalCareerSite|GSK gsk/wd5/GSKCareers|S&P Global spgi/wd5/SPGI_Careers|Philips philips/wd3/jobs-and-careers|Mars mars/wd3/External|Workday workday/wd5/Workday|Citi citi/wd5/2|Pfizer pfizer/wd1/PfizerCareers|Amgen amgen/wd1/Careers|Nike nike/wd1/nke|Boeing boeing/wd1/EXTERNAL_CAREERS|Medtronic medtronic/wd1/MedtronicCareers|Hitachi hitachi/wd1/hitachi`;
await pool(WORKDAY.split('|'), 6, async (line) => {
  const i = line.lastIndexOf(' '); const company = line.slice(0, i), slug = line.slice(i + 1);
  const [tenant, wd, site] = slug.split('/');
  try {
    const res = await fetch(`https://${tenant}.${wd}.myworkdayjobs.com/wday/cxs/${tenant}/${site}/jobs`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'User-Agent': UA }, body: JSON.stringify({ appliedFacets: {}, limit: 1, offset: 0, searchText: '' }), signal: AbortSignal.timeout(20000) });
    const d = await res.json();
    const facets = (d.facets || []).flatMap((f) => [f, ...(f.values || []).filter((v) => v.facetParameter)]);
    const cf = facets.find((f) => (f.values || []).some((v) => /^(france|germany|united kingdom)$/i.test(v.descriptor || '')));
    const counts = {};
    for (const v of cf?.values || []) { const c = placeOf(v.descriptor === 'United States of America' ? 'United States' : v.descriptor); if (c && /^[A-Z][a-z]+( [A-Z][a-z]+)*( of America)?$/.test(v.descriptor)) counts[c] = (counts[c] || 0) + v.count; }
    if (Object.keys(counts).length) found.set(`workday:${slug.toLowerCase()}`, { provider: 'workday', slug, company, total: d.total, counts });
  } catch {}
});

// One board per company name: keep the provider listing the most roles in our countries.
const byCompany = new Map();
for (const b of found.values()) {
  const k = b.company.toLowerCase().replace(/[^a-z0-9]/g, '');
  const sum = (x) => Object.values(x.counts).reduce((a, n) => a + n, 0);
  if (!byCompany.has(k) || sum(b) > sum(byCompany.get(k))) byCompany.set(k, b);
}
let previous = [];
try { previous = JSON.parse(await readFile(OUT, 'utf8')).boards; } catch {}
const merged = new Map(previous.map((b) => [`${b.provider}:${b.slug.toLowerCase()}`, b]));
for (const b of byCompany.values()) merged.set(`${b.provider}:${b.slug.toLowerCase()}`, { provider: b.provider, slug: b.slug, company: b.company, counts: b.counts });
const boards = [...merged.values()].sort((a, b) => a.provider.localeCompare(b.provider) || a.company.localeCompare(b.company));
await writeFile(OUT, JSON.stringify({ updatedAt: new Date().toISOString(), boards }, null, 1) + '\n');
const totals = {};
for (const b of boards) for (const [c, n] of Object.entries(b.counts)) totals[c] = (totals[c] || 0) + n;
console.log(`${boards.length} boards saved to ${OUT}. Roles seen per country:`, totals);
