import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, Playfair_Display, Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import "./luxury.css";
import "./redesign.css";
import SkipToContent from "@/components/common/SkipToContent";
import UTMTracker from "@/components/common/UTMTracker";

const ScrollExperience = dynamic(() => import("@/components/experience/ScrollExperience"), { ssr: false });
const FloatingWhatsApp = dynamic(() => import("@/components/common/FloatingWhatsApp"), { ssr: false });
const BackToTop = dynamic(() => import("@/components/common/BackToTop"), { ssr: false });
const GlobalMotionLayer = dynamic(() => import("@/components/experience/GlobalMotionLayer"), { ssr: false });
import CookieBanner from "@/components/common/CookieBanner";

const editorialDisplay = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-redesign-display", display: "swap" });
const editorialSans = Inter({ subsets: ["latin"], variable: "--font-redesign-sans", display: "swap" });

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: false,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#152126",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://consultancyworld2.firebaseapp.com"),
  title: "Study with Harshita | Elite 1-on-1 Study Abroad Mentorship",
  description:
    "Bypass mass-processing agencies. Personalized profile assessment, Ivy League & Russell Group SOP curation, and foolproof consular visa preparation directly from a dedicated senior mentor. 99.2% visa grant record.",
  keywords: [
    "Study with Harshita",
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
    title: "Study with Harshita | Elite 1-on-1 Study Abroad Mentorship",
    description:
      "Bypass mass-processing agencies. 100% unbiased advisory, Ivy League & Russell Group admissions strategy, and verified consular preparation.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} ${editorialDisplay.variable} ${editorialSans.variable}`} suppressHydrationWarning>
      <head>
        <noscript><style>{`[class*="redesign-"] [style*="opacity"]{opacity:1!important;transform:none!important}`}</style></noscript>
        <script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('pathways_cookie_consent'))document.documentElement.dataset.cookieConsent='set'}catch(e){}" }} />
        <link rel="preload" as="image" href="/images/mentor-hero-640.webp" imageSrcSet="/images/mentor-hero-480.webp 480w, /images/mentor-hero-640.webp 640w" imageSizes="(min-width: 1280px) 560px, (min-width: 1024px) 43vw" media="(min-width: 1024px)" />
      </head>
      <body className="bg-cream text-ink overflow-x-hidden w-full max-w-full font-sans">
        <UTMTracker />
        <SkipToContent />
        <ScrollExperience />
        <GlobalMotionLayer />
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
