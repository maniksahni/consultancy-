import type { ChapterDepth } from "../types";

/** In-depth Ireland content, merged into the Ireland chapters. Figures repeat guides/ireland.ts (reviewed October 2026). */
const S = {
  ilep: { label: "Irish Immigration Service · Interim List of Eligible Programmes", url: "https://www.irishimmigration.ie/coming-to-study-in-ireland/what-are-my-study-options/" },
  irp: { label: "Irish Immigration Service · Registration", url: "https://www.irishimmigration.ie/registering-your-immigration-permission/" },
  pps: { label: "gov.ie · PPS number", url: "https://www.gov.ie/en/service/12e6dc-get-a-personal-public-service-pps-number/" },
  csep: { label: "DETE · Critical Skills Employment Permit", url: "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/permit-types/critical-skills-employment-permit/" },
  daft: { label: "Daft.ie", url: "https://www.daft.ie/" },
  embassy: { label: "Embassy of India, Dublin", url: "https://www.indianembassydublin.gov.in/" },
  rtb: { label: "Residential Tenancies Board", url: "https://www.rtb.ie/" },
};

export const irelandDepth: Record<string, ChapterDepth> = {
  "why-study": {
    blocks: [
      { heading: "Ireland compared with the UK", table: {
        head: ["", "Ireland", "UK"],
        rows: [["Master's length", "Usually 1 year", "Usually 1 year"], ["After graduation", "Stamp 1G up to 24 months (level 9)", "Graduate visa"], ["EU membership", "Yes — EU job market access later", "No"], ["Big employers", "Tech and pharma European headquarters", "Broad across sectors"], ["Housing", "Very tight, especially Dublin", "Tight in London"]],
      } },
      { heading: "Cities", table: {
        head: ["City", "Known for"],
        rows: [["Dublin", "Tech headquarters, finance, Trinity, UCD, DCU"], ["Cork", "Pharma, tech, University College Cork, MTU"], ["Galway", "Medical devices, University of Galway, ATU"], ["Limerick", "Manufacturing, University of Limerick"], ["Maynooth", "Research university near Dublin"]],
      } },
    ],
    faqs: [
      { q: "Is Ireland good for Indian students?", a: "Yes for one-year master's in tech, data, pharma and business, with up to two years of Stamp 1G afterwards. Plan housing early and budget for high rents." },
    ],
  },

  "education-system": {
    blocks: [
      { heading: "Institution types", checklist: [
        "Universities — research and taught degrees",
        "Technological universities — applied, industry-linked programmes",
        "Private colleges — check the programme is on the eligible list for student permission",
        "Programmes must be on the Interim List of Eligible Programmes (ILEP) for non-EEA students",
      ] },
    ],
    sources: [S.ilep],
  },

  admissions: {
    blocks: [
      { heading: "Typical requirements", table: {
        head: ["Requirement", "Typical"],
        rows: [["Indian bachelor's", "60–70% (2:1 equivalent) for most master's"], ["IELTS Academic", "6.5 overall, 6.0 each band"], ["Work experience", "Needed for MBA and some management programmes"], ["Application window", "October to spring, rolling"]],
      } },
      { heading: "Application checklist", checklist: [
        "Transcripts and degree certificate",
        "English test result",
        "Statement of purpose",
        "Two references",
        "CV",
        "Passport",
        "Application fee where required",
      ] },
    ],
  },

  "application-process": {
    blocks: [
      { heading: "Visa application details", checklist: [
        "Online application with AVATS, then documents to VFS",
        "Letter of acceptance from an ILEP-listed programme",
        "Tuition paid (usually in full, or at least the required amount)",
        "Evidence of €10,000 for living costs in year 1",
        "Private medical insurance",
        "Explanation of any gaps in your education",
        "Commitment to leave Ireland when permission ends",
      ] },
    ],
  },

  "language-tests": {
    blocks: [
      { heading: "Accepted tests", table: {
        head: ["Test", "Common master's requirement"],
        rows: [["IELTS Academic", "6.5 (6.0 each band)"], ["TOEFL iBT", "88–90"], ["PTE Academic", "62–65"], ["Duolingo", "Accepted by some institutions"]],
      } },
    ],
  },

  "sop-lor-cv": {
    blocks: [
      { heading: "Irish CV tips", checklist: [
        "Two pages, reverse chronological",
        "No photo or personal details",
        "Results and skills tied to the job",
        "Include your Stamp and right-to-work status when job hunting",
      ] },
    ],
  },

  costs: {
    blocks: [
      { heading: "Yearly budget", table: {
        head: ["Item", "Dublin", "Other cities"],
        rows: [["Tuition (master's)", "€15,000–30,000", "€13,000–25,000"], ["Rent (room)", "€8,000–14,000", "€5,500–9,000"], ["Food and essentials", "€3,000–4,500", "€2,800–4,000"], ["Transport", "€500–1,000", "€300–700"], ["IRP registration", "€300", "€300"], ["Medical insurance", "€150–500", "€150–500"]],
      } },
      { heading: "In rupees", paragraphs: [
        "At roughly ₹95–105 to the euro (check the current rate), a one-year master's in Ireland typically totals ₹25–40 lakh including living costs.",
      ] },
    ],
  },

  scholarships: {
    blocks: [
      { heading: "Options", checklist: [
        "Government of Ireland International Education Scholarship (one year, stipend and fee waiver)",
        "University scholarships for Indian students (fee reductions)",
        "Research scholarships for PhD students",
      ] },
    ],
  },

  "funding-loans": {
    blocks: [
      { heading: "Showing your funds", checklist: [
        "Statements showing €10,000 available for living costs",
        "Sponsor letters and income proof if parents fund you",
        "Education loan letters",
        "Tuition receipts",
        "A clear history — avoid unexplained deposits",
      ] },
    ],
  },

  visa: {
    blocks: [
      { heading: "After arriving: register (IRP)", steps: [
        { title: "Book a registration appointment", body: "Online, as soon as you arrive." },
        { title: "Bring documents", body: "Passport, college letter, insurance, finance evidence and the €300 fee." },
        { title: "Receive your IRP card", body: "Stamp 2 shows your student permission and work rights." },
      ] },
    ],
    sources: [S.irp],
  },

  "pre-departure": {
    blocks: [
      { heading: "Before you fly", checklist: [
        "Confirm accommodation — do not arrive without at least temporary housing",
        "Carry finance evidence for registration",
        "Rain jacket and layers",
        "Type G plug adapters",
        "Original documents in hand luggage",
      ] },
    ],
  },

  arrival: {
    blocks: [
      { heading: "First weeks", steps: [
        { title: "IRP registration", body: "Book and attend your appointment." },
        { title: "PPS number", body: "Needed to work and for tax; apply online after you have an address." },
        { title: "Bank account", body: "AIB, Bank of Ireland, PTSB or app banks." },
        { title: "Leap card", body: "Student Leap card for cheaper public transport." },
      ] },
    ],
    sources: [S.pps, S.embassy],
  },

  housing: {
    blocks: [
      { heading: "Finding a room in Ireland", checklist: [
        "Apply for college accommodation as soon as you accept the offer",
        "Use Daft.ie and university accommodation boards",
        "Consider towns near Dublin with good train links",
        "Check deposits and tenancy registration with the RTB",
        "Never pay a deposit for a property you have not verified",
      ] },
    ],
    faqs: [
      { q: "Why is housing so hard in Dublin?", a: "Demand far exceeds supply. Students who secure college or private student accommodation before arriving avoid most problems." },
    ],
    sources: [S.daft, S.rtb],
  },

  "health-banking": {
    blocks: [
      { heading: "Health basics", paragraphs: [
        "You need private medical insurance for your permission. GP visits are not free, typically costing €50–70 per visit; your college may have a student health centre with lower fees. Call 112 or 999 in an emergency.",
      ] },
    ],
  },

  "part-time-work": {
    blocks: [
      { heading: "Work rules", checklist: [
        "Up to 20 hours a week in term",
        "Up to 40 hours a week in June–September and 15 December–15 January",
        "Only for students on a degree-level programme (Stamp 2)",
        "PPS number and Irish bank account needed",
        "Employers must pay the national minimum wage",
      ] },
    ],
  },

  "after-graduation": {
    blocks: [
      { heading: "From Stamp 1G to work permits", steps: [
        { title: "Stamp 1G", body: "12 months after level 8, up to 24 months after level 9 — work full time and look for jobs." },
        { title: "Critical Skills Employment Permit", body: "For in-demand jobs at the required salary; leads to Stamp 4 after two years." },
        { title: "General Employment Permit", body: "For other eligible jobs with a labour market test." },
        { title: "Stamp 4", body: "Live and work without a permit; counts towards citizenship." },
      ] },
    ],
    sources: [S.csep],
  },

  jobs: {
    blocks: [
      { heading: "Where Indian graduates get hired", checklist: [
        "Tech companies' European headquarters in Dublin",
        "Pharma and medical devices in Cork, Galway and Limerick",
        "Financial services and funds administration",
        "LinkedIn, IrishJobs.ie, Jobs.ie and graduate fairs",
      ] },
    ],
  },

  faq: {
    faqs: [
      { q: "Can I bring family to Ireland as a student?", a: "Students generally cannot bring dependants, except in limited cases such as some PhD students. Family can usually join later once you hold a work permit." },
      { q: "Is Ireland part of Schengen?", a: "No. Your Irish permission does not allow travel in Schengen; you need a separate Schengen visa." },
    ],
  },
};
