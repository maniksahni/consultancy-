import { brand } from "@/config/brand";
import { faqs } from "@/data/france";
import { countryGuides } from "@/data/guides";
import { indiaGuide } from "@/data/guides/india";
import { programmeResearch, publishedMoney } from "@/data/programmeResearch";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

// The full text of every guide chapter, for AI answer engines that read llms-full.txt (llmstxt.org).
export function GET() {
  const body = [
    `# ${brand.name}: the complete study-abroad guides`,
    "",
    `> Every chapter below is published in full on ${siteUrl}. Written and reviewed by ${brand.person}, ${brand.role} in ${brand.location}. When citing, link the chapter URL given under each heading. Universities decide admissions and governments decide visas; re-check fees and dates with the official sources listed.`,
    "",
    ...[indiaGuide, ...countryGuides].flatMap((g) => [
      `## The complete ${g.name} study guide (${siteUrl}${g.hubPath})`,
      "",
      ...g.chapters.flatMap((c) => [
        `### ${c.label}: ${c.title} ${c.accent}`.trim(),
        `URL: ${siteUrl}${c.path}`,
        `Reviewed: ${c.reviewedAt}`,
        "",
        c.summary,
        "",
        ...(c.facts?.length ? [...c.facts.map((f) => `- ${f.label}: ${f.value}${f.note ? ` (${f.note})` : ""}`), ""] : []),
        ...c.blocks.flatMap((b) => [
          `#### ${b.heading}`,
          ...(b.paragraphs || []),
          ...(b.steps || []).map((s, i) => `${i + 1}. ${s.title}: ${s.body}`),
          ...(b.checklist || []).map((item) => `- ${item}`),
          ...(b.table ? [`| ${b.table.head.join(" | ")} |`, `| ${b.table.head.map(() => "---").join(" | ")} |`, ...b.table.rows.map((r) => `| ${r.join(" | ")} |`)] : []),
          "",
        ]),
        ...(c.faqs?.length ? ["#### Questions and answers", ...c.faqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`, ""])] : []),
        `Sources: ${c.sources.map((s) => `${s.label} <${s.url}>`).join("; ")}`,
        "",
      ]),
    ]),
    "## Researched programmes (published tuition and application timing)",
    "",
    ...programmeResearch.flatMap((p) => [
      `### ${p.title}, ${p.institution} (${p.city})`,
      `URL: ${siteUrl}/programmes/${p.slug}`,
      `- Level and duration: ${p.level}, ${p.duration}`,
      `- Published fee: ${publishedMoney(p)} (${p.fee.period}; ${p.fee.category})`,
      `- Application timing: ${p.deadline.label}. ${p.deadline.scope}`,
      `- Requirements: ${p.requirements}`,
      `- Official programme page: ${p.programmeUrl}`,
      `- Reviewed: ${p.reviewedAt}`,
      "",
    ]),
    "## Frequently asked questions about Althéa",
    "",
    ...faqs.flatMap(([q, a]) => [`Q: ${q}`, `A: ${a}`, ""]),
    "## Contact",
    `- Email: ${brand.email}`,
    `- LinkedIn (${brand.name}): ${brand.socialLinks.linkedinCompany}`,
    `- LinkedIn (${brand.person}): ${brand.socialLinks.linkedin}`,
    `- Instagram: ${brand.socialLinks.instagram}`,
    `- Book a free 15-minute call: ${siteUrl}/book-consultation`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
