import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const base = process.env.BASE_URL || "http://127.0.0.1:3000";
const widths = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440];
const routes = ["/", "/france", "/france/universities", "/france/programmes", "/france/campus-france", "/france/institutions", "/france/resources", "/france/scholarships", "/france/visas", "/france/living", "/france/costs", "/france/faq", "/scholarships", "/faq", "/outcomes", "/admissions-process", "/mentorship-model"];
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
     await page.locator('[data-hydrated="true"]').waitFor({ timeout: 15000 });
     const cards = page.locator("article");
     if (await cards.count() < 5) failures.push(`University directory at ${width}px: fewer than 5 entries`);
     await page.getByRole("searchbox").fill("Sorbonne");
     try { await page.waitForFunction(() => document.querySelectorAll("article").length === 1, null, { timeout: 5000 }); } catch { failures.push(`University search at ${width}px did not filter to Sorbonne`); }
     await page.getByRole("searchbox").first().fill("");
    }
    if (route === "/france/programmes") {
     await page.locator('[data-hydrated="true"]').waitFor({ timeout: 15000 });
     const cards = page.locator("article");
     if (await cards.count() < 7) failures.push(`Programme directory at ${width}px: fewer than 7 examples`);
     await page.getByRole("searchbox").first().fill("Physics");
     try { await page.waitForFunction(() => document.querySelectorAll("article").length === 1, null, { timeout: 5000 }); } catch { failures.push(`Programme search at ${width}px did not filter to Physics`); }
     await page.getByRole("searchbox").fill("");
    }
    if (route === "/" && width === 390) {
     const form = page.getByRole("button", { name: /Submit your enquiry/i });
     if (!(await form.isVisible())) failures.push("Home at 390px: enquiry form missing");
    }
    if (route === "/france/programmes" && width === 390) {
     await page.route("https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-mon_master/records*", async route => {
      await route.fulfill({status:200,contentType:"application/json",body:JSON.stringify({total_count:1,results:[{mention:"Computer Science Master",etablissement:"Université de Paris",ville:"Paris",annee:2025}]})});
     });
     await page.getByRole("button",{name:"Browse records"}).click();
     try { await page.getByRole("heading",{name:"Computer Science Master"}).waitFor({timeout:6000}); }
     catch { failures.push("Official Master archive mock integration failed at 390px"); }
     await page.route("https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-cartographie_formations_parcoursup/records*", async route => {
      await route.fulfill({status:200,contentType:"application/json",body:JSON.stringify({total_count:1,results:[{lib_for_voe_ins:"BUT - Information communication",g_ea_lib_vx:"IUT de Paris",ville_etab:"Paris",session:"2026"}]})});
     });
     await page.getByRole("tab",{name:/Bachelor.s-level programme data/}).click();
     await page.getByRole("button",{name:"Browse records"}).click();
     try { await page.getByRole("heading",{name:"BUT - Information communication"}).waitFor({timeout:6000}); }
     catch { failures.push("Official Parcoursup undergraduate archive mock integration failed at 390px"); }
    }
    if (route === "/france/institutions" && width === 390) {
     await page.route("https://data.enseignementsup-recherche.gouv.fr/api/**", route => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ total_count: 2, results: [{etablissement_id_paysage:"a",uo_lib:"Université Demo A",com_nom:"Paris",reg_nom:"Île-de-France",type_d_etablissement:["Université"],url:"https://example.com",secteur_d_etablissement:"public"},{etablissement_id_paysage:"b",uo_lib:"Université Demo B",com_nom:"Lyon",reg_nom:"Auvergne",type_d_etablissement:["Université"],url:"https://example.com",secteur_d_etablissement:"public"}]}) }));
     await page.getByRole("button", { name: /Load official institutions/i }).click();
     try { await page.getByRole("heading", { name: "2 matching institutions" }).waitFor({ timeout: 6000 }); } catch { failures.push("Registry mock API integration failed at 390px"); }
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
     if (route === "/" && width === 390) {
      const badImages = await page.locator("img").evaluateAll(images => images.filter(img => img.complete && img.naturalWidth === 0).map(img => img.getAttribute("src")));
      if (badImages.length) failures.push("Home contains broken images: "+badImages.join(", "));
     }
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
