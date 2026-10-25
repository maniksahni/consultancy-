import { countryGuides } from "@/data/guides";

/** A question answered on the page, with the guide chapter that holds the full detail. */
export type QuickAnswer = { q: string; a: string; href?: string };

/** The chapter's own direct answer, so every page quotes the same checked figures. */
function from(country: string, slug: string, q: string): QuickAnswer {
  const guide = countryGuides.find((g) => g.country === country);
  const chapter = guide?.chapters.find((c) => c.slug === slug);
  if (!chapter) throw new Error(`No ${country} chapter "${slug}" for quick answer: ${q}`);
  return { q, a: chapter.summary, href: chapter.path };
}
const france = (slug: string, q: string) => from("france", slug, q);

export const quickAnswers: Record<string, QuickAnswer[]> = {
  "/study-in-france": [
    france("why-france", "Is France a good choice for Indian students?"),
    france("costs", "How much does it cost to study in France?"),
    france("campus-france", "How does the Campus France process work for Indian students?"),
    france("language-tests", "Do I need IELTS or French to study in France?"),
    france("visas", "How do I get a French student visa from India?"),
    france("after-graduation", "Can I stay and work in France after graduating?"),
  ],
  "/admissions-process": [
    france("admissions", "What documents do French universities ask for?"),
    france("campus-france", "What are the steps of the Études en France procedure?"),
    france("sop-lor-cv", "What should a motivation letter for France include?"),
    france("education-system", "When are the intakes for French universities?"),
  ],
  "/scholarships": [
    france("scholarships", "Which scholarships can Indian students get for France?"),
    from("germany", "scholarships", "Which scholarships are available to study in Germany?"),
    from("uk", "scholarships", "Which scholarships are available to study in the UK?"),
    france("funding-loans", "How much money must I show for a French student visa?"),
  ],
  "/settle-in-france": [
    france("arrival", "What should I do in my first weeks in France?"),
    france("living", "How do international students find housing in France?"),
    france("health-banking", "How do health insurance and bank accounts work for students in France?"),
    france("pre-departure", "What should I prepare before flying to France?"),
  ],
  "/first-30-days-france": [
    france("arrival", "What are the first things to do after arriving in France?"),
    france("health-banking", "How do I register for health insurance in France as a student?"),
    france("living", "Can I get help with rent in France?"),
  ],
  "/career-support": [
    france("jobs", "How do international graduates find jobs in France?"),
    france("part-time-work", "How many hours can students work in France?"),
    france("after-graduation", "Can I get a work permit in France after my master's?"),
  ],
  "/jobs": [
    france("jobs", "Which sectors hire international graduates in France?"),
    france("part-time-work", "Can I work part-time while studying in France?"),
    france("after-graduation", "How long can I stay in France to look for a job after graduating?"),
  ],
  "/compare": ["uk", "usa", "canada", "germany", "ireland", "australia"].map((country) => {
    const guide = countryGuides.find((g) => g.country === country)!;
    return from(country, "costs", `How much does it cost to study in ${guide.prose}?`);
  }).concat(france("costs", "How much does it cost to study in France?")),
  "/book-consultation": [
    { q: "Is the first consultation with Althéa Consulting free?", a: "Yes. The first call with Harshita Kohli is a free 15-minute Google Meet call with no commitment. If you want further support afterwards, its scope and any fees are agreed with you separately before it starts." },
    { q: "How do I book a call with Harshita Kohli?", a: "Fill in the three short steps on this page: your contact details, your study profile, then a free time. The call is booked straight into her calendar and the Google Meet link is emailed to you immediately, with a calendar invitation." },
    { q: "What should I prepare before the consultation?", a: "Your current status, education background (degree, grades, gaps), work experience, the problems you are facing and your top three questions. Keep mark sheets, your CV, test scores, a rough budget and any shortlist handy." },
    { q: "Can I reschedule or cancel my consultation?", a: "Yes. Reply to your confirmation email or message Althéa on WhatsApp with your booking number, and a new time will be arranged." },
  ],
  "/in-france": [
    { q: "I already live in France. Can Althéa help me find an internship?", a: "Yes. Harshita Kohli helps students already in France target the right internships (stages) and alternance, adapt a French-style CV and LinkedIn, and prepare for interviews. Internships over two months must pay at least €4.50 an hour in 2026.", href: "/france/part-time-work" },
    france("part-time-work", "How many hours can international students work in France?"),
    france("after-graduation", "Can I stay in France after my master's to look for a job?"),
    { q: "Can Althéa help with CAF, housing and my titre de séjour?", a: "Yes, with guidance and checklists: CAF housing aid, a guarantor through Visale, opening a bank account, health cover, and renewing or changing your residence permit on time. Decisions stay with the administrations, and complex legal cases are referred to a qualified lawyer.", href: "/settle-in-france" },
  ],
  "/pr-in-france": [
    { q: "Can Indian students get PR in France?", a: "Yes. The usual route is study, then a job-search permit, then a work permit or Talent Passport, then a 10-year resident card after five years of legal residence with B1 French, the civic exam and income at least at minimum wage." },
    { q: "How long does it take to get PR in France after studies?", a: "Plan on about five years of legal, continuous residence on qualifying permits before the 10-year resident card. French nationality can be requested after two years of residence if you graduated from a French higher education institution after two years of study." },
    { q: "What salary do I need to stay and work in France after my degree?", a: "To switch from the job-search permit to an employee permit, the job must relate to your studies and pay at least €2,800.53 gross a month. The Talent Passport for qualified employees needs at least €39,582 gross a year in 2026." },
    { q: "Do I need to speak French for PR in France?", a: "Yes. The 10-year resident card requires French at level B1 and success in the civic exam. Naturalisation also requires proof of sufficient French and the civic exam, plus an interview at the prefecture." },
    { q: "Can I keep my Indian passport if I become French?", a: "No. India does not allow dual citizenship, so taking French nationality means giving up Indian citizenship. You can then apply for an OCI card to live and work in India without a visa." },
  ],
};

/** Questions every student asks about a French city, answered from the France guide. */
export function cityAnswers(city: string): QuickAnswer[] {
  return [
    france("costs", `How much does it cost to live in ${city} as a student?`),
    france("living", `How do I find student housing in ${city}?`),
    france("part-time-work", `Can I work part-time while studying in ${city}?`),
  ];
}
