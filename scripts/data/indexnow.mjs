// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver) about every page in the
// live sitemap. Run after a deploy: `npm run indexnow`. Google does not use IndexNow.
import { readdir } from 'node:fs/promises';

const HOST = 'altheaconsulting.in';
const keyFile = (await readdir('public')).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('No IndexNow key file (32 hex characters) in public/');
const key = keyFile.replace('.txt', '');

const sitemap = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${keyFile}`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs → HTTP ${res.status} ${res.statusText}`);
if (res.status >= 400) process.exitCode = 1;
