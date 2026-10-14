/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: process.env.ALTHEA_BUILD ? ".next" : ".next-dev",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
