import type { ChapterDepth } from "../types";

/** Tax on student earnings and long-term residence routes, checked October 2026. Merged after each country's own depth. */
export const extraDepth: Record<string, Record<string, ChapterDepth>> = {
  uk: {
    "part-time-work": {
      blocks: [{ heading: "Tax on what you earn", paragraphs: [
        "Students pay UK income tax like anyone else, but only above the tax-free Personal Allowance (£12,570 a year), so most part-time earnings are untaxed. National Insurance is deducted above a weekly threshold. Give your employer your National Insurance number so you are not put on an emergency tax code.",
        "If too much tax was taken, HMRC usually refunds it after the tax year ends on 5 April; check your Personal Tax Account. Keep payslips and your P60 or P45: you will need them for any Indian tax filing and for background checks later.",
      ] }],
      faqs: [{ q: "Do international students pay tax in the UK?", a: "Only on earnings above the £12,570 Personal Allowance, plus National Insurance above a weekly threshold. Most part-time student jobs fall below the income tax threshold." }],
      sources: [{ label: "GOV.UK · Income Tax rates and Personal Allowances", url: "https://www.gov.uk/income-tax-rates" }, { label: "GOV.UK · Personal tax account", url: "https://www.gov.uk/personal-tax-account" }],
    },
    "after-graduation": {
      blocks: [{ heading: "Settlement (indefinite leave to remain)", paragraphs: [
        "Settlement, also called indefinite leave to remain, currently follows five continuous years on a qualifying work route such as the Skilled Worker visa. Time on a Student or Graduate visa does not count. The government proposed in November 2025 to make 10 years the standard qualifying period under an \"earned settlement\" model; as checked in October 2026 the details and start date depend on new Immigration Rules, so check GOV.UK before you plan around a date.",
      ] }],
      sources: [{ label: "GOV.UK · Indefinite leave to remain (Skilled Worker)", url: "https://www.gov.uk/skilled-worker-visa/apply-for-settlement" }],
    },
  },
  usa: {
    "part-time-work": {
      blocks: [{ heading: "Tax on what you earn", paragraphs: [
        "F-1 students in their first five calendar years in the US are usually nonresident aliens for tax. They pay federal and most state income tax on wages but are exempt from Social Security and Medicare (FICA) on authorised on-campus, CPT and OPT work; check your payslip and ask your employer to correct wrong deductions.",
        "Every F-1 student files Form 8843 each year, even with no income. If you earned money, you also file Form 1040-NR, usually by mid-April. Under Article 21(2) of the India–US tax treaty, Indian students can generally claim the standard deduction, which ordinary nonresidents cannot. Many universities give free access to nonresident tax software; avoid preparers who file you as a resident.",
      ] }],
      faqs: [{ q: "Do F-1 students pay Social Security tax?", a: "Usually not. Nonresident F-1 students are exempt from Social Security and Medicare (FICA) taxes on authorised on-campus, CPT and OPT work, but they pay income tax." }],
      sources: [{ label: "IRS · Foreign student liability for Social Security and Medicare taxes", url: "https://www.irs.gov/individuals/international-taxpayers/foreign-student-liability-for-social-security-and-medicare-taxes" }, { label: "IRS · Form 8843", url: "https://www.irs.gov/forms-pubs/about-form-8843" }, { label: "IRS · Publication 519, U.S. Tax Guide for Aliens", url: "https://www.irs.gov/publications/p519" }],
    },
    "after-graduation": {
      blocks: [{ heading: "Permanent residence (green card)", paragraphs: [
        "Most graduates reach a green card through an employer: the employer usually completes labour certification (PERM), then files an I-140 petition in the EB-2 or EB-3 category. Each country has an annual cap, and Indian-born applicants face some of the longest waits; the State Department's monthly Visa Bulletin shows where each category stands. Plan to stay on H-1B or another work visa for years while your priority date becomes current.",
      ] }],
      sources: [{ label: "USCIS · Green card through a job", url: "https://www.uscis.gov/green-card/green-card-eligibility/green-card-for-employment-based-immigrants" }, { label: "U.S. Department of State · Visa Bulletin", url: "https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html" }],
    },
  },
  canada: {
    "part-time-work": {
      blocks: [{ heading: "Tax on what you earn", paragraphs: [
        "You need a Social Insurance Number (SIN) to work. Employers deduct income tax, Canada Pension Plan and Employment Insurance. File a T1 income tax return for each year you live in Canada, normally by 30 April, even if you earned little: you may get a refund, and filing makes you eligible for the GST/HST credit and some provincial benefits.",
        "Your institution issues a T2202 for eligible tuition. Tuition amounts can reduce federal tax and unused amounts can be carried forward to years when you earn more.",
      ] }],
      faqs: [{ q: "Do international students file taxes in Canada?", a: "Yes, if they are resident for tax purposes, which most full-time students living in Canada are. File by 30 April each year; you may receive a refund and the GST/HST credit." }],
      sources: [{ label: "Canada Revenue Agency · International students studying in Canada", url: "https://www.canada.ca/en/revenue-agency/services/tax/international-non-residents/individuals-leaving-entering-canada-non-residents/international-students-studying-canada.html" }],
    },
  },
  germany: {
    "part-time-work": {
      blocks: [{ heading: "Tax and contributions on what you earn", paragraphs: [
        "You receive a tax ID (Steuer-ID) by post after your address registration. A Minijob pays up to €603 a month in 2026 (the limit follows the minimum wage) with no income tax deducted from you. Above that, the job becomes a Midijob or regular job with tax and reduced social contributions; Werkstudent roles keep lower contributions while you work up to 20 hours a week in term.",
        "Income tax only applies above the basic tax-free allowance, so students who had tax withheld can often reclaim it by filing a return (Steuererklärung) through the free ELSTER portal. Keep your annual income tax certificate (Lohnsteuerbescheinigung).",
      ] }],
      faqs: [{ q: "How much can a student earn in a Minijob in Germany?", a: "Up to €603 a month in 2026. The limit is tied to the minimum wage and changes when it rises." }],
      sources: [{ label: "Minijob-Zentrale", url: "https://www.minijob-zentrale.de/" }, { label: "ELSTER (official tax portal)", url: "https://www.elster.de/" }],
    },
  },
  australia: {
    "part-time-work": {
      blocks: [{ heading: "Tax on what you earn", paragraphs: [
        "Apply for a Tax File Number (TFN) online from the ATO as soon as you arrive; without one, employers withhold tax at the top rate. The tax year runs from 1 July to 30 June and you lodge a return through myTax by 31 October. International students on courses longer than six months are often residents for tax purposes, but the ATO decides on your facts; use its residency tool.",
        "Employers must also pay superannuation for you. When you leave Australia for good, you can claim it back as a departing Australia superannuation payment (DASP), taxed at a set rate.",
      ] }],
      faqs: [{ q: "Do I need a TFN to work in Australia?", a: "Yes. Apply online with the ATO after arriving; without a TFN your employer must withhold tax at the highest rate." }],
      sources: [{ label: "Australian Taxation Office · Tax file number", url: "https://www.ato.gov.au/individuals-and-families/tax-file-number" }, { label: "Australian Taxation Office · Departing Australia superannuation payment", url: "https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/withdrawing-and-using-your-super/departing-australia-superannuation-payment-dasp" }],
    },
    "after-graduation": {
      blocks: [{ heading: "From the 485 to permanent residence", paragraphs: [
        "The common routes are skilled visas based on a points test (Skilled Independent 189, Skilled Nominated 190 with state nomination, or Skilled Work Regional 491), and employer-sponsored visas. Points come from age, English, skilled work experience, Australian study and qualifications. Your occupation must be on the relevant skills list and you need a positive skills assessment from the authority for that occupation.",
        "Invitations depend on demand and change each programme year, so treat any points total quoted online as historical. The Department of Home Affairs publishes current requirements and invitation rounds.",
      ] }],
      sources: [{ label: "Department of Home Affairs · Skilled Independent visa (189)", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-independent-189" }, { label: "Department of Home Affairs · Skilled Nominated visa (190)", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/skilled-nominated-190" }],
    },
  },
  ireland: {
    "part-time-work": {
      blocks: [{ heading: "Tax on what you earn", paragraphs: [
        "You need a Personal Public Service Number (PPSN) to work. Register the job in Revenue's myAccount (Jobs and Pensions) so your tax credits are applied; until then you are taxed at the higher emergency rate. Most students on part-time wages pay little or no income tax once credits are applied, and Universal Social Charge only applies above a yearly threshold.",
        "If you overpaid, claim it back through myAccount after the year ends (Ireland's tax year is the calendar year).",
      ] }],
      faqs: [{ q: "Why was I put on emergency tax in Ireland?", a: "Because your employer had no tax credit certificate for you. Get a PPSN, register the job in Revenue's myAccount and the overpaid tax is refunded through payroll or after the year." }],
      sources: [{ label: "Revenue · Starting your first job", url: "https://www.revenue.ie/en/jobs-and-pensions/starting-your-first-job/index.aspx" }, { label: "Revenue · Emergency tax", url: "https://www.revenue.ie/en/jobs-and-pensions/emergency-tax/index.aspx" }],
    },
  },
};
