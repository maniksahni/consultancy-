/**
 * Official tuition for international (non-EU) students at the French private business schools Indian
 * students search for most, keyed by the /france/universities/<slug> page. Every figure is copied from
 * the school's own fees or programme page; schools that publish no current figure (e.g. ESSEC, "TBA" for
 * 2027) are left out rather than estimated. `year` says "year not stated" when the page gives none.
 */
export type SchoolFee = {
  /** Programme the figure applies to. */
  programme: string;
  /** Short figure for the facts strip and meta description. */
  figure: string;
  /** What the figure covers, e.g. "2-year programme". */
  basis: string;
  /** Full answer sentence, without the programme name. */
  detail: string;
  /** Academic year or intake as the school states it. */
  year: string;
  url: string;
  checked: string;
};

export const FRENCH_SCHOOL_FEES: Record<string, SchoolFee> = {
  "neoma-business-school": {
    programme: "Master in Management (Grande École)",
    figure: "€36,000", basis: "2-year programme",
    detail: "€36,000 tuition for Years 1 and 2, plus a €500 administrative fee each year",
    year: "September 2027 intake",
    url: "https://neoma-bs.com/programmes/master-management", checked: "2026-10-24",
  },
  "audencia-business-school": {
    programme: "Master in Management (Grande École)",
    figure: "€38,250", basis: "programme school fees",
    detail: "€38,250 in school fees for the programme, plus a €500 service fee each academic year",
    year: "September 2027 intake",
    url: "https://www.audencia.com/en/our-programs/master-in-management-grande-ecole/funding", checked: "2026-10-24",
  },
  "burgundy-school-of-business": {
    programme: "Master in Management (Grande École)",
    figure: "€30,600", basis: "Master 1 + Master 2",
    detail: "€15,000 for Master 1, then €15,600 for Master 2 (€30,600 over two years)",
    year: "2027–28",
    url: "https://www.bsb-education.com/en/programme/master-grande-ecole", checked: "2026-10-24",
  },
  "icn-graduate-business-school": {
    programme: "Master in Management",
    figure: "€29,300", basis: "2-year programme",
    detail: "€14,800 for Year 1 (the same for all nationalities) and €14,500 for Year 2, €29,300 in total",
    year: "intakes from September 2027",
    url: "https://www.icn-artem.com/en/tuiton-fees-2026-2027", checked: "2026-10-24",
  },
  "kedge-business-school": {
    programme: "Master in Management (Grande École), entry with an international bachelor’s",
    figure: "€16,100 a year", basis: "2-year programme",
    detail: "€16,100 a year for the two-year programme (€18,600 a year with the double MSc degree)",
    year: "year not stated",
    url: "https://student.kedge.edu/programmes/master-in-management-grande-ecole/admission-and-funding", checked: "2026-10-24",
  },
  "skema-business-school": {
    programme: "Master in Management (Grande École)",
    figure: "€39,000", basis: "M1 + M2",
    detail: "€39,000 tuition for the two years (M1 and M2), plus a €500 service fee each year of study",
    year: "2027–28",
    url: "https://www.skema.edu/programmes/master-in-management/financing", checked: "2026-10-24",
  },
  "tbs-education": {
    programme: "Master in Management",
    figure: "€32,000", basis: "2-year programme",
    detail: "€32,000 for the entire two-year programme (Toulouse, Paris and Barcelona campuses)",
    year: "year not stated",
    url: "https://www.tbs-education.com/program/master-in-management/", checked: "2026-10-24",
  },
  "mbs": {
    programme: "Grande École Programme (Master in Management, international admission)",
    figure: "€15,000–€16,500 a year", basis: "Years 1 to 3",
    detail: "€15,000 for Year 1 and €16,500 for each of Years 2 and 3, with no administrative fees on top",
    year: "2026–27",
    url: "https://www.montpellier-bs.com/international/our-programmes/master/financial-aids-2/", checked: "2026-10-24",
  },
  "ieseg-school-of-management": {
    programme: "Grande École Programme, Master cycle (admission with an international degree)",
    figure: "€13,200", basis: "2026–27 tuition",
    detail: "€13,200 tuition for 2026–27, the same for domestic and international students",
    year: "2026–27",
    url: "https://www.ieseg.fr/en/programs/specialized-masters/grande-ecole-programme-5-years/admission/", checked: "2026-10-24",
  },
  "rennes-school-of-business": {
    programme: "Master in Management",
    figure: "€34,000", basis: "M1 + M2, non-EU",
    detail: "for non-European students €16,500 for Year 1 (M1) and €17,500 for Year 2 (M2), €34,000 in total; the optional Pre-Master year is €16,000",
    year: "year not stated",
    url: "https://www.rennes-sb.com/fees-and-scholarships/", checked: "2026-10-24",
  },
  "escp-business-school": {
    programme: "Master in Management",
    figure: "€28,800 a year", basis: "non-EU students",
    detail: "for non-European students €25,900 tuition plus €2,900 additional fees, €28,800 a year (European students €25,100)",
    year: "September 2027 intake",
    url: "https://escp.eu/programmes/master-in-management", checked: "2026-10-24",
  },
  "excelia-group": {
    programme: "Master in Management (Grande École), master-level entry",
    figure: "€15,750 a year", basis: "non-EU students",
    detail: "for students from outside the EU €15,750 a year when entering at third year or above (€14,750 a year on first-year entry)",
    year: "year not stated",
    url: "https://www.excelia-group.com/our-programmes/excelia-business-school/master-management-programme-grande-ecole", checked: "2026-10-24",
  },
  "isc-paris": {
    programme: "Master in Management (Grande École)",
    figure: "€13,700 a year", basis: "Years 2 and 3",
    detail: "€10,500 for Year 1, then €13,700 for each of Years 2 and 3",
    year: "September 2027 intake",
    url: "https://www.iscparis.com/en/program/isc-paris-master-in-management/", checked: "2026-10-24",
  },
};

export const frenchSchoolFee = (slug: string): SchoolFee | undefined => FRENCH_SCHOOL_FEES[slug];
