import JsonLd from "@/components/seo/JsonLd";
import { isIndexable, siteUrl } from "@/lib/seo";
import { brand } from "@/config/brand";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: brand.colors.navy,
};
export const metadata: Metadata = {
  metadataBase: new URL(brand.canonicalUrl),
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
  title: {
    default: `${brand.name} | Study, Settle & Succeed in France`,
    template: `%s | ${brand.name}`,
  },
  description:
    brand.tagline,
  icons: { icon: brand.assets.favicon, shortcut: brand.assets.favicon, apple: brand.assets.favicon },
  openGraph: {
    images: [{ url: brand.assets.og, width: 1200, height: 630 }],
    title: brand.name,
    description: brand.tagline,
    type: "website",
    locale: "en_IN",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
        <JsonLd data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", "@id": `${siteUrl}/#organization`,
              name: brand.name, alternateName: brand.shortName, url: siteUrl,
              logo: `${siteUrl}${brand.assets.logo}`,
              description: "Independent study abroad advisory with a specialist focus on France, based in Paris.",
              founder: { "@id": `${siteUrl}/#adviser` } },
            { "@type": "Person", "@id": `${siteUrl}/#adviser`, name: brand.person,
              jobTitle: brand.role, url: `${siteUrl}/about`,
              worksFor: { "@id": `${siteUrl}/#organization` } },
            { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: brand.name,
              url: siteUrl, inLanguage: "en",
              publisher: { "@id": `${siteUrl}/#organization` } },
          ],
        }} />
      </body>
    </html>
  );
}
