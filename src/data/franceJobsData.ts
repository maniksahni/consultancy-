export type FranceJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  region: string;
  contractType: "Student Part-Time (964 hrs/yr)" | "Internship (Convention de Stage)" | "Graduate CDI / Full-Time (APS Visa)" | "Apprenticeship (Alternance)";
  compensation: string;
  hourlyRate?: string;
  legalBasis: string;
  field: "Tech & AI" | "Finance & Banking" | "Luxury & Retail" | "Hospitality & Food" | "Education & Tutoring" | "Engineering & Aerospace" | "Marketing & Media";
  languageRequired: "English Only" | "English + Basic French (A2)" | "Fluent French (B2/C1)";
  description: string;
  responsibilities: string[];
  qualifications: string[];
  visaEligibility: string;
};

export const franceJobsList: FranceJob[] = [
  {
    id: "job-ai-intern-mistral",
    title: "AI & Machine Learning Research Intern",
    company: "Mistral AI / Tech Hub Paris",
    location: "Paris (75002 - Sentier)",
    region: "Île-de-France",
    contractType: "Internship (Convention de Stage)",
    compensation: "€1,600 / month + 50% Navigo pass + Restaurant vouchers (€10/day)",
    legalBasis: "Mandatory Convention de Stage signed with university; legal min gratification €4.35/hr exceeded",
    field: "Tech & AI",
    languageRequired: "English Only",
    description: "Work alongside premier research scientists on foundation models, fine-tuning techniques, and evaluation benchmarks. A direct path to full-time CDI offers upon graduation.",
    responsibilities: [
      "Implement evaluation benchmarks for open-weight language models",
      "Develop dataset curation and filtering pipelines in Python / PyTorch",
      "Collaborate with engineering teams on inference acceleration via TensorRT-LLM",
      "Present technical findings in bi-weekly engineering brown-bag sessions"
    ],
    qualifications: [
      "Enrolled in Master's (M1 or M2) in Computer Science, AI, or Mathematics",
      "Solid proficiency in Python, PyTorch, and Git",
      "Experience with transformer models and Hugging Face libraries"
    ],
    visaEligibility: "Standard French student visa (VLS-TS). University provides the mandatory 3-party Convention de Stage."
  },
  {
    id: "job-eng-tutor-paris",
    title: "English Language Specialist & Academic Tutor",
    company: "Speaking-Agency / International Language Paris",
    location: "Paris & Neuilly-sur-Seine",
    region: "Île-de-France",
    contractType: "Student Part-Time (964 hrs/yr)",
    compensation: "€15.00 – €18.50 / hour (approx. €650 – €850/mo for 10-12 hrs/week)",
    hourlyRate: "€16.50 / hr",
    legalBasis: "Within French annual student cap of 964 hours (60% of 1,607 annual hours). No work permit required.",
    field: "Education & Tutoring",
    languageRequired: "English Only",
    description: "A flexible and popular part-time role for international students. Teach English to French professionals or school students. Flexible scheduling around your university lectures.",
    responsibilities: [
      "Conduct conversational English sessions and interactive vocabulary workshops",
      "Prepare high school students for Cambridge / TOEFL examinations",
      "Provide constructive weekly progress feedback"
    ],
    qualifications: [
      "Native or near-native English fluency (C1/C2)",
      "Punctuality and engaging communication skills",
      "Valid French student visa (VLS-TS)"
    ],
    visaEligibility: "100% compliant with student visa rights. Automatically authorized to work upon arrival."
  },
  {
    id: "job-finance-bnp",
    title: "Junior Financial Analyst — Global Markets",
    company: "BNP Paribas Corporate & Institutional Banking (CIB)",
    location: "Paris (La Défense Financial District)",
    region: "Île-de-France",
    contractType: "Graduate CDI / Full-Time (APS Visa)",
    compensation: "€48,000 – €54,000 / year + annual performance bonus (approx. €8,000)",
    legalBasis: "Eligible for APS / RECE 2-Year Post-Study Work Visa (Indo-French agreement) and Passeport Talent Salarié Qualifié.",
    field: "Finance & Banking",
    languageRequired: "English Only",
    description: "Launch your banking career in continental Europe's leading financial hub. Analyze structured derivatives, monitor cross-border credit risks, and support trade execution for European clients.",
    responsibilities: [
      "Prepare quantitative risk models and daily sensitivity reports for trading desks",
      "Perform scenario testing and portfolio stress tests under Basel IV guidelines",
      "Automate reporting pipelines using Python and SQL"
    ],
    qualifications: [
      "Master's degree from a recognized French university or Grande École",
      "Strong background in corporate finance, financial mathematics, or econometrics",
      "Excel, Python, and Bloomberg / FactSet proficiency"
    ],
    visaEligibility: "Direct transition from Student Visa to 2-Year APS / RECE Post-Study Visa, followed by Salarié or Passeport Talent without labor market test."
  },
  {
    id: "job-luxury-dior",
    title: "Digital Retail & Merchandising Coordinator",
    company: "Christian Dior Couture (LVMH Group)",
    location: "Paris (8th Arrondissement - Avenue Montaigne)",
    region: "Île-de-France",
    contractType: "Internship (Convention de Stage)",
    compensation: "€1,450 / month + 100% public transport pass reimbursement + employee discount privileges",
    legalBasis: "6-Month French End-of-Studies Stage (Stage de fin d'études)",
    field: "Luxury & Retail",
    languageRequired: "English + Basic French (A2)",
    description: "Participate in global product assortment planning, e-commerce store optimization, and seasonal campaign launches for the world's most prestigious fashion house.",
    responsibilities: [
      "Monitor weekly sell-through performance across worldwide flagships",
      "Coordinate product visual digital assets for seasonal collection drops",
      "Assist category managers in inventory replenishment and boutique allocations"
    ],
    qualifications: [
      "Enrolled in Master's or MSc in Luxury, Marketing, or Business Administration",
      "Appreciation for haute couture, design aesthetics, and client journey",
      "Strong analytical mind and Excel modeling skills"
    ],
    visaEligibility: "Student Visa + signed university internship convention."
  },
  {
    id: "job-cafe-barista",
    title: "Specialty Coffee Barista & Customer Host",
    company: "Café Kitsuné / Saint-Germain",
    location: "Paris (6th Arrondissement - Saint-Germain-des-Prés)",
    region: "Île-de-France",
    contractType: "Student Part-Time (964 hrs/yr)",
    compensation: "€12.50 / hour + shared tips (approx. €600 – €750/month for 15 hours/week)",
    hourlyRate: "€12.50 / hr",
    legalBasis: "SMIC minimum wage (€11.65/hr gross) + bonus hourly rate",
    field: "Hospitality & Food",
    languageRequired: "English + Basic French (A2)",
    description: "Great social environment in historic central Paris. Perfect for students seeking weekend or evening shifts to offset living expenses while practicing everyday French with locals.",
    responsibilities: [
      "Prepare espresso beverages and specialty matcha drinks following recipes",
      "Welcome international and local guests with warmth and speed",
      "Maintain cleanliness and cash drawer reconciliations"
    ],
    qualifications: [
      "Positive hospitality attitude and enthusiasm",
      "Basic conversational French for customer greeting and orders",
      "Available for 12–15 hours weekly"
    ],
    visaEligibility: "Authorized under standard French student visa."
  },
  {
    id: "job-airbus-swe",
    title: "Avionics Software Systems Engineer",
    company: "Airbus Commercial Aircraft",
    location: "Toulouse (Blagnac Aerospace Valley)",
    region: "Occitanie",
    contractType: "Graduate CDI / Full-Time (APS Visa)",
    compensation: "€44,000 – €49,000 / year + profit-sharing (Intéressement / Participation €4,500/yr)",
    legalBasis: "Full permanent French CDI contract with French employment protections (35-hour work week + RTT days).",
    field: "Engineering & Aerospace",
    languageRequired: "English Only",
    description: "Join the European aerospace flagship in Toulouse. Design and validate flight management and cockpit communication architectures for the next generation of eco-efficient aircraft.",
    responsibilities: [
      "Develop embedded real-time software modules compliant with DO-178C standards",
      "Run hardware-in-the-loop (HIL) test suites on flight simulation benches",
      "Contribute to continuous integration pipelines (GitLab CI, C++, Python)"
    ],
    qualifications: [
      "Master's / Diplôme d'Ingénieur in Aerospace, Embedded Systems, or Computer Engineering",
      "Proficiency in C, C++, and Linux environments",
      "Knowledge of RTOS and avionics protocols (ARINC 429 / AFDX)"
    ],
    visaEligibility: "Company sponsors Passeport Talent - Salarié Qualifié or APS visa transition with full relocation allowance."
  },
  {
    id: "job-loreal-data",
    title: "Global Consumer Data & Analytics Intern",
    company: "L'Oréal Group",
    location: "Clichy / Paris Headquarters",
    region: "Île-de-France",
    contractType: "Internship (Convention de Stage)",
    compensation: "€1,400 – €1,550 / month + subsidized gourmet staff restaurant + gym access",
    legalBasis: "6-Month French Convention de Stage (mandatory internship)",
    field: "Tech & AI",
    languageRequired: "English Only",
    description: "Analyze beauty-tech trends, digital retail consumer engagement, and omnichannel e-commerce data across 150 international markets at the world's #1 cosmetics group.",
    responsibilities: [
      "Build automated Power BI and SQL dashboards tracking consumer behavior",
      "Run A/B test analysis on global digital campaigns and social marketing funnels",
      "Present actionable insights to brand general managers"
    ],
    qualifications: [
      "Enrolled in Master's in Data Science, Business Analytics, or Engineering",
      "Strong skills in SQL, Python, or R, plus Power BI / Tableau",
      "Curious, proactive mindset with fluent English"
    ],
    visaEligibility: "Student Visa + 3-party university internship convention."
  },
  {
    id: "job-campus-assistant",
    title: "International Student Welcome Desk Officer",
    company: "Campus France / University International Relations",
    location: "Paris (Latin Quarter - 5th Arrondissement)",
    region: "Île-de-France",
    contractType: "Student Part-Time (964 hrs/yr)",
    compensation: "€12.80 / hour (approx. €550 / month for 10 hours/week)",
    hourlyRate: "€12.80 / hr",
    legalBasis: "Student work contract with higher education institution (Emploi étudiant à l'université).",
    field: "Education & Tutoring",
    languageRequired: "English + Basic French (A2)",
    description: "Welcome incoming international students, guide newcomers on CAF housing subsidies, Navigo passes, and French health insurance (Ameli) registrations during orientation semester.",
    responsibilities: [
      "Staff the international student orientation desk and answer administrative inquiries",
      "Organize intercultural campus tours and social mixer events",
      "Assist students in navigating online student administrative portals"
    ],
    qualifications: [
      "Enrolled student at a French higher education institution",
      "Friendly, empathetic communication and multicultural awareness",
      "Basic understanding of French student administrative formalities"
    ],
    visaEligibility: "100% authorized on-campus student employment."
  },
  {
    id: "job-stationf-sdr",
    title: "International Sales Development Specialist",
    company: "Station F Paris (Tech Incubator)",
    location: "Paris (13th Arrondissement - Station F)",
    region: "Île-de-France",
    contractType: "Graduate CDI / Full-Time (APS Visa)",
    compensation: "€42,000 – €48,000 / year + uncapped quarterly commission (OTE €58,000)",
    legalBasis: "Full French permanent contract (CDI) with health coverage and equity stock options (BSPCE).",
    field: "Marketing & Media",
    languageRequired: "English Only",
    description: "Work at the world's largest startup campus in central Paris. Drive European and transatlantic market expansion for high-growth SaaS and enterprise AI scaleups.",
    responsibilities: [
      "Prospect and engage enterprise executives across the UK, Nordics, and North America",
      "Execute outbound multichannel sales cadences via LinkedIn and email",
      "Qualify sales opportunities and schedule strategic solution demos"
    ],
    qualifications: [
      "Master's in Management, International Business, or Marketing",
      "Persuasive verbal and written communication skills in English",
      "Resilient, goal-driven personality with hunger to learn"
    ],
    visaEligibility: "Direct APS / RECE visa eligibility leading to Passeport Talent French residency."
  },
  {
    id: "job-schneider-intern",
    title: "IoT & Sustainable Energy Systems Intern",
    company: "Schneider Electric Innovation Hub",
    location: "Grenoble (Alpine Clean-Tech Valley)",
    region: "Auvergne-Rhône-Alpes",
    contractType: "Internship (Convention de Stage)",
    compensation: "€1,350 / month + housing subsidy allowance",
    legalBasis: "6-Month French Convention de Stage",
    field: "Engineering & Aerospace",
    languageRequired: "English Only",
    description: "Work on smart microgrids and IoT energy efficiency systems in France's top environmental clean-tech cluster at the foot of the French Alps.",
    responsibilities: [
      "Develop telemetry monitoring dashboards for commercial smart grid installations",
      "Test IoT edge gateways and industrial automation protocols (Modbus, MQTT)",
      "Collaborate with international firmware engineers across France and Germany"
    ],
    qualifications: [
      "Enrolled in Master's / Engineering degree in Electrical, Embedded, or Clean Energy",
      "Knowledge of IoT architecture, Python, and sensor networks",
      "Passion for decarbonization and energy transition"
    ],
    visaEligibility: "Student Visa with university-signed Convention de Stage."
  },
  {
    id: "job-hotel-luxury",
    title: "Guest Relations & VIP Concierge Host",
    company: "Four Seasons Hotel George V",
    location: "Paris (8th Arrondissement - Golden Triangle)",
    region: "Île-de-France",
    contractType: "Student Part-Time (964 hrs/yr)",
    compensation: "€13.50 / hour + evening allowance + staff Michelin-star dining room privileges",
    hourlyRate: "€13.50 / hr",
    legalBasis: "Within French annual student cap of 964 hours. Paid above SMIC minimum.",
    field: "Hospitality & Food",
    languageRequired: "English + Basic French (A2)",
    description: "Experience the pinnacle of French palace hospitality. Assist high-profile international travelers, coordinate cultural itineraries, and uphold world-renowned luxury standards.",
    responsibilities: [
      "Welcome international guests at arrival and facilitate private check-in",
      "Coordinate VIP dining reservations, museum passes, and private chauffeur bookings",
      "Handle guest requests with utmost discretion and elegance"
    ],
    qualifications: [
      "Impeccable grooming, courtesy, and poise",
      "Fluent English and conversational French (other languages an asset)",
      "Available for weekend or evening shifts"
    ],
    visaEligibility: "Full student visa authorization."
  },
  {
    id: "job-capgemini-consultant",
    title: "Cloud & Technology Transformation Consultant",
    company: "Capgemini Invent",
    location: "Issy-les-Moulineaux / Paris",
    region: "Île-de-France",
    contractType: "Graduate CDI / Full-Time (APS Visa)",
    compensation: "€46,000 – €52,000 / year + profit-sharing + company laptop and mobile",
    legalBasis: "Permanent French CDI contract with Syntec convention collective benefits.",
    field: "Tech & AI",
    languageRequired: "English Only",
    description: "Advise CAC 40 and European Fortune 500 corporations on digital architecture modernization, cloud migrations (AWS / Azure), and enterprise agile delivery.",
    responsibilities: [
      "Conduct current-state technical architecture assessments and cost analyses",
      "Facilitate stakeholder discovery workshops and define cloud migration roadmaps",
      "Support enterprise program managers during high-stakes technology deployments"
    ],
    qualifications: [
      "Master's from a top French university, Grande École, or engineering school",
      "Sharp analytical problem-solving and structured communication",
      "Certifications in Cloud (AWS, Azure, or GCP) viewed favorably"
    ],
    visaEligibility: "Company handles full visa change of status (Changement de statut étudiant à salarié) under French law."
  }
];

export const frenchWorkRegulations = {
  smicHourlyGross: "€11.65",
  smicHourlyNet: "€9.22 (take-home approx)",
  annualHoursLimit: "964 hours per calendar year (approx. 60% of standard 1,607 hrs)",
  weeklyHoursDuringTerm: "Max 20 hours / week recommended to preserve academic success",
  weeklyHoursHolidays: "Up to 35 hours / week during official university vacation periods",
  internshipGratification: "Mandatory minimum of €4.35/hour for any internship lasting over 2 consecutive months (approx. €650–€800/mo tax-free)",
  apsVisaBenefits: [
    "2-Year Post-Study Work Visa for Indian students completing a Master's or higher degree in France (Indo-French Bilateral Agreement)",
    "Permits unrestricted full-time employment without an initial French labor market test (opposabilité de la situation de l'emploi)",
    "Switch directly to a 'Passeport Talent' or 'Salarié' residence card once securing a contract paying at least 1.5× SMIC (~€2,700/mo gross)",
    "Full Schengen travel freedom across 29 European countries during the entire 24 months"
  ],
  franceTravailInfo: "France Travail (the official French national employment agency, formerly Pôle Emploi) provides free career workshops, subsidized French language classes for professional employment, and accredited skill certifications to international graduates holding an APS/RECE visa."
};
