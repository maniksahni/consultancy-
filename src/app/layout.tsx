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
  themeColor: "var(--color1)",
};
export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  robots: process.env.NEXT_PUBLIC_SITE_URL
    ? { index: true, follow: true }
    : { index: false, follow: false },
  alternates: { canonical: "./" },
  title: {
    default: "Althéa Consulting | Your World. Your Future.",
    template: "%s | Althéa Consulting",
  },
  description:
    "Parisian at heart, global in possibility. Explore seven study destinations, programmes and personal guidance for your next chapter.",
  openGraph: {
    url: "./",
    title: "Althéa Consulting",
    description: "Your world. Your future. Thoughtfully guided.",
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
              name: "Althéa Consulting",
              url: "https://altheaconsulting.in",
              description: "Independent education advisory with a specialist focus on France",
            }),
          }}
        />
      </body>
    </html>
  );
}
