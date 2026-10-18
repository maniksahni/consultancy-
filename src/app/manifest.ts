import { brand } from "@/config/brand";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: brand.name,
    short_name: brand.shortName,
    description: brand.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3eb",
    theme_color: "#102d76",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: brand.assets.faviconPng, sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
