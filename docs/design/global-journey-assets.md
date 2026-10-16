# Homepage photography

The current homepage uses real photographs only. The earlier generated hero and illustrative portraits have been removed from the website assets. Typography, captions, icons, buttons and cards remain live HTML/CSS/SVG.

## One photograph, one placement

- Top destination strip: Sorbonne, Oxford, Harvard, Toronto, Sydney, Heidelberg and Trinity College Dublin.
- Second destination row: ENS Paris, Cambridge, Stanford, McGill, Melbourne, Technical University of Munich and University College Dublin.
- University gallery: six independently sourced photographs of the correctly named campuses. Canadian, Australian and German cards no longer use unrelated city landmarks.
- Student stories: actual campus architecture, labelled with the place; no stock or generated people presented as students.
- Hero: a real photograph of the Eiffel Tower beside the Seine. The library, chapel, London view and Paris bridge have separate placements.

Campus source URLs, photographers, licences and original source identities are recorded in [homeCampusPhotos.json](../../src/data/homeCampusPhotos.json). Existing campus photographs retain their credits in `imageCredits.ts` and `photoSources.json`. Public credits are linked from the homepage footer at `/acknowledgements#home-campus-photography`.

## Processing

Photographs are downloaded from the documented sources, resized without enlargement, and encoded as high-quality WebP. No generative editing, AI upscaling or blur filters are used. The original downloaded files are retained under `audit/global-journey/curation/originals/`. Layouts crop photographs with CSS, and captions are selectable text.

The three city photographs use these Unsplash originals:

- https://images.unsplash.com/photo-1502602898657-3e91760cbb34
- https://images.unsplash.com/photo-1513635269975-59663e0ac1ad
- https://images.unsplash.com/photo-1499856871958-5b9627545d1a

## Verification

`node scripts/check-photography.mjs` audits all exported pages for repeated image placements, missing assets, repeated original source identities, identical image files under different names, and the retired generated images. Run after `npm run build`.
