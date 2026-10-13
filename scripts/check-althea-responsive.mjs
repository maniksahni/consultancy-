import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const base = process.env.BASE_URL || "http://127.0.0.1:3000";
const widths = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440];
const routes = ["/", "/france", "/france/universities", "/france/programmes"];
const failures = [];
await mkdir("artifacts/qa", { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
 for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  page.on("pageerror", error => failures.push(`JS error at ${width}px: ${error.message}`));
  for (const route of routes) {
   try {
    const response = await page.goto(base + route, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.evaluate(() => document.fonts.ready);
    const status = response?.status();
    if (!status || status >= 400) failures.push(`${route} at ${width}px: HTTP ${status}`);
    const h1 = await page.locator("h1").count();
    if (h1 !== 1) failures.push(`${route} at ${width}px: expected one h1, found ${h1}`);
    const overflow = await page.evaluate(() => ({
     documentWidth: document.documentElement.scrollWidth,
     viewportWidth: window.innerWidth
    }));
    if (overflow.documentWidth > overflow.viewportWidth + 2) {
     failures.push(`${route} at ${width}px: horizontal overflow ${overflow.documentWidth} > ${overflow.viewportWidth}`);
    }
    const links = await page.locator('a[href=""], a:not([href])').count();
    if (links) failures.push(`${route} at ${width}px: ${links} links missing destinations`);
    if (route === "/france/universities") {
     const cards = page.locator("article");
     if (await cards.count() < 5) failures.push(`University directory at ${width}px: fewer than 5 entries`);
     await page.getByRole("searchbox").fill("Sorbonne");
     if (await cards.count() !== 1) failures.push(`University search at ${width}px did not filter to Sorbonne`);
     await page.getByRole("searchbox").fill("");
    }
    if (route === "/france/programmes") {
     const cards = page.locator("article");
     if (await cards.count() < 7) failures.push(`Programme directory at ${width}px: fewer than 7 examples`);
     await page.getByRole("searchbox").fill("Physics");
     if (await cards.count() !== 1) failures.push(`Programme search at ${width}px did not filter to Physics`);
     await page.getByRole("searchbox").fill("");
    }
    if (route === "/" && width < 1024) {
     await page.getByRole("button", { name: "Open menu" }).click();
     const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
     if (!(await mobileNav.isVisible())) failures.push(`Mobile menu not visible at ${width}px`);
     await page.keyboard.press("Escape");
     if (await mobileNav.isVisible()) failures.push(`Mobile menu did not close on Escape at ${width}px`);
    }
    if (width === 390 || width === 1440) {
     await page.evaluate(async () => { await Promise.all(Array.from(document.images).map(img => img.decode().catch(() => {}))); });
     const label = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
     await page.screenshot({ path: `artifacts/qa/${label}-${width}.png`, fullPage: true });
    }
    console.log(`PASS ${route} @ ${width}px`);
   } catch (error) { failures.push(`${route} at ${width}px: ${error.message}`); }
  }
  await page.close();
 }
} finally { await browser.close(); }
if (failures.length) { console.error("FAILED QUALITY GATES:\n"+failures.join("\n")); process.exitCode = 1; }
else console.log(`PASS: ${widths.length * routes.length} route/viewport checks plus interactions`);
