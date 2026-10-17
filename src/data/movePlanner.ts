/**
 * The departure planner: what to do, month by month, before an intake abroad.
 * `months` counts back from the intake start. Figures match the country guides
 * (reviewed 17 October 2026); every step links to the chapter with full detail.
 */
export type PlannerStep = { months: number; title: string; detail: string; chapter: string };
export type PlannerIntake = { label: string; month: number; day: number };
export type PlannerCountry = {
  id: string; name: string; city: string; intakes: PlannerIntake[];
  money: { label: string; value: string }[]; steps: PlannerStep[];
};

const common = {
  shortlist: (detail: string): PlannerStep => ({ months: 12, title: "Shortlist programmes", detail, chapter: "education-system" }),
  language: (detail: string): PlannerStep => ({ months: 11, title: "Book your language test", detail, chapter: "language-tests" }),
  documents: (detail: string): PlannerStep => ({ months: 10, title: "Write your SOP, ask for references", detail, chapter: "sop-lor-cv" }),
  housing: (detail: string): PlannerStep => ({ months: 2, title: "Secure housing", detail, chapter: "housing" }),
  predeparture: (detail: string): PlannerStep => ({ months: 1, title: "Pack and prepare documents", detail, chapter: "pre-departure" }),
};

export const plannerCountries: PlannerCountry[] = [
  {
    id: "france", name: "France", city: "Paris",
    intakes: [{ label: "September", month: 8, day: 1 }, { label: "January (some schools)", month: 0, day: 5 }],
    money: [{ label: "Proof of funds", value: "€877.50 / month" }, { label: "Campus France India", value: "₹20,000" }, { label: "Visa", value: "€50 + VFS fee" }, { label: "Public master’s fee", value: "€3,950 / year" }],
    steps: [
      common.shortlist("Compare public universities, grandes écoles and English-taught master’s; check the entry level for your degree."),
      common.language("IELTS/TOEFL for English-taught programmes, DELF/TCF for French-taught ones."),
      common.documents("Create your Études en France account and draft a motivation letter for each programme."),
      { months: 9, title: "Submit on Études en France", detail: "Upload documents and choose programmes. Licence 1 applications close by 15 December.", chapter: "application-process" },
      { months: 8, title: "Apply for scholarships", detail: "Ask schools about Eiffel nominations; check Charpak (Indian citizens up to 30).", chapter: "scholarships" },
      { months: 6, title: "Campus France interview and offers", detail: "Pay ₹20,000 once your file is validated, attend the interview, compare offers.", chapter: "application-process" },
      { months: 4, title: "Accept an offer, arrange funds", detail: "Show at least €877.50 a month: bank statements, sponsor letter or loan sanction.", chapter: "funding-loans" },
      { months: 3, title: "Apply for the student visa", detail: "France-Visas form, VFS biometrics, €50 fee plus VFS charges.", chapter: "visa" },
      common.housing("Apply to CROUS, get a Visale guarantee, never pay before a signed lease."),
      common.predeparture("Originals of every document, euros for the first weeks, winter clothing."),
      { months: 0, title: "Arrive and settle", detail: "Validate your visa within 3 months (€150), open a bank account, apply for CAF.", chapter: "arrival" },
    ],
  },
  {
    id: "uk", name: "the UK", city: "London",
    intakes: [{ label: "September", month: 8, day: 20 }, { label: "January", month: 0, day: 20 }],
    money: [{ label: "Funds, London", value: "£1,529 / month" }, { label: "Funds, elsewhere", value: "£1,171 / month" }, { label: "Visa", value: "£558" }, { label: "Health surcharge", value: "£776 / year" }],
    steps: [
      common.shortlist("Compare one-year master’s by modules, placements and city; check the university is a licensed sponsor."),
      common.language("IELTS Academic 6.5 (6.0 per band) is typical; some universities waive it for strong Class 12 English."),
      common.documents("Personal statement for each course and two references."),
      { months: 9, title: "Apply", detail: "UCAS for bachelor’s; university portals for master’s. Popular courses fill early.", chapter: "application-process" },
      { months: 8, title: "Apply for scholarships", detail: "Chevening closes in early November; GREAT and university awards follow.", chapter: "scholarships" },
      { months: 5, title: "Accept, pay the deposit, get your CAS", detail: "Meet the offer conditions and pass the pre-CAS checks.", chapter: "admissions" },
      { months: 4, title: "Hold funds for 28 days", detail: "Tuition balance plus £1,529 (London) or £1,171 a month, for up to nine months.", chapter: "funding-loans" },
      { months: 3, title: "TB test and Student visa", detail: "Apply up to 6 months before your course: £558 plus the health surcharge.", chapter: "visa" },
      common.housing("Book university halls or private student accommodation; deposits are capped at 5 weeks’ rent."),
      common.predeparture("Check your eVisa, carry your CAS and certificates, plan your first week."),
      { months: 0, title: "Arrive and settle", detail: "Enrol, register with a GP, open a bank account, apply for an NI number.", chapter: "arrival" },
    ],
  },
  {
    id: "usa", name: "the USA", city: "the USA",
    intakes: [{ label: "Fall (August)", month: 7, day: 20 }, { label: "Spring (January)", month: 0, day: 15 }],
    money: [{ label: "SEVIS fee", value: "$350" }, { label: "Visa fee", value: "$185" }, { label: "Funds", value: "First year on your I-20" }],
    steps: [
      { months: 14, title: "Take the GRE / GMAT / SAT if needed", detail: "Many programmes are test-optional; competitive and funded ones may expect scores.", chapter: "language-tests" },
      common.shortlist("Check SEVP certification, accreditation and STEM designation for OPT."),
      { months: 11, title: "Book TOEFL / IELTS", detail: "TOEFL 80–100 or IELTS 6.5–7.0 for most master’s.", chapter: "language-tests" },
      common.documents("Statement of purpose, 2–3 recommendations and a one-page resume."),
      { months: 9, title: "Apply", detail: "Most graduate deadlines fall between December and February.", chapter: "application-process" },
      { months: 7, title: "Funding and assistantships", detail: "Fulbright-Nehru, university merit awards, TA and RA positions.", chapter: "scholarships" },
      { months: 5, title: "Accept and get your I-20", detail: "Submit financial documents covering the first year.", chapter: "funding-loans" },
      { months: 4, title: "SEVIS fee and DS-160", detail: "Pay $350 SEVIS, complete the DS-160, pay $185 and book your interview.", chapter: "visa" },
      common.housing("Arrange housing and health insurance (or the university plan)."),
      common.predeparture("Passport, visa, signed I-20 and SEVIS receipt in your hand luggage."),
      { months: 0, title: "Arrive and settle", detail: "Check your I-94 and report to the international office.", chapter: "arrival" },
    ],
  },
  {
    id: "canada", name: "Canada", city: "Canada",
    intakes: [{ label: "September", month: 8, day: 5 }, { label: "January", month: 0, day: 8 }, { label: "May", month: 4, day: 6 }],
    money: [{ label: "Living funds", value: "CAD 23,448" }, { label: "Study permit", value: "CAD 150" }, { label: "Biometrics", value: "CAD 85" }],
    steps: [
      common.shortlist("Choose a DLI and a programme that keeps you PGWP-eligible."),
      common.language("IELTS 6.5 for universities, 6.0 for colleges; keep in mind CLB 7 / CLB 5 for the PGWP later."),
      common.documents("SOP for the university and a separate study plan for the visa officer."),
      { months: 9, title: "Apply", detail: "University deadlines mostly fall between December and March.", chapter: "application-process" },
      { months: 7, title: "Apply for scholarships", detail: "Entrance awards, graduate funding and EduCanada listings.", chapter: "scholarships" },
      { months: 6, title: "Offer and PAL", detail: "Get your letter of acceptance and a PAL unless exempt (public master’s and PhD).", chapter: "admissions" },
      { months: 5, title: "Arrange proof of funds", detail: "CAD 23,448 living costs plus first-year tuition and travel.", chapter: "funding-loans" },
      { months: 4, title: "Apply for the study permit", detail: "Online application, CAD 150 plus CAD 85 biometrics.", chapter: "visa" },
      common.housing("Residence places are limited; arrange a rental or homestay before you land."),
      common.predeparture("Port-of-entry letter, PAL, funds and winter clothing."),
      { months: 0, title: "Arrive and settle", detail: "Check your permit at the airport, get a SIN, open a bank account.", chapter: "arrival" },
    ],
  },
  {
    id: "germany", name: "Germany", city: "Germany",
    intakes: [{ label: "Winter semester (October)", month: 9, day: 1 }, { label: "Summer semester (April)", month: 3, day: 1 }],
    money: [{ label: "Blocked account", value: "€11,904 / year" }, { label: "APS certificate", value: "₹18,000" }, { label: "Visa", value: "€75" }],
    steps: [
      { months: 14, title: "Get your APS certificate", detail: "Required for Indian applicants; allow several weeks, longer in peak season.", chapter: "admissions" },
      common.shortlist("Compare universities and universities of applied sciences; check tuition by state."),
      common.language("IELTS 6.5 for English programmes; TestDaF, DSH-2 or Goethe C1 for German ones."),
      common.documents("A factual motivation letter and a tabular CV (Lebenslauf)."),
      { months: 8, title: "Apply via uni-assist or directly", detail: "Many international master’s close months before the usual 15 July / 15 January dates.", chapter: "application-process" },
      { months: 7, title: "Apply for scholarships", detail: "DAAD calls, Deutschlandstipendium, foundation scholarships.", chapter: "scholarships" },
      { months: 4, title: "Open a blocked account", detail: "€11,904 for 2026, released at €992 a month.", chapter: "funding-loans" },
      { months: 3, title: "Visa appointment", detail: "National D visa, €75 — book the appointment early.", chapter: "visa" },
      common.housing("Apply to Studierendenwerk halls or a WG; you need an address to register."),
      common.predeparture("Admission, APS, blocked-account and insurance documents in your hand luggage."),
      { months: 0, title: "Arrive and settle", detail: "Register your address within 14 days, enrol, book your residence-permit appointment.", chapter: "arrival" },
    ],
  },
  {
    id: "australia", name: "Australia", city: "Australia",
    intakes: [{ label: "February / March", month: 1, day: 24 }, { label: "July", month: 6, day: 21 }],
    money: [{ label: "Living funds", value: "AUD 29,710 / year" }, { label: "Student visa", value: "AUD 2,500" }],
    steps: [
      common.shortlist("Choose a CRICOS-registered course of at least two years if you want the 485 visa."),
      common.language("IELTS 6.5 (6.0 per band) or PTE 58–65 is typical."),
      common.documents("SOP that answers the Genuine Student questions consistently."),
      { months: 8, title: "Apply", detail: "Apply by about October–November for February, April–May for July.", chapter: "application-process" },
      { months: 7, title: "Apply for scholarships", detail: "University merit awards, often 10–30% of tuition.", chapter: "scholarships" },
      { months: 5, title: "Accept, pay deposit and OSHC, get your CoE", detail: "The CoE is needed for the visa.", chapter: "admissions" },
      { months: 4, title: "Arrange funds", detail: "AUD 29,710 for a year’s living costs, plus tuition and travel.", chapter: "funding-loans" },
      { months: 3, title: "Apply for the Subclass 500 visa", detail: "AUD 2,500 from 1 July 2026; health check and biometrics if asked.", chapter: "visa" },
      common.housing("On-campus, student accommodation or a share house; bonds are lodged with the state."),
      common.predeparture("Visa grant, CoE and OSHC card; declare food at the border."),
      { months: 0, title: "Arrive and settle", detail: "Update your address within 7 days, apply for a TFN, open a bank account.", chapter: "arrival" },
    ],
  },
  {
    id: "ireland", name: "Ireland", city: "Dublin",
    intakes: [{ label: "September", month: 8, day: 10 }, { label: "January (some courses)", month: 0, day: 20 }],
    money: [{ label: "Living funds", value: "€10,000 / year" }, { label: "IRP registration", value: "€300" }],
    steps: [
      common.shortlist("Check the NFQ level: it decides your Stamp 1G length after graduation."),
      common.language("IELTS Academic 6.5 is typical for master’s."),
      common.documents("One- to two-page statement and two references."),
      { months: 8, title: "Apply", detail: "Most master’s accept applications from October on a rolling basis.", chapter: "application-process" },
      { months: 7, title: "Apply for scholarships", detail: "Government of Ireland scholarship (€10,000 + fee waiver) and university awards.", chapter: "scholarships" },
      { months: 5, title: "Accept and pay fees", detail: "Pay the tuition required before the visa application.", chapter: "admissions" },
      { months: 4, title: "Arrange funds", detail: "Access to €10,000 for living costs, plus tuition.", chapter: "funding-loans" },
      { months: 3, title: "Apply for the study visa", detail: "Online application, then submit documents with insurance and finance evidence.", chapter: "visa" },
      common.housing("Start early — Dublin housing is scarce. Never pay before verifying the landlord."),
      common.predeparture("Visa, acceptance, fee receipts and insurance in your hand luggage."),
      { months: 0, title: "Arrive and settle", detail: "Register for your IRP (€300), get a PPS number, open a bank account.", chapter: "arrival" },
    ],
  },
];

const FRANCE: Record<string, string> = { "application-process": "/campus-france-guide", visa: "/france/visas", housing: "/france/living" };
/** The guide chapter page for a step in a given country. */
export const plannerLink = (country: string, chapter: string) =>
  country === "france" ? FRANCE[chapter] || `/france/${chapter}` : `/destinations/${country}/${chapter}`;
