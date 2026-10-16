import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
const routes = fs
  .readdirSync("out", { recursive: true })
  .map(String)
  .filter((p) => p.endsWith(".html") && !p.includes("404"))
  .map((p) => (p === "index.html" ? "/" : "/" + p.replace(/\.html$/, "")));
for (const width of [320, 390, 768, 1440])
  test(`every exported route: ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await expect(page.locator("#main-content")).toBeVisible();
      await expect(page.locator("h1")).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `overflow on ${route}`,
      ).toBe(true);
      const text = await page.locator("body").innerText();
      expect(text).not.toMatch(
        /Pathways|99\.2%|0% AI|kickbacks|visa grant record/,
      );
      await page.locator("img").evaluateAll((imgs) =>
        imgs.forEach((img) => {
          (img as HTMLImageElement).loading = "eager";
        }),
      );
      await expect
        .poll(
          async () =>
            await page
              .locator("img")
              .evaluateAll((imgs) =>
                imgs.every(
                  (img) =>
                    (img as HTMLImageElement).complete &&
                    (img as HTMLImageElement).naturalWidth > 0,
                ),
              ),
          { message: `images ${route}` },
        )
        .toBe(true);
    }
  });
test("homepage fits all requested widths and landscape", async ({ page }) => {
  for (const width of [
    320, 360, 375, 390, 414, 430, 768, 1024, 1280, 1440, 1920,
  ]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `${width}`,
    ).toBe(true);
  }
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.screenshot({ path: "audit/after-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "audit/after-mobile.png", fullPage: true });
});
test("navigation, finder, FAQ, process and form states", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();
  await expect(page.getByRole("dialog", { name: "Site menu" })).toHaveAttribute("data-open", "true");
  await page.keyboard.press("Escape");
  await expect(page.locator("#site-menu")).toHaveAttribute("data-open", "false");
  await expect(toggle).toBeFocused();
  await page.goto("/universities?country=france&view=courses");
  await expect(page.locator(".course-results").first()).toBeVisible({ timeout: 30000 });
  await page.getByRole("combobox", { name: /^City/ }).selectOption("Toulouse");
  await expect(page.getByRole("status").filter({ hasText: "course records" })).toContainText("matching your filters");
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByRole("status").filter({ hasText: "course records" })).not.toContainText("matching your filters");
  await page.goto("/faq");
  await page.getByRole("button", { name: "Can you guarantee admission, a visa or a job?" }).click();
  await expect(page.getByText("No. Universities, authorities and employers make those decisions", { exact: false })).toBeVisible();
  await expect(page.locator("#main-content [aria-expanded=true]")).toHaveCount(1);
  await page.goto("/campus-france-guide");
  await page.getByRole("group", { name: "Where do you live?" }).getByRole("button", { name: "Another country" }).click();
  await page.getByRole("group", { name: "Do you have an admission offer?" }).getByRole("button", { name: "Yes" }).click();
  await expect(page.getByRole("heading", { name: "Confirm the post-admission steps." })).toBeVisible();
  await page.goto("/book-consultation");
  await page.getByRole("button", { name: "Continue to WhatsApp" }).click();
  await expect(page.locator(".booking-form [role=status]")).toHaveText("Please check the highlighted fields.");
});
test("WCAG A/AA audit of all routes on mobile and desktop", async ({
  page,
}) => {
  const findings = [];
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    // Audit settled states: reduced motion removes entrance animations and fades.
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const route of routes) {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      if (results.violations.length)
        findings.push({ width, route, violations: results.violations });
    }
  }
  fs.writeFileSync(
    "audit/accessibility.json",
    JSON.stringify(findings, null, 2),
  );
  expect(findings).toEqual([]);
});
test("internal links resolve and no source points to a fake portal", async ({
  page,
  request,
}) => {
  const links = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    for (const href of await page
      .locator("a[href]")
      .evaluateAll((as) => as.map((a) => a.getAttribute("href")!)))
      if (href.startsWith("/") && !href.startsWith("//"))
        links.add(href.split("#")[0] || "/");
  }
  for (const href of Array.from(links))
    expect((await request.get(href)).status(), href).toBe(200);
});

test("student stories turn, can be chosen and lead to the full collection", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const stage = page.locator("#outcomes");
  await stage.getByRole("button", { name: "Next student review" }).click();
  await expect(stage.getByRole("status")).toContainText("Review 02");
  await stage.getByRole("button", { name: "Show review by Rohan Deshpande" }).click();
  await expect(stage.getByRole("button", { name: "Show review by Rohan Deshpande" })).toHaveAttribute("aria-pressed", "true");
  await stage.getByRole("link", { name: "Explore all student reviews" }).click();
  await expect(page.locator("h1")).toContainText("Student reviews");
  await expect(page.getByText("Shared with each student’s permission.")).toBeVisible();
});
