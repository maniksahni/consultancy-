import { test, expect } from "@playwright/test";
import { buildConsultationWhatsAppUrl, enquirySchema } from "../src/lib/consultation";
import { brand } from "../src/config/brand";

const sample = { fullName: "Asha Rao", phone: "+91 9876543210", targetCountry: "France", background: "BSc Computer Science", message: "Masters in France", preferredTime: "Weekdays 4 pm IST" };
test("message includes every detail, sanitizes input, skips empty fields, and bounds Unicode URLs", () => {
  const url = buildConsultationWhatsAppUrl(sample);
  expect(url.startsWith(`https://wa.me/${brand.whatsappNumber}?text=`)).toBe(true);
  expect(new URL(url).searchParams.get("text")).toBe("Bonjour Althéa, I'd like to book a consultation.\nName: Asha Rao\nPhone: +91 9876543210\nStudy destination: France\nAcademic background: BSc Computer Science\nI'd like to explore: Masters in France\nPreferred time & time zone: Weekdays 4 pm IST");
  const minimal = buildConsultationWhatsAppUrl({ ...sample, fullName: "  <b>Asha</b>\n Rao  ", phone: "", background: "", preferredTime: "" });
  expect(new URL(minimal).searchParams.get("text")).toContain("Name: Asha Rao");
  expect(new URL(minimal).searchParams.get("text")).not.toMatch(/Phone:|Academic background:|Preferred time/);
  const long = buildConsultationWhatsAppUrl({ ...sample, fullName: "😀".repeat(80), background: "界".repeat(160), message: "😀".repeat(400), preferredTime: "界".repeat(80) });
  expect(long.length).toBeLessThanOrEqual(1800);
  expect(new URL(long).searchParams.get("text")).toContain("Preferred time & time zone:");
  expect(enquirySchema.safeParse({ ...sample, fullName: "<b></b>" }).success).toBe(false);
  expect(enquirySchema.safeParse({ ...sample, message: "\n\t " }).success).toBe(false);
});

for (const width of [320, 390, 1440]) test(`WhatsApp form at ${width}px: validation, redirect, fallback, and no storage`, async ({ page }) => {
  const errors: string[] = [];
  const writes: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  page.on("request", request => { if (request.method() !== "GET") writes.push(request.url()); });
  await page.setViewportSize({ width, height: 900 });
  await page.goto("/book-consultation");
  const form = page.locator(".booking-form");
  await expect(form.locator('input[type="email"]')).toHaveCount(0);
  await expect(page.getByText("Online enquiries are being configured", { exact: false })).toHaveCount(0);
  await expect(form.locator("[required]")).toHaveCount(2);
  const button = form.getByRole("button", { name: "Request a conversation" });
  await expect(button).toBeEnabled();
  await button.click();
  await expect(form.getByRole("status")).toHaveText("Please check the highlighted fields.");
  await expect(form.getByLabel("Full name")).toBeFocused();
  await form.getByLabel("Full name").fill(sample.fullName);
  await form.getByLabel("Phone number").fill(sample.phone);
  await form.getByLabel("Study destination").selectOption(sample.targetCountry);
  await form.getByLabel("Academic background").fill(sample.background);
  await form.getByLabel("What would you like to explore?").fill(sample.message);
  await form.getByLabel("Preferred time").fill(sample.preferredTime);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  for (const control of await form.locator("input, select, textarea, button").all()) {
    expect((await control.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  }
  await form.screenshot({ path: `audit/consultation-${width}.png` });
  let captured = "";
  // Cancel navigation to simulate a device without a WhatsApp handoff and inspect fallback UI.
  await page.route("https://wa.me/**", async route => { captured = route.request().url(); await route.abort("aborted"); });
  await button.click({ noWaitAfter: true });
  await expect.poll(() => captured).toBe(buildConsultationWhatsAppUrl(sample));
  await expect(form.getByRole("button", { name: "Opening WhatsApp…" })).toBeVisible();
  await expect(form.getByRole("link", { name: "Not redirected? Open WhatsApp" })).toHaveAttribute("href", captured);
  await expect(form.getByText("Submitting opens WhatsApp with your details ready to send.")).toBeVisible();
  expect(writes).toEqual([]);
  expect(errors).toEqual([]);
});
