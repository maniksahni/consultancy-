# Althéa Consulting — Search, AI visibility & performance controls (2026)

## Technical implementation
- Canonical host currently `https://consultancyworld2.web.app`. **Do not change to altheaconsulting.in or .com until DNS, redirects and ownership have been verified.** After migration: update NEXT_PUBLIC_SITE_URL, verify both host variants, redirect old URLs 301, update Search Console and sitemap.
- Static site uses Firebase Hosting + Next export. Catch-all SPA rewrite removed so unknown routes return a genuine 404 instead of an indexable homepage (soft-404 risk).
- Sitemap includes only self-canonical France pages, not legacy duplicates or unsupported success claims. Robots allows crawling so a crawler can actually process noindex and canonical directives.
- Structured data: Organization/WebSite sitewide, relevant WebPage/BreadcrumbList on France pages. Do not add unsupported tuition prices, university partnerships, fake AggregateRating, or FAQ rich-result markup.
- France answers are rendered in server HTML with explicit links to Campus France/France-Visas.

## Performance engineering
- Hero uses responsive 360/600/900/1200px image candidates, high fetch priority, explicit dimensions, CDN preconnect.
- Firebase modules load only on enquiry submission, reducing the initial JavaScript required for the landing page.
- Native Next hydration retained; the former two-requestAnimationFrame manual JavaScript delay is removed.
- Immutable hashed Next assets retain 1-year cache; static shared files use shorter revalidation; HTML is uncached.
- Check mobile, tablet and desktop layout using the GitHub Playwright matrix. CI stores unthrottled lab LCP/FCP/CLS and screenshots; **those are not real-user CrUX Core Web Vitals**.

## Performance targets — measured at p75 of real users where sample size allows
- LCP <= 2.5s, INP <= 200ms, CLS <= 0.1.
- Performance/SEO baseline from live deployed URL with Lighthouse mobile + desktop, and field monitoring in Google Search Console Core Web Vitals.
- The GitHub build quality gate reports compressed first-party JS and HTML sizes on 14 indexable routes.
- Watch real mobile networks and image CDN failures before claiming any score.

## SEO & AEO/GEO content quality controls
- Content should answer specific India-to-France queries from original human expertise, link to dated official regulations and answer eligibility uncertainty explicitly.
- Avoid mass AI-generated location/programme pages with no unique information; no official API affiliation claims or stale fee/deadline values.
- All student reviews, named university admissions outcomes and scholarships require evidence and student publication consent **before claiming they are verified**. No review rich-result schema is emitted by this change.
- French Ministry datasets are not the live Campus France admissions catalogue; preserve provenance and dates.
- Add transcripts/captions and real, owned images where appropriate. Strong internal navigation from advice to course finder and enquiry.
- Verify the real business name, physical location and ownership before creating Google Business Profile/LocalBusiness markup. Do not invent a Paris office based solely on a design or business-card mockup.

## Launch and measurement checklist
1. Deploy only after TypeScript, build, SEO validator and viewport/interaction QA pass.
2. Inspect deployed `/robots.txt`, `/sitemap.xml`, 404 handling and canonical URLs (HTTPS / domain variants).
3. Verify domain property in Google Search Console and submit sitemap; check index coverage and URL inspection.
4. Track Search Console clicks/impressions, non-branded France education queries, pages discovered and Core Web Vitals weekly.
5. Track AI-sourced referrals and attributed enquiries where consent and analytics setup permit; ranking/citation inclusion is never guaranteed.
6. Review content/source freshness monthly and fix dead official links.
