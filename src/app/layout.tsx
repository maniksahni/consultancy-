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
  metadataBase: new URL("https://altheaconsulting.in"),
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
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
    images: [{url: "/images/og-althea.jpg", width:1200, height:630, alt:"Althéa Consulting — a Parisian perspective"}],
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
