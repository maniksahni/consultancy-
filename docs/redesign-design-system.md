# Study with Harshita visual system

Authority: `.agents/skills/ui-ux-pro-max/SKILL.md`, its searchable design data, and `references/quick-reference.md`.

The design-system search for “luxury premium brand” recommended scroll-triggered storytelling and the Luxury/Premium Brand palette. The platform-specific Liquid Glass recommendation was excluded because this is an editorial website. A targeted “editorial grid magazine” style search selected Editorial Grid / Magazine. The “editorial elegant luxury” typography search selected Classic Elegant: Playfair Display with Inter.

- Palette: ink #1C1917; muted #44403C; accent #A16207; paper #FAFAF9; white #FFFFFF; border #D6D3D1. Light gold #E7C895 is an accessible accent adaptation on dark surfaces.
- Spacing: 4/8/16/24/32/48/64px. Section padding 48px mobile and 64px desktop; mobile gutters 24px. Headlines use a 40–64px section scale and 52–98px hero scale with bounded measures.
- Layout: editorial index, large photographs, contrasting light/dark chapters. Text and controls use normal document flow rather than absolute overlays on photographs. Each section reflows at 375px.
- Motion: transform/opacity only, calm cubic-bezier(0.22, 1, 0.36, 1), viewport-once reveals, 40ms card staggers, restrained hover/tap feedback. Reduced-motion users receive final readable states.
- Content: existing data, copy, links and contact values remain unchanged. Existing carousel geometry and logic, booking validation/submission/WhatsApp redirect, Firestore rules and counter logic are protected.

Verification: `node scripts/verify-redesign.mjs` compares the protected code, content and data against checkpoint 3f0972d. Each section is built and visually reviewed at 375px and 1440px before proceeding. Screenshots and per-section build logs are saved in `/tmp/harshita-redesign-review`.
