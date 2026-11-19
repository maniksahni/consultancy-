// Static export: pick the pre-made copy of a Paris photograph or an admin-uploaded photo closest to the
// rendered width (see scripts/data/build-image-variants.py). Other images pass through.
const WIDTHS = [384, 640, 828, 1080, 1600];

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const size = WIDTHS.find((w) => w >= width);
  const paris = src.match(/^\/images\/paris\/([^/]+\.webp)$/);
  if (paris) return size ? `/images/paris/w${size}/${paris[1]}` : src;
  const upload = src.match(/^\/uploads\/([\w\-.]+)\.(jpe?g|png|webp)$/i);
  if (upload) return `/uploads/w${size ?? 1600}/${upload[1]}.webp`;
  return src;
}
