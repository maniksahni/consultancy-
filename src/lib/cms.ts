import raw from "@/data/generated/cms.json";

/** Pages, blog articles and site-wide SEO published from the admin's content studio (see scripts/data/fetch-cms.mjs). */
export type CmsPage = {
  slug: string; type: "blog" | "page" | "landing"; status: "Published" | "Draft"; title: string; excerpt: string; body: string;
  sort: number; image: string; imageAlt: string; category: string; author: string; readingTime: string; layout: "standard" | "wide";
  showHero: boolean; inHeader: boolean; inFooter: boolean; metaTitle: string; metaDescription: string;
  created: string; updated: string; publishedAt: string;
};
export type CmsMedia = { id: string; name: string; path: string; mime: string; bytes: number; width: number; height: number; alt: string; uploaded: string };
export type CmsFaq = { q: string; a: string };
export type CmsSeo = {
  instagram: string; linkedin: string; facebook: string; youtube: string; googleVerification: string; bingVerification: string;
  robotsDisallow: string; faq: string; llmsIntro: string; blogTitle: string; blogIntro: string;
};

const data = raw as unknown as { version: string; pages: CmsPage[]; media: CmsMedia[]; seo: Partial<CmsSeo> };

export const cmsVersion = data.version;
export const cmsSeo: CmsSeo = {
  instagram: "", linkedin: "", facebook: "", youtube: "", googleVerification: "", bingVerification: "", robotsDisallow: "", faq: "[]", llmsIntro: "",
  blogTitle: "Study in France journal", blogIntro: "Practical, checked guidance on studying, settling and working in France, written from Paris.",
  ...data.seo,
};
const byDate = (a: CmsPage, b: CmsPage) => (b.publishedAt || b.updated).localeCompare(a.publishedAt || a.updated);
export const blogPosts = data.pages.filter((p) => p.type === "blog").sort(byDate);
export const sitePages = data.pages.filter((p) => p.type !== "blog").sort((a, b) => a.sort - b.sort);
export const cmsPath = (p: Pick<CmsPage, "type" | "slug">) => (p.type === "blog" ? `/blog/${p.slug}` : `/${p.slug}`);
export const headerLinks = data.pages.filter((p) => p.inHeader).sort((a, b) => a.sort - b.sort).map((p) => ({ label: p.title, href: cmsPath(p) }));
export const footerLinks = data.pages.filter((p) => p.inFooter).sort((a, b) => a.sort - b.sort).map((p) => [p.title, cmsPath(p)] as [string, string]);
export const cmsFaq: CmsFaq[] = (() => { try { return (JSON.parse(cmsSeo.faq || "[]") as CmsFaq[]).filter((f) => f.q && f.a); } catch { return []; } })();
export const cmsSocials = [cmsSeo.instagram, cmsSeo.linkedin, cmsSeo.facebook, cmsSeo.youtube].filter((u) => /^https:\/\//.test(u));

/** The search title before " | Althéa Consulting": at most 40 characters, cut at a word, and unique among CMS pages. */
export function cmsSearchTitle(page: CmsPage) {
  const base = (s: string) => {
    const t = s.trim();
    if (t.length <= 40) return t;
    const cut = t.slice(0, 39);
    return `${cut.slice(0, cut.lastIndexOf(" ") > 20 ? cut.lastIndexOf(" ") : 39).replace(/[\s,·:;—-]+$/, "")}…`;
  };
  const mine = base(page.metaTitle || page.title);
  const clashes = data.pages.filter((p) => base(p.metaTitle || p.title).toLowerCase() === mine.toLowerCase());
  if (clashes.length < 2) return mine;
  const n = clashes.indexOf(page) + 1;
  return n > 1 ? `${base(mine.replace(/…$/, "")).slice(0, 35).trim()} (${n})` : mine;
}

/** A search description: the one she wrote, else the excerpt, else the start of the article; never over 160 characters. */
export function cmsDescription(page: CmsPage) {
  const text = (page.metaDescription || page.excerpt || page.body.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
  if (text.length <= 160) return text || `${page.title} — Althéa Consulting, Paris.`;
  const cut = text.slice(0, 157);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 100 ? cut.lastIndexOf(" ") : 157)}…`;
}

export const readingTime = (page: CmsPage) => page.readingTime || `${Math.max(1, Math.round(page.body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 220))} min read`;

/** Slug of the throwaway page a dynamic CMS route builds when nothing is published (see drop-placeholders.mjs). */
export const CMS_PLACEHOLDER = "cms-placeholder";
