# Search readiness

Every content route has a title, description, absolute canonical URL, Open Graph and Twitter metadata. `/france` and `/france/campus-france` intentionally canonicalize to their existing guide pages. The sitemap includes the canonical France resource and topic pages.

Production builds (`npm run build`) allow indexing. Local development is blocked unless a site URL is configured. Set `SITE_INDEXABLE=false` for a private preview build, including previews that already have a site URL. Canonical URLs always use `brand.canonicalUrl`; update the brand config if the production domain changes. Deploy private previews separately from the production export.

Organization, adviser and website entities share stable JSON-LD identifiers. FAQ markup uses exactly the questions and answers rendered by the existing accordion. Articles link their official source through `citation`, retain the existing editorial date, and identify their publisher. Do not update review dates unless the source has actually been checked. Avoid adding fabricated reviews, qualifications, contact information or admission guarantees.

## After publishing

1. Verify the production domain in Google Search Console and Bing Webmaster Tools; submit `/sitemap.xml`.
2. Inspect the homepage, a programme, a guide and an article in Search Console. Check Google's Rich Results Test and Schema.org validator.
3. Check canonical host redirects and HTTPS on alternate domains through the domain hosting settings.
4. Track search impressions, clicks, consultation enquiries and relevant AI citations over time. Structured data and crawlability do not guarantee rankings or AI recommendations.
5. Keep programme deadlines, tuition, official citations and source review dates current. Expand answers using real consultation questions and first-hand adviser expertise.

Reference: https://developers.google.com/search/docs/appearance/ai-features
