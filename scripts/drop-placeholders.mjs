// After `next build`: delete the placeholder pages the CMS routes build when nothing is published yet
// (a static export cannot have a dynamic route with zero pages), and the blog index while it has no articles.
import { readFile, rm } from 'node:fs/promises';
const cms = await readFile('src/data/generated/cms.json', 'utf8').then(JSON.parse, () => ({ pages: [] }));
const files = ['out/cms-placeholder.html', 'out/cms-placeholder.txt', 'out/blog/cms-placeholder.html', 'out/blog/cms-placeholder.txt'];
if (!cms.pages.some((p) => p.type === 'blog')) files.push('out/blog.html', 'out/blog.txt');
for (const f of files) await rm(f, { force: true });
