"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const href = (hash: string) => (isHome ? hash : `/${hash}`);
  const bookingHref = isHome ? "#booking" : "/#booking";

  const navLinks = [
    { name: "Study Hubs", href: href("#destinations") },
    { name: "Mentorship", href: href("#comparison") },
    { name: "Roadmap", href: href("#process") },
    { name: "Outcomes", href: href("#outcomes") },
  ];

  const isLightNav = scrolled || isOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isLightNav
          ? "bg-cream-50/95 backdrop-blur-xl shadow-[0_1px_0_0_rgba(20,18,12,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center justify-between">

        {/* Logo — editorial wordmark */}
        <Link href="/" className="flex items-center gap-px group">
          <span
            className={`font-serif text-xl font-normal tracking-[-0.02em] transition-colors ${
              isLightNav
                ? "text-ink group-hover:text-ink-soft"
                : "text-cream group-hover:text-cream/80"
            }`}
          >
            Pathways
          </span>
          <span className="font-serif text-xl text-terra mx-0.5 font-light">/</span>
          <span
            className={`font-sans text-sm font-light tracking-wide mt-0.5 transition-colors ${
              isLightNav
                ? "text-stone group-hover:text-ink"
                : "text-cream/50 group-hover:text-cream"
            }`}
          >
            Global
          </span>
        </Link>

        {/* Desktop nav — label style, uppercase */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`label transition-colors ${
                isLightNav
                  ? "text-stone hover:text-ink"
                  : "text-cream/60 hover:text-cream"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA — square, editorial */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={bookingHref}
            className={`label border px-5 py-2.5 transition-colors ${
              isLightNav
                ? "border-ink/20 hover:border-terra hover:text-terra text-ink"
                : "border-cream/25 hover:border-terra hover:text-terra text-cream"
            }`}
          >
            Schedule Call
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href={bookingHref}
            className={`label border px-3 py-2 text-[10px] transition-colors ${
              isLightNav
                ? "border-ink/20 text-ink"
                : "border-cream/25 text-cream"
            }`}
          >
            Call
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 transition-colors ${
              isLightNav ? "text-ink" : "text-cream"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden bg-cream-50 border-t border-ink/8 px-6 py-6 space-y-1 animate-slide-up-fade">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 border-b border-ink/6 text-sm text-stone hover:text-ink transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4">
            <a
              href={bookingHref}
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-ink text-cream-50 py-3.5 label hover:bg-ink-soft transition-colors"
            >
              Schedule 1-on-1 Call
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
