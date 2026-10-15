# Get Althéa into Google Search

The production site is publicly crawlable: `robots.txt` allows crawling, the homepage returns HTTP 200, pages declare `index, follow`, and `https://altheaconsulting.in/sitemap.xml` lists the canonical page URLs. These signals make pages eligible for discovery; Google decides when and whether to index each URL.

## Verify and request indexing

1. Add the **Domain** property `altheaconsulting.in` in Google Search Console and verify the DNS TXT record with the domain provider. This covers both `www` and non-`www` hostnames.
2. Submit `https://altheaconsulting.in/sitemap.xml` in the Sitemaps report. Confirm its read status and discovered URL count.
3. Use URL Inspection for the homepage, `/study-in-france`, `/settle-in-france`, and `/career-support`. Check the indexed URL's selected canonical, then run **Test live URL**.
4. If live tests pass, request indexing for those priority pages. Check Page indexing for a reason if the request is rejected or the pages remain excluded. A request enters a queue and is not a guarantee of indexing.
5. Repeat for other important pages after their rendered content is final. Don't repeatedly submit the same unchanged URLs.

Optional HTML-tag verification is supported at build time with `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`. Set its value to the token Google provides, then rebuild and deploy. DNS verification is preferable because it verifies the whole domain property without changing site code.

Google may take days or weeks to crawl and index a new or recently changed site. Monitor Search Console's Page indexing and Performance reports to distinguish discovery, crawl, indexing and ranking. A `site:` search is only a rough check; URL Inspection is the authoritative per-URL diagnostic.

## Search Console progress — 14 October 2026

- The domain property `altheaconsulting.in` is verified and the sitemap is submitted. Search Console reported **Success** and **67 discovered pages**. The live sitemap currently lists 67 canonical URLs; the local SEO validator separately checks 69 exported HTML pages, including pages intentionally omitted from the sitemap.
- URL Inspection shows the homepage and `/study-in-france` are on Google. The homepage and `/insights` have prior indexing-request confirmations; do not resubmit unchanged pages.
- `/settle-in-france`, `/career-support`, `/book-consultation` and `/france/institutions` passed **Test live URL** (“URL is available to Google” / “Page can be indexed”) and were added to the priority crawl queue on 14 October 2026.
- `/destinations` is not indexed. Its indexed report selected the unrelated `https://www.747live.bet/` as canonical, while the current live page and Google's live render both declare `https://altheaconsulting.in/destinations`. The live HTML contains no reference to the unrelated domain. A recrawl request was attempted but rejected because the daily quota was exceeded; it is **not queued**. Retry once the quota resets and check Google's selected canonical after recrawl. Search Console's Security issues and Manual actions reports both show **No issues detected**.
- A live `site:altheaconsulting.in` Google search showed the homepage result as `http://altheaconsulting.in/`; HTTP currently redirects to the canonical HTTPS URL. Treat this as a stale indexed result and recheck after Google recrawls the homepage.
- Search Console's overall Page indexing report is still processing data. Queue requests are not proof of indexing; recheck Page indexing after Google crawls the submitted URLs and do not repeatedly submit the same URLs.

## Brand mark and favicon refresh — 15 October 2026

- Restored the Althéa logo lockup in the global header and footer. Added a stable square 512×512 PNG favicon alongside the SVG and point the Organization structured-data `logo` to that square PNG.
- Verified the live homepage advertises both favicon formats and the header/footer logo assets. The PNG is publicly crawlable. Google Search Console confirms the homepage is indexed and accepted a fresh indexing request on 15 October 2026 after the logo/favicon update.
- Google can take several days or weeks to recrawl and refresh a favicon, and display is not guaranteed. Recheck the Google result after the next crawl; do not submit the homepage again unless it changes.

## Search appearance diagnosis — 15 October 2026

The user reported a globe favicon, a single homepage result without sitelinks, and no Althéa citation in the AI answer for a branded query. Live inspection found HTTP 200 responses for the homepage, robots file, sitemap, root ICO, 512×512 PNG and SVG favicon. The homepage already advertises all three icon formats, `og:site_name` and WebSite structured data. There is no evidence that an unavailable or blocked favicon caused the reported globe.

Search Console's homepage inspection reports **URL is on Google**, a successful smartphone crawl on **14 October 2026 at 21:30:11** (as displayed in Search Console), crawling and indexing allowed, and the inspected HTTPS URL as Google's canonical. This crawl predates the 15 October favicon refresh. The overview still reports that performance and indexing data are processing. These observations do not establish why Google chose a particular favicon or omitted sitelinks.

Additional changes clarify the brand in visible homepage content, add a visible six-link service navigation, use descriptive headings for About, Services, Career Support, Reviews and Consultation pages, simplify the university navigation URL, specify the ICO's actual embedded sizes, and describe the existing logo with its image dimensions. Organization details identify Paris, France and the founder, without claiming unsupported affiliations or linking unrelated similarly named consulting firms.

Google controls favicon selection, site names, sitelinks and AI citations. No markup can force a six-link result or AI Overview inclusion. Do not change favicon URLs repeatedly or submit unchanged pages every day. Reassess after Google crawls the updated page.

Official references:
- https://developers.google.com/search/docs/appearance/favicon-in-search
- https://developers.google.com/search/docs/appearance/sitelinks
- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/appearance/ai-features

### Publication verification — 15 October 2026

The first Firebase upload failed with a content-hash mismatch. A separate snapshot of the export passed the 69-page audit and was successfully released to Firebase Hosting (`consultancyworld2`). Post-deployment HTTP checks on `https://altheaconsulting.in` confirmed the six-link homepage navigation, updated About/Career/Reviews/Services/Consultation headings, the brand FAQ answer, the Organization logo dimensions and the public 512px favicon. Priority-page layout checks passed at 320, 390, 768 and 1440 pixels.

Search Console also confirms that `/about` is already indexed. A missing grouped sitelink does not mean that the About page is absent from Google's index.

A fresh homepage indexing request was attempted after publication. Google's live-indexability test ran, then an empty reCAPTCHA iframe appeared without an acceptance dialog. No CAPTCHA was completed and **this new request is not confirmed as queued**. The user-owned Search Console tab was left open for follow-up. The earlier 15 October request recorded above remains the last confirmed request. Screenshot: `audit/seo-google-indexed-20261015.png`.

## Follow-up verification — 15 October 2026

A fresh live Google search for `althéa consulting` in the user's connected Chrome session showed the homepage as the first organic result, with separate About and Programmes results. The homepage still displayed a generic globe, an HTTP display URL, and no grouped sitelinks. These are observations from this personalised search, not universal rank claims. The expanded AI Overview described Althéa Groupe (management/digital transformation consulting), linked that unrelated firm's domain and did not cite altheaconsulting.in.

The prior indexing-request dialog has now resolved to **“Oops! Something went wrong — We had a problem submitting your indexing request. Please try again later.”** Therefore that fresh request failed; it is not merely pending verification and must not be reported as queued.

Independent HTTP verification confirmed 200 responses on the homepage, About, Study, Settle, Career, Reviews and Consultation pages; the six-link homepage navigation; canonical HTTPS metadata; index/follow and unrestricted Google snippet controls; Organization/Person/WebSite/WebPage entities; the public 512×512 PNG favicon and root ICO; permissive robots.txt; and 67 canonical sitemap URLs.

Evidence:
- `audit/google-verification-full-20261015.png`
- `audit/google-indexing-request-failed-20261015.png`
