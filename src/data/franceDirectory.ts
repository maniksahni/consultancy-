// Curated entries from official university/Campus France pages, checked 2026-10-14.
// These are source-linked examples, NOT a live replica of any official catalogue.
// Do not invent fees, entry requirements, available intakes or partnership status.
export type FranceInstitution = {
  id: string;
  name: string;
  city: string;
  region: string;
  focus: string[];
  degreeLevels: string[];
  language: string;
  description: string;
  sourceUrl: string;
  sourceLabel: string;
  verifiedOn: string;
};
export const institutions: FranceInstitution[] = [
  {
    id: "paris-saclay", name: "Université Paris-Saclay", city: "Paris region", region: "Île-de-France",
    focus: ["Science", "Engineering", "Technology", "Business"],
    degreeLevels: ["Master"], language: "English options",
    description: "Explore the university’s official catalogue of Master's programmes taught in English, including technology, natural sciences and business tracks.",
    sourceUrl: "https://www.universite-paris-saclay.fr/en/education/masters-programmes-taught-english",
    sourceLabel: "Official English-taught Master's programmes", verifiedOn: "2026-10-14"
  },
  {
    id: "psl", name: "Université PSL", city: "Paris", region: "Île-de-France",
    focus: ["Science", "Technology", "Business", "Arts"],
    degreeLevels: ["Bachelor", "Master", "Doctorate"], language: "English options",
    description: "Discover undergraduate and postgraduate programmes and tracks offered wholly or partly in English, with programme-specific requirements.",
    sourceUrl: "https://psl.eu/en/programs-and-tracks-taught-english",
    sourceLabel: "Official English-taught programme directory", verifiedOn: "2026-10-14"
  },
  {
    id: "sorbonne", name: "Sorbonne Université", city: "Paris", region: "Île-de-France",
    focus: ["Science", "Engineering", "Arts"],
    degreeLevels: ["Master"], language: "English Master's options",
    description: "Browse Sorbonne’s official English-taught Master's programme listings and check the relevant admissions information for each course.",
    sourceUrl: "https://www.sorbonne-universite.fr/en/programs-english",
    sourceLabel: "Official programmes in English", verifiedOn: "2026-10-14"
  },
  {
    id: "bordeaux", name: "Université de Bordeaux", city: "Bordeaux", region: "Nouvelle-Aquitaine",
    focus: ["Business", "Science", "Engineering", "Health"],
    degreeLevels: ["Master", "Doctorate"], language: "English options",
    description: "Explore international study programmes, English-taught Master's options, joint degrees and research-led graduate studies.",
    sourceUrl: "https://www.u-bordeaux.fr/en/international/come-to-bordeaux/international-students/international-study-programmes",
    sourceLabel: "Official international programmes", verifiedOn: "2026-10-14"
  },
  {
    id: "grenoble", name: "Université Grenoble Alpes", city: "Grenoble", region: "Auvergne-Rhône-Alpes",
    focus: ["Science", "Technology", "Engineering", "Business"],
    degreeLevels: ["Bachelor", "Master", "Doctorate"], language: "English options",
    description: "Find the university's English-taught courses and programme catalogue; programme-level admissions rules vary.",
    sourceUrl: "https://formations.univ-grenoble-alpes.fr/en/catalog.html",
    sourceLabel: "Official programme catalogue", verifiedOn: "2026-10-14"
  }
];
export const franceSources = [
  { title: "Études en France — Complete Procedure", category: "Applications", href: "/france/campus-france", description: "Interactive 6-stage roadmap, document readiness tracker, and mock interview answers." },
  { title: "Jobs & Careers in France (France Travail / APS)", category: "Careers & Work", href: "/jobs", description: "Student part-time jobs (964 hrs/yr), paid internships (€4.35/hr min), and 2-Year post-study work visa." },
  { title: "English-Taught Courses & Degrees", category: "Programmes", href: "/france/programmes", description: "Explore full syllabus, ECTS credits, tuition fees, and admission intakes without leaving Althéa." },
  { title: "Student Visa (VLS-TS) & Proof of Funds", category: "Visa", href: "/france/visas", description: "Official €615/mo financial guarantee calculator, VFS Global steps, and online OFII validation." },
  { title: "Scholarships & Eligibility Calculator", category: "Funding", href: "/france/scholarships", description: "France Excellence Eiffel, Charpak, Erasmus+, and merit tuition fee waivers." },
  { title: "Living in France & CAF Housing Aid", category: "Living in France", href: "/france/living", description: "Calculate your monthly CAF housing grant (€100–€220/mo back), free French health insurance, and banking." }
] as const;
