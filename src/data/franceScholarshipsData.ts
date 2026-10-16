export type FranceScholarship = {
  id: string;
  name: string;
  provider: string;
  targetLevel: "Master" | "Doctorate" | "Bachelor & Master" | "Research Internship";
  awardAmount: string;
  benefits: string[];
  eligibilityCriteria: {
    nationality: string;
    academicMerit: string;
    ageLimit: string;
    fieldRestriction: string;
  };
  applicationDeadline: string;
  nominationMethod: string;
  selectionRatio: string;
  dossierSteps: string[];
};

export const franceScholarshipsList: FranceScholarship[] = [
  {
    id: "eiffel-excellence",
    name: "France Excellence Eiffel Scholarship",
    provider: "French Ministry for Europe and Foreign Affairs (MEAE)",
    targetLevel: "Master",
    awardAmount: "€1,181 / month allowance (Master) or €1,700 / month (PhD)",
    benefits: [
      "Monthly living stipend of €1,181 credited directly each month",
      "Round-trip international flight ticket from home country to France",
      "Full French National Health Insurance (Sécurité Sociale) + top-up mutuelle coverage",
      "Cultural activities allowance and priority access to CROUS student accommodation",
      "Local transportation ticket allowance upon arrival in France"
    ],
    eligibilityCriteria: {
      nationality: "All non-French nationalities (high priority for Indian and Asian candidates)",
      academicMerit: "Top 5% to 10% academic standing in previous degree (GPA 3.6+/4.0 or 75%+)",
      ageLimit: "Maximum 27 years old for Master candidates at the time of application",
      fieldRestriction: "Science & Tech (Biology, Energy, AI), Engineering, Economics, Management, Law & Political Science"
    },
    applicationDeadline: "Institutions submit nominations by early January. Student institutional dossiers close Nov 15 – Dec 10.",
    nominationMethod: "Institutional nomination only. Your accepted French university submits the dossier on your behalf (students cannot submit directly to Campus France).",
    selectionRatio: "approx. 15% – 20% of institutional nominees awarded",
    dossierSteps: [
      "Select an eligible French higher education institution and program",
      "Express interest to the program director or international admissions coordinator during application",
      "Submit stellar transcripts, 2 academic recommendation letters, CV, and clear professional motivation essay",
      "University committee evaluates and officially transmits candidate dossier to Campus France Paris",
      "Results published in late March / early April"
    ]
  },
  {
    id: "charpak-master",
    name: "Charpak Master's Scholarship",
    provider: "Embassy of France in India / French Institute in India (IFI)",
    targetLevel: "Master",
    awardAmount: "€860 / month + tuition fee waiver up to €5,000 + free student visa",
    benefits: [
      "Monthly living stipend of €860 for 10 consecutive academic months",
      "Full waiver of French student visa fees (saves approx. ₹10,000)",
      "Tuition fee assistance up to €5,000 for private institutions (or complete public fee waiver)",
      "Free medical insurance assistance and priority booking support for housing",
      "Lifetime membership to the France Alumni India network"
    ],
    eligibilityCriteria: {
      nationality: "Indian citizen residing in India at the time of application",
      academicMerit: "Minimum 70% or 7.0/10 CGPA from an accredited Indian university",
      ageLimit: "Maximum 30 years old at application submission",
      fieldRestriction: "All disciplines offered in French universities (Management, STEM, Arts, Law)"
    },
    applicationDeadline: "End of March each year (e.g., March 25)",
    nominationMethod: "Direct online application via the French Embassy in India / IFI scholarship portal.",
    selectionRatio: "approx. 25% – 30% of competitive applicants selected",
    dossierSteps: [
      "Secure an acceptance letter or conditional offer from a French university",
      "Prepare a dedicated statement of purpose focusing on the bilateral France-India professional impact",
      "Upload scanned degree certificates, semester-by-semester marksheets, and 2 referee contacts",
      "Submit through the annual IFI scholarship online platform",
      "Selected laureates announced mid-May before visa processing"
    ]
  },
  {
    id: "charpak-lab",
    name: "Charpak Lab Research Internship Scholarship",
    provider: "French Institute in India",
    targetLevel: "Research Internship",
    awardAmount: "€310 / month top-up allowance + free visa + medical insurance",
    benefits: [
      "Monthly top-up allowance in addition to the legal French laboratory gratification (€4.35/hr)",
      "Student visa application fee waiver",
      "Comprehensive medical repatriation insurance coverage",
      "Institutional welcome assistance across CNRS, INRIA, and CEA labs"
    ],
    eligibilityCriteria: {
      nationality: "Indian undergraduate or postgraduate student enrolled in India",
      academicMerit: "Top academic standing in STEM, Physics, Chemistry, Biology, or Computer Science",
      ageLimit: "Maximum 30 years old",
      fieldRestriction: "Scientific research internships (2 to 3 months duration)"
    },
    applicationDeadline: "Mid-February (for internships starting May to July)",
    nominationMethod: "Direct online submission with signed laboratory invitation letter from French host institution.",
    selectionRatio: "approx. 35% of eligible lab nominees",
    dossierSteps: [
      "Contact French research professors in your field of study",
      "Obtain an official acceptance letter outlining the research project from a French laboratory",
      "Upload academic records, CV, and letter of recommendation from Indian faculty head",
      "Submit before the February cutoff",
      "Awards announced in April for summer research starts"
    ]
  },
  {
    id: "emile-boutmy",
    name: "Émile Boutmy Scholarship",
    provider: "Sciences Po Paris",
    targetLevel: "Bachelor & Master",
    awardAmount: "Tuition grant ranging from €3,900 to €14,210 per year",
    benefits: [
      "Direct tuition reduction credited against Sciences Po annual fee",
      "Living allowance grant of up to €5,000 / year in exceptional priority cases",
      "Prestigious alumni networking within European and diplomatic institutions"
    ],
    eligibilityCriteria: {
      nationality: "Non-European Union tax-resident candidates applying for the first time",
      academicMerit: "Outstanding academic record with proven civic or community engagement",
      ageLimit: "Standard entry age for undergraduate or postgraduate studies",
      fieldRestriction: "Public Policy, International Affairs, Economics, Law, Urban Governance at Sciences Po"
    },
    applicationDeadline: "Early December for Master's applicants; mid-February for Undergraduate applicants.",
    nominationMethod: "Ticked directly within the online Sciences Po application form before fee submission.",
    selectionRatio: "approx. 10% – 15% of admitted international cohort",
    dossierSteps: [
      "Complete the standard Sciences Po international admissions dossier",
      "Check the 'Émile Boutmy scholarship' box in the financial section",
      "Attach proof of annual household income (tax returns/payslips) and brief justification letter",
      "Admissions jury evaluates academic excellence alongside social need",
      "Notification sent concurrently with admission decision"
    ]
  },
  {
    id: "erasmus-mundus",
    name: "Erasmus Mundus Joint Master Degrees (EMJMD)",
    provider: "European Commission / European Union",
    targetLevel: "Master",
    awardAmount: "Full tuition coverage (100%) + €1,400 / month living stipend for 24 months",
    benefits: [
      "100% waiver of all registration, tuition, and laboratory fees across all host universities",
      "€1,400 per month tax-free living allowance for the entire 2-year duration (€33,600 total)",
      "Comprehensive worldwide health, accident, and travel insurance policy",
      "Study in at least 2 or 3 different European countries (e.g., France + Germany + Italy) with multi-degrees"
    ],
    eligibilityCriteria: {
      nationality: "All global nationalities (Partner country category for non-EU students)",
      academicMerit: "First Class Bachelor's degree (minimum 70%+ or 3.2 GPA)",
      ageLimit: "No age limit whatsoever",
      fieldRestriction: "Specific joint consortium subjects (over 150 consortiums available across AI, Photonics, Economics, Environment)"
    },
    applicationDeadline: "Between December 15 and January 31 depending on the specific consortium.",
    nominationMethod: "Direct online application to the specific Erasmus Mundus master program consortium portal.",
    selectionRatio: "approx. 5% – 8% (Highly prestigious worldwide competitive grant)",
    dossierSteps: [
      "Choose a consortium involving a French partner university (e.g., Sorbonne, Paris-Saclay, CentraleSupélec)",
      "Prepare motivation letter, 2 academic recommendation letters, CV in Europass or modern format",
      "Submit certified English-translated degree transcripts and English proficiency certificate (IELTS/TOEFL)",
      "Shortlisted candidates undergo a 20-minute academic panel interview via video call",
      "Final European Commission awards declared in March–April"
    ]
  },
  {
    id: "paris-saclay-idex",
    name: "Université Paris-Saclay International Master Scholarship (IDEX)",
    provider: "Université Paris-Saclay / French Government IDEX Program",
    targetLevel: "Master",
    awardAmount: "€10,000 / year + up to €1,000 travel & visa allowance",
    benefits: [
      "Direct grant of €10,000 per academic year paid in installments",
      "Travel and visa installation allowance of up to €1,000",
      "Guaranteed priority reservation for on-campus student housing in Orsay or Gif-sur-Yvette"
    ],
    eligibilityCriteria: {
      nationality: "First-time international applicants to a Paris-Saclay Master (M1 or M2)",
      academicMerit: "Top 10% academic ranking in graduating undergraduate class",
      ageLimit: "Under 30 years of age on December 31 of application year",
      fieldRestriction: "All Paris-Saclay Master's programs (STEM, Medicine, Law, Management)"
    },
    applicationDeadline: "May 15 (Candidates are invited by Paris-Saclay admissions juries post-application)",
    nominationMethod: "Invitation-only after admission. The academic jury selects the top admitted students and invites them to complete the IDEX scholarship form.",
    selectionRatio: "approx. 20% of admitted international cohort",
    dossierSteps: [
      "Apply to an eligible Paris-Saclay English or French taught Master's program",
      "Obtain an admission recommendation from the program coordinator",
      "Receive an email invitation with the secure IDEX scholarship application link",
      "Submit financial profile and academic references within 8 calendar days",
      "Scholarship committee announces awards by late June"
    ]
  }
];
