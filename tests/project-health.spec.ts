import { test, expect } from '@playwright/test';
import { liveCountries } from '../src/lib/comingSoon';

for (const country of ['france','uk','usa','canada','germany','australia','ireland']) test(`directory preserves ${country} and loads the matching catalogue`, async ({page}) => {
 await page.goto(`/universities?country=${country}&view=courses`);
 // Coming-soon destinations cannot be browsed yet; the directory stays on France.
 await expect(page.getByLabel('University country')).toHaveValue(liveCountries.includes(country) ? country : 'france');
 await expect(page.locator('.ms-dir-loading')).toHaveCount(0,{timeout:30000});
 await expect(page.locator('.ms-dir-side-head')).not.toBeEmpty();
 await expect(page.locator('.ms-dir [role=alert]')).toHaveCount(0);
});

test('a job without a description chunk uses its summary without requesting a missing file; CV check stays local',async({page})=>{
 const job={id:'audit-job',country:'france',title:'Junior data analyst',company:'Audit example',location:'Paris',remote:false,type:'Internship',category:'Data',level:'Junior',salary:null,summary:'Analyse data using Python SQL Excel and communicate findings. Relevant degree and teamwork required.',lang:'en',posted:'2026-10-24',url:'https://example.com/job',source:'Example',d:null};
 const missing:string[]=[];const uploads:string[]=[];
 page.on('request',r=>{if(r.url().includes('/desc/null.json'))missing.push(r.url());if(r.method()!=='GET')uploads.push(r.url());});
 await page.route('**/data/jobs/list-france.json',r=>r.fulfill({json:[job]}));
 await page.goto('/jobs');
 await page.getByRole('button',{name:'View full job',exact:true}).first().click();
 const dialog=page.getByRole('dialog');
 await expect(dialog).toBeVisible();
 await expect(dialog).toContainText('Only a summary is available');
 await expect(dialog.locator('.ms-jobdesc')).toContainText('Analyse data');
 await dialog.getByRole('tab',{name:'French for this job'}).click();
 await expect(dialog.getByRole('tabpanel')).toBeVisible();
 await dialog.getByRole('tab',{name:'Check my CV'}).click();
 await dialog.locator('input[type=file]').setInputFiles({name:'audit-cv.txt',mimeType:'text/plain',buffer:Buffer.from('Test Candidate\nPROFILE\nData analyst with a degree in computer science, Python SQL Excel statistics and communication.\nEXPERIENCE\nData Analyst 2023-2026\nAnalysed 200 records and improved reporting by 20%. Built dashboards with SQL Python Excel.\nEDUCATION\nBSc Computer Science 2020-2023\nSKILLS\nPython SQL Excel teamwork statistics data analysis communication\nCONTACT\ntest@example.com +33123456789 Paris')});
 await expect(dialog.locator('.ms-ats-result')).toBeVisible();
 expect(missing).toEqual([]);expect(uploads).toEqual([]);
 await dialog.getByRole('button',{name:'Close job details'}).click();
 await expect(dialog).not.toBeVisible();
});

for (const extension of ['pdf','docx']) test(`CV checker reads a real ${extension.toUpperCase()} locally`, async ({page})=>{
 const writes:string[]=[];page.on('request',r=>{if(r.method()!=='GET')writes.push(r.url());});
 await page.goto('/jobs');
 await page.getByRole('button',{name:'ATS CV check',exact:true}).first().click();
 const dialog=page.getByRole('dialog');
 await dialog.locator('input[type=file]').setInputFiles(`tests/fixtures/audit-cv.${extension}`);
 await expect(dialog.locator('.ms-ats-result')).toBeVisible({timeout:20000});
 await expect(dialog.locator('.ms-ats-file')).toContainText(`audit-cv.${extension}`);
 expect(writes).toEqual([]);
});

test('an empty job description shows an honest fallback instead of an endless loader or CV score',async({page})=>{
 const job={id:'empty-job',country:'france',title:'Example role',company:'Audit example',location:'Paris',remote:false,type:null,category:null,level:null,salary:null,summary:'',lang:'en',posted:'2026-10-24',url:'https://example.com/job',source:'Example',d:null};
 await page.route('**/data/jobs/list-france.json',r=>r.fulfill({json:[job]}));
 await page.goto('/jobs');await page.getByRole('button',{name:'View full job',exact:true}).first().click();
 const dialog=page.getByRole('dialog');await expect(dialog).toContainText('The description is not available here.');
 await expect(dialog.locator('.ms-jobdesc-loading')).toHaveCount(0);
 await dialog.getByRole('tab',{name:'Check my CV'}).click();
 await expect(dialog).toContainText('A job description is needed');await expect(dialog.locator('input[type=file]')).toHaveCount(0);
});
