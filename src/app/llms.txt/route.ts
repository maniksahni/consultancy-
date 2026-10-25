import { brand } from "@/config/brand";
import { articles, cities, faqs } from "@/data/france";
import { franceGuide } from "@/data/guides/france";
import { destinationGuides } from "@/data/guides";
import { indiaGuide } from "@/data/guides/india";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

// A plain-text site summary for AI answer engines (llmstxt.org), built from the same data the pages render.
export function GET() {
  const link = (name: string, path: string, note: string) => `- [${name}](${siteUrl}${path}): ${note}`;
  const body = [
    `# ${brand.name}`,
    "",
    `> ${brand.name} (${siteUrl.replace("https://", "")}) is an independent study-in-France and career advisory founded by ${brand.person}, ${brand.role}, based in ${brand.location}. It helps Indian and international students choose French universities and programmes, follow the Campus France / Études en France procedure, prepare the student visa file, settle in France and find internships, alternance and jobs. It also helps people already living in France with internships, jobs, CAF, housing, residence permits and the route to PR. France is the only destination supported today; support for the UK, USA, Canada, Australia, Germany and Ireland is coming soon.`,
    "",
    "Not to be confused with Althéa, the management consulting firm in the Alan Allman Associates group: Althéa Consulting (altheaconsulting.in) is an independent study-abroad advisory and is not affiliated with it, nor with Alethe Consulting, an IT firm in Gurugram.",
    "",
    `The full text of every guide chapter, with sources, is at ${siteUrl}/llms-full.txt.`,
    "",
    "Universities decide admissions and French authorities decide visas; Althéa does not guarantee admission, scholarships, visas or jobs. Fees, deadlines and rules are linked to official sources (Campus France, France-Visas, universities) and should be re-checked before applying.",
    "",
    "## Services",
    link("Study in France from India", "/study-in-france", "course and university shortlisting, Campus France route, requirements and budget planning"),
    link("Already in France", "/in-france", "help for people already living in France: internships, alternance, first job, CAF, housing and titre de séjour"),
    link("PR in France for Indian students", "/pr-in-france", "job-search permit, work permit or Talent Passport, 10-year resident card after 5 years, French nationality"),
    link("Settle in France", "/settle-in-france", "arrival, housing, bank, insurance and student-life orientation"),
    link("Career support in France", "/career-support", "French-style CV, LinkedIn, interviews, internships and alternance"),
    link("Book a free 15-minute consultation", "/book-consultation", `free Google Meet call with ${brand.person}, booked online with the Meet link emailed instantly`),
    link("About", "/about", `${brand.name} and ${brand.person}`),
    "",
    "## The complete France guide",
    ...franceGuide.chapters.map(c => link(c.label, c.path, c.summary)),
    link("First 30 days in France checklist", "/first-30-days-france", "printable arrival checklist for international students"),
    link("Scholarships", "/scholarships", "study abroad scholarships and funding"),
    link("Universities in France", "/france/universities", "researched programmes, tuition and application timing"),
    link("Jobs", "/jobs", "jobs, internships and work-study pathways in France and six other countries"),
    "",
    "## From India: what every Indian student needs, for any destination",
    link("Australian universities A–Z", "/universities/australia", "each Australian provider's CRICOS courses, registered tuition and how to apply from India"),
    link("UK universities A–Z", "/universities/uk", "each UK provider's undergraduate courses and Student visa sponsor status"),
    link("Canada PGWP-eligible colleges", "/universities/canada", "every Canadian DLI by province with PGWP eligibility"),
    link("French universities and schools A–Z", "/france/universities", "a page for each French institution: programmes (Parcoursup 2026), fees for non-EU students and how to apply from India"),
    link("From India: the essentials", indiaGuide.hubPath, "month-by-month timeline, education loans, sending money, documents, language tests, packing, scams and emergencies, a parents' guide and degree recognition"),
    ...indiaGuide.chapters.map(c => link(c.label, c.path, c.summary)),
    "",
    ...destinationGuides.flatMap(g => ["", `## The complete ${g.name} guide`, ...g.chapters.map(c => link(c.label, c.path, c.summary))]),
    "",
    "## Student cities in France",
    ...cities.map(c => link(`Study in ${c.name}`, `/cities/${c.slug}`, `student life in ${c.name}`)),
    "",
    "## Articles",
    ...articles.map(a => link(a.title, `/insights/${a.slug}`, a.intro)),
    "",
    "## Frequently asked questions",
    ...faqs.flatMap(([q, a]) => [`### ${q}`, a, ""]),
    "## Contact",
    `- Email: ${brand.email}`,
    `- WhatsApp: +${brand.whatsappNumber}`,
    `- Instagram: ${brand.socialLinks.instagram}`,
    `- LinkedIn (${brand.person}): ${brand.socialLinks.linkedin}`,
    `- Website: ${siteUrl}`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
