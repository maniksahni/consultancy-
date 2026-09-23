import type { Metadata } from "next";
import "./globals.css";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export const metadata: Metadata = {
  title: "Global Pathway | Senior Study-Abroad Mentor & Visa Advisor (1-on-1)",
  description: "Personalized, end-to-end study abroad mentorship — from profile-first university shortlisting and authentic SOP editorial reviews to intensive 1-on-1 embassy mock interviews. 99.2% visa approval record across UK, USA, Canada, Germany, Australia & Ireland.",
  keywords: [
    "Study abroad mentor",
    "Senior visa advisor",
    "Independent education consultant",
    "1-on-1 study abroad counselling",
    "US F1 visa interview prep",
    "UK 1 year masters admissions",
    "Germany public university tuition free APS",
    "Canada study permit SDS",
    "Australia Genuine Student statement",
    "SOP review line by line"
  ],
  openGraph: {
    title: "Global Pathway | Senior Study-Abroad Mentor & Visa Advisor",
    description: "No automated mass-applications. Direct 1-on-1 senior mentorship from shortlisting to visa approval with a 99.2% grant record.",
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
      <body className="bg-[#030712] text-slate-100 min-h-screen flex flex-col font-sans selection:bg-emerald-600 selection:text-white antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          <FloatingWhatsApp />
        </ThemeProvider>
      </body>
    </html>
  );
}
