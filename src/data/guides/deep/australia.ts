import type { ChapterDepth } from "../types";

/** In-depth Australia content, merged into the Australia chapters. Figures repeat guides/australia.ts (reviewed October 2026). */
const S = {
  cricos: { label: "CRICOS · Registered courses", url: "https://cricos.education.gov.au/" },
  studyAus: { label: "Study Australia", url: "https://www.studyaustralia.gov.au/" },
  oshc: { label: "Department of Home Affairs · Health insurance (OSHC)", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/health-insurance" },
  tfn: { label: "Australian Taxation Office · Tax file number", url: "https://www.ato.gov.au/individuals-and-families/tax-file-number" },
  fairwork: { label: "Fair Work Ombudsman · International students", url: "https://www.fairwork.gov.au/find-help-for/visa-holders-and-migrants" },
  gs: { label: "Department of Home Affairs · Genuine Student requirement", url: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/genuine-student-requirement" },
  hci: { label: "High Commission of India, Canberra", url: "https://www.hcicanberra.gov.in/" },
};

export const australiaDepth: Record<string, ChapterDepth> = {
  "why-study": {
    blocks: [
      { heading: "Where students go", table: {
        head: ["City", "Strengths", "Cost"],
        rows: [["Sydney", "Finance, tech, healthcare; largest job market", "Highest"], ["Melbourne", "Universities, IT, arts, large Indian community", "High"], ["Brisbane", "Engineering, mining tech, lower rent", "Medium"], ["Adelaide", "Defence, space, health; regional migration benefits", "Lower"], ["Perth", "Mining, energy, engineering", "Medium"], ["Canberra", "Government, research, ANU", "Medium"]],
      } },
      { heading: "Know the trade-offs", checklist: [
        "Visa fee and living-cost requirements have risen",
        "Enrolment caps and stricter Genuine Student checks",
        "Distance and flight cost to India",
        "Strong post-study visa for Indians under the India–Australia trade agreement (ECTA)",
        "Regional study can add post-study time and migration points",
      ] },
    ],
    faqs: [
      { q: "Is Australia good for Indian students?", a: "Yes for students choosing reputable universities and in-demand fields. Indians get longer post-study work rights under ECTA, and wages for part-time work are high, but living and visa costs are significant." },
    ],
    sources: [S.studyAus],
  },

  "education-system": {
    blocks: [
      { heading: "Qualification levels", table: {
        head: ["AQF level", "Qualification", "Length"],
        rows: [["7", "Bachelor's degree", "3 years (4 with honours or engineering)"], ["8", "Graduate certificate / diploma", "6 months–1 year"], ["9", "Master's degree", "1.5–2 years"], ["10", "Doctoral degree", "3–4 years"]],
      } },
      { heading: "Intakes", paragraphs: [
        "The main intakes are February (Semester 1) and July (Semester 2); some universities run trimesters with a November intake. Apply 6–9 months ahead. Check that your course is CRICOS-registered — only registered courses lead to a student visa.",
      ] },
    ],
    faqs: [
      { q: "What is CRICOS?", a: "The Commonwealth Register of Institutions and Courses for Overseas Students. Your course must be on it for a student visa." },
    ],
    sources: [S.cricos],
  },

  admissions: {
    blocks: [
      { heading: "Documents", checklist: [
        "Transcripts and degree",
        "IELTS, PTE, TOEFL or other accepted test",
        "Statement of purpose (some universities)",
        "CV and work experience letters",
        "Passport",
        "Evidence for the Genuine Student statement",
      ] },
    ],
    faqs: [
      { q: "Do Australian universities accept 3-year Indian degrees?", a: "Yes, most accept 3-year bachelor's degrees for many master's programmes; some professional programmes need 4 years or specific subjects." },
    ],
  },

  "application-process": {
    blocks: [
      { heading: "From offer to CoE", steps: [
        { title: "Offer letter", body: "Conditional or unconditional." },
        { title: "Genuine Student assessment by the university", body: "Many universities check funds and intent before issuing the CoE." },
        { title: "Accept and pay", body: "Deposit and Overseas Student Health Cover (OSHC)." },
        { title: "Confirmation of Enrolment (CoE)", body: "Needed for the visa application." },
        { title: "Visa application", body: "Online in ImmiAccount; biometrics and health check if asked." },
      ] },
    ],
    sources: [S.gs],
  },

  "language-tests": {
    blocks: [
      { heading: "Typical scores", table: {
        head: ["Test", "Most master's"],
        rows: [["IELTS Academic", "6.5 overall, 6.0 each band"], ["PTE Academic", "58–64"], ["TOEFL iBT", "79–90"]],
        caption: "Nursing, teaching and law ask for higher scores.",
      } },
    ],
  },

  "sop-lor-cv": {
    blocks: [
      { heading: "Genuine Student statement", checklist: [
        "Your circumstances: family, finances, ties to India",
        "Why this course and provider, with specifics",
        "How it connects to your previous study or work",
        "How it benefits your future",
        "Consistent with your documents — officers compare everything",
      ] },
    ],
  },

  costs: {
    blocks: [
      { heading: "Yearly budget", table: {
        head: ["Item", "Sydney / Melbourne", "Other cities"],
        rows: [["Tuition (master's)", "AUD 35,000–55,000", "AUD 30,000–45,000"], ["Rent (shared)", "AUD 14,000–22,000", "AUD 10,000–16,000"], ["Food and essentials", "AUD 5,000–7,000", "AUD 4,500–6,000"], ["OSHC", "AUD 600–800 a year", "AUD 600–800 a year"], ["Transport", "AUD 1,000–2,000", "AUD 800–1,500"]],
      } },
      { heading: "In rupees", paragraphs: [
        "At roughly ₹55–58 to the Australian dollar (check the current rate), a two-year master's typically costs ₹55–85 lakh including living costs before part-time earnings.",
      ] },
    ],
  },

  scholarships: {
    blocks: [
      { heading: "Options", checklist: [
        "University merit scholarships for Indian students (often 10–30% of tuition)",
        "Australia Awards (not usually available to Indian citizens — check eligibility)",
        "Research Training Program scholarships for PhD and research master's",
        "State government scholarships in some states",
      ] },
    ],
  },

  "funding-loans": {
    blocks: [
      { heading: "Evidence of funds", checklist: [
        "Living costs of AUD 29,710 for 12 months, plus tuition and travel",
        "Bank statements with a history of savings",
        "Education loan sanction letters",
        "Sponsor income evidence (ITRs)",
        "Clear source of funds for any large deposits",
      ] },
    ],
  },

  visa: {
    blocks: [
      { heading: "Visa conditions", checklist: [
        "Maintain enrolment and satisfactory progress",
        "Keep OSHC for your whole stay",
        "Work up to 48 hours a fortnight in study periods",
        "Update your address with your provider within 7 days",
        "Do not change to a lower qualification without a new visa",
      ] },
    ],
    faqs: [
      { q: "What is the Australian student visa fee in 2026?", a: "AUD 2,500 for most applicants from 1 July 2026, paid online when you lodge the visa." },
    ],
  },

  "pre-departure": {
    blocks: [
      { heading: "Biosecurity: what not to bring", checklist: [
        "Declare all food, plant and animal products on your incoming passenger card",
        "Meat, dairy, fresh fruit and seeds are generally not allowed",
        "Packaged spices and snacks must be declared; many are allowed after inspection",
        "Medicines in personal quantities with a prescription",
        "Undeclared items can lead to large fines",
      ] },
    ],
  },

  arrival: {
    blocks: [
      { heading: "First two weeks", steps: [
        { title: "SIM and bank", body: "Banks let you open accounts quickly with your passport." },
        { title: "Tax file number", body: "Apply online with the ATO before starting work." },
        { title: "Orientation", body: "Attend university orientation and register for classes." },
        { title: "Transport card", body: "Opal (Sydney), myki (Melbourne) or the local card; check student concessions." },
      ] },
    ],
    sources: [S.tfn, S.hci],
  },

  housing: {
    blocks: [
      { heading: "Rental basics", checklist: [
        "Bond is usually four weeks' rent, lodged with a state authority",
        "Get a condition report when you move in",
        "Use Flatmates, Domain, realestate.com.au and university boards",
        "Do not pay before inspecting and signing",
      ] },
    ],
  },

  "health-banking": {
    blocks: [
      { heading: "Using OSHC", paragraphs: [
        "OSHC covers GP visits and hospital care up to set fees. Many GPs bulk-bill or charge a gap. Keep your OSHC card and claim through the insurer's app. Call 000 for emergencies.",
      ] },
    ],
    sources: [S.oshc],
  },

  "part-time-work": {
    blocks: [
      { heading: "Your rights at work", checklist: [
        "You have the same workplace rights as Australian workers",
        "Minimum wages and award rates apply — cash-in-hand underpayment is illegal",
        "Keep payslips and records of hours",
        "Fair Work Ombudsman helps without affecting your visa if you report exploitation",
        "Superannuation is paid by your employer and can be claimed when you leave Australia",
      ] },
    ],
    sources: [S.fairwork],
  },

  "after-graduation": {
    blocks: [
      { heading: "Temporary Graduate visa (485) tips", checklist: [
        "Apply within 6 months of course completion",
        "Meet the English requirement at the time of application",
        "Hold health insurance and an AFP police check",
        "Regional study may add extra time",
        "Use it to gain skilled experience for permanent visas",
      ] },
    ],
  },

  jobs: {
    blocks: [
      { heading: "Getting hired", checklist: [
        "Australian-format résumé (2–3 pages) and cover letter",
        "Seek, LinkedIn and university career portals",
        "Internships and work-integrated learning units",
        "Graduate programmes open February–April for the following year",
      ] },
    ],
  },

  faq: {
    faqs: [
      { q: "Can my spouse work in Australia while I study?", a: "Dependants of students can usually work up to 48 hours a fortnight; dependants of master's and PhD students may have broader rights. Check current conditions." },
      { q: "What is the Genuine Student requirement?", a: "The test that replaced GTE: you must show you are a genuine student, through your circumstances, study plan and its value to your future." },
    ],
  },
};
