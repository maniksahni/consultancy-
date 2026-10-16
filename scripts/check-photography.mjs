// Checks the Paris photography collection: every registered photo exists, has a credit,
// no source is registered twice, and built pages only use photographs from the collection.
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
const root = process.cwd();
const registry = JSON.parse(await readFile(path.join(root, "src/data/parisPhotos.json"), "utf8"));
const issues = [];
const sources = new Map();
for (const [slug, photo] of Object.entries(registry)) {
  if (sources.has(photo.source)) issues.push(`Source repeated: ${sources.get(photo.source)} and ${slug}`);
  sources.set(photo.source, slug);
  if (!photo.photographer || !photo.licence || !photo.alt) issues.push(`Missing credit or alt text: ${slug}`);
  try { await stat(path.join(root, "public", photo.file)); } catch { issues.push(`Missing asset: ${slug} -> ${photo.file}`); }
}
const allowed = new Set(Object.values(registry).map((photo) => photo.file));
const files = [];
async function walk(dir) { for (const entry of await readdir(dir, { withFileTypes: true })) { const f = path.join(dir, entry.name); if (entry.isDirectory()) await walk(f); else if (f.endsWith(".html")) files.push(f); } }
try { await walk(path.join(root, "out")); } catch { console.log("No static export found in out/; skipping page checks."); }
let count = 0;
for (const file of files) {
  const html = await readFile(file, "utf8");
  for (const match of html.matchAll(/["'(](\/images\/[^"')?\s\\]+)/g)) {
    count++;
    if (!allowed.has(match[1])) issues.push(`${path.relative(root, file)} uses an uncredited image: ${match[1]}`);
  }
}
if (issues.length) { console.error([...new Set(issues)].join("\n")); process.exit(1); }
console.log(`Photography OK: ${Object.keys(registry).length} credited photos, ${count} placements across ${files.length} pages.`);
