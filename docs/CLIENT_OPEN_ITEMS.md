# Owner and operations confirmation

- Canonical domain is provisionally `https://altheaconsulting.in`; card prints `www.altheaconsulting.com`. Owner must confirm final canonical. Bind both apex and www hosts to hosting and provision TLS, then configure permanent host redirects preserving path/query. Firebase's custom-domain redirect setup and DNS require owner account access; no claim is made that either domain was changed. A path-only redirect on the primary Firebase site would loop and is intentionally not added.
- Confirm WhatsApp number and email. Neither is invented. Set these in `src/config/brand.ts`, provide the matching verified QR asset and run `npm run brand:sync`. The contact area displays pending status meanwhile.
- Confirm portrait and all existing photography usage rights. No new portrait is published; existing Paris photography remains subject to its existing acknowledgements and owner rights review.
- Confirm France-first versus seven equal destinations. Default implemented: France primary; other destinations remain secondary.
- Assign a human data reviewer and protect snapshot publication through repository review rules. The directory awaits its first approved release.

# Rebranding

Edit `src/config/brand.ts`, then run `npm run brand:sync` (also runs before production build). It owns brand identity, canonical domain, contact/social settings, fonts, colours, asset paths and original SVG source. Generated CSS and `/public/brand` SVGs must not be edited separately. Display fonts have bundled Next font variables with system fallbacks; set the configured font stacks for a new type direction. Palette entries preserve existing design tones so all source colour literals resolve through generated CSS variables.

Validation completed: TypeScript and production static build passed. Desktop (1440px) and mobile (390px) browser checks found no horizontal overflow; finder reset and pending-release state passed. Import staged 200 candidates; publishing pending candidates was rejected and the public snapshot remained unchanged. Legacy programme evidence detail pages retain the earlier editorial research and still need migration into the approval workflow. No production deployment or DNS modification was performed.
