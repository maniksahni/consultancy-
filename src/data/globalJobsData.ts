export type CountryCode = "france" | "uk" | "usa" | "canada" | "germany" | "australia" | "ireland";

export type CountryWorkInfo = {
  id: CountryCode;
  countryName: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  minHourlyWage: string;
  termTimeHourLimit: string;
  holidayHourLimit: string;
  postStudyVisaName: string;
  postStudyDuration: string;
  taxNumberName: string;
  avgStudentMonthlyNet: string;
  workPermitRules: string;
  employmentAgencyName: string;
  employmentAgencyRole: string;
  topHiringIndustries: string[];
};

export const countriesWorkRegistry: Record<CountryCode, CountryWorkInfo> = {
  france: {
    id: "france",
    countryName: "France",
    flag: "🇫🇷",
    currency: "EUR",
    currencySymbol: "€",
    minHourlyWage: "€11.65 / hr (SMIC gross)",
    termTimeHourLimit: "Up to 20 hrs / week (964 hrs/yr legal limit)",
    holidayHourLimit: "Up to 35 hrs / week during university breaks",
    postStudyVisaName: "2-Year APS / RECE Post-Study Visa",
    postStudyDuration: "2 Years (Bilateral Indo-French Agreement)",
    taxNumberName: "Numéro de Sécurité Sociale (CPAM/Ameli)",
    avgStudentMonthlyNet: "€650 – €950 / month",
    workPermitRules: "Authorized automatically on VLS-TS student visa from Day 1. No separate work permit needed.",
    employmentAgencyName: "France Travail (formerly Pôle Emploi)",
    employmentAgencyRole: "Official national agency offering free career guidance, CV workshops, and verified job postings for students and graduates.",
    topHiringIndustries: ["Tech & AI", "Luxury & Fashion", "Aerospace & Automotive", "Hospitality & Gastronomy", "Finance"]
  },
  uk: {
    id: "uk",
    countryName: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    currencySymbol: "£",
    minHourlyWage: "£11.44 / hr (National Living Wage)",
    termTimeHourLimit: "Up to 20 hrs / week during term-time",
    holidayHourLimit: "Full-time (up to 40 hrs / week) during official vacations",
    postStudyVisaName: "Graduate Route Visa (PSW)",
    postStudyDuration: "2 Years for Bachelor/Master, 3 Years for PhD",
    taxNumberName: "National Insurance (NI) Number",
    avgStudentMonthlyNet: "£750 – £1,100 / month",
    workPermitRules: "Student Visa holders at degree-level institutions can work up to 20 hours/week. Direct transition to 2-year Graduate Route without company sponsorship.",
    employmentAgencyName: "Jobcentre Plus / UK National Careers Service",
    employmentAgencyRole: "Government body assisting international graduates in finding verified skilled roles and apprenticeships.",
    topHiringIndustries: ["FinTech & Banking", "Data Science & IT", "Healthcare & NHS", "Creative Media", "Consulting"]
  },
  usa: {
    id: "usa",
    countryName: "United States",
    flag: "🇺🇸",
    currency: "USD",
    currencySymbol: "$",
    minHourlyWage: "$15.00 – $18.50 / hr (State minimums in CA, NY, MA)",
    termTimeHourLimit: "Up to 20 hrs / week on-campus (CPT for off-campus internships)",
    holidayHourLimit: "Up to 40 hrs / week on-campus during breaks",
    postStudyVisaName: "STEM OPT (Optional Practical Training)",
    postStudyDuration: "Up to 3 Years (12 months regular OPT + 24 months STEM extension)",
    taxNumberName: "Social Security Number (SSN)",
    avgStudentMonthlyNet: "$900 – $1,400 / month",
    workPermitRules: "F-1 student visa allows on-campus employment, CPT for academic internships, and up to 36 months of full-time OPT post-graduation for STEM degrees leading to H-1B lottery.",
    employmentAgencyName: "USCIS & On-Campus Career Placement Centers",
    employmentAgencyRole: "Authorizes CPT/OPT work authorizations with university DSO coordination and corporate hiring pipelines.",
    topHiringIndustries: ["Silicon Valley Tech", "Wall Street Investment Banking", "Biomedical & Healthcare", "Cloud Systems"]
  },
  canada: {
    id: "canada",
    countryName: "Canada",
    flag: "🇨🇦",
    currency: "CAD",
    currencySymbol: "C$",
    minHourlyWage: "C$17.30 / hr (Federal & Ontario minimum)",
    termTimeHourLimit: "Up to 24 hrs / week off-campus (IRCC updated policy)",
    holidayHourLimit: "Full-time (up to 40 hrs / week) during scheduled breaks",
    postStudyVisaName: "Post-Graduation Work Permit (PGWP)",
    postStudyDuration: "Up to 3 Years (open work permit for 2-year Master/Diploma)",
    taxNumberName: "Social Insurance Number (SIN)",
    avgStudentMonthlyNet: "C$1,200 – C$1,700 / month",
    workPermitRules: "Study permit holders with valid off-campus work eligibility work up to 24 hours weekly. 3-year PGWP allows open employment anywhere in Canada leading to Express Entry PR.",
    employmentAgencyName: "Job Bank Canada & Service Canada",
    employmentAgencyRole: "Official federal platform matching international graduates with LMIA-exempt employers and provincial nominee streams.",
    topHiringIndustries: ["Software & Cloud", "Financial Services", "Clean Energy & Mining", "Supply Chain & Logistics"]
  },
  germany: {
    id: "germany",
    countryName: "Germany",
    flag: "🇩🇪",
    currency: "EUR",
    currencySymbol: "€",
    minHourlyWage: "€12.41 / hr (Gesetzlicher Mindestlohn)",
    termTimeHourLimit: "140 full days or 280 half days per calendar year (approx. 20 hrs/wk)",
    holidayHourLimit: "Full-time Werkstudent shifts during semester breaks",
    postStudyVisaName: "18-Month Jobseeker Visa & EU Blue Card",
    postStudyDuration: "18 Months post-study job search + fast-track PR after 21 months",
    taxNumberName: "Steuer-Identifikationsnummer (Tax ID) & Sozialversicherungsnummer",
    avgStudentMonthlyNet: "€700 – €1,050 / month",
    workPermitRules: "Non-EU students can work 140 full days per year. Werkstudent jobs offer reduced social contributions. 18-month stay-back allows open employment leading to EU Blue Card.",
    employmentAgencyName: "Bundesagentur für Arbeit (BA)",
    employmentAgencyRole: "Federal employment agency providing job centers, internship fairs, and Blue Card salary evaluation.",
    topHiringIndustries: ["Automotive & Mechanical", "Industrial IoT & Embedded", "Chemical & Pharma", "Renewable Energy"]
  },
  australia: {
    id: "australia",
    countryName: "Australia",
    flag: "🇦🇺",
    currency: "AUD",
    currencySymbol: "A$",
    minHourlyWage: "A$24.10 / hr (Fair Work Commission minimum)",
    termTimeHourLimit: "Up to 48 hours per fortnight (two weeks) during study terms",
    holidayHourLimit: "Unrestricted hours during university scheduled vacations",
    postStudyVisaName: "Temporary Graduate Visa (Subclass 485)",
    postStudyDuration: "2 to 4 Years (depending on qualification and regional study credit)",
    taxNumberName: "Tax File Number (TFN)",
    avgStudentMonthlyNet: "A$1,600 – A$2,400 / month",
    workPermitRules: "Student Visa (Subclass 500) allows 48 hours/fortnight with Australia's highest national minimum wage. Subclass 485 provides 2–4 years unrestricted post-study work.",
    employmentAgencyName: "Workforce Australia",
    employmentAgencyRole: "Government portal for verified jobs, Fair Work ombudsman wage protection, and graduate programs.",
    topHiringIndustries: ["Mining & Civil Engineering", "Healthcare & Nursing", "IT & Cybersecurity", "Tourism & Hospitality"]
  },
  ireland: {
    id: "ireland",
    countryName: "Ireland",
    flag: "🇮🇪",
    currency: "EUR",
    currencySymbol: "€",
    minHourlyWage: "€12.70 / hr (National Minimum Wage)",
    termTimeHourLimit: "Up to 20 hrs / week during academic terms",
    holidayHourLimit: "Up to 40 hrs / week in June, July, August, September & Dec 15–Jan 15",
    postStudyVisaName: "Third Level Graduate Scheme (Stamp 1G)",
    postStudyDuration: "2 Years for Master's graduates, 1 Year for Bachelor's graduates",
    taxNumberName: "Personal Public Service (PPS) Number",
    avgStudentMonthlyNet: "€800 – €1,200 / month",
    workPermitRules: "Stamp 2 student visa holders can work 20 hrs/week term-time, 40 hrs in summer. Stamp 1G gives 2-year full-time access to European tech & pharma HQs in Dublin.",
    employmentAgencyName: "JobsIreland / Intreo (Department of Social Protection)",
    employmentAgencyRole: "State employment services offering career matching across European tech giants (Google, Meta, Pfizer) located in Dublin Docklands.",
    topHiringIndustries: ["European Tech & SaaS", "Biopharma & Medical Devices", "Aviation Finance", "International Accounting"]
  }
};

export type GlobalJob = {
  id: string;
  country: CountryCode;
  countryName: string;
  countryFlag: string;
  title: string;
  company: string;
  city: string;
  contractType: "Student Part-Time" | "Internship / Co-op" | "Graduate Full-Time" | "Apprenticeship / Werkstudent";
  compensation: string;
  currencySymbol: string;
  legalBasis: string;
  field: "Tech & AI" | "Finance & Banking" | "Engineering & Aerospace" | "Healthcare & Science" | "Luxury & Retail" | "Education & Tutoring" | "Hospitality & Food" | "Consulting & Strategy";
  languageRequired: "English Only" | "English + Basic Local" | "Fluent Local Language";
  description: string;
  responsibilities: string[];
  qualifications: string[];
  visaEligibility: string;
};

export const globalJobsList: GlobalJob[] = [
  // ══════════════════════════════════════════════════
  // 🇫🇷 FRANCE (10 Comprehensive Roles)
  // ══════════════════════════════════════════════════
  {
    id: "fr-mistral-ai",
    country: "france",
    countryName: "France",
    countryFlag: "🇫🇷",
    title: "AI & Machine Learning Research Intern",
    company: "Mistral AI",
    city: "Paris",
    contractType: "Internship / Co-op",
    compensation: "€1,600 / month + 50% Navigo pass + €10/day lunch vouchers",
    currencySymbol: "€",
    legalBasis: "French Convention de Stage; exceeds mandatory gratification €4.35/hr",
    field: "Tech & AI",
    languageRequired: "English Only",
    description: "Work alongside premier European research scientists on foundation open-weight models, parameter-efficient fine-tuning, and LLM evaluation benchmarks.",
    responsibilities: [
      "Implement automated evaluation benchmarks for open-weight language models",
      "Develop dataset curation, tokenization, and filtering pipelines in Python and PyTorch",
      "Collaborate with infrastructure engineers on inference acceleration via TensorRT-LLM"
    ],
    qualifications: [
      "Master's student (M1/M2) in CS, AI, or Mathematics at a French university or Grande École",
      "Solid Python, PyTorch, and transformer architecture knowledge",
      "Valid French student visa (VLS-TS) and university convention"
    ],
    visaEligibility: "Authorized under French student visa with standard university internship agreement."
  },
  {
    id: "fr-bnp-finance",
    country: "france",
    countryName: "France",
    countryFlag: "🇫🇷",
    title: "Junior Financial Analyst — Global Markets",
    company: "BNP Paribas Corporate & Institutional Banking",
    city: "Paris (La Défense)",
    contractType: "Graduate Full-Time",
    compensation: "€48,000 – €54,000 / year + performance bonus + profit sharing",
    currencySymbol: "€",
    legalBasis: "Full CDI permanent contract under French Labor Code",
    field: "Finance & Banking",
    languageRequired: "English Only",
    description: "Analyze structured derivatives, credit risks, and European fixed-income markets in Paris's prime financial district.",
    responsibilities: [
      "Prepare quantitative risk models and daily sensitivity reports for European trading desks",
      "Perform portfolio scenario stress tests under Basel IV and EBA regulatory guidelines",
      "Automate pricing and risk reporting pipelines using Python and SQL"
    ],
    qualifications: [
      "Master's degree in Finance, Financial Engineering, or Economics from a French institution",
      "Solid understanding of derivatives pricing, fixed income, and financial modeling",
      "Eligible for 2-Year APS / RECE Post-Study Work Permit"
    ],
    visaEligibility: "Full transition from VLS-TS student visa to 2-Year APS, then Passeport Talent CDI."
  },
  {
    id: "fr-airbus-aero",
    country: "france",
    countryName: "France",
    countryFlag: "🇫🇷",
    title: "Aerospace Embedded Systems Engineer",
    company: "Airbus Commercial Aircraft",
    city: "Toulouse",
    contractType: "Graduate Full-Time",
    compensation: "€45,000 – €52,000 / year + 10 RTT days + profit sharing",
    currencySymbol: "€",
    legalBasis: "Full CDI permanent contract in European aerospace capital",
    field: "Engineering & Aerospace",
    languageRequired: "English Only",
    description: "Design and validate flight-critical avionics firmware and digital cockpit architectures for next-generation commercial aircraft.",
    responsibilities: [
      "Develop safety-critical embedded C/C++ firmware compliant with DO-178C Level A/B standards",
      "Execute automated Hardware-in-the-Loop (HIL) simulation test suites",
      "Coordinate with system architecture teams on Ethernet/AFDX avionics bus protocols"
    ],
    qualifications: [
      "Master of Science / Diplôme d'Ingénieur in Aerospace, Embedded Systems, or Electronics",
      "Hands-on proficiency with embedded C/C++, RTOS, and MATLAB/Simulink",
      "APS visa holder or graduating student"
    ],
    visaEligibility: "Supported by Airbus for Passeport Talent (Salarié Qualifié) 4-year renewable permit."
  },
  {
    id: "fr-airbus-mech",
    country: "france",
    countryName: "France",
    countryFlag: "🇫🇷",
    title: "Mechanical Design & Thermal Systems Engineer",
    company: "Airbus Commercial / Safran Aircraft Engines",
    city: "Toulouse / Paris-Saclay",
    contractType: "Graduate Full-Time",
    compensation: "€46,000 – €55,000 / year + 11 RTT days + Navigo 50% + bonus",
    currencySymbol: "€",
    legalBasis: "Full CDI permanent contract under French Labor Code",
    field: "Engineering & Aerospace",
    languageRequired: "English Only",
    description: "Design, test, and optimize aircraft fuselage components, thermodynamic heat exchangers, and composite structures using CATIA V5 and ANSYS FEA.",
    responsibilities: [
      "Develop 3D parametric CAD models and assembly kinematic studies in CATIA V5",
      "Perform thermal and structural finite element analysis (FEA) compliant with EASA airworthiness rules",
      "Collaborate with manufacturing plants in Saint-Nazaire and Hamburg on prototype fit checks",
      "Validate weight-saving composite and titanium structural alternatives"
    ],
    qualifications: [
      "Master of Science or Diplôme d'Ingénieur in Mechanical or Aerospace Engineering",
      "Proficiency in CATIA V5/3DEXPERIENCE, ANSYS, and composite material mechanics",
      "Eligible for 2-Year APS / RECE work authorization"
    ],
    visaEligibility: "Full CDI leading to Passeport Talent and French fast-track citizenship after 2 years of Master graduation."
  },
  {
    id: "fr-vinci-civil",
    country: "france",
    countryName: "France",
    countryFlag: "🇫🇷",
    title: "Civil & Infrastructure Project Engineer (Génie Civil)",
    company: "Vinci Construction / Grand Paris Express",
    city: "Paris / Lyon",
    contractType: "Graduate Full-Time",
    compensation: "€44,000 – €52,000 / year + vehicle package + meal stipends",
    currencySymbol: "€",
    legalBasis: "Full CDI permanent contract on European mega-infrastructure projects",
    field: "Engineering & Aerospace",
    languageRequired: "English + Basic Local",
    description: "Supervise civil engineering works, tunnel boring coordination, structural concrete validation, and geotechnical site monitoring on Grand Paris Express metro lines.",
    responsibilities: [
      "Review structural reinforcement calculations and Eurocode 2/3 compliance for underground stations",
      "Supervise daily site contractors, concrete pour quality testing, and safety protocols",
      "Track project schedules using Primavera P6 and coordinate BIM clashes in Revit",
      "Interface with municipal authorities and geotechnical inspection bureaus (Socotec/Bureau Veritas)"
    ],
    qualifications: [
      "Master's degree or Diplôme d'Ingénieur in Civil Engineering (Génie Civil / Ouvrages d'Art)",
      "Knowledge of Eurocodes, Revit BIM, and geotechnical site supervision",
      "English proficiency with conversational French (B1/B2 supported by company)"
    ],
    visaEligibility: "Direct CDI hire with French work permit sponsorship and 2-Year APS transition."
  },
  {
    id: "fr-dior-luxury",
    country: "france",
    countryName: "France",
    countryFlag: "🇫🇷",
    title: "Boutique Ambassador & Client Experience Advisor",
    company: "Christian Dior Couture (LVMH Group)",
    city: "Paris (Avenue Montaigne)",
    contractType: "Student Part-Time",
    compensation: "€13.50 / hour + 50% Navigo + €11.50/day meal vouchers + commissions",
    currencySymbol: "€",
    legalBasis: "French CDI Étudiant (15 to 20 hours per week)",
    field: "Luxury & Retail",
    languageRequired: "English + Basic Local",
    description: "Represent the pinnacle of French Haute Couture in Dior's Avenue Montaigne maison, greeting VIP international clientele and managing client relations.",
    responsibilities: [
      "Deliver tailored private appointments for international clients in English and Hindi/French",
      "Manage clienteling records and post-purchase follow-ups in Salesforce CRM",
      "Ensure pristine visual merchandising aligned with Avenue Montaigne luxury standards"
    ],
    qualifications: [
      "Enrolled student in Paris (Business, Luxury Management, or Fashion)",
      "Polished interpersonal presence and enthusiasm for luxury craft",
      "Numéro de Sécurité Sociale (CPAM/Ameli)"
    ],
    visaEligibility: "Authorized under French student visa (VLS-TS) within 964 hours annual limit."
  },
  {
    id: "fr-barista-marais",
    country: "france",
    countryName: "France",
    countryFlag: "🇫🇷",
    title: "Specialty Coffee Barista & Front of House",
    company: "Le Peloton Café",
    city: "Paris (Le Marais, 4th Arrondissement)",
    contractType: "Student Part-Time",
    compensation: "€12.50 / hour + tips (~€150/mo) + 50% Navigo transit subsidy",
    currencySymbol: "€",
    legalBasis: "French CDI Étudiant (12 to 16 hours/week on weekends and afternoons)",
    field: "Hospitality & Food",
    languageRequired: "English Only",
    description: "Join a vibrant artisan specialty coffee roastery in the historic Marais district. Welcoming international expats, students, and tourists with specialty espresso craft.",
    responsibilities: [
      "Dial in espresso grinders, brew V60 pour-overs, and steam silky microfoam for specialty beverages",
      "Maintain welcoming front-of-house hospitality in English and French",
      "Manage point-of-sale transactions and daily inventory restocks"
    ],
    qualifications: [
      "Passionate about coffee culture; prior barista or customer service experience a plus",
      "Enrolled student at a Paris university with valid VLS-TS student visa",
      "Reliable, punctual, and friendly team player"
    ],
    visaEligibility: "100% legal student employment under French 964-hour annual entitlement."
  },
  {
    id: "fr-english-tutor",
    country: "france",
    countryName: "France",
    countryFlag: "🇫🇷",
    title: "English Language Academic Mentor & Nanny",
    company: "Kinougarde / Acadomia Paris",
    city: "Paris & Île-de-France Suburbs",
    contractType: "Student Part-Time",
    compensation: "€14.00 – €18.00 / hour net (~€600–€800/month for 10–12 hrs/week)",
    currencySymbol: "€",
    legalBasis: "Direct French CDI Étudiant with complete social security coverage",
    field: "Education & Tutoring",
    languageRequired: "English Only",
    description: "Teach English immersion and provide homework support to French school students after school. One of the most popular and flexible student jobs in France.",
    responsibilities: [
      "Conduct engaging English conversational activities, reading games, and vocabulary practice",
      "Help school-age students with homework and evening routines",
      "Communicate weekly progress updates with parents"
    ],
    qualifications: [
      "Native or fluent English speaker (C1/C2 level)",
      "Enrolled in a French university (Bachelor's or Master's)",
      "Patient, enthusiastic, and dependable with children"
    ],
    visaEligibility: "Authorized on student visa. Flexible schedule built around your university timetable."
  },
  {
    id: "fr-loreal-alternance",
    country: "france",
    countryName: "France",
    countryFlag: "🇫🇷",
    title: "Alternance (Work-Study) — Assistant Brand Manager",
    company: "L'Oréal Global Headquarters",
    city: "Paris (Clichy)",
    contractType: "Apprenticeship / Werkstudent",
    compensation: "€1,450 – €1,750 / month + 100% tuition covered by OPCO + 50% Navigo",
    currencySymbol: "€",
    legalBasis: "French Contrat d'Apprentissage / Professionnalisation (1–2 Years)",
    field: "Luxury & Retail",
    languageRequired: "English + Basic Local",
    description: "Spend 3 days at L'Oréal and 2 days at your university. Your company covers 100% of your tuition fees while paying you a monthly salary!",
    responsibilities: [
      "Support global product launches and digital marketing campaign execution across EMEA",
      "Analyze consumer market research data, sales sell-through, and digital media metrics",
      "Coordinate packaging mockups and creative briefs with international advertising agencies"
    ],
    qualifications: [
      "Master's student (M1/M2) in Marketing, Business, or Communications",
      "Eligible for French Contrat d'Apprentissage (Indo-French bilateral treaty)",
      "Strong analytical and creative mindset"
    ],
    visaEligibility: "Authorized under French student visa with university CFA partnership."
  },
  {
    id: "fr-hotel-accor",
    country: "france",
    countryName: "France",
    countryFlag: "🇫🇷",
    title: "Front Desk & International Guest Host",
    company: "Pullman Paris Tour Eiffel (Accor Group)",
    city: "Paris (15th Arrondissement)",
    contractType: "Student Part-Time",
    compensation: "€12.80 / hour + evening shift bonus + 50% Navigo + cafeteria meals",
    currencySymbol: "€",
    legalBasis: "French CDI Étudiant (16 to 20 hours/week)",
    field: "Hospitality & Food",
    languageRequired: "English Only",
    description: "Welcome global travelers right beside the iconic Eiffel Tower. Ideal for international students seeking hospitality experience and strong customer relations skills.",
    responsibilities: [
      "Check in and welcome international guests with high standards of French hospitality",
      "Manage reservations, keycard coding, and room assignment in Opera PMS",
      "Provide concierge recommendations for Paris restaurants, museums, and transport"
    ],
    qualifications: [
      "Enrolled student in Paris with friendly, professional demeanor",
      "Fluent English; basic conversational French is a plus but not strictly required",
      "Ability to work weekend mornings or evening shifts"
    ],
    visaEligibility: "100% authorized on French student visa (VLS-TS)."
  },
  {
    id: "fr-sanofi-pharma",
    country: "france",
    countryName: "France",
    countryFlag: "🇫🇷",
    title: "Biopharmaceutical Regulatory Affairs Associate",
    company: "Sanofi Pasteur",
    city: "Lyon (Gerland Biopole)",
    contractType: "Graduate Full-Time",
    compensation: "€44,000 – €50,000 / year + profit sharing + private health mutuelle",
    currencySymbol: "€",
    legalBasis: "Full CDI permanent contract under French Chemical & Pharma Collective Agreement",
    field: "Healthcare & Science",
    languageRequired: "English Only",
    description: "Coordinate European regulatory submissions and clinical compliance dossiers for innovative vaccine candidates in Lyon's biotech hub.",
    responsibilities: [
      "Prepare Common Technical Document (eCTD) modules for EMA and FDA regulatory reviews",
      "Monitor post-marketing pharmacovigilance reports and regulatory change notices",
      "Collaborate with international clinical trial teams on protocol amendments"
    ],
    qualifications: [
      "Master's degree or PharmD in Pharmaceutical Sciences, Biotechnology, or Regulatory Law",
      "Knowledge of ICH, EMA, and GMP compliance regulations",
      "Eligible for 2-Year APS / RECE graduate visa"
    ],
    visaEligibility: "Direct transition from student visa to 2-year APS work permit."
  },
  {
    id: "fr-capgemini-consulting",
    country: "france",
    countryName: "France",
    countryFlag: "🇫🇷",
    title: "Technology Consulting Analyst — Cloud & Enterprise",
    company: "Capgemini Invent",
    city: "Paris (Issy-les-Moulineaux)",
    contractType: "Graduate Full-Time",
    compensation: "€46,000 – €52,000 / year + annual performance bonus + 11 RTT days",
    currencySymbol: "€",
    legalBasis: "Full CDI Cadre contract under SYNTEC collective bargaining agreement",
    field: "Consulting & Strategy",
    languageRequired: "English Only",
    description: "Advise CAC 40 multinational corporations on digital transformation, AI enablement, and cloud migration strategies.",
    responsibilities: [
      "Map client enterprise workflows, target operating models, and digital transformation roadmaps",
      "Conduct stakeholder interviews and build executive presentations for C-suite clients",
      "Manage agile sprint deliveries and change management programs"
    ],
    qualifications: [
      "Master's degree from a French Business School (HEC, ESSEC, ESCP, EDHEC) or Engineering School",
      "Strong analytical, slide presentation, and problem-solving skills",
      "APS visa holder or graduating student"
    ],
    visaEligibility: "Capgemini sponsors Passeport Talent CDI residence permits."
  },

  // ══════════════════════════════════════════════════
  // 🇬🇧 UNITED KINGDOM (10 Comprehensive Roles)
  // ══════════════════════════════════════════════════
  {
    id: "uk-deepmind-swe",
    country: "uk",
    countryName: "United Kingdom",
    countryFlag: "🇬🇧",
    title: "Software Engineer — Research Infrastructure",
    company: "Google DeepMind",
    city: "London (King's Cross)",
    contractType: "Graduate Full-Time",
    compensation: "£75,000 – £90,000 / year + £25k RSUs + free gourmet meals",
    currencySymbol: "£",
    legalBasis: "UK 2-Year Graduate Route Visa (PSW)",
    field: "Tech & AI",
    languageRequired: "English Only",
    description: "Design distributed training clusters, high-throughput data loaders, and model evaluation systems alongside the world's leading AI scientists.",
    responsibilities: [
      "Optimize distributed training pipelines in Python, JAX, and C++ across TPU/GPU pods",
      "Build resilient telemetry and cluster scheduling tools in Kubernetes and Go",
      "Partner with research scientists to scale frontier neural models"
    ],
    qualifications: [
      "Master's or PhD in Computer Science, Mathematics, or Physics from a UK university",
      "Exceptional systems programming, concurrency, and algorithms fundamentals",
      "Eligible for 2-Year UK Graduate Route Visa"
    ],
    visaEligibility: "Immediate full-time eligibility on Graduate Route; direct Skilled Worker sponsorship thereafter."
  },
  {
    id: "uk-monzo-fintech",
    country: "uk",
    countryName: "United Kingdom",
    countryFlag: "🇬🇧",
    title: "Junior Risk & Fraud Analytics Associate",
    company: "Monzo Bank",
    city: "London",
    contractType: "Graduate Full-Time",
    compensation: "£42,000 – £48,000 / year + equity options + hybrid work",
    currencySymbol: "£",
    legalBasis: "UK 2-Year Graduate Route Visa (PSW)",
    field: "Finance & Banking",
    languageRequired: "English Only",
    description: "Combat real-time payment fraud, card fraud, and AML evasion for 9+ million UK digital banking customers using real-time machine learning pipelines.",
    responsibilities: [
      "Query payment transaction graphs in SQL and Snowflake to spot anomalous behavior",
      "Calibrate fraud heuristic rules and monitor false positive ratios",
      "Work with compliance officers to file Suspicious Activity Reports (SARs)"
    ],
    qualifications: [
      "Graduating from a UK university in Finance, Mathematics, Economics, or Data Science",
      "High proficiency in SQL, Python, and data storytelling"
    ],
    visaEligibility: "Immediate full-time eligibility on UK 2-Year Graduate Route Visa with no sponsorship required."
  },
  {
    id: "uk-barclays-banking",
    country: "uk",
    countryName: "United Kingdom",
    countryFlag: "🇬🇧",
    title: "Graduate Analyst — Corporate & Investment Banking",
    company: "Barclays Capital",
    city: "London (Canary Wharf)",
    contractType: "Graduate Full-Time",
    compensation: "£55,000 – £65,000 / year + £15k–£30k discretionary bonus",
    currencySymbol: "£",
    legalBasis: "UK 2-Year Graduate Route Visa",
    field: "Finance & Banking",
    languageRequired: "English Only",
    description: "Conduct financial modeling, credit risk assessments, and debt underwriting for FTSE 100 corporate clients in London's Canary Wharf financial hub.",
    responsibilities: [
      "Build dynamic 3-statement financial models, DCF valuations, and credit sensitivity models",
      "Draft comprehensive credit committee memos and industry pitch books",
      "Analyze client balance sheets and covenant compliance under IFRS"
    ],
    qualifications: [
      "Degree in Finance, Accounting, Economics, or Engineering from a UK university (min 2:1)",
      "Strong Excel modeling, corporate valuation, and analytical skills",
      "Eligible for 2-Year UK Graduate Route Visa"
    ],
    visaEligibility: "Barclays provides licensed Skilled Worker sponsorship upon completion of Graduate Route."
  },
  {
    id: "uk-costa-barista",
    country: "uk",
    countryName: "United Kingdom",
    countryFlag: "🇬🇧",
    title: "Weekend Barista & Shift Leader",
    company: "Costa Coffee",
    city: "Central London / Manchester",
    contractType: "Student Part-Time",
    compensation: "£11.50 – £12.50 / hour (~£950/month for 18 hrs/week)",
    currencySymbol: "£",
    legalBasis: "UK Student Visa condition: up to 20 hours per week during term-time",
    field: "Hospitality & Food",
    languageRequired: "English Only",
    description: "Work with the UK's favorite coffee brand. Flexible shifts designed around university lecture timetables with statutory paid holiday accrual.",
    responsibilities: [
      "Handcraft espresso beverages, seasonal drinks, and warm food orders to brand standards",
      "Operate touch-screen tills and manage cash/card reconciliations",
      "Maintain strict food hygiene, allergen compliance, and cleanliness"
    ],
    qualifications: [
      "Current international student in the UK on valid Student Visa (Tier 4)",
      "Enthusiastic customer service approach and clear communication",
      "National Insurance (NI) Number or proof of application"
    ],
    visaEligibility: "100% legal student employment within 20-hour weekly term-time limit."
  },
  {
    id: "uk-mytutor-tutor",
    country: "uk",
    countryName: "United Kingdom",
    countryFlag: "🇬🇧",
    title: "Private GCSE / A-Level Mathematics & Science Tutor",
    company: "MyTutor & Oxford Private Tutors",
    city: "London / Oxford / Remote UK",
    contractType: "Student Part-Time",
    compensation: "£18.00 – £28.00 / hour (~£800–£1,100/month for 10–12 hrs/week)",
    currencySymbol: "£",
    legalBasis: "Authorized student work on Tier 4 / Student Visa",
    field: "Education & Tutoring",
    languageRequired: "English Only",
    description: "Provide online and in-person 1-on-1 tutoring for British secondary school students preparing for GCSEs and A-Levels in STEM subjects.",
    responsibilities: [
      "Deliver tailored interactive lesson plans in Maths, Physics, Chemistry, or Computing",
      "Help students master exam techniques, past paper walkthroughs, and conceptual clarity",
      "Provide constructive feedback to parents after every tutorial"
    ],
    qualifications: [
      "Enrolled undergraduate or postgraduate student at a UK university",
      "Top academic record in Mathematics or Sciences (A* at A-Level or high university GPA)",
      "Clear DBS check (processed upon onboarding)"
    ],
    visaEligibility: "Fully authorized under UK student visa terms."
  },
  {
    id: "uk-astrazeneca-pharma",
    country: "uk",
    countryName: "United Kingdom",
    countryFlag: "🇬🇧",
    title: "Graduate Clinical Data Associate",
    company: "AstraZeneca R&D",
    city: "Cambridge Biomedical Campus",
    contractType: "Graduate Full-Time",
    compensation: "£38,000 – £44,000 / year + comprehensive health + pension",
    currencySymbol: "£",
    legalBasis: "2-Year UK Graduate Route Visa",
    field: "Healthcare & Science",
    languageRequired: "English Only",
    description: "Support global clinical trials data management, adverse event reporting, and biostatistical pipelines for breakthrough oncology therapeutics.",
    responsibilities: [
      "Cleanse, validate, and reconcile electronic clinical trial data in Medidata Rave",
      "Execute automated SAS / R scripts to verify patient demographic and lab data integrity",
      "Ensure compliance with Good Clinical Practice (GCP) and MHRA regulations"
    ],
    qualifications: [
      "Degree in Life Sciences, Biotechnology, Statistics, or Pharmacy from a UK institution",
      "Familiarity with clinical trials lifecycle and data management tools",
      "Eligible for 2-Year Graduate Route Visa"
    ],
    visaEligibility: "Qualifies for Health and Care Worker / Skilled Worker fast-track transition."
  },
  {
    id: "uk-harrods-retail",
    country: "uk",
    countryName: "United Kingdom",
    countryFlag: "🇬🇧",
    title: "Luxury Sales Specialist — Horology & High Jewellery",
    company: "Harrods Knightsbridge",
    city: "London (Knightsbridge)",
    contractType: "Student Part-Time",
    compensation: "£13.50 / hour + individual sales commission + staff store discount",
    currencySymbol: "£",
    legalBasis: "UK Student Visa: 20 hours/week term-time, 40 hours/week in holidays",
    field: "Luxury & Retail",
    languageRequired: "English Only",
    description: "Represent prestigious luxury houses inside the world's most famous department store, assisting high-net-worth international clientele.",
    responsibilities: [
      "Deliver bespoke VIP luxury client appointments in Harrods' fine watch department",
      "Build long-term relationships with international clients and maintain CRM records",
      "Adhere to strict security protocols for precious gems and timepieces"
    ],
    qualifications: [
      "Enrolled student in London with immaculate personal grooming and poise",
      "Exceptional English communication skills; additional language is a strong advantage",
      "Valid Student Visa and National Insurance number"
    ],
    visaEligibility: "Authorized within statutory UK student weekly hour limits."
  },
  {
    id: "uk-deloitte-audit",
    country: "uk",
    countryName: "United Kingdom",
    countryFlag: "🇬🇧",
    title: "Audit & Assurance Graduate Associate",
    company: "Deloitte UK",
    city: "London / Birmingham",
    contractType: "Graduate Full-Time",
    compensation: "£36,000 – £42,000 / year + ACA qualification funding (£15k value)",
    currencySymbol: "£",
    legalBasis: "2-Year UK Graduate Route Visa (direct ACA training contract)",
    field: "Finance & Banking",
    languageRequired: "English Only",
    description: "Perform statutory financial audits for major UK corporations while Deloitte pays for your complete ICAEW Chartered Accountant (ACA) qualification.",
    responsibilities: [
      "Test internal financial controls, inventory counts, and revenue recognition balances",
      "Examine client accounts against UK GAAP and IFRS accounting standards",
      "Collaborate with senior audit managers on formal audit opinion memorandums"
    ],
    qualifications: [
      "Bachelor's or Master's degree in any discipline from a UK university (2:1 or higher)",
      "Strong numerical aptitude and commercial awareness",
      "Graduate Route Visa eligibility"
    ],
    visaEligibility: "Deloitte is an A-rated UK Skilled Worker licensed sponsor."
  },
  {
    id: "uk-amazon-logistics",
    country: "uk",
    countryName: "United Kingdom",
    countryFlag: "🇬🇧",
    title: "Student Fulfillment & Logistics Associate",
    company: "Amazon UK",
    city: "Dartford / Milton Keynes / London",
    contractType: "Student Part-Time",
    compensation: "£12.30 – £13.80 / hour + overtime premiums up to £18/hr",
    currencySymbol: "£",
    legalBasis: "Student Visa 20 hrs/week term-time, up to 40 hrs during breaks",
    field: "Hospitality & Food",
    languageRequired: "English Only",
    description: "Join modern robotics fulfillment centers. Popular student job offering guaranteed flexible evening and weekend shifts with prompt weekly pay.",
    responsibilities: [
      "Pick, pack, and verify customer orders using handheld radio-frequency scanners",
      "Manage automated pallet staging and robotic inventory stow operations",
      "Adhere to warehouse health, safety, and ergonomics procedures"
    ],
    qualifications: [
      "Enrolled international student with right to work on UK student visa",
      "Physical stamina for standing and walking during shift",
      "National Insurance number"
    ],
    visaEligibility: "Strictly compliant with 20 hours weekly term-time cap."
  },
  {
    id: "uk-jlr-automotive",
    country: "uk",
    countryName: "United Kingdom",
    countryFlag: "🇬🇧",
    title: "Graduate Powertrain Simulation Engineer",
    company: "Jaguar Land Rover (JLR)",
    city: "Coventry / Gaydon",
    contractType: "Graduate Full-Time",
    compensation: "£38,000 – £43,000 / year + flexible benefits + car lease discount",
    currencySymbol: "£",
    legalBasis: "UK 2-Year Graduate Route Visa",
    field: "Engineering & Aerospace",
    languageRequired: "English Only",
    description: "Develop thermal management, battery pack modeling, and electric drive simulation for luxury electric vehicles (Range Rover Electric).",
    responsibilities: [
      "Build 1D and 3D CFD models for high-voltage battery thermal dissipation in GT-Suite",
      "Analyze dyno test cell data to validate electric motor efficiency maps",
      "Partner with chassis engineering to optimize vehicle range and aerodynamic drag"
    ],
    qualifications: [
      "Master's degree in Mechanical, Automotive, or Aerospace Engineering from a UK university",
      "Proficiency in MATLAB/Simulink, Python, and thermodynamics principles",
      "Eligible for UK Graduate Route"
    ],
    visaEligibility: "Direct Graduate Route eligibility leading to Skilled Worker sponsorship."
  },

  // ══════════════════════════════════════════════════
  // 🇺🇸 UNITED STATES (Comprehensive Career Dossiers)
  // ══════════════════════════════════════════════════
  {
    id: "us-boeing-mech",
    country: "usa",
    countryName: "United States",
    countryFlag: "🇺🇸",
    title: "Mechanical Design & Systems Engineer",
    company: "Boeing Commercial Airplanes / Robotics",
    city: "Seattle, WA / Austin, TX",
    contractType: "Graduate Full-Time",
    compensation: "$96,000 – $118,000 base + $15k signing bonus + 401(k) 6% match",
    currencySymbol: "$",
    legalBasis: "3-Year STEM OPT (CIP 14.1901 Mechanical Engineering)",
    field: "Engineering & Aerospace",
    languageRequired: "English Only",
    description: "Design, test, simulate, and improve mechanical products, systems, and aerospace structures using 3D CAD modeling, FEA stress analysis, and thermodynamic validation.",
    responsibilities: [
      "Design complex mechanical assemblies, kinematic linkages, and structural enclosures using SolidWorks and CATIA V5",
      "Perform Finite Element Analysis (FEA) and dynamic stress simulations in ANSYS to prevent fatigue failures under extreme loads",
      "Generate GD&T engineering drawings, tolerance stack-ups, and DFMA documentation for precision manufacturing partners",
      "Collaborate cross-functionally with electrical, propulsion, and quality assurance teams across project lifecycles"
    ],
    qualifications: [
      "Bachelor's or Master's in Mechanical, Mechatronics, or Aerospace Engineering from an accredited US institution",
      "Mastery of CAD software (SolidWorks, Siemens NX, or CATIA) and FEA analysis tools (ANSYS/Abaqus)",
      "Eligible for 36-Month STEM OPT work authorization"
    ],
    visaEligibility: "Full 3-year STEM OPT work authorization with E-Verify corporate H-1B sponsorship and PERM green card pathway."
  },
  {
    id: "us-aecom-civil",
    country: "usa",
    countryName: "United States",
    countryFlag: "🇺🇸",
    title: "Civil & Infrastructure Project Engineer",
    company: "AECOM Infrastructure & Environment",
    city: "New York, NY / Chicago, IL / Los Angeles, CA",
    contractType: "Graduate Full-Time",
    compensation: "$86,000 – $105,000 base + PE licensure stipend + comprehensive health",
    currencySymbol: "$",
    legalBasis: "3-Year STEM OPT (CIP 14.0801 Civil Engineering)",
    field: "Engineering & Aerospace",
    languageRequired: "English Only",
    description: "Plan, model, and deliver critical municipal infrastructure, transportation corridors, structural foundations, and sustainable urban civil developments.",
    responsibilities: [
      "Develop structural analysis models and civil site grading plans using AutoCAD Civil 3D, Revit BIM, and SAP2000",
      "Ensure structural compliance with AASHTO, ASCE 7, and IBC municipal building codes for concrete and steel structures",
      "Perform stormwater runoff calculations, environmental impact assessments, and geotechnical reviews",
      "Coordinate on-site contractor inspections and compile detailed technical reporting dossiers"
    ],
    qualifications: [
      "Bachelor's or Master's degree in Civil, Structural, or Environmental Engineering from an accredited US university",
      "FE (Fundamentals of Engineering) / EIT certification completed or actively scheduled",
      "Proficiency with AutoCAD Civil 3D, MicroStation, or Revit Structural"
    ],
    visaEligibility: "Full 36-Month STEM OPT work authorization with corporate immigration legal team supporting H-1B lottery filings."
  },
  {
    id: "us-lockheed-mech-intern",
    country: "usa",
    countryName: "United States",
    countryFlag: "🇺🇸",
    title: "Mechanical Engineering CAD & Thermal Intern",
    company: "Lockheed Martin Space Systems",
    city: "Dallas, TX / Denver, CO",
    contractType: "Internship / Co-op",
    compensation: "$38.00 – $45.00 / hour (~$6,800/month) + housing allowance",
    currencySymbol: "$",
    legalBasis: "Curricular Practical Training (CPT) for summer / academic co-op term",
    field: "Engineering & Aerospace",
    languageRequired: "English Only",
    description: "Support senior propulsion engineers in thermal dissipation modeling, 3D CAD modeling, and mechanical vibration lab testing.",
    responsibilities: [
      "Model precision mechanical fixtures and test rigs in Siemens NX and SolidWorks",
      "Assist with modal shake-table tests and collect thermal thermocouple telemetry",
      "Update Bill of Materials (BOM) and engineering design change orders (ECO)"
    ],
    qualifications: [
      "Enrolled in BS or MS in Mechanical or Aerospace Engineering with valid F-1 status",
      "Academic coursework in Thermodynamics, Machine Design, and Strength of Materials",
      "Eligible for university CPT authorization"
    ],
    visaEligibility: "Authorized through your university's Designated School Official (DSO) on Form I-20 via CPT."
  },
  {
    id: "us-wsp-civil-intern",
    country: "usa",
    countryName: "United States",
    countryFlag: "🇺🇸",
    title: "Civil Infrastructure & Transit Engineering Intern",
    company: "WSP USA",
    city: "San Francisco, CA / Seattle, WA",
    contractType: "Internship / Co-op",
    compensation: "$34.00 – $40.00 / hour (~$6,000/month) + transit pass",
    currencySymbol: "$",
    legalBasis: "Curricular Practical Training (CPT) authorized for international students",
    field: "Engineering & Aerospace",
    languageRequired: "English Only",
    description: "Participate in urban mass-transit rail expansions, structural foundation inspections, and stormwater drainage modeling.",
    responsibilities: [
      "Assist in preparing civil construction documents and grading plans in AutoCAD Civil 3D",
      "Compile geotechnical borehole logs and soil classification reports",
      "Conduct field quantity takeoffs and attend project coordination meetings with city agencies"
    ],
    qualifications: [
      "Enrolled student in Civil Engineering with solid foundation in structural mechanics",
      "Basic exposure to CAD, GIS, or Revit",
      "Valid F-1 student status with CPT eligibility"
    ],
    visaEligibility: "100% compliant F-1 CPT work authorization."
  },
  {
    id: "us-mit-ra",
    country: "usa",
    countryName: "United States",
    countryFlag: "🇺🇸",
    title: "Graduate Research Assistant — Distributed AI Systems",
    company: "MIT CSAIL (Computer Science & Artificial Intelligence Lab)",
    city: "Cambridge / Boston, MA",
    contractType: "Student Part-Time",
    compensation: "$28.00 / hour ($2,240/month for 20 hrs/week) + full tuition waiver",
    currencySymbol: "$",
    legalBasis: "On-campus F-1 student employment up to 20 hours/week during term",
    field: "Tech & AI",
    languageRequired: "English Only",
    description: "Assist MIT principal investigators in benchmarking distributed transformer inference across GPU clusters with custom quantization kernels.",
    responsibilities: [
      "Benchmark memory bottlenecks in large model tensor parallelism",
      "Implement custom CUDA and Triton kernels for sparse attention mechanisms",
      "Co-author academic research papers for submission to NeurIPS, ICML, and ICLR"
    ],
    qualifications: [
      "Enrolled Master's or PhD student in CS/EECS at an accredited US university",
      "Deep understanding of GPU architecture, PyTorch internals, and CUDA",
      "Valid F-1 student visa status"
    ],
    visaEligibility: "100% legal on-campus F-1 student employment with FICA tax exemption."
  },
  {
    id: "us-meta-swe",
    country: "usa",
    countryName: "United States",
    countryFlag: "🇺🇸",
    title: "Software Engineer — Core Cloud Infrastructure",
    company: "Meta",
    city: "Menlo Park, CA / New York, NY",
    contractType: "Graduate Full-Time",
    compensation: "$135,000 – $155,000 base + $45k RSUs/yr + $15k signing bonus",
    currencySymbol: "$",
    legalBasis: "3-Year STEM OPT (12 months regular OPT + 24 months STEM extension)",
    field: "Tech & AI",
    languageRequired: "English Only",
    description: "Build massive-scale storage engines, distributed caching systems, and AI inference backends serving 3+ billion daily active users.",
    responsibilities: [
      "Design high-throughput, low-latency distributed microservices in C++20 and Python",
      "Optimize memory allocation and zero-copy networking in custom Linux kernels",
      "Participate in high-severity incident reviews and automated self-healing systems"
    ],
    qualifications: [
      "Master's or Bachelor's in CS, CE, or Software Engineering from a US university",
      "Mastery of algorithms, distributed consensus (Raft/Paxos), and systems programming",
      "Eligible for 36-Month STEM OPT"
    ],
    visaEligibility: "E-Verify employer; 3 consecutive H-1B lottery filings + corporate Green Card support."
  },
  {
    id: "us-goldman-quant",
    country: "usa",
    countryName: "United States",
    countryFlag: "🇺🇸",
    title: "Quantitative Strategist Analyst",
    company: "Goldman Sachs",
    city: "New York, NY (200 West Street)",
    contractType: "Graduate Full-Time",
    compensation: "$125,000 – $145,000 base + $40k–$80k performance bonus",
    currencySymbol: "$",
    legalBasis: "3-Year STEM OPT (Financial Engineering / Math STEM codes)",
    field: "Finance & Banking",
    languageRequired: "English Only",
    description: "Develop pricing algorithms, statistical arbitrage models, and high-frequency risk calculation engines for Wall Street market-making desks.",
    responsibilities: [
      "Formulate stochastic calculus models for exotic options and interest rate swaptions",
      "Backtest algorithmic trading signals across terabytes of tick-level order book data",
      "Build high-performance C++ pricing libraries integrated into Goldman's SecDB system"
    ],
    qualifications: [
      "Master's degree in Financial Engineering, Quantitative Finance, Mathematics, or Physics",
      "Deep expertise in stochastic differential equations, C++, and Python",
      "Eligible for STEM OPT extension"
    ],
    visaEligibility: "Qualifies under STEM CIP code for 3 years OPT; H-1B sponsorship provided."
  },
  {
    id: "us-nyu-peer-tutor",
    country: "usa",
    countryName: "United States",
    countryFlag: "🇺🇸",
    title: "University Learning Commons Peer Tutor",
    company: "New York University Academic Support",
    city: "New York, NY (Washington Square)",
    contractType: "Student Part-Time",
    compensation: "$18.50 – $21.00 / hour (~$1,200/month for 15 hrs/week)",
    currencySymbol: "$",
    legalBasis: "On-campus F-1 student work authorization (up to 20 hours/week)",
    field: "Education & Tutoring",
    languageRequired: "English Only",
    description: "Tutor undergraduate students in Calculus, Linear Algebra, Computer Science, and Academic Writing in the university library commons.",
    responsibilities: [
      "Conduct 1-on-1 tutoring sessions and walk-in peer problem-solving clinics",
      "Facilitate weekly exam review study groups for midterm and final exams",
      "Create study guides and cheat sheets for fundamental math and coding concepts"
    ],
    qualifications: [
      "Current international student in good academic standing (GPA 3.5+)",
      "Received an A or A- in the subjects being tutored",
      "Patient, encouraging, and clear communicator"
    ],
    visaEligibility: "100% legal on-campus F-1 student employment. No off-campus permit required."
  },
  {
    id: "us-starbucks-barista",
    country: "usa",
    countryName: "United States",
    countryFlag: "🇺🇸",
    title: "On-Campus Student Barista & Cafe Attendant",
    company: "Starbucks Dining Services (Campus Union)",
    city: "Boston, MA / Seattle, WA",
    contractType: "Student Part-Time",
    compensation: "$16.50 – $18.50 / hour + free shift drinks + food discount",
    currencySymbol: "$",
    legalBasis: "On-campus student employment authorization (F-1 visa compliant)",
    field: "Hospitality & Food",
    languageRequired: "English Only",
    description: "Work directly inside the university student center serving fellow students and faculty. Scheduled around class hours with FICA tax exemption.",
    responsibilities: [
      "Prepare espresso beverages, blended frappuccinos, and food orders to Starbucks standard",
      "Operate cash register and campus meal plan card scanners",
      "Maintain sanitized service counters and restock syrups, milks, and beans"
    ],
    qualifications: [
      "Enrolled university student with valid F-1 status and Form I-20",
      "Punctual, friendly, and energetic team player",
      "Social Security Number (SSN) support provided by university upon hiring"
    ],
    visaEligibility: "Authorized on-campus employment for up to 20 hours/week during semesters."
  },
  {
    id: "us-pfizer-scientist",
    country: "usa",
    countryName: "United States",
    countryFlag: "🇺🇸",
    title: "Associate Scientist — Oncology & Cellular Biology",
    company: "Pfizer Global R&D",
    city: "Cambridge, MA (Kendall Square)",
    contractType: "Graduate Full-Time",
    compensation: "$88,000 – $98,000 base + 8% target bonus + 401(k) 6% match",
    currencySymbol: "$",
    legalBasis: "3-Year STEM OPT Work Authorization",
    field: "Healthcare & Science",
    languageRequired: "English Only",
    description: "Conduct in vitro cell assays, target validation, and flow cytometry experiments for novel immuno-oncology antibody drug conjugates.",
    responsibilities: [
      "Culture primary mammalian tumor cell lines and perform high-throughput cytotoxicity screens",
      "Analyze biomarker expression using multi-color flow cytometry and ELISA assays",
      "Document experimental protocols in compliant electronic laboratory notebooks (ELN)"
    ],
    qualifications: [
      "Master's in Biotechnology, Immunology, Biomedical Sciences, or Molecular Biology",
      "Hands-on expertise with aseptic cell culture, PCR, and fluorescence microscopy",
      "STEM OPT eligible"
    ],
    visaEligibility: "Full 3-year STEM OPT eligibility with E-Verify employer."
  },
  {
    id: "us-apple-retail",
    country: "usa",
    countryName: "United States",
    countryFlag: "🇺🇸",
    title: "Apple Specialist / Customer Experience Advisor",
    company: "Apple Inc.",
    city: "New York, NY (Fifth Avenue)",
    contractType: "Student Part-Time",
    compensation: "$22.00 – $25.00 / hour + annual product discounts + stock purchase plan",
    currencySymbol: "$",
    legalBasis: "Curricular Practical Training (CPT) or authorized campus-affiliated retail",
    field: "Luxury & Retail",
    languageRequired: "English Only",
    description: "Showcase Apple's hardware and ecosystem (Mac, iPhone, iPad, Vision Pro) to global visitors in Apple's iconic 24/7 glass cube flagship.",
    responsibilities: [
      "Introduce customers to Apple hardware, software ecosystems, and creative workflows",
      "Guide buyers through trade-in valuations, carrier financing, and AppleCare+ setups",
      "Deliver passionate group product demos and Today at Apple workshop assistance"
    ],
    qualifications: [
      "Enrolled student with authorized work eligibility (CPT or campus-adjacent)",
      "Deep passion for Apple technology and human-centric customer service",
      "Ability to work weekends and evening shifts"
    ],
    visaEligibility: "Authorized with appropriate DSO CPT authorization or work permit."
  },
  {
    id: "us-mckinsey-associate",
    country: "usa",
    countryName: "United States",
    countryFlag: "🇺🇸",
    title: "Business Analyst — Digital Strategy & Analytics",
    company: "McKinsey & Company",
    city: "Chicago, IL / New York, NY",
    contractType: "Graduate Full-Time",
    compensation: "$110,000 – $125,000 base + $25k performance bonus + full relocation",
    currencySymbol: "$",
    legalBasis: "OPT / STEM OPT (Business Analytics STEM code)",
    field: "Consulting & Strategy",
    languageRequired: "English Only",
    description: "Advise Fortune 500 corporate executives on growth strategy, generative AI adoption, organizational restructuring, and supply chain resilience.",
    responsibilities: [
      "Structure complex business problems into rigorous hypotheses and analytical frameworks",
      "Build detailed financial models, market size estimations, and ROI projections",
      "Conduct executive interview loops and facilitate C-suite strategy workshops"
    ],
    qualifications: [
      "Bachelor's or Master's degree from top US university (STEM-designated MBA or Analytics)",
      "Outstanding analytical, structured problem-solving, and communication skills",
      "Eligible for OPT work authorization"
    ],
    visaEligibility: "McKinsey provides premier immigration legal support and H-1B sponsorship."
  },
  {
    id: "us-tesla-autopilot",
    country: "usa",
    countryName: "United States",
    countryFlag: "🇺🇸",
    title: "Autopilot & Computer Vision Validation Intern",
    company: "Tesla",
    city: "Palo Alto / Fremont, CA",
    contractType: "Internship / Co-op",
    compensation: "$42.00 – $50.00 / hour (~$7,000/month) + housing stipend",
    currencySymbol: "$",
    legalBasis: "Full-Time Curricular Practical Training (CPT) during summer / co-op term",
    field: "Engineering & Aerospace",
    languageRequired: "English Only",
    description: "Benchmark neural network perception outputs on millions of fleet video clips to improve Full Self-Driving (FSD) lane boundary and object detection.",
    responsibilities: [
      "Develop automated Python regression test suites for vision-only occupancy networks",
      "Mine edge-case scenario clips from Tesla's multi-petabyte fleet video repository",
      "Verify camera calibration and latency metrics across HW3 and HW4 vehicle platforms"
    ],
    qualifications: [
      "Enrolled Master's or PhD student in Robotics, Computer Vision, or CS at a US university",
      "Strong Python, OpenCV, and PyTorch skills; Linux familiarity",
      "Form I-20 endorsed for CPT"
    ],
    visaEligibility: "Authorized through your university's DSO via Curricular Practical Training (CPT)."
  },
  {
    id: "us-marriott-hospitality",
    country: "usa",
    countryName: "United States",
    countryFlag: "🇺🇸",
    title: "Front Desk & Guest Experience Associate",
    company: "Marriott Marquis",
    city: "San Francisco, CA / New York, NY",
    contractType: "Student Part-Time",
    compensation: "$19.00 – $23.00 / hour + night shift differential + travel hotel discounts",
    currencySymbol: "$",
    legalBasis: "CPT / On-Campus hotel placement under F-1 visa regulations",
    field: "Hospitality & Food",
    languageRequired: "English Only",
    description: "Manage guest check-ins, VIP room allocation, and concierge inquiries at a premier luxury convention hotel property.",
    responsibilities: [
      "Check in and welcome business conference attendees and international leisure guests",
      "Process folio payments, credit authorizations, and room upgrades in Marriott PMS",
      "Coordinate with housekeeping and engineering to resolve guest requests promptly"
    ],
    qualifications: [
      "Enrolled student (Hospitality Management, Business, or Communications)",
      "Polished interpersonal skills and calm composure under pressure",
      "Authorized F-1 student work eligibility"
    ],
    visaEligibility: "Compliant with F-1 CPT or authorized campus-affiliated hotel work."
  },

  // ══════════════════════════════════════════════════
  // 🇨🇦 CANADA (10 Comprehensive Roles)
  // ══════════════════════════════════════════════════
  {
    id: "ca-shopify-swe",
    country: "canada",
    countryName: "Canada",
    countryFlag: "🇨🇦",
    title: "Junior Backend Developer — Core Commerce",
    company: "Shopify",
    city: "Toronto, ON / Remote Canada",
    contractType: "Graduate Full-Time",
    compensation: "C$88,000 – C$105,000 / year + C$20k equity grants + home office fund",
    currencySymbol: "C$",
    legalBasis: "3-Year Post-Graduation Work Permit (PGWP)",
    field: "Tech & AI",
    languageRequired: "English Only",
    description: "Build ultra-reliable checkout APIs and merchant data pipelines handling Black Friday / Cyber Monday transaction spikes across 2+ million online stores.",
    responsibilities: [
      "Develop scalable Ruby on Rails and Go microservices backed by MySQL and Redis",
      "Optimize database queries, indexing, and caching to ensure sub-100ms API response times",
      "Participate in weekly deploy trains and production canary health monitoring"
    ],
    qualifications: [
      "Bachelor's or Master's in CS, Software Engineering, or related technical degree",
      "Strong coding skills in Ruby, Go, Python, or TypeScript and relational database design",
      "Eligible for 3-Year PGWP"
    ],
    visaEligibility: "Open work permit under PGWP; Canadian Experience Class (CEC) PR eligible after 1 year."
  },
  {
    id: "ca-rbc-financial",
    country: "canada",
    countryName: "Canada",
    countryFlag: "🇨🇦",
    title: "Commercial Banking & Credit Risk Analyst",
    company: "RBC (Royal Bank of Canada)",
    city: "Toronto, ON (Bay Street Financial District)",
    contractType: "Graduate Full-Time",
    compensation: "C$72,000 – C$85,000 / year + performance bonus + retirement plan",
    currencySymbol: "C$",
    legalBasis: "3-Year Post-Graduation Work Permit (PGWP)",
    field: "Finance & Banking",
    languageRequired: "English Only",
    description: "Underwrite commercial loans, evaluate corporate balance sheets, and model credit risks for mid-market Canadian enterprises at Canada's largest bank.",
    responsibilities: [
      "Analyze historical financial statements, debt service coverage ratios, and cash flows",
      "Draft credit risk assessment papers and recommend loan structures to credit adjudicators",
      "Monitor ongoing covenant compliance and commercial client portfolio risk ratings"
    ],
    qualifications: [
      "Degree in Finance, Accounting, Economics, or Business from an eligible Canadian DLI",
      "Solid knowledge of corporate credit analysis, IFRS, and Excel modeling",
      "PGWP work authorization"
    ],
    visaEligibility: "Qualifies as TEER 1 skilled Canadian work experience for Express Entry PR."
  },
  {
    id: "ca-timhortons-barista",
    country: "canada",
    countryName: "Canada",
    countryFlag: "🇨🇦",
    title: "Student Team Member & Coffee Specialist",
    company: "Tim Hortons",
    city: "Vancouver, BC / Toronto, ON",
    contractType: "Student Part-Time",
    compensation: "C$17.40 – C$18.50 / hour (~C$1,700/month for 24 hrs/week)",
    currencySymbol: "C$",
    legalBasis: "Updated IRCC off-campus work policy: up to 24 hours per week during study term",
    field: "Hospitality & Food",
    languageRequired: "English Only",
    description: "Work at Canada's iconic coffee and baked goods chain. Benefit from Canada's newly expanded 24-hour off-campus student work entitlement.",
    responsibilities: [
      "Brew fresh coffee, prepare breakfast sandwiches, and handcraft signature iced beverages",
      "Operate drive-thru and front-counter point-of-sale registers promptly and accurately",
      "Maintain cleanliness and adhere to Canadian food safety inspection guidelines"
    ],
    qualifications: [
      "Valid Canadian Study Permit with off-campus work authorization condition",
      "Social Insurance Number (SIN) issued by Service Canada",
      "Friendly attitude, high energy, and reliable punctuality"
    ],
    visaEligibility: "100% legal under updated 24-hour weekly off-campus study permit rules."
  },
  {
    id: "ca-uoft-tutor",
    country: "canada",
    countryName: "Canada",
    countryFlag: "🇨🇦",
    title: "STEM Academic Peer Mentor",
    company: "University of Toronto Academic Success Centre",
    city: "Toronto, ON (St. George Campus)",
    contractType: "Student Part-Time",
    compensation: "C$21.50 – C$25.00 / hour (~C$1,200/month for 12–14 hrs/week)",
    currencySymbol: "C$",
    legalBasis: "On-campus student employment under Canadian Study Permit",
    field: "Education & Tutoring",
    languageRequired: "English Only",
    description: "Mentor first- and second-year undergraduate engineering and science students with calculus, programming labs, and effective study habits.",
    responsibilities: [
      "Lead weekly small-group tutorial drop-in sessions in mathematics and Python",
      "Help students deconstruct difficult textbook problem sets and laboratory write-ups",
      "Organize study workshops on exam preparation and time management"
    ],
    qualifications: [
      "Currently enrolled undergraduate or graduate student at University of Toronto",
      "Strong academic standing with an A- or higher in relevant STEM courses",
      "Patient, approachable, and encouraging communication style"
    ],
    visaEligibility: "Authorized on-campus student employment without weekly hour restrictions."
  },
  {
    id: "ca-snclavalin-civil",
    country: "canada",
    countryName: "Canada",
    countryFlag: "🇨🇦",
    title: "Junior Civil Infrastructure Designer",
    company: "SNC-Lavalin (AtkinsRéalis)",
    city: "Montreal, QC / Toronto, ON",
    contractType: "Graduate Full-Time",
    compensation: "C$70,000 – C$82,000 / year + complete health & dental + pension",
    currencySymbol: "C$",
    legalBasis: "3-Year Post-Graduation Work Permit (PGWP)",
    field: "Engineering & Aerospace",
    languageRequired: "English Only",
    description: "Design highway alignments, transit corridors, and municipal stormwater networks for major Canadian public infrastructure projects.",
    responsibilities: [
      "Prepare civil geometric design models and grading layouts using AutoCAD Civil 3D",
      "Perform hydraulic stormwater runoff calculations and culvert sizing",
      "Coordinate drawing packages with structural and geotechnical multidisciplinary teams"
    ],
    qualifications: [
      "Degree in Civil Engineering from a Canadian university (eligible for EIT registration)",
      "Proficiency in AutoCAD Civil 3D, MicroStation, or GIS applications",
      "PGWP eligible"
    ],
    visaEligibility: "Directly qualifies for Express Entry CEC / Provincial Nominee Program (PNP)."
  },
  {
    id: "ca-lululemon-retail",
    country: "canada",
    countryName: "Canada",
    countryFlag: "🇨🇦",
    title: "Retail Educator & Community Specialist",
    company: "Lululemon Athletica",
    city: "Vancouver, BC (Kitsilano Flagship)",
    contractType: "Student Part-Time",
    compensation: "C$19.50 – C$22.00 / hour + generous fitness & clothing discount allowance",
    currencySymbol: "C$",
    legalBasis: "Canadian Study Permit (up to 24 hrs/wk off-campus)",
    field: "Luxury & Retail",
    languageRequired: "English Only",
    description: "Educate guests on technical athletic apparel, running gear, and mindfulness culture in Lululemon's home birthplace of Vancouver.",
    responsibilities: [
      "Engage guests on apparel fabric technologies (Luon, Nulu) and technical fit",
      "Process retail transactions and coordinate complimentary in-store pant hemming",
      "Support local community run clubs, yoga events, and ambassador partnerships"
    ],
    qualifications: [
      "Enrolled student in Greater Vancouver area with active study permit",
      "Passionate about wellness, movement, and community connection",
      "Social Insurance Number (SIN)"
    ],
    visaEligibility: "Fully authorized within 24 hours weekly Canadian study permit policy."
  },
  {
    id: "ca-cohere-ai",
    country: "canada",
    countryName: "Canada",
    countryFlag: "🇨🇦",
    title: "Machine Learning NLP Research Intern",
    company: "Cohere",
    city: "Toronto, ON (Downtown AI District)",
    contractType: "Internship / Co-op",
    compensation: "C$7,500 – C$9,000 / month + wellness benefits",
    currencySymbol: "C$",
    legalBasis: "Co-op Work Permit issued alongside Study Permit",
    field: "Tech & AI",
    languageRequired: "English Only",
    description: "Work with pioneer NLP researchers on enterprise foundation models, retrieval-augmented generation (RAG), and embedding model distillation.",
    responsibilities: [
      "Train and evaluate multilingual text embedding models on massive web corpora",
      "Benchmark reranking algorithms and vector retrieval pipelines for enterprise search",
      "Write clean, modular PyTorch training code with distributed data parallelism"
    ],
    qualifications: [
      "Master's or PhD student in CS or AI at a Canadian university (U of T, McGill, Waterloo)",
      "Strong track record in deep learning, transformer architectures, and PyTorch",
      "Valid Canadian Co-op Work Permit"
    ],
    visaEligibility: "Authorized under official university Co-op Work Permit."
  },
  {
    id: "ca-kpmg-audit",
    country: "canada",
    countryName: "Canada",
    countryFlag: "🇨🇦",
    title: "Audit & Assurance Associate",
    company: "KPMG Canada",
    city: "Toronto, ON / Calgary, AB",
    contractType: "Graduate Full-Time",
    compensation: "C$62,000 – C$72,000 / year + CPA exam fees & study leave support",
    currencySymbol: "C$",
    legalBasis: "3-Year Post-Graduation Work Permit (PGWP)",
    field: "Finance & Banking",
    languageRequired: "English Only",
    description: "Execute external audit engagements across diverse corporate sectors while fulfilling your CPA practical experience requirements (PERT).",
    responsibilities: [
      "Perform substantive audit procedures on cash, revenue, accounts receivable, and debt",
      "Evaluate client internal control systems and identify financial reporting risks",
      "Communicate with client financial controllers to gather supporting audit evidence"
    ],
    qualifications: [
      "Degree in Accounting or Business from a Canadian institution (eligible for CPA PEP)",
      "Strong ethical judgment, attention to detail, and team orientation",
      "PGWP eligibility upon graduation"
    ],
    visaEligibility: "Qualifies under NOC TEER 1 for Express Entry Canadian Experience Class."
  },
  {
    id: "ca-purolator-logistics",
    country: "canada",
    countryName: "Canada",
    countryFlag: "🇨🇦",
    title: "Package Sort & Distribution Associate",
    company: "Purolator Canada",
    city: "Mississauga, ON / Montreal, QC",
    contractType: "Student Part-Time",
    compensation: "C$18.50 – C$21.00 / hour + night shift premiums",
    currencySymbol: "C$",
    legalBasis: "Canadian Study Permit: up to 24 hours per week off-campus",
    field: "Hospitality & Food",
    languageRequired: "English Only",
    description: "Work with Canada's premier freight and package courier. Predictable evening schedules, high hourly pay, and reliable income throughout the semester.",
    responsibilities: [
      "Unload freight trailers and sort parcel containers onto automated conveyor lines",
      "Scan postal tracking barcodes and verify destination sorting hubs",
      "Follow workplace safety and Canadian occupational health (OHS) standards"
    ],
    qualifications: [
      "Current international student in Canada with valid Study Permit and SIN",
      "Ability to lift up to 35 lbs and work on dynamic warehouse floor",
      "Reliable and team-focused attitude"
    ],
    visaEligibility: "Fully authorized within 24-hour weekly legal off-campus work limit."
  },
  {
    id: "ca-bombardier-aero",
    country: "canada",
    countryName: "Canada",
    countryFlag: "🇨🇦",
    title: "Aerospace Manufacturing Engineering Specialist",
    company: "Bombardier Aviation",
    city: "Dorval / Montreal, QC",
    contractType: "Graduate Full-Time",
    compensation: "C$72,000 – C$85,000 / year + pension plan + comprehensive benefits",
    currencySymbol: "C$",
    legalBasis: "3-Year Post-Graduation Work Permit (PGWP)",
    field: "Engineering & Aerospace",
    languageRequired: "English Only",
    description: "Optimize assembly line tooling, composite airframe manufacturing, and quality inspection for luxury business jets (Global 7500 / Challenger).",
    responsibilities: [
      "Develop lean manufacturing work instructions and standard operating procedures for assembly",
      "Investigate production non-conformances and implement root-cause corrective actions",
      "Coordinate with engineering design teams on Design for Manufacturing (DFM) reviews"
    ],
    qualifications: [
      "Degree in Mechanical, Aerospace, or Industrial Engineering from a Canadian university",
      "Experience with CATIA V5, lean six sigma tools, and aerospace quality standards",
      "Eligible for 3-Year PGWP"
    ],
    visaEligibility: "Skilled Canadian work experience directly accelerating Express Entry PR."
  },

  // ══════════════════════════════════════════════════
  // 🇩🇪 GERMANY (10 Comprehensive Roles)
  // ══════════════════════════════════════════════════
  {
    id: "de-sap-swe",
    country: "germany",
    countryName: "Germany",
    countryFlag: "🇩🇪",
    title: "Junior Cloud Software Engineer",
    company: "SAP SE",
    city: "Walldorf / Berlin",
    contractType: "Graduate Full-Time",
    compensation: "€58,000 – €68,000 / year + employee share purchase + gym subsidy",
    currencySymbol: "€",
    legalBasis: "18-Month German Jobseeker Permit -> EU Blue Card",
    field: "Tech & AI",
    languageRequired: "English Only",
    description: "Develop enterprise cloud microservices on SAP Business Technology Platform (BTP) used by 99 of the world's 100 largest companies.",
    responsibilities: [
      "Implement enterprise microservices in Java / Spring Boot and Go on Kubernetes",
      "Design resilient REST and OData APIs with high security and tenant isolation",
      "Participate in automated CI/CD pipeline deployments to multi-cloud environments (AWS/Azure)"
    ],
    qualifications: [
      "Bachelor's or Master's degree in Computer Science, Software Engineering, or IT",
      "Solid knowledge of modern Java, Spring Boot, Docker, and relational databases",
      "Eligible for 18-month German post-study jobseeker permit or EU Blue Card"
    ],
    visaEligibility: "Qualifies for German EU Blue Card with reduced salary threshold for IT specialists."
  },
  {
    id: "de-bmw-werkstudent",
    country: "germany",
    countryName: "Germany",
    countryFlag: "🇩🇪",
    title: "Werkstudent (Working Student) — Autonomous Driving & ROS2",
    company: "BMW Group Autonomous Driving Campus",
    city: "Munich / Unterschleißheim",
    contractType: "Apprenticeship / Werkstudent",
    compensation: "€16.50 – €19.00 / hour (~€1,400/month for 18 hrs/week)",
    currencySymbol: "€",
    legalBasis: "Werkstudent contract: exempt from health & unemployment insurance deductions",
    field: "Engineering & Aerospace",
    languageRequired: "English Only",
    description: "Develop perception algorithms, sensor fusion testing pipelines, and simulated validation scenarios for upcoming Neue Klasse autonomous platforms.",
    responsibilities: [
      "Build ROS2 node wrappers for camera, LiDAR, and radar sensor synchronization",
      "Process high-definition point clouds in C++20 and Python for lane boundary detection",
      "Run automated regression suites on cloud GPU clusters for sensor fusion models"
    ],
    qualifications: [
      "Enrolled Master's student in Robotics, CS, or Automotive Engineering at a German university",
      "Solid C++ or Python skills and Linux/ROS familiarity",
      "Valid German student residence permit (16b AufenthG)"
    ],
    visaEligibility: "100% compliant with German student work authorization (140 full days / 280 half days)."
  },
  {
    id: "de-siemens-robotics",
    country: "germany",
    countryName: "Germany",
    countryFlag: "🇩🇪",
    title: "Industrial Robotics & Automation Engineer",
    company: "Siemens Digital Industries",
    city: "Erlangen / Nuremberg",
    contractType: "Graduate Full-Time",
    compensation: "€54,000 – €64,000 / year + 30 paid vacation days + IG Metall tariff",
    currencySymbol: "€",
    legalBasis: "18-Month Jobseeker Permit / EU Blue Card",
    field: "Engineering & Aerospace",
    languageRequired: "English Only",
    description: "Program PLC automation architectures, industrial digital twins, and collaborative robotic cells for smart manufacturing factories worldwide.",
    responsibilities: [
      "Develop PLC control logic in TIA Portal and Structured Text (IEC 61131-3)",
      "Build virtual commissioning simulation models in Siemens Process Simulate",
      "Integrate industrial PROFINET, OPC UA, and edge computing interfaces"
    ],
    qualifications: [
      "Master's in Mechatronics, Electrical Engineering, Automation, or Robotics",
      "Experience with industrial PLCs, industrial communication, and robotics kinematics",
      "German degree graduate"
    ],
    visaEligibility: "Directly qualifies for German EU Blue Card with fast-track PR in 21 months."
  },
  {
    id: "de-thebarn-barista",
    country: "germany",
    countryName: "Germany",
    countryFlag: "🇩🇪",
    title: "Specialty Barista & Cafe Host",
    company: "The Barn Coffee Roasters",
    city: "Berlin (Mitte / Kreuzberg)",
    contractType: "Student Part-Time",
    compensation: "€13.50 – €14.50 / hour + tips (~€200/mo) + Deutschlandticket subsidy",
    currencySymbol: "€",
    legalBasis: "German Werkstudent / Minijob / Part-Time Student Employment",
    field: "Hospitality & Food",
    languageRequired: "English Only",
    description: "Work at one of Europe's premier specialty coffee institutions in Berlin. Cosmopolitan international team with flexible shifts tailored to study schedules.",
    responsibilities: [
      "Dial in single-origin espresso and filter roasts on Synesso and Mahlkönig grinders",
      "Provide passionate coffee advice to international customers in English and basic German",
      "Ensure pristine workstation hygiene and daily inventory restocking"
    ],
    qualifications: [
      "Enrolled student at a Berlin university with valid student residence permit",
      "Passionate about specialty coffee; prior cafe or customer service experience preferred",
      "Steuer-ID and German bank account"
    ],
    visaEligibility: "Fully authorized within 140 full days / 280 half days annual quota."
  },
  {
    id: "de-studienkreis-tutor",
    country: "germany",
    countryName: "Germany",
    countryFlag: "🇩🇪",
    title: "English & Mathematics Student Tutor",
    company: "Studienkreis & Schülerhilfe",
    city: "Munich / Frankfurt am Main",
    contractType: "Student Part-Time",
    compensation: "€15.00 – €19.00 / hour (~€650–€900/month for 10–12 hrs/week)",
    currencySymbol: "€",
    legalBasis: "Authorized student part-time contract with statutory tax exemption",
    field: "Education & Tutoring",
    languageRequired: "English + Basic Local",
    description: "Tutor German gymnasium and secondary school students in English language and school mathematics after school hours.",
    responsibilities: [
      "Conduct structured tutoring sessions for small groups (3–5 students) or 1-on-1",
      "Explain complex algebraic and calculus concepts using clear step-by-step methods",
      "Assess student test progress and prepare them for Abitur / school exams"
    ],
    qualifications: [
      "Enrolled student in Germany with strong mathematics or native/fluent English",
      "Basic conversational German (A2/B1) for communicating with younger students",
      "Patient, encouraging, and reliable demeanor"
    ],
    visaEligibility: "Authorized under German student visa regulations."
  },
  {
    id: "de-basf-chemical",
    country: "germany",
    countryName: "Germany",
    countryFlag: "🇩🇪",
    title: "Process Engineering Trainee — Green Hydrogen",
    company: "BASF SE",
    city: "Ludwigshafen am Rhein",
    contractType: "Graduate Full-Time",
    compensation: "€52,000 – €62,000 / year + 30 days holiday + corporate canteen",
    currencySymbol: "€",
    legalBasis: "EU Blue Card / Skilled Worker Permit",
    field: "Engineering & Aerospace",
    languageRequired: "English Only",
    description: "Model industrial chemical synthesis pipelines, water electrolysis reactors, and net-zero carbon capture systems at the world's largest chemical complex.",
    responsibilities: [
      "Develop steady-state and dynamic process simulations in Aspen Plus and HYSYS",
      "Calculate mass and energy balances for commercial green hydrogen synthesis units",
      "Evaluate chemical safety parameters and participate in HAZOP risk assessments"
    ],
    qualifications: [
      "Master's degree in Chemical Engineering, Process Technology, or Renewable Energy",
      "Strong background in thermodynamics, process simulation, and fluid mechanics",
      "Eligible for EU Blue Card"
    ],
    visaEligibility: "BASF provides immediate immigration sponsorship for the EU Blue Card."
  },
  {
    id: "de-zalando-retail",
    country: "germany",
    countryName: "Germany",
    countryFlag: "🇩🇪",
    title: "Fashion Merchandising & Category Specialist",
    company: "Zalando SE",
    city: "Berlin",
    contractType: "Graduate Full-Time",
    compensation: "€48,000 – €56,000 / year + 40% brand discounts + hybrid work",
    currencySymbol: "€",
    legalBasis: "18-Month Jobseeker Permit / EU Blue Card",
    field: "Luxury & Retail",
    languageRequired: "English Only",
    description: "Manage international fashion brand partnerships, digital merchandising campaigns, and category stock allocations across 25 European countries.",
    responsibilities: [
      "Analyze consumer purchasing trends, return rates, and stock sell-through across European markets",
      "Collaborate with international fashion houses on digital brand showcases and product lines",
      "Optimize assortment planning and pricing elasticity models using SQL and Python"
    ],
    qualifications: [
      "Master's or Bachelor's in Business, Fashion Management, Economics, or Analytics",
      "Strong commercial acumen, data analytics capability, and communication skills",
      "Eligible for post-study work authorization"
    ],
    visaEligibility: "Zalando supports international graduates with EU Blue Card sponsorship."
  },
  {
    id: "de-db-bank",
    country: "germany",
    countryName: "Germany",
    countryFlag: "🇩🇪",
    title: "Corporate Bank Graduate Analyst",
    company: "Deutsche Bank",
    city: "Frankfurt am Main (Banking District)",
    contractType: "Graduate Full-Time",
    compensation: "€60,000 – €70,000 / year + annual performance bonus + job ticket",
    currencySymbol: "€",
    legalBasis: "18-Month Jobseeker Permit / EU Blue Card",
    field: "Finance & Banking",
    languageRequired: "English Only",
    description: "Structure cross-border trade finance, cash management, and commercial lending solutions for multinational corporate clients across continental Europe.",
    responsibilities: [
      "Prepare credit proposals, liquidity forecasts, and foreign exchange hedging strategies",
      "Analyze counterparty risks and sanction compliance under BaFin and ECB regulations",
      "Liaise with European corporate treasury teams on automated payment routing"
    ],
    qualifications: [
      "Master's degree in Finance, Economics, or Business Administration from a German university",
      "Strong financial statement analysis, commercial banking, and presentation skills",
      "Eligible for German post-study work permit"
    ],
    visaEligibility: "Direct Blue Card qualification; fast-track settlement permit after 21 months."
  },
  {
    id: "de-dhl-logistics",
    country: "germany",
    countryName: "Germany",
    countryFlag: "🇩🇪",
    title: "Werkstudent — Supply Chain Network Analytics",
    company: "DHL Group Global Headquarters",
    city: "Bonn / Leipzig Hub",
    contractType: "Apprenticeship / Werkstudent",
    compensation: "€15.50 – €17.50 / hour (~€1,300/month for 18 hrs/week)",
    currencySymbol: "€",
    legalBasis: "Werkstudent contract: statutory exemption from healthcare/unemployment taxes",
    field: "Hospitality & Food",
    languageRequired: "English Only",
    description: "Analyze air freight hub routing efficiency, package sorting telemetry, and carbon reduction initiatives for the world's leading logistics enterprise.",
    responsibilities: [
      "Build automated KPI dashboards in Power BI and SQL for European air express hubs",
      "Model cargo container load factors and identify transport route bottlenecks",
      "Support continuous improvement projects applying Lean Six Sigma methods"
    ],
    qualifications: [
      "Enrolled student in Supply Chain, Industrial Engineering, Business, or Data Analytics",
      "Proficient with SQL, Excel, and data visualization tools",
      "Valid German student residence permit"
    ],
    visaEligibility: "Authorized within student 140 full days / 280 half days legal allotment."
  },
  {
    id: "de-bosch-iot",
    country: "germany",
    countryName: "Germany",
    countryFlag: "🇩🇪",
    title: "Embedded IoT Firmware Engineer",
    company: "Robert Bosch GmbH",
    city: "Stuttgart / Renningen Research Campus",
    contractType: "Graduate Full-Time",
    compensation: "€55,000 – €65,000 / year + 35-hour work week (IG Metall)",
    currencySymbol: "€",
    legalBasis: "EU Blue Card (STEM Shortage Profession)",
    field: "Engineering & Aerospace",
    languageRequired: "English Only",
    description: "Develop low-power Bluetooth and Wi-Fi sensor firmware for connected smart industrial tools and automotive telemetry modules.",
    responsibilities: [
      "Write bare-metal and FreeRTOS embedded C/C++ firmware for ARM Cortex-M microcontrollers",
      "Implement secure over-the-air (OTA) firmware update protocols and crypto authentication",
      "Analyze hardware bus signals using oscilloscopes, logic analyzers, and CANoe"
    ],
    qualifications: [
      "Master's degree in Electrical Engineering, Computer Engineering, or Embedded Systems",
      "Solid C/C++ proficiency, microcontroller architecture knowledge, and hardware debugging",
      "Eligible for EU Blue Card"
    ],
    visaEligibility: "Eligible for German EU Blue Card under STEM shortage salary concession."
  },

  // ══════════════════════════════════════════════════
  // 🇦🇺 AUSTRALIA (10 Comprehensive Roles)
  // ══════════════════════════════════════════════════
  {
    id: "au-atlassian-swe",
    country: "australia",
    countryName: "Australia",
    countryFlag: "🇦🇺",
    title: "Graduate Cloud Software Developer",
    company: "Atlassian",
    city: "Sydney, NSW",
    contractType: "Graduate Full-Time",
    compensation: "A$88,000 – A$98,000 / year + 11.5% superannuation + RSUs",
    currencySymbol: "A$",
    legalBasis: "Temporary Graduate Visa (Subclass 485) open work permit",
    field: "Tech & AI",
    languageRequired: "English Only",
    description: "Build collaboration platforms (Jira, Confluence) used by over 300,000 organizations worldwide with modern micro-frontend stacks.",
    responsibilities: [
      "Develop user-facing features in React, TypeScript, and GraphQL",
      "Build resilient backend microservices in Java / Kotlin on AWS",
      "Conduct code reviews and champion accessible UX standards"
    ],
    qualifications: [
      "Bachelor's or Master's in IT, Software Engineering, or Computer Science from Australian university (Go8)",
      "Strong JavaScript/TypeScript and cloud fundamentals"
    ],
    visaEligibility: "Eligible for Subclass 485 post-study work visa (2 to 4 years duration) leading to PR pathways."
  },
  {
    id: "au-bhp-mining",
    country: "australia",
    countryName: "Australia",
    countryFlag: "🇦🇺",
    title: "Graduate Mining & Geotechnical Data Analyst",
    company: "BHP Minerals Australia",
    city: "Brisbane, QLD / Perth, WA",
    contractType: "Graduate Full-Time",
    compensation: "A$95,000 – A$115,000 / year + 11.5% super + FIFO travel allowances",
    currencySymbol: "A$",
    legalBasis: "Temporary Graduate Visa (Subclass 485)",
    field: "Engineering & Aerospace",
    languageRequired: "English Only",
    description: "Join the world's leading resources company deploying autonomous haulage systems, predictive ground monitoring, and decarbonization pipelines.",
    responsibilities: [
      "Analyze telemetry sensor streams from autonomous haul trucks and drills in Python",
      "Evaluate geotechnical radar data to predict open-cut slope stability",
      "Partner with site metallurgical engineers to optimize ore recovery rates"
    ],
    qualifications: [
      "Degree in Mining, Civil, Geological, or Data Engineering from an Australian university",
      "Willingness to travel on Fly-In Fly-Out (FIFO) rosters"
    ],
    visaEligibility: "Directly eligible for Subclass 485 Post-Study Work Visa; high PR point allocation."
  },
  {
    id: "au-macquarie-bank",
    country: "australia",
    countryName: "Australia",
    countryFlag: "🇦🇺",
    title: "Graduate Quantitative Risk Analyst",
    company: "Macquarie Group",
    city: "Sydney, NSW (Martin Place)",
    contractType: "Graduate Full-Time",
    compensation: "A$85,000 – A$105,000 / year + 11.5% super + annual performance profit share",
    currencySymbol: "A$",
    legalBasis: "Temporary Graduate Visa (Subclass 485)",
    field: "Finance & Banking",
    languageRequired: "English Only",
    description: "Analyze market risk exposures, commodity derivatives pricing, and green energy infrastructure financing at Australia's leading global investment bank.",
    responsibilities: [
      "Perform Value at Risk (VaR) calculations and stress testing for energy trading books",
      "Backtest quantitative algorithmic models in Python and R",
      "Prepare capital adequacy compliance reports under APRA Prudential Standards"
    ],
    qualifications: [
      "Degree in Quantitative Finance, Mathematics, Actuarial Studies, or Economics from Australian university",
      "Advanced proficiency in Python, SQL, and financial mathematics",
      "Eligible for Subclass 485 visa"
    ],
    visaEligibility: "Unrestricted open work rights for 2–4 years under Subclass 485 leading to Subclass 186/189 PR."
  },
  {
    id: "au-woolworths-retail",
    country: "australia",
    countryName: "Australia",
    countryFlag: "🇦🇺",
    title: "Student Retail & Customer Assistant",
    company: "Woolworths Supermarkets",
    city: "Melbourne, VIC / Sydney, NSW",
    contractType: "Student Part-Time",
    compensation: "A$25.50 – A$28.00 / hour (~A$1,800/month for 18 hrs/week)",
    currencySymbol: "A$",
    legalBasis: "Subclass 500 visa condition: 48 hours per fortnight during term-time",
    field: "Luxury & Retail",
    languageRequired: "English Only",
    description: "Work with Australia's leading supermarket chain. Enjoy the highest national student minimum wage in the world with weekend penalty rates.",
    responsibilities: [
      "Assist shoppers at self-checkout and customer service desks",
      "Restock product aisles and maintain clean presentation",
      "Process deliveries and perform stocktake counts"
    ],
    qualifications: [
      "Current international student in Melbourne with Subclass 500 visa",
      "Friendly demeanour and prompt communication",
      "Tax File Number (TFN) or application receipt"
    ],
    visaEligibility: "Fully authorized within Australian 48-hour fortnightly limit."
  },
  {
    id: "au-singleo-barista",
    country: "australia",
    countryName: "Australia",
    countryFlag: "🇦🇺",
    title: "Weekend Specialty Barista",
    company: "Single O Surry Hills",
    city: "Sydney, NSW (Surry Hills)",
    contractType: "Student Part-Time",
    compensation: "A$26.00 – A$30.00 / hour (penalty rates on Sunday up to A$36/hr)",
    currencySymbol: "A$",
    legalBasis: "Subclass 500 student visa (up to 48 hrs per fortnight)",
    field: "Hospitality & Food",
    languageRequired: "English Only",
    description: "Immerse yourself in Sydney's world-famous specialty coffee culture. High hourly award rates, vibrant neighborhood, and friendly coffee connoisseur team.",
    responsibilities: [
      "Extract espresso on custom La Marzocco machinery and brew batch brew filter coffee",
      "Steam milk rapidly and pour consistent latte art in a fast-paced weekend cafe environment",
      "Provide cheerful, engaging customer service to regulars and tourists"
    ],
    qualifications: [
      "Prior barista experience and genuine passion for Australian specialty coffee",
      "Enrolled international student with valid Australian visa and TFN",
      "Available Saturday and Sunday shifts"
    ],
    visaEligibility: "Authorized within 48-hour fortnightly Australian study visa framework."
  },
  {
    id: "au-unsw-tutor",
    country: "australia",
    countryName: "Australia",
    countryFlag: "🇦🇺",
    title: "Peer Academic Mentor & Campus Ambassador",
    company: "UNSW Sydney Student Success",
    city: "Sydney, NSW (Kensington Campus)",
    contractType: "Student Part-Time",
    compensation: "A$32.00 – A$38.00 / hour (~A$1,100/month for 8–10 hrs/week)",
    currencySymbol: "A$",
    legalBasis: "On-campus student employment under Subclass 500",
    field: "Education & Tutoring",
    languageRequired: "English Only",
    description: "Support incoming international first-year students with academic writing, laboratory expectations, university transition, and study group facilitation.",
    responsibilities: [
      "Facilitate weekly Peer Assisted Learning (PASS) sessions for engineering and business subjects",
      "Conduct campus orientation tours and international student welcome webinars",
      "Provide guidance on library research databases, referencing styles, and time management"
    ],
    qualifications: [
      "Currently enrolled undergraduate or postgraduate student at an Australian university (WAM 75+)",
      "High emotional intelligence, empathy, and active listening skills",
      "Valid Tax File Number"
    ],
    visaEligibility: "Authorized student work within term-time limits."
  },
  {
    id: "au-ramsay-health",
    country: "australia",
    countryName: "Australia",
    countryFlag: "🇦🇺",
    title: "Graduate Clinical Support Officer",
    company: "Ramsay Health Care",
    city: "Sydney, NSW (North Shore Private Hospital)",
    contractType: "Graduate Full-Time",
    compensation: "A$78,000 – A$88,000 / year + 11.5% super + shift penalties",
    currencySymbol: "A$",
    legalBasis: "Temporary Graduate Visa (Subclass 485)",
    field: "Healthcare & Science",
    languageRequired: "English Only",
    description: "Coordinate patient clinical admissions, diagnostic scheduling, and hospital ward administration across surgical departments.",
    responsibilities: [
      "Coordinate patient pre-admission health documentation and surgeon operating lists",
      "Liaise with health insurance funds for procedural approval authorizations",
      "Ensure patient medical records strictly comply with Australian Privacy Principles"
    ],
    qualifications: [
      "Degree in Health Science, Nursing, Public Health, or Biomedical Sciences from an Australian institution",
      "Strong attention to detail and compassionate patient communication",
      "Subclass 485 visa holder"
    ],
    visaEligibility: "Occupation on Australia's Priority Migration Skilled Occupation List (PMSOL)."
  },
  {
    id: "au-canva-designer",
    country: "australia",
    countryName: "Australia",
    countryFlag: "🇦🇺",
    title: "Associate Product Designer",
    company: "Canva",
    city: "Surry Hills, Sydney, NSW",
    contractType: "Graduate Full-Time",
    compensation: "A$85,000 – A$100,000 / year + equity options + catered lunches",
    currencySymbol: "A$",
    legalBasis: "Subclass 485 Post-Study Work Visa",
    field: "Tech & AI",
    languageRequired: "English Only",
    description: "Design intuitive visual collaboration interfaces, AI photo editing workflows, and design templates for 170+ million global monthly active creators.",
    responsibilities: [
      "Create high-fidelity wireframes, interaction prototypes, and user flows in Figma",
      "Partner with product managers and engineers through agile design sprints",
      "Conduct user research testing sessions and synthesize usability feedback"
    ],
    qualifications: [
      "Degree in Design, Human-Computer Interaction, or Digital Media from an Australian university",
      "Outstanding design portfolio showcasing user-centred problem solving",
      "Subclass 485 visa eligibility"
    ],
    visaEligibility: "Full open work rights under Subclass 485 with direct PR points accumulation."
  },
  {
    id: "au-pwc-consulting",
    country: "australia",
    countryName: "Australia",
    countryFlag: "🇦🇺",
    title: "Management Consulting Graduate Associate",
    company: "PwC Australia",
    city: "Melbourne, VIC / Sydney, NSW",
    contractType: "Graduate Full-Time",
    compensation: "A$72,000 – A$82,000 / year + 11.5% super + annual bonus",
    currencySymbol: "A$",
    legalBasis: "Temporary Graduate Visa (Subclass 485)",
    field: "Consulting & Strategy",
    languageRequired: "English Only",
    description: "Advise ASX 200 corporations and government agencies on operating model transformations, data analytics, and digital service modernization.",
    responsibilities: [
      "Synthesize qualitative stakeholder findings and quantitative datasets into strategic insights",
      "Build executive slide decks, financial business cases, and change management strategies",
      "Assist client project management offices (PMO) in delivering milestone targets"
    ],
    qualifications: [
      "Bachelor's or Master's in Business, Commerce, Law, Engineering, or IT from an Australian university",
      "Exceptional analytical, teamwork, and verbal presentation skills",
      "Subclass 485 visa holder"
    ],
    visaEligibility: "Subclass 485 provides 2–4 years unrestricted professional employment."
  },
  {
    id: "au-meriton-hotel",
    country: "australia",
    countryName: "Australia",
    countryFlag: "🇦🇺",
    title: "Front Office & Guest Services Associate",
    company: "Meriton Suites",
    city: "Brisbane, QLD / Gold Coast, QLD",
    contractType: "Student Part-Time",
    compensation: "A$26.50 – A$29.50 / hour + weekend award rates up to A$35/hr",
    currencySymbol: "A$",
    legalBasis: "Subclass 500 student visa (48 hrs per fortnight)",
    field: "Hospitality & Food",
    languageRequired: "English Only",
    description: "Welcome corporate travelers and holidaymakers to luxury apartment suites in sunny Queensland. Excellent hourly rates with flexible night/weekend schedules.",
    responsibilities: [
      "Manage guest check-ins, security deposits, and keycard distributions",
      "Coordinate housekeeping and maintenance dispatch for guest requests",
      "Handle guest inquiries regarding local transport, dining, and tourist attractions"
    ],
    qualifications: [
      "Current international student in Queensland with valid student visa",
      "Polite, customer-centric approach with good telephone etiquette",
      "Tax File Number (TFN)"
    ],
    visaEligibility: "Fully authorized under Australian student visa fortnightly hour limits."
  },

  // ══════════════════════════════════════════════════
  // 🇮🇪 IRELAND (10 Comprehensive Roles)
  // ══════════════════════════════════════════════════
  {
    id: "ie-google-solutions",
    country: "ireland",
    countryName: "Ireland",
    countryFlag: "🇮🇪",
    title: "Associate Technical Solutions Specialist",
    company: "Google EMEA Headquarters",
    city: "Dublin (Grand Canal Dock / Silicon Docks)",
    contractType: "Graduate Full-Time",
    compensation: "€45,000 – €52,000 / year + free gourmet meals + gym + health insurance",
    currencySymbol: "€",
    legalBasis: "2-Year Third Level Graduate Scheme (Stamp 1G)",
    field: "Tech & AI",
    languageRequired: "English Only",
    description: "Troubleshoot complex enterprise advertising and analytics implementations for multinational European brands at Google's European HQ.",
    responsibilities: [
      "Debug JavaScript tag implementations, cloud APIs, and conversion tracking",
      "Collaborate with European account strategists on technical client onboarding",
      "Write internal technical documentation and Python automation scripts"
    ],
    qualifications: [
      "Master's degree from an Irish university (Trinity, UCD, DCU, Galway)",
      "Strong communication, analytical thinking, and basic web coding skills",
      "Eligible for 2-Year Stamp 1G"
    ],
    visaEligibility: "Direct 2-Year Stamp 1G graduate visa granting unrestricted full-time employment."
  },
  {
    id: "ie-pfizer-pharma",
    country: "ireland",
    countryName: "Ireland",
    countryFlag: "🇮🇪",
    title: "Biopharmaceutical Process Engineering Intern",
    company: "Pfizer Global Supply",
    city: "Grange Castle, Dublin",
    contractType: "Internship / Co-op",
    compensation: "€2,200 / month + private healthcare + site shuttle bus",
    currencySymbol: "€",
    legalBasis: "Academic Co-op under Stamp 2 student visa",
    field: "Healthcare & Science",
    languageRequired: "English Only",
    description: "Work inside one of the largest integrated biomanufacturing facilities in the world producing vaccines and monoclonal antibodies.",
    responsibilities: [
      "Support continuous bioprocess monitoring and bioreactor harvest data analytics",
      "Assist validation protocols for single-use aseptic filtration systems",
      "Draft standard operating procedures (SOPs) compliant with FDA & EMA cGMP"
    ],
    qualifications: [
      "Master's student in Biotechnology, Chemical Engineering, or Pharmaceutical Sciences",
      "Knowledge of mammalian cell culture and aseptic validation principles",
      "Enrolled in recognized Irish university"
    ],
    visaEligibility: "Fully authorized on Irish Stamp 2 student permission with college placement agreement."
  },
  {
    id: "ie-stripe-swe",
    country: "ireland",
    countryName: "Ireland",
    countryFlag: "🇮🇪",
    title: "Backend Software Engineer — Global Payments",
    company: "Stripe Ireland",
    city: "Dublin (Silicon Docks)",
    contractType: "Graduate Full-Time",
    compensation: "€68,000 – €82,000 / year + equity stock grant + health & wellness stipends",
    currencySymbol: "€",
    legalBasis: "2-Year Third Level Graduate Scheme (Stamp 1G) -> Critical Skills Permit",
    field: "Tech & AI",
    languageRequired: "English Only",
    description: "Build financial infrastructure, card issuing protocols, and real-time ledger settlement engines processing billions in European digital commerce.",
    responsibilities: [
      "Develop fault-tolerant, high-concurrency payment APIs in Ruby, Go, and Java",
      "Design distributed idempotency locks and real-time transaction reconciliation pipelines",
      "Participate in high-severity incident triages and operational reliability engineering"
    ],
    qualifications: [
      "Degree in Computer Science, Software Engineering, or Mathematics from an Irish university",
      "Strong understanding of algorithms, distributed systems, and API design",
      "Stamp 1G eligibility"
    ],
    visaEligibility: "Qualifies for Ireland's Critical Skills Employment Permit (CSEP) with fast-track Stamp 4 PR in 2 years."
  },
  {
    id: "ie-tcd-tutor",
    country: "ireland",
    countryName: "Ireland",
    countryFlag: "🇮🇪",
    title: "Student Academic Mentor & Campus Guide",
    company: "Trinity College Dublin Student Services",
    city: "Dublin",
    contractType: "Student Part-Time",
    compensation: "€13.50 – €15.00 / hour (~€750/month for 12 hrs/week)",
    currencySymbol: "€",
    legalBasis: "Stamp 2 student permission: up to 20 hrs/week during term-time",
    field: "Education & Tutoring",
    languageRequired: "English Only",
    description: "Support first-year international students with library skills, academic essay formatting, and campus navigation in historic central Dublin.",
    responsibilities: [
      "Facilitate weekly peer learning groups and study halls",
      "Conduct historic campus orientation tours for incoming international cohorts",
      "Assist student union events and welfare workshops"
    ],
    qualifications: [
      "Enrolled student at an Irish higher education institution",
      "Excellent communication and empathy",
      "PPS Number for Irish PAYE taxation"
    ],
    visaEligibility: "100% legal under Irish Stamp 2 student permission."
  },
  {
    id: "ie-butlers-barista",
    country: "ireland",
    countryName: "Ireland",
    countryFlag: "🇮🇪",
    title: "Specialty Barista & Cafe Assistant",
    company: "Butlers Chocolate Café",
    city: "Dublin (Grafton Street / Henry Street)",
    contractType: "Student Part-Time",
    compensation: "€13.00 – €14.00 / hour + tips (~€150/mo) + staff chocolate allowance",
    currencySymbol: "€",
    legalBasis: "Stamp 2 student visa: 20 hrs/week in term, 40 hrs in holiday months",
    field: "Hospitality & Food",
    languageRequired: "English Only",
    description: "Serve artisan coffee, signature hot chocolates, and luxury Irish confectionery in Dublin's premier shopping pedestrian zones.",
    responsibilities: [
      "Handcraft specialty espresso drinks, signature melted hot chocolates, and cold beverages",
      "Gift-wrap luxury boxed chocolate selections and operate till point-of-sale",
      "Maintain welcoming Irish hospitality and keep the cafe spotless"
    ],
    qualifications: [
      "Current international student in Ireland on valid Stamp 2 student permission",
      "Warm personality, quick learning capacity, and reliable punctuality",
      "PPS Number or proof of appointment with Department of Social Protection"
    ],
    visaEligibility: "Authorized for 20 hours/week term-time, up to 40 hours in June, July, August, September."
  },
  {
    id: "ie-aercap-aviation",
    country: "ireland",
    countryName: "Ireland",
    countryFlag: "🇮🇪",
    title: "Junior Aviation Leasing & Commercial Analyst",
    company: "AerCap (World Leader in Aviation Leasing)",
    city: "Dublin (IFSC - International Financial Services Centre)",
    contractType: "Graduate Full-Time",
    compensation: "€44,000 – €52,000 / year + performance bonus + private medical cover",
    currencySymbol: "€",
    legalBasis: "2-Year Third Level Graduate Scheme (Stamp 1G)",
    field: "Finance & Banking",
    languageRequired: "English Only",
    description: "Analyze aircraft lease contracts, residual fleet valuations, and airline credit health inside Dublin, the global capital of commercial aviation finance.",
    responsibilities: [
      "Build financial cash-flow models for commercial aircraft portfolio acquisitions and lease extensions",
      "Monitor global airline customer credit ratings and monthly lease rental collections",
      "Coordinate technical aircraft redelivery and transition schedules with engineering teams"
    ],
    qualifications: [
      "Master's degree in Aviation Finance, Finance, Economics, or Aerospace Engineering from an Irish institution",
      "Strong financial modeling skills in Excel and understanding of IFRS lease accounting",
      "Stamp 1G eligible"
    ],
    visaEligibility: "Direct 2-year Stamp 1G graduate visa leading to Critical Skills Employment Permit."
  },
  {
    id: "ie-brownthomas-retail",
    country: "ireland",
    countryName: "Ireland",
    countryFlag: "🇮🇪",
    title: "Luxury Client Advisor",
    company: "Brown Thomas (Selfridges Group)",
    city: "Dublin (Grafton Street)",
    contractType: "Student Part-Time",
    compensation: "€13.80 – €15.50 / hour + individual sales commissions + staff discount",
    currencySymbol: "€",
    legalBasis: "Stamp 2 student permission (20 hours per week)",
    field: "Luxury & Retail",
    languageRequired: "English Only",
    description: "Represent prestigious international fashion and beauty houses inside Ireland's flagship luxury department store on Grafton Street.",
    responsibilities: [
      "Welcome affluent local and international clientele with sophisticated personal styling advice",
      "Process retail sales transactions, tax-free shopping refunds, and click-and-collect orders",
      "Maintain flawless brand visual merchandising on the luxury accessories floor"
    ],
    qualifications: [
      "Enrolled student at a Dublin higher education institution",
      "Polished presentation, enthusiasm for luxury fashion, and engaging conversational skills",
      "PPS Number"
    ],
    visaEligibility: "100% legal within 20 hours weekly Irish student work permission."
  },
  {
    id: "ie-ey-tax",
    country: "ireland",
    countryName: "Ireland",
    countryFlag: "🇮🇪",
    title: "Tax Technology & Compliance Graduate",
    company: "EY Ireland",
    city: "Dublin / Cork",
    contractType: "Graduate Full-Time",
    compensation: "€38,000 – €44,000 / year + full CTA / ACA professional exam sponsorship",
    currencySymbol: "€",
    legalBasis: "2-Year Third Level Graduate Scheme (Stamp 1G)",
    field: "Finance & Banking",
    languageRequired: "English Only",
    description: "Advise multinational US and European technology giants on international corporate tax compliance, BEPS 2.0 Pillar Two, and automated tax reporting.",
    responsibilities: [
      "Prepare Irish corporation tax returns and R&D tax credit claims for tech clients",
      "Automate tax data extraction and reconciliation using Alteryx, Python, and Power BI",
      "Research cross-border withholding taxes and EU direct tax directives"
    ],
    qualifications: [
      "Degree in Law, Accounting, Taxation, Economics, or Computer Science from an Irish university",
      "Analytical mindset with keen attention to legal and numerical detail",
      "Eligible for Stamp 1G"
    ],
    visaEligibility: "EY provides full training contract and subsequent Critical Skills Permit sponsorship."
  },
  {
    id: "ie-bostonsci-med",
    country: "ireland",
    countryName: "Ireland",
    countryFlag: "🇮🇪",
    title: "Quality Assurance Medical Device Engineer",
    company: "Boston Scientific",
    city: "Galway (Ballybrit)",
    contractType: "Graduate Full-Time",
    compensation: "€42,000 – €49,000 / year + pension + private health insurance",
    currencySymbol: "€",
    legalBasis: "2-Year Third Level Graduate Scheme (Stamp 1G)",
    field: "Healthcare & Science",
    languageRequired: "English Only",
    description: "Ensure quality compliance, risk management, and regulatory validation for life-saving cardiovascular stents and catheters in Galway's medtech cluster.",
    responsibilities: [
      "Perform process validation (IQ/OQ/PQ) for automated cleanroom catheter assembly equipment",
      "Investigate production non-conformances and lead CAPA root-cause problem solving",
      "Ensure compliance with ISO 13485 and FDA 21 CFR Part 820 medical device regulations"
    ],
    qualifications: [
      "Degree in Biomedical, Mechanical, or Industrial Engineering from an Irish university",
      "Knowledge of medical device quality systems, statistics (Minitab), and risk management (ISO 14971)",
      "Eligible for Stamp 1G"
    ],
    visaEligibility: "Occupation on Ireland's Critical Skills list; eligible for Stamp 4 PR in 2 years."
  },
  {
    id: "ie-shelbourne-hotel",
    country: "ireland",
    countryName: "Ireland",
    countryFlag: "🇮🇪",
    title: "Hotel Guest Relations & Night Audit Assistant",
    company: "The Shelbourne Hotel (Autograph Collection)",
    city: "Dublin (St. Stephen's Green)",
    contractType: "Student Part-Time",
    compensation: "€14.50 – €16.50 / hour + night shift premium + staff meals",
    currencySymbol: "€",
    legalBasis: "Stamp 2 student permission: up to 20 hours per week",
    field: "Hospitality & Food",
    languageRequired: "English Only",
    description: "Work at Dublin's historic five-star grand hotel on St. Stephen's Green. Flexible evening and night shifts ideal for university students.",
    responsibilities: [
      "Perform night audit balancing, revenue reconciliations, and daily operational reports",
      "Check in late-arriving international guests and attend to room service requests",
      "Coordinate with hotel security to ensure guest safety and tranquility"
    ],
    qualifications: [
      "Enrolled student in Dublin with reliable, courteous, and trustworthy character",
      "Excellent communication and basic numerical bookkeeping aptitude",
      "PPS Number"
    ],
    visaEligibility: "Fully compliant with Irish Stamp 2 student permission."
  }
];
