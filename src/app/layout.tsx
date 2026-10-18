import JsonLd from "@/components/seo/JsonLd";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import SiteMotion from "@/components/motion/SiteMotion";
import SwipeHints from "@/components/motion/SwipeHints";
import { isIndexable, siteUrl } from "@/lib/seo";
import { brand } from "@/config/brand";
import type { Metadata, Viewport } from "next";
import { Caveat, Instrument_Serif, Manrope, Syne } from "next/font/google";
import "./base.css";
import "./maison-ui.css";
import "./maison.css";
import "./lumiere.css";
import "./motion.css";
import "./mobile.css";
const handwriting = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-handwriting",
  display: "swap",
  preload: false, // only the signature uses it; keep it off the critical path
});
// Paris Lumière typography: avant-garde display, warm humanist body, a serif italic for accents.
const display = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
const italic = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-italic",
  display: "swap",
  preload: false, // accent words swap in; the main faces load first
});
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060608",
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
      // Stable URLs in multiples of 48px, the sizes Google Search reads for the result favicon.
      { url: "/brand/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/brand/icon-96.png", type: "image/png", sizes: "96x96" },
      { url: "/brand/icon-192.png", type: "image/png", sizes: "192x192" },
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
    siteName: brand.name,
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
    <html lang="en" className={`${display.variable} ${body.variable} ${italic.variable} ${handwriting.variable}`} suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
        <FloatingWhatsApp />
        <SiteMotion />
        <SwipeHints />
        <JsonLd data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", "@id": `${siteUrl}/#organization`,
              name: brand.name, alternateName: ["Althea Consulting", "Althèa Consulting", "Althéa Consulting Paris", "Althea Consultancy", "Althéa Study in France"], url: siteUrl,
              mainEntityOfPage: `${siteUrl}/about`,
              logo: { "@type": "ImageObject", "@id": `${siteUrl}/#logo`,
                url: `${siteUrl}${brand.assets.faviconPng}`, contentUrl: `${siteUrl}${brand.assets.faviconPng}`,
                width: 512, height: 512, caption: brand.name },
              address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
              disambiguatingDescription: "Althéa Consulting at altheaconsulting.in is the independent student and career advisory founded by Harshita Kohli in Paris, serving Indian and international students planning studies and life in France.",
              hasOfferCatalog: { "@type": "OfferCatalog", name: "Student and career advisory services",
                itemListElement: [
                  { name: "Study in France guidance", path: "/study-in-france" },
                  { name: "Settling in France support", path: "/settle-in-france" },
                  { name: "Career preparation in France", path: "/career-support" },
                ].map(service => ({ "@type": "Offer", itemOffered: {
                  "@type": "Service", name: service.name, url: `${siteUrl}${service.path}`,
                  provider: { "@id": `${siteUrl}/#organization` },
                } })),
              },
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
              alternateName: ["Althea Consulting", "Althèa Consulting", "Althéa Consulting Paris", "altheaconsulting.in"],
              url: siteUrl, inLanguage: "en",
              publisher: { "@id": `${siteUrl}/#organization` } },
          ],
        }} />
      </body>
    </html>
  );
}
