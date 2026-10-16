export type FranceDetailedProgramme = {
  id: string;
  title: string;
  institution: string;
  city: string;
  region: string;
  level: "Master" | "Bachelor" | "MSc";
  duration: string;
  credits: string;
  field: "AI & Technology" | "Business & Management" | "Engineering & Science" | "Data Science" | "Luxury & Fashion" | "Physics & Nanotech";
  language: string;
  tuitionEU: string;
  tuitionNonEU: string;
  intakes: string[];
  deadlines: { round: string; date: string }[];
  overview: string;
  curriculum: string[];
  eligibility: {
    degreeRequired: string;
    minGpa: string;
    englishTest: string;
    greGmat: string;
    workExperience: string;
  };
  careerOutcomes: {
    avgSalary: string;
    employmentRate: string;
    topEmployers: string[];
    typicalRoles: string[];
  };
  campusLife: {
    housingAvailability: string;
    monthlyLivingCost: string;
    campusLocation: string;
  };
};

export const comprehensiveProgrammes: FranceDetailedProgramme[] = [
  {
    id: "ups-ai",
    title: "Master in Artificial Intelligence & Machine Learning",
    institution: "Université Paris-Saclay",
    city: "Orsay / Paris Region",
    region: "Île-de-France",
    level: "Master",
    duration: "2 Years (4 Semesters)",
    credits: "120 ECTS",
    field: "AI & Technology",
    language: "100% English taught",
    tuitionEU: "€243 / year (Public standard)",
    tuitionNonEU: "€3,770 / year (Differentiated state fee or fee waiver)",
    intakes: ["September 2027 (Fall Intake)"],
    deadlines: [
      { round: "Round 1 (Priority & Eiffel Scholarship)", date: "November 30" },
      { round: "Round 2 (Standard International)", date: "February 28" },
      { round: "Round 3 (Final Études en France)", date: "May 15" }
    ],
    overview: "Ranked #1 in France and top 15 globally for Mathematics and Computer Science (Shanghai Ranking), Paris-Saclay's AI Master offers rigorous training in deep learning, computer vision, reinforcement learning, and mathematical foundations of AI, connected directly with CNRS and INRIA laboratories.",
    curriculum: [
      "Foundations of Machine Learning & Statistical Learning Theory",
      "Deep Learning Architectures, Transformers & LLM Engineering",
      "Reinforcement Learning & Autonomous Decision Systems",
      "Computer Vision & 3D Multimodal Perception",
      "Natural Language Processing & Speech Technologies",
      "Master Thesis & 6-Month Paid Industrial or Research Internship"
    ],
    eligibility: {
      degreeRequired: "Bachelor of Science / Engineering in Computer Science, Applied Maths, or related STEM",
      minGpa: "3.2 / 4.0 or 70%+ from recognized university",
      englishTest: "IELTS 6.5+ or TOEFL iBT 90+ (Medium of instruction letter accepted conditionally)",
      greGmat: "Not mandatory; strong quantitative background evaluated from transcripts",
      workExperience: "Not required; relevant internships or GitHub projects highly valued"
    },
    careerOutcomes: {
      avgSalary: "€48,000 – €62,000 / year",
      employmentRate: "97% employed within 4 months of graduation",
      topEmployers: ["Meta FAIR Paris", "Google DeepMind Paris", "Mistral AI", "Dassault Systèmes", "Capgemini Engineering", "Thales"],
      typicalRoles: ["Machine Learning Engineer", "AI Research Scientist", "Data Science Specialist", "Algorithm Developer"]
    },
    campusLife: {
      housingAvailability: "CROUS dorms on Plateau de Saclay (€350–€550/mo) + CAF allowance eligible",
      monthlyLivingCost: "€750 – €950 / month",
      campusLocation: "Paris-Saclay Innovation Cluster (accessible via RER B and upcoming Metro 18)"
    }
  },
  {
    id: "psl-ai",
    title: "International Bachelor of Science in Artificial Intelligence & Data",
    institution: "Université PSL (Paris Sciences & Lettres)",
    city: "Paris",
    region: "Île-de-France",
    level: "Bachelor",
    duration: "3 Years (6 Semesters)",
    credits: "180 ECTS",
    field: "AI & Technology",
    language: "100% English taught",
    tuitionEU: "€170 / year",
    tuitionNonEU: "€2,770 / year",
    intakes: ["September 2027"],
    deadlines: [
      { round: "International Track 1", date: "January 15" },
      { round: "International Track 2", date: "April 1" }
    ],
    overview: "Université PSL brings together elite schools including École Normale Supérieure, Mines Paris, and Dauphine. This undergraduate degree provides world-class mathematical and algorithmic foundations in central Paris.",
    curriculum: [
      "Linear Algebra, Calculus & Probability Theory for Computing",
      "Algorithm Design, Data Structures & Python/C++ Systems",
      "Statistical Inference & Exploratory Data Analysis",
      "Machine Learning Foundations & Ethics of AI",
      "Capstone Real-World Project with French Tech partner"
    ],
    eligibility: {
      degreeRequired: "High School Diploma / Grade 12 with strong Mathematics and Physics",
      minGpa: "80%+ in secondary school board examinations",
      englishTest: "IELTS 7.0 or TOEFL 95",
      greGmat: "N/A (Undergraduate)",
      workExperience: "None required; mathematical Olympiads or coding portfolios advantageous"
    },
    careerOutcomes: {
      avgSalary: "€44,000 – €54,000 / year (or direct entry to top Master's)",
      employmentRate: "95% continue to Grandes Écoles Master's or direct tech roles",
      topEmployers: ["Datadog", "Withings", "Criteo", "Sanofi AI Hub", "INRIA"],
      typicalRoles: ["Junior Data Engineer", "AI Developer", "Quantitative Analyst Trainee"]
    },
    campusLife: {
      housingAvailability: "Latin Quarter Paris student residences + Cité Internationale Universitaire",
      monthlyLivingCost: "€1,000 – €1,300 / month (Paris center)",
      campusLocation: "Central Paris (5th and 6th arrondissements)"
    }
  },
  {
    id: "ups-ibus",
    title: "Master in International Business & Sustainability Management",
    institution: "Université Paris-Saclay / Jean Monnet Faculty",
    city: "Sceaux / Paris",
    region: "Île-de-France",
    level: "Master",
    duration: "2 Years (4 Semesters)",
    credits: "120 ECTS",
    field: "Business & Management",
    language: "100% English taught",
    tuitionEU: "€243 / year",
    tuitionNonEU: "€3,770 / year",
    intakes: ["September 2027"],
    deadlines: [
      { round: "Autumn Selection Round", date: "December 15" },
      { round: "Spring Selection Round", date: "March 30" }
    ],
    overview: "A specialized Master designed for leaders tackling ecological transition, international market expansion, and ESG compliance across multinational corporations operating in the European single market.",
    curriculum: [
      "International Corporate Strategy & Geopolitics of Business",
      "Sustainable Supply Chain & Circular Economy Frameworks",
      "ESG Reporting, European Corporate Sustainability Directives (CSRD)",
      "Global Marketing & Cross-Cultural Negotiation",
      "6-Month Compulsory Management Internship in Europe"
    ],
    eligibility: {
      degreeRequired: "Bachelor's degree in Business, Economics, Management, or Social Sciences",
      minGpa: "65%+ or 3.0 / 4.0",
      englishTest: "IELTS 6.5 or TOEFL 88",
      greGmat: "Optional; GMAT 600+ strengthens international profile",
      workExperience: "Previous internship experience in business or non-profit preferred"
    },
    careerOutcomes: {
      avgSalary: "€43,000 – €55,000 / year",
      employmentRate: "94% employed within 6 months",
      topEmployers: ["L'Oréal", "Schneider Electric", "Danone", "Deloitte France", "BNP Paribas CSR"],
      typicalRoles: ["Sustainability Strategy Consultant", "International Business Developer", "ESG Compliance Analyst"]
    },
    campusLife: {
      housingAvailability: "Parc de Sceaux area student apartments + CROUS residences",
      monthlyLivingCost: "€800 – €1,050 / month",
      campusLocation: "Sceaux (Southern Paris suburbs, RER B 20 mins to Saint-Michel)"
    }
  },
  {
    id: "sorbonne-physics",
    title: "Paris International Physics Master",
    institution: "Sorbonne Université",
    city: "Paris",
    region: "Île-de-France",
    level: "Master",
    duration: "2 Years",
    credits: "120 ECTS",
    field: "Physics & Nanotech",
    language: "100% English taught",
    tuitionEU: "€243 / year",
    tuitionNonEU: "€3,770 / year",
    intakes: ["September 2027"],
    deadlines: [
      { round: "International Application Window", date: "January 31" },
      { round: "EU / Partner Window", date: "April 15" }
    ],
    overview: "Sorbonne University represents the pinnacle of French scientific heritage with numerous Nobel laureates in Physics. This program offers tracks in Quantum Physics, Nanomaterials, Condensed Matter, and Astrophysics.",
    curriculum: [
      "Advanced Quantum Mechanics & Many-Body Physics",
      "Statistical Field Theory & Nonlinear Phenomena",
      "Condensed Matter & Quantum Materials",
      "Photonics, Lasers & Nanotechnology",
      "Research Laboratory Placement at Pierre and Marie Curie campus"
    ],
    eligibility: {
      degreeRequired: "Bachelor in Physics, Engineering Physics, or Mathematics",
      minGpa: "First Class / 70%+",
      englishTest: "IELTS 6.5 or TOEFL 90",
      greGmat: "Physics GRE optional",
      workExperience: "Academic laboratory project required"
    },
    careerOutcomes: {
      avgSalary: "€46,000 – €60,000 / year",
      employmentRate: "98% (including funded PhDs and industrial R&D positions)",
      topEmployers: ["CEA (French Atomic Energy Commission)", "Thales Research", "Airbus Defence & Space", "ASML", "CNRS"],
      typicalRoles: ["Quantum Engineer", "R&D Physicist", "Photonics Systems Specialist", "Doctoral Researcher"]
    },
    campusLife: {
      housingAvailability: "Cité Universitaire + Sorbonne student housing quota",
      monthlyLivingCost: "€950 – €1,250 / month",
      campusLocation: "Jussieu Campus, 5th Arrondissement, Central Paris"
    }
  },
  {
    id: "bordeaux-business",
    title: "Master in Global Business Administration & Digital Transformation",
    institution: "Université de Bordeaux",
    city: "Bordeaux",
    region: "Nouvelle-Aquitaine",
    level: "Master",
    duration: "2 Years",
    credits: "120 ECTS",
    field: "Business & Management",
    language: "100% English taught",
    tuitionEU: "€243 / year",
    tuitionNonEU: "€3,770 / year",
    intakes: ["September 2027"],
    deadlines: [
      { round: "Round 1", date: "February 1" },
      { round: "Round 2", date: "April 30" }
    ],
    overview: "Bordeaux is one of France's fastest-growing tech and business hubs. This program blends European business law, digital transformation strategies, and international trade in an attractive, student-friendly coastal-proximity city.",
    curriculum: [
      "Global Corporate Strategy & M&A Basics",
      "Digital Product Management & Agile Workflows",
      "Financial Analysis for Multinational Corporations",
      "Supply Chain & International Logistics",
      "Internship / Capstone with French enterprise partner"
    ],
    eligibility: {
      degreeRequired: "Bachelor's in any discipline with business or economics electives",
      minGpa: "60%+ or 2.8 / 4.0",
      englishTest: "IELTS 6.5 or equivalent",
      greGmat: "Not required",
      workExperience: "Internships welcome"
    },
    careerOutcomes: {
      avgSalary: "€40,000 – €50,000 / year",
      employmentRate: "93% within 6 months",
      topEmployers: ["Capgemini Bordeaux", "Betclic Group", "Crédit Agricole", "Ceva Santé Animale", "Decathlon"],
      typicalRoles: ["Digital Transformation Consultant", "Business Operations Manager", "Export Development Executive"]
    },
    campusLife: {
      housingAvailability: "CROUS Bordeaux residences (€280–€420/mo) + active private rental market",
      monthlyLivingCost: "€650 – €850 / month (30% cheaper than Paris)",
      campusLocation: "Bordeaux Bastide & Pessac campus"
    }
  },
  {
    id: "grenoble-datascience",
    title: "Master of Science in Informatics: Data Science & AI",
    institution: "Université Grenoble Alpes",
    city: "Grenoble",
    region: "Auvergne-Rhône-Alpes",
    level: "Master",
    duration: "2 Years",
    credits: "120 ECTS",
    field: "Data Science",
    language: "100% English taught",
    tuitionEU: "€243 / year",
    tuitionNonEU: "€3,770 / year",
    intakes: ["September 2027"],
    deadlines: [
      { round: "International Round", date: "January 20" },
      { round: "Late Round", date: "April 20" }
    ],
    overview: "Nicknamed the 'Silicon Valley of the French Alps', Grenoble is home to world-renowned research centers (CEA, Inria, ESRF). This degree focuses on large-scale distributed systems, cloud computing, and big data architecture.",
    curriculum: [
      "Distributed Computing & Cloud Architectures (Spark, Kubernetes)",
      "High-Dimensional Data Analysis & Statistics",
      "Deep Learning for Computer Vision & NLP",
      "Database Systems, NoSQL & Data Pipelines",
      "6-Month Paid Industrial Internship in Grenoble Tech Basin or Switzerland"
    ],
    eligibility: {
      degreeRequired: "BSc / BTech in Computer Science, Software Engineering or Data Science",
      minGpa: "68%+ or 3.0 / 4.0",
      englishTest: "IELTS 6.5 or TOEFL 85",
      greGmat: "None",
      workExperience: "Not required"
    },
    careerOutcomes: {
      avgSalary: "€45,000 – €58,000 / year",
      employmentRate: "96% within 3 months",
      topEmployers: ["STMicroelectronics", "Schneider Electric Grenoble", "Apple France", "Naver Labs Europe", "Orange"],
      typicalRoles: ["Data Engineer", "Cloud Infrastructure Specialist", "AI Software Engineer"]
    },
    campusLife: {
      housingAvailability: "Extensive campus housing (€250–€400/mo) with Alpine mountain views",
      monthlyLivingCost: "€600 – €800 / month",
      campusLocation: "Saint-Martin-d'Hères University Campus"
    }
  },
  {
    id: "hec-mif",
    title: "Master in International Finance (MIF)",
    institution: "HEC Paris",
    city: "Jouy-en-Josas / Paris",
    region: "Île-de-France",
    level: "MSc",
    duration: "1 Year or 2 Years (depending on track)",
    credits: "90 – 120 ECTS",
    field: "Business & Management",
    language: "100% English taught",
    tuitionEU: "€41,500 (total programme)",
    tuitionNonEU: "€41,500 (total programme, merit scholarships available up to €15,000)",
    intakes: ["September 2027"],
    deadlines: [
      { round: "Round 1", date: "October 18" },
      { round: "Round 2", date: "January 5" },
      { round: "Round 3", date: "March 1" },
      { round: "Round 4", date: "April 18" }
    ],
    overview: "Consistently ranked #1 worldwide for Master in Finance by the Financial Times. Prepares elite graduates for investment banking, private equity, hedge funds, and corporate finance in Paris, London, Frankfurt, and Dubai.",
    curriculum: [
      "Financial Markets, Fixed Income & Derivatives",
      "Corporate Valuation & Mergers and Acquisitions",
      "Private Equity, Venture Capital & LBO Modeling",
      "Python for Quantitative Finance & Algorithmic Trading",
      "London & Paris Financial Center Study Trip"
    ],
    eligibility: {
      degreeRequired: "Bachelor's degree in Engineering, Mathematics, Economics, or Business",
      minGpa: "Top 10% of class",
      englishTest: "IELTS 7.0+ or TOEFL 100+",
      greGmat: "GMAT 710+ or GRE equivalent strongly advised",
      workExperience: "At least one competitive finance/banking internship"
    },
    careerOutcomes: {
      avgSalary: "€82,000 – €115,000 / year (including starting bonuses)",
      employmentRate: "99% employed within 3 months",
      topEmployers: ["Goldman Sachs", "Morgan Stanley", "J.P. Morgan Paris", "BNP Paribas CIB", "Rothschild & Co", "BlackRock"],
      typicalRoles: ["Investment Banking Analyst", "Private Equity Associate", "Quantitative Trader"]
    },
    campusLife: {
      housingAvailability: "300-acre residential campus with castle, sports grounds, and on-campus residences",
      monthlyLivingCost: "€850 – €1,100 / month",
      campusLocation: "Jouy-en-Josas (35 minutes to Paris via RER C / shuttle)"
    }
  },
  {
    id: "edhec-luxury",
    title: "MSc in Global & Luxury Brand Management",
    institution: "EDHEC Business School",
    city: "Nice / Paris",
    region: "Provence-Alpes-Côte d'Azur",
    level: "MSc",
    duration: "18 Months (including 6-month internship)",
    credits: "90 ECTS",
    field: "Luxury & Fashion",
    language: "100% English taught",
    tuitionEU: "€28,500",
    tuitionNonEU: "€28,500 (Early bird & excellence scholarships up to 25% off)",
    intakes: ["September 2027"],
    deadlines: [
      { round: "Round 1", date: "November 25" },
      { round: "Round 2", date: "February 15" },
      { round: "Round 3", date: "May 30" }
    ],
    overview: "France is the undisputed global epicenter of luxury (LVMH, Kering, Hermès, Chanel). EDHEC's program delivers direct immersion into haute couture, luxury hospitality, fine jewelry, and digital luxury retailing.",
    curriculum: [
      "Heritage Branding & French Art de Vivre",
      "Luxury Customer Experience & Omnichannel Retailing",
      "Digital Marketing, Web3 & Sustainable Luxury",
      "Licensing, Intellectual Property & Brand Equity",
      "Paris Fashion Week & Luxury Maisons Field Study",
      "6-Month Mandatory Paid Internship in a Luxury Maison"
    ],
    eligibility: {
      degreeRequired: "Bachelor's in Business, Arts, Humanities, or Design",
      minGpa: "65%+ or 3.0 / 4.0",
      englishTest: "IELTS 6.5 or TOEFL 90",
      greGmat: "Optional",
      workExperience: "Previous retail or marketing exposure helpful"
    },
    careerOutcomes: {
      avgSalary: "€44,000 – €56,000 / year",
      employmentRate: "95% placed in luxury sector within 4 months",
      topEmployers: ["LVMH (Louis Vuitton, Dior, Moët)", "Kering (Gucci, Saint Laurent)", "Hermès", "Cartier", "L'Oréal Luxe"],
      typicalRoles: ["Luxury Product Manager", "Global Brand Strategist", "Retail Merchandising Specialist"]
    },
    campusLife: {
      housingAvailability: "Beachfront campus in Nice on Promenade des Anglais + student residences",
      monthlyLivingCost: "€800 – €1,000 / month",
      campusLocation: "Nice Côte d'Azur (Direct flights across Europe)"
    }
  }
];
