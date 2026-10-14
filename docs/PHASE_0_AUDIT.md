# Phase 0 audit — 14 October 2026

No application edits during audit. Live reference: https://altheaconsulting.in.

Baseline build passed. Lighthouse mobile simulated throttling: P82 / A100 / BP96 / SEO100; LCP3.7s, CLS0, TBT160ms. One run; not a field measurement.

## Route → direct module map

- `src/app/about/page.tsx`: `src/components/althea/Page.tsx`

- `src/app/acknowledgements/page.tsx`: `src/components/althea/Page.tsx`

- `src/app/admissions-process/page.tsx`: `src/components/althea/Page.tsx`, `src/components/althea/Procedure.tsx`

- `src/app/book-consultation/page.tsx`: `src/components/althea/Page.tsx`, `src/components/althea/Booking.tsx`

- `src/app/campus-france-guide/page.tsx`: `src/components/althea/Page.tsx`, `src/components/althea/Procedure.tsx`

- `src/app/cities/[slug]/page.tsx`: `src/components/althea/Page.tsx`, `src/data/france.ts`

- `src/app/destinations/[slug]/page.tsx`: `src/components/layout/Navbar.tsx`, `src/components/althea/KnowledgeHub.tsx`, `src/components/layout/Footer.tsx`, `src/data/destinations.ts`

- `src/app/destinations/page.tsx`: `src/components/althea/Page.tsx`, `src/components/althea/DestinationAtlas.tsx`

- `src/app/faq/page.tsx`: `src/components/althea/Page.tsx`, `src/components/althea/FAQ.tsx`, `src/data/france.ts`

- `src/app/france/[topic]/page.tsx`: `src/components/althea/Page.tsx`, `src/data/franceGuides.ts`

- `src/app/france/campus-france/page.tsx`: `src/app/campus-france-guide/page.tsx`

- `src/app/france/institutions/page.tsx`: `src/components/althea/Page.tsx`, `src/components/althea/LiveFrenchRegistry.tsx`

- `src/app/france/page.tsx`: `src/app/study-in-france/page.tsx`

- `src/app/france/programmes/page.tsx`: `src/components/althea/Page.tsx`, `src/components/althea/ProgrammeSearch.tsx`

- `src/app/france/resources/page.tsx`: `src/components/althea/Page.tsx`

- `src/app/france/universities/page.tsx`: `src/components/althea/Page.tsx`, `src/components/althea/UniversityExplorer.tsx`

- `src/app/insights/[slug]/page.tsx`: `src/components/althea/Page.tsx`, `src/data/france.ts`

- `src/app/insights/page.tsx`: `src/components/althea/Page.tsx`, `src/data/france.ts`

- `src/app/knowledge/page.tsx`: `src/components/althea/Page.tsx`, `src/components/althea/KnowledgeHub.tsx`, `src/components/althea/BudgetPlanner.tsx`, `src/data/studyKnowledge.ts`

- `src/app/mentorship-model/page.tsx`: `src/components/althea/Page.tsx`, `src/data/france.ts`

- `src/app/outcomes/page.tsx`: `src/components/althea/Page.tsx`

- `src/app/page.tsx`: `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`, `src/components/althea/DestinationAtlas.tsx`, `src/components/althea/ChapterConcierge.tsx`, `src/components/althea/Testimonials.tsx`, `src/components/althea/FAQ.tsx`, `src/data/france.ts`

- `src/app/privacy/page.tsx`: `src/components/althea/Page.tsx`

- `src/app/programmes/[slug]/page.tsx`: `src/data/programmeResearch.ts`, `src/components/althea/ProgrammeEvidence.tsx`

- `src/app/programmes/page.tsx`: `src/components/althea/Page.tsx`, `src/components/althea/ProgrammeResearchFinder.tsx`

- `src/app/reviews/page.tsx`: `src/components/althea/Page.tsx`, `src/components/althea/Testimonials.tsx`

- `src/app/scholarships/page.tsx`: `src/components/althea/Page.tsx`, `src/data/france.ts`

- `src/app/services/page.tsx`: `src/components/althea/Page.tsx`

- `src/app/study-in-france/page.tsx`: `src/components/althea/Page.tsx`, `src/components/althea/KnowledgeHub.tsx`, `src/data/france.ts`

- `src/app/terms/page.tsx`: `src/components/althea/Page.tsx`

- `src/app/universities/page.tsx`: `src/components/althea/Page.tsx`, `src/components/althea/Finder.tsx`

## Active components

- `src/components/althea/Booking.tsx`

- `src/components/althea/BudgetPlanner.tsx`

- `src/components/althea/ChapterConcierge.tsx`

- `src/components/althea/DestinationAtlas.tsx`

- `src/components/althea/FAQ.tsx`

- `src/components/althea/Finder.tsx`

- `src/components/althea/KnowledgeHub.tsx`

- `src/components/althea/LiveFrenchRegistry.tsx`

- `src/components/althea/Page.tsx`

- `src/components/althea/Procedure.tsx`

- `src/components/althea/ProgrammeEvidence.tsx`

- `src/components/althea/ProgrammeResearchFinder.tsx`

- `src/components/althea/ProgrammeSearch.tsx`

- `src/components/althea/Testimonials.tsx`

- `src/components/althea/UniversityExplorer.tsx`

- `src/components/layout/Footer.tsx`

- `src/components/layout/Navbar.tsx`

## Unreachable components (reported before deletion)

- `src/components/althea/Reveal.tsx`

- `src/components/common/BackToTop.tsx`

- `src/components/common/CookieBanner.tsx`

- `src/components/common/CountryFlag.tsx`

- `src/components/common/FloatingWhatsApp.tsx`

- `src/components/common/IntakeTicker.tsx`

- `src/components/common/SkipToContent.tsx`

- `src/components/common/StatCounter.tsx`

- `src/components/common/UTMTracker.tsx`

- `src/components/experience/ComparisonSpotlight.tsx`

- `src/components/experience/CustomCursor.tsx`

- `src/components/experience/FAQAccordion.tsx`

- `src/components/experience/MicroAnimation.tsx`

- `src/components/experience/MorphBlob.tsx`

- `src/components/experience/RouteCurtain.tsx`

- `src/components/experience/ScrollExperience.tsx`

- `src/components/experience/TiltCard.tsx`

- `src/components/hero/HeroWebGL.tsx`

- `src/components/home/AboutMentor.tsx`

- `src/components/home/AccreditationStrip.tsx`

- `src/components/home/AdmissionsJourney.tsx`

- `src/components/home/AnimatedFAQ.tsx`

- `src/components/home/BookingSection.tsx`

- `src/components/home/CinematicStatement.tsx`

- `src/components/home/ComparisonSection.tsx`

- `src/components/home/DestinationGallery.tsx`

- `src/components/home/DestinationShowcase.tsx`

- `src/components/home/DestinationsSlider.tsx`

- `src/components/home/DifferenceGrid.tsx`

- `src/components/home/EditorialTeaser.tsx`

- `src/components/home/FAQ.tsx`

- `src/components/home/FaqPreview.tsx`

- `src/components/home/FinalCTA.tsx`

- `src/components/home/Hero.tsx`

- `src/components/home/HeroExperience.tsx`

- `src/components/home/MentorDestinations.tsx`

- `src/components/home/MentorFeature.tsx`

- `src/components/home/MentorSpotlight.tsx`

- `src/components/home/MentorshipDifference.tsx`

- `src/components/home/MentorshipProcess.tsx`

- `src/components/home/OutcomeCases.tsx`

- `src/components/home/OutcomePreview.tsx`

- `src/components/home/PartnersMarquee.tsx`

- `src/components/home/PersonalHero.tsx`

- `src/components/home/ProcessRoadmap.tsx`

- `src/components/home/ScrollJourney.tsx`

- `src/components/home/ServicesSection.tsx`

- `src/components/home/StudentOutcomes.tsx`

- `src/components/home/StudentReviews.tsx`

- `src/components/home/StudyDestinations.tsx`

- `src/components/home/SuccessStories.tsx`

- `src/components/home/Team.tsx`

- `src/components/home/TrustLedger.tsx`

- `src/components/interactive/CostEstimator.tsx`

- `src/components/layout/EditorialPage.tsx`

- `src/components/layout/PersonalFooter.tsx`

- `src/components/modals/ConsultationModal.tsx`

- `src/components/modals/EligibilityResultModal.tsx`

- `src/components/theme/ThemeProvider.tsx`

- `src/components/theme/ThemeToggle.tsx`

## Dependencies and gaps

Only React, React DOM, Next, Lucide, Firebase and Zod are required by the public route graph. Remove unused animation, carousel, form-helper and theme packages. mockData is unreachable.

No inline-critical-css script exists in this checkout. Firebase already has no catch-all rewrite. Image source provenance remains incomplete; do not fabricate photographers. Enquiry transport is gated by missing App Check and privacy configuration.

Concurrent edits detected in original checkout. Isolated worktree preserves a snapshot; original files untouched. Baseline snapshot commit is separate from phase changes.
