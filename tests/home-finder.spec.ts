import { test, expect } from '@playwright/test';

test('requires interest and destination; chips preserve the chosen country', async ({ page }) => {
  await page.goto('/');
  const finder = page.getByRole('search', { name: 'Find a course, subject or university' });
  await finder.getByRole('button', { name: 'Find my options' }).click();
  await expect(finder.getByRole('alert')).toContainText('Tell us your interest');
  await finder.getByLabel('Study destination').selectOption('france');
  await finder.getByRole('button', { name: 'Find my options' }).click();
  await expect(finder.getByRole('alert')).toContainText('Tell us your interest');
  await page.locator('.lx-quick').getByRole('button', { name: 'Engineering' }).click();
  await expect(finder.getByRole('combobox', { name: 'Course, subject or university' })).toHaveValue('Engineering');
  await expect(finder.getByLabel('Study destination')).toHaveValue('france');
  await finder.getByRole('button', { name: 'Find my options' }).click();
  await expect(page).toHaveURL(/country=france/);
  await expect(page.getByLabel('University country')).toHaveValue('france');
});

test('typing Enter does not silently select a country; only France is open', async ({ page }) => {
  await page.goto('/');
  const finder = page.getByRole('search', { name: 'Find a course, subject or university' });
  const query = finder.getByRole('combobox', { name: 'Course, subject or university' });
  await query.fill('Engineering');
  await query.press('Enter');
  await expect(finder.getByRole('alert')).toContainText('Choose a study destination');
  await expect(finder.getByLabel('Study destination')).toHaveValue('');
  // Other destinations are listed as coming soon and cannot be chosen.
  await expect(finder.getByLabel('Study destination').locator('option[value="uk"]')).toHaveAttribute('disabled', '');
  await finder.getByLabel('Study destination').selectOption('france');
  await page.locator('.lx-quick').getByRole('button', { name: 'Business' }).click();
  await finder.getByRole('button', { name: 'Find my options' }).click();
  await expect(page).toHaveURL(/country=france/);
  await expect(page.getByLabel('University country')).toHaveValue('france');
});
