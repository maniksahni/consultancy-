# Mobile reviews layout report

**Date:** 15 October 2026

**Page:** `/reviews`

## Change

- On screens up to 760px, the active testimonial quote is shortened to seven lines, with a “Read the full student story” disclosure for the complete quote.
- Review outcome summaries use a horizontal, swipeable card rail instead of a long vertical stack.
- Desktop review cards, quote length and outcome grid remain unchanged.

## Validation

- `npx tsc --noEmit` passed.
- `npm run build` passed and generated all 74 static pages.
- Browser checks at 320px, 390px and 1440px found no horizontal page overflow and no console errors.
- Mobile review outcome rail is swipeable; the complete testimonial expands on demand.
- Preview: `audit/reviews-mobile-preview.png`.
