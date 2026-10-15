import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import SkipToContent from "@/components/common/SkipToContent";
import JsonLd from "@/components/seo/JsonLd";
import {SITE_URL,BRAND,SITE_DESC,organizationData} from "@/lib/siteSeo";

const FloatingWhatsApp = dynamic(() => import("@/components/common/FloatingWhatsApp"), { ssr: false });

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: true,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#142E61",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Study in France | Althéa Consulting", template: "%s | Althéa Consulting" },
  description: SITE_DESC,
  applicationName: BRAND,
  alternates: { canonical: "/" },
  openGraph: { title: "Study in France | Althéa Consulting", description: SITE_DESC, type: "website", locale: "en_IN", siteName: BRAND, url: SITE_URL },
  twitter: { card: "summary", title: BRAND, description: SITE_DESC },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  category: "education",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <JsonLd data={organizationData()} />
      </head>
      <body className="bg-[#FCFAF6] text-[#173969] overflow-x-hidden w-full max-w-full font-sans">
        <SkipToContent />
        <div className="flex flex-col w-full max-w-full overflow-x-hidden">{children}</div>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
