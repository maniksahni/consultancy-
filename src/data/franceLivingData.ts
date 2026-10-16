export type CityCost = {
  city: string;
  region: string;
  rentDorm: string;
  rentPrivateStudio: string;
  monthlyGroceries: string;
  publicTransportMonthly: string;
  averageCafSubsidy: string;
  totalNetMonthlyEstimate: string;
  lifestyleVibe: string;
};

export const cityLivingCosts: CityCost[] = [
  {
    city: "Paris & Île-de-France",
    region: "Île-de-France",
    rentDorm: "€400 – €550",
    rentPrivateStudio: "€750 – €1,000",
    monthlyGroceries: "€250 – €320",
    publicTransportMonthly: "€31 (Imagine R student annual pass = €375/yr)",
    averageCafSubsidy: "€180 – €220 / month",
    totalNetMonthlyEstimate: "€850 – €1,200",
    lifestyleVibe: "World capital of arts, fashion, gastronomy, and business. Unmatched networking and museum access."
  },
  {
    city: "Lyon",
    region: "Auvergne-Rhône-Alpes",
    rentDorm: "€280 – €400",
    rentPrivateStudio: "€500 – €680",
    monthlyGroceries: "€200 – €260",
    publicTransportMonthly: "€25 (TCL student pass)",
    averageCafSubsidy: "€140 – €180 / month",
    totalNetMonthlyEstimate: "€650 – €850",
    lifestyleVibe: "Gastronomic capital of France, vibrant student culture, 2 hours from the Alps and 1.5 hours to Mediterranean."
  },
  {
    city: "Bordeaux",
    region: "Nouvelle-Aquitaine",
    rentDorm: "€280 – €390",
    rentPrivateStudio: "€480 – €650",
    monthlyGroceries: "€190 – €250",
    publicTransportMonthly: "€20 (TBM student subscription)",
    averageCafSubsidy: "€130 – €170 / month",
    totalNetMonthlyEstimate: "€620 – €820",
    lifestyleVibe: "UNESCO architectural gem, high quality of life, fast 2-hour TGV train to central Paris, close to Atlantic beaches."
  },
  {
    city: "Toulouse",
    region: "Occitanie",
    rentDorm: "€250 – €360",
    rentPrivateStudio: "€450 – €600",
    monthlyGroceries: "€180 – €240",
    publicTransportMonthly: "€15 (Tisséo student pass)",
    averageCafSubsidy: "€120 – €160 / month",
    totalNetMonthlyEstimate: "€580 – €760",
    lifestyleVibe: "La Ville Rose (The Pink City), sunny southwestern climate, European aerospace capital with high student density."
  },
  {
    city: "Grenoble",
    region: "Auvergne-Rhône-Alpes",
    rentDorm: "€240 – €350",
    rentPrivateStudio: "€420 – €560",
    monthlyGroceries: "€180 – €230",
    publicTransportMonthly: "€16 (TAG student pass)",
    averageCafSubsidy: "€110 – €150 / month",
    totalNetMonthlyEstimate: "€550 – €720",
    lifestyleVibe: "Surrounded by 3 Alpine mountain chains, world-class outdoor skiing/hiking, top tech engineering hub."
  },
  {
    city: "Lille",
    region: "Hauts-de-France",
    rentDorm: "€260 – €370",
    rentPrivateStudio: "€440 – €590",
    monthlyGroceries: "€180 – €230",
    publicTransportMonthly: "€23 (Ilévia student pass)",
    averageCafSubsidy: "€120 – €160 / month",
    totalNetMonthlyEstimate: "€570 – €750",
    lifestyleVibe: "Warm northern hospitality, Eurostar crossroad (35 mins to Brussels, 1 hour to Paris, 1.5 hours to London)."
  }
];

export const settlementGuides = {
  cafHousingAid: {
    title: "CAF / APL Housing Allowance (Aide Personnalisée au Logement)",
    summary: "Every enrolled international student in France—regardless of nationality—is legally entitled to monthly financial housing assistance from the French Caisse d'Allocations Familiales (CAF).",
    monthlyRefundAmount: "Between €100 and €220 every single month",
    eligibilityCondition: "Have a valid French lease (bail de location), valid student visa/VLS-TS, and French bank account (RIB).",
    howItWorks: [
      "1. Sign your rental lease with CROUS, student residence, or private landlord.",
      "2. Ask your landlord to sign the 'Attestation de loyer' (rental certificate).",
      "3. Create your personal account online on the CAF portal (caf.fr) within the first 30 days of arrival.",
      "4. Upload your student visa, OFII confirmation, passport, and French bank RIB.",
      "5. CAF will credit your monthly aid directly into your French bank account (retroactive to your 2nd month)."
    ]
  },
  healthInsurance: {
    title: "French National Healthcare (Sécurité Sociale / Ameli)",
    summary: "100% free healthcare coverage for international students through the French CPAM (Caisse Primaire d'Assurance Maladie).",
    cost: "€0 (Completely free by French law)",
    reimbursementRate: "Up to 70% of standard doctor consultations and prescription medicines reimbursed by the State.",
    steps: [
      "1. Register on the dedicated student healthcare portal: etudiant-etranger.ameli.fr",
      "2. Upload your university enrollment certificate (Certificat de scolarité), passport, and visa.",
      "3. Receive your temporary French Social Security Number.",
      "4. Receive your official Carte Vitale (green chip healthcare card) for instant cashless doctor visits."
    ]
  },
  banking: {
    title: "Opening a French Bank Account (Compte Bancaire)",
    summary: "Essential for receiving your CAF allowance, mobile phone contracts, paying rent, and receiving internship salaries.",
    recommendedBanks: [
      { name: "BNP Paribas", type: "Traditional Bank", perk: "Student welcome bonus (€80) + English-speaking student advisors in university branches." },
      { name: "Société Générale", type: "Traditional Bank", perk: "Special partnership with Campus France and student overdraft facilities." },
      { name: "Revolut / BoursoBank", type: "Digital Neo-Bank", perk: "Instant French IBAN (starting with FR76), Apple Pay in 5 minutes, zero currency exchange fees." }
    ],
    documentsNeeded: [
      "Passport and French student visa (VLS-TS)",
      "Proof of French address less than 3 months old (Justificatif de domicile or CROUS attestation)",
      "Student card or university enrollment certificate"
    ]
  },
  visaDetails: {
    title: "Student Visa (VLS-TS) & Financial Requirements",
    summary: "The Visa de Long Séjour valant Titre de Séjour (VLS-TS) allows you to study, travel across all 29 Schengen countries, and work part-time up to 964 hours/year.",
    financialProofRequired: "Minimum €615 / month for 12 months = €7,380 minimum balance in your or your sponsor's bank account (or sanctioned education loan letter).",
    vfsProcess: [
      "1. Complete Campus France Études en France interview & receive NOC / Attestation.",
      "2. Fill France-Visas online application form & generate receipt.",
      "3. Book in-person biometric appointment at VFS Global (Delhi, Mumbai, Bengaluru, Chennai, Kolkata, Hyderabad, etc.).",
      "4. Submit passport, financial bank statements, accommodation attestation, and university acceptance.",
      "5. Typical turnaround time: 10 to 15 working days."
    ],
    ofiiOnlineValidation: "Within 3 months of entering France, validate your VLS-TS online at administration-etrangers-en-france.interieur.gouv.fr and pay the €50 tax stamp (taxe de séjour). No in-person prefecture visit needed!"
  }
};
