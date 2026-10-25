import {test,expect} from '@playwright/test';
import {liveCountries} from '../src/lib/comingSoon';
test('destination discovery, persistent shortlist and comparison',async({page})=>{
 test.skip(!['uk','germany','australia'].every(c=>liveCountries.includes(c)),'Comparison opens with more destinations');
 await page.setViewportSize({width:390,height:844});
 await page.goto('/destinations');await page.locator('[data-hydrated=true]').waitFor();
 const index=page.getByRole('group',{name:'Choose a destination'});
 await index.getByRole('button',{name:/United Kingdom/}).click();
 await expect(page.locator('.ms-atlas-copy h3')).toContainText('United Kingdom');
 await page.getByRole('button',{name:'Save destination'}).click();
 await index.getByRole('button',{name:/Germany/}).click();await page.getByRole('button',{name:'Save destination'}).click();
 await page.getByRole('button',{name:/Compare shortlist/}).click();await expect(page).toHaveURL(/\/compare\?destinations=/);await expect(page.getByRole('table')).toBeVisible();await expect(page.locator('.comparison-table thead th')).toHaveCount(3);
 await page.reload();await expect(page.getByRole('checkbox',{name:'Germany',exact:true})).toBeChecked();await page.goto('/destinations');await expect(page.getByRole('button',{name:/Compare shortlist \(2/})).toBeVisible();
 await page.getByRole('button',{name:'Oceania',exact:true}).click();await expect(page.locator('.ms-atlas-copy h3')).toContainText('Australia');
 await page.getByRole('link',{name:'Explore Australia'}).click();await expect(page.locator('h1')).toContainText('Australia');
 await page.getByRole('link',{name:'Start a conversation'}).click();await expect(page.locator('select[name=targetCountry]')).toHaveValue('Australia');
});

test('atlas shows other destinations as coming soon, with no comparison yet',async({page})=>{
 test.skip(liveCountries.includes('uk'),'UK is open');
 await page.goto('/destinations');await page.locator('[data-hydrated=true]').waitFor();
 await page.getByRole('group',{name:'Choose a destination'}).getByRole('button',{name:/United Kingdom/}).click();
 await expect(page.locator('.ms-atlas-copy .ms-soon-tag')).toHaveText('Coming soon');
 await expect(page.getByRole('button',{name:/Compare shortlist/})).toHaveCount(0);
});
