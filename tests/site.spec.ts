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
      await expect(page.locator("main")).toBeVisible();
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
  await page.getByRole("button", { name: "Menu" }).click();
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeHidden();
  await page.goto("/universities");
  await page.getByLabel("City", { exact: true }).selectOption("Toulouse");
  await expect(page.getByRole("status")).toHaveText("1 curated listing");
  await page.getByLabel("Degree", { exact: true }).selectOption("PhD");
  await expect(page.getByText("No curated matches yet.")).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.getByRole("status")).toHaveText("3 curated listings");
  await page.goto("/faq");
  await page
    .getByRole("button", { name: "Can you guarantee admission or a visa?" })
    .click();
  await expect(
    page.getByText("No. Universities decide admissions", { exact: false }),
  ).toBeVisible();
  await expect(page.locator("[aria-expanded=true]")).toHaveCount(1);
  await page.goto("/campus-france-guide");
  await page.getByLabel("Where do you live?").selectOption("Another country");
  await page.getByLabel("Do you have an admission offer?").selectOption("Yes");
  await expect(
    page.getByRole("heading", { name: "Confirm the post-admission steps." }),
  ).toBeVisible();
  await page.goto("/book-consultation");
  await page.getByRole("button", { name: "Request a conversation" }).click();
  await expect(page.getByRole("status")).toHaveText(
    "Please check the highlighted fields.",
  );

});
test("WCAG A/AA audit of all routes on mobile and desktop", async ({
  page,
}) => {
  const findings = [];
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 900 });
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

test("sample reviews and journey guidance work on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Ready to apply" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Turn your shortlist into a considered plan.",
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Planning my arrival" }).click();
  await expect(
    page.getByRole("heading", {
      name: "An offer is a beginning. Plan the life ahead.",
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Next sample review" }).click();
  await expect(
    page.getByText("What I appreciated most", { exact: false }),
  ).toBeVisible();
  await expect(page.getByText("Sample review", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Show sample review 3" }).click();
  await expect(
    page.getByRole("button", { name: "Show sample review 3" }),
  ).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("link", { name: "Explore the review collection" })
    .click();
  await expect(
    page.getByRole("heading", { name: "A journey worth sharing." }),
  ).toBeVisible();
  await expect(
    page.getByText("Genuine client reviews", { exact: false }),
  ).toBeVisible();
});
