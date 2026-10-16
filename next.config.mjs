/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: process.env.ALTHEA_BUILD ? ".next" : ".next-dev",
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
  },
};

export default nextConfig;
