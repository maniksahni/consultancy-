# Open Horizon — Phase 0 audit + Phase 1 proposal

Status: review checkpoint. Branch: `redesign/modern-light-theme`, based on deployed badge-fix commit `b9d25a8`. No application components, dependencies, routes, Firestore rules, or hosting configuration changed. Nothing deployed.

## Phase 0: evidence from the current checkout

- Homepage uses HeroExperience, TrustLedger, DifferenceGrid, DestinationGallery, CinematicStatement, ScrollJourney, MentorSpotlight, OutcomeCases, AnimatedFAQ, FinalCTA and Footer. DestinationGallery, OutcomeCases, AnimatedFAQ and FinalCTA are Next dynamic imports.
- Routes to preserve: `/`, `/destinations/uk`, `/destinations/usa`, `/destinations/canada`, `/destinations/germany`, `/destinations/australia`, `/destinations/ireland`, `/mentorship-model`, `/admissions-process`, `/outcomes`, `/faq`, `/scholarships`. Preserve homepage `#booking` and all existing deep links.
- `src/components/experience/ScrollExperience.tsx` loads Lenis, GSAP and ScrollTrigger on idle, desktop/fine-pointer only, and respects reduced motion. It owns a GSAP ticker integration. Reuse that owner; avoid a second scroll engine.
- No SplitText usage was found under src. The installed GSAP package includes it. The proposal demonstrates it locally; future integration must be explicitly deferred, reverted on teardown, and accessible.
- Three.js is installed, but the audited active HeroExperience uses images, gradients and Framer Motion. No active WebGL hero component was found in the current experience directory. Locate an intended prior implementation before saying we are preserving an existing WebGL scene. Preview uses a cheap CSS treatment to explore the appearance; it is not a WebGL performance test.
- Current carousels use Embla `loop:true`, wheel gestures, arrow-key handlers, and `active:false` at >=1024px. Desktop grids and all four independent borders must survive. Do not let a future pinned story intercept carousel wheel input.
- AnimatedFAQ uses a single `openIndex`; preserve single-open behavior on all FAQ surfaces.
- **Booking mismatch to reconcile before Phase 3:** active FinalCTA still races a Firestore write against 2500ms, uses same-tab location first, and has no discovered honeypot/60s throttle. The requested new-tab + background-write behavior is not this checkout's current behavior. The Other / Undecided option is present. Compare prior branch history and agree on the intended baseline before integrating the redesign. A background write on a navigating document cannot promise delivery; opening WhatsApp separately lets the originating page finish it.
- HeroExperience currently uses `hidden sm:block` for its visual, while MentorSpotlight uses `hidden lg:block`. Earlier instructions called for no mentor imagery below 1024px. Flag this baseline discrepancy; do not silently expand the current design task into a behavior fix.
- Current metadata and some copy contain strong outcome language. The proposed copy removes implied guarantees. Existing case data is carried as historical, owner-supplied content, not independently verified evidence.
- User-reported Lighthouse baseline: 93 mobile / 97 desktop. Not measured in this phase. No performance score is claimed from a standalone style guide.

## Phase 1: the proposal

**Open Horizon**: light paper, botanical ink, deeply toned rust for the principal action, and sage for quiet atmosphere. Large typography does the expressive work; borders and whitespace do the organising. Rust retains continuity with terra while supporting white button labels. Border shades are decorative except the stronger input boundary and focus ring.

Recommended pairing: Barlow Condensed 300/600 + Manrope 400/600. Alternative A: Space Grotesk variable 300–700 + Manrope. Alternative B: Cormorant Garamond + Manrope. Use only the selected pairing in production. The standalone comparison loads all three for review through Google Fonts; production should use Next/font or self-hosted WOFF2, required glyph coverage, font-display swap, and only selected weights. No generic placeholder masquerading as a chosen typeface.

Tokens, type scale, responsive containers, cards, buttons, form fields, badge boundaries and navigation are shown together in `index.html`. Card border is complete on every side. Form controls have labels and focus styles; the specimen sends no data.

### Motion architecture and choreography

1. Hero: visible text at first paint. After load, word reveals and a shallow ambient layer move independently. Never hide meaningful content in SSR. Subject photography stays in capped frames; no person imagery proposed below lg.
2. Advisory: headline resolves into a fully visible desktop criterion grid. Pin a separate chapter heading beside the grid if it fits; do not turn desktop cards into a cropped horizontal track. Mobile Embla remains an independent interaction.
3. Destinations: a light image chapter crossfades contextual photography; the actual desktop country grid remains static and complete. Touch gets native vertical flow and the existing swipe carousel.
4. Journey: desktop sticky narrative with four scrubbed chapters (demonstrated). Mobile and reduced-motion show all stages in ordinary flow, with no pin trap or fixed-height text clipping.
5. Mentor → outcomes: staggered image/text exit and next heading entry; use one GSAP context per mounted route. Historical outcomes remain readable throughout.
6. FAQ and booking: motion recedes to preserve reading and task completion. No animated focus positions, input labels or submit controls.
7. Route curtain: <=600ms, skipped for reduced motion; restore heading focus and route scroll position correctly. Demo only changes a title locally, not actual routes.

Production runtime: reuse the existing deferred ScrollExperience owner, one Lenis/GSAP ticker, `gsap.matchMedia` for desktop pins and reduced-motion teardown. Code-split Three/SplitText and initialize only near the scene. Stop rendering when offscreen, cap device pixel ratio (proposal: 1.5), offer CSS fallback on low-memory/save-data/WebGL-failure conditions. Font readiness must trigger geometry refresh. Restrict custom cursor decoration to blank/interactive areas, not reading text. Native cursor for touch, coarse pointers, reduced motion and form inputs. All essential content and actions remain available without enhancement scripts.

Progress belongs in the reserved chapter header/step labels. No fixed edge bars. Back-to-top and WhatsApp actions should sit in document flow or a dedicated reserved rail outside the reading column; mobile keeps them in flow. No body overflow hiding as a substitute for correct dimensions.

### Prototype scope

The standalone HTML is a design reference, not a replacement homepage. It includes lazy local GSAP/ScrollTrigger/SplitText, optional desktop Lenis, a reversible chapter scrub/manual slider, layered CSS depth, a weight-hover specimen, single-open FAQ and route-curtain rehearsal. Vendored files are copies of already-installed dependencies, kept outside public and src; they do not change the production bundle. The Google Fonts link is for comparing options only. Preview requires serving the repository root so existing image paths resolve.

Run: `python3 -m http.server 3002` then open `http://localhost:3002/design/modern-light/`.

## Approval sequence

- Phase 0: approve the inventory and resolve the booking, WebGL/SplitText and tablet-image baseline mismatches before application integration.
- Phase 1 (current checkpoint): select palette/type and approve this motion direction.
- Phase 2: review `homepage-copy.md`, historical-claim wording and the detailed homepage choreography; approve before wiring copy.
- Phase 3: implement homepage in small review batches: header/hero → advisory/destinations → journey/mentor → outcomes/FAQ/booking/footer. Build and responsive smoke test each batch. Lighthouse mobile + desktop after the phase; require >=85 and investigate regression against a newly measured baseline.
- Phase 4: destinations → mentorship/process/outcomes → FAQ/scholarships and remaining route surfaces. Build and responsive checks per batch; repeat Lighthouse at completion, target >=85 on mobile and desktop.
- Final: review full-route functionality and approve merge/deployment. Do not touch main before approval.

Review checks each phase: 375/390/428px document width equals viewport; 768/1024/1280/1440px layouts; all card edges visible; image heights capped; no fixed UI over text; native touch/keyboard access; single-open FAQ; reduced motion exposes all content; form contract and routes retained. Phase 3 functional tests must stub WhatsApp/Firestore to avoid real inquiries.
