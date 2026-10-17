import type { ChapterDepth } from "../types";

/** In-depth Germany content, merged into the Germany chapters. Figures repeat guides/germany.ts (reviewed October 2026). */
const S = {
  daad: { label: "DAAD · Study in Germany", url: "https://www.daad.de/en/" },
  uniassist: { label: "uni-assist", url: "https://www.uni-assist.de/en/" },
  anabin: { label: "anabin · Recognition database", url: "https://anabin.kmk.org/" },
  aps: { label: "APS India", url: "https://aps-india.de/" },
  studienkolleg: { label: "Studienkollegs in Germany", url: "https://www.studienkollegs.de/" },
  makeit: { label: "Make it in Germany", url: "https://www.make-it-in-germany.com/en/" },
  rundfunk: { label: "Rundfunkbeitrag (broadcast fee)", url: "https://www.rundfunkbeitrag.de/welcome/englisch/index_ger.html" },
  missions: { label: "German Missions in India · Student visa", url: "https://india.diplo.de/in-en/service/visa-einreise/student-visa" },
  cgi: { label: "Embassy of India, Berlin", url: "https://indianembassyberlin.gov.in/" },
};

export const germanyDepth: Record<string, ChapterDepth> = {
  "why-study": {
    blocks: [
      { heading: "Germany at a glance for Indian students", checklist: [
        "No or low tuition at most public universities",
        "Strong engineering, computer science, automotive and research programmes",
        "18 months to look for work after graduating",
        "EU Blue Card and a fast path to permanent residence for skilled workers",
        "German language matters for daily life and most jobs outside tech",
        "Paperwork: APS, blocked account, city registration and residence permit",
      ] },
      { heading: "Popular student cities", table: {
        head: ["City", "Strengths", "Rent"],
        rows: [["Munich", "Engineering, automotive, TUM, LMU", "Highest"], ["Berlin", "Start-ups, tech, arts, research", "High"], ["Aachen", "RWTH engineering", "Medium"], ["Stuttgart / Karlsruhe", "Automotive, engineering, KIT", "Medium–high"], ["Dresden / Leipzig", "Microelectronics, research, lower costs", "Lower"], ["Hamburg / Frankfurt", "Logistics, finance, media", "High"]],
      } },
    ],
    faqs: [
      { q: "Is it really free to study in Germany?", a: "Most public universities charge no tuition, but every student pays a semester contribution, and Baden-Württemberg and TUM charge non-EU students. You must also show about €11,904 a year in a blocked account for living costs." },
      { q: "Do I need German to study in Germany?", a: "Not for English-taught master's programmes, but basic German (A2–B1) makes daily life and part-time jobs much easier, and most jobs outside tech need B2." },
    ],
    sources: [S.daad],
  },

  "education-system": {
    blocks: [
      { heading: "University types", table: {
        head: ["Type", "Focus", "Good for"],
        rows: [["Universität / TU", "Research and theory", "Master's leading to research or PhD; engineering at TUs"], ["Hochschule / University of Applied Sciences (FH)", "Practical, industry projects", "Job-ready master's, internships"], ["Private universities", "Business, management, often in English", "Faster admission; tuition fees apply"]],
      } },
      { heading: "Bachelor's from India: direct entry or Studienkolleg", paragraphs: [
        "An Indian Class 12 certificate usually does not give direct entry to a German bachelor's. Students typically need one year of a bachelor's in India in a related subject, or a one-year foundation course (Studienkolleg) ending with the assessment test (Feststellungsprüfung), or a strong JEE Advanced result for some universities. Check your exact case in the DAAD admission database.",
      ] },
      { heading: "Semester calendar", table: {
        head: ["Semester", "Lectures", "Typical application deadline"],
        rows: [["Winter semester", "October–February", "Around 15 July (earlier for some programmes and uni-assist)"], ["Summer semester", "April–July", "Around 15 January"]],
        caption: "Many international master's programmes set earlier deadlines; check each programme.",
      } },
    ],
    faqs: [
      { q: "What is uni-assist?", a: "A service many German universities use to check international applications before they reach the university. You upload documents and pay a fee per application." },
      { q: "What is anabin?", a: "A database of foreign institutions and degrees that German universities and authorities use to check recognition. Your Indian university should be listed as H+." },
    ],
    sources: [S.anabin, S.studienkolleg],
  },

  admissions: {
    blocks: [
      { heading: "Documents German master's programmes ask for", checklist: [
        "APS certificate (required for Indian applicants)",
        "Bachelor's degree and transcripts (with module descriptions for some programmes)",
        "IELTS / TOEFL for English programmes, or German C1 (TestDaF, DSH, telc, Goethe) for German programmes",
        "CV in a tabular German format (Lebenslauf)",
        "Motivation letter",
        "Recommendation letters if requested",
        "GRE for some technical programmes",
      ] },
      { heading: "How selective programmes rank you", paragraphs: [
        "Many programmes calculate a German grade from your Indian marks using the Modified Bavarian Formula and compare it with other applicants. They also check that your bachelor's credits match their subject requirements — sometimes credit by credit. A strong grade in the core subjects matters more than the university's name.",
      ] },
    ],
    faqs: [
      { q: "What percentage do I need for a German master's?", a: "Competitive TU programmes often expect a converted German grade of about 2.5 or better, which roughly matches 70%+ in many Indian universities. Applied sciences universities can be more flexible." },
    ],
    sources: [S.uniassist],
  },

  "application-process": {
    blocks: [
      { heading: "APS certificate, step by step", steps: [
        { title: "Register on the APS India portal", body: "Fill in your academic details and upload documents." },
        { title: "Pay the fee", body: "₹18,000 (non-refundable)." },
        { title: "Send attested documents", body: "As instructed by APS India." },
        { title: "Verification", body: "APS checks your documents; for some applicants an interview or test applies." },
        { title: "Receive the certificate", body: "Use it for university applications and the visa." },
      ] },
      { heading: "From admission to visa", steps: [
        { title: "Admission letter (Zulassung)", body: "Accept it and enrol as instructed." },
        { title: "Blocked account", body: "Open one with an approved provider and deposit €11,904." },
        { title: "Health insurance", body: "Travel insurance for entry, then public or private student insurance." },
        { title: "Book the visa appointment", body: "With VFS for the German mission responsible for your state; book early, waits can be long." },
      ] },
    ],
    faqs: [
      { q: "How long does APS take in India?", a: "Several weeks normally, longer in peak season. Apply as soon as you have your final or provisional degree documents." },
    ],
    sources: [S.aps],
  },

  "language-tests": {
    blocks: [
      { heading: "German level by goal", table: {
        head: ["Goal", "Recommended level"],
        rows: [["English-taught master's", "A1–A2 before arrival for daily life"], ["Part-time jobs and Werkstudent roles", "B1–B2"], ["German-taught degree", "C1 (TestDaF 4x4, DSH-2, telc C1 Hochschule, Goethe C1)"], ["Most graduate jobs outside tech", "B2"], ["Permanent residence / citizenship", "B1 or higher depending on the route"]],
      } },
    ],
    faqs: [
      { q: "Where can I learn German in India?", a: "At Goethe-Institut (Max Mueller Bhavan) centres in major cities, online courses, and private institutes preparing for Goethe and telc exams." },
    ],
  },

  "sop-lor-cv": {
    blocks: [
      { heading: "German-style CV (Lebenslauf)", checklist: [
        "Tabular, reverse chronological",
        "Exact months and years for every stage — no unexplained gaps",
        "Photo is common but optional",
        "Language levels in CEFR",
        "Signed and dated at the bottom for some applications",
        "Two pages maximum",
      ] },
    ],
  },

  costs: {
    blocks: [
      { heading: "Monthly budget", table: {
        head: ["Item", "Munich / Frankfurt", "Other cities"],
        rows: [["Rent (WG room or dorm)", "€550–900", "€300–550"], ["Health insurance", "≈ €140", "≈ €140"], ["Food", "€200–300", "€180–280"], ["Phone and internet", "€20–40", "€20–40"], ["Broadcast fee (per household)", "Shared among flatmates", "Shared among flatmates"], ["Transport", "Semester ticket or Deutschlandticket", "Semester ticket or Deutschlandticket"]],
      } },
      { heading: "In rupees", paragraphs: [
        "At roughly ₹95–105 to the euro (check the current rate), a year in Germany at a no-tuition university typically costs ₹11–15 lakh including living costs, mostly covered by the blocked account.",
      ] },
    ],
    faqs: [
      { q: "What is the Rundfunkbeitrag?", a: "A monthly broadcast fee charged per household in Germany. In a shared flat, one person registers and flatmates split it." },
    ],
    sources: [S.rundfunk],
  },

  scholarships: {
    blocks: [
      { heading: "Main options", checklist: [
        "DAAD scholarships for postgraduate and research study (programme-specific)",
        "Deutschlandstipendium — €300 a month, through your university",
        "Political and church foundations (Heinrich Böll, Friedrich Ebert, Konrad Adenauer and others)",
        "University and state scholarships for international students",
        "Research assistant (HiWi) jobs at universities",
      ] },
    ],
  },

  "funding-loans": {
    blocks: [
      { heading: "Blocked account explained", steps: [
        { title: "Choose an approved provider", body: "Several online providers are accepted by German missions in India." },
        { title: "Deposit €11,904", body: "Transfer from India; keep the confirmation." },
        { title: "Use the confirmation for the visa", body: "The provider issues a document for the visa application." },
        { title: "Monthly payouts", body: "After arrival and opening a German account, €992 is released each month." },
      ] },
    ],
    faqs: [
      { q: "Can I use an education loan instead of a blocked account?", a: "German missions generally accept a blocked account, a formal obligation letter from a sponsor living in Germany, or a scholarship. A loan is usually deposited into the blocked account." },
    ],
  },

  visa: {
    blocks: [
      { heading: "National student visa checklist", checklist: [
        "Valid passport and application form",
        "Admission letter",
        "APS certificate",
        "Blocked account confirmation",
        "Health insurance for entry",
        "Proof of language level for the programme",
        "Degree certificates and transcripts",
        "CV and motivation letter",
        "Visa fee",
      ] },
      { heading: "After arrival", steps: [
        { title: "Anmeldung", body: "Register your address at the Bürgeramt, usually within 14 days." },
        { title: "Residence permit", body: "Apply at the foreigners' office (Ausländerbehörde) before your entry visa expires." },
        { title: "Tax ID", body: "Arrives by post after registration; needed for jobs." },
      ] },
    ],
    faqs: [
      { q: "How long does a German student visa take in India?", a: "Appointment waiting times can be long in peak months; book as soon as you have admission, APS and the blocked account. Processing after the appointment usually takes several weeks." },
    ],
    sources: [S.missions],
  },

  "pre-departure": {
    blocks: [
      { heading: "Pack and prepare", checklist: [
        "Type C/F plug adapters",
        "Winter clothes (buy heavy jackets in Germany)",
        "Original documents and APS certificate",
        "Several passport photos (biometric format)",
        "Enough money for the first month before blocked-account payouts begin",
        "Temporary accommodation if your room starts later",
      ] },
    ],
  },

  arrival: {
    blocks: [
      { heading: "First month in the right order", steps: [
        { title: "Anmeldung (address registration)", body: "You need a landlord's confirmation (Wohnungsgeberbestätigung)." },
        { title: "Bank account", body: "Needed for blocked-account payouts and salary." },
        { title: "University enrolment", body: "Show health insurance confirmation and pay the semester contribution." },
        { title: "Residence permit appointment", body: "Book early; offices are busy." },
        { title: "Phone and transport ticket", body: "Your semester ticket often works as a Deutschlandticket." },
      ] },
    ],
    sources: [S.cgi],
  },

  housing: {
    blocks: [
      { heading: "Finding a room", checklist: [
        "Studierendenwerk dorms — apply as early as possible",
        "WG-Gesucht for flat-shares (WG)",
        "Temporary rooms for the first weeks",
        "Never pay before signing and seeing the room (in person or video)",
        "Ask for the Wohnungsgeberbestätigung — you need it to register",
      ] },
    ],
    faqs: [
      { q: "What is a WG in Germany?", a: "A Wohngemeinschaft — a shared flat where each person has a room and shares the kitchen and bathroom. It is the most common student housing." },
    ],
  },

  "health-banking": {
    blocks: [
      { heading: "Health insurance choice", paragraphs: [
        "Students under 30 in a degree programme usually join public health insurance (such as TK, AOK, Barmer or DAK) at a student rate of about €140 a month. Some students over 30 or in preparatory courses take private insurance. Your university needs proof of insurance to enrol you.",
      ] },
    ],
  },

  "part-time-work": {
    blocks: [
      { heading: "Ways to work", table: {
        head: ["Type", "What it is"],
        rows: [["Minijob", "Small job up to a monthly earnings limit with simplified rules"], ["Werkstudent", "Part-time role in your field, up to 20 hours a week in term"], ["HiWi", "Research or teaching assistant at the university"], ["Holiday jobs", "Full time in semester breaks within your yearly limit"]],
      } },
      { heading: "The yearly limit", paragraphs: [
        "International students can work 140 full days or 280 half days a year. Work as a research assistant at your university may not count, but confirm with the foreigners' office.",
      ] },
    ],
  },

  "after-graduation": {
    blocks: [
      { heading: "Routes after your degree", table: {
        head: ["Route", "Key point"],
        rows: [["18-month job-search permit", "Work any job while looking for a qualified one"], ["EU Blue Card", "Qualified job meeting the salary threshold; faster settlement"], ["Skilled worker permit", "Qualified job below Blue Card salary"], ["Settlement permit", "Possible after about 2 years of qualified work for German graduates"]],
      } },
    ],
    faqs: [
      { q: "How fast can I get permanent residence in Germany?", a: "German graduates working in a qualified job can apply for a settlement permit after about two years, with pension contributions and basic German. Blue Card holders with good German can apply earlier." },
    ],
    sources: [S.makeit],
  },

  jobs: {
    blocks: [
      { heading: "How graduates get hired", checklist: [
        "Werkstudent roles during studies lead to job offers",
        "Master's thesis in a company (Abschlussarbeit) is a strong route",
        "StepStone, LinkedIn, XING and company career pages",
        "German at B1–B2 multiplies your options",
        "German-format application: CV, cover letter and certificates (Zeugnisse)",
      ] },
    ],
  },

  faq: {
    faqs: [
      { q: "Is APS mandatory for all Indian students?", a: "Yes, Indian applicants need an APS certificate for German universities and the student visa, with only narrow exceptions such as some scholarship holders." },
      { q: "Can I bring my spouse to Germany as a student?", a: "It is possible but needs enough living space and money; it is much easier after you start working." },
    ],
  },
};
