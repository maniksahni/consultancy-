export type CountryCode = "france" | "uk" | "usa" | "canada" | "germany" | "australia" | "ireland";

export type SalaryBenchmark = {
  discipline: string;
  juniorSalary: string;
  midSalary: string;
  seniorSalary: string;
  topEmployers: string[];
  inDemandSkills: string[];
};

export type VisaRoadmapStep = {
  stage: string;
  title: string;
  duration: string;
  requirements: string[];
  keyOutcome: string;
};

export type TaxBreakdown = {
  brackets: { bracket: string; rate: string }[];
  socialDeductions: string;
  estimatedNetMultiplier: number; // e.g. 0.78 for 78% take-home
  taxIdName: string;
  taxFilingDeadline: string;
  studentExemptions: string;
};

export type ShortageOccupation = {
  sector: string;
  roles: string[];
  officialListTitle: string;
  fastTrackBenefits: string;
};

export type InterviewCulture = {
  typicalRounds: string[];
  localEtiquette: string[];
  turnaroundTime: string;
};

export type LivingCostComparison = {
  avgStudentRent: string;
  avgMonthlyLiving: string;
  partTimeEarningsCoverage: string;
};

export type CountryDeepProfile = {
  code: CountryCode;
  countryName: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  minWageGross: string;
  minWageNet: string;
  termHourLimit: string;
  holidayHourLimit: string;
  statutoryAnnualLeave: string;
  standardWorkWeek: string;
  commuterSubsidyRule: string;
  mealVoucherPerk: string;
  postStudyVisaName: string;
  postStudyDuration: string;
  prPathwayName: string;
  prEligibilityYears: string;
  officialJobPortal: string;
  nationalEmploymentAgency: string;
  cvFormatRules: {
    photoRequired: "Mandatory / Expected" | "Strictly Prohibited (Anti-discrimination)" | "Optional / Discretionary";
    lengthPages: string;
    keySections: string[];
    dosAndDonts: string[];
  };
  salaryBenchmarks: SalaryBenchmark[];
  visaRoadmap: VisaRoadmapStep[];
  taxInfo: TaxBreakdown;
  shortageOccupations: ShortageOccupation[];
  interviewCulture: InterviewCulture;
  livingCostVsEarnings: LivingCostComparison;
};

export const deepCountryProfiles: Record<CountryCode, CountryDeepProfile> = {
  france: {
    code: "france",
    countryName: "France",
    flag: "🇫🇷",
    currency: "EUR",
    currencySymbol: "€",
    minWageGross: "€11.65 / hour (€1,766.92 / month for 35h week)",
    minWageNet: "€9.22 / hour (~€1,398 / month net)",
    termHourLimit: "Up to 20 hours / week (capped at 964 hours per calendar year = 60% of legal time)",
    holidayHourLimit: "Full-time 35 hours / week during official university vacation periods",
    statutoryAnnualLeave: "5 weeks (25 paid working days) + 10 to 12 RTT days (Réduction du Temps de Travail)",
    standardWorkWeek: "35 hours / week (French statutory legal work week)",
    commuterSubsidyRule: "Employers MUST reimburse at least 50% of the employee's public transportation pass (Navigo)",
    mealVoucherPerk: "Tickets Restaurant / Carte Bimpli: employer co-funds €9–€13/day meal allowances tax-free",
    postStudyVisaName: "2-Year APS / RECE (Autorisation Provisoire de Séjour / Recherche d'Emploi ou Création d'Entreprise)",
    postStudyDuration: "24 Months (under the Indo-French bilateral agreement for Master's graduates)",
    prPathwayName: "Carte de Résident (10-Year Resident Card) / Fast-Track Naturalisation (French Citizenship)",
    prEligibilityYears: "Only 2 years of residency required after graduating from a French Master's program!",
    officialJobPortal: "France Travail (francetravail.fr), Welcome to the Jungle, APEC, Cadremploi",
    nationalEmploymentAgency: "France Travail (formerly Pôle Emploi): provides free career counseling, resume screening, and job workshops to APS visa holders",
    cvFormatRules: {
      photoRequired: "Mandatory / Expected",
      lengthPages: "Strictly 1 page for students and graduates with < 5 years experience",
      keySections: [
        "En-tête (Contact, City, LinkedIn)",
        "Titre du Profil (e.g., 'Data Scientist · Master 2')",
        "Formation & Diplômes (Degrees, ECTS, French honors)",
        "Expérience Professionnelle (Internships & projects with metrics)",
        "Compétences Techniques & Langues (CEFR levels: A1–C2)"
      ],
      dosAndDonts: [
        "DO mention your visa status clearly: 'Autorisé à travailler · Visa VLS-TS / APS'",
        "DO use official CEFR French language descriptors (A2, B1, B2, C1) rather than vague terms like 'Intermediate'",
        "DON'T exceed 1 page; French recruiters discard 2-page graduate CVs",
        "DON'T forget to format dates in French style (e.g., 'Septembre 2024 – Présent')"
      ]
    },
    salaryBenchmarks: [
      {
        discipline: "AI, Machine Learning & Software Engineering",
        juniorSalary: "€44,000 – €55,000",
        midSalary: "€58,000 – €75,000",
        seniorSalary: "€80,000 – €110,000+",
        topEmployers: ["Mistral AI", "Google DeepMind Paris", "Datadog", "Dassault Systèmes", "Capgemini", "Criteo"],
        inDemandSkills: ["Python", "PyTorch", "Rust", "Distributed Systems", "Kubernetes", "Transformers"]
      },
      {
        discipline: "Finance, M&A & Quantitative Analytics",
        juniorSalary: "€45,000 – €60,000 (+ €8k–€18k bonus)",
        midSalary: "€65,000 – €90,000 (+ bonus)",
        seniorSalary: "€100,000 – €180,000+",
        topEmployers: ["BNP Paribas", "Société Générale", "Rothschild & Co", "Natixis", "Crédit Agricole CIB"],
        inDemandSkills: ["Financial Modeling", "Python / QuantLib", "Derivatives Pricing", "Basel IV", "VBA"]
      },
      {
        discipline: "Luxury Brand Management & Haute Horlogerie",
        juniorSalary: "€40,000 – €48,000",
        midSalary: "€52,000 – €68,000",
        seniorSalary: "€75,000 – €115,000+",
        topEmployers: ["LVMH (Louis Vuitton, Dior, Celine)", "Kering (Gucci, Saint Laurent)", "Hermès", "Cartier", "Chanel"],
        inDemandSkills: ["Omnichannel Retailing", "Merchandising", "Brand Equity", "Visual Merchandising", "CRM"]
      },
      {
        discipline: "Aerospace, Automotive & Clean Energy",
        juniorSalary: "€42,000 – €49,000",
        midSalary: "€52,000 – €68,000",
        seniorSalary: "€72,000 – €95,000",
        topEmployers: ["Airbus Commercial Aircraft", "Thales", "Safran", "Schneider Electric", "TotalEnergies"],
        inDemandSkills: ["CATIA", "Embedded Systems (C/C++)", "DO-178C", "Simulink", "CFD Modeling"]
      }
    ],
    visaRoadmap: [
      {
        stage: "Stage 01",
        title: "Student Visa (VLS-TS)",
        duration: "1 to 2 Years (Study Period)",
        requirements: ["Admission to accredited French university", "€615/mo proof of funds", "Campus France attestation"],
        keyOutcome: "Authorized to work part-time up to 964 hours per year and complete mandatory paid internships."
      },
      {
        stage: "Stage 02",
        title: "2-Year APS / RECE Post-Study Work Permit",
        duration: "24 Months",
        requirements: ["Master's degree completion in France", "Application at local Préfecture within validity of student visa"],
        keyOutcome: "Unrestricted full-time work authorization across any industry in France without labor market test."
      },
      {
        stage: "Stage 03",
        title: "Passeport Talent / Salarié Work Permit",
        duration: "4 Years (Renewable)",
        requirements: ["Permanent CDI employment contract", "Salary ≥ 1.5× SMIC (~€2,700/mo gross)"],
        keyOutcome: "4-Year multi-entry residency with unrestricted Schengen travel, family reunification, and social benefits."
      },
      {
        stage: "Stage 04",
        title: "Permanent Residency / French Citizenship",
        duration: "After 2 Years Post-Master",
        requirements: ["B1 French fluency certificate", "2 consecutive years of tax declarations", "Integration into French society"],
        keyOutcome: "Full French & European Union Citizenship with permanent right to live and work across all 27 EU nations!"
      }
    ],
    taxInfo: {
      brackets: [
        { bracket: "Up to €11,294", rate: "0%" },
        { bracket: "€11,295 – €28,797", rate: "11%" },
        { bracket: "€28,798 – €82,341", rate: "30%" },
        { bracket: "€82,342 – €177,106", rate: "41%" },
        { bracket: "Above €177,106", rate: "45%" }
      ],
      socialDeductions: "Approx. 21% to 23% employee social contributions (Sécurité sociale, retraite, CSG/CRDS)",
      estimatedNetMultiplier: 0.78,
      taxIdName: "Numéro fiscal (DGFiP) & Numéro de Sécurité Sociale (CPAM)",
      taxFilingDeadline: "May to early June annually via impots.gouv.fr",
      studentExemptions: "Student earnings up to 3× SMIC monthly (~€5,300/year) are 100% tax-exempt under French law!"
    },
    shortageOccupations: [
      {
        sector: "Information Technology & AI",
        roles: ["Data Engineer", "Machine Learning Researcher", "Cloud DevOps Architect", "Cybersecurity Specialist"],
        officialListTitle: "Métiers en Tension (Arrêté ministériel)",
        fastTrackBenefits: "Exempt from labor market testing; eligible for expedited Passeport Talent processing in 3 weeks."
      },
      {
        sector: "Aerospace & High-Tech Manufacturing",
        roles: ["Embedded Systems Engineer", "Avionics Specialist", "Robotics Integrator", "Propulsion Engineer"],
        officialListTitle: "France Relance / France 2030 Priority Sectors",
        fastTrackBenefits: "Direct access to state industrial R&D tax credit grants (CIR) and immediate multi-year work permits."
      },
      {
        sector: "Health & Biotechnology",
        roles: ["Bioinformatics Analyst", "Clinical Data Manager", "Bioprocess Development Scientist"],
        officialListTitle: "Santé et Sciences du Vivant",
        fastTrackBenefits: "Priority visa issuance under French Tech Visa and hospital research agreements."
      }
    ],
    interviewCulture: {
      typicalRounds: [
        "RH Screening (Phone/Video 30 min): Career goals, salary expectation, and French visa timeline check",
        "Managerial & Technical Assessment (60 min): Case study or technical review; practical problem solving",
        "Grand Oral / Fit & Values (45 min): Assessment of cultural fit, team collaboration, and French workplace dynamic"
      ],
      localEtiquette: [
        "Address interviewers formally using 'Vous' until invited to use 'Tu'",
        "Be prepared to explain your Master's curriculum and ECTS credits clearly",
        "French employers highly value intellectual debate, analytical rigor, and critical reasoning over pure salesmanship"
      ],
      turnaroundTime: "2 to 4 weeks from application to formal CDI offer letter"
    },
    livingCostVsEarnings: {
      avgStudentRent: "€450 – €850 / mo (subsidized by €150–€220 CAF housing aid)",
      avgMonthlyLiving: "€750 – €1,100 / mo total (including food, transport, leisure)",
      partTimeEarningsCoverage: "Working 15–20 hours/week earns €650–€950/mo net, covering 80% to 100% of living expenses outside central Paris!"
    }
  },

  uk: {
    code: "uk",
    countryName: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    currencySymbol: "£",
    minWageGross: "£11.44 / hour (National Living Wage for age 21+)",
    minWageNet: "£9.85 – £10.15 / hour net",
    termHourLimit: "Up to 20 hours / week for degree-level student visa holders",
    holidayHourLimit: "Full-time (up to 40 hours / week) during official vacation periods",
    statutoryAnnualLeave: "28 days paid leave (including 8 UK bank holidays)",
    standardWorkWeek: "37.5 to 40 hours / week",
    commuterSubsidyRule: "Cycle to Work tax-free bike salary sacrifice scheme & student 16-25 Railcard (1/3 off fares)",
    mealVoucherPerk: "Staff subsidized restaurants and high-street corporate retail discount perks",
    postStudyVisaName: "Graduate Route Visa (Post-Study Work / PSW)",
    postStudyDuration: "2 Years for Bachelor's & Master's; 3 Years for PhD graduates",
    prPathwayName: "Indefinite Leave to Remain (ILR) -> British Citizenship",
    prEligibilityYears: "5 Years on Skilled Worker Visa route",
    officialJobPortal: "Find a Job (gov.uk/find-a-job), LinkedIn UK, Reed, Totaljobs, TargetJobs",
    nationalEmploymentAgency: "Jobcentre Plus & National Careers Service: provides free interview practice, national apprenticeship links, and careers advice",
    cvFormatRules: {
      photoRequired: "Strictly Prohibited (Anti-discrimination)",
      lengthPages: "2 pages standard for UK graduates and experienced professionals",
      keySections: [
        "Personal Statement / Professional Summary (3-4 impactful lines)",
        "Key Skills & Core Competencies",
        "Work Experience & Placements (Reverse chronological)",
        "Education & Qualifications (Degree classification: 1st, 2:1)",
        "Key Projects & Extracurricular Leadership"
      ],
      dosAndDonts: [
        "DON'T include a headshot photo, date of birth, marital status, or nationality (UK Equality Act 2010)",
        "DO quantify accomplishments: 'Increased pipeline by 28%', 'Automated reports saving 6 hrs/week'",
        "DO highlight eligibility: 'Eligible for 2-Year Graduate Route Visa with unrestricted right to work'",
        "DO state your degree classification (First-Class Honours / 2:1 equivalent)"
      ]
    },
    salaryBenchmarks: [
      {
        discipline: "Software Engineering & Cloud Architecture",
        juniorSalary: "£36,000 – £50,000",
        midSalary: "£55,000 – £75,000",
        seniorSalary: "£85,000 – £125,000+",
        topEmployers: ["DeepMind London", "Amazon UK", "Arm", "Bloomberg", "Deliveroo", "Monzo"],
        inDemandSkills: ["TypeScript", "Python", "Go", "AWS", "Distributed Microservices", "CI/CD"]
      },
      {
        discipline: "Investment Banking, FinTech & Quant Analysis",
        juniorSalary: "£45,000 – £65,000 (+ £15k–£35k bonus)",
        midSalary: "£75,000 – £110,000 (+ bonus)",
        seniorSalary: "£130,000 – £250,000+",
        topEmployers: ["Goldman Sachs", "J.P. Morgan", "Barclays", "Revolut", "Man Group", "HSBC"],
        inDemandSkills: ["Financial Modeling", "Python", "C++", "Algorithmic Execution", "LBO Valuation"]
      },
      {
        discipline: "Healthcare, Pharmaceutical & Clinical Science",
        juniorSalary: "£30,000 – £40,000 (NHS Band 5/6)",
        midSalary: "£42,000 – £56,000",
        seniorSalary: "£62,000 – £90,000",
        topEmployers: ["AstraZeneca", "GSK (GlaxoSmithKline)", "NHS Trusts", "CRUK", "Novartis UK"],
        inDemandSkills: ["Clinical Trials", "Biostatistics", "GCP", "Bioinformatics", "Pharmacovigilance"]
      },
      {
        discipline: "Management Consulting & Corporate Strategy",
        juniorSalary: "£38,000 – £52,000",
        midSalary: "£60,000 – £85,000",
        seniorSalary: "£95,000 – £160,000+",
        topEmployers: ["McKinsey London", "BCG", "Bain & Company", "Deloitte UK", "PwC", "KPMG"],
        inDemandSkills: ["Commercial Due Diligence", "Financial Valuation", "Change Management", "PowerPoint"]
      }
    ],
    visaRoadmap: [
      {
        stage: "Stage 01",
        title: "UK Student Visa",
        duration: "1 to 3 Years",
        requirements: ["CAS letter from licensed sponsor", "Maintenance funds (£1,334/mo in London, £1,023 outside)", "IELTS/MOI"],
        keyOutcome: "Permitted to work 20 hours/week term-time, full-time during vacations."
      },
      {
        stage: "Stage 02",
        title: "2-Year Graduate Route Visa",
        duration: "2 Years (3 Years for PhD)",
        requirements: ["Completed degree at UK higher education provider", "Application submitted inside the UK before student visa expiry"],
        keyOutcome: "Unrestricted full-time work authorization. No company sponsorship needed."
      },
      {
        stage: "Stage 03",
        title: "Skilled Worker Visa",
        duration: "Up to 5 Years",
        requirements: ["Job offer from licensed UK sponsor", "Minimum salary threshold (£38,700 standard, or £30,960 for new entrants)"],
        keyOutcome: "Long-term work residence leading directly to settlement."
      },
      {
        stage: "Stage 04",
        title: "Indefinite Leave to Remain (ILR)",
        duration: "Permanent",
        requirements: ["5 years continuous residence on Skilled Worker visa", "Life in the UK test", "Proof of English proficiency"],
        keyOutcome: "Permanent settlement in the UK; British passport application eligible after 1 additional year."
      }
    ],
    taxInfo: {
      brackets: [
        { bracket: "Up to £12,570 (Personal Allowance)", rate: "0% (Tax-Free)" },
        { bracket: "£12,571 – £50,270 (Basic Rate)", rate: "20%" },
        { bracket: "£50,271 – £125,140 (Higher Rate)", rate: "40%" },
        { bracket: "Above £125,140 (Additional Rate)", rate: "45%" }
      ],
      socialDeductions: "Class 1 National Insurance: 8% on earnings between £242 and £967/week, 2% thereafter",
      estimatedNetMultiplier: 0.79,
      taxIdName: "National Insurance (NI) Number & Unique Taxpayer Reference (UTR)",
      taxFilingDeadline: "PAYE automatically deducted monthly; self-assessment January 31",
      studentExemptions: "First £12,570 earned every year is completely tax-free under UK statutory personal allowance!"
    },
    shortageOccupations: [
      {
        sector: "STEM, Cyber & AI",
        roles: ["Cyber Security Architect", "Data Scientist", "Software Developer (SOC 2136)", "Systems Engineer"],
        officialListTitle: "Immigration Salary List (ISL - Home Office)",
        fastTrackBenefits: "New entrant threshold lowers required salary from £38,700 to £30,960 for recent university graduates."
      },
      {
        sector: "Health, Nursing & Life Sciences",
        roles: ["Medical Practitioner", "Pharmacist", "Clinical Scientist", "Biochemist"],
        officialListTitle: "Health and Care Worker Visa Eligible Professions",
        fastTrackBenefits: "Fast-track 3-week visa turnaround, significantly reduced visa application fees, and complete exemption from Immigration Health Surcharge (IHS)."
      },
      {
        sector: "Civil, Mechanical & Electrical Engineering",
        roles: ["Civil Engineer", "Renewable Power Engineer", "Aero Design Engineer"],
        officialListTitle: "Engineering Shortage Codes (ISL)",
        fastTrackBenefits: "Immediate corporate visa sponsorship eligibility across infrastructure and green energy projects."
      }
    ],
    interviewCulture: {
      typicalRounds: [
        "Online Psychometric / Numerical & Situational Judgment Tests (SJT)",
        "Recorded HireVue Video Interview (3–5 competency questions)",
        "Assessment Centre (AC): Group case exercise, presentation, and 1-on-1 competency interview"
      ],
      localEtiquette: [
        "Structure answers strictly using the STAR methodology (Situation, Task, Action, Result)",
        "UK interviewers prize humility combined with clear evidence of commercial awareness",
        "Always research the company's recent regulatory filings, M&A transactions, or press releases"
      ],
      turnaroundTime: "2 to 6 weeks (graduate schemes operate on structured annual cycles)"
    },
    livingCostVsEarnings: {
      avgStudentRent: "£550 – £850 / mo outside London; £850 – £1,300 in London",
      avgMonthlyLiving: "£900 – £1,450 / mo total",
      partTimeEarningsCoverage: "Working 20 hours/week at £11.44/hr brings ~£990/mo gross (~£900 net), covering the majority of regional living expenses!"
    }
  },

  usa: {
    code: "usa",
    countryName: "United States",
    flag: "🇺🇸",
    currency: "USD",
    currencySymbol: "$",
    minWageGross: "$15.00 – $18.50 / hour (CA, NY, MA, WA state statutory minimums)",
    minWageNet: "$13.00 – $16.00 / hour net",
    termHourLimit: "Up to 20 hours / week on-campus; CPT required for off-campus internships",
    holidayHourLimit: "Up to 40 hours / week on-campus during breaks; full-time CPT in summer",
    statutoryAnnualLeave: "15 to 25 days Paid Time Off (PTO) + 11 US federal holidays",
    standardWorkWeek: "40 hours / week",
    commuterSubsidyRule: "Section 132(f) pre-tax commuter transit & parking deduction ($315/month tax-free)",
    mealVoucherPerk: "Tech campus gourmet free dining (Google, Meta), 401(k) company matching (typically 4%–6%)",
    postStudyVisaName: "STEM OPT (Optional Practical Training) Extension",
    postStudyDuration: "Up to 36 Months (12 months initial OPT + 24 months STEM extension)",
    prPathwayName: "Employment-Based Green Card (EB-2 / EB-3 / EB-1)",
    prEligibilityYears: "Immediate company petition or transition from H-1B",
    officialJobPortal: "LinkedIn US, Handshake, Indeed US, Glassdoor, Built In (tech hubs)",
    nationalEmploymentAgency: "USCIS & On-Campus Career Services: university DSO issues Form I-20 updates for CPT/OPT",
    cvFormatRules: {
      photoRequired: "Strictly Prohibited (Anti-discrimination)",
      lengthPages: "Strictly 1 page for university graduates and candidates with < 7 years experience",
      keySections: [
        "Contact Info (Name, City/State, Phone, Email, LinkedIn, GitHub)",
        "Education (University, Degree, GPA if ≥ 3.5, Honors)",
        "Technical Skills (Languages, Frameworks, Cloud, Tools)",
        "Professional Experience (XYZ formula)",
        "Notable Projects & Hackathons"
      ],
      dosAndDonts: [
        "DON'T include a photo, age, marital status, religion, or gender (US Equal Employment Opportunity law)",
        "DO apply the Google XYZ resume formula: 'Accomplished [X], as measured by [Y], by doing [Z]'",
        "DO list your visa availability: 'Eligible for 3-Year STEM OPT without immediate employer sponsorship'",
        "DO ensure perfect single-page ATS-friendly formatting"
      ]
    },
    salaryBenchmarks: [
      {
        discipline: "AI, Machine Learning & Software Engineering",
        juniorSalary: "$105,000 – $145,000 (+ RSUs)",
        midSalary: "$150,000 – $210,000 (+ RSUs)",
        seniorSalary: "$220,000 – $380,000+ (Total comp)",
        topEmployers: ["Google", "Meta", "Apple", "Microsoft", "Amazon AWS", "NVIDIA", "OpenAI"],
        inDemandSkills: ["Distributed Systems", "Python", "C++", "PyTorch", "Kubernetes", "LLM Fine-tuning"]
      },
      {
        discipline: "Investment Banking & Quantitative Trading",
        juniorSalary: "$110,000 – $135,000 (+ $40k–$80k bonus)",
        midSalary: "$175,000 – $275,000 (+ bonus)",
        seniorSalary: "$350,000 – $750,000+",
        topEmployers: ["Goldman Sachs", "Morgan Stanley", "Citadel", "Jane Street", "Two Sigma", "BlackRock"],
        inDemandSkills: ["Financial Engineering", "C++ Low Latency", "Stochastic Calculus", "Python", "LBO"]
      },
      {
        discipline: "Biomedical, Biotech & Pharmaceutical Science",
        juniorSalary: "$85,000 – $110,000",
        midSalary: "$120,000 – $165,000",
        seniorSalary: "$180,000 – $260,000",
        topEmployers: ["Pfizer", "Moderna", "Genentech", "Biogen", "Boston Scientific", "Regeneron"],
        inDemandSkills: ["CRISPR", "Next-Gen Sequencing", "Bioinformatics", "FDA Regulatory Compliance"]
      },
      {
        discipline: "Data Science, Analytics & Cloud Systems",
        juniorSalary: "$95,000 – $125,000",
        midSalary: "$135,000 – $180,000",
        seniorSalary: "$195,000 – $290,000",
        topEmployers: ["Snowflake", "Databricks", "Uber", "Palantir", "Stripe", "Airbnb"],
        inDemandSkills: ["SQL", "Spark", "Python", "Airflow", "A/B Testing", "Data Warehousing"]
      }
    ],
    visaRoadmap: [
      {
        stage: "Stage 01",
        title: "F-1 Student Visa & CPT",
        duration: "1 to 4 Years",
        requirements: ["Form I-20 from SEVP-approved school", "Proof of funds ($40k–$60k/yr)", "SEVIS fee payment"],
        keyOutcome: "Authorized to work 20 hrs/week on-campus and take off-campus paid internships via CPT."
      },
      {
        stage: "Stage 02",
        title: "12-Month Initial OPT",
        duration: "12 Months",
        requirements: ["Completed degree at accredited US university", "Form I-765 EAD filing with USCIS"],
        keyOutcome: "Full-time employment authorized anywhere in the US directly related to your major field of study."
      },
      {
        stage: "Stage 03",
        title: "24-Month STEM OPT Extension",
        duration: "24 Months (Total 36 Months OPT)",
        requirements: ["Qualifying STEM degree", "E-Verify registered employer", "Form I-983 Training Plan"],
        keyOutcome: "Gives candidates 3 consecutive lottery chances to secure H-1B specialty occupation visa."
      },
      {
        stage: "Stage 04",
        title: "H-1B Specialty Worker & Green Card",
        duration: "3 to 6 Years -> Permanent",
        requirements: ["Employer petition approved via annual lottery or cap-exempt institution", "PERM labor certification"],
        keyOutcome: "Long-term US employment leading to EB-2 / EB-3 permanent residency (Green Card)."
      }
    ],
    taxInfo: {
      brackets: [
        { bracket: "Up to $11,600", rate: "10%" },
        { bracket: "$11,601 – $47,150", rate: "12%" },
        { bracket: "$47,151 – $100,525", rate: "22%" },
        { bracket: "$100,526 – $191,950", rate: "24%" },
        { bracket: "$191,951 – $243,725", rate: "32%" }
      ],
      socialDeductions: "FICA (Social Security 6.2% + Medicare 1.45%). CRITICAL: Nonresident F-1 students on OPT are EXEMPT from FICA taxes for their first 5 calendar years!",
      estimatedNetMultiplier: 0.81,
      taxIdName: "Social Security Number (SSN) / ITIN",
      taxFilingDeadline: "April 15 annually via IRS Form 1040-NR",
      studentExemptions: "Non-resident F-1 students benefit from FICA tax exemption, saving ~7.65% from every paycheck!"
    },
    shortageOccupations: [
      {
        sector: "Artificial Intelligence, Cloud & Semiconductor Design",
        roles: ["Hardware Engineer", "AI Infrastructure Engineer", "Semiconductor Fabrication Engineer", "Cloud Security Architect"],
        officialListTitle: "CHIPS and Science Act & DHS STEM Designated Degree Program List",
        fastTrackBenefits: "Qualifies for 3-Year STEM OPT extension; National Interest Waiver (NIW EB-2) green card self-petition without employer sponsor."
      },
      {
        sector: "Biotechnology & Computational Biology",
        roles: ["Bioinformatics Scientist", "Immunology Researcher", "Biostatistician"],
        officialListTitle: "Critical and Emerging Technologies (National Science and Technology Council)",
        fastTrackBenefits: "Cap-exempt H-1B petitions available through affiliated university hospitals and research institutes year-round."
      },
      {
        sector: "Quantitative Finance & Algorithmic Trading",
        roles: ["Quantitative Researcher", "Financial Risk Modeler", "High-Frequency Trading Engineer"],
        officialListTitle: "O*NET STEM High Priority Codes",
        fastTrackBenefits: "Eligible for immediate O-1A extraordinary ability visas and expedited EB-1/EB-2 green card filings."
      }
    ],
    interviewCulture: {
      typicalRounds: [
        "Recruiter Phone Screen (30 min): Visa status confirmation, background walkthrough, and culture fit",
        "Technical Screening (45–60 min): Live LeetCode data structures & algorithms problem via CoderPad",
        "Onsite / Virtual Loop (4–5 rounds): 2x System Design, 2x Coding/Algorithms, 1x Behavioral (Amazon Leadership Principles / STAR)"
      ],
      localEtiquette: [
        "Communicate your thought process out loud when coding; interviewers evaluate problem-solving over memorized code",
        "Focus on ownership, bias for action, and quantifiable business outcomes in behavioral questions",
        "Always prepare 3 strategic questions about team roadmaps, engineering scale, and company strategy"
      ],
      turnaroundTime: "2 to 5 weeks from initial screen to formal written offer"
    },
    livingCostVsEarnings: {
      avgStudentRent: "$700 – $1,200 / mo in college towns; $1,400 – $2,200 in NYC/San Francisco",
      avgMonthlyLiving: "$1,200 – $2,500 / mo total",
      partTimeEarningsCoverage: "On-campus jobs ($15–$18/hr, 20 hrs/wk) earn $1,200–$1,500/mo, covering groceries and housing in most Midwestern and Southern university towns!"
    }
  },

  canada: {
    code: "canada",
    countryName: "Canada",
    flag: "🇨🇦",
    currency: "CAD",
    currencySymbol: "C$",
    minWageGross: "C$17.30 / hour (Federal minimum wage; C$16.55–C$17.40 in Ontario & BC)",
    minWageNet: "C$14.80 – C$15.50 / hour net",
    termHourLimit: "Up to 24 hours / week off-campus (updated IRCC policy)",
    holidayHourLimit: "Full-time (up to 40 hours / week) during scheduled academic breaks",
    statutoryAnnualLeave: "2 to 3 weeks paid vacation (4%–6% gross vacation pay added)",
    standardWorkWeek: "37.5 to 40 hours / week",
    commuterSubsidyRule: "Pre-tax transit passes & student U-Pass included in university tuition across major cities",
    mealVoucherPerk: "Comprehensive extended health & dental benefits (co-funded 80%–100% by Canadian employers)",
    postStudyVisaName: "Post-Graduation Work Permit (PGWP)",
    postStudyDuration: "Up to 3 Years (open work permit for 2-year university degrees)",
    prPathwayName: "Canadian Permanent Residency (PR) via Express Entry (CEC & PNP)",
    prEligibilityYears: "1 Year of Canadian skilled work experience (NOC TEER 0, 1, 2, or 3)",
    officialJobPortal: "Job Bank Canada (jobbank.gc.ca), LinkedIn Canada, Indeed Canada, Workopolis",
    nationalEmploymentAgency: "Job Bank & Service Canada: provides free credential assessment advice, job alerts, and LMIA-exempt career boards",
    cvFormatRules: {
      photoRequired: "Strictly Prohibited (Anti-discrimination)",
      lengthPages: "1 to 2 pages maximum",
      keySections: [
        "Contact Information (City, Province, Phone, Email, LinkedIn)",
        "Professional Summary",
        "Technical & Functional Competencies",
        "Canadian & International Work Experience",
        "Education & Certifications"
      ],
      dosAndDonts: [
        "DON'T include personal photos, age, marital status, or SIN number on your resume",
        "DO mention your work authorization: 'Eligible for 3-Year Post-Graduation Work Permit (PGWP)'",
        "DO align your job titles with Canadian NOC (National Occupational Classification) terminology",
        "DO highlight Canadian Co-op and volunteer experience"
      ]
    },
    salaryBenchmarks: [
      {
        discipline: "Cloud Engineering, DevOps & AI",
        juniorSalary: "C$72,000 – C$92,000",
        midSalary: "C$98,000 – C$130,000",
        seniorSalary: "C$145,000 – C$210,000+",
        topEmployers: ["Shopify", "Amazon Canada", "RBC Tech", "OpenText", "Cohere", "Constellation Software"],
        inDemandSkills: ["Kubernetes", "AWS / GCP", "Python", "Go", "Terraform", "Distributed Systems"]
      },
      {
        discipline: "Banking, Commercial Finance & Risk Analysis",
        juniorSalary: "C$65,000 – C$85,000 (+ bonus)",
        midSalary: "C$90,000 – C$125,000",
        seniorSalary: "C$140,000 – C$220,000+",
        topEmployers: ["RBC", "TD Bank", "Scotiabank", "BMO Financial Group", "CIBC", "CPP Investments"],
        inDemandSkills: ["Financial Analysis", "SQL", "Risk Modeling", "IFRS", "Corporate Credit Underwriting"]
      },
      {
        discipline: "Mining, Clean Energy & Civil Infrastructure",
        juniorSalary: "C$68,000 – C$88,000",
        midSalary: "C$92,000 – C$125,000",
        seniorSalary: "C$135,000 – C$190,000",
        topEmployers: ["SNC-Lavalin (AtkinsRéalis)", "Teck Resources", "Hatch", "Stantec", "WSP Global"],
        inDemandSkills: ["AutoCAD / Civil 3D", "Environmental Assessment", "Project Management (PMP)", "Geotech"]
      },
      {
        discipline: "Supply Chain, Logistics & Operations",
        juniorSalary: "C$58,000 – C$74,000",
        midSalary: "C$78,000 – C$105,000",
        seniorSalary: "C$115,000 – C$160,000",
        topEmployers: ["Canadian National Railway", "Canadian Pacific", "Purolator", "Amazon Logistics", "Metro"],
        inDemandSkills: ["SAP ERP", "Six Sigma", "Demand Forecasting", "Warehouse Automation", "Logistics"]
      }
    ],
    visaRoadmap: [
      {
        stage: "Stage 01",
        title: "Canadian Study Permit & Co-op Permit",
        duration: "1 to 4 Years",
        requirements: ["Letter of Acceptance (LOA) from DLI", "Proof of funds (C$20,635 + first year tuition)", "PAL (Provincial Attestation Letter)"],
        keyOutcome: "Authorized to work up to 24 hrs/week off-campus and full-time during breaks."
      },
      {
        stage: "Stage 02",
        title: "3-Year Post-Graduation Work Permit (PGWP)",
        duration: "Up to 3 Years (Open Work Permit)",
        requirements: ["Completed full-time degree at eligible DLI (min 2 years for 3-yr PGWP)", "Apply within 180 days of final marks"],
        keyOutcome: "Unrestricted open work permit anywhere in Canada with any employer."
      },
      {
        stage: "Stage 03",
        title: "Canadian Permanent Residency (PR)",
        duration: "Permanent",
        requirements: ["1 year skilled Canadian work experience (NOC TEER 0, 1, 2, 3)", "Express Entry CRS score or PNP nomination"],
        keyOutcome: "Permanent resident status granting full healthcare, subsidized education, and direct route to Canadian citizenship."
      },
      {
        stage: "Stage 04",
        title: "Canadian Citizenship",
        duration: "Lifelong",
        requirements: ["3 years of physical presence (1,095 days) within past 5 years (study time counts as half days!)", "Citizenship test"],
        keyOutcome: "Full Canadian Passport with visa-free travel to 185+ nations."
      }
    ],
    taxInfo: {
      brackets: [
        { bracket: "Up to C$55,867 (Federal)", rate: "15%" },
        { bracket: "C$55,868 – C$111,733", rate: "20.5%" },
        { bracket: "C$111,734 – C$173,205", rate: "26%" },
        { bracket: "Above C$173,205", rate: "29% – 33%" }
      ],
      socialDeductions: "CPP (Canada Pension Plan 5.95%) + EI (Employment Insurance 1.66%)",
      estimatedNetMultiplier: 0.77,
      taxIdName: "Social Insurance Number (SIN)",
      taxFilingDeadline: "April 30 annually via CRA (Canada Revenue Agency)",
      studentExemptions: "Tuition tax credits (Form T2202) can be carried forward indefinitely to reduce income taxes in post-graduation years!"
    },
    shortageOccupations: [
      {
        sector: "STEM & Information Systems",
        roles: ["Software Engineers and Designers (NOC 21231)", "Data Scientists (NOC 21211)", "Cybersecurity Specialists (NOC 21220)", "Cloud Architects"],
        officialListTitle: "Express Entry Category-Based Selection (STEM Category)",
        fastTrackBenefits: "Invited to apply for PR at significantly lower CRS cutoff scores (typically 40–70 points lower than general draws)."
      },
      {
        sector: "Healthcare & Social Assistance",
        roles: ["Registered Nurses (NOC 31301)", "Medical Laboratory Technologists", "Clinical Psychologists"],
        officialListTitle: "Express Entry Healthcare Category",
        fastTrackBenefits: "Priority invitation rounds and dedicated Provincial Nominee Program (PNP) streams with guaranteed PR pathways."
      },
      {
        sector: "Trades, Transport & Agriculture",
        roles: ["Industrial Electricians", "Welders", "Heavy Equipment Operators"],
        officialListTitle: "Federal Skilled Trades Program (FSTP)",
        fastTrackBenefits: "Low CRS points barrier and rapid provincial processing."
      }
    ],
    interviewCulture: {
      typicalRounds: [
        "Initial Phone / Video Screen with Talent Acquisition (20–30 min)",
        "Technical / Role-Specific Assessment (Take-home project or live coding)",
        "Panel Interview: Cross-functional behavioral discussion focusing on collaboration, EDI, and workplace empathy"
      ],
      localEtiquette: [
        "Canadian business culture values politeness, collaborative teamwork, and inclusive communication",
        "Demonstrate adaptability and readiness to contribute to Canadian community life",
        "Send a thoughtful personalized thank-you email within 24 hours of each interview stage"
      ],
      turnaroundTime: "3 to 5 weeks from initial application to offer letter"
    },
    livingCostVsEarnings: {
      avgStudentRent: "C$600 – C$950 / mo in Calgary/Montreal/Ottawa; C$1,000 – C$1,500 in Toronto/Vancouver",
      avgMonthlyLiving: "C$1,200 – C$1,900 / mo total",
      partTimeEarningsCoverage: "With the new 24-hr/week limit at C$17.30/hr, students can earn C$1,700–C$1,800/mo gross (~C$1,450 net), covering almost 90%–100% of monthly living costs!"
    }
  },

  germany: {
    code: "germany",
    countryName: "Germany",
    flag: "🇩🇪",
    currency: "EUR",
    currencySymbol: "€",
    minWageGross: "€12.41 / hour (Gesetzlicher Mindestlohn)",
    minWageNet: "€10.10 – €10.80 / hour net (Werkstudent tax privileges)",
    termHourLimit: "140 full days or 280 half days per calendar year (approx. 20 hrs/week)",
    holidayHourLimit: "Full-time Werkstudent hours permitted during semester breaks",
    statutoryAnnualLeave: "20 to 30 paid vacation days (standard German contracts provide 28–30 days!)",
    standardWorkWeek: "35 to 40 hours / week (IG Metall 35-hour week standard in industrial engineering)",
    commuterSubsidyRule: "Deutschlandticket Jobticket: subsidized nationwide unlimited transit for €34.30/month",
    mealVoucherPerk: "Subsidized corporate canteen (Betriebskantine) offering gourmet meals for €3–€5",
    postStudyVisaName: "18-Month Jobseeker Residence Permit (Section 20(3) AufenthG)",
    postStudyDuration: "18 Months to find qualified employment directly related to degree",
    prPathwayName: "EU Blue Card & Settlement Permit (Niederlassungserlaubnis)",
    prEligibilityYears: "Only 21 months of Blue Card employment required with B1 German (or 27 months with A1)!",
    officialJobPortal: "Bundesagentur für Arbeit (arbeitsagentur.de), StepStone.de, Xing, LinkedIn Germany",
    nationalEmploymentAgency: "Bundesagentur für Arbeit (BA): provides free job matching, international career fairs, and fast-track labor pre-approvals for graduates",
    cvFormatRules: {
      photoRequired: "Mandatory / Expected",
      lengthPages: "1 to 2 pages (Tabellarischer Lebenslauf format)",
      keySections: [
        "Persönliche Daten (Contact, Address, Birthplace, Nationality)",
        "Beruflicher Werdegang (Work experience reverse chronological)",
        "Akademische Ausbildung (Degree titles, German grade equivalents)",
        "Kenntnisse & Qualifikationen (IT, Certifications, Language CEFR)",
        "Ort, Datum & Unterschrift (Place, Date & Handwritten signature at bottom!)"
      ],
      dosAndDonts: [
        "DO attach a formal, high-resolution professional headshot (Bewerbungsfoto)",
        "DO convert your GPA to the German 1.0–5.0 scale (1.0 = Sehr Gut, 2.0 = Gut)",
        "DO sign your Lebenslauf with date, city, and physical/digital signature at the very bottom",
        "DO mention language proficiency accurately (German B1/B2, English C1)"
      ]
    },
    salaryBenchmarks: [
      {
        discipline: "Automotive, Embedded Systems & Robotics",
        juniorSalary: "€52,000 – €64,000",
        midSalary: "€68,000 – €88,000",
        seniorSalary: "€95,000 – €135,000+",
        topEmployers: ["BMW Group", "Mercedes-Benz", "Porsche", "Bosch", "Siemens", "Continental"],
        inDemandSkills: ["C++17/20", "Embedded Linux", "AUTOSAR", "ROS2", "Simulink", "CAN/Ethernet"]
      },
      {
        discipline: "Software Engineering & Enterprise Cloud",
        juniorSalary: "€50,000 – €62,000",
        midSalary: "€66,000 – €85,000",
        seniorSalary: "€92,000 – €125,000",
        topEmployers: ["SAP SE", "Delivery Hero", "Zalando", "Celonis", "Infineon", "TeamViewer"],
        inDemandSkills: ["Java / Spring Boot", "TypeScript", "AWS / Azure", "Kubernetes", "PostgreSQL"]
      },
      {
        discipline: "Industrial Clean Energy & Chemical Engineering",
        juniorSalary: "€48,000 – €58,000",
        midSalary: "€62,000 – €80,000",
        seniorSalary: "€88,000 – €120,000",
        topEmployers: ["BASF", "Bayer", "Covestro", "E.ON", "RWE", "Henkel"],
        inDemandSkills: ["Process Engineering", "Hydrogen Tech", "Battery Systems", "Six Sigma", "Aspen Plus"]
      },
      {
        discipline: "Supply Chain & Industrial Management",
        juniorSalary: "€46,000 – €56,000",
        midSalary: "€60,000 – €78,000",
        seniorSalary: "€85,000 – €115,000",
        topEmployers: ["DHL Group", "Lufthansa Cargo", "Kühne + Nagel", "Beiersdorf", "Adidas"],
        inDemandSkills: ["SAP S/4HANA", "Supply Chain Analytics", "Logistics Optimization", "Procurement"]
      }
    ],
    visaRoadmap: [
      {
        stage: "Stage 01",
        title: "German Student Residence Permit (16b AufenthG)",
        duration: "1 to 3 Years",
        requirements: ["University admission letter", "Blocked Bank Account (€11,904/year)", "Public health insurance (TK/AOK)"],
        keyOutcome: "Authorized to work 140 full days or 280 half days per year with Werkstudent status."
      },
      {
        stage: "Stage 02",
        title: "18-Month Jobseeker Permit (Section 20(3))",
        duration: "18 Months",
        requirements: ["German university degree certificate", "Proof of living funds for the stay"],
        keyOutcome: "Unrestricted right to work in any role while seeking a qualified graduate position."
      },
      {
        stage: "Stage 03",
        title: "EU Blue Card (Blaue Karte EU)",
        duration: "4 Years (Renewable)",
        requirements: ["Job offer related to degree", "Minimum salary threshold (€45,300, or €41,041 for shortage STEM/IT roles)"],
        keyOutcome: "Prestige EU residency status with fast-track permanent residency rights."
      },
      {
        stage: "Stage 04",
        title: "German Settlement Permit (Niederlassungserlaubnis)",
        duration: "Permanent",
        requirements: ["Only 21 months of Blue Card employment with B1 German (or 27 months with A1)", "Clean criminal record"],
        keyOutcome: "Unrestricted permanent residency in Germany, followed by German citizenship after 3–5 years!"
      }
    ],
    taxInfo: {
      brackets: [
        { bracket: "Up to €11,784 (Grundfreibetrag)", rate: "0% (Tax-Free)" },
        { bracket: "€11,785 – €66,760", rate: "14% – 42% (Progressive)" },
        { bracket: "€66,761 – €277,825", rate: "42%" },
        { bracket: "Above €277,825", rate: "45%" }
      ],
      socialDeductions: "Approx. 20% social security (Health 7.3%, Pension 9.3%, Care 2.2%, Unemployment 1.3%) matched equally by employer!",
      estimatedNetMultiplier: 0.65,
      taxIdName: "Steuer-Identifikationsnummer (Steuer-ID) & Sozialversicherungsnummer",
      taxFilingDeadline: "July 31 annually via ELSTER online portal",
      studentExemptions: "Werkstudenten are legally exempt from health and unemployment insurance contributions on their paychecks!"
    },
    shortageOccupations: [
      {
        sector: "IT, Software & Artificial Intelligence",
        roles: ["Software Architect", "Full-Stack Engineer", "IT Security Consultant", "Cloud Engineer"],
        officialListTitle: "Mangelberufe (Skilled Immigration Act / Fachkräfteeinwanderungsgesetz)",
        fastTrackBenefits: "Lower EU Blue Card minimum salary threshold (€41,041 vs €45,300); IT specialists without a university degree can qualify with 3 years practical experience!"
      },
      {
        sector: "Mechanical, Automotive & Electrical Engineering",
        roles: ["Robotics Engineer", "Automotive Software Developer", "Power Grid Systems Engineer"],
        officialListTitle: "Ingenieurberufe Mangelberufe (BA Positivliste)",
        fastTrackBenefits: "Accelerated visa approval via Federal Employment Agency pre-approval (Vorabzustimmung)."
      },
      {
        sector: "Healthcare & Life Sciences",
        roles: ["Physician (Assistenzarzt)", "Nurse", "Biotechnologist"],
        officialListTitle: "Gesundheitsberufe Engpassanalyse",
        fastTrackBenefits: "Fast-track medical license recognition (Approbation) and immediate EU Blue Card eligibility."
      }
    ],
    interviewCulture: {
      typicalRounds: [
        "Personalgespräch / HR Screening (30 min): Credentials verification, language check (German/English)",
        "Fachgespräch (60–90 min): Deep technical grilling with senior engineers; code review or system architecture whiteboard",
        "Vertragsverhandlung (Offer & Contract Review): Discussion of Tarifvertrag (collective agreement) bracket, holiday days, and pension"
      ],
      localEtiquette: [
        "Punctuality is sacred: arrive exactly 5–10 minutes early (being late is an instant disqualifier)",
        "Back up every claim with concrete certificates (Zeugnisse) and documented technical proof",
        "Even in English-speaking tech environments, basic conversational German (A2/B1) drastically enhances your hiring probability"
      ],
      turnaroundTime: "3 to 6 weeks"
    },
    livingCostVsEarnings: {
      avgStudentRent: "€350 – €600 / mo in Leipzig/Aachen/Dresden; €650 – €950 in Munich/Berlin",
      avgMonthlyLiving: "€850 – €1,200 / mo total",
      partTimeEarningsCoverage: "Werkstudent roles paying €14–€18/hr for 20 hrs/week generate €1,100–€1,450/mo, easily covering 100% of living expenses throughout Germany!"
    }
  },

  australia: {
    code: "australia",
    countryName: "Australia",
    flag: "🇦🇺",
    currency: "AUD",
    currencySymbol: "A$",
    minWageGross: "A$24.10 / hour (Fair Work Commission national minimum wage — highest in the world!)",
    minWageNet: "A$21.50 – A$23.00 / hour net",
    termHourLimit: "Up to 48 hours per fortnight (2-week block) during university terms",
    holidayHourLimit: "Unrestricted unlimited hours during university scheduled vacations",
    statutoryAnnualLeave: "4 weeks (20 paid working days) + public holidays",
    standardWorkWeek: "38 hours / week",
    commuterSubsidyRule: "Tertiary student concession fares on Opal (NSW), myki (VIC), and Translink (QLD) (up to 50% discount)",
    mealVoucherPerk: "Superannuation guarantee: employers pay an additional 11.5% into your retirement fund on top of your salary!",
    postStudyVisaName: "Temporary Graduate Visa (Subclass 485)",
    postStudyDuration: "2 to 4 Years (with additional regional study credits of +1 to +2 years)",
    prPathwayName: "Permanent Residency via Skilled Independent (Subclass 189/190) or Employer Sponsored (Subclass 186)",
    prEligibilityYears: "2 to 3 years points accumulation based on Australian study and skilled employment",
    officialJobPortal: "SEEK (seek.com.au), Jora Australia, LinkedIn Australia, GradConnection",
    nationalEmploymentAgency: "Workforce Australia & Fair Work Ombudsman: strictly enforces national wage compliance and penalty rates",
    cvFormatRules: {
      photoRequired: "Strictly Prohibited (Anti-discrimination)",
      lengthPages: "2 to 3 pages standard in Australia with detailed bullet points",
      keySections: [
        "Contact Details (Australian mobile number, Suburb/State, LinkedIn)",
        "Career Objective / Professional Summary",
        "Key Technical & Interpersonal Competencies",
        "Relevant Employment History (Reverse chronological)",
        "Education & Australian Degree Details",
        "Professional References (2 referees available upon request)"
      ],
      dosAndDonts: [
        "DON'T include a photo, date of birth, age, marital status, or full home address",
        "DO list your visa entitlement: 'Subclass 500 / Subclass 485 with full work rights'",
        "DO state your availability in Australian fortnight terms: 'Available 48 hrs/fortnight'",
        "DO include local referee contacts who can vouch for your character and reliability"
      ]
    },
    salaryBenchmarks: [
      {
        discipline: "Software Engineering, Cybersecurity & Cloud",
        juniorSalary: "A$78,000 – A$95,000 (+ 11.5% super)",
        midSalary: "A$110,000 – A$145,000",
        seniorSalary: "A$160,000 – A$220,000+",
        topEmployers: ["Atlassian", "Canva", "Macquarie Bank", "Telstra", "Commonwealth Bank", "Optus"],
        inDemandSkills: ["React / TypeScript", "AWS", "Python", "Kubernetes", "Zero Trust Security", "Java"]
      },
      {
        discipline: "Mining, Civil, Structural & Mechanical Engineering",
        juniorSalary: "A$85,000 – A$105,000 (+ FIFO allowances)",
        midSalary: "A$120,000 – A$160,000",
        seniorSalary: "A$180,000 – A$260,000+",
        topEmployers: ["BHP", "Rio Tinto", "Fortescue Metals", "Woodside Energy", "Worley", "Arup"],
        inDemandSkills: ["Mine Planning", "AutoCAD / MicroStation", "Geotech", "Subsea Systems", "HAZOP"]
      },
      {
        discipline: "Accounting, Audit & Financial Advisory",
        juniorSalary: "A$65,000 – A$82,000",
        midSalary: "A$92,000 – A$125,000",
        seniorSalary: "A$140,000 – A$200,000+",
        topEmployers: ["PwC Australia", "EY Australia", "KPMG", "Deloitte", "Macquarie Capital", "ANZ Bank"],
        inDemandSkills: ["CPA / CA Pathway", "Financial Statement Audit", "AASB Standards", "Power BI"]
      },
      {
        discipline: "Healthcare, Nursing & Biomedical Science",
        juniorSalary: "A$74,000 – A$88,000 (+ shift penalties)",
        midSalary: "A$95,000 – A$120,000",
        seniorSalary: "A$130,000 – A$175,000",
        topEmployers: ["NSW Health", "Ramsay Health Care", "Sonic Healthcare", "CSL Limited", "Cochlear"],
        inDemandSkills: ["AHPRA Registration", "Critical Care", "Clinical Documentation", "Biomedical Devices"]
      }
    ],
    visaRoadmap: [
      {
        stage: "Stage 01",
        title: "Student Visa (Subclass 500)",
        duration: "1 to 4 Years",
        requirements: ["Confirmation of Enrolment (CoE)", "Genuine Student (GS) assessment", "OSHC health insurance", "Financial capacity"],
        keyOutcome: "Authorized to work up to 48 hours per fortnight during semester, unlimited in breaks."
      },
      {
        stage: "Stage 02",
        title: "Temporary Graduate Visa (Subclass 485)",
        duration: "2 to 4 Years (+1–2 yrs regional)",
        requirements: ["CRICOS-registered degree (min 2 academic years in Australia)", "IELTS 6.5 minimum", "Apply within 6 months of graduation"],
        keyOutcome: "Full unrestricted work rights anywhere in Australia with any employer."
      },
      {
        stage: "Stage 03",
        title: "Permanent Residency (Subclass 189 / 190 / 186)",
        duration: "Permanent",
        requirements: ["Skills Assessment in nominated occupation on MLTSSL list", "Points test threshold (65+ points)"],
        keyOutcome: "Permanent residency status granting Medicare, citizen-rate tuition, and pathway to Australian passport."
      },
      {
        stage: "Stage 04",
        title: "Australian Citizenship",
        duration: "Lifelong",
        requirements: ["4 years continuous lawful residence in Australia", "At least 12 months as Permanent Resident"],
        keyOutcome: "Full Australian Passport with freedom to live and work in Australia and New Zealand."
      }
    ],
    taxInfo: {
      brackets: [
        { bracket: "Up to A$18,200", rate: "0% (Tax-Free Threshold)" },
        { bracket: "A$18,201 – A$45,000", rate: "16%" },
        { bracket: "A$45,001 – A$135,000", rate: "30%" },
        { bracket: "A$135,001 – A$190,000", rate: "37%" },
        { bracket: "Above A$190,000", rate: "45%" }
      ],
      socialDeductions: "Medicare Levy: 2% (low-income thresholds apply; international students on OSHC may apply for exemption)",
      estimatedNetMultiplier: 0.82,
      taxIdName: "Tax File Number (TFN)",
      taxFilingDeadline: "October 31 annually via myGov and the Australian Taxation Office (ATO)",
      studentExemptions: "First A$18,200 earned every fiscal year is 100% tax-free under Australian resident tax rates!"
    },
    shortageOccupations: [
      {
        sector: "Mining, Resources & Renewable Energy",
        roles: ["Mining Engineer (ANZSCO 233611)", "Petroleum Engineer", "Geotechnical Engineer", "Solar & Wind Project Specialist"],
        officialListTitle: "Medium and Long-term Strategic Skills List (MLTSSL)",
        fastTrackBenefits: "Eligible for direct permanent residency via Subclass 189/190 with high point allocations."
      },
      {
        sector: "Information & Communication Technology",
        roles: ["Developer Programmer (ANZSCO 261312)", "ICT Security Specialist", "Software Engineer", "Systems Analyst"],
        officialListTitle: "ACS Skilled Migration List",
        fastTrackBenefits: "High state nomination quota allocations across NSW, Victoria, and Queensland."
      },
      {
        sector: "Nursing & Allied Health",
        roles: ["Registered Nurse (Aged Care / Critical Care)", "Midwife", "Physiotherapist", "Medical Diagnostic Radiographer"],
        officialListTitle: "Priority Migration Skilled Occupation List",
        fastTrackBenefits: "Fast-track invitation rounds, often invited within weeks of SkillSelect EOI submission."
      }
    ],
    interviewCulture: {
      typicalRounds: [
        "Introductory Phone Chat with Talent Partner (15–20 min): Culture fit and visa entitlement",
        "Hiring Manager Technical Interview (45–60 min): Portfolio review and situational engineering scenarios",
        "Values & 'Can-Do' Team Interview: Australian workplace culture puts massive emphasis on being approachable, down-to-earth, and a solid team player ('No dickheads' policy)"
      ],
      localEtiquette: [
        "Be authentic and conversational; overly stiff or hierarchical communication is viewed negatively",
        "Emphasize safety awareness (OH&S) in engineering and mining roles",
        "Ensure your referees are informed in advance, as Australian employers ALWAYS call referees before making an offer"
      ],
      turnaroundTime: "2 to 4 weeks"
    },
    livingCostVsEarnings: {
      avgStudentRent: "A$220 – A$380 / week in Adelaide/Brisbane/Perth; A$350 – A$550 / week in Sydney/Melbourne",
      avgMonthlyLiving: "A$1,600 – A$2,400 / mo total",
      partTimeEarningsCoverage: "With Australia's world-leading A$24.10/hr minimum wage (and weekend penalty rates of A$30–A$36/hr), working 24 hrs/wk generates A$2,400–A$3,000/mo, fully covering accommodation and living expenses!"
    }
  },

  ireland: {
    code: "ireland",
    countryName: "Ireland",
    flag: "🇮🇪",
    currency: "EUR",
    currencySymbol: "€",
    minWageGross: "€12.70 / hour (National Minimum Wage for age 20+)",
    minWageNet: "€10.80 – €11.40 / hour net",
    termHourLimit: "Up to 20 hours / week during official academic terms",
    holidayHourLimit: "Up to 40 hours / week in June, July, August, September & Dec 15 to Jan 15",
    statutoryAnnualLeave: "20 paid working days (4 working weeks) + 10 Irish public holidays",
    standardWorkWeek: "39 hours / week",
    commuterSubsidyRule: "TaxSaver Commuter Ticket scheme (up to 52% tax relief on monthly train/bus passes)",
    mealVoucherPerk: "Small Benefit Exemption: employers can give €1,000/year tax-free shopping vouchers to staff",
    postStudyVisaName: "Third Level Graduate Scheme (Stamp 1G)",
    postStudyDuration: "24 Months for Master's graduates; 12 Months for Bachelor's graduates",
    prPathwayName: "Critical Skills Employment Permit (CSEP) -> Stamp 4 Permanent Residence",
    prEligibilityYears: "Only 2 years of employment on a Critical Skills Permit required for Stamp 4 PR!",
    officialJobPortal: "IrishJobs.ie, JobsIreland.ie, LinkedIn Ireland, GradIreland",
    nationalEmploymentAgency: "JobsIreland & Intreo (Department of Social Protection): state employment service matching international graduates with European tech and pharma employers",
    cvFormatRules: {
      photoRequired: "Strictly Prohibited (Anti-discrimination)",
      lengthPages: "2 pages standard in Ireland for university graduates",
      keySections: [
        "Contact Information (Dublin/Irish address, Phone, Email, LinkedIn)",
        "Career Profile (3-line summary of skills and ambition)",
        "Key Technical & Soft Skills",
        "Employment History (Reverse chronological)",
        "Education & Academic Honors",
        "References (Available on request)"
      ],
      dosAndDonts: [
        "DON'T include a photo, age, marital status, or PPS Number on your CV",
        "DO mention your right to work: 'Eligible for 2-Year Third Level Graduate Scheme (Stamp 1G)'",
        "DO quantify academic achievements (e.g., 'First Class Honours / 1.1 degree')",
        "DO tailor keywords to Dublin's European tech and life sciences cluster"
      ]
    },
    salaryBenchmarks: [
      {
        discipline: "Cloud Engineering, DevOps & Cybersecurity",
        juniorSalary: "€44,000 – €55,000",
        midSalary: "€62,000 – €82,000",
        seniorSalary: "€95,000 – €140,000+",
        topEmployers: ["Google Dublin", "Meta EMEA", "AWS Ireland", "Microsoft Ireland", "Stripe Dublin", "Salesforce"],
        inDemandSkills: ["Python", "Kubernetes", "AWS / Azure", "Golang", "Cybersecurity", "Distributed Systems"]
      },
      {
        discipline: "Biopharma, Medical Devices & Quality Engineering",
        juniorSalary: "€40,000 – €50,000",
        midSalary: "€58,000 – €75,000",
        seniorSalary: "€85,000 – €120,000",
        topEmployers: ["Pfizer Ireland", "Johnson & Johnson", "Boston Scientific", "Medtronic", "Novartis"],
        inDemandSkills: ["GMP Compliance", "Validation Engineering", "Quality Assurance", "Bioprocessing"]
      },
      {
        discipline: "Aviation Finance, FinTech & Fund Accounting",
        juniorSalary: "€38,000 – €48,000",
        midSalary: "€55,000 – €74,000",
        seniorSalary: "€88,000 – €135,000",
        topEmployers: ["AerCap", "SMBC Aviation Capital", "State Street", "BNY Mellon", "Fidelity International"],
        inDemandSkills: ["Aircraft Leasing Law", "Fund Accounting", "IFRS", "Financial Analysis", "Excel Modeling"]
      },
      {
        discipline: "Data Analytics, AI & Digital Marketing",
        juniorSalary: "€38,000 – €48,000",
        midSalary: "€52,000 – €70,000",
        seniorSalary: "€80,000 – €115,000",
        topEmployers: ["TikTok Dublin", "LinkedIn EMEA", "HubSpot", "Accenture Ireland", "EY Dublin"],
        inDemandSkills: ["SQL", "Tableau / Power BI", "Python", "SEO / SEM Analytics", "Attribution Modeling"]
      }
    ],
    visaRoadmap: [
      {
        stage: "Stage 01",
        title: "Stamp 2 Student Permission",
        duration: "1 to 2 Years",
        requirements: ["Letter of acceptance from ILEP-listed institution", "€10,000 proof of living funds", "Private medical insurance"],
        keyOutcome: "Authorized to work 20 hrs/week term-time, 40 hrs/week during specified holiday months."
      },
      {
        stage: "Stage 02",
        title: "Third Level Graduate Scheme (Stamp 1G)",
        duration: "24 Months (12 mos for Bachelor)",
        requirements: ["Completed degree at recognized Irish institution", "Application at local immigration office before Stamp 2 expiry"],
        keyOutcome: "Full-time open work authorization across Ireland without company sponsorship."
      },
      {
        stage: "Stage 03",
        title: "Critical Skills Employment Permit (CSEP)",
        duration: "2 Years",
        requirements: ["Job offer on Ireland's Critical Skills Occupations List", "Minimum base salary of €38,000/year"],
        keyOutcome: "Fast-track employment permit with immediate right to bring spouse and family."
      },
      {
        stage: "Stage 04",
        title: "Stamp 4 Permanent Residence & Citizenship",
        duration: "Permanent",
        requirements: ["2 years of continuous employment on Critical Skills permit", "Irish naturalisation eligible after 5 years residency"],
        keyOutcome: "Permanent right to work in Ireland without any work permit; full Irish and EU passport eligibility."
      }
    ],
    taxInfo: {
      brackets: [
        { bracket: "Up to €42,000 (Standard Rate Band)", rate: "20%" },
        { bracket: "Above €42,000 (Higher Rate)", rate: "40%" }
      ],
      socialDeductions: "PRSI (Pay Related Social Insurance 4%) + USC (Universal Social Charge 0.5%–4%)",
      estimatedNetMultiplier: 0.76,
      taxIdName: "Personal Public Service (PPS) Number",
      taxFilingDeadline: "PAYE automatically collected; annual tax returns via Revenue.ie by October 31",
      studentExemptions: "Single person tax credit (€1,875) + Employee PAYE tax credit (€1,875) provides substantial relief on initial earnings!"
    },
    shortageOccupations: [
      {
        sector: "Information & Communications Technology (ICT)",
        roles: ["Software Engineers", "Cloud Solutions Architects", "Data Analysts", "IT Security Managers"],
        officialListTitle: "Critical Skills Occupations List (DETE Ireland)",
        fastTrackBenefits: "No labor market needs test (LMNT) required; immediate 2-year Stamp 1G to CSEP transition, fast-tracking to Stamp 4 PR in 2 years."
      },
      {
        sector: "Biotechnology & Pharmaceutical Sciences",
        roles: ["Validation Engineers", "Biochemists", "Quality Control Scientists", "Process Automation Engineers"],
        officialListTitle: "Critical Skills List - Natural & Social Science Professionals",
        fastTrackBenefits: "Direct corporate sponsorship by Dublin, Cork, and Galway biopharma clusters with immediate spouse work rights."
      },
      {
        sector: "Aviation & Financial Engineering",
        roles: ["Aircraft Maintenance Engineers", "Actuaries", "Risk Analysts", "Fund Accountants"],
        officialListTitle: "Critical Skills List - Business & Finance",
        fastTrackBenefits: "Eligible for fast-track permit processing within 2 to 3 weeks via EPOS portal."
      }
    ],
    interviewCulture: {
      typicalRounds: [
        "Initial Phone Screen with Talent Acquisition (20 min)",
        "Technical / Competency Assessment (Take-home case or technical live interview)",
        "Cultural & Team Fit (Irish workplace values warmth, storytelling, relational trust, and direct feedback)"
      ],
      localEtiquette: [
        "Dublin's 'Silicon Docks' ecosystem blends American tech pace with Irish friendliness ('Craic')",
        "Highlight previous team initiatives and collaborative problem-solving",
        "Demonstrate practical knowledge of European data privacy (GDPR) and European commercial markets"
      ],
      turnaroundTime: "2 to 4 weeks"
    },
    livingCostVsEarnings: {
      avgStudentRent: "€600 – €850 / mo in Cork/Galway/Limerick; €850 – €1,250 in Dublin",
      avgMonthlyLiving: "€1,000 – €1,600 / mo total",
      partTimeEarningsCoverage: "At €12.70/hr, working 20 hours/week provides ~€1,100/mo gross (~€950 net), significantly mitigating living expenses!"
    }
  }
};
