import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import SkipToContent from "@/components/common/SkipToContent";

const FloatingWhatsApp = dynamic(() => import("@/components/common/FloatingWhatsApp"), { ssr: false });

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
  themeColor: "#142E61",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://consultancyworld2.web.app"),
  title: { default: "Althéa Consulting | A French Future, Thoughtfully Guided", template: "%s | Althéa Consulting" },
  description: "Boutique guidance for studying in France. Explore official-source university programmes, understand Campus France procedures, and plan your French academic journey.",
  keywords: ["Althéa Consulting", "Study in France", "Campus France guidance", "Etudes en France", "French universities", "Masters in France", "France study abroad consultancy"],
  openGraph: { title: "Althéa Consulting | Your Future, en France", description: "A thoughtful, source-led path to studying in France.", type: "website", locale: "en_US", siteName: "Althéa Consulting" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <body className="bg-[#FCFAF6] text-[#173969] overflow-x-hidden w-full max-w-full font-sans">
        <SkipToContent />
        <div className="flex flex-col w-full max-w-full overflow-x-hidden">
          {children}
        </div>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
