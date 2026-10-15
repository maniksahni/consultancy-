import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, siteUrl } from "@/lib/seo";

/** Describe the same title, introduction and home breadcrumb shown to visitors. */
export default function PageIdentity({ path, title, description }: {
  path: string;
  title: string;
  description: string;
}) {
  const url = absoluteUrl(path);
  return <JsonLd data={{
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url,
        name: title, description, inLanguage: "en",
        isPartOf: { "@id": `${siteUrl}/#website` },
        publisher: { "@id": `${siteUrl}/#organization` },
        ...(path === "/about" ? { mainEntity: { "@id": `${siteUrl}/#organization` } } : {}),
        ...(path === "/" ? { about: { "@id": `${siteUrl}/#organization` } }
          : { breadcrumb: { "@id": `${url}#breadcrumb` } }),
      },
      ...(path === "/" ? [] : [{
        "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          { "@type": "ListItem", position: 2, name: title, item: url },
        ],
      }]),
    ],
  }} />;
}
