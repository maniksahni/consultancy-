import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function EditorialPage({
  eyebrow,
  title,
  accent,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-cream text-ink">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-20 bg-[#14120C]" />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 pt-20 focus:outline-none">
        <header className="bg-[#14120C] text-cream py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <Link href="/" className="inline-flex items-center gap-2 label text-cream/50 hover:text-cream transition-colors mb-12">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
            <div className="border-t border-cream/15 pt-8 grid lg:grid-cols-12 gap-8 lg:gap-16 items-end">
              <div className="lg:col-span-8">
                <p className="text-[10px] uppercase tracking-[0.25em] text-cream/45 font-mono mb-6">{eyebrow}</p>
                <h1 className="font-display text-[3.25rem] sm:text-7xl lg:text-8xl leading-[0.9] tracking-tight">
                  {title}<br /><em className="text-terra">{accent}</em>
                </h1>
              </div>
              <p className="lg:col-span-4 text-base text-cream/65 font-light leading-relaxed max-w-md">{intro}</p>
            </div>
          </div>
        </header>
        <div className="max-w-7xl w-full mx-auto px-6 lg:px-12 py-20 lg:py-28">
          {children}
          <div className="border-t border-ink/15 mt-20 pt-10 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between">
            <p className="font-display text-3xl text-ink">Discuss your own path with a mentor.</p>
            <Link href="/#booking" className="inline-flex items-center justify-center gap-2 bg-ink text-cream px-6 py-4 text-[11px] uppercase tracking-[0.2em]">
              Schedule a conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
