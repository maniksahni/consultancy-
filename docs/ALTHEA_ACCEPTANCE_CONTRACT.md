# ALTHÉA CONSULTING — NON-NEGOTIABLE ACCEPTANCE CONTRACT
Version: 2026-10-14. This document tracks the screenshots and explicit user instructions.

## Brand and visuals — MUST
- Exact brand: **Althéa Consulting** (accent in display; URL-friendly altheaconsulting).
- A distinctive, genuinely Parisian/French atmosphere: editorial composition, architecture, thoughtful travel-postcard motifs and refined French details.
- **Formal, luxury, elegant** — not noisy, generic study-abroad cards, or excessive WebGL/particle effects.
- Use supplied business-card direction: royal/French blue, white, thoughtful Eiffel motif, elegant serif/sans pairing, luxury finishing.
- Canva inspiration: Paris collage / vintage-premium editorial mood, not plagiarism of Canva templates.
- Student-facing copy must be accurate, restrained and persuasive.
- Maintain strong brand identity across every public route, footer, social previews, metadata and emails.

## Information — ALL required, source-backed
- Official Campus France programme catalogues and country-specific Campus France India guidance.
- Études en France journey: residency rules, DAP and non-DAP, accounts, documents, interviews where applicable, key calendar/fees sourced to relevant year and country.
- University finder covering city, subject, degree, programme, language of instruction, tuition and funding, eligibility and source date as fields when verified.
- University detail pages with official website, official programme URL, official application path; never claim partnerships without a signed arrangement.
- Course discovery (Bachelor, Master, Doctorate), searchable by keyword, field, language, city, degree, intake and cost where source coverage permits.
- Scholarships: official links, nationality/degree/eligibility requirements, amount, deadline, provider and last verified date.
- Visa: France-Visas links, visa pathway information, documents, finances and interview where relevant; never claim guarantees.
- Accommodation and arrival: France housing, cities and practical checklist with official local guidance.
- FAQ with sourced answers, citation URLs and date updated.
- User enquiry, consultation, WhatsApp and clear contact information, confirmed by the business owner.

## Data extraction — mandatory engineering requirements
- Research first whether Campus France offers a documented public feed/export API and reuse only with permission/licensing.
- Connect allowed public institutional feeds, institutional course pages and public governmental datasets (e.g. open-data sources with compatible licence) using server-side scheduled import; never run uncontrolled full-site scrapers in clients.
- Rate limits, robots/terms checks, retry/backoff, caching, safe errors, provenance and deduplication per institution/programme.
- Required schema: provider, institution ID, programme ID, programme name, level, city, subject, language, fees/currency, eligibility, duration, dates, URL, obtainedAt, lastVerifiedAt, copyright/licence, quality status.
- Missing data is `Not yet verified`, not a fabricated default. Distinguish official live values, curated verified entries, and outdated records.
- Extraction into staging -> validation/moderation -> published snapshot; never auto-publish unreviewed scraped records.
- Source URLs must be visible to students. No implicit affiliation with Campus France.
- Monitoring for stale programme records, broken links and differing institution values.

## UX and features — mandatory
- Student-centred journeys that can actually be completed; no dead CTAs or mock forms posing as real submissions.
- Eligibility/pathway discovery is guidance, not an admissions/visa decision.
- Robust responsive layouts 320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920; no clipped sections, invisible cart/nav-style controls, overflows, overlapping text, or inaccessible touch targets.
- Beautiful desktop **and** phone composition, not desktop shrunk to fit mobile.
- Accessible sticky navigation, keyboard functionality, focus states, reduced motion, proper form labels, min 44px targets, correct semantic headings.
- Motion with purpose: editorial reveals, sensible hover/focus feedback, gentle image depth. Default to lightweight static content when animations harm performance.
- Next.js static export / Firebase Hosting deploy mode must work with routes, sitemaps, canonical metadata and testing.
- Source attribution, truthful testimonials (verified permission), no fabricated agency accreditation/reviews, no invented deadlines or scholarships.
- Basic lead conversion analytics only with privacy consent and real data.

## Current implementation state in PR #4
- [x] Rebrand homepage/nav/footer + SEO metadata.
- [x] Parisian editorial homepage, mobile-first navigation, purposeful content.
- [x] Dedicated Study in France hub with official resource links.
- [x] Curated 5-university source-linked finder with city/discipline filters.
- [x] Campus France guide, interactive high-level application route finder.
- [x] Small allowlisted official-site metadata/schema candidate extractor for editorial review.
- [x] CI configuration for 9 widths x 3 routes plus basic interaction checks.
- [ ] Full Campus France/open-data permitted programme ingestion & verified catalogue publishing.
- [ ] Comprehensive university and programme pages with tuition/intake/eligibility records.
- [ ] Scholarships, housing, visa, and student-facing account features beyond source links.
- [ ] All legacy routes' copy/content migration and full brand QA.
- [ ] Confirm owner contact details and portrait copyright/identity with the business.
- [ ] Cross-browser real-device QA, production Lighthouse/performance review, end-to-end leads.
- [ ] Firebase deployment — gated on build/test/content verification.

## Definition of done
No claim of completion until production build and real interactive flows pass, visual QA on key phone/laptop sizes is reviewed, live site matches approved design, university info has real citations, and user acceptance is recorded. Keep all unmet items visible.
