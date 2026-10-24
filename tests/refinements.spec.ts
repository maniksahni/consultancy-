import { test, expect } from '@playwright/test';

test('chosen search suggestion stays dismissed until the query changes', async ({ page }) => {
  await page.route('**/home-search/prefixes/**', route=>route.fulfill({json:[['uk','university','Example University'],['uk','university','Example University of Design']]}));
  await page.goto('/');
  const input=page.getByRole('combobox',{name:'Course, subject or university'});
  await input.fill('Example');
  await page.getByRole('option',{name:/^Example University university/}).click();
  await expect(input).toHaveValue('Example University');
  await page.waitForTimeout(400);
  await expect(page.getByRole('listbox',{name:'Search suggestions'})).toHaveCount(0);
  await input.blur();await input.focus();
  await expect(input).toHaveAttribute('aria-expanded','false');
  await input.fill('Example Uni');
  await expect(page.getByRole('listbox',{name:'Search suggestions'})).toBeVisible();
});

test('comparison links preserve selection and identify shared and different attributes',async({page})=>{
  await page.goto('/compare?destinations=uk,ireland');
  await expect(page.getByRole('table')).toBeVisible();
  const region=page.getByRole('row',{name:/Language Shared/});
  await expect(region).toBeVisible();
  await page.getByRole('checkbox',{name:'Show differences only'}).check();
  await expect(region).toHaveCount(0);
  await expect(page.getByRole('row',{name:/Tuition a year/})).toContainText('£');
  await page.getByRole('checkbox',{name:'Canada',exact:true}).check();
  await expect(page).toHaveURL(/destinations=uk%2Cireland%2Ccanada/);
  await page.reload();
  await expect(page.getByRole('checkbox',{name:'Canada',exact:true})).toBeChecked();
  await page.getByRole('button',{name:'Remove Ireland from comparison'}).click();
  await expect(page.getByRole('checkbox',{name:'Ireland',exact:true})).not.toBeChecked();
  await page.setViewportSize({width:390,height:844});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.goto('/compare?destinations=invalid,uk,uk');
  await expect(page.getByText('Choose another destination to compare.',{exact:true})).toBeVisible();
});

test('directory uses rows and shows university names without record totals',async({page})=>{
  await page.setViewportSize({width:1440,height:950});
  await page.goto('/universities?country=france&view=courses');
  const cards=page.locator('.course-results .ms-dir-card');
  await expect(cards.first()).toBeVisible({timeout:30000});
  const [first,second]=await cards.evaluateAll(elements=>elements.slice(0,2).map(el=>{const r=el.getBoundingClientRect();return {x:r.x,y:r.y,height:r.height};}));
  expect(Math.abs(first.x-second.x)).toBeLessThan(1);
  expect(second.y).toBeGreaterThanOrEqual(first.y+first.height);
  const university=page.getByRole('combobox',{name:'University',exact:true});
  await expect(university.locator('option').first()).toHaveText('All universities');
  expect(await university.innerText()).not.toMatch(/\d+ (?:records|courses|fields)/);
  await expect(page.locator('.ms-dir-side-count,.ms-dir-counts')).toHaveCount(0);
  await page.goto('/about');
  expect(await page.locator('figcaption').allTextContents()).not.toContain('Photo:');
});
