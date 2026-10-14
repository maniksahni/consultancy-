import {test,expect} from '@playwright/test';
test('destination discovery, persistent shortlist and comparison',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/destinations');await page.locator('[data-hydrated=true]').waitFor();
 await page.locator('.atlas-index button').filter({hasText:'United Kingdom'}).click();
 await expect(page.locator('.atlas-feature h3')).toContainText('United Kingdom');
 await page.getByRole('button',{name:'＋ Save destination'}).click();
 await page.locator('.atlas-index button').filter({hasText:'Germany'}).click();await page.getByRole('button',{name:'＋ Save destination'}).click();
 await page.getByRole('button',{name:/Compare shortlist/}).click();await expect(page.locator('.comparison-grid article')).toHaveCount(2);
 await page.reload();await expect(page.getByRole('button',{name:/Compare shortlist \(2/})).toBeVisible();
 await page.getByRole('button',{name:'Oceania',exact:true}).click();await expect(page.locator('.atlas-feature h3')).toContainText('Australia');
 await page.getByRole('link',{name:'Explore Australia'}).click();await expect(page.locator('h1')).toContainText('Australia');
 await page.getByRole('link',{name:'Start a conversation'}).click();await expect(page.locator('select[name=targetCountry]')).toHaveValue('Australia');
});
