import {test,expect} from '@playwright/test';
test('country and topic filters, dated evidence and guide download',async({page})=>{
 await page.goto('/knowledge');
 const topic=page.getByRole('group',{name:'Topic'});
 const grid=page.locator('.ms-kh-grid');
 await page.getByLabel('Destination',{exact:true}).selectOption('canada');await topic.getByRole('button',{name:'Costs',exact:true}).click();
 await expect(grid.locator('article')).toHaveCount(1);await expect(grid).toContainText('CAN$23,448');await expect(grid).toContainText('1 September 2026');
 const download=page.waitForEvent('download');await page.getByRole('button',{name:'Download your guide'}).click();const file=await download;expect(file.suggestedFilename()).toContain('canada');const path=await file.path();const fs=await import('node:fs');expect(fs.readFileSync(path!,'utf8')).toContain('CAN$23,448');
 await page.getByLabel('Destination',{exact:true}).selectOption('uk');await topic.getByRole('button',{name:'Work & graduation',exact:true}).click();await expect(grid).toContainText('18 months');await expect(grid).toContainText('1 January 2027');
 await page.getByLabel('Search guidance').fill('no such rule');await expect(page.getByText('No matching guidance.')).toBeVisible();await page.getByRole('button',{name:'Reset search'}).click();await expect(grid.locator('article')).toHaveCount(7);
});
test('budget uses entered amounts without currency conversion',async({page})=>{
 await page.goto('/knowledge');await page.getByLabel('Tuition for this study period').fill('5000');await page.getByLabel('Living costs per month').fill('1000');await page.getByLabel('Months in your plan').fill('12');await page.getByLabel('Travel, insurance & other costs').fill('1500');const total=page.locator('.ms-budget-total strong');await expect(total).toContainText('18,500');await page.getByLabel('Currency',{exact:true}).selectOption('CAD');await expect(total).toContainText('18,500');
});
