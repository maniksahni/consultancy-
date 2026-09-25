import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import SkipToContent from "@/components/common/SkipToContent";
import UTMTracker from "@/components/common/UTMTracker";
import ScrollExperience from "@/components/experience/ScrollExperience";
import CustomCursor from "@/components/experience/CustomCursor";
import RouteCurtain from "@/components/experience/RouteCurtain";

const FloatingWhatsApp = dynamic(() => import("@/components/common/FloatingWhatsApp"), { ssr: false });
const BackToTop = dynamic(() => import("@/components/common/BackToTop"), { ssr: false });
const CookieBanner = dynamic(() => import("@/components/common/CookieBanner"), { ssr: false });

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#14120C",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://consultancyworld2.firebaseapp.com"),
  title: "Pathways Global | Elite 1-on-1 Study Abroad Mentorship",
  description:
    "Bypass mass-processing agencies. Personalized profile assessment, Ivy League & Russell Group SOP curation, and foolproof consular visa preparation directly from a dedicated senior mentor. 99.2% visa grant record.",
  keywords: [
    "Pathways Global",
    "Study abroad mentorship",
    "1-on-1 overseas education advisory",
    "Student visa consultancy",
    "US F1 visa preparation",
    "UK graduate route admissions",
    "Germany public university APS",
    "Canada study permit SDS",
    "Australia Genuine Student statement",
    "Elite SOP editorial",
  ],
  openGraph: {
    title: "Pathways Global | Elite 1-on-1 Study Abroad Mentorship",
    description:
      "Bypass mass-processing agencies. 100% unbiased advisory, Ivy League & Russell Group admissions strategy, and verified consular preparation.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-cream text-ink overflow-x-hidden w-full max-w-full font-sans">
        <UTMTracker />
        <SkipToContent />
        <ScrollExperience />
        <CustomCursor />
        <RouteCurtain />
        <div className="flex flex-col w-full max-w-full overflow-x-hidden">
          {children}
        </div>
        <BackToTop />
        <FloatingWhatsApp />
        <CookieBanner />
      </body>
    </html>
  );
}
