import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LuxuryPageHero from "./LuxuryPageHero";

export default function EditorialPage({
  eyebrow,
  title,
  accent,
  intro,
  children,
  image,
  chapter,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  children: ReactNode;
  image: string;
  chapter: string;
}) {
  return (
    <div className="colourful-editorial min-h-screen flex flex-col bg-cream text-ink">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <LuxuryPageHero eyebrow={eyebrow} title={title} accent={accent} intro={intro} image={image} chapter={chapter} />
        <div id="page-content" className="luxury-editorial-content max-w-7xl w-full mx-auto px-6 lg:px-12 py-20 lg:py-28">
          {children}
          <div className="border-t border-ink/15 mt-20 pt-10 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
            <p className="font-display text-2xl sm:text-3xl text-ink leading-tight break-words">Discuss your own path with a mentor.</p>
            <Link href="/#booking" className="inline-flex items-center justify-center gap-2 bg-ink text-cream px-6 py-4 text-[11px] uppercase tracking-[0.2em] shrink-0 text-center">
              Schedule a conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
