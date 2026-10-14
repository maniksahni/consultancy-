# Althéa Consulting

A mobile-first Parisian education advisory website for studying, settling and succeeding in France. Built with Next.js 14, React, TypeScript and Tailwind CSS.

The design uses French blue, ivory, antique gold, locally bundled display and sans-serif fonts, original editorial layouts, Paris photography and motion that respects reduced-motion preferences. The supplied business card identifies Harshita Kohli as Career Coach & France Expert, based in Paris.

## Development

Run `npm install`, then `npm run dev`. Open http://localhost:3000. Development uses `.next-dev` so it does not share production build files. Restart an older dev server after updating this configuration.

## Build and preview

Run `npm run typecheck` and `npm run build`. The static website is exported to `out/`. Run `node audit/serve.cjs` to preview at http://127.0.0.1:3014. `PORT` and `ALTHEA_PREVIEW_ROOT` optionally override its port and export directory.

Run `npm test` after building. Playwright starts the export preview automatically and checks exported routes, responsive overflow, navigation, programme filters, FAQ, application guide, consultation form, accessibility and internal links.

## Content and integrations

The programme finder is a small curated collection with dated review statuses and official university links. Campus France, Sorbonne Université and France-Visas resources are linked directly. This is not a live catalogue sync or institutional affiliation. Update `src/data/france.ts` when reviewing programme information.

Consultation delivery uses Firebase with App Check. Complete the configuration in `.env.example` and enable enquiries only after provisioning the backend and privacy contact. Until configured, the form clearly reports that requests have not been sent. A WhatsApp number was not supplied; no guessed contact number is used.

The screenshots informed the Parisian visual direction, Althéa name and adviser identity. The referenced Canva template could not be accessed, and its assets were not copied. The existing Paris photographs are retained; see the sources and photography page for attribution status.

## Review collection and editorial pages

The homepage includes an interactive planning-stage guide and a manual review carousel. `/reviews` is the dedicated review collection. Current review copy in `src/data/reviews.ts` is illustrative and labelled “Sample review”; it is not evidence of client outcomes. Replace it with client-approved source text and attribution before presenting it as genuine feedback. The About and Services pages share the updated maison headers, closing sections and footer.

## Primary domain and deployment

The main website is **https://altheaconsulting.in**. **https://www.altheaconsulting.in** redirects to it. The Firebase default domains are alternate addresses for the same Hosting site, so a single release updates all of them together.

Use `npm run deploy` for production. It checks types, builds with the primary domain for canonical URLs and sitemap links, and deploys only Hosting to the explicit `consultancyworld2` site. HTML is revalidated on each visit; fingerprinted Next.js assets retain their immutable cache policy. Use the custom domain for preview handoffs and published links.
