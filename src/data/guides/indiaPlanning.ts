import type { GuideChapter } from "./types";

/** From India chapters for planning, parents and protection: the month-by-month timeline, scams and emergencies, and a parents' guide. */
const reviewedAt = "18 October 2026";
const p = (slug: string) => `/from-india/${slug}`;

const S = {
  ukSponsors: { label: "GOV.UK · Register of student sponsors", url: "https://www.gov.uk/government/publications/register-of-licensed-sponsors-students" },
  sevp: { label: "Study in the States (DHS) · School search", url: "https://studyinthestates.dhs.gov/school-search" },
  dli: { label: "IRCC · Designated learning institutions list", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html" },
  cricos: { label: "CRICOS (Australian Government)", url: "https://cricos.education.gov.au/" },
  hochschulkompass: { label: "Hochschulkompass (German Rectors' Conference)", url: "https://www.hochschulkompass.de/en/" },
  irish: { label: "Irish Immigration Service", url: "https://www.irishimmigration.ie/" },
  campusFrance: { label: "Campus France India", url: "https://www.inde.campusfrance.org/" },
  madad: { label: "MADAD · Ministry of External Affairs consular help", url: "https://madad.gov.in/" },
  cyber: { label: "National Cyber Crime Reporting Portal (1930)", url: "https://cybercrime.gov.in/" },
  rbi: { label: "Reserve Bank of India · Alert List of unauthorised forex platforms", url: "https://www.rbi.org.in/" },
  emigrate: { label: "eMigrate · Registered recruiting agents (MEA)", url: "https://emigrate.gov.in/" },
  passport: { label: "Passport Seva", url: "https://www.passportindia.gov.in/" },
  rbiLrs: { label: "Reserve Bank of India · LRS FAQs", url: "https://www.rbi.org.in/Scripts/FAQView.aspx?Id=115" },
  ukVisit: { label: "GOV.UK · Standard Visitor visa", url: "https://www.gov.uk/standard-visitor" },
  usVisit: { label: "U.S. Department of State · Visitor visa", url: "https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html" },
  schengen: { label: "France-Visas (official)", url: "https://france-visas.gouv.fr/" },
  caVisit: { label: "IRCC · Visit Canada", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html" },
  auVisit: { label: "Department of Home Affairs · Visitor visa (600)", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/visitor-600" },
  ukArrive: { label: "GOV.UK · Student visa: when you can travel", url: "https://www.gov.uk/student-visa" },
  usArrive: { label: "Study in the States · Arriving 30 days before", url: "https://studyinthestates.dhs.gov/" },
};

export const timelineChapter: GuideChapter = {
  slug: "timeline", path: p("timeline"), label: "Month-by-month timeline", eyebrow: "FROM INDIA · CHAPTER 1",
  title: "Your study abroad timeline,", accent: "month by month.",
  seoTitle: "Study Abroad Timeline Month by Month",
  description: "Month-by-month study abroad plan from India for a September 2027 start: tests, applications, scholarships, loans, visa, flights and a document checklist.",
  summary: "For a September or autumn start, begin about 15–18 months ahead. Tests and shortlisting come first (spring and summer of the year before), applications in the autumn and winter, admits, scholarships and loans from January to April, then proof of funds, visa, housing and flights between April and August. Country deadlines differ: UK undergraduate (UCAS) and many US master's programmes close in December or January, French Licence 1 applications by 15 December, and German winter-semester deadlines often fall between January and 15 July. February intakes (Australia, some Canadian and German programmes) shift everything about six months.",
  facts: [
    { label: "Start planning", value: "15–18 months ahead" },
    { label: "Main application window", value: "Oct – Jan", note: "For autumn intakes" },
    { label: "Visa applications", value: "3–4 months before start" },
    { label: "Arrive", value: "1–3 weeks before classes", note: "Within each visa's earliest-entry rule" },
  ],
  blocks: [
    { heading: "The plan for a September 2027 start", table: {
      head: ["When", "What to do"],
      rows: [
        ["April – June 2026", "Decide on countries, level and field. Set a total budget with your family, including living costs and a 5–10% currency margin. Check eligibility (years of education, minimum marks, backlogs). Apply for or renew your passport."],
        ["June – September 2026", "Prepare and take IELTS, PTE, TOEFL or Duolingo, and GRE/GMAT if your programmes need them; leave time for one retake. Shortlist 8–12 programmes across ambition levels. Ask two or three referees early."],
        ["September – December 2026", "Write a tailored SOP or motivation letter for each programme. Apply: UCAS (UK undergraduate), US master's priority rounds, Études en France (France), uni-assist or direct portals (Germany), university portals (UK, Canada, Ireland, Australia). Start APS if you are going to Germany. Apply for early scholarships (Chevening, Eiffel through your French institution)."],
        ["January – March 2027", "Admits arrive. Compare total cost, outcomes and location. Apply for education loans with 2–3 lenders. Accept one offer and pay any deposit. Open a German blocked account if needed."],
        ["March – May 2027", "Receive your CAS (UK), I-20 (USA), LOA (Canada), CoE (Australia) or final admission letter. Arrange proof of funds and get the loan sanction letter. Book the visa appointment; US F-1 slots in India go fast. Do any visa medical or TB test required."],
        ["May – July 2027", "Submit the visa and give biometrics. Book accommodation and health insurance. Arrange forex and the first tuition remittance. Book flights once the visa is approved."],
        ["July – August 2027", "Collect originals and apostilles, pack medicines with prescriptions, set up international roaming or an eSIM, tell your Indian bank you are going abroad. Fly in time for orientation."],
        ["First 30 days", "Residence permit or registration steps, bank account, local SIM, health registration, transport pass and university enrolment: see your country's arrival chapter."],
      ],
      caption: "Typical pattern, checked October 2026. Every programme publishes its own deadlines; the earliest one on your list sets your pace.",
    } },
    { heading: "Master document checklist", checklist: [
      "Passport valid well beyond your course (renew first if it expires within a year or two of the end date), plus scans",
      "Visa or entry approval and its printouts or eVisa details",
      "Offer letter and CAS, I-20, LOA, CoE or attestation d'inscription",
      "Class 10 and 12 marksheets, degree or provisional certificate, transcripts, medium-of-instruction letter (originals and apostilled copies where needed)",
      "Test score reports (IELTS, PTE, TOEFL, GRE, GMAT, APS certificate)",
      "Proof of funds: bank statements, loan sanction letter, scholarship letter, blocked-account confirmation",
      "Fee payment receipts and the remittance (Form A2) acknowledgement",
      "Health insurance policy and vaccination records",
      "Accommodation contract or booking confirmation",
      "Prescriptions for any medicines you carry",
      "Passport-size photos in the destination's format",
      "PAN and Aadhaar copies, for Indian banking from abroad",
      "Emergency contacts on paper: university, landlord, Indian mission, family",
    ] },
    { heading: "Earliest arrival rules", more: true, table: {
      head: ["Country", "How early can you enter?"],
      rows: [
        ["UK", "Up to one month before the course starts (courses longer than six months)"],
        ["USA", "Up to 30 days before the start date on your I-20"],
        ["Canada", "Any time once you hold the approval; arrive before classes start"],
        ["Australia", "Usually up to 90 days before the course start"],
        ["France, Germany, Ireland", "From the start date of your long-stay visa"],
      ],
      caption: "Check your own visa: the dates printed on it or in your approval letter override general rules.",
    } },
    { heading: "February and spring intakes", more: true, paragraphs: [
      "Australia's main intakes are February and July, and many Canadian colleges and some German, Irish and UK programmes admit in January or February. Move the whole table back about six months: tests by mid-year, applications around August–October, visas by November–December.",
    ] },
  ],
  faqs: [
    { q: "When should I start preparing to study abroad?", a: "About 15–18 months before your intake. For a September 2027 start, decide on countries and take your tests in mid-2026, apply between October 2026 and January 2027, and handle loans, visa and housing from March to August 2027." },
    { q: "When should I apply for my student visa?", a: "As soon as you have your CAS, I-20, LOA, CoE or admission letter and your proof of funds, usually 3–4 months before the course starts. Book US visa appointments as early as the system allows." },
  ],
  sources: [S.ukArrive, S.usArrive, S.campusFrance, S.dli],
  reviewedAt,
};

export const scamsChapter: GuideChapter = {
  slug: "scams-emergencies", path: p("scams-emergencies"), label: "Scams & emergencies abroad", eyebrow: "FROM INDIA · CHAPTER 7",
  title: "Scams to avoid,", accent: "and help in an emergency.",
  seoTitle: "Study Abroad Scams & Emergency Help",
  description: "Study abroad fraud warnings for Indian students: fake agents, offer letters and visas, forex and job scams, plus lost passports and emergencies abroad.",
  summary: "Most students who are cheated lose money to someone in India before they leave: an agent selling a \"guaranteed visa\", a fake admission letter, an unrecognised college or an illegal forex platform. Check every institution yourself on the destination's official register, pay fees only to the university, and remit only through an authorised bank. Abroad, scam calls posing as immigration, tax or police officers are common; no government asks for gift cards or crypto. In a real emergency, use the local emergency number first, then the Indian embassy or consulate; families in India can ask for help through the MEA's MADAD portal.",
  facts: [
    { label: "Cyber fraud in India", value: "1930", note: "Or cybercrime.gov.in" },
    { label: "Consular help from India", value: "MADAD portal", note: "Ministry of External Affairs" },
    { label: "Fees", value: "Pay the university only" },
    { label: "Forex", value: "Authorised banks and dealers only" },
  ],
  blocks: [
    { heading: "Check the institution yourself", table: {
      head: ["Destination", "Official register to check"],
      rows: [
        ["UK", "Home Office register of student sponsors"],
        ["USA", "SEVP-certified school search (Study in the States)"],
        ["Canada", "IRCC list of designated learning institutions (DLI)"],
        ["Australia", "CRICOS register of institutions and courses"],
        ["Germany", "Hochschulkompass (state-recognised universities)"],
        ["Ireland", "Interim List of Eligible Programmes (ILEP)"],
        ["France", "Campus France catalogue and state-recognised diplomas (grade de master, visa or RNCP)"],
      ],
      caption: "If a college or course is missing, it cannot sponsor your visa. Verify the offer letter by writing to the admissions office from its official website.",
    } },
    { heading: "Red flags before you leave", checklist: [
      "\"Guaranteed visa\" or \"100% visa success\": no agent controls a visa decision.",
      "An offer letter that arrives without you applying on the university's portal, or fees to be paid into a personal or agent account.",
      "Pressure to submit fake bank statements, experience letters or marksheets. Misrepresentation can bring multi-year visa bans in the UK, USA, Canada and Australia.",
      "Scholarships that charge an application or \"processing\" fee.",
      "Forex or remittance offers outside banks and authorised dealers. The RBI publishes an Alert List of unauthorised forex platforms.",
      "Job offers abroad that require a payment, or recruiters not registered with the MEA (check eMigrate).",
      "\"Digital arrest\" calls from people posing as CBI, customs or police about a parcel or your passport. No Indian agency arrests anyone by video call; hang up and call 1930.",
    ] },
    { heading: "Scams after you arrive", checklist: [
      "Calls or messages claiming your visa, permit or tax record has a problem and demanding payment by gift card, crypto or transfer.",
      "Rental deposits for places you have not viewed.",
      "Jobs that ask you to receive and forward money (money mule work is a crime and ends visas).",
      "Fake parcel, bank or health-insurance messages asking you to \"confirm\" card details.",
      "Each country chapter on safety lists where to report locally.",
    ] },
    { heading: "If something goes wrong abroad", steps: [
      { title: "Danger or injury", body: "Call the local emergency number first (999/112 UK, 911 USA and Canada, 000 Australia, 112 France, Germany and Ireland). Then call your insurer to confirm cover." },
      { title: "Lost or stolen passport", body: "Report it to the local police and keep the report. Apply to the Indian embassy or consulate for a new passport or an emergency certificate. Then tell your university and the immigration authority if your visa was in the passport." },
      { title: "Arrested or detained", body: "Stay calm and ask for the Indian consulate to be told; consular notification is your right under international law. Ask for a lawyer before signing anything you do not understand." },
      { title: "Serious illness, accident or death", body: "Your university's international office, your insurer and the Indian mission work together. Families in India can request help through MADAD. In proven need, the Indian Community Welfare Fund run by missions can support Indian nationals in distress." },
    ] },
    { heading: "Before you fly", more: true, checklist: [
      "Save the Indian mission's website and emergency number in your phone.",
      "Share your address, university contact and insurance policy number with family.",
      "Keep scans of passport, visa and permits in secure cloud storage.",
      "Know your university's 24-hour security or emergency line.",
    ] },
  ],
  faqs: [
    { q: "How do I know if a study abroad agent is genuine?", a: "Check the university lists the agent on its own website, ask for a written fee agreement, and never pay tuition or visa fees into an agent's account. Verify the institution on the destination's official register yourself." },
    { q: "Who helps an Indian student in an emergency abroad?", a: "The local emergency services first, then your university and insurer, and the Indian embassy or consulate for passports, arrests and serious emergencies. Families in India can raise a request on the MEA's MADAD portal." },
    { q: "Where do I report an online fraud in India?", a: "Call 1930 or file a complaint at cybercrime.gov.in as soon as possible; quick reports improve the chance of freezing the money." },
  ],
  sources: [S.ukSponsors, S.sevp, S.dli, S.cricos, S.hochschulkompass, S.irish, S.campusFrance, S.cyber, S.rbi, S.emigrate, S.madad, S.passport],
  reviewedAt,
};

export const parentsChapter: GuideChapter = {
  slug: "parents-guide", path: p("parents-guide"), label: "A guide for parents", eyebrow: "FROM INDIA · CHAPTER 8",
  title: "For parents:", accent: "what to know and ask.",
  seoTitle: "Study Abroad Guide for Indian Parents",
  description: "Study abroad answers for Indian parents: true costs, loans and co-applicants, sending money, safety, health, visiting your child and checking an agent.",
  summary: "Parents usually carry the money, the loan and the worry. Plan the full cost of the whole course, not only the first year; most Indian education loans need a parent as co-applicant. Money goes abroad under the RBI's Liberalised Remittance Scheme, up to USD 250,000 per person per financial year. Part-time work helps with daily expenses but cannot be counted on for tuition, because visas require funds to be shown upfront. Universities cannot usually share a student's grades or health with parents without consent, so agree openly how you will stay in touch. Parents can visit on a visitor visa, for example for graduation.",
  facts: [
    { label: "Remittance limit (LRS)", value: "USD 250,000", note: "Per resident individual, per financial year" },
    { label: "Loan co-applicant", value: "Usually a parent" },
    { label: "Part-time work", value: "For living costs, not tuition" },
    { label: "Visiting", value: "Visitor visa", note: "Apply 2–3 months ahead" },
  ],
  blocks: [
    { heading: "The questions parents ask us most", steps: [
      { title: "How much will it really cost?", body: "Add tuition for every year, rent and living costs for every month, insurance, the visa and health surcharges, flights and a currency margin of 5–10%. Each country guide has a costs chapter with official figures." },
      { title: "Should we take a loan or use savings?", body: "Many families combine both. Loan-funded remittances from specified lenders carry no TCS, interest is deductible for eight years under the old tax regime, and savings stay available for emergencies. See the education loans and sending money chapters." },
      { title: "What does being a co-applicant mean?", body: "You are equally liable for repayment. If collateral is pledged, the property is at risk on default. Ask whether the lender requires term life insurance on the student." },
      { title: "Is it safe?", body: "All seven destinations are generally safe for students who use normal city precautions. Each country guide has a safety and emergencies chapter with local numbers and the Indian mission's details." },
      { title: "What if our child falls ill?", body: "Student health insurance or national health cover is mandatory for the visa or enrolment in every destination. Keep a copy of the policy and the university's 24-hour contact." },
      { title: "Can they pay fees by working?", body: "Not reliably. Work is capped (about 20 hours a week in term in most countries; 140 full days a year in Germany) and visas require proof of funds before departure. Earnings typically cover part of daily expenses." },
    ] },
    { heading: "Staying in touch, and spotting trouble", paragraphs: [
      "Under privacy laws in the UK, EU, USA, Canada and Australia, universities generally will not share marks, attendance or health information with parents unless the student consents. Agree on a regular call time and ask your child to name you as an emergency contact with the university.",
      "Withdrawal, missed calls, sudden money requests or talk of dropping out can signal stress, failing modules or a scam. Ask calmly and point them to the university's free counselling service. Each country guide's safety chapter lists free crisis lines.",
    ] },
    { heading: "Checking an agent or consultant", checklist: [
      "Ask for a written list of services and fees before paying.",
      "Check that universities they claim to represent list them on their own websites.",
      "Pay tuition directly to the university, never to an agent's account.",
      "Walk away from \"guaranteed\" admissions or visas, or advice to show borrowed funds.",
      "Keep copies of every application your child submits; it should be in their own account and email.",
    ] },
    { heading: "Visiting your child", table: {
      head: ["Destination", "Visa for parents"],
      rows: [
        ["UK", "Standard Visitor visa"],
        ["USA", "B-2 visitor visa (interview needed; check wait times early)"],
        ["France, Germany", "Schengen short-stay visa (type C), up to 90 days in any 180"],
        ["Ireland", "Irish short-stay visa (type C); Schengen visas do not cover Ireland"],
        ["Canada", "Visitor visa (temporary resident visa)"],
        ["Australia", "Visitor visa (subclass 600)"],
      ],
      caption: "A letter from the university confirming graduation dates, your child's enrolment and proof of your funds and ties to India help the application.",
    } },
  ],
  faqs: [
    { q: "How much money can parents send abroad for a child's education?", a: "Up to USD 250,000 per resident individual per financial year under the RBI's Liberalised Remittance Scheme. TCS depends on whether the money is loan-funded; see the sending money chapter." },
    { q: "Can parents visit their child studying abroad?", a: "Yes, on a visitor visa: Standard Visitor (UK), B-2 (USA), Schengen type C (France, Germany), Irish type C, Canadian visitor visa or Australian subclass 600. Apply two to three months ahead." },
    { q: "Will the university tell us about our child's grades?", a: "Usually not without the student's written consent, because of privacy laws. Agree with your child how you will stay informed." },
  ],
  sources: [S.rbiLrs, S.ukVisit, S.usVisit, S.schengen, S.irish, S.caVisit, S.auVisit, S.madad],
  reviewedAt,
};
