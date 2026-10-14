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
  robots: process.env.NEXT_PUBLIC_SITE_URL
    ? { index: true, follow: true }
    : { index: false, follow: false },
  alternates: { canonical: "./" },
  title: {
    default: `${brand.name} | Study, Settle & Succeed in France`,
    template: `%s | ${brand.name}`,
  },
  description:
    brand.tagline,
  icons: { icon: brand.assets.favicon },
  openGraph: {
    images: [{ url: brand.assets.og, width: 1200, height: 630 }],
    url: "./",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: brand.name,
              url: brand.canonicalUrl,
              description: "Independent education advisory with a specialist focus on France",
            }),
          }}
        />
      </body>
    </html>
  );
}
