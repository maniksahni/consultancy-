import type { Metadata } from "next";
import "./globals.css";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "GlobalPathways | Study Abroad & Student Visa Consultancy",
  description: "Your Bridge to Global Universities & Visa Success. Ivy League & Russell Group alumni counselling with a 98.4% visa grant rate across USA, UK, Canada, Australia, Germany & Ireland.",
  keywords: ["Study abroad", "Student visa consultancy", "US F1 visa", "UK graduate route", "Canada SDS study permit", "Germany tuition free", "Australia subclass 500", "Scholarships"],
  openGraph: {
    title: "GlobalPathways | Study Abroad & Student Visa Consultancy",
    description: "98.4% Visa Grant Rate • 300+ Partner Universities • 100% Free Initial Assessment",
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
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
