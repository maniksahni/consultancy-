import { franceGuide } from "./france";
import { ukGuide } from "./uk";
import { usaGuide } from "./usa";
import { canadaGuide } from "./canada";
import { germanyGuide } from "./germany";
import { australiaGuide } from "./australia";
import { irelandGuide } from "./ireland";
import type { ChapterDepth, CountryGuide } from "./types";
import { depth } from "./deep";

/** Appends a chapter's in-depth sections, FAQs and sources (see guides/deep). */
function withDepth(guide: CountryGuide): CountryGuide {
  const extra = depth[guide.country] || {};
  return { ...guide, chapters: guide.chapters.map((c) => {
    const d: ChapterDepth | undefined = extra[c.slug];
    if (!d) return c;
    const sources = [...c.sources, ...(d.sources || [])].filter((s, i, all) => all.findIndex((x) => x.url === s.url) === i);
    return { ...c, facts: d.facts ? [...(c.facts || []), ...d.facts] : c.facts,
      blocks: [...c.blocks, ...(d.blocks || []).map((b) => ({ ...b, more: b.more ?? true }))], faqs: [...(c.faqs || []), ...(d.faqs || [])], sources };
  }) };
}

export const countryGuides: CountryGuide[] = [franceGuide, ukGuide, usaGuide, canadaGuide, germanyGuide, australiaGuide, irelandGuide].map(withDepth);
/** Guides whose chapters live under /destinations/<country>/<chapter>. */
export const destinationGuides = countryGuides.filter((g) => g.country !== "france");
export const guideFor = (country: string) => countryGuides.find((g) => g.country === country);

/** The France guide with its in-depth sections merged (use this for France chapter pages). */
export const franceGuideFull = guideFor("france")!;
export const franceChapterFull = (slug: string) => franceGuideFull.chapters.find((c) => c.slug === slug);
