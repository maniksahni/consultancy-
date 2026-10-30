/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: process.env.ALTHEA_BUILD ? ".next" : ".next-dev",
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    // Match scripts/data/build-image-variants.py's WIDTHS exactly: Next's defaults go up to 3840px,
    // which the custom loader can't serve, so it was silently falling back to the full-size original.
    deviceSizes: [384, 640, 828, 1080, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
};

export default nextConfig;
