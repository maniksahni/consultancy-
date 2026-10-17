// Static export: pick the pre-made copy of a Paris photograph closest to the
// rendered width (see scripts/data/build-image-variants.py). Other images pass through.
const WIDTHS = [384, 640, 828, 1080, 1600];

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const match = src.match(/^\/images\/paris\/([^/]+\.webp)$/);
  if (!match) return src;
  const size = WIDTHS.find((w) => w >= width);
  return size ? `/images/paris/w${size}/${match[1]}` : src;
}
