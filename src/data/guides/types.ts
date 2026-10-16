/** A complete, in-site study-abroad guide: every chapter answers its topic on the page itself. */
export type GuideSource = { label: string; url: string };

export type GuideBlock = {
  heading: string;
  paragraphs?: string[];
  steps?: { title: string; body: string }[];
  checklist?: string[];
  table?: { head: string[]; rows: string[][]; caption?: string };
};

export type GuideChapter = {
  slug: string;
  /** Site path of the chapter page. */
  path: string;
  /** Short label used in chapter navigation. */
  label: string;
  eyebrow: string;
  title: string;
  accent: string;
  /** Search title, max 39 characters (the brand suffix is appended). */
  seoTitle: string;
  /** Search description, max 160 characters. */
  description: string;
  /** Direct answer shown under the heading; written to be quotable on its own. */
  summary: string;
  facts?: { label: string; value: string; note?: string }[];
  blocks: GuideBlock[];
  faqs?: { q: string; a: string }[];
  sources: GuideSource[];
  reviewedAt: string;
};

export type CountryGuide = {
  country: string;
  /** Short name for labels, e.g. "UK". */
  name: string;
  /** Name as used in a sentence, e.g. "the UK". */
  prose: string;
  /** The country hub page the chapters belong to. */
  hubPath: string;
  chapters: GuideChapter[];
};
