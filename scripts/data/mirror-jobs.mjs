// For a content-only publish: copy the job listings the live site already serves instead of refetching
// every job board (about ten minutes). Pair with JOBS_FROM_LIVE=1 so fetch-jobs.mjs keeps these files.
import { mkdir, writeFile } from 'node:fs/promises';

const SITE = 'https://altheaconsulting.in';
const DIR = 'public/data/jobs';
const COUNTRIES = ['france', 'uk', 'usa', 'canada', 'germany', 'ireland', 'australia'];

async function get(path) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(`${SITE}${path}`, { signal: AbortSignal.timeout(30000) });
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${path}`);
      return await res.text();
    } catch (e) {
      if (i >= 3) throw e;
      await new Promise((r) => setTimeout(r, 1500 * i));
    }
  }
}

await mkdir(`${DIR}/desc`, { recursive: true });
await writeFile(`${DIR}/live.json`, await get('/data/jobs/live.json'));
const chunks = new Set();
for (const country of COUNTRIES) {
  const text = await get(`/data/jobs/list-${country}.json`);
  await writeFile(`${DIR}/list-${country}.json`, text);
  for (const job of JSON.parse(text)) if (job.d) chunks.add(job.d);
}
const queue = [...chunks];
await Promise.all(Array.from({ length: 8 }, async () => {
  for (let c = queue.shift(); c; c = queue.shift()) {
    if (!/^[\w-]+$/.test(c)) continue;
    await writeFile(`${DIR}/desc/${c}.json`, await get(`/data/jobs/desc/${c}.json`));
  }
}));
console.log(`Jobs mirrored from the live site: ${COUNTRIES.length} lists, ${chunks.size} description files.`);
