import type { ChapterDepth } from "../types";

/** In-depth Canada content, merged into the Canada chapters. Figures repeat guides/canada.ts (reviewed October 2026). */
const S = {
  dli: { label: "IRCC · Designated learning institutions list", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/prepare/designated-learning-institutions-list.html" },
  gic: { label: "IRCC · Proof of financial support", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/study-permit/get-documents/financial-support.html" },
  sin: { label: "Service Canada · Social Insurance Number", url: "https://www.canada.ca/en/employment-social-development/services/sin.html" },
  pgwp: { label: "IRCC · Post-graduation work permit", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada/work/after-graduation.html" },
  ee: { label: "IRCC · Express Entry", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html" },
  medical: { label: "IRCC · Medical exams for visitors, students and workers", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/medical-police/medical-exams/requirements-temporary-residents.html" },
  hci: { label: "High Commission of India in Ottawa", url: "https://www.hciottawa.gov.in/" },
  caq: { label: "Québec · Certificate of acceptance (CAQ)", url: "https://www.quebec.ca/en/immigration/study-quebec" },
};

export const canadaDepth: Record<string, ChapterDepth> = {
  "why-study": {
    blocks: [
      { heading: "University or college?", table: {
        head: ["", "University", "College / polytechnic"],
        rows: [["Programmes", "Bachelor's, master's, PhD", "Diplomas, postgraduate certificates, applied degrees"], ["Cost", "Higher", "Lower"], ["Teaching", "Academic and research", "Hands-on, industry-focused"], ["PGWP rules", "Degree programmes: no field-of-study list", "Most programmes must match an eligible field"], ["Spouse open work permit", "Master's of 16+ months and PhD", "Generally not available"]],
      } },
      { heading: "Things to know before choosing Canada", checklist: [
        "Study permits are capped each year; most applicants need a provincial attestation letter (PAL/TAL)",
        "Housing is tight in Toronto and Vancouver; budget more or consider other cities",
        "Winters are long and cold in most provinces",
        "PGWP eligibility depends on your programme and language score",
        "Permanent residence is competitive and points-based",
      ] },
    ],
    faqs: [
      { q: "Is Canada still good for Indian students?", a: "Yes for students who choose eligible programmes at strong institutions, plan their money carefully and understand the caps and PGWP rules. It is no longer an easy route for low-cost college programmes alone." },
    ],
    sources: [S.dli],
  },

  "education-system": {
    blocks: [
      { heading: "Programme lengths and credentials", table: {
        head: ["Credential", "Length", "Typical entry"],
        rows: [["Postgraduate certificate (college)", "8 months–1 year", "Bachelor's degree"], ["Advanced diploma", "3 years", "Class 12"], ["Bachelor's degree", "4 years", "Class 12"], ["Course-based master's", "1–2 years", "Bachelor's (often 4-year)"], ["Thesis-based master's", "2 years", "Strong academics; often funded"], ["PhD", "4–6 years", "Master's"]],
      } },
      { heading: "Intakes", paragraphs: [
        "September (fall) has the most programmes, January (winter) has a good number, and May (summer) is limited, mostly at colleges. Apply 9–12 months before your intake to have time for the PAL, study permit and housing.",
      ] },
    ],
    faqs: [
      { q: "Is a one-year postgraduate certificate in Canada worth it?", a: "Only if it is in a PGWP-eligible field, at a reputable college, and leads to jobs you want. The PGWP length usually matches the programme length for one-year programmes." },
    ],
  },

  admissions: {
    blocks: [
      { heading: "Documents Canadian institutions ask for", checklist: [
        "Transcripts and degree certificates (some ask for WES evaluation)",
        "IELTS Academic, TOEFL, PTE or Duolingo",
        "Statement of purpose or letter of intent",
        "Two or three references for master's",
        "CV / résumé",
        "Passport",
        "GRE or GMAT for some programmes",
      ] },
      { heading: "Timeline for a September start", table: {
        head: ["When", "What to do"],
        rows: [["August–October", "Shortlist and take tests"], ["October–February", "Apply (university deadlines often January–February)"], ["February–May", "Offers; pay deposit; request your PAL/TAL through the institution"], ["May–July", "Study permit application with biometrics"], ["August", "Housing and travel"]],
      } },
    ],
    faqs: [
      { q: "Do Canadian universities accept 3-year Indian degrees?", a: "Many universities ask for a 4-year bachelor's for master's admission; some accept 3-year degrees with a master's or strong grades. Colleges usually accept 3-year degrees for postgraduate certificates." },
    ],
  },

  "application-process": {
    blocks: [
      { heading: "Provincial attestation letter (PAL / TAL)", paragraphs: [
        "Most study permit applicants need a letter from the province or territory showing they fit within the national cap. Your institution requests it after you accept the offer. Master's and doctoral students at public institutions are exempt from 2025. Apply only after you have the PAL if it is required — applications without it are returned.",
      ] },
      { heading: "Study permit steps", steps: [
        { title: "Letter of acceptance from a DLI", body: "Check the institution is on the designated learning institutions list." },
        { title: "PAL / TAL if required", body: "Requested by your institution." },
        { title: "Proof of funds", body: "First-year tuition plus CAD 23,448 living costs for one person (applications from 1 September 2026), plus travel." },
        { title: "Apply online", body: "Pay CAD 150 and CAD 85 biometrics; give biometrics at VFS." },
        { title: "Medical exam", body: "With an IRCC panel physician, if instructed." },
        { title: "Port of entry letter", body: "Your study permit itself is issued at the border on arrival." },
      ] },
    ],
    faqs: [
      { q: "What is a GIC?", a: "A Guaranteed Investment Certificate from a participating Canadian bank, often used to show living funds. You deposit the amount before applying; it is released to you in instalments after arrival." },
    ],
    sources: [S.gic, S.medical],
  },

  "language-tests": {
    blocks: [
      { heading: "Scores for study and for later", table: {
        head: ["Purpose", "Test", "Typical requirement"],
        rows: [["University master's", "IELTS Academic / TOEFL / PTE", "IELTS 6.5 overall"], ["College programmes", "IELTS Academic or equivalent", "IELTS 6.0 overall"], ["PGWP (degree programmes)", "IRCC-approved test", "CLB 7 in all four skills"], ["PGWP (college programmes)", "IRCC-approved test", "CLB 5 in all four skills"], ["Permanent residence (Express Entry)", "IELTS General, CELPIP, PTE Core, TEF/TCF", "Higher scores earn more points"]],
      } },
    ],
    faqs: [
      { q: "Do I need a new language test for the PGWP?", a: "You must submit an approved test result showing the required CLB level, valid at the time you apply for the PGWP. Plan a test in your final term if your earlier score has expired or is too low." },
    ],
  },

  "sop-lor-cv": {
    blocks: [
      { heading: "Study plan for the visa", paragraphs: [
        "Besides the SOP for admission, many applicants include a study plan (letter of explanation) with the study permit application: why this programme, why Canada, how it fits your education and career, how you will pay, and your plans after graduating. It should match your other documents exactly.",
      ] },
      { heading: "Canadian résumé basics", checklist: [
        "No photo, age, marital status or religion",
        "Achievements with numbers, not duties",
        "Two pages maximum for experienced candidates",
        "Volunteer experience is valued",
        "Tailor keywords to each job — many employers use applicant tracking systems",
      ] },
    ],
  },

  costs: {
    blocks: [
      { heading: "Yearly budget", table: {
        head: ["Item", "Toronto / Vancouver", "Other cities"],
        rows: [["Tuition (master's)", "CAD 25,000–55,000", "CAD 18,000–40,000"], ["Rent (shared)", "CAD 12,000–20,000", "CAD 7,000–12,000"], ["Food", "CAD 4,000–6,000", "CAD 3,500–5,000"], ["Transport pass", "CAD 1,000–1,800", "CAD 600–1,200"], ["Health insurance", "University or provincial plan", "University or provincial plan"], ["Winter clothing (one-time)", "CAD 400–800", "CAD 400–800"]],
      } },
      { heading: "In rupees", paragraphs: [
        "At roughly ₹60–65 to the Canadian dollar (check the current rate), a one-year college programme typically costs ₹18–28 lakh including living costs, and a two-year master's ₹35–60 lakh.",
      ] },
    ],
    faqs: [
      { q: "Which Canadian cities are cheaper for students?", a: "Cities like Winnipeg, Halifax, Saskatoon, Regina, Edmonton and Montreal (for rent) are generally cheaper than Toronto and Vancouver." },
    ],
  },

  scholarships: {
    blocks: [
      { heading: "Where to look", checklist: [
        "Entrance scholarships at universities, often automatic",
        "Funded thesis-based master's and PhDs (research assistantships)",
        "Provincial graduate scholarships for research students",
        "Vanier and other federal awards for doctoral students",
        "College bursaries after the first term",
      ] },
    ],
    faqs: [
      { q: "Are there full scholarships in Canada for Indian students?", a: "Mostly for research master's and PhDs, where funding packages cover tuition and a stipend. Course-based master's and college programmes usually offer partial awards." },
    ],
  },

  "funding-loans": {
    blocks: [
      { heading: "Accepted proof of funds", checklist: [
        "GIC from a participating bank",
        "Education loan from a financial institution",
        "Bank statements for the past four to six months",
        "Proof of paid tuition and housing",
        "Scholarship or funding letters",
        "A letter from the person or school giving you money",
      ] },
      { heading: "Red flags for visa officers", checklist: [
        "Large deposits just before applying without an explanation",
        "Funds that do not match the sponsor's income",
        "Unclear relationships with sponsors",
        "Documents that cannot be verified",
      ] },
    ],
    faqs: [
      { q: "Is a GIC mandatory for Canada?", a: "No. It is one accepted way to show living funds. Bank statements, loans and other evidence also work, as long as the funds are genuine and available." },
    ],
  },

  visa: {
    blocks: [
      { heading: "Common refusal reasons", checklist: [
        "Not convinced you will leave Canada at the end of your stay",
        "Insufficient or unclear funds",
        "Purpose of visit or study plan not consistent with your background",
        "Missing PAL or documents",
      ] },
      { heading: "Quebec is different", paragraphs: [
        "For study in Quebec you first need a Quebec Acceptance Certificate (CAQ) from the provincial government, then the federal study permit. Living-cost amounts for Quebec are set by the province. Allow extra weeks.",
      ] },
    ],
    faqs: [
      { q: "How long does a Canadian study permit take from India?", a: "Processing times change; check the IRCC processing-time tool before applying and apply as soon as you have your PAL and documents." },
      { q: "Can I travel to Canada before my study permit is approved?", a: "No. Wait for the approval letter (port of entry letter) and visitor visa or eTA, then travel." },
    ],
    sources: [S.caq],
  },

  "pre-departure": {
    blocks: [
      { heading: "Documents for the border", checklist: [
        "Passport with visa",
        "Port of entry letter of introduction",
        "Letter of acceptance and PAL if applicable",
        "Proof of funds (GIC certificate, bank letters)",
        "Medical exam result if required",
        "Address in Canada",
      ] },
      { heading: "Packing for Canadian winters", checklist: [
        "Buy a proper winter coat and boots in Canada — Indian winter wear is rarely warm enough",
        "Thermal layers, gloves, toque (beanie) and scarf",
        "Moisturiser and lip balm for dry air",
        "Type A/B plug adapters",
      ] },
    ],
  },

  arrival: {
    blocks: [
      { heading: "First two weeks", steps: [
        { title: "At the border", body: "Check your study permit carefully — the conditions and expiry date must be correct." },
        { title: "SIN", body: "Apply for a Social Insurance Number at Service Canada or online to work." },
        { title: "Bank and phone", body: "Student accounts at major banks; prepaid or postpaid plans." },
        { title: "Health coverage", body: "Enrol in your university plan and provincial coverage where available." },
        { title: "Transit pass", body: "Most universities include or discount a student pass." },
      ] },
    ],
    faqs: [
      { q: "What if my study permit has an error?", a: "Ask the border officer to correct it on arrival if possible. Otherwise apply to IRCC to amend the document; do not work under incorrect conditions." },
    ],
    sources: [S.sin, S.hci],
  },

  housing: {
    blocks: [
      { heading: "Avoid rental scams", checklist: [
        "Never send a deposit before seeing the place and signing a lease",
        "Be wary of prices far below the market",
        "Verify the landlord's identity and ownership",
        "Use university housing boards and verified platforms",
        "Know your province's tenant rights (e.g. Ontario standard lease)",
      ] },
    ],
    faqs: [
      { q: "Where do Indian students live in Canada?", a: "On-campus residence in the first year if available, then shared apartments or basements near campus or transit, often found through university and community groups." },
    ],
  },

  "health-banking": {
    blocks: [
      { heading: "Health coverage by province", table: {
        head: ["Province", "International students"],
        rows: [["Ontario", "University Health Insurance Plan (UHIP) through your institution"], ["British Columbia", "MSP after a waiting period; private cover until then"], ["Alberta", "Provincial plan available to eligible students"], ["Quebec", "Mandatory university insurance for most students"], ["Others", "Check your institution's international office"]],
        caption: "Rules change; your institution confirms what applies to you.",
      } },
    ],
  },

  "part-time-work": {
    blocks: [
      { heading: "Rules to stay compliant", checklist: [
        "You must be a full-time student in an eligible programme",
        "Up to 24 hours a week off campus during academic sessions",
        "Full time during scheduled breaks",
        "On-campus work has no weekly cap for eligible students",
        "Co-op work permits are separate and required for mandatory work terms",
        "Stop working off campus if you drop to part-time studies (except in your final term)",
      ] },
    ],
    faqs: [
      { q: "What is the minimum wage in Canada for students?", a: "Minimum wage is set by each province and changes yearly; it is the same for students as for other workers. Check your province's employment standards page." },
    ],
  },

  "after-graduation": {
    blocks: [
      { heading: "From PGWP to permanent residence", steps: [
        { title: "Apply for the PGWP within 180 days", body: "With your final marks or completion letter and language test result." },
        { title: "Work in a skilled job (TEER 0–3)", body: "One year of Canadian skilled experience makes you eligible for the Canadian Experience Class." },
        { title: "Create an Express Entry profile", body: "Points come from age, education, language, Canadian experience and job offers." },
        { title: "Look at provincial programmes", body: "Some provinces nominate international graduates or workers in demand." },
      ] },
    ],
    faqs: [
      { q: "How long is the PGWP after a master's in Canada?", a: "Eligible master's graduates can get up to three years, even for programmes shorter than two years, subject to current IRCC rules." },
    ],
    sources: [S.pgwp, S.ee],
  },

  jobs: {
    blocks: [
      { heading: "How students land jobs", checklist: [
        "Co-op programmes give paid work terms — the strongest route",
        "Canadian-format résumé and LinkedIn",
        "Networking events and informational interviews",
        "Job Bank, Indeed, LinkedIn and university career portals",
        "Volunteering to build Canadian references",
      ] },
    ],
  },

  faq: {
    faqs: [
      { q: "Can my spouse come with me to Canada?", a: "Spouses of master's students in programmes of 16 months or more, PhD students and some professional programmes can get an open work permit. Others can apply as visitors." },
      { q: "Can I change college after getting a study permit?", a: "You can change institutions by updating your file online, but you must keep meeting permit conditions and the new programme may affect PGWP eligibility." },
      { q: "Is SDS still available for Indian students?", a: "No. The Student Direct Stream ended in November 2024; all applicants use the regular study permit process." },
    ],
  },
};
