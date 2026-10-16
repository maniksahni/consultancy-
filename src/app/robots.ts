import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/seo";
// Search and AI answer crawlers named explicitly so the site can be cited in AI search results.
const answerEngines = ["Googlebot", "Bingbot", "Google-Extended", "OAI-SearchBot", "ChatGPT-User", "GPTBot",
  "PerplexityBot", "Perplexity-User", "ClaudeBot", "Claude-SearchBot", "Claude-User", "Applebot-Extended"];
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [{ userAgent: "*", allow: "/" }, { userAgent: answerEngines, allow: "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
