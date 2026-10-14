import {programmeResearch} from "./programmeResearch";
export const checked = "14 October 2026";
export const official = {
  india:
    "https://www.inde.campusfrance.org/application-and-admission-procedure",
  procedure:
    "https://www.campusfrance.org/en/application-etudes-en-france-procedure",
  catalogue:
    "https://www.campusfrance.org/en/finding-a-university-programme-France",
  visa: "https://france-visas.gouv.fr/en/student",
  scholarships: "https://www.campusfrance.org/en/bursaries-foreign-students",
};
export type Programme = {
  slug: string;
  title: string;
  institution: string;
  city: string;
  degreeLevel: string;
  discipline: string;
  teachingLanguages: string[];
  institutionType: string;
  programmeUrl: string;
  duration: string;
  tuitionAmount: number | null;
  intakePeriod: string | null;
  reviewStatus: "verified" | "needs-review";
  lastVerifiedAt: string;
};
export const programmes: Programme[] = [
  {
    slug: "psl-computer-science",
    title: "Computer Science",
    institution: "Université PSL",
    city: "Paris",
    degreeLevel: "Master",
    discipline: "Computer science",
    teachingLanguages: ["French", "English"],
    institutionType: "Public",
    programmeUrl:
      "https://www.psl.eu/en/education/masters-degree-computer-science",
    duration: "2 years",
    tuitionAmount: null,
    intakePeriod: null,
    reviewStatus: "verified",
    lastVerifiedAt: "2026-10-14",
  },
  {
    slug: "psl-ai-society",
    title: "Artificial Intelligence and Society",
    institution: "Université PSL",
    city: "Paris",
    degreeLevel: "Master",
    discipline: "Computer science",
    teachingLanguages: ["English"],
    institutionType: "Public",
    programmeUrl:
      "https://www.psl.eu/en/education/master-s-degree-artificial-intelligence-and-society",
    duration: "2 years",
    tuitionAmount: null,
    intakePeriod: null,
    reviewStatus: "verified",
    lastVerifiedAt: "2026-10-14",
  },
  {
    slug: "tse-international-economics",
    title: "International Master's programmes in Economics",
    institution: "Toulouse School of Economics",
    city: "Toulouse",
    degreeLevel: "Master",
    discipline: "Economics",
    teachingLanguages: ["English"],
    institutionType: "Public",
    programmeUrl: "https://www.tse-fr.eu/international-masters-programs",
    duration: "2 years",
    tuitionAmount: null,
    intakePeriod: null,
    reviewStatus: "needs-review",
    lastVerifiedAt: "2026-10-14",
  },
];
export const cities = [
  {
    slug: "paris",
    name: "Paris",
    tag: "The city of possibility",
    text: "Build your shortlist across the capital's universities and specialist schools. Compare each campus location with your housing search and transport connections.",
    url: "https://www.paris.fr/en/",
  },
  {
    slug: "lyon",
    name: "Lyon",
    tag: "Culture meets curiosity",
    text: "Explore programmes across Lyon's universities and schools, then plan accommodation around your actual campus rather than the city centre alone.",
    url: "https://www.universite-lyon.fr/",
  },
  {
    slug: "toulouse",
    name: "Toulouse",
    tag: "Ideas take flight",
    text: "Start with the Toulouse School of Economics and the city's university resources. Check the teaching language and prerequisites of your specific programme.",
    url: "https://www.univ-toulouse.fr/",
  },
  {
    slug: "lille",
    name: "Lille",
    tag: "A northern perspective",
    text: "Use the University of Lille's course catalogue to explore your subject. Review campus addresses and student support before building a living budget.",
    url: "https://www.univ-lille.fr/",
  },
  {
    slug: "bordeaux",
    name: "Bordeaux",
    tag: "A different rhythm",
    text: "Explore the University of Bordeaux's international study information. Match your course requirements with realistic accommodation and travel plans.",
    url: "https://www.u-bordeaux.fr/",
  },
  {
    slug: "nice",
    name: "Nice",
    tag: "Learning on the Riviera",
    text: "Explore Université Côte d'Azur's programmes and international resources. Housing and campus location deserve an early place in your planning.",
    url: "https://univ-cotedazur.eu/",
  },
];
export const stages = [
  "Discovery & direction",
  "Academic mapping",
  "A considered shortlist",
  "Your application story",
  "Official application guidance",
  "Visa & arrival orientation",
];
export {faqs} from "./faqs";
export const articles = [
  {
    slug: "choosing-your-programme",
    title: "A thoughtful shortlist starts with better questions.",
    category: "APPLICATIONS",
    intro:
      "Match the academic content to your goals before comparing institutions.",
    paragraphs: [
      "Start with your previous studies, the subjects you want to explore and any prerequisites. Read course modules and check whether the degree is the qualification you need for your next step.",
      "Verify teaching language, campus, admission evidence and the route for your country of residence. Keep a dated note of the official requirements and revisit them before submitting.",
    ],
    source: official.catalogue,
  },
  {
    slug: "planning-your-france-budget",
    title: "Plan for a life in France, beyond tuition.",
    category: "STUDENT LIFE",
    intro:
      "A useful budget includes the ordinary costs of arriving and living.",
    paragraphs: [
      "Make separate lines for tuition, housing, deposits, transport, food, insurance and initial travel. Use current university and accommodation information for the city and campus you are considering.",
      "Do not treat an unconfirmed scholarship as available funding. Check eligibility and deadlines with the awarding body, and build a plan that explains how you will cover the costs.",
    ],
    source: official.scholarships,
  },
  {
    slug: "understanding-campus-france",
    title: "Campus France: find the path that applies to you.",
    category: "FRANCE GUIDE",
    intro:
      "Your country of residence and chosen programme shape the procedure.",
    paragraphs: [
      "Études en France supports application procedures for applicants in participating countries. Your local Campus France office and the institution explain the applicable route and calendar.",
      "For applicants resident in India, start with Campus France India's application guidance. If you already have an admission offer, confirm the next steps with the local office rather than assuming the process is complete.",
    ],
    source: official.india,
  },
];

for (const p of programmes) { const evidence=programmeResearch.find(e=>e.slug===p.slug); if(evidence){p.tuitionAmount=evidence.fee.amount;p.lastVerifiedAt=evidence.reviewedAt;} }
