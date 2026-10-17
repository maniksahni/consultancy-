import type { ChapterDepth } from "../types";

/**
 * In-depth France content, merged into the France chapters.
 * Figures repeat the ones checked in guides/france.ts (reviewed October 2026); anything that
 * varies by institution or city is given as a typical range.
 */
const S = {
  servicePublicStudents: { label: "Service-Public · Foreign students", url: "https://www.service-public.fr/particuliers/vosdroits/N110" },
  anef: { label: "ANEF · Residence permit online services", url: "https://administration-etrangers-en-france.interieur.gouv.fr/" },
  ameli: { label: "Assurance Maladie · International students", url: "https://etudiant-etranger.ameli.fr/" },
  messervices: { label: "Mes Services Étudiant (CROUS)", url: "https://www.messervices.etudiant.gouv.fr/" },
  enic: { label: "France Éducation international · ENIC-NARIC", url: "https://www.france-education-international.fr/en/enic-naric-france" },
  alliance: { label: "Alliance Française in India", url: "https://www.afindia.org/" },
  embassy: { label: "Embassy of India in France", url: "https://www.eoiparis.gov.in/" },
  mea: { label: "Ministry of External Affairs · Apostille", url: "https://www.mea.gov.in/apostille.htm" },
  impots: { label: "impots.gouv.fr · First income declaration", url: "https://www.impots.gouv.fr/particulier/questions/je-declare-pour-la-premiere-fois-comment-dois-je-proceder" },
  vidyalakshmi: { label: "Vidya Lakshmi education loan portal", url: "https://www.vidyalakshmi.co.in/" },
  rbiLrs: { label: "Reserve Bank of India · Liberalised Remittance Scheme", url: "https://www.rbi.org.in/scripts/FAQView.aspx?Id=115" },
  welcome: { label: "Welcome to the Jungle", url: "https://www.welcometothejungle.com/en" },
  apec: { label: "APEC · Jobs for graduates", url: "https://www.apec.fr/" },
  etudiantGouv: { label: "etudiant.gouv.fr · Student life", url: "https://www.etudiant.gouv.fr/en" },
};

export const franceDepth: Record<string, ChapterDepth> = {
  "why-france": {
    blocks: [
      { heading: "France against the other six destinations", table: {
        head: ["", "France", "UK", "Germany", "Canada"],
        rows: [
          ["Typical master's length", "2 years (some 1-year MSc)", "1 year", "2 years", "1–2 years"],
          ["Public tuition, non-EU", "€3,950 / year (master's)", "£16,000–35,000 / year", "Mostly free (except Baden-Württemberg)", "CAD 20,000–40,000 / year"],
          ["Work while studying", "964 h / year", "20 h / week in term", "140 full days / year", "24 h / week off-campus"],
          ["After graduating", "12-month job-search permit, renewable once for Indians", "Graduate visa", "18-month job-search permit", "PGWP if eligible"],
          ["Daily language", "French helps a lot", "English", "German helps a lot", "English (French in Quebec)"],
        ],
        caption: "A planning comparison; each country chapter has the full rules.",
      } },
      { heading: "Questions to ask yourself before choosing France", checklist: [
        "Will I start French classes now, even for an English-taught programme? Jobs and daily life need it.",
        "Is my target programme a state-recognised diploma (Master, Grade de Master, visé) or a school certificate?",
        "Can I show €877.50 a month for the visa and cover Paris rent if I study there?",
        "Do I want a two-year master's with an internship built in, or the fastest possible degree?",
        "Which industry do I want to work in, and is it strong in the city I choose (aerospace in Toulouse, luxury in Paris, pharma in Lyon)?",
        "Am I ready for paperwork in French in the first month (bank, CAF, residence permit)?",
      ] },
      { heading: "Cities beyond Paris", table: {
        head: ["City", "Known for", "Rent for a student room"],
        rows: [
          ["Paris", "Business schools, finance, luxury, tech, research", "€700–1,200 / month"],
          ["Lyon", "Pharma, biotech, engineering, food", "€450–700 / month"],
          ["Toulouse", "Aerospace (Airbus), space, engineering", "€400–650 / month"],
          ["Lille", "Retail, logistics, business schools, near Brussels and London", "€400–600 / month"],
          ["Grenoble", "Microelectronics, energy, research", "€400–600 / month"],
          ["Bordeaux", "Wine business, aeronautics, digital", "€450–650 / month"],
          ["Nice / Sophia Antipolis", "Tech park, telecom, hospitality", "€500–750 / month"],
        ],
        caption: "Typical private rents for a room or small studio; CROUS rooms cost less.",
      } },
    ],
    faqs: [
      { q: "Is a degree from France recognised in India?", a: "State-recognised French degrees (Licence, Master, Doctorat, and diplomas with the Grade de Master or visa of the Ministry) are recognised internationally. For government jobs or further study in India, the Association of Indian Universities (AIU) issues equivalence certificates; keep your diploma, transcripts and the institution's accreditation proof." },
      { q: "Which city in France is best for Indian students?", a: "Paris has the most programmes, jobs and Indian community, but the highest rent. Lyon, Toulouse, Lille, Grenoble and Bordeaux offer strong universities and grandes écoles at roughly half the Paris rent. Choose by programme first, then by the industry around the city." },
      { q: "Is France safe for Indian students?", a: "France is generally safe. Use normal city precautions: watch for pickpockets on the Paris metro and at tourist sites, keep copies of your passport and residence permit, and save 112 (all emergencies) and the Embassy of India in Paris in your phone." },
    ],
    sources: [S.etudiantGouv, S.embassy],
  },

  "education-system": {
    blocks: [
      { heading: "How to tell a real degree from a school certificate", paragraphs: [
        "In France, only certain titles are national degrees: Licence, Master, Doctorat, and diplomas that carry the Grade de Licence or Grade de Master. Many private schools also sell 'MSc', 'MBA' or 'Bachelor' programmes that are school diplomas. Some are excellent and registered with France Compétences (RNCP level 6 or 7), others are not. A student visa can be granted for both, but employers, scholarship bodies and Indian equivalence checks look at the official status.",
        "Before you pay a deposit, ask the school in writing: is the programme a national diploma or does it carry the Grade de Master? Is it registered on RNCP and at which level? Is the school accredited (AACSB, EQUIS, AMBA for business, CTI for engineering)?",
      ] },
      { heading: "Grading and credits", table: {
        head: ["French grade (out of 20)", "Mention", "Rough meaning"],
        rows: [["16 and above", "Très bien", "Excellent — rare"], ["14–15.9", "Bien", "Very good"], ["12–13.9", "Assez bien", "Good"], ["10–11.9", "Passable", "Pass"], ["Below 10", "—", "Fail (can usually resit)"]],
        caption: "French marking is strict: 14/20 is a strong result.",
      } },
      { heading: "Programme formats you will meet", checklist: [
        "Master 1 + Master 2 (M1, M2): two one-year steps; some students join directly in M2 with a relevant Indian master's or strong experience",
        "Programme Grande École (PGE): a business-school master, often 2–3 years with internships and gap years",
        "MSc / Mastère Spécialisé: 12–18-month specialised programmes, often in English",
        "Diplôme d'ingénieur: 3-year engineering degree after two years of preparatory classes; master's-level",
        "Alternance tracks: study and work alternately with a paid contract (mostly in French)",
        "Double degrees and exchanges: semesters abroad included in many grandes écoles",
      ] },
    ],
    faqs: [
      { q: "What is the difference between a Master and an MSc in France?", a: "A Master is a national two-year degree from a university or accredited school. An MSc is usually a school-awarded programme of 12–18 months; it can be RNCP-registered or accredited, but it is not automatically a national Master. Check the status before you choose." },
      { q: "Can I join a French master's directly in the second year?", a: "Sometimes. Universities can admit you to M2 if your previous studies or experience match the first year. Business schools often offer one-year MSc tracks instead. Ask each programme how they treat a 3- or 4-year Indian bachelor's." },
      { q: "What is RNCP?", a: "The national register of professional certifications, managed by France Compétences. Level 7 equals master's level and level 6 bachelor's level. It shows the qualification is officially recognised in France, even when it is not a national Master." },
    ],
  },

  admissions: {
    blocks: [
      { heading: "Month-by-month for a September start", table: {
        head: ["When", "What to do"],
        rows: [
          ["September–October", "Shortlist 6–10 programmes, check language requirements, book IELTS/TOEFL or DELF/TCF, ask professors for recommendations"],
          ["October–December", "Create your Études en France account, write programme-specific motivation letters, upload documents; Licence 1 deadline is 15 December"],
          ["December–March", "Submit to programmes (many have rounds), Campus France interview, school interviews and tests"],
          ["March–June", "Offers arrive; accept on Études en France; apply for scholarships the school nominates you for"],
          ["June–August", "Visa application at VFS, accommodation, flights, money transfer"],
        ],
      } },
      { heading: "Mistakes that cost Indian applicants an offer", checklist: [
        "Sending the same motivation letter to every programme",
        "Ignoring the programme's language of instruction (an 'international' programme can still be partly in French)",
        "Recommendation letters with no examples, or from people who barely know you",
        "Unexplained gaps or backlogs; explain them briefly and positively",
        "Applying only to the most selective schools; keep a balanced list",
        "Missing a school's own portal deadline because the Études en France file was complete",
        "Paying a deposit to an unaccredited school after a high-pressure call",
      ] },
      { heading: "Backlogs, gaps and a 3-year degree", paragraphs: [
        "French universities look at your overall average and the subjects relevant to the master's. A few cleared backlogs are rarely a problem if the transcript shows them passed; explain them in one line if asked. Gaps of one to two years are common; show what you did (work, courses, family reasons). A 3-year Indian bachelor's (BCom, BSc, BA) is accepted for Master 1 in most universities; some business schools ask for 4 years or work experience for their MSc programmes.",
      ] },
    ],
    faqs: [
      { q: "What percentage do I need to study in France?", a: "There is no national cut-off. Selective programmes usually expect 60–70% or a CGPA of about 6.5–7/10 and above, with strong marks in relevant subjects. Universities read your file as a whole, including experience and the motivation letter." },
      { q: "How many programmes can I apply to through Études en France?", a: "For master's and other non-Licence 1 programmes you can add several choices; the platform shows the current limit for your procedure. Choose a balanced list rather than the maximum." },
      { q: "Do French universities interview applicants?", a: "Many selective master's programmes and most business schools hold an online interview. Campus France India also holds an academic interview for every applicant." },
    ],
  },

  "campus-france": {
    blocks: [
      { heading: "Documents to upload on Études en France", checklist: [
        "Passport (first and last pages)",
        "Class 10 and 12 mark sheets",
        "Bachelor's (and master's) transcripts and degree or provisional certificate",
        "CV in the European format or a one-page modern CV",
        "Programme-specific motivation letters",
        "Language test result (IELTS/TOEFL/DELF/TCF) or proof of English-medium study",
        "Work experience letters, if any",
        "Recommendation letters, if programmes ask for them",
        "Passport-size photo",
      ] },
      { heading: "Questions often asked at the Campus France interview", checklist: [
        "Why France, and why not the UK or Canada?",
        "Why this programme and this institution? What will you study in the first semester?",
        "How does it connect to your bachelor's and your career plan?",
        "Who is funding your studies and how much will it cost in total?",
        "What will you do after the programme, and how does it help your career in India or abroad?",
        "Have you started learning French? What level are you at?",
        "Explain any gap year or change of field.",
      ] },
      { heading: "How to prepare in one week", steps: [
        { title: "Know your programme cold", body: "Read the course list, teachers' names and internship details on the programme page." },
        { title: "Write your money plan", body: "Tuition, rent, living costs and who pays; have the numbers ready in euros and rupees." },
        { title: "Prepare a 60-second introduction", body: "Education, experience and why this programme, in clear English (or French)." },
        { title: "Practise aloud", body: "Answer the questions above with a friend or on video; keep answers specific and honest." },
        { title: "Check your documents", body: "Originals and copies of everything you uploaded, in the order on the platform." },
      ] },
    ],
    faqs: [
      { q: "How long does the Campus France procedure take?", a: "Allow two to four months from creating your account to receiving answers from institutions, longer in peak season. Start by October–November for a September intake." },
      { q: "Can the Campus France fee be refunded?", a: "The Études en France fee is generally not refundable once your file is validated. Check the current conditions on the Campus France India site before paying." },
      { q: "What if I do not get an interview slot quickly?", a: "Slots open after your file is validated. Book the earliest available slot and keep checking; in peak months, apply early so the interview is not the bottleneck." },
    ],
  },

  "language-tests": {
    blocks: [
      { heading: "Which test to take", table: {
        head: ["Test", "Use in France", "Validity", "Where in India"],
        rows: [
          ["IELTS Academic", "English-taught programmes; most widely accepted", "2 years", "IDP and British Council centres"],
          ["TOEFL iBT", "English-taught programmes, especially grandes écoles", "2 years", "ETS centres and at home"],
          ["Duolingo English Test", "Accepted by a growing number of schools — check each", "2 years", "Online"],
          ["DELF B2 / DALF C1", "French-taught programmes; never expires", "Lifetime", "Alliance Française centres"],
          ["TCF Tout Public / TCF DAP", "French-taught programmes; DAP for Licence 1", "2 years", "Alliance Française centres"],
        ],
      } },
      { heading: "A realistic French learning plan", steps: [
        { title: "Now: A1", body: "Basics, greetings, numbers, shopping — about 60–80 hours with an app plus a weekly class." },
        { title: "Before departure: A2", body: "Enough for supermarkets, transport and simple calls; about 150–200 hours in total." },
        { title: "First year in France: B1", body: "Take the free or low-cost French classes most universities offer; speak French at work and with flatmates." },
        { title: "For jobs: B2", body: "Most French employers want B2 for client-facing roles; it also helps for the job-search permit and later residence." },
      ] },
    ],
    faqs: [
      { q: "Can I study in France without IELTS?", a: "Some institutions accept a medium-of-instruction certificate from your Indian university or their own online test, but many ask for IELTS, TOEFL or Duolingo. If you plan several countries, IELTS Academic is the safest choice." },
      { q: "Does DELF expire?", a: "No. DELF and DALF diplomas are valid for life. TCF results are valid for two years." },
      { q: "How long does it take to reach B2 in French?", a: "For most learners, about 500–650 hours of study from zero. Starting a year before departure and continuing in France makes B2 realistic by the end of a two-year master's." },
    ],
    sources: [S.alliance],
  },

  "sop-lor-cv": {
    blocks: [
      { heading: "A motivation letter structure that works", steps: [
        { title: "Opening (2–3 lines)", body: "The specific problem or field that drives you, not a quotation or a childhood story." },
        { title: "What you have done", body: "Two or three concrete achievements from studies, projects or work, with numbers where possible." },
        { title: "Why this programme", body: "Name courses, a specialisation, a lab, an internship model or a professor — things only this programme offers." },
        { title: "Why France", body: "Industry, language, European exposure — specific to your field." },
        { title: "Your plan", body: "The job you aim for in 3–5 years and how the programme gets you there." },
      ] },
      { heading: "French-style CV checklist", checklist: [
        "One page for under five years of experience",
        "Photo is optional; if used, a professional one",
        "Education in reverse order with grades converted or explained",
        "Experience with results, not duties",
        "Languages with CEFR levels (e.g. English C1, French A2)",
        "Skills and tools relevant to the programme",
        "No date of birth, religion or family details needed",
      ] },
      { heading: "Getting good recommendation letters", paragraphs: [
        "Ask a professor who taught you in a relevant subject and, if you have work experience, your manager. Give them your CV, the programme description and two or three moments you want them to mention. Letters should be on letterhead, signed, with the recommender's email so the school can verify. Most French portals send an upload link directly to the recommender — give them the deadline a week early.",
      ] },
    ],
    faqs: [
      { q: "Should I write my motivation letter in French?", a: "Write it in the language of the programme. For an English-taught programme, English is right; a short line in French can show effort, but do not use machine translation for the whole letter." },
      { q: "Can Althéa write my SOP?", a: "We help you plan, structure and edit your own letter so it sounds like you and passes plagiarism and AI checks. Writing it for you would put your application at risk." },
    ],
  },

  costs: {
    blocks: [
      { heading: "A full first-year budget for Paris and another city", table: {
        head: ["Item", "Paris", "Lyon / Toulouse / Lille"],
        rows: [
          ["Tuition (public master's)", "€3,950", "€3,950"],
          ["CVEC", "€105", "€105"],
          ["Rent (10–12 months)", "€8,400–14,400", "€5,000–8,400"],
          ["Food and groceries", "€2,400–3,600", "€2,000–3,000"],
          ["Transport pass", "Student Navigo (imagine R)", "€25–40 / month"],
          ["Phone, internet, insurance top-up", "€400–700", "€400–700"],
          ["Visa, validation, Campus France", "€50 + €150 + ₹20,000", "€50 + €150 + ₹20,000"],
          ["Setup: deposit, bedding, kitchen", "€1,000–2,000", "€700–1,500"],
        ],
        caption: "Planning ranges for one student; CAF housing aid can reduce rent.",
      } },
      { heading: "In rupees, roughly", paragraphs: [
        "At roughly ₹95–105 to the euro (check the current rate), a public master's in a city outside Paris typically costs ₹11–15 lakh for the first year including tuition, rent and living costs; in Paris, ₹15–22 lakh. Business-school programmes add their tuition of €12,000–30,000 a year on top. Exchange rates move, so budget with a 5–10% margin.",
      ] },
      { heading: "Costs students forget", checklist: [
        "Rent deposit (usually one month) and the first month's rent paid together",
        "Agency or platform fees for private housing",
        "Home insurance (assurance habitation) — required by landlords",
        "Mutuelle top-up health insurance",
        "Winter clothing if you arrive with only Indian clothes",
        "Laptop, adapters (French plugs are type C/E) and a local SIM",
        "Travel home for the summer or Diwali",
      ] },
    ],
    faqs: [
      { q: "Is Paris much more expensive than other French cities?", a: "Mainly for rent: a room in Paris often costs €700–1,200 a month versus €400–700 elsewhere. Food, transport and phone costs are similar across France." },
      { q: "How much does a student spend on food in France?", a: "About €200–300 a month cooking at home, using supermarkets like Lidl, Aldi, Leclerc and Carrefour, and CROUS university restaurants where a full meal costs a few euros." },
    ],
  },

  scholarships: {
    blocks: [
      { heading: "Scholarship calendar", table: {
        head: ["Scholarship", "Who applies", "When"],
        rows: [
          ["Charpak Master's", "You, through Campus France India", "Usually opens late in the year; check the Campus France India site"],
          ["Eiffel Excellence", "Your French institution nominates you", "Institutions submit around January; ask your programme in autumn"],
          ["Erasmus Mundus", "You, to the joint master's consortium", "October to February, depending on the programme"],
          ["Institution scholarships and fee waivers", "You, often with the admission application", "With your application or after the offer"],
          ["Regional and city grants", "Usually after arrival", "Varies by region"],
        ],
      } },
      { heading: "Documents scholarship panels look for", checklist: [
        "Academic transcripts showing consistent performance",
        "A focused statement linking your project to France and India",
        "Recommendation letters with concrete evidence",
        "Proof of achievements: publications, competitions, leadership, social work",
        "A clear career plan and why the funding matters",
        "Admission letter or proof of application to the programme",
      ] },
    ],
    faqs: [
      { q: "Can I apply for the Eiffel scholarship myself?", a: "No. Your French institution nominates you. Ask the programme early whether it nominates Indian students and what internal deadline it sets." },
      { q: "Do French schools give fee reductions to Indian students?", a: "Many business and engineering schools offer merit-based reductions of 10–50%, often decided with the offer. Ask the admissions office what is available and whether a strong test score or early application helps." },
    ],
  },

  "funding-loans": {
    blocks: [
      { heading: "Education loans from India compared", table: {
        head: ["Type", "Examples", "Typical features"],
        rows: [
          ["Public-sector banks", "SBI, Bank of Baroda, Union Bank, Canara Bank", "Lower interest, collateral above a set amount, slower processing"],
          ["Private banks", "HDFC Bank, ICICI Bank, Axis Bank", "Faster, collateral or co-applicant income-based"],
          ["NBFCs specialising in education", "HDFC Credila, Avanse, Auxilo, InCred", "Unsecured options for strong admits, higher interest, quick sanction"],
          ["International lenders", "Prodigy Finance, MPOWER (selected schools)", "No Indian collateral, USD/EUR loans, limited programme lists"],
        ],
        caption: "Compare the effective rate, processing fee, margin money and moratorium, not just the headline rate.",
      } },
      { heading: "Getting a loan sanctioned, step by step", steps: [
        { title: "Get the admission letter", body: "Banks sanction against an offer; some give a pre-admission letter for the visa." },
        { title: "Compare three lenders", body: "Ask for the rate, processing fee, collateral rule, insurance and prepayment terms in writing." },
        { title: "Prepare co-applicant documents", body: "Parents' income proof, ITRs, bank statements, KYC, and property papers if collateral is needed." },
        { title: "Sanction letter", body: "Use it as proof of funds for the visa together with any savings." },
        { title: "Disbursement", body: "Tuition is paid directly to the school; living costs are released in instalments to your account." },
      ] },
      { heading: "Tax benefits and repayment", paragraphs: [
        "Interest on an education loan from a recognised lender can be deducted under Section 80E for up to eight years from when repayment starts, with no upper limit on the interest amount (check your tax regime, as deductions differ between the old and new regimes). Most loans include a moratorium for the course period plus 6–12 months; paying simple interest during the course reduces the total cost considerably.",
        "Use the government's Vidya Lakshmi portal to apply to several banks with one form and track applications.",
      ] },
    ],
    faqs: [
      { q: "Can I get an education loan for France without collateral?", a: "Yes, from several NBFCs and private banks, usually up to a limit that depends on your university, course and co-applicant income. Above that, or for a lower rate, most banks ask for collateral." },
      { q: "Does a loan sanction letter count as proof of funds for the French visa?", a: "Yes. A sanction or disbursement letter from a bank is commonly accepted, together with bank statements for any remaining amount." },
      { q: "How much TCS do I pay when sending money to France?", a: "None if the money comes from an education loan from a specified lender. If self-funded, 2% TCS applies above ₹10 lakh in a financial year from April 2026, which you can claim back against income tax." },
    ],
    sources: [S.vidyalakshmi, S.rbiLrs],
  },

  visas: {
    blocks: [
      { heading: "Reasons French student visas get refused", checklist: [
        "Funds below €877.50 a month, or money deposited just before applying with no explanation",
        "A study plan that does not match your background without a clear reason",
        "Inconsistent answers between the Campus France interview and the visa file",
        "Unaccredited or unclear programmes",
        "Missing documents or unsigned forms",
        "Previous visa refusals or overstays not declared",
      ] },
      { heading: "If your visa is refused", steps: [
        { title: "Read the refusal reason", body: "The decision lists the ground for refusal." },
        { title: "Appeal within 30 days", body: "First to the Commission de recours contre les refus de visa (CRRV), in writing, with new evidence — this step is required before going to court." },
        { title: "Or reapply", body: "If the problem was a missing document or funds, a fresh, complete application is often faster." },
        { title: "Tell your school", body: "Ask whether they can defer your admission to the next intake." },
      ] },
      { heading: "Your rights with a VLS-TS", checklist: [
        "Live in France for the visa's validity (usually the length of your first academic year)",
        "Work up to 964 hours a year once the visa is validated",
        "Travel in the Schengen area for up to 90 days in any 180",
        "Return to India and re-enter France during validity",
        "Register for French social security and apply for CAF housing aid",
      ] },
    ],
    faqs: [
      { q: "Can I travel to other European countries with a French student visa?", a: "Yes. A validated VLS-TS lets you travel within the Schengen area for up to 90 days in any 180-day period. The UK and Ireland are not in Schengen and need separate visas." },
      { q: "What happens if I forget to validate my VLS-TS?", a: "After three months without validation you are in an irregular situation and cannot work or re-enter France with that visa. Validate it online on ANEF in your first weeks." },
      { q: "Can I convert a short-stay visa into a student visa in France?", a: "As a rule, no. You must apply for the long-stay student visa from India before you travel." },
    ],
    sources: [S.anef],
  },

  "pre-departure": {
    blocks: [
      { heading: "Six-week countdown", table: {
        head: ["When", "Task"],
        rows: [
          ["6 weeks", "Confirm housing in writing; book flights (arrive 1–2 weeks before classes)"],
          ["5 weeks", "Buy a forex card or open an online multi-currency account; arrange the first two months of money"],
          ["4 weeks", "Medical check-up, dental work, glasses; get a doctor's letter for any medicines"],
          ["3 weeks", "Scan every document to cloud storage; print two sets of copies"],
          ["2 weeks", "Travel insurance until French social security starts; download apps (SNCF Connect, Citymapper, Doctolib, Leboncoin)"],
          ["1 week", "Pack, check baggage rules, share your address and flight with family and your school"],
        ],
      } },
      { heading: "What to pack from India", checklist: [
        "Warm jacket, thermals, gloves and closed shoes (buy a heavy coat in France if needed)",
        "Universal adapter for French type C/E sockets",
        "Prescription medicines for 2–3 months with the doctor's prescription in English",
        "A pressure cooker or small kitchen basics if you cook Indian food",
        "Spices in sealed packets (Indian groceries exist in Paris, but they cost more)",
        "Passport photos — French admin often asks for them",
        "Formal outfit for interviews and events",
      ] },
      { heading: "Not allowed or limited in your luggage", checklist: [
        "Meat and dairy products from India are not allowed into the EU",
        "Fresh fruit, vegetables and plants are restricted",
        "Cash above €10,000 must be declared at customs",
        "Medicines only in personal quantities, with a prescription",
        "Lithium batteries and power banks in cabin baggage only",
      ] },
    ],
    faqs: [
      { q: "How much cash should I carry to France?", a: "Enough for the first days — €200–400 in cash plus a forex card or an international debit card. Keep any amount above €10,000 declared at customs." },
      { q: "When should I arrive in France?", a: "One to two weeks before classes start, so you can settle into housing, validate your visa and open a bank account before lectures." },
    ],
  },

  arrival: {
    blocks: [
      { heading: "Your first week, day by day", steps: [
        { title: "Day 1", body: "Reach your housing, collect keys, check the inventory (état des lieux) carefully and photograph any damage." },
        { title: "Day 2", body: "Buy a French SIM card; validate your VLS-TS online on ANEF and pay the €150 tax." },
        { title: "Day 3", body: "Go to your university for enrolment, the CVEC certificate and your student card." },
        { title: "Day 4", body: "Book a bank appointment; get your RIB (bank details) as soon as the account opens." },
        { title: "Day 5", body: "Register on the Assurance Maladie international students' site; take out home insurance if not done." },
        { title: "Week 2", body: "Apply for CAF housing aid, get a transport pass, and find your nearest doctor on Doctolib." },
      ] },
      { heading: "Apps and websites you will use", checklist: [
        "ANEF — visa validation and residence permits",
        "ameli — health insurance and reimbursements",
        "CAF — housing aid",
        "Doctolib — doctor appointments",
        "SNCF Connect, Citymapper, IDF Mobilités — transport",
        "Leboncoin — second-hand furniture",
        "Lydia or Wero — paying friends",
      ] },
    ],
    faqs: [
      { q: "Where can Indian students get help in France?", a: "Your university's international office and student associations, the Embassy of India in Paris for passport or emergency help, and Indian student associations active in most cities." },
      { q: "What is an état des lieux?", a: "The move-in inspection report of your housing. Note every scratch or broken item; it decides how much of your deposit you get back when you leave." },
    ],
    sources: [S.anef, S.ameli, S.embassy],
  },

  living: {
    blocks: [
      { heading: "How to find housing from India", steps: [
        { title: "CROUS first", body: "Apply on Mes Services Étudiant (DSE) as soon as you apply to programmes; international students also get rooms through some universities directly." },
        { title: "Private student residences", body: "Studéa, Les Belles Années, Nexity Studea and similar operators accept online booking and often accept foreign guarantors with Visale." },
        { title: "Flat-shares", body: "La Carte des Colocs, Leboncoin and Facebook groups — arrange a video visit and never pay before signing." },
        { title: "Temporary first month", body: "A short-term studio or hostel while you visit places in person often finds better housing." },
      ] },
      { heading: "Grocery and Indian food", paragraphs: [
        "Supermarkets such as Lidl, Aldi, Leclerc, Carrefour and Intermarché are the cheapest options. Paris has Indian grocery shops around La Chapelle (10th–18th arrondissement) and most big cities have at least one shop for rice, dal, spices and atta. CROUS restaurants on campus serve a full meal at a low student price, with vegetarian options.",
      ] },
      { heading: "Culture notes", checklist: [
        "Always greet with 'Bonjour' before asking anything in a shop or office",
        "Appointments start on time; tell people if you are late",
        "Many shops close on Sundays",
        "Tipping is optional; service is included",
        "Speaking even basic French earns goodwill",
      ] },
    ],
    faqs: [
      { q: "How much is CROUS rent?", a: "Usually €250–600 a month depending on the city, room size and whether the bathroom is private. CAF housing aid can apply to CROUS rooms too." },
      { q: "Can I find vegetarian food in France?", a: "Yes. Supermarkets stock vegetarian and vegan products, CROUS restaurants have vegetarian options, and Indian restaurants and groceries are common in Paris and large cities." },
    ],
    sources: [S.messervices],
  },

  "health-banking": {
    blocks: [
      { heading: "How French healthcare works for you", steps: [
        { title: "Register", body: "On the Assurance Maladie international students' site after enrolment; you get a provisional social security number, then a permanent one and your carte Vitale." },
        { title: "Choose a médecin traitant", body: "Declare a regular GP; you get better reimbursement when you see your declared doctor first." },
        { title: "Pay and get refunded", body: "You pay the doctor, then about 70% of the official rate is refunded; a mutuelle covers most of the rest." },
        { title: "Emergencies", body: "Call 15 (medical emergency) or 112; hospital emergency rooms (urgences) treat everyone." },
      ] },
      { heading: "Opening a bank account", checklist: [
        "Passport with your visa",
        "Proof of address in France (lease, CROUS certificate or host attestation)",
        "Student enrolment certificate",
        "French phone number",
        "Online banks are fast but sometimes need a French tax or address history; traditional banks offer student packages",
        "Every adult in France has the right to a basic account (droit au compte) through the Banque de France if refused",
      ] },
      { heading: "Mental health support", paragraphs: [
        "Moving countries is hard. Your university's health service (SSU) offers free consultations, and the national Santé Psy Étudiant scheme gives students free sessions with a psychologist on a doctor's referral. Talk to someone early — your international office can point you to the right service.",
      ] },
    ],
    faqs: [
      { q: "Do I need a mutuelle in France?", a: "It is optional but recommended: social security refunds about 70% of standard consultation costs, and a mutuelle covers most of the rest, plus hospital stays. Student mutuelles cost roughly €10–40 a month." },
      { q: "What is a carte Vitale?", a: "Your French health insurance card. Doctors scan it so refunds go to your bank account automatically. It arrives a few weeks after your permanent registration." },
    ],
    sources: [S.ameli],
  },

  "part-time-work": {
    blocks: [
      { heading: "What you will actually earn", table: {
        head: ["Hours per week", "Gross per month at SMIC", "Approx. net per month"],
        rows: [["10", "about €533", "about €420"], ["15", "about €800", "about €630"], ["20", "about €1,067", "about €840"]],
        caption: "Based on the €12.31 gross hourly SMIC; net pay is roughly 21–23% lower after social contributions.",
      } },
      { heading: "Where students find jobs", checklist: [
        "University job boards and student job services",
        "StudentJob, Indeed, Hellowork, Jobteaser (through your school)",
        "Restaurants, cafés, retail and hotels near your campus",
        "Tutoring English, maths or coding",
        "Campus jobs: library, events, international office ambassadors",
        "Delivery platforms (check status rules carefully before signing up as self-employed)",
      ] },
      { heading: "Pay slips, tax and your rights", paragraphs: [
        "Every employer must give you a contract and a monthly pay slip (bulletin de paie). Keep them: they prove your hours for permit renewals. Income tax is withheld at source if you earn enough; students under 26 benefit from a large exemption on student-job income in most cases. You must file a French tax return each spring once you are tax-resident, even if you owe nothing — it is often required for CAF and permit renewals.",
      ] },
    ],
    faqs: [
      { q: "Can I work full-time in summer in France?", a: "Your total is limited to 964 hours a year. You can work more hours in some weeks, including summer, as long as the yearly total stays within the limit." },
      { q: "Do internships count towards the 964 hours?", a: "Internships that are part of your programme, with a signed internship agreement (convention de stage), do not count as a student job." },
    ],
    sources: [S.impots],
  },

  "after-graduation": {
    blocks: [
      { heading: "Your permit options compared", table: {
        head: ["Status", "Who it suits", "Key condition"],
        rows: [
          ["APS / job-search permit", "Master's graduates looking for work", "Apply before your student permit expires"],
          ["Salarié / Travailleur temporaire", "A job offer in your field", "Salary at least €2,800.53 gross a month for the simplified change of status"],
          ["Talent Passport — qualified employee", "Master's graduates with a well-paid job", "€39,582 gross a year in 2026"],
          ["EU Blue Card (Talent Passport)", "Highly skilled jobs", "Salary threshold set each year; mobility within the EU"],
          ["Company creation", "Graduates starting a business", "A real, viable business project"],
        ],
      } },
      { heading: "The 5-year short-stay visa for Indian alumni", paragraphs: [
        "Indian students who completed at least one semester of higher education in France and obtained a master's-level degree can apply for a five-year Schengen short-stay visa through Campus France India's alumni scheme. It is useful for interviews, conferences and visits after you return to India.",
      ] },
      { heading: "Path to long-term residence", checklist: [
        "Years spent on a student permit count partly towards long-term residence",
        "A 10-year resident card generally needs five years of regular, continuous residence",
        "Naturalisation can be requested after five years, reduced to two years for graduates of a French master's",
        "French language level (B1 for nationality, rising rules) and integration are assessed",
      ] },
    ],
    faqs: [
      { q: "How long can I stay in France after my master's?", a: "You can get a 12-month job-search or company-creation permit, and Campus France India states Indian graduates can renew it once. Switching to a work permit with a qualifying job lets you stay longer." },
      { q: "Can I get French citizenship after studying?", a: "Graduates of a French master's can apply for naturalisation after two years of residence instead of five, subject to the other conditions, including language level and integration." },
    ],
  },

  jobs: {
    blocks: [
      { heading: "Your job-search plan for the final year", steps: [
        { title: "September", body: "Update LinkedIn in English and French; list 30 target companies; attend school career fairs." },
        { title: "October–December", body: "Apply for end-of-studies internships (stage de fin d'études) — the most common route to a first job." },
        { title: "January–March", body: "Interviews; prepare your 60-second pitch in French even for English roles." },
        { title: "April–September", body: "Internship; ask for a conversion to a permanent contract (CDI) two months before it ends." },
        { title: "After graduating", body: "Apply for the job-search permit before your student permit expires; keep applying daily." },
      ] },
      { heading: "French CV and interview habits", checklist: [
        "CV of one page, with a clear title (e.g. 'Data Analyst — Python, SQL, Power BI')",
        "A short cover letter (lettre de motivation) is still expected by many employers",
        "Interviews often include a case, a technical test or a conversation in French",
        "Ask about the contract type (CDI, CDD), the trial period and remote days",
        "Salary is quoted gross per year (brut annuel)",
      ] },
    ],
    faqs: [
      { q: "Do I need French to get a job in France?", a: "For tech, research and some international companies, English can be enough, especially in Paris. For most roles, B1–B2 French makes a large difference to interview invitations and promotion." },
      { q: "What is a VIE?", a: "Volontariat International en Entreprise — a paid placement abroad with a French company, open only to EU/EEA citizens. Indian graduates usually target local internships and graduate programmes instead." },
    ],
    sources: [S.welcome, S.apec],
  },

  faq: {
    faqs: [
      { q: "Is IELTS required for a French student visa?", a: "The visa itself does not require IELTS. Your institution decides which English or French test it accepts for admission." },
      { q: "Can I take my family with me to France as a student?", a: "Students can apply for family members, but they need their own visas and you must show enough resources and housing. It is easier after you have a work permit." },
      { q: "Is a gap year a problem for French admission?", a: "No, if you can show what you did. Work, courses, internships or family reasons are all acceptable when explained briefly." },
      { q: "How do I get my French degree recognised in India?", a: "Apply to the Association of Indian Universities (AIU) for an equivalence certificate with your diploma and transcripts. Keep your institution's accreditation documents." },
      { q: "Where is the Embassy of India in France?", a: "In Paris, at 13–15 rue Alfred Dehodencq, 75016. It handles passport services and emergencies for Indian students across France." },
    ],
    sources: [S.embassy, S.enic],
  },
};
