export const chapterPath = (country: string, slug: string) => `/destinations/${country}/${slug}`;

const topicChapters: Record<string, string> = {
  Admissions: "admissions", "India qualification recognition": "admissions",
  Programmes: "education-system", "Provider eligibility": "education-system",
  Costs: "costs", Scholarships: "scholarships", "India-specific funding": "scholarships",
  Visa: "visa", "Work & graduation": "after-graduation", "After graduation": "after-graduation",
  "Housing resources": "housing", "India-specific updates": "faq",
};
const franceSlugs: Record<string, string> = { visa: "visas", housing: "living" };

/** The in-site guide chapter that covers a knowledge topic for a country. */
export function chapterForTopic(country: string, topic: string) {
  const slug = topicChapters[topic] || "faq";
  if (country !== "france") return chapterPath(country, slug);
  return `/france/${franceSlugs[slug] || slug}`;
}
