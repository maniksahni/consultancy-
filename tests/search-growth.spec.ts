import { test, expect } from '@playwright/test';
import { buildConsultationEmailUrl, enquirySchema } from '../src/lib/consultation';

test('guides expose topic links, editorial context and sources without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/france/costs');
  await expect(page.getByRole('navigation', { name: 'On this page' })).toBeVisible();
  await expect(page.locator('.ms-guide-editorial')).toContainText('Harshita Kohli');
  for (const link of await page.locator('.ms-guide-jumps a').all()) {
    const hash = await link.getAttribute('href');
    await expect(page.locator(hash!)).toHaveCount(1);
  }
  await expect(page.locator('#guide-sources a').first()).toHaveAttribute('href', /^https:\/\//);
  await page.goto('/knowledge');
  await expect(page.getByRole('link', { name: 'Read the complete Germany guide' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Read the complete France guide' })).toBeVisible();
  await context.close();
});

test('a direct link reveals an in-depth answer and stays usable on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/france/costs');
  const topic = page.locator('.ms-guide-block.is-more').first();
  const id = await topic.getAttribute('id');
  await page.goto(`/france/costs#${id}`);
  // Wait for the phone layout to finish collapsing other sections before checking the target.
  await expect(page.locator('#guide-topic-2')).not.toHaveAttribute('open', '');
  await expect(page.locator(`#${id}`)).toHaveAttribute('open', '');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('shortlisting worksheet is public and referral answers are optional and bounded', async ({ page, request }) => {
  await page.goto('/study-in-france');
  const worksheet = page.getByRole('link', { name: 'Download the blank shortlist worksheet' });
  await expect(worksheet).toHaveAttribute('download', '');
  const response = await request.get((await worksheet.getAttribute('href'))!);
  expect(response.ok()).toBe(true);
  expect(await response.text()).toContain('Confirmed funds');
  await page.goto('/book-consultation');
  await expect(page.getByLabel('How did you find Althéa?')).toHaveValue('');
  const sample = { fullName: 'Test Visitor', email: 'visitor@example.com', message: 'Programme planning', referralSource: 'ChatGPT or another AI answer' };
  const parsed = enquirySchema.parse(sample);
  expect(decodeURIComponent(buildConsultationEmailUrl(parsed))).toContain('How I found Althéa: ChatGPT or another AI answer');
  expect(enquirySchema.safeParse({ ...sample, referralSource: 'unlisted tracking value' }).success).toBe(false);
  expect(enquirySchema.safeParse({ fullName: 'Test Visitor', email: 'visitor@example.com', message: 'Programme planning' }).success).toBe(true);
});
