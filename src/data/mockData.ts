import { Destination, ServiceItem, Testimonial, ProcessStep, PortalStudent, Scholarship } from '@/lib/types';

export const DESTINATIONS: Destination[] = [
  {
    id: "usa",
    name: "United States",
    slug: "usa",
    flag: "🇺🇸",
    tagline: "Global Tech Hub & World-Renowned Ivy League Education",
    image: "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=1200&auto=format&fit=crop",
    avgTuition: "$28,000 - $55,000 / yr",
    livingCost: "$12,000 - $18,000 / yr",
    pswRights: "Up to 3 Years STEM OPT",
    visaRate: "97.8%",
    processingTime: "3 to 5 Weeks",
    intakes: ["Fall (Aug/Sep)", "Spring (Jan)", "Summer (May)"],
    minIelts: "6.5 / Duolingo 110",
    currency: "USD ($)",
    popularDegrees: ["MS Computer Science / AI", "Data Analytics", "MBA & Finance", "Biotechnology", "Mechanical Engineering"],
    topUniversities: [
      { name: "Columbia University", ranking: "QS #34", acceptanceRate: "4.5%", location: "New York, NY", avgFee: "$62,000/yr", badge: "Ivy League" },
      { name: "Northeastern University", ranking: "QS #375", acceptanceRate: "18%", location: "Boston, MA", avgFee: "$39,000/yr", badge: "Top Co-op Hub" },
      { name: "Arizona State University", ranking: "QS #179", acceptanceRate: "88%", location: "Phoenix, AZ", avgFee: "$32,000/yr", badge: "#1 Most Innovative" },
      { name: "University of Southern California", ranking: "QS #116", acceptanceRate: "12%", location: "Los Angeles, CA", avgFee: "$60,000/yr", badge: "Top Engineering" }
    ],
    keyBenefits: [
      "3-Year STEM Extension on F-1 Visa for tech & STEM graduates",
      "World's largest corporate recruiting ecosystem (Silicon Valley, Wall St)",
      "High on-campus research grants and TA/RA assistantships",
      "Flexible curricular practical training (CPT) during studies"
    ],
    visaRequirements: [
      "I-20 Certificate of Eligibility from SEVP-approved school",
      "DS-160 Confirmation barcode & SEVIS I-901 fee payment ($350)",
      "Proof of liquid funds covering 1 year total tuition + living expenses",
      "Valid passport with min 6 months validity beyond intended stay",
      "Ties to home country evidence & clear academic intention"
    ],
    workPermitRules: "20 hrs/week on-campus during semester; 40 hrs/week during scheduled breaks. Up to 36 months OPT upon graduation for STEM programs.",
    highlightStat: "50+ Fortune 500 HQ Campus Recruiters"
  },
  {
    id: "uk",
    name: "United Kingdom",
    slug: "uk",
    flag: "🇬🇧",
    tagline: "Prestigious 1-Year Masters & Russell Group Excellence",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop",
    avgTuition: "£16,000 - £32,000 / yr",
    livingCost: "£11,000 - £15,000 / yr",
    pswRights: "2-3 Years Graduate Route Visa",
    visaRate: "99.1%",
    processingTime: "2 to 3 Weeks (Priority 5 Days)",
    intakes: ["September / October", "January / February"],
    minIelts: "6.0 - 6.5 (MOI Waivers Available)",
    currency: "GBP (£)",
    popularDegrees: ["MSc Management / FinTech", "Data Science", "Law (LLM)", "Healthcare / Nursing", "Digital Marketing"],
    topUniversities: [
      { name: "Imperial College London", ranking: "QS #2", acceptanceRate: "11%", location: "London", avgFee: "£38,000/yr", badge: "Russell Group" },
      { name: "University of Manchester", ranking: "QS #34", acceptanceRate: "28%", location: "Manchester", avgFee: "£26,500/yr", badge: "Global Top 40" },
      { name: "University of Leeds", ranking: "QS #82", acceptanceRate: "42%", location: "Leeds", avgFee: "£23,000/yr", badge: "High Placement" },
      { name: "University of Birmingham", ranking: "QS #80", acceptanceRate: "48%", location: "Birmingham", avgFee: "£24,000/yr", badge: "Chevening Partner" }
    ],
    keyBenefits: [
      "Fast-track 1-Year Master's degrees saving 50% tuition and living costs",
      "2-Year post-study Graduate Route Visa without sponsorship cap",
      "IELTS waiver options available based on Grade 12 English score (70%+)",
      "London financial district and European innovation gateway"
    ],
    visaRequirements: [
      "Confirmation of Acceptance for Studies (CAS) from UK sponsor",
      "Financial proof: 28 consecutive days maintenance funds in bank",
      "TB Test clearance certificate from approved clinic",
      "Immigration Health Surcharge (IHS) payment receipt",
      "Academic qualification certificates cited on CAS"
    ],
    workPermitRules: "20 hours/week during term time; full-time during official vacations. Graduate Route grants 2 years (3 years for PhD) open work permit.",
    highlightStat: "1-Year Fast-Track Masters Save $25k+"
  },
  {
    id: "canada",
    name: "Canada",
    slug: "canada",
    flag: "🇨🇦",
    tagline: "High Quality of Life, Welcoming Culture & Direct PR Pathways",
    image: "https://images.unsplash.com/photo-1517935703635-2717090c2210?q=80&w=1200&auto=format&fit=crop",
    avgTuition: "CAD 20,000 - 42,000 / yr",
    livingCost: "CAD 20,635 / yr (GIC requirement)",
    pswRights: "Up to 3 Years PGWP",
    visaRate: "96.4%",
    processingTime: "4 to 7 Weeks (SDS Stream)",
    intakes: ["Fall (September)", "Winter (January)", "Spring (May)"],
    minIelts: "6.0 overall (SDS Stream)",
    currency: "CAD ($)",
    popularDegrees: ["Cybersecurity", "Cloud Architecture", "Supply Chain & Logistics", "Project Management", "Artificial Intelligence"],
    topUniversities: [
      { name: "University of Toronto", ranking: "QS #25", acceptanceRate: "43%", location: "Toronto, ON", avgFee: "CAD 48,000/yr", badge: "#1 in Canada" },
      { name: "University of Waterloo", ranking: "QS #115", acceptanceRate: "53%", location: "Waterloo, ON", avgFee: "CAD 36,000/yr", badge: "World Co-op Leader" },
      { name: "McGill University", ranking: "QS #29", acceptanceRate: "38%", location: "Montreal, QC", avgFee: "CAD 34,000/yr", badge: "Historic Prestige" },
      { name: "University of Alberta", ranking: "QS #96", acceptanceRate: "58%", location: "Edmonton, AB", avgFee: "CAD 28,000/yr", badge: "Low Cost of Living" }
    ],
    keyBenefits: [
      "Clear permanent residency (Express Entry / PNP) points for graduates",
      "Guaranteed Investment Certificate (GIC) streamlined SDS visa process",
      "Spousal open work permit eligibility for Master's/Doctoral candidates",
      "Safe, multicultural cities consistently ranked in world's top 10"
    ],
    visaRequirements: [
      "Letter of Acceptance (LOA) with Provincial Attestation Letter (PAL)",
      "GIC Certificate of CAD 20,635 with approved Canadian bank",
      "Proof of first-year tuition fee payment",
      "Upfront medical exam & biometric appointment",
      "IELTS Academic score 6.0 in each band for SDS stream"
    ],
    workPermitRules: "24 hours/week off-campus during academic terms. Up to 3 years Post-Graduation Work Permit (PGWP) following 2-year programs.",
    highlightStat: "Direct Express Entry PR Points"
  },
  {
    id: "australia",
    name: "Australia",
    slug: "australia",
    flag: "🇦🇺",
    tagline: "World-Class Group of Eight (Go8) & Sunshine Lifestyle",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop",
    avgTuition: "AUD 30,000 - 48,000 / yr",
    livingCost: "AUD 29,710 / yr",
    pswRights: "2 to 4 Years (Subclass 485)",
    visaRate: "97.2%",
    processingTime: "3 to 5 Weeks",
    intakes: ["Semester 1 (Feb/Mar)", "Semester 2 (Jul/Aug)"],
    minIelts: "6.5 / PTE 58",
    currency: "AUD ($)",
    popularDegrees: ["Mining & Civil Engineering", "Data Science", "Nursing & Public Health", "Accounting & Finance", "Environmental Tech"],
    topUniversities: [
      { name: "University of Melbourne", ranking: "QS #13", acceptanceRate: "70%", location: "Melbourne, VIC", avgFee: "AUD 46,000/yr", badge: "Group of Eight" },
      { name: "University of Sydney", ranking: "QS #18", acceptanceRate: "30%", location: "Sydney, NSW", avgFee: "AUD 48,000/yr", badge: "Global Icon" },
      { name: "UNSW Sydney", ranking: "QS #19", acceptanceRate: "54%", location: "Sydney, NSW", avgFee: "AUD 45,000/yr", badge: "#1 Tech & Startup" },
      { name: "Monash University", ranking: "QS #37", acceptanceRate: "40%", location: "Melbourne, VIC", avgFee: "AUD 42,000/yr", badge: "Pharmacy Leader" }
    ],
    keyBenefits: [
      "9 of the world's top 100 universities are located in Australia",
      "Generous regional study extensions (additional 1-2 years PSW in cities like Adelaide/Perth)",
      "High minimum wage (AUD $24.10/hr) supporting student finances",
      "Genuine Student (GS) assessment support with comprehensive compliance"
    ],
    visaRequirements: [
      "Electronic Confirmation of Enrolment (eCoE) from provider",
      "Genuine Student (GS) statement detailing study incentives",
      "Overseas Student Health Cover (OSHC) for duration of visa",
      "Evidence of AUD $29,710 living costs + 1st year tuition",
      "Biometrics and health examination"
    ],
    workPermitRules: "48 hours per fortnight during study terms; unlimited during breaks. Subclass 485 Graduate visa provides 2-4 years open work.",
    highlightStat: "Highest Student Minimum Wage ($24.10/hr)"
  },
  {
    id: "germany",
    name: "Germany",
    slug: "germany",
    flag: "🇩🇪",
    tagline: "Zero Tuition Fees at Public Universities & Engineering Powerhouse",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1200&auto=format&fit=crop",
    avgTuition: "€0 - €3,000 / yr (Public Universities)",
    livingCost: "€11,208 / yr (Blocked Account)",
    pswRights: "18-Month Jobseeker Visa",
    visaRate: "98.5%",
    processingTime: "4 to 8 Weeks (APS required)",
    intakes: ["Winter (October)", "Summer (April)"],
    minIelts: "6.5 / Medium of Instruction (English)",
    currency: "EUR (€)",
    popularDegrees: ["Automotive & Mechanical Engineering", "Industry 4.0 & Robotics", "Renewable Energy", "Computer Science", "Business Management"],
    topUniversities: [
      { name: "TU Munich (TUM)", ranking: "QS #28", acceptanceRate: "8%", location: "Munich, Bavaria", avgFee: "€0 - €4,000/yr", badge: "#1 in Germany" },
      { name: "RWTH Aachen University", ranking: "QS #99", acceptanceRate: "10%", location: "Aachen, NRW", avgFee: "€0 Tuition", badge: "Engineering Pioneer" },
      { name: "Heidelberg University", ranking: "QS #84", acceptanceRate: "16%", location: "Heidelberg", avgFee: "€1,500/sem", badge: "Oldest University" },
      { name: "TU Berlin", ranking: "QS #147", acceptanceRate: "20%", location: "Berlin", avgFee: "€0 Tuition", badge: "Tech Innovation" }
    ],
    keyBenefits: [
      "Tuition-free higher education at world-class state universities",
      "18-month stay-back permit for career launch in Europe's #1 economy",
      "Fast track EU Blue Card and German permanent residency after 21 months",
      "Thousands of 100% English-taught Master's and PhD programs"
    ],
    visaRequirements: [
      "APS Certificate (Academic Evaluation Centre certification)",
      "University Admission Letter / Zulassungsbescheid",
      "Sperrkonto (Blocked Account) with €11,208 at Expatrio/Coracle",
      "Public statutory health insurance (TK / Barmer)",
      "Motivation letter demonstrating curriculum alignment"
    ],
    workPermitRules: "140 full days or 280 half days per calendar year. 18-month post-study visa allows unrestricted work to find qualified employment.",
    highlightStat: "Tuition-Free Tier 1 Education"
  },
  {
    id: "ireland",
    name: "Ireland",
    slug: "ireland",
    flag: "🇮🇪",
    tagline: "Silicon Valley of Europe & Fast-Growing English Economy",
    image: "https://images.unsplash.com/photo-1549918864-48ac978761a4?q=80&w=1200&auto=format&fit=crop",
    avgTuition: "€12,000 - €25,000 / yr",
    livingCost: "€10,000 - €13,000 / yr",
    pswRights: "2-Year Stamp 1G Stay Back",
    visaRate: "98.9%",
    processingTime: "3 to 4 Weeks",
    intakes: ["Autumn (September)", "Spring (January)"],
    minIelts: "6.5 / Duolingo 115",
    currency: "EUR (€)",
    popularDegrees: ["Cloud Computing & Big Data", "Pharmaceutical Sciences", "International Finance", "Supply Chain Analytics", "AI & Machine Learning"],
    topUniversities: [
      { name: "Trinity College Dublin", ranking: "QS #87", acceptanceRate: "33%", location: "Dublin", avgFee: "€22,000/yr", badge: "Historic Prestige" },
      { name: "University College Dublin (UCD)", ranking: "QS #126", acceptanceRate: "30%", location: "Dublin", avgFee: "€20,000/yr", badge: "Triple Accredited" },
      { name: "University of Galway", ranking: "QS #273", acceptanceRate: "45%", location: "Galway", avgFee: "€16,500/yr", badge: "Medical Tech Hub" },
      { name: "Dublin City University (DCU)", ranking: "QS #421", acceptanceRate: "50%", location: "Dublin", avgFee: "€16,000/yr", badge: "#1 for Careers" }
    ],
    keyBenefits: [
      "European headquarters for Google, Apple, Meta, Pfizer, and TikTok",
      "Only English-speaking country in the Eurozone with high graduate wages",
      "2-Year Stamp 1G Stay Back option for Master's degree holders",
      "Critical Skills Employment Permit leading to PR in only 2 years"
    ],
    visaRequirements: [
      "Letter of Acceptance from recognized Irish higher education institute",
      "Proof of full tuition fee payment via PayToStudy / TransferMate",
      "Proof of €10,000+ living maintenance funds",
      "Private medical insurance policy",
      "Detailed study plan and ties to home country statement"
    ],
    workPermitRules: "20 hours/week during college terms; 40 hours/week during June-September & mid-December to mid-January. 24 months Stamp 1G work rights.",
    highlightStat: "EU Hub for Top 10 Tech Giants"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: "Profile Assessment & University Shortlisting",
    subtitle: "Data-Driven University Matchmaking",
    duration: "Day 1 - 5",
    description: "Our senior alumni counsellors evaluate your academic transcripts, GRE/GMAT/IELTS profile, career aspirations, and budget. We formulate a customized 3-tier list: 2 Ambitious, 3 Target, and 2 Safe universities with maximum scholarship potential.",
    icon: "Compass",
    badge: "100% Free Consultation",
    checklist: [
      "Comprehensive evaluation of GPA, backlogs, and academic credits",
      "Course-to-career mapping for high PSW employability",
      "Application fee waiver unlocking ($300-$800 savings)",
      "University shortlisting sign-off with personalized strategy"
    ],
    proTip: "Applying to at least 2 safe universities ensures you secure guaranteed admits while competing for top-20 ambitious dream schools."
  },
  {
    stepNumber: 2,
    title: "SOP, LOR & Application Dispatch",
    subtitle: "Ivy-League Standard Document Mentorship",
    duration: "Week 2 - 3",
    description: "Your Statement of Purpose (SOP) is reviewed by professional editors and Ivy/Russell Group alumni. We eliminate clichés, highlight distinct research milestones, format Letters of Recommendation (LORs), and submit direct partner applications.",
    icon: "FileEdit",
    badge: "Plagiarism & AI Check Free",
    checklist: [
      "1-on-1 brainstorming interview to extract your unique narrative",
      "3 rounds of structural, grammatical, and storytelling edits",
      "Turnitin originality report with 0% AI hallucination compliance",
      "Direct portal dispatch with priority fast-track processing tags"
    ],
    proTip: "Emphasize specific professors, labs, and elective courses in each university's SOP to boost acceptance rates by 40%."
  },
  {
    stepNumber: 3,
    title: "Offer Letter & Financial / Loan Guidance",
    subtitle: "Offer Acceptance & 0% Collateral Loan Facilitation",
    duration: "Week 4 - 6",
    description: "We review your conditional/unconditional offer letters, compare scholarship packages, and facilitate non-collateral education loans with our partnered banks at preferential interest rates. We ensure your I-20, CAS, or PAL is issued without delay.",
    icon: "Banknote",
    badge: "Tie-ups with 12+ Banks",
    checklist: [
      "Scholarship negotiation assistance with university admissions",
      "Collateral-free education loans up to $100,000 sanctioned within 48h",
      "German Blocked Account (Expatrio/Coracle) & Canadian GIC setup",
      "Issuance of official visa sponsorship letters (I-20, CAS, eCoE, PAL)"
    ],
    proTip: "Securing an early sanction letter from our banking partners satisfies strict embassy proof-of-funds guidelines instantly."
  },
  {
    stepNumber: 4,
    title: "Visa Filing & Mock Embassy Interviews",
    subtitle: "Ex-Consulate Officer Trained Simulation",
    duration: "Week 7 - 9",
    description: "Our certified visa specialists draft foolproof visa dossiers (DS-160, VFS, Genuine Student statement). We conduct 3 rigorous mock embassy interviews mimicking real consular officers to build confidence and eliminate red flags.",
    icon: "ShieldCheck",
    badge: "98.4% Visa Success Rate",
    checklist: [
      "Flawless documentation dossier prep (tax returns, CA reports, affidavits)",
      "Appointment booking at VFS / US Embassy / TLScontact centers",
      "3 recorded 1-on-1 mock interview sessions with feedback rubrics",
      "Financial justification and home-tie articulation coaching"
    ],
    proTip: "Never memorize script answers. Our framework trains you to articulate intent, financial capability, and career goals naturally."
  },
  {
    stepNumber: 5,
    title: "Pre-Departure Briefing & Post-Landing Care",
    subtitle: "Smooth Transition to Your New University Life",
    duration: "Week 10+",
    description: "You are never alone. We connect you with student networks in your destination city, arrange discounted student flight tickets with extra luggage allowances, secure verified on/off-campus student housing, and set up international SIM cards & Forex.",
    icon: "PlaneTakeoff",
    badge: "Lifetime Alumni Network",
    checklist: [
      "Zero-markup multi-currency Forex student debit card",
      "Verified student apartment lease bookings (Amber, Casita, Unilodgers)",
      "Exclusive airline student baggage discounts (up to 40kg free)",
      "Airport pickup coordination and local city orientation guide"
    ],
    proTip: "Join our WhatsApp city community 4 weeks before departure to connect with roommates and senior batches already living in your city."
  }
];

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: "university-admissions",
    title: "University Admissions & Profile Shortlisting",
    tagline: "Direct Partnerships with 300+ Top Global Institutions",
    description: "End-to-end guidance from university selection to acceptance. We analyze your academic profile, budget, and career goals to build a winning 3-tier shortlist with application fee waivers.",
    icon: "GraduationCap",
    badge: "Direct Partner Fast-Track",
    features: [
      "Personalized 3-tier shortlisting (Ambitious, Target, Safe)",
      "Exclusive application fee waivers ($500+ value)",
      "Direct fast-track admissions with partner universities",
      "Credit transfer and backlog clearance advice"
    ],
    metrics: "300+ Partner Universities",
    deliverables: ["Custom Profile Audit", "7 Target University Picks", "Fee Waiver Codes", "Direct Admission Tracking"]
  },
  {
    id: "sop-lor-assistance",
    title: "SOP, LOR & Resume Mentorship",
    tagline: "Ivy League & Russell Group Alumni Reviewers",
    description: "Stand out among thousands of applicants. Our dedicated editorial team conducts brainstorming sessions to craft compelling Statements of Purpose, Essays, and Letters of Recommendation.",
    icon: "FileText",
    badge: "48-Hour Turnaround",
    features: [
      "1-on-1 storytelling interview with senior editors",
      "3 rounds of deep structural and grammatical revision",
      "Turnitin plagiarism clearance certificate",
      "ATS-compliant international CV formatting"
    ],
    metrics: "99.4% Originality Score",
    deliverables: ["Tailored Master SOP", "3 Customized LOR Drafts", "Academic CV", "Turnitin Report"]
  },
  {
    id: "student-visa-lodgment",
    title: "Student Visa Lodgment & Mock Interviews",
    tagline: "98.4% Visa Grant Rate with Ex-Consulate Guidance",
    description: "Complex visa paperwork made effortless. We audit your financial dossiers, prepare affidavits, file applications (DS-160, VFS, GS), and run 1-on-1 embassy mock interviews.",
    icon: "ShieldCheck",
    badge: "98.4% Grant Rate",
    features: [
      "Complete visa dossier & financial paperwork audit",
      "3 rounds of recorded 1-on-1 visa interview simulations",
      "Genuine Student (GS) & Home Ties statement preparation",
      "Refusal case analysis and re-filing mastery"
    ],
    metrics: "5,000+ Visas Approved",
    deliverables: ["Dossier Checklist", "Embassy Appointment", "3 Mock Sessions", "Consular Q&A Deck"]
  },
  {
    id: "scholarships-financial-aid",
    title: "Scholarship Hunting & Financial Aid",
    tagline: "$12M+ in Merit and Need-Based Grants Secured",
    description: "Make your dream education affordable. We match you with university-specific bursaries, government fellowships (Chevening, Fulbright, DAAD), and assist with scholarship essays.",
    icon: "Award",
    badge: "Over $12M Secured",
    features: [
      "Institutional and external scholarship database scan",
      "Compelling scholarship essay drafting and editing",
      "Early-bird application priority for bursary allocation",
      "Tuition discount negotiation with university reps"
    ],
    metrics: "Avg. $14,500 / Student",
    deliverables: ["Bursary Eligibility Matrix", "Scholarship Essay Polish", "Submission Guidance"]
  },
  {
    id: "education-loans",
    title: "Non-Collateral Education Loans",
    tagline: "Hassle-Free Funding with 12+ Global Lending Partners",
    description: "Sanction your education loan in 48 hours without pledging property. We partner with HDFC Credila, Prodigy Finance, Leap, Avanse, and Axis Bank to get you the lowest interest rates.",
    icon: "Coins",
    badge: "0% Collateral Options",
    features: [
      "Unsecured loans up to $100,000 with competitive interest",
      "Doorstep document pickup & quick 48-hour sanctions",
      "Pre-visa sanction letters for proof-of-funds requirements",
      "Tax saving benefits under Section 80E guidance"
    ],
    metrics: "48-Hour Loan Sanction",
    deliverables: ["Bank Comparison Sheet", "Fast-track Sanction Letter", "Disbursement Support"]
  },
  {
    id: "forex-housing",
    title: "Forex, Housing & Post-Landing Care",
    tagline: "Verified Accommodations & Multi-Currency Cards",
    description: "Arrive with confidence. We book verified student housing near your campus, issue inter-bank zero-forex debit cards, book discounted flights, and connect you with student alumni.",
    icon: "Home",
    badge: "Verified Student Homes",
    features: [
      "Guaranteed student housing near campus (Amber, Unilodgers)",
      "Zero-markup multi-currency Forex student card",
      "Discounted student flight bookings with 40kg baggage",
      "Airport pickup and local city welcome package"
    ],
    metrics: "10,000+ Rooms Booked",
    deliverables: ["Housing Lease Confirmation", "Forex Card Delivery", "Flight Ticket", "Alumni WhatsApp Invite"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Rohan Varma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    course: "MS in Computer Science",
    university: "Northeastern University, Boston",
    universityLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/07/Northeastern_Huskies_logo.svg/300px-Northeastern_Huskies_logo.svg.png",
    destinationCountry: "USA",
    flag: "🇺🇸",
    originCountry: "India",
    visaType: "US F-1 Visa",
    visaGrantedDate: "August 2025",
    turnaroundDays: 4,
    scholarshipAmount: "$15,000 Dean's Merit Grant",
    rating: 5,
    reviewDate: "2 weeks ago",
    quote: "GlobalPathways changed the trajectory of my career. My GPA was 7.8, and other consultancies told me top US universities were out of reach. GlobalPathways helped me polish my SOP, highlight my research, and I got admitted to Northeastern with a $15k scholarship! The mock visa interview was identical to the actual consular interview.",
    verificationBadge: "Verified F-1 Visa Grant"
  },
  {
    id: "t2",
    name: "Aisha Al-Mansoor",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    course: "MSc International Management",
    university: "University of Manchester",
    universityLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/University_of_Manchester_logo.svg/300px-University_of_Manchester_logo.svg.png",
    destinationCountry: "UK",
    flag: "🇬🇧",
    originCountry: "UAE",
    visaType: "UK Student Route",
    visaGrantedDate: "September 2025",
    turnaroundDays: 6,
    scholarshipAmount: "£6,000 Global Excellence Award",
    rating: 5,
    reviewDate: "1 month ago",
    quote: "The 1-year UK Master's process was seamless with GlobalPathways. They obtained an IELTS waiver for me based on my high school English, secured a £6,000 scholarship, and filed my CAS and visa in under a week. I'm now studying at Manchester and already have 3 interview calls for the Graduate Route.",
    verificationBadge: "Verified UK CAS & Visa"
  },
  {
    id: "t3",
    name: "Arjun Mehta",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    course: "MSc Automotive Software Engineering",
    university: "RWTH Aachen University",
    destinationCountry: "Germany",
    flag: "🇩🇪",
    originCountry: "India",
    visaType: "German National Visa (Type D)",
    visaGrantedDate: "July 2025",
    turnaroundDays: 14,
    scholarshipAmount: "100% Tuition-Free Public Tier-1",
    rating: 5,
    reviewDate: "3 weeks ago",
    quote: "Germany's APS process and blocked account requirements were intimidating. GlobalPathways guided me step-by-step through APS verification, opened my Expatrio blocked account, and drafted a flawless letter of motivation. Studying at RWTH Aachen tuition-free feels like a dream come true.",
    verificationBadge: "Verified APS & German Visa"
  },
  {
    id: "t4",
    name: "Kavya Patel",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    course: "Master of Data Science",
    university: "University of Melbourne",
    destinationCountry: "Australia",
    flag: "🇦🇺",
    originCountry: "India",
    visaType: "Subclass 500 Visa",
    visaGrantedDate: "January 2026",
    turnaroundDays: 8,
    scholarshipAmount: "AUD $10,000 International Award",
    rating: 5,
    reviewDate: "5 days ago",
    quote: "With the new Genuine Student rules in Australia, visa approvals have become very strict. GlobalPathways prepared an airtight GS statement that clearly demonstrated my career trajectory and ROI. Got my subclass 500 visa approved in only 8 days! Highly recommended for Australia aspirants.",
    verificationBadge: "Verified Subclass 500 Visa"
  },
  {
    id: "t5",
    name: "David Chen",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    course: "Master of Engineering (Cloud)",
    university: "University of Waterloo",
    destinationCountry: "Canada",
    flag: "🇨🇦",
    originCountry: "Singapore",
    visaType: "Canadian Study Permit (SDS)",
    visaGrantedDate: "August 2025",
    turnaroundDays: 12,
    scholarshipAmount: "CAD $8,000 Entrance Bursary",
    rating: 5,
    reviewDate: "2 months ago",
    quote: "Waterloo is legendary for its co-op program, but getting the PAL and study permit approved in 2025/2026 needed careful handling. GlobalPathways made sure all provincial attestation letters and GIC deposits were synchronized. Couldn't have done it without them!",
    verificationBadge: "Verified Study Permit"
  },
  {
    id: "t6",
    name: "Niamh O'Connor",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    course: "MSc Big Data Analytics",
    university: "Trinity College Dublin",
    destinationCountry: "Ireland",
    flag: "🇮🇪",
    originCountry: "South Africa",
    visaType: "Ireland Stamp 2 Student Visa",
    visaGrantedDate: "September 2025",
    turnaroundDays: 5,
    scholarshipAmount: "€5,000 Global Merit Award",
    rating: 5,
    reviewDate: "3 weeks ago",
    quote: "Dublin is the Silicon Valley of Europe! GlobalPathways helped me secure admission at Trinity College Dublin and hooked me up with verified student housing within walking distance of campus. Their forex card also saved me thousands in exchange fees.",
    verificationBadge: "Verified Stamp 2 Visa"
  }
];

export const MOCK_STUDENT_PORTAL: PortalStudent = {
  id: "std-98214",
  name: "Priya Sharma",
  email: "priya.sharma99@gmail.com",
  phone: "+1 (617) 555-0192",
  targetCountry: "USA",
  targetIntake: "Fall 2026",
  targetDegree: "Master of Science in Computer Science",
  applicationId: "GPW-USA-2026-8819",
  overallProgress: 88,
  assignedCounsellor: {
    name: "Marcus Vance, M.Ed.",
    role: "Senior Lead Counsellor & Ex-US Embassy Advisory Panel",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    email: "marcus.vance@globalpathways.org",
    phone: "+1 (800) 492-7284",
    rating: 4.98,
    alumniOf: "Harvard GSE / Boston University",
    activeCases: 24
  },
  stages: [
    { id: 1, title: "Initial Profile Assessment & Strategy", status: "completed", updatedAt: "May 14, 2026" },
    { id: 2, title: "University Shortlisting & SOP / LOR Editing", status: "completed", updatedAt: "June 02, 2026" },
    { id: 3, title: "University Applications Lodged (5 Universities)", status: "completed", updatedAt: "June 24, 2026" },
    { id: 4, title: "Official Admit & I-20 / CAS Received", status: "completed", updatedAt: "July 12, 2026" },
    { id: 5, title: "US F-1 Visa Lodged & Embassy Mock Interview", status: "completed", updatedAt: "August 04, 2026" },
    { id: 6, title: "Pre-Departure Briefing & Housing Locked", status: "in_progress", updatedAt: "Current Stage", actionRequired: "Choose student housing room at Boston Fenway" },
    { id: 7, title: "Flight Departure & Campus Check-in", status: "pending", updatedAt: "Scheduled Aug 28, 2026" }
  ],
  documents: [
    { id: "doc-1", name: "Valid International Passport.pdf", category: "Identity", status: "verified", uploadedAt: "May 10, 2026", fileSize: "2.4 MB" },
    { id: "doc-2", name: "Undergraduate Official Transcripts (B.Tech CS).pdf", category: "Academic", status: "verified", uploadedAt: "May 12, 2026", fileSize: "4.8 MB" },
    { id: "doc-3", name: "IELTS Academic Test Report Form (8.0 Bands).pdf", category: "Language", status: "verified", uploadedAt: "May 15, 2026", fileSize: "1.1 MB" },
    { id: "doc-4", name: "Northeastern Official I-20 Form (SEVIS ID: N003849102).pdf", category: "Academic", status: "verified", uploadedAt: "July 14, 2026", fileSize: "3.2 MB" },
    { id: "doc-5", name: "HDFC Credila Sanction Letter ($45,000 Unsecured).pdf", category: "Financial", status: "verified", uploadedAt: "July 18, 2026", fileSize: "1.9 MB" },
    { id: "doc-6", name: "Student Housing Lease Agreement (Boston Fenway).pdf", category: "Identity", status: "action_needed", notes: "Awaiting digital e-signature", fileSize: "0.9 MB" }
  ],
  applications: [
    {
      university: "Northeastern University",
      program: "MS in Computer Science (Khoury College)",
      country: "USA",
      status: "Visa Approved",
      statusColor: "emerald",
      scholarshipAwarded: "$12,000 Dean's Merit Fellowship",
      deadline: "Priority Cohort 2026"
    },
    {
      university: "Columbia University",
      program: "MS in Data Science",
      country: "USA",
      status: "Offer Letter Received",
      statusColor: "blue",
      scholarshipAwarded: "Merit Consideration",
      deadline: "Admit Accepted"
    },
    {
      university: "Arizona State University",
      program: "MS in Computer Software",
      country: "USA",
      status: "Offer Letter Received",
      statusColor: "blue",
      scholarshipAwarded: "$8,500 Global Distinction",
      deadline: "Admit Held"
    }
  ]
};

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: "sch-1",
    name: "Chevening Scholarship UK",
    country: "UK",
    amount: "100% Tuition + Monthly Stipend (£1,400) + Airfare",
    eligibility: "Min 2 years work experience & Leadership track record",
    deadline: "Early November",
    level: "Masters (1 Year)",
    coverage: "Full Ride",
    tag: "Government Funded"
  },
  {
    id: "sch-2",
    name: "Fulbright Foreign Student Program",
    country: "USA",
    amount: "Full Tuition + Living Stipend + Health Insurance",
    eligibility: "Exceptional academic background & Cultural ambassador",
    deadline: "October 15",
    level: "Graduate / PhD",
    coverage: "Full Ride",
    tag: "Prestigious US State Dept"
  },
  {
    id: "sch-3",
    name: "DAAD Scholarships for Development",
    country: "Germany",
    amount: "€934/month + Health Insurance + Travel Subsidy",
    eligibility: "Graduates with min 2 years professional experience",
    deadline: "Varies (Aug - Oct)",
    level: "Masters / PhD",
    coverage: "Full Living Support",
    tag: "Tuition-Free Germany"
  },
  {
    id: "sch-4",
    name: "Australia Awards Scholarship",
    country: "Australia",
    amount: "Full Tuition + Return Airfare + AUD $30,000/yr Living",
    eligibility: "Citizens of participating partner countries",
    deadline: "April 30",
    level: "Bachelors / Masters",
    coverage: "Full Ride",
    tag: "Govt of Australia"
  },
  {
    id: "sch-5",
    name: "Northeastern Dean's Merit Scholarship",
    country: "USA",
    amount: "$10,000 - $25,000 Tuition Waiver",
    eligibility: "GPA 3.4+ / Top 15% of admitted cohort",
    deadline: "Automatic upon application",
    level: "Graduate MS",
    coverage: "Partial Tuition",
    tag: "Institutional Direct"
  },
  {
    id: "sch-6",
    name: "University of Manchester Global Excellence",
    country: "UK",
    amount: "£5,000 - £10,000 Tuition Deduction",
    eligibility: "First Class Undergraduate Degree (75%+)",
    deadline: "Rolling (May 31)",
    level: "Postgraduate Taught",
    coverage: "Partial Tuition",
    tag: "Russell Group"
  }
];

export const TRUST_STATS = [
  { label: "Students Placed Worldwide", value: "5,000+", icon: "Users", sub: "Across 24 top countries" },
  { label: "First-Attempt Visa Grant Rate", value: "98.4%", icon: "ShieldCheck", sub: "Certified consular coaches" },
  { label: "Direct Partner Universities", value: "300+", icon: "Building2", sub: "Fast-track admissions & waivers" },
  { label: "Merit Scholarships Secured", value: "$12M+", icon: "Award", sub: "Institutional & govt grants" },
];

export const ACCREDITATIONS = [
  { name: "AIRC Certified", badge: "American International Recruitment Council", icon: "CheckCircle2" },
  { name: "ICEF Formally Accredited", badge: "Global Quality Agency #3928", icon: "Shield" },
  { name: "British Council Certified", badge: "Advanced Education Agent", icon: "Award" },
  { name: "PIER Australia Qualified", badge: "QEAC Registered Counsellors", icon: "Star" }
];
