# Althéa: Future / France

Direction selected by the user: futuristic 3D, dark, bold typography, interactive scenes and dramatic transitions.

The homepage uses a live Three.js atlas with Natural Earth coastlines, routes, orbital rings, pointer-controlled camera movement and drag rotation. The hero has a rotation control and respects reduced motion. Research, preparation and arrival form a scroll-linked three-scene sequence. Services expose independent links through accessible disclosures. All work is local; no deployment was requested.

## Photography and visual exclusions

The paper-ribbon artwork and stock adviser portrait were explicitly rejected and are not used in the website. The generated paper artwork has also been removed from public assets. The portrait was removed from the adviser schema image.

The perspective section now uses an interactive personal blueprint. The founder section uses a typography-based card without a portrait.

`src/data/visualCollection.json` assigns a separate image to each photograph placement. `src/data/photoSources.json` records the corresponding Wikimedia Commons source, author and licence. The Sources & Photography page exposes attribution links. Reused guide routes have independent cover assignments.

Run `node scripts/check-photography.mjs` after a production build to check the exported pages for duplicate photo placements, identical files, missing files and the rejected images.

## Verification

TypeScript, production build, live WebGL rendering, motion toggle, service disclosures, destination navigation and all three scroll phases were checked. Browser widths: 320, 390, 768 and 1440px; no horizontal overflow. Automated axe WCAG A/AA scan of main content: zero violations. This does not replace a full manual accessibility audit.

## Site-wide colour system

`src/app/site-theme.css` applies the homepage's midnight background (`#050b10`), mint accent (`#9cf5d6`), light text and muted green-grey text throughout the site. `site-theme.generated.css` translates older colour declarations without changing geometry, photographs, or flag colours. Regenerate it with `node scripts/build-site-theme.cjs`; the production prebuild hook does this automatically. Navigation uses the existing light wordmark, and browser chrome uses the midnight theme colour.
