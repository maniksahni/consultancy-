import {test,expect} from '@playwright/test';
import { liveCountries } from '../src/lib/comingSoon';

test('package enquiry opens the form with package context and keyboard focus',async({page})=>{
 await page.goto('/settle-in-france');
 await page.getByRole('link',{name:/Ask about this package/}).first().click();
 await expect(page).toHaveURL(/service=France%20Arrival%20Essentials#consultation-form/);
 await expect(page.locator('.booking-form input[name=fullName]')).toBeFocused();
 await expect(page.locator('.booking-form textarea[name=message]')).toHaveValue('I would like to enquire about France Arrival Essentials.');
 const top=await page.locator('.booking-form').evaluate(el=>el.getBoundingClientRect().top);
 expect(top).toBeGreaterThanOrEqual(70);expect(top).toBeLessThan(400);
 await expect(page.locator('.sx-progress,.sx-cursor')).toHaveCount(0);
 await expect(page.getByRole('link',{name:'Sources & photography',exact:true})).toHaveCount(0);
});

test('university options obey city, qualification and budget and reset stale choices',async({page})=>{
 test.skip(!liveCountries.includes('australia'),'Australia is coming soon');
 const record=(id:string,institutionId:string,city:string,tuition:number,level='Bachelor Degree')=>({id,institutionId,institution:institutionId,name:`${institutionId} ${level}`,country:'australia',city,tuition,currency:'AUD',level,durationWeeks:'52'});
 await page.route('**/australia-courses.json',route=>route.fulfill({json:{country:'australia',refreshedAt:'2026-10-16',courses:[record('1','Local College','ABBOTSFORD',12000),record('2','Other City College','SYDNEY',12000),record('3','Expensive College','ABBOTSFORD',60000),record('4','Postgraduate College','ABBOTSFORD',12000,'Masters Degree'),record('5','Multiple Campuses','ABBOTSFORD',15000),record('6','Multiple Campuses','SYDNEY',18000)]}}));
 await page.goto('/universities?country=australia&view=courses');
 const city=page.getByRole('combobox',{name:'City',exact:true});await city.selectOption('ABBOTSFORD');
 await page.getByRole('combobox',{name:'Maximum tuition / estimate'}).selectOption('20000');
 await page.getByRole('combobox',{name:'Qualification',exact:true}).selectOption('degree:bachelor');
 const university=page.getByRole('combobox',{name:'University',exact:true});
 await expect(university.locator('option')).toHaveText(['All universities','Local College','Multiple Campuses']);
 await university.selectOption('Local College');
 await expect(page.locator('.course-results article')).toHaveCount(1);
 await city.selectOption('SYDNEY');
 await expect(university).toHaveValue('all');
 await expect(university.locator('option')).toHaveText(['All universities','Multiple Campuses','Other City College']);
 await expect(page.locator('.course-results article')).toHaveCount(2);
 await expect(page.locator('.course-results')).not.toContainText('Local College');
 await expect(page.locator('.ms-cover-actions')).toHaveCount(0);
});
