import { test, expect, type Page } from "@playwright/test";
import { bookingSchema, buildConsultationWhatsAppUrl, enquirySchema } from "../src/lib/consultation";
import { brand } from "../src/config/brand";

const sample = {
  fullName: "Asha Rao", email: "asha.rao@gmail.com", phone: "+91 9876543210", targetCountry: "France",
  currentStatus: "Working professional", level: "Master's", intake: "September 2027",
  background: "BSc Computer Science, 2023, 8.2 CGPA", experience: "Data analyst, 2 years",
  challenges: "Choosing between France and Germany", message: "Masters in France", preferredTime: "Weekdays 4 pm IST",
};

test("WhatsApp message carries the profile, sanitizes input, skips empty fields, and bounds Unicode URLs", () => {
  const url = buildConsultationWhatsAppUrl(sample);
  expect(url.startsWith(`https://wa.me/${brand.whatsappNumber}?text=`)).toBe(true);
  const text = new URL(url).searchParams.get("text")!;
  expect(text.split("\n")[0]).toBe("Bonjour Althéa, I'd like to book a consultation.");
  for (const line of ["Name: Asha Rao", "Email: asha.rao@gmail.com", "Current status: Working professional", "Academic background: BSc Computer Science, 2023, 8.2 CGPA", "Challenges: Choosing between France and Germany"]) expect(text).toContain(line);
  const booked = new URL(buildConsultationWhatsAppUrl(sample, "Tue 28 Oct, 14:30 IST")).searchParams.get("text")!;
  expect(booked).toContain("I've booked a consultation.");
  expect(booked).toContain("Booked call: Tue 28 Oct, 14:30 IST");
  const minimal = buildConsultationWhatsAppUrl({ fullName: "  <b>Asha</b>\n Rao  ", email: sample.email, message: sample.message });
  expect(new URL(minimal).searchParams.get("text")).toContain("Name: Asha Rao");
  expect(new URL(minimal).searchParams.get("text")).not.toMatch(/Phone:|Academic background:|Preferred time/);
  const long = buildConsultationWhatsAppUrl({ ...sample, fullName: "😀".repeat(80), background: "界".repeat(300), challenges: "😀".repeat(500), message: "😀".repeat(400) }, "Tue 28 Oct, 14:30 IST");
  expect(long.length).toBeLessThanOrEqual(1800);
  expect(new URL(long).searchParams.get("text")).toContain("Booked call: Tue 28 Oct, 14:30 IST");
  expect(enquirySchema.safeParse({ ...sample, fullName: "<b></b>" }).success).toBe(false);
  expect(enquirySchema.safeParse({ ...sample, email: "asha@gmail" }).success).toBe(false);
  expect(bookingSchema.safeParse({ ...sample, phone: "" }).success).toBe(false);
  expect(bookingSchema.safeParse({ ...sample, challenges: " " }).success).toBe(false);
  expect(bookingSchema.safeParse(sample).success).toBe(true);
});

async function fillSteps(page: Page) {
  const form = page.locator(".booking-form");
  await form.getByLabel("Full name").fill(sample.fullName);
  await form.getByLabel("WhatsApp number").fill(sample.phone);
  await form.getByLabel("Email").fill(sample.email);
  await form.getByRole("button", { name: "Continue" }).click();
  await expect(form.getByText("Help Harshita prepare.")).toBeVisible();
  await form.getByLabel("Where are you right now?").selectOption(sample.currentStatus);
  await form.getByLabel("Your education background").fill(sample.background);
  await form.getByLabel("The problems you are facing").fill(sample.challenges);
  await form.getByLabel("What do you want from this call?").fill(sample.message);
  await form.getByRole("button", { name: "Continue" }).click();
  await expect(form.getByText("Pick your time.")).toBeVisible();
  return form;
}

for (const width of [320, 390, 1440]) test(`booking form at ${width}px: steps, validation and WhatsApp fallback when the calendar is unreachable`, async ({ page }) => {
  const errors: string[] = [];
  await page.route("https://script.google.com/**", route => route.abort("failed"));
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error" && !/Failed to load resource|ERR_FAILED/.test(message.text())) errors.push(message.text()); });
  await page.setViewportSize({ width, height: 900 });
  await page.goto("/book-consultation");
  const form = page.locator(".booking-form");
  await expect(form.getByRole("button", { name: "Continue to WhatsApp" })).toHaveCount(0);
  await form.getByRole("button", { name: "Continue" }).click();
  await expect(form.locator(".ms-form-status")).toHaveText("Please check the highlighted fields.");
  await expect(form.getByLabel("Full name")).toBeFocused();
  await fillSteps(page);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  for (const control of await form.locator("input:not(.bk-honey), select, textarea, button").all()) {
    if (!(await control.isVisible())) continue;
    expect((await control.boundingBox())!.height).toBeGreaterThanOrEqual(40);
  }
  await form.screenshot({ path: `audit/consultation-${width}.png` });
  let captured = "";
  await page.route("https://wa.me/**", async route => { captured = route.request().url(); await route.abort("aborted"); });
  await form.getByRole("button", { name: "Book now" }).click({ noWaitAfter: true });
  await expect.poll(() => captured).toContain(encodeURIComponent("Challenges: Choosing between France and Germany"));
  await expect(form.getByRole("link", { name: "Not redirected? Open WhatsApp" })).toHaveAttribute("href", captured);
  expect(errors).toEqual([]);
});

test("preview booking: pick a 15-minute slot, book, and see the confirmation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/book-consultation?preview=booking");
  const form = await fillSteps(page);
  await expect(form.getByText("Preview: these are sample times.")).toBeVisible();
  await expect(form.locator(".bk-times button").first()).toBeVisible();
  await form.getByRole("button", { name: "Book now" }).click();
  await expect(form.locator(".ms-form-status")).toHaveText("Choose a time for your call.");
  await form.locator(".bk-times button").first().click();
  await expect(form.locator(".bk-picked")).toBeVisible();
  await form.getByRole("button", { name: "Book now" }).click();
  const done = page.locator(".bk-done");
  await expect(done.getByText("See you soon,")).toBeVisible();
  await expect(done.getByRole("link", { name: "Open your Meet link" })).toHaveAttribute("href", /meet\.google\.com/);
  await expect(done.getByText(sample.email)).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await done.screenshot({ path: "audit/consultation-booked-390.png" });
});
