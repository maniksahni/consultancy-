"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Study Hubs", href: "#destinations" },
    { name: "Mentorship", href: "#comparison" },
    { name: "Roadmap", href: "#process" },
    { name: "Outcomes", href: "#outcomes" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-[#C5A880]/15 bg-[#070A11]/95 backdrop-blur-2xl shadow-xl shadow-black/60"
          : "border-b border-white/[0.07] bg-[#070A11]/80 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Boutique Crest & Brand Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[#C5A880]/30 bg-[#0B0F19] text-[#C5A880] shadow-sm group-hover:border-[#C5A880]/60 transition-all">
            <Compass className="h-4.5 w-4.5 stroke-[1.75] text-[#C5A880] group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg tracking-tight text-white font-medium">
                Pathways<span className="font-sans text-stone-400 font-light text-sm ml-1">Global</span>
              </span>
              <span className="hidden sm:inline-flex items-center rounded-full border border-[#C5A880]/25 bg-[#C5A880]/10 px-2 py-0.5 text-[9px] font-medium tracking-wider uppercase text-[#DBCBAA]">
                1-on-1 Advisory
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links (Refined Editorial Spacing) */}
        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-medium tracking-wider uppercase text-stone-400 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Understated Executive CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#booking"
            className="group relative inline-flex items-center gap-2 rounded-lg border border-[#C5A880]/40 bg-[#0E1424] hover:bg-[#151D33] hover:border-[#C5A880]/70 px-4 py-2 text-xs font-medium tracking-wide text-[#E8DEC9] transition-all shadow-sm active:scale-[0.98]"
          >
            <span>Schedule 1-on-1 Call</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#C5A880] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="#booking"
            className="rounded-lg border border-[#C5A880]/30 bg-[#0E1424] px-2.5 py-1.5 text-xs font-medium text-[#E8DEC9]"
          >
            Schedule Call
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-stone-300 hover:bg-stone-900 border border-white/[0.08]"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="border-t border-[#C5A880]/15 bg-[#070A11]/98 text-stone-200 backdrop-blur-2xl px-5 pt-3 pb-6 md:hidden space-y-3">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2.5 px-3 rounded-lg text-sm font-medium tracking-wide text-stone-300 hover:bg-stone-900/60 hover:text-white transition"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-white/[0.08]">
            <a
              href="#booking"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-lg border border-[#C5A880]/40 bg-[#0E1424] py-3 text-xs font-medium uppercase tracking-wider text-[#E8DEC9]"
            >
              <span>Schedule 1-on-1 Call</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-[#C5A880]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
