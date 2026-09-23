import type { Metadata } from "next";
import "./globals.css";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export const metadata: Metadata = {
  title: "Pathways Global | Elite 1-on-1 Study Abroad Mentorship",
  description: "Bypass mass-processing agencies. Personalized profile assessment, Ivy League & Russell Group SOP curation, and foolproof consular visa preparation directly from a dedicated senior mentor. 99.2% visa grant record.",
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
    "Elite SOP editorial"
  ],
  openGraph: {
    title: "Pathways Global | Elite 1-on-1 Study Abroad Mentorship",
    description: "Bypass mass-processing agencies. 100% unbiased advisory, Ivy League & Russell Group admissions strategy, and verified consular preparation.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-[#030712] text-slate-100 min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white antialiased overflow-x-hidden max-w-full w-full">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          <div className="flex-1 flex flex-col w-full max-w-full overflow-x-hidden">
            {children}
          </div>
          <FloatingWhatsApp />
        </ThemeProvider>
      </body>
    </html>
  );
}
