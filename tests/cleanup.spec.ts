import { test, expect } from '@playwright/test';

test('retired elements stay hidden across the home and inner pages', async ({ page }) => {
  for (const route of ['/', '/about', '/universities', '/book-consultation']) {
    await page.goto(route);
    await expect(page.locator('.sx-intro,.sx-curtain,.ms-footer-call,.lx-hero-stats,.lx-pass,.lx-tile-stat,.lx-quotes')).toHaveCount(0);
    await page.locator('#footer').scrollIntoViewIfNeeded();
    await expect(page.locator('.ms-footer-brand')).toBeVisible();
    expect(await page.locator('.ms-footer-brand').evaluate(el => getComputedStyle(el).opacity)).toBe('1');
  }
});

test('course details expand only the selected card and keep neighbouring cards compact', async ({ page }) => {
  await page.setViewportSize({width:1440,height:950});
  await page.goto('/universities?country=france&view=courses');
  const cards = page.locator('.course-results .ms-dir-card');
  await expect(cards.first()).toBeVisible({timeout:30000});
  const neighbourHeight = (await cards.nth(1).boundingBox())!.height;
  await cards.first().locator('.ms-course-details > summary').click();
  await expect(cards.first().locator('.ms-course-details')).toHaveAttribute('open', '');
  expect(Math.abs((await cards.nth(1).boundingBox())!.height-neighbourHeight)).toBeLessThan(2);
  await cards.nth(1).locator('.ms-course-details > summary').click();
  await expect(cards.first().locator('.ms-course-details')).not.toHaveAttribute('open', '');
  await expect(page.locator('.ms-course-details[open]')).toHaveCount(1);
  const topic = cards.nth(1).locator('.ms-course-topic').first();
  await topic.locator('summary').click();
  await expect(topic).toHaveAttribute('open', '');
});
