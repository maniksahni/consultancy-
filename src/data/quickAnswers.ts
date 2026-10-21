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
};

/** Questions every student asks about a French city, answered from the France guide. */
export function cityAnswers(city: string): QuickAnswer[] {
  return [
    france("costs", `How much does it cost to live in ${city} as a student?`),
    france("living", `How do I find student housing in ${city}?`),
    france("part-time-work", `Can I work part-time while studying in ${city}?`),
  ];
}
