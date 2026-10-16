import { brand } from "@/config/brand";
import { articles, cities, faqs } from "@/data/france";
import { guides } from "@/data/franceGuides";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

// A plain-text site summary for AI answer engines (llmstxt.org), built from the same data the pages render.
export function GET() {
  const link = (name: string, path: string, note: string) => `- [${name}](${siteUrl}${path}): ${note}`;
  const body = [
    `# ${brand.name}`,
    "",
    `> ${brand.name} (${siteUrl.replace("https://", "")}) is an independent study-in-France and career advisory founded by ${brand.person}, ${brand.role}, based in ${brand.location}. It helps Indian and international students choose French universities and programmes, follow the Campus France / Études en France procedure, prepare the student visa file, settle in France and find internships, alternance and jobs.`,
    "",
    "Universities decide admissions and French authorities decide visas; Althéa does not guarantee admission, scholarships, visas or jobs. Fees, deadlines and rules are linked to official sources (Campus France, France-Visas, universities) and should be re-checked before applying.",
    "",
    "## Services",
    link("Study in France from India", "/study-in-france", "course and university shortlisting, Campus France route, requirements and budget planning"),
    link("Settle in France", "/settle-in-france", "arrival, housing, bank, insurance and student-life orientation"),
    link("Career support in France", "/career-support", "French-style CV, LinkedIn, interviews, internships and alternance"),
    link("Book a consultation", "/book-consultation", `speak with ${brand.person}`),
    link("About", "/about", `${brand.name} and ${brand.person}`),
    "",
    "## France guides",
    link("Campus France India application guide", "/campus-france-guide", "the Études en France procedure step by step"),
    ...guides.map(g => link(`${g.title} ${g.accent}`, `/france/${g.slug}`, g.summary)),
    link("First 30 days in France checklist", "/first-30-days-france", "printable arrival checklist for international students"),
    link("Scholarships", "/scholarships", "study abroad scholarships and funding"),
    link("Universities in France", "/france/universities", "researched programmes, tuition and application timing"),
    link("Jobs", "/jobs", "jobs, internships and work-study pathways in France and six other countries"),
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
