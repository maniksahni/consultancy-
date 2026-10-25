import JsonLd from "@/components/seo/JsonLd";
import { sourceModified } from "@/lib/sourceModified";
import { absoluteUrl, siteUrl } from "@/lib/seo";
import { isoDate, pageName, trailFor } from "@/lib/trail";

/** Describe the same title, introduction and breadcrumb trail shown to visitors. */
const pageTypes: Record<string, string> = { "/about": "AboutPage", "/book-consultation": "ContactPage" };

export default function PageIdentity({ path, title, description, image, imageAlt, modified, about, items }: {
  path: string;
  title: string;
  description: string;
  /** Site path of the cover photograph. */
  image?: string;
  imageAlt?: string;
  /** When the page's facts were last checked ("17 October 2026" or ISO). */
  modified?: string;
  /** Entity the page is about (a city, a country, a programme). */
  about?: Record<string, unknown>;
  /** The pages this one lists, published as an ItemList. */
  items?: { name: string; path: string }[];
}) {
  const url = absoluteUrl(path);
  const date = isoDate(modified);
  // Pages without a fact-check date still say when they last changed, without claiming a review.
  const updated = date ? undefined : sourceModified(path);
  const trail = trailFor(path, title);
  return <JsonLd data={{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": items?.length ? ["WebPage", "CollectionPage"] : pageTypes[path] ? ["WebPage", pageTypes[path]] : "WebPage", "@id": `${url}#webpage`, url,
        // A plain, searchable name; the editorial heading stays as the alternate.
        name: pageName(path, title), ...(pageName(path, title) !== title ? { alternateName: title } : {}),
        description, inLanguage: "en",
        isPartOf: { "@id": `${siteUrl}/#website` },
        publisher: { "@id": `${siteUrl}/#organization` },
        ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(image), ...(imageAlt ? { caption: imageAlt } : {}) } } : {}),
        // The heading and the direct answer under it are written to be read aloud or quoted as-is.
        speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", ".ms-cover-intro"] },
        ...(date ? { dateModified: date, lastReviewed: date, reviewedBy: { "@id": `${siteUrl}/#adviser` } } : updated ? { dateModified: updated } : {}),
        ...(path === "/about" ? { mainEntity: { "@id": `${siteUrl}/#organization` } } : {}),
        ...(items?.length ? { mainEntity: { "@type": "ItemList", numberOfItems: items.length,
          itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, url: absoluteUrl(item.path) })) } } : {}),
        ...(path === "/" ? { about: { "@id": `${siteUrl}/#organization` } }
          : { breadcrumb: { "@id": `${url}#breadcrumb` }, ...(about ? { about } : {}) }),
      },
      ...(path === "/" ? [] : [{
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
        itemListElement: trail.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.path) })),
      }]),
    ],
  }} />;
}
