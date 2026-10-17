import type { ChapterDepth } from "../types";

/** In-depth USA content, merged into the USA chapters. Fees repeat guides/usa.ts (reviewed October 2026). */
const S = {
  studyInStates: { label: "DHS · Study in the States", url: "https://studyinthestates.dhs.gov/" },
  sevis: { label: "FMJfee.com · SEVIS I-901 fee", url: "https://www.fmjfee.com/" },
  ustraveldocs: { label: "U.S. Embassy & Consulates in India · Student visas", url: "https://in.usembassy.gov/visas/" },
  educationusa: { label: "EducationUSA India", url: "https://educationusa.state.gov/country/in" },
  ssa: { label: "Social Security Administration · International students", url: "https://www.ssa.gov/ssnumber/" },
  uscisOpt: { label: "USCIS · OPT for F-1 students", url: "https://www.uscis.gov/working-in-the-united-states/students-and-exchange-visitors/optional-practical-training-opt-for-f-1-students" },
  h1b: { label: "USCIS · H-1B specialty occupations", url: "https://www.uscis.gov/working-in-the-united-states/h-1b-specialty-occupations" },
  cgi: { label: "Embassy of India, Washington DC", url: "https://www.indianembassyusa.gov.in/" },
  ets: { label: "ETS · GRE and TOEFL", url: "https://www.ets.org/" },
};

export const usaDepth: Record<string, ChapterDepth> = {
  "why-study": {
    blocks: [
      { heading: "What makes the US different", checklist: [
        "The widest choice of universities and specialisations in the world",
        "Flexible curriculum: change courses and add minors or certificates",
        "Funding through teaching and research assistantships for many STEM master's and most PhDs",
        "Up to three years of OPT work after a STEM degree",
        "Strong links to tech, finance, healthcare and research employers",
        "Large Indian community in most university towns",
      ] },
      { heading: "Honest risks to weigh", checklist: [
        "High total cost if you get no funding",
        "Long-term work depends on the H-1B lottery and policy changes",
        "Visa interview outcomes can be unpredictable (section 214(b))",
        "Health insurance and medical costs are high",
        "Some regions need a car",
      ] },
    ],
    faqs: [
      { q: "Is the USA worth it for Indian students in 2027?", a: "For STEM students who target strong programmes, internships and OPT, the US still offers the highest graduate salaries. The risks are cost and long-term visa uncertainty, so plan finances and a backup career path." },
      { q: "Can I study in the US for free?", a: "PhD students are usually fully funded through assistantships. Some master's students get tuition waivers and stipends through TA or RA positions, but most master's students pay fees." },
    ],
    sources: [S.educationusa],
  },

  "education-system": {
    blocks: [
      { heading: "Types of institutions", table: {
        head: ["Type", "What it means", "Good for"],
        rows: [["R1 research universities", "Very high research activity", "PhD, research-based master's, funding"], ["Public state universities", "Lower fees for state residents, large campuses", "Value master's, engineering"], ["Private universities", "Higher fees, more scholarships", "Brand, networks"], ["Liberal arts colleges", "Small undergraduate colleges", "Bachelor's with close teaching"], ["Community colleges", "Two-year associate degrees", "Low-cost start, transfer to a university"]],
      } },
      { heading: "Credits and grading", paragraphs: [
        "US courses use credit hours (a master's is typically 30–36 credits) and a GPA on a 4.0 scale. You need to keep a minimum GPA (often 3.0 for graduate students) to stay in good standing. Assignments, quizzes, mid-terms and projects all count — not only the final exam.",
        "STEM-designated programmes (by CIP code) qualify for the 24-month STEM OPT extension. Check the CIP code on the programme page or ask the department before you apply.",
      ] },
    ],
    faqs: [
      { q: "What is a STEM-designated degree?", a: "A programme whose CIP code is on the DHS STEM list. Graduates can apply for a 24-month extension of OPT in addition to the standard 12 months." },
      { q: "How do I convert my Indian marks to a US GPA?", a: "Universities either evaluate your transcript themselves or ask for an evaluation from WES or ECE. Do not convert it yourself unless the application asks you to." },
    ],
  },

  admissions: {
    blocks: [
      { heading: "Application calendar for Fall 2027", table: {
        head: ["When", "What to do"],
        rows: [["March–June 2026", "Shortlist programmes; prepare for GRE/GMAT and TOEFL/IELTS"], ["July–September", "Take tests; ask for recommendations; draft your SOP"], ["October–January", "Submit applications; priority and funding deadlines are often December 1–15"], ["February–April", "Admits and funding offers; April 15 is the common decision date for funded offers"], ["May–July", "I-20, SEVIS fee, visa interview"]],
      } },
      { heading: "Building a balanced list", checklist: [
        "3 ambitious programmes, 4–5 matching your profile, 2–3 safer choices",
        "Check faculty research for MS-thesis and PhD applications",
        "Compare total cost after likely funding, not only tuition",
        "Check whether GRE is required, optional or not considered",
        "Look at placement data and location for internships",
        "Count application fees: often $75–150 each, sometimes waived",
      ] },
    ],
    faqs: [
      { q: "Is GRE required for US universities?", a: "Many programmes made the GRE optional, but strong scores still help for competitive STEM programmes and funding. MBA programmes accept GMAT or GRE." },
      { q: "Can I get admission to a US master's with a 3-year degree?", a: "Some universities accept 3-year Indian bachelor's degrees, especially with a strong record or a master's; many require 16 years of education. Check each programme's international requirements." },
    ],
  },

  "application-process": {
    blocks: [
      { heading: "From admit to I-20", steps: [
        { title: "Accept the offer", body: "Pay the enrolment deposit if required." },
        { title: "Submit financial documents", body: "Bank statements, loan letters and affidavits of support covering the first year's estimated cost." },
        { title: "Receive the I-20", body: "Check your name, programme dates, CIP code and costs." },
        { title: "Pay the SEVIS I-901 fee", body: "Online with your SEVIS ID; keep the receipt for the interview." },
        { title: "Complete the DS-160 and book the interview", body: "Choose the consulate under your jurisdiction; book biometrics (OFC) and interview." },
      ] },
      { heading: "Assistantships and funding", table: {
        head: ["Type", "What you do", "What you get"],
        rows: [["Teaching assistant (TA)", "Grade, run labs or tutorials", "Tuition waiver and/or stipend"], ["Research assistant (RA)", "Work on a professor's project", "Tuition waiver and stipend"], ["Graduate assistant (GA)", "Department or office work", "Partial waiver or hourly pay"], ["Fellowship", "Merit award, no work", "Funding without duties"]],
        caption: "Most assistantships go to PhD students; master's students can apply after arrival too.",
      } },
    ],
    faqs: [
      { q: "How do I get an RA as a master's student?", a: "Email professors whose research matches your skills before or after admission, with a short note and your CV. Many RAs are offered after you arrive and take courses with the professor." },
    ],
  },

  "language-tests": {
    blocks: [
      { heading: "Typical scores", table: {
        head: ["Test", "Common master's minimum", "Competitive"],
        rows: [["TOEFL iBT", "80–90", "100+"], ["IELTS Academic", "6.5", "7.0+"], ["Duolingo English Test", "105–115", "120+"], ["GRE (if required)", "Quant 160+ for STEM", "Quant 165+, Verbal 155+"], ["GMAT (MBA)", "Varies by school", "Top programmes: very high"]],
      } },
      { heading: "Waivers", paragraphs: [
        "Some universities waive TOEFL or IELTS for students whose bachelor's degree was taught entirely in English, sometimes with a medium-of-instruction certificate. A TA position usually needs a higher spoken English score.",
      ] },
    ],
    faqs: [
      { q: "TOEFL or IELTS for the USA?", a: "Most US universities accept both. TOEFL is the most widely accepted; IELTS is fine if you also apply to the UK, Canada or Australia." },
    ],
    sources: [S.ets],
  },

  "sop-lor-cv": {
    blocks: [
      { heading: "SOP structure for US master's and PhD", steps: [
        { title: "Your research or professional interest", body: "A specific problem you want to work on." },
        { title: "Preparation", body: "Projects, papers, internships and coursework that prepared you." },
        { title: "Why this programme", body: "Faculty, labs, courses and resources — name them." },
        { title: "Goals", body: "Short-term and long-term goals, and how the degree connects them." },
      ] },
      { heading: "Documents US programmes ask for", checklist: [
        "Statement of purpose (often 1–2 pages)",
        "Personal history or diversity statement at some universities",
        "Three letters of recommendation",
        "Academic CV or résumé (one page for most master's)",
        "Writing sample or portfolio for some fields",
        "Transcripts, sometimes evaluated by WES or ECE",
      ] },
    ],
    faqs: [
      { q: "How many recommendation letters do US universities need?", a: "Usually three. Choose professors who know your work well; for professionals, one or two can come from managers." },
    ],
  },

  costs: {
    blocks: [
      { heading: "Typical yearly cost", table: {
        head: ["Item", "Public university", "Private university"],
        rows: [["Tuition (master's)", "$20,000–45,000", "$40,000–70,000"], ["Rent", "$8,000–18,000", "$10,000–24,000"], ["Health insurance", "$1,500–4,000", "$2,000–5,000"], ["Food and essentials", "$4,000–6,000", "$4,000–7,000"], ["Books, laptop, phone", "$1,000–2,000", "$1,000–2,000"]],
        caption: "Your I-20 shows each university's official estimate.",
      } },
      { heading: "In rupees", paragraphs: [
        "At roughly ₹85–90 to the dollar (check the current rate), a two-year master's at a public university with no funding typically costs ₹50–80 lakh in total, and ₹80 lakh–1.2 crore at a private university in a big city. Assistantships and on-campus jobs can reduce this significantly.",
      ] },
    ],
    faqs: [
      { q: "Is health insurance mandatory for students in the USA?", a: "Almost all universities require it. You either buy the university plan or show comparable private insurance to get a waiver." },
    ],
  },

  scholarships: {
    blocks: [
      { heading: "Where funding comes from", checklist: [
        "University merit scholarships, often automatic with the admission review",
        "Departmental assistantships (TA, RA, GA)",
        "Fulbright-Nehru Master's Fellowships for professionals",
        "JN Tata Endowment loan scholarships, Inlaks and K.C. Mahindra scholarships for Indian students",
        "Professional associations and company scholarships in your field",
      ] },
    ],
    faqs: [
      { q: "What is the Fulbright-Nehru Master's Fellowship?", a: "A fully funded US master's fellowship for Indian professionals with work experience, administered by USIEF. Applications usually open in spring for study the following year." },
    ],
  },

  "funding-loans": {
    blocks: [
      { heading: "Documents for the I-20 and visa", checklist: [
        "Bank statements of you or your sponsors, usually of recent months",
        "Education loan sanction letter",
        "Affidavit of support from each sponsor",
        "Sponsors' income proof (ITRs, salary slips, CA statement)",
        "Scholarship or assistantship letters",
        "Property valuation is supporting evidence only, not liquid funds",
      ] },
      { heading: "US-specific loan options", paragraphs: [
        "Besides Indian banks and NBFCs, some international lenders lend to Indian students at selected US universities without Indian collateral, usually in dollars. Compare the total repayment in rupees, including exchange-rate risk.",
      ] },
    ],
    faqs: [
      { q: "How much bank balance is needed for a US student visa?", a: "Enough to cover the first year's cost shown on your I-20, plus evidence that later years are covered. The figure differs by university." },
    ],
  },

  visa: {
    blocks: [
      { heading: "The F-1 interview", checklist: [
        "Know your programme, university and why you chose it",
        "Explain your funding clearly with the documents in hand",
        "Show your plans after studies and ties to India",
        "Keep answers short, honest and consistent with your DS-160",
        "Carry the I-20, SEVIS receipt, DS-160 confirmation, admission letter, transcripts, test scores and funding documents",
      ] },
      { heading: "If you are refused under 214(b)", steps: [
        { title: "Understand the reason", body: "214(b) means the officer was not convinced of your intent or ties; it is not a permanent ban." },
        { title: "Change something", body: "Strengthen funding evidence, clarify your study plan, or choose a better-fitting programme." },
        { title: "Reapply", body: "Pay the fee again and book a new interview; mention what has changed." },
      ] },
      { heading: "Consulates in India", table: {
        head: ["Post", "Jurisdiction (main states)"],
        rows: [["New Delhi", "Delhi, Haryana, Punjab, Rajasthan, Uttar Pradesh and the north"], ["Mumbai", "Maharashtra, Gujarat, Goa, Madhya Pradesh"], ["Chennai", "Tamil Nadu, Karnataka, Kerala"], ["Hyderabad", "Telangana, Andhra Pradesh, Odisha"], ["Kolkata", "West Bengal and the north-east"]],
        caption: "Students can often interview at any post with availability; check the appointment site.",
      } },
    ],
    faqs: [
      { q: "How early can I travel to the US on an F-1 visa?", a: "Up to 30 days before the programme start date on your I-20." },
      { q: "Can I work in the US on an F-1 visa?", a: "Up to 20 hours a week on campus during term, full time in breaks. Off-campus work needs CPT or OPT authorisation." },
    ],
    sources: [S.ustraveldocs, S.sevis],
  },

  "pre-departure": {
    blocks: [
      { heading: "Documents in your hand luggage", checklist: [
        "Passport with F-1 visa",
        "Signed I-20",
        "SEVIS fee receipt",
        "Admission letter and funding documents",
        "Address of your housing in the US",
        "University contact numbers and international office email",
      ] },
      { heading: "Before you fly", checklist: [
        "Enrol in or waive the university health insurance",
        "Get vaccination and immunisation records — most universities require them",
        "Carry about $500–1,000 in cash and a forex or international card",
        "Book temporary housing if your lease starts later",
        "Arrive no earlier than 30 days before the I-20 start date",
      ] },
    ],
    faqs: [
      { q: "What should Indian students carry to the USA?", a: "Your immigration documents, medicines with prescriptions, a few weeks of familiar food and spices, warm clothes if you study in the north, and electrical adapters for US type A/B plugs (110V)." },
    ],
  },

  arrival: {
    blocks: [
      { heading: "First month", steps: [
        { title: "Check-in with the international office", body: "Your SEVIS record must be activated by the start date." },
        { title: "Phone and bank", body: "A prepaid or postpaid SIM; open a bank account with your passport, I-20 and university letter." },
        { title: "Social Security number", body: "Apply once you have an on-campus job offer; needed for payroll." },
        { title: "Build credit", body: "A secured or student credit card used carefully builds a credit score for renting and loans later." },
        { title: "Get a state ID", body: "Useful so you do not carry your passport daily." },
      ] },
    ],
    faqs: [
      { q: "Do international students need a Social Security number?", a: "Only if you work. Apply after you get an on-campus job or authorised work; you cannot get one just to open a bank account." },
    ],
    sources: [S.ssa, S.cgi],
  },

  housing: {
    blocks: [
      { heading: "Options and costs", table: {
        head: ["Option", "Typical", "Notes"],
        rows: [["On-campus dorms / graduate housing", "Varies by university", "Easy from India, often with meal plans"], ["Shared off-campus apartment", "Most common for graduate students", "Split rent and utilities with 2–4 people"], ["Studio", "Most expensive", "Privacy, but higher cost"]],
      } },
      { heading: "Before you sign a lease", checklist: [
        "Lease length — often 12 months; check sublet rules for summer",
        "Security deposit and what is refundable",
        "Utilities included or extra (electricity, internet, heating)",
        "Distance to campus and public transport",
        "Renter's insurance",
        "Never pay before seeing a lease and verifying the landlord",
      ] },
    ],
    faqs: [
      { q: "How do Indian students find roommates in the US?", a: "Through university Indian student association groups, WhatsApp and Facebook groups for incoming students, and university housing portals." },
    ],
  },

  "health-banking": {
    blocks: [
      { heading: "Using health insurance", checklist: [
        "Use the university health centre first — cheaper and often free",
        "Know your deductible, co-pay and in-network providers",
        "Urgent care clinics are cheaper than emergency rooms for non-emergencies",
        "Call 911 for emergencies",
        "Dental and vision are often separate plans",
      ] },
      { heading: "Banking and credit", paragraphs: [
        "Most students open a checking account with a national bank or credit union near campus. A credit score matters in the US for renting, phone plans and loans; a student or secured credit card paid in full every month starts building it.",
      ] },
    ],
    faqs: [
      { q: "Why is a credit score important in the USA?", a: "Landlords, phone companies and lenders check it. Without credit history you may pay higher deposits. A card paid in full monthly builds history within months." },
    ],
  },

  "part-time-work": {
    blocks: [
      { heading: "Work types on F-1", table: {
        head: ["Type", "When", "Rules"],
        rows: [["On-campus job", "From the start", "Up to 20 h / week in term, full time in breaks"], ["CPT (Curricular Practical Training)", "During the programme", "Must be part of the curriculum; authorised by the school"], ["OPT (pre- or post-completion)", "During or after", "Authorised by USCIS; uses your OPT time"]],
      } },
      { heading: "Never work without authorisation", paragraphs: [
        "Unauthorised off-campus work, including cash jobs or freelancing for US clients, can end your F-1 status and affect future visas. Ask your international office before accepting any work outside campus.",
      ] },
    ],
    faqs: [
      { q: "What is CPT?", a: "Curricular Practical Training — off-campus work that is an integral part of your programme, such as an internship for credit, authorised by your school's designated official." },
    ],
  },

  "after-graduation": {
    blocks: [
      { heading: "OPT rules that matter", checklist: [
        "Apply up to 90 days before and 60 days after the programme end date",
        "No more than 90 days of unemployment during standard OPT",
        "STEM OPT needs an E-Verify employer and a training plan (Form I-983)",
        "Report employment changes to your school within 10 days",
        "Travelling during OPT needs care — carry your EAD and a job letter",
      ] },
      { heading: "Paths after OPT", table: {
        head: ["Route", "Notes"],
        rows: [["H-1B", "Employer-sponsored, lottery-based for most employers"], ["Cap-exempt H-1B", "Universities and some research organisations are not subject to the lottery"], ["O-1", "For extraordinary ability with strong evidence"], ["Further study", "PhD or another degree continues F-1 status"]],
      } },
    ],
    faqs: [
      { q: "Can I change employers on OPT?", a: "Yes, but report the change to your school within 10 days, and for STEM OPT submit a new training plan with an E-Verify employer." },
    ],
    sources: [S.uscisOpt, S.h1b],
  },

  jobs: {
    blocks: [
      { heading: "Internships drive job offers", steps: [
        { title: "First semester", body: "Polish your résumé, LinkedIn and GitHub; apply to summer internships from August to December." },
        { title: "Career fairs", body: "Attend every fair; companies collect résumés for interviews." },
        { title: "Interview preparation", body: "Coding practice, case interviews or behavioural questions with the STAR method." },
        { title: "Summer internship (CPT)", body: "Perform well — return offers are the main path to full-time jobs." },
        { title: "Final year", body: "Apply for full-time roles from August; ask employers about sponsorship policies." },
      ] },
    ],
    faqs: [
      { q: "Do all US companies sponsor H-1B visas?", a: "No. Check an employer's sponsorship history and ask early in the process. Large tech, consulting and healthcare employers sponsor most often." },
    ],
  },

  faq: {
    faqs: [
      { q: "What is the difference between an I-20 and an F-1 visa?", a: "The I-20 is your university's certificate of eligibility. The F-1 is the visa stamped in your passport after the interview. You need both to enter and study." },
      { q: "Can I change universities in the USA?", a: "Yes, through a SEVIS transfer between schools, usually between terms. You do not need a new visa if your F-1 is still valid." },
      { q: "Can my spouse work in the US if I am on F-1?", a: "No. F-2 dependants cannot work and can only study part-time." },
    ],
    sources: [S.studyInStates],
  },
};
