import type { ChapterDepth } from "../types";

/** In-depth UK content, merged into the UK chapters. Fees repeat guides/uk.ts (reviewed October 2026). */
const S = {
  sponsors: { label: "GOV.UK · Register of licensed sponsors", url: "https://www.gov.uk/government/publications/register-of-licensed-sponsors-workers" },
  tb: { label: "GOV.UK · TB tests for visa applicants", url: "https://www.gov.uk/tb-test-visa" },
  evisa: { label: "GOV.UK · Get access to your eVisa", url: "https://www.gov.uk/get-access-evisa" },
  councilTax: { label: "GOV.UK · Council Tax discounts for students", url: "https://www.gov.uk/council-tax/discounts-for-full-time-students" },
  rightToRent: { label: "GOV.UK · Right to rent checks", url: "https://www.gov.uk/prove-right-to-rent" },
  railcard: { label: "16–25 Railcard", url: "https://www.16-25railcard.co.uk/" },
  ukcisa: { label: "UKCISA · Advice for international students", url: "https://www.ukcisa.org.uk/" },
  hcl: { label: "High Commission of India, London", url: "https://www.hcilondon.gov.in/" },
  prospects: { label: "Prospects · Graduate jobs", url: "https://www.prospects.ac.uk/" },
  naric: { label: "Ecctis (UK ENIC)", url: "https://www.enic.org.uk/" },
};

export const ukDepth: Record<string, ChapterDepth> = {
  "why-study": {
    blocks: [
      { heading: "One-year master's: what you gain and give up", table: {
        head: ["", "UK one-year master's", "Two-year master's (France, Germany, USA)"],
        rows: [
          ["Time out of work", "About 12 months", "About 24 months"],
          ["Living costs", "One year", "Two years"],
          ["Internship inside the degree", "Rare; some have a placement year", "Common"],
          ["Depth", "Intensive, less elective choice", "More electives, thesis and internship"],
          ["Recognition in India", "Recognised; AIU equivalence available", "Recognised"],
        ],
      } },
      { heading: "Choosing a UK city", table: {
        head: ["City", "Strengths", "Living costs"],
        rows: [
          ["London", "Finance, consulting, tech, law, media; most graduate jobs", "Highest"],
          ["Manchester", "Business, digital, engineering; large Indian community", "Medium"],
          ["Birmingham", "Engineering, business, automotive", "Medium"],
          ["Edinburgh / Glasgow", "Fintech, energy, AI research; 4-year bachelor's in Scotland", "Medium"],
          ["Leeds / Sheffield / Nottingham", "Strong Russell Group universities, lower rent", "Lower"],
          ["Cambridge / Oxford", "Research, biotech, AI", "High (rent)"],
        ],
      } },
      { heading: "Checks before you commit", checklist: [
        "Is the university a licensed Student sponsor? (search the Home Office register)",
        "Does your subject need ATAS clearance? (many science, engineering and technology master's do)",
        "Will you apply for the Graduate visa before or after 1 January 2027? It changes the length.",
        "Can you show the money for 28 days before applying?",
        "Do you plan to bring family? Only PhD and research master's students can.",
      ] },
    ],
    faqs: [
      { q: "Which is better for Indian students, the UK or Canada?", a: "The UK suits students who want a fast, prestigious one-year master's and a post-study visa without employer sponsorship. Canada suits those focused on longer-term settlement, with eligibility for a post-graduation work permit depending on the programme. Compare total cost, course length and your career plan." },
      { q: "Are UK universities safe for Indian students?", a: "UK campuses and cities are generally safe. Universities have security teams and support services; follow normal precautions at night and keep the High Commission of India in London's contact handy." },
    ],
    sources: [S.sponsors, S.ukcisa],
  },

  "education-system": {
    blocks: [
      { heading: "UK degree classifications", table: {
        head: ["Classification", "Typical mark", "What employers read"],
        rows: [["First-class (1st)", "70%+", "Excellent"], ["Upper second (2:1)", "60–69%", "The common requirement for graduate schemes"], ["Lower second (2:2)", "50–59%", "Accepted by many employers"], ["Master's: Distinction / Merit / Pass", "70% / 60% / 50%", "Distinction is a strong signal"]],
        caption: "UK marking is strict: 65% is a good result.",
      } },
      { heading: "Russell Group and beyond", paragraphs: [
        "The Russell Group is a network of 24 research-intensive universities (including Oxford, Cambridge, Imperial, LSE, UCL, Manchester, Edinburgh and King's). They are strong in research and graduate recruitment, but many non-Russell Group universities rank highly in specific subjects and offer better employability for some courses. Compare by subject ranking, course modules and industry links rather than the group label alone.",
      ] },
      { heading: "Course formats", checklist: [
        "MSc / MA: taught one-year master's with a dissertation",
        "MRes / MPhil: research master's — can allow dependants on the visa",
        "MSc with a placement year: two years including a paid industry placement",
        "Pre-master's and foundation: one-year bridge programmes for applicants below direct entry",
        "Integrated master's (MEng): four-year undergraduate route in engineering",
      ] },
    ],
    faqs: [
      { q: "What is a 2:1 equivalent for Indian students?", a: "Universities set their own conversions. Many treat about 60–65% (or a CGPA of about 6.5–7.0/10) from a recognised Indian university as equivalent to a 2:1; top universities ask for more. Check each university's India entry requirements page." },
      { q: "Is a UK master's with a placement year worth it?", a: "It costs an extra year but gives paid UK work experience on your CV, which helps with graduate jobs and Skilled Worker sponsorship. The placement must be arranged with the university's support." },
    ],
  },

  admissions: {
    blocks: [
      { heading: "UCAS deadlines for bachelor's applicants", table: {
        head: ["Deadline", "Applies to"],
        rows: [["Mid-October", "Oxford, Cambridge, medicine, dentistry and veterinary courses"], ["Late January", "Most other courses — the 'equal consideration' date"], ["Until June / Clearing", "International applicants can often still apply where places remain"]],
        caption: "Exact dates are published by UCAS each cycle.",
      } },
      { heading: "How to choose five UCAS options or a master's shortlist", checklist: [
        "Two ambitious choices above your predicted or actual grades",
        "Two realistic choices that match your grades",
        "One safer choice with lower entry requirements",
        "Check the exact modules in each course, not only the course title",
        "Check the English requirement for your subject (law and medicine ask for more)",
        "Note each university's CAS deposit and refund policy",
      ] },
      { heading: "Rolling admissions for master's", paragraphs: [
        "Most UK master's programmes review applications as they arrive and close when full — popular courses at top universities can close by January or March for September. Applying in October–December gives the best chance and leaves time for scholarships. Some business schools run rounds with fixed deadlines.",
      ] },
    ],
    faqs: [
      { q: "Do UK universities accept backlogs?", a: "Many do if the final degree meets the entry requirement, but some top universities limit the number of backlogs. Ask each university and mention cleared backlogs honestly." },
      { q: "Can I get a UK master's without work experience?", a: "Yes, most taught master's programmes accept fresh graduates. MBA and some management programmes require two to three years of experience." },
    ],
  },

  "application-process": {
    blocks: [
      { heading: "ATAS clearance", paragraphs: [
        "Indian nationals studying certain postgraduate subjects in science, engineering and technology need an Academic Technology Approval Scheme (ATAS) certificate before the university issues a CAS. Your offer letter will say if it applies. Apply online as soon as you accept the offer — it is free but can take 20 working days or more in busy months.",
      ] },
      { heading: "Pre-CAS checks and the deposit", steps: [
        { title: "Accept the offer", body: "Firm acceptance on the portal; meet any academic or English conditions." },
        { title: "Pay the deposit", body: "Often £2,000–6,000, deducted from tuition; read the refund policy for visa refusals." },
        { title: "Pre-CAS interview", body: "Many universities run a short credibility interview on your course, funding and plans." },
        { title: "Submit documents", body: "Final transcripts, passport, English test, funding evidence, ATAS if needed." },
        { title: "CAS issued", body: "Check every detail (name, course dates, fees paid) — errors cause visa delays." },
      ] },
      { heading: "Credibility interview: common questions", checklist: [
        "Why this course and this university, and why the UK?",
        "What modules will you study?",
        "How will you fund tuition and living costs?",
        "What do you plan to do after the course?",
        "Why not study the same course in India?",
        "Explain any gap in your studies.",
      ] },
    ],
    faqs: [
      { q: "What is a CAS number?", a: "A Confirmation of Acceptance for Studies — a reference your university issues once you have accepted an unconditional offer and passed its checks. You need it to apply for the Student visa." },
      { q: "Is the university deposit refundable if my visa is refused?", a: "Most universities refund the deposit after a visa refusal, minus a small fee, if you send the refusal letter. Check the policy before paying." },
    ],
  },

  "language-tests": {
    blocks: [
      { heading: "Tests UK universities accept", table: {
        head: ["Test", "Typical master's score", "Notes"],
        rows: [["IELTS Academic", "6.5 overall, 6.0 each band", "Most widely accepted"], ["PTE Academic", "58–65 overall", "Fast results"], ["TOEFL iBT", "88–92 overall", "Check each university"], ["Duolingo English Test", "115–125", "Accepted by a growing number"], ["Class 12 English", "70–80%+ in CBSE/ICSE", "Waiver at some universities"]],
        caption: "Requirements vary by course; law, medicine and education ask for more.",
      } },
      { heading: "If your score is a little short", paragraphs: [
        "Many universities offer pre-sessional English courses of 4–12 weeks before the degree; passing gives you the required level without retaking IELTS. The CAS then covers both the pre-sessional and the degree. It adds cost and time, so retaking the test is often cheaper if you are 0.5 band short.",
      ] },
    ],
    faqs: [
      { q: "Is IELTS UKVI needed for a UK degree?", a: "For degree-level study at a university with a sponsor licence, the university assesses your English and usually accepts IELTS Academic. IELTS for UKVI is required mainly for pre-degree courses and some other visa routes." },
      { q: "Can I get an IELTS waiver for the UK?", a: "Some universities waive the test for students with high Class 12 English marks from CBSE, ICSE or certain state boards, or a degree taught in English. Each university publishes its own list." },
    ],
  },

  "sop-lor-cv": {
    blocks: [
      { heading: "Personal statement: do and don't", checklist: [
        "Do open with your academic interest in the subject",
        "Do mention two or three modules and why they matter to you",
        "Do show evidence: projects, internships, results, reading",
        "Do explain your career goal in a sentence or two",
        "Don't list achievements without linking them to the course",
        "Don't use quotes, clichés or AI-generated text — universities run similarity checks",
        "Don't exceed the word limit; 500–1,000 words is typical",
      ] },
      { heading: "References that help", paragraphs: [
        "UK universities usually want two academic references; for professionals, one academic and one employer. References must come from an official email address. Ask early, give your referee your statement and CV, and remind them of specific work you did. Many portals email the referee directly; your application is not complete until both arrive.",
      ] },
    ],
    faqs: [
      { q: "How long should a UK master's personal statement be?", a: "Usually 500–1,000 words or 4,000 characters, unless the university says otherwise. Shorter and specific is better than long and generic." },
    ],
  },

  costs: {
    blocks: [
      { heading: "Full first-year budget", table: {
        head: ["Item", "London", "Outside London"],
        rows: [
          ["Tuition (taught master's)", "£18,000–38,000", "£16,000–28,000"],
          ["Visa fee", "£558", "£558"],
          ["Health surcharge", "£776 per year of visa", "£776 per year of visa"],
          ["Rent (51 weeks)", "£9,000–16,000", "£6,000–10,000"],
          ["Food and essentials", "£2,400–3,600", "£2,000–3,000"],
          ["Transport", "£800–1,500", "£300–700"],
          ["Phone, laptop, books", "£400–800", "£400–800"],
        ],
        caption: "Planning ranges for one student on a 12-month course.",
      } },
      { heading: "In rupees", paragraphs: [
        "At roughly ₹110–120 to the pound (check the current rate), a one-year master's outside London typically totals ₹30–45 lakh including tuition and living costs; in London, ₹40–60 lakh. Top business schools and MBAs cost more. Keep a 5–10% margin for exchange-rate movements.",
      ] },
      { heading: "Ways students cut costs", checklist: [
        "Council Tax exemption for full-time students — ask your university for a certificate",
        "16–25 Railcard or student travel cards for a third off rail fares",
        "Shared houses after the first year",
        "Cooking at home; Lidl, Aldi and Indian grocers are cheapest",
        "Student discounts with UNiDAYS and Student Beans",
        "Part-time work within visa rules",
      ] },
    ],
    faqs: [
      { q: "Do students pay Council Tax in the UK?", a: "Full-time students are exempt. If everyone in your house is a full-time student, the household pays nothing; you need a student certificate from your university." },
      { q: "Is the health surcharge refundable?", a: "It is refunded if your visa is refused or you withdraw the application, but not if you leave the UK early after the visa is granted." },
    ],
    sources: [S.councilTax, S.railcard],
  },

  scholarships: {
    blocks: [
      { heading: "Scholarship timeline", table: {
        head: ["Scholarship", "Who", "When to apply"],
        rows: [["Chevening", "Professionals with about two years' work experience", "August to early November, a year before study"], ["GREAT Scholarships", "One-year master's at participating universities", "Spring, after the offer"], ["Commonwealth Scholarships", "Master's and PhD through national nomination", "Autumn, through the Indian government process"], ["University merit awards", "Strong academic profiles", "With or soon after the application"]],
      } },
      { heading: "Chevening in detail", checklist: [
        "Fully funded: tuition, living allowance, flights and visa costs",
        "Minimum work experience of about two years (2,800 hours)",
        "Apply to three eligible UK master's courses",
        "Four essays: leadership, networking, studying in the UK, career plan",
        "Interview at the British High Commission or Deputy High Commission",
        "Commitment to return to India for two years after the course",
      ] },
    ],
    faqs: [
      { q: "Can fresh graduates get Chevening?", a: "No. Chevening needs about two years of work experience. Fresh graduates should look at university merit scholarships and GREAT Scholarships." },
      { q: "Do UK universities give scholarships to Indian students?", a: "Yes. Many offer India-specific or international merit awards of £2,000–10,000, sometimes automatically considered with your application. Check each university's scholarships page and deadlines." },
    ],
  },

  "funding-loans": {
    blocks: [
      { heading: "Proof-of-funds documents that work", checklist: [
        "Bank statements or a bank letter in your or your parent's name",
        "Funds held for 28 consecutive days, with the end date within 31 days of your application",
        "Parent's letter of consent plus your birth certificate, if funds are in a parent's name",
        "Fixed deposits only if you can access them immediately",
        "Education loan letter from a regulated lender, addressed to you",
        "Official financial sponsor letter if a government or university funds you",
      ] },
      { heading: "Common money mistakes", checklist: [
        "Balance dropping below the required amount on any day in the 28 days",
        "Statements older than 31 days on the application date",
        "Funds in a sibling's or relative's name (only parents or legal guardians count)",
        "Not counting the deposit already paid — it reduces the tuition you must show",
        "Converting currency at a lower rate than the official one used by UKVI",
      ] },
    ],
    faqs: [
      { q: "Can my parents' bank account be used for a UK student visa?", a: "Yes. Funds in a parent's or legal guardian's account are accepted with a letter of consent and your birth certificate showing the relationship." },
      { q: "Do I need to show the full tuition fee?", a: "You need to show the remaining first-year tuition on your CAS, after any deposit already paid, plus living costs for up to nine months." },
    ],
  },

  visa: {
    blocks: [
      { heading: "TB test and biometrics in India", paragraphs: [
        "Indian applicants staying more than six months need a tuberculosis test certificate from a clinic approved by the UK Home Office. The certificate is valid for six months, so book it once you are close to applying. Biometrics are given at a VFS Global centre; you then receive an eVisa (a digital immigration status) instead of a physical card.",
      ] },
      { heading: "Your eVisa and UKVI account", steps: [
        { title: "Create a UKVI account", body: "You link your passport to your eVisa; use it for travel, renting and work." },
        { title: "Generate share codes", body: "Landlords (Right to Rent) and employers (Right to Work) check your status with a share code." },
        { title: "Update your passport", body: "If you renew your passport, update it in the account before you travel." },
      ] },
      { heading: "Visa conditions to know", checklist: [
        "Arrive no earlier than one month before a course of over six months",
        "Work limits: 20 hours a week in term for degree-level students",
        "No public funds (most state benefits)",
        "Your university reports if you stop attending",
        "Changing course or university may need a new CAS and visa",
      ] },
    ],
    faqs: [
      { q: "Is there a priority service for the UK student visa in India?", a: "Yes, priority and super-priority services are usually available at VFS centres for an extra fee, giving faster decisions. Availability changes in peak months." },
      { q: "Do I still get a BRP card?", a: "No. The UK has replaced biometric residence permits with eVisas. You prove your status online through your UKVI account." },
    ],
    sources: [S.tb, S.evisa],
  },

  "pre-departure": {
    blocks: [
      { heading: "Four-week countdown", table: {
        head: ["When", "Task"],
        rows: [["4 weeks", "Confirm accommodation and arrival date; book flights"], ["3 weeks", "Forex card or multi-currency account; carry about £300–500 in cash"], ["2 weeks", "Medicines with prescriptions; scan all documents; check your eVisa works"], ["1 week", "Book airport pick-up (many universities offer one); download Citymapper, Trainline, NHS App"]],
      } },
      { heading: "Packing for the UK", checklist: [
        "Waterproof jacket and layers — UK weather changes daily",
        "UK type G plug adapters",
        "Basic kitchen items if you cook Indian food (many are cheaper in India)",
        "Formal clothes for interviews and presentations",
        "Copies of your CAS, offer letter and accommodation contract",
        "Meat and dairy from India are not allowed in your luggage",
      ] },
    ],
    faqs: [
      { q: "How much cash can I take to the UK?", a: "You must declare £10,000 or more (or the equivalent) when entering the UK. Most students carry a few hundred pounds and use a forex or international card." },
    ],
  },

  arrival: {
    blocks: [
      { heading: "Your first two weeks", steps: [
        { title: "Day 1–2", body: "Move in, check the inventory and photograph your room; buy a SIM card." },
        { title: "Day 2–5", body: "University enrolment and ID card; attend induction." },
        { title: "Week 1", body: "Register with a GP near your address (online through the NHS)." },
        { title: "Week 1–2", body: "Open a bank account; apply for a National Insurance number if you plan to work." },
        { title: "Week 2", body: "Railcard, student discounts, and a Council Tax exemption certificate from the university." },
      ] },
      { heading: "Where to get help", checklist: [
        "University international student advice team",
        "Students' union and Indian student society",
        "UKCISA for independent visa and money advice",
        "NHS 111 for urgent medical advice; 999 for emergencies",
        "High Commission of India in London and consulates in Edinburgh and Birmingham",
      ] },
    ],
    faqs: [
      { q: "Can I start working before I get my National Insurance number?", a: "Yes, you can start work if you can prove your right to work through your eVisa share code, as long as you have applied for the number." },
    ],
    sources: [S.hcl, S.ukcisa],
  },

  housing: {
    blocks: [
      { heading: "Halls, private halls or a shared house", table: {
        head: ["Option", "Pros", "Cons"],
        rows: [["University halls", "Easy from India, bills included, near campus", "Limited rooms, apply early"], ["Private student halls (PBSA)", "Modern, bills included, guarantors not needed", "More expensive"], ["Shared house", "Cheapest, more independence", "Usually needs a UK guarantor or rent upfront; best after year one"], ["Homestay", "Meals included, family setting", "Less independence"]],
      } },
      { heading: "Before you sign", checklist: [
        "View the property (in person or by live video)",
        "Read the tenancy agreement — length, notice, bills",
        "Check the landlord or agency is real (registered, reviews, company number)",
        "Never send money by gift card or to a personal account abroad",
        "Get the deposit protection certificate within 30 days",
        "Prove your Right to Rent with your eVisa share code",
      ] },
    ],
    faqs: [
      { q: "Do I need a UK guarantor to rent?", a: "Many private landlords ask for one. International students often use university halls, purpose-built student accommodation, a guarantor service, or pay several months' rent upfront." },
      { q: "When should I book UK student accommodation?", a: "As soon as you accept your offer; popular university halls and affordable private halls fill up by spring or early summer." },
    ],
    sources: [S.rightToRent],
  },

  "health-banking": {
    blocks: [
      { heading: "Using the NHS", checklist: [
        "Register with a GP as soon as you have an address",
        "Call NHS 111 or use 111 online for urgent but non-emergency problems",
        "Go to A&E or call 999 only for emergencies",
        "Pharmacists can advise on minor illnesses without a GP appointment",
        "Prescriptions are free in Scotland and Wales and carry a fixed charge in England",
        "Dental treatment is charged at NHS rates; register early because places are limited",
      ] },
      { heading: "Banking options", table: {
        head: ["Type", "Examples", "Notes"],
        rows: [["App-based", "Monzo, Starling, Revolut", "Open in days, good for first weeks"], ["High-street student accounts", "HSBC, Barclays, Lloyds, NatWest, Santander", "Need a university letter; some offer overdrafts"], ["Indian banks in the UK", "SBI UK, ICICI Bank UK, Bank of Baroda UK", "Familiar for transfers from India"]],
      } },
    ],
    faqs: [
      { q: "Is healthcare free for international students in the UK?", a: "Once you pay the immigration health surcharge, NHS GP and hospital treatment is free at the point of use. Prescriptions in England, dental and eye care usually cost extra." },
    ],
  },

  "part-time-work": {
    blocks: [
      { heading: "What counts and what does not", table: {
        head: ["Allowed", "Not allowed"],
        rows: [["Part-time jobs up to 20 hours a week in term", "Self-employment or freelancing"], ["Full-time work in official vacations", "A permanent full-time job"], ["Work placements that are part of your course", "Working as a professional sportsperson or entertainer"], ["Students' union or university jobs", "Working as a GP or dentist in training (unless on a recognised programme)"]],
      } },
      { heading: "Finding work", checklist: [
        "University careers service and campus jobs (library, events, ambassador roles)",
        "Retail, hospitality and supermarkets near campus",
        "Indeed, Reed, StudentJob, LinkedIn",
        "Tutoring and teaching assistant roles",
        "Keep payslips; employers must pay at least the National Minimum or Living Wage",
      ] },
    ],
    faqs: [
      { q: "Can I work more than 20 hours a week in the UK during term?", a: "No. Exceeding 20 hours in any week during term breaches your visa conditions and can lead to cancellation. Full-time work is allowed only during your university's official vacations." },
    ],
  },

  "after-graduation": {
    blocks: [
      { heading: "Graduate visa: how to apply", steps: [
        { title: "Wait for the result", body: "Your university must report that you completed the course successfully." },
        { title: "Apply inside the UK", body: "While your Student visa is still valid; pay the fee and the health surcharge at the standard rate." },
        { title: "Keep your eVisa updated", body: "You can work for any employer, at any level, or look for work." },
      ] },
      { heading: "Skilled Worker visa basics", checklist: [
        "A job offer from a licensed sponsor",
        "A role at the required skill level (degree level for most new roles from July 2025)",
        "A salary meeting the general threshold or the lower new-entrant rate for recent graduates",
        "English requirement usually met by your UK degree",
        "Time on a Skilled Worker visa counts towards settlement; the Graduate visa does not",
      ] },
    ],
    faqs: [
      { q: "Can I switch from a Student visa to a Skilled Worker visa directly?", a: "Yes, if you have a qualifying job offer from a licensed sponsor, usually after completing your course. Many graduates use the Graduate visa first to find that job." },
      { q: "Does the Graduate visa count towards UK settlement?", a: "No. Time on a Graduate visa does not count towards indefinite leave to remain; Skilled Worker years do." },
    ],
  },

  jobs: {
    blocks: [
      { heading: "Graduate recruitment calendar", table: {
        head: ["When", "What happens"],
        rows: [["September–November", "Most graduate schemes and summer internships open and close"], ["October–February", "Online tests, video interviews, assessment centres"], ["Spring", "Smaller firms and start-ups hire closer to start dates"], ["All year", "Experienced and immediate-start roles"]],
      } },
      { heading: "How international graduates get hired", checklist: [
        "Apply in the first term — schemes close early",
        "Filter for employers on the register of licensed sponsors",
        "Practise numerical and situational judgement tests",
        "Use your university careers service for CV checks and mock interviews",
        "Network at society events, alumni talks and LinkedIn",
        "Target sectors with shortages: engineering, health, data, cyber security",
      ] },
    ],
    faqs: [
      { q: "Is it hard for Indian students to find jobs in the UK?", a: "It is competitive. Students who apply early to graduate schemes, target licensed sponsors and use the Graduate visa time well have the best results." },
    ],
    sources: [S.sponsors, S.prospects],
  },

  faq: {
    faqs: [
      { q: "Is a UK one-year master's valid in India?", a: "Yes for private employers and further study. For some government jobs or PhD admissions, apply to the Association of Indian Universities (AIU) for an equivalence certificate." },
      { q: "What is the UK student visa success rate for Indians?", a: "Most complete applications with correct funds and a genuine study plan are approved. Refusals usually come from funds problems, inconsistent answers or missing documents." },
      { q: "Can I change university after getting a UK visa?", a: "Usually you need a new CAS and a new visa application. Talk to both universities' visa teams before changing." },
      { q: "Do I need a TB test for a UK student visa?", a: "Yes, Indian applicants staying more than six months need a TB test certificate from a Home Office-approved clinic." },
    ],
    sources: [S.tb, S.naric],
  },
};
