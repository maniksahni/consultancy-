import { test, expect, type Page } from "@playwright/test";
import { bookingSchema, buildConsultationEmailUrl, enquirySchema } from "../src/lib/consultation";
import { brand } from "../src/config/brand";

const sample = {
  fullName: "Asha Rao", email: "asha.rao@gmail.com", phone: "+91 9876543210", targetCountry: "France",
  currentStatus: "Working professional", message: "CV review, Interview preparation", preferredTime: "Weekdays 4 pm IST",
};

test("email fallback carries the details, sanitizes input, skips empty fields, and bounds Unicode URLs", () => {
  const url = buildConsultationEmailUrl(sample);
  expect(url.startsWith(`mailto:${brand.email}?subject=`)).toBe(true);
  const body = decodeURIComponent(url.split("&body=")[1]);
  expect(body.split("\n")[0]).toBe("Bonjour Althéa, I'd like to book a consultation.");
  for (const line of ["Name: Asha Rao", "Email: asha.rao@gmail.com", "Current status: Working professional", "Help I need: CV review, Interview preparation"]) expect(body).toContain(line);
  const booked = decodeURIComponent(buildConsultationEmailUrl(sample, "Tue 28 Oct, 14:30 IST"));
  expect(booked).toContain("I've booked a consultation.");
  expect(booked).toContain("Booked call: Tue 28 Oct, 14:30 IST");
  const minimal = decodeURIComponent(buildConsultationEmailUrl({ fullName: "  <b>Asha</b>\n Rao  ", email: sample.email, message: sample.message }));
  expect(minimal).toContain("Name: Asha Rao");
  expect(minimal).not.toMatch(/Phone:|Academic background:|Preferred time/);
  const long = buildConsultationEmailUrl({ ...sample, fullName: "😀".repeat(80), message: "😀".repeat(400), preferredTime: "界".repeat(80) }, "Tue 28 Oct, 14:30 IST");
  expect(long.length).toBeLessThanOrEqual(1800);
  expect(decodeURIComponent(long)).toContain("Booked call: Tue 28 Oct, 14:30 IST");
  expect(enquirySchema.safeParse({ ...sample, fullName: "<b></b>" }).success).toBe(false);
  expect(enquirySchema.safeParse({ ...sample, email: "asha@gmail" }).success).toBe(false);
  expect(bookingSchema.safeParse({ ...sample, phone: "" }).success).toBe(false);
  expect(bookingSchema.safeParse({ ...sample, message: " " }).success).toBe(false);
  expect(bookingSchema.safeParse({ ...sample, currentStatus: "" }).success).toBe(false);
  expect(bookingSchema.safeParse(sample).success).toBe(true);
});

async function fillSteps(page: Page) {
  const form = page.locator(".booking-form");
  await form.getByLabel("Full name").fill(sample.fullName);
  await form.getByLabel("WhatsApp number").fill(sample.phone);
  await form.getByLabel("Email").fill(sample.email);
  await form.getByLabel("Where are you right now?").selectOption(sample.currentStatus);
  await form.getByLabel("CV review").check();
  await form.getByLabel("Interview preparation").check();
  await form.getByRole("button", { name: "Continue" }).click();
  await expect(form.getByText("Book your call.")).toBeVisible();
  return form;
}

for (const width of [320, 390, 1440]) test(`booking form at ${width}px: steps, validation and email fallback when the calendar is unreachable`, async ({ page }) => {
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
  await form.getByRole("button", { name: "Book now" }).click({ noWaitAfter: true });
  const handoff = form.getByRole("link", { name: /Email app didn’t open\?/ });
  await expect(handoff).toHaveAttribute("href", /^mailto:/);
  expect(decodeURIComponent((await handoff.getAttribute("href"))!)).toContain("Help I need: CV review, Interview preparation");
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
