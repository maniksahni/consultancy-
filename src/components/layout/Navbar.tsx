"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sectionIds = ["destinations", "comparison", "process", "booking", "outcomes"];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-25% 0px -55% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  const href = (hash: string) => (isHome ? hash : `/${hash}`);
  const bookingHref = isHome ? "#booking" : "/#booking";

  const navLinks = [
    { name: "Study Hubs", id: "destinations", href: href("#destinations") },
    { name: "Mentorship", id: "comparison", href: href("#comparison") },
    { name: "Roadmap", id: "process", href: href("#process") },
    { name: "Outcomes", id: "outcomes", href: href("#outcomes") },
  ];

  const isLightNav = scrolled || isOpen;

  return (
    <>
      {/* ── Viewport Top Scroll Progress Bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-terra origin-left z-[60] pointer-events-none"
        style={{ scaleX }}
        aria-hidden="true"
      />

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

          {/* Desktop nav — label style, uppercase with active wayfinding */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = isHome && activeSection === link.id;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`label transition-all relative py-1 flex items-center gap-1.5 ${
                    isActive
                      ? "text-terra font-semibold"
                      : isLightNav
                      ? "text-stone hover:text-ink"
                      : "text-cream/60 hover:text-cream"
                  }`}
                >
                  {isActive && (
                    <span className="h-1 w-1 rounded-full bg-terra inline-block" />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA — square, editorial, tactile press */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={bookingHref}
              className={`label border px-5 py-2.5 btn-tactile ${
                isLightNav
                  ? "border-ink/20 hover:border-terra hover:text-terra text-ink"
                  : "border-cream/25 hover:border-terra hover:text-terra text-cream"
              }`}
            >
              Schedule Call
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2.5 md:hidden">
            <a
              href={bookingHref}
              className={`label border px-3.5 min-h-[44px] flex items-center justify-center text-[10px] btn-tactile ${
                isLightNav
                  ? "border-ink/20 text-ink"
                  : "border-cream/25 text-cream"
              }`}
            >
              Call
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 transition-colors ${
                isLightNav ? "text-ink" : "text-cream"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {isOpen && (
          <div className="md:hidden bg-cream-50 border-t border-ink/8 px-6 py-6 space-y-1 animate-slide-up-fade">
            {navLinks.map((link) => {
              const isActive = isHome && activeSection === link.id;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between min-h-[48px] py-3 border-b border-ink/6 text-sm transition-colors ${
                    isActive ? "text-terra font-semibold" : "text-stone hover:text-ink"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="label text-[10px] text-terra">Current</span>}
                </Link>
              );
            })}
            <div className="pt-4">
              <a
                href={bookingHref}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-full text-center bg-ink text-cream-50 min-h-[48px] py-3.5 label hover:bg-ink-soft btn-tactile"
              >
                Schedule 1-on-1 Call
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
