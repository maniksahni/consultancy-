import type { ChapterDepth } from "../types";
import { franceDepth } from "./france";
import { ukDepth } from "./uk";
import { usaDepth } from "./usa";
import { canadaDepth } from "./canada";
import { germanyDepth } from "./germany";
import { australiaDepth } from "./australia";
import { irelandDepth } from "./ireland";
import { extraDepth } from "./extra";

/** In-depth additions per country, keyed by chapter slug. */
const base: Record<string, Record<string, ChapterDepth>> = {
  france: franceDepth,
  uk: ukDepth,
  usa: usaDepth,
  canada: canadaDepth,
  germany: germanyDepth,
  australia: australiaDepth,
  ireland: irelandDepth,
};

const join = (a: ChapterDepth = {}, b: ChapterDepth = {}): ChapterDepth => ({
  facts: a.facts || b.facts ? [...(a.facts || []), ...(b.facts || [])] : undefined, blocks: [...(a.blocks || []), ...(b.blocks || [])],
  faqs: [...(a.faqs || []), ...(b.faqs || [])], sources: [...(a.sources || []), ...(b.sources || [])],
});

/** Base depth plus the cross-cutting additions in ./extra (tax on earnings, long-term residence). */
export const depth: Record<string, Record<string, ChapterDepth>> = Object.fromEntries(Object.entries(base).map(([country, chapters]) => {
  const extra = extraDepth[country] || {};
  const slugs = [...new Set([...Object.keys(chapters), ...Object.keys(extra)])];
  return [country, Object.fromEntries(slugs.map((slug) => [slug, extra[slug] ? join(chapters[slug], extra[slug]) : chapters[slug]]))];
}));
