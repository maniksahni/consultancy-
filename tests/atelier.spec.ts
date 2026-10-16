import { test, expect } from '@playwright/test';

for (const width of [320, 390, 430, 768, 1440]) {
  test(`homepage at ${width}px: story sections and destination gallery`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Bonjour,future.');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const gallery = page.getByRole('region', { name: 'Study destinations', exact: true });
    await expect(gallery.locator('.lx-dest')).toHaveCount(8);
    if (width <= 900) {
      const viewport = gallery.locator('.lx-dest-viewport');
      expect(await viewport.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
      await viewport.evaluate(el => el.scrollBy({ left: 400 }));
      await expect.poll(() => viewport.evaluate(el => el.scrollLeft)).toBeGreaterThan(50);
    }
    for (const id of ['finder', 'destinations', 'about', 'outcomes', 'booking']) await expect(page.locator(`#${id}`)).toHaveCount(1);
    expect(errors).toEqual([]);
  });
}

test('site menu opens as a dialog, closes with Escape and returns focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open menu', exact: true });
  await toggle.click();
  const menu = page.getByRole('dialog', { name: 'Site menu' });
  await expect(menu).toHaveAttribute('data-open', 'true');
  await page.keyboard.press('Escape');
  await expect(page.locator('#site-menu')).toHaveAttribute('data-open', 'false');
  await expect(page.locator('#site-menu')).toHaveAttribute('aria-hidden', 'true');
  await expect(toggle).toBeFocused();
  await toggle.click();
  await menu.getByRole('link', { name: /Our support/ }).click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.locator('h1')).toContainText('succeed');
});

test('homepage finder carries country and query into the course finder', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('combobox', { name: 'Course, subject or university' }).fill('Management');
  await page.getByRole('combobox', { name: 'Study destination', exact: true }).selectOption('france');
  await page.getByRole('button', { name: 'Find my options' }).click();
  await expect(page).toHaveURL(/view=courses/);
  await expect(page.getByRole('combobox', { name: 'University country' })).toHaveValue('france');
  await expect(page.getByPlaceholder('Search this directory')).toHaveValue('Management');
  await expect(page.locator('.course-results').first()).toBeVisible({ timeout: 30000 });
});

test('FAQ expands and collapses; the finale opens the booking flow', async ({ page }) => {
  await page.goto('/');
  const question = page.getByRole('button', { name: 'Can you assist with scholarships?', exact: true });
  await question.click();
  await expect(question).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#atelier-answer-2')).toBeVisible();
  await question.click();
  await expect(page.locator('#atelier-answer-2')).toBeHidden();
  await page.locator('#booking').getByRole('link', { name: /Let’s have a conversation/ }).click();
  await expect(page.locator('.booking-form')).toBeVisible();
  await page.locator('.booking-form button[type=submit]').click();
  await expect(page.locator('.booking-form [role=status]')).toContainText('Please check');
  await expect(page.locator('input[name=fullName]')).toBeFocused();
});
