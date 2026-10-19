/**
 * Side-by-side destination facts for the comparison tool.
 * Every figure mirrors the country guides in src/data/guides (checked October 2026),
 * so the comparison and the chapters always agree. Update both together.
 */
export type CompareFacts = {
  /** One-line verdict: who this country is the strongest choice for. */
  bestFor: string;
  /** Typical international tuition per year. */
  tuition: string;
  /** 1 = lowest total cost of study, 5 = highest. Used to mark the most affordable choice. */
  costLevel: 1 | 2 | 3 | 4 | 5;
  living: string;
  funds: string;
  visaFee: string;
  mastersLength: string;
  /** Shortest usual taught master's, in years, to mark the fastest route. */
  mastersYears: number;
  intakes: string;
  work: string;
  /** Hours a week allowed during term, to mark the most generous work rights. */
  workHours: number;
  postStudy: string;
  /** Longest standard post-study stay for a master's graduate, in months. */
  postStudyMonths: number;
  prRoute: string;
  language: string;
  strengths: string[];
  watchOuts: string[];
};

export const compareFacts: Record<string, CompareFacts> = {
  france: {
    bestFor: "A respected European master's at a fraction of UK or US cost, with paid internships built in.",
    tuition: "€2,902 (Bachelor's) · €3,950 (Master's) a year at public universities; grandes écoles cost more",
    costLevel: 2,
    living: "€1,200–1,800 a month in Paris · €850–1,200 elsewhere",
    funds: "€877.50 a month (€10,530 a year)",
    visaFee: "€50 + VFS fee · Études en France ₹20,000",
    mastersLength: "2 years (M1 + M2), often with an internship",
    mastersYears: 2,
    intakes: "September (January at some private schools)",
    work: "964 hours a year (about 20 a week); no separate permit",
    workHours: 20,
    postStudy: "12-month job-search permit, renewable once for Indian graduates",
    postStudyMonths: 24,
    prRoute: "Work permit or Talent Passport, then a long-stay residence card after 5 years of legal residence",
    language: "Many master's taught in English; French B1–B2 needed for most jobs",
    strengths: [
      "Lowest regulated fees in Western Europe: €3,950 a year for a public master's",
      "Internships are part of most master's and are paid by law",
      "Free student health cover and housing aid (CAF) cut living costs",
    ],
    watchOuts: [
      "Learn French early; it decides the job search",
      "Paperwork in the first month is in French",
    ],
  },
  uk: {
    bestFor: "Students who want a globally recognised master's in just one year, all in English.",
    tuition: "£16,000–35,000 a year for a taught master's · MBA £25,000–70,000+",
    costLevel: 4,
    living: "£1,500–2,200 a month in London · £1,000–1,500 elsewhere",
    funds: "£1,529 a month in London · £1,171 elsewhere (up to 9 months), held 28 days",
    visaFee: "£558 + £776 a year health surcharge",
    mastersLength: "1 year",
    mastersYears: 1,
    intakes: "September/October; January for many master's",
    work: "20 hours a week in term (degree level)",
    workHours: 20,
    postStudy: "Graduate visa: 2 years if you apply by 31 Dec 2026, 18 months from 1 Jan 2027",
    postStudyMonths: 24,
    prRoute: "Skilled Worker visa, then settlement after 5 years of qualifying work (a 10-year model has been proposed)",
    language: "English only",
    strengths: [
      "One-year master's: a year less of fees, rent and lost salary",
      "No second language to learn, and degrees Indian employers know well",
      "Graduate visa needs no job offer or sponsor",
    ],
    watchOuts: [
      "Graduate visa drops to 18 months for applications from 2027",
      "London rent pushes the total cost up fast",
    ],
  },
  usa: {
    bestFor: "STEM students aiming for top tech, research and finance careers, with up to 3 years of work after graduating.",
    tuition: "$25,000–45,000 (public) · $40,000–65,000+ (private) a year",
    costLevel: 5,
    living: "$1,200–2,000 a month rent in big cities · $500–900 in smaller towns (shared)",
    funds: "Full first-year cost shown on your I-20",
    visaFee: "$185 visa + $350 SEVIS",
    mastersLength: "1.5–2 years",
    mastersYears: 1.5,
    intakes: "Fall (August–September) and Spring (January)",
    work: "20 hours a week on campus in term",
    workHours: 20,
    postStudy: "OPT 12 months, +24 months for STEM degrees (36 in total)",
    postStudyMonths: 36,
    prRoute: "Employer-sponsored H-1B, then green card (EB-2/EB-3); long waits for Indian-born applicants",
    language: "English only",
    strengths: [
      "Up to 36 months of work after a STEM degree (OPT + STEM OPT)",
      "Assistantships can cover tuition for strong master's and PhD students",
      "The world's largest technology and research job market",
    ],
    watchOuts: [
      "Highest total cost if you get no funding",
      "Long-term stay depends on the H-1B lottery",
    ],
  },
  canada: {
    bestFor: "Students who want work experience that counts directly towards permanent residence.",
    tuition: "CAD 20,000–50,000 (master's) · CAD 16,000–22,000 (college) a year",
    costLevel: 3,
    living: "CAD 1,700–2,500 a month in Toronto/Vancouver · CAD 1,200–1,800 elsewhere",
    funds: "CAD 23,448 for one person, plus first-year tuition",
    visaFee: "CAD 150 study permit + CAD 85 biometrics",
    mastersLength: "1–2 years",
    mastersYears: 1,
    intakes: "September, January and May",
    work: "24 hours a week off campus in term; unlimited in breaks",
    workHours: 24,
    postStudy: "Post-Graduation Work Permit of up to 3 years",
    postStudyMonths: 36,
    prRoute: "Express Entry (Canadian Experience Class after 1 year of skilled work), provincial nominee programmes",
    language: "English (French in Quebec)",
    strengths: [
      "Clearest route from study to permanent residence",
      "PGWP of up to 3 years after eligible programmes",
      "24 hours a week of off-campus work during term",
    ],
    watchOuts: [
      "Study permits are capped; most applicants need a provincial attestation letter",
      "Tight, expensive housing in Toronto and Vancouver",
    ],
  },
  germany: {
    bestFor: "Engineering, computer science and research students who want low fees and a fast path to settle.",
    tuition: "€0 at most public universities (semester fee ≈ €150–400) · Baden-Württemberg €1,500 a semester",
    costLevel: 1,
    living: "€1,100–1,500 a month in Munich · €850–1,200 elsewhere",
    funds: "€11,904 a year in a blocked account (€992 a month)",
    visaFee: "€75 national visa · APS ₹18,000",
    mastersLength: "2 years",
    mastersYears: 2,
    intakes: "Winter (October) and Summer (April)",
    work: "140 full or 280 half days a year (about 20 hours a week)",
    workHours: 20,
    postStudy: "Up to 18 months to find a job",
    postStudyMonths: 18,
    prRoute: "EU Blue Card, then a settlement permit after qualifying employment",
    language: "Many English-taught master's; German needed for daily life and most jobs outside tech",
    strengths: [
      "No tuition at most public universities",
      "World-class engineering and technical universities",
      "EU Blue Card with lower salary thresholds for new graduates",
    ],
    watchOuts: [
      "APS certificate and blocked account add months of paperwork",
      "German language matters outside tech jobs",
    ],
  },
  australia: {
    bestFor: "Indian master's graduates who want the longest post-study stay, up to 3 years under ECTA.",
    tuition: "About AUD 30,000–55,000 a year",
    costLevel: 4,
    living: "AUD 2,200–3,200 a month in Sydney/Melbourne · AUD 1,700–2,500 elsewhere",
    funds: "AUD 29,710 a year living funds",
    visaFee: "AUD 2,500 (from 1 July 2026)",
    mastersLength: "1.5–2 years (coursework)",
    mastersYears: 1.5,
    intakes: "February and July",
    work: "48 hours a fortnight in term (24 a week)",
    workHours: 24,
    postStudy: "Temporary Graduate (485): up to 3 years after a master's for Indians (4 after a PhD)",
    postStudyMonths: 36,
    prRoute: "Points-tested skilled visas (189, 190, 491) or employer sponsorship",
    language: "English only",
    strengths: [
      "Up to 3 years post-study work for Indian master's graduates",
      "24 hours a week of work during term",
      "Regional study can add post-study time and migration points",
    ],
    watchOuts: [
      "AUD 2,500 visa fee and high city rents",
      "Stricter Genuine Student checks and enrolment caps",
    ],
  },
  ireland: {
    bestFor: "A one-year master's in the EU, near the European headquarters of big tech and pharma.",
    tuition: "About €12,000–30,000 a year",
    costLevel: 3,
    living: "€1,500–2,000 a month in Dublin · €1,100–1,500 elsewhere",
    funds: "€10,000 for year one, plus tuition",
    visaFee: "€60 visa · €300 registration (IRP)",
    mastersLength: "1 year",
    mastersYears: 1,
    intakes: "September (some January starts)",
    work: "20 hours a week in term · 40 in holidays",
    workHours: 20,
    postStudy: "Stamp 1G: up to 24 months after a master's",
    postStudyMonths: 24,
    prRoute: "Critical Skills Employment Permit, then Stamp 4 after two years",
    language: "English only",
    strengths: [
      "One-year master's in an English-speaking EU country",
      "Up to 24 months to work after a master's",
      "European base of Google, Meta, Pfizer and other global firms",
    ],
    watchOuts: [
      "Dublin rent is among Europe's highest",
      "Housing scams target new arrivals; never pay before viewing",
    ],
  },
};
