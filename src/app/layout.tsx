import JsonLd from "@/components/seo/JsonLd";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import { isIndexable, siteUrl } from "@/lib/seo";
import { brand } from "@/config/brand";
import type { Metadata, Viewport } from "next";
import { Caveat, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./site-theme.css";
import "./atelier.css";
import "./horizon.css";
import "./jobs.css";
import "./editorial-pages.css";
const handwriting = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-handwriting",
  display: "swap",
});
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
  themeColor: "#faf6ee",
};
export const metadata: Metadata = {
  metadataBase: new URL(brand.canonicalUrl),
  robots: isIndexable
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } }
    : { index: false, follow: false },
  title: {
    default: `${brand.name} | Study, Settle & Succeed in France`,
    template: `%s | ${brand.name}`,
  },
  description:
    brand.tagline,
  icons: {
    icon: [
      { url: brand.assets.faviconIco, type: "image/x-icon", sizes: "16x16 32x32 48x48" },
      { url: brand.assets.faviconPng, type: "image/png", sizes: "512x512" },
      { url: brand.assets.favicon, type: "image/svg+xml" },
    ],
    shortcut: brand.assets.faviconIco,
    apple: brand.assets.appleTouch,
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
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
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} ${handwriting.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
        <FloatingWhatsApp />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", "@id": `${siteUrl}/#organization`,
              name: brand.name, alternateName: brand.shortName, url: siteUrl,
              logo: { "@type": "ImageObject", "@id": `${siteUrl}/#logo`,
                url: `${siteUrl}${brand.assets.faviconPng}`, contentUrl: `${siteUrl}${brand.assets.faviconPng}`,
                width: 512, height: 512, caption: brand.name },
              address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
              disambiguatingDescription: "Independent France study, settling and career advisory founded by Harshita Kohli in Paris.",
              ...(brand.email ? { email: brand.email } : {}),
              ...(brand.whatsappNumber || brand.email ? { contactPoint: {
                "@type": "ContactPoint",
                ...(brand.whatsappNumber ? { telephone: `+${brand.whatsappNumber}` } : {}),
                ...(brand.email ? { email: brand.email } : {}),
                contactType: "customer support",
              } } : {}),
              description: "France-based practical support for settling, student life and career readiness, with independent study guidance.",
              areaServed: [{ "@type": "City", name: "Paris" }, { "@type": "Country", name: "France" }, { "@type": "Country", name: "India" }],
              audience: { "@type": "EducationalAudience", educationalRole: "student", audienceType: "Indian and international students planning to study in France" },
              slogan: brand.tagline,
              knowsAbout: ["Studying in France", "Study in France from India", "French university admissions", "Campus France applications", "Études en France procedure", "France student visa", "Cost of studying in France", "Scholarships in France", "Student housing in France", "Student life in France", "Internships and alternance in France", "Career guidance in France"],
              founder: { "@id": `${siteUrl}/#adviser` } },
            { "@type": "Person", "@id": `${siteUrl}/#adviser`, name: brand.person,
              jobTitle: brand.role, url: `${siteUrl}/about`,
              homeLocation: { "@type": "City", name: "Paris" },
              sameAs: Object.values(brand.socialLinks),
              knowsAbout: ["Studying in France", "Campus France applications", "Career coaching in France", "Settling in France"],
              worksFor: { "@id": `${siteUrl}/#organization` } },
            { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: brand.name,
              alternateName: ["Althea Consulting", "altheaconsulting.in"],
              url: siteUrl, inLanguage: "en",
              publisher: { "@id": `${siteUrl}/#organization` } },
          ],
        }} />
      </body>
    </html>
  );
}
