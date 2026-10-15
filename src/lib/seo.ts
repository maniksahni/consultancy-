import type { Metadata } from "next";
import { brand } from "@/config/brand";

export const siteUrl = brand.canonicalUrl.replace(/\/$/, "");
// Production exports are crawlable; development and explicitly private previews are not.
export const isIndexable = process.env.SITE_INDEXABLE !== "false" &&
  Boolean(process.env.NEXT_PUBLIC_SITE_URL || process.env.ALTHEA_BUILD);
export const absoluteUrl = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

export function pageMetadata(path: string, metadata: Metadata): Metadata {
  const title = typeof metadata.title === "string"
    ? metadata.title
    : metadata.title && typeof metadata.title === "object" && "absolute" in metadata.title
      ? metadata.title.absolute
      : brand.name;
  const description = metadata.description || `Explore ${title.toLowerCase()} with ${brand.name}, an independent study abroad advisory based in Paris with a specialist focus on France.`;
  return {
    ...metadata,
    description,
    alternates: { ...metadata.alternates, canonical: absoluteUrl(path) },
    openGraph: {
      type: "website", locale: "en_IN", siteName: brand.name,
      title, description, url: absoluteUrl(path),
      images: [{ url: absoluteUrl("/images/editorial/france-evening-20261014.webp"), alt: "The Eiffel Tower and Pont Alexandre III in Paris" }],
      ...metadata.openGraph,
    },
    twitter: { card: "summary_large_image", title, description,
      images: [absoluteUrl("/images/editorial/france-evening-20261014.webp")], ...metadata.twitter },
  };
}

export const serializeJsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
