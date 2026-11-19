import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/seo";
import { cmsSeo } from "@/lib/cms";
// Search and AI answer crawlers named explicitly so the site can be cited in AI search results.
const answerEngines = ["Googlebot", "Bingbot", "Google-Extended", "OAI-SearchBot", "ChatGPT-User", "GPTBot",
  "PerplexityBot", "Perplexity-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "Applebot-Extended"];
// Extra paths Harshita blocks from the admin (Robots.txt); the site root itself can never be blocked.
const disallow = cmsSeo.robotsDisallow.split("\n").map((l) => l.trim()).filter((l) => /^\/[\w\-./*?=&%]+$/.test(l));
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [{ userAgent: "*", allow: "/", ...(disallow.length ? { disallow } : {}) }, { userAgent: answerEngines, allow: "/", ...(disallow.length ? { disallow } : {}) }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
