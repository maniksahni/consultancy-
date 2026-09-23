"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLightNav, setIsLightNav] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  // 1. Scroll listener for sticky header styling & dark/light background adaptation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // Check section currently under the header (at header midline y=40)
      if (isHome) {
        // Sections that have parchment/light background
        const lightSectionIds = ["destinations", "comparison", "outcomes"];
        const headerMidY = 40;

        let isOverLight = false;
        for (const id of lightSectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= headerMidY && rect.bottom >= headerMidY) {
              isOverLight = true;
              break;
            }
          }
        }
        setIsLightNav(isOverLight);
      } else {
        // Sub-pages: top header is dark, content is light
        setIsLightNav(scrollY > 280);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // 2. Active section wayfinding on homepage
  useEffect(() => {
    if (!isHome) return;
    const sectionIds = ["booking", "destinations", "comparison", "process", "outcomes"];

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

  // 3. Lock body scroll and handle Escape key when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const href = (hash: string) => (isHome ? hash : `/${hash}`);
  const bookingHref = isHome ? "#booking" : "/#booking";

  const navLinks = [
    { name: "Study Hubs", id: "destinations", href: href("#destinations") },
    { name: "Mentorship", id: "comparison", href: href("#comparison") },
    { name: "Roadmap", id: "process", href: href("#process") },
    { name: "Outcomes", id: "outcomes", href: href("#outcomes") },
  ];

  return (
    <>
      {/* ── Viewport Top Scroll Progress Bar (Terracotta) ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-terra origin-left z-[80] pointer-events-none"
        style={{ scaleX }}
        aria-hidden="true"
      />

      {/* ── Sticky Top Nav Bar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isLightNav
              ? "bg-cream-50/95 backdrop-blur-xl border-b border-ink/8 shadow-[0_2px_14px_rgba(20,18,12,0.06)]"
              : "bg-[#14120C]/90 backdrop-blur-xl border-b border-cream/10 shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 sm:py-5 flex items-center justify-between">

          {/* Logo — editorial wordmark */}
          <Link href="/" className="flex items-center gap-px group">
            <span
              className={`font-serif text-xl sm:text-2xl font-normal tracking-[-0.02em] transition-colors ${
                isLightNav
                  ? "text-ink group-hover:text-ink-soft"
                  : "text-cream group-hover:text-cream/80"
              }`}
            >
              Pathways
            </span>
            <span className="font-serif text-xl sm:text-2xl text-terra mx-0.5 font-light">/</span>
            <span
              className={`font-sans text-xs sm:text-sm font-light tracking-wide mt-0.5 transition-colors ${
                isLightNav
                  ? "text-stone group-hover:text-ink"
                  : "text-cream/50 group-hover:text-cream"
              }`}
            >
              Global
            </span>
          </Link>

          {/* Desktop nav — label style, uppercase with active wayfinding */}
          <nav className="hidden md:flex items-center gap-9 lg:gap-10">
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
                      ? "text-stone hover:text-terra"
                      : "text-cream/60 hover:text-terra"
                  }`}
                >
                  {isActive && (
                    <span className="h-1 w-1 rounded-full bg-terra inline-block" />
                  )}
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/scholarships"
              className={`label transition-all relative py-1 ${
                isLightNav ? "text-stone hover:text-terra" : "text-cream/60 hover:text-terra"
              }`}
            >
              Scholarships
            </Link>
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
              href="tel:+33755749029"
              className={`label border px-3.5 min-h-[44px] flex items-center justify-center text-[10px] btn-tactile ${
                isLightNav
                  ? "border-ink/20 text-ink hover:border-terra hover:text-terra"
                  : "border-cream/25 text-cream hover:border-terra hover:text-terra"
              }`}
            >
              Call
            </a>
            <button
              onClick={() => setIsOpen(true)}
              className={`min-h-[44px] min-w-[44px] flex items-center justify-center p-2.5 transition-colors border ${
                isLightNav
                  ? "border-ink/15 text-ink hover:border-terra hover:text-terra"
                  : "border-cream/20 text-cream hover:border-terra hover:text-terra"
              }`}
              aria-label="Open mobile menu"
              aria-expanded={isOpen}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Full Mobile Menu Overlay / Slide-in Drawer ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-ink/80 backdrop-blur-sm z-[70] md:hidden"
              aria-hidden="true"
            />

            {/* Slide-in Drawer */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-96 max-w-[88vw] bg-[#14120C] text-cream z-[75] shadow-2xl flex flex-col justify-between border-l border-cream/10 p-6 sm:p-8 overflow-y-auto md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
            >
              {/* Drawer Top Header */}
              <div>
                <div className="flex items-center justify-between border-b border-cream/10 pb-5 mb-6">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-px"
                  >
                    <span className="font-serif text-2xl font-normal text-cream">
                      Pathways
                    </span>
                    <span className="font-serif text-2xl text-terra mx-0.5 font-light">/</span>
                    <span className="font-sans text-xs font-light text-cream/50 tracking-wide mt-1">
                      Global
                    </span>
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-cream/60 hover:text-cream border border-cream/15 hover:border-terra/60 transition-colors btn-tactile"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Section Navigation Links */}
                <nav className="space-y-1">
                  {navLinks.map((link) => {
                    const isActive = isHome && activeSection === link.id;

                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between min-h-[48px] py-3 px-3 border-b border-cream/8 transition-all group ${
                          isActive
                            ? "text-terra font-semibold bg-cream/[0.03]"
                            : "text-cream/80 hover:text-cream hover:bg-cream/[0.02]"
                        }`}
                      >
                        <span className="font-display text-lg font-normal tracking-wide">
                          {link.name}
                        </span>
                        <div className="flex items-center gap-2">
                          {isActive && (
                            <span className="label text-[9px] text-terra">Current</span>
                          )}
                          <ArrowRight className="w-3.5 h-3.5 text-cream/30 group-hover:text-terra group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </Link>
                    );
                  })}

                  <Link
                    href="/scholarships"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between min-h-[48px] py-3 px-3 border-b border-cream/8 text-cream/80 hover:text-cream hover:bg-cream/[0.02] transition-all group"
                  >
                    <span className="font-display text-lg font-normal tracking-wide">
                      Scholarships Directory
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-cream/30 group-hover:text-terra group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </nav>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-8 border-t border-cream/10 space-y-3">
                <a
                  href={bookingHref}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full text-center bg-terra hover:bg-terra-dark text-cream min-h-[48px] py-3 px-4 label text-xs tracking-wider transition-colors btn-tactile btn-tactile-dark"
                >
                  Schedule 1-on-1 Call
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="tel:+33755749029"
                    className="flex items-center justify-center gap-1.5 border border-cream/15 hover:border-cream/30 text-cream/80 hover:text-cream min-h-[44px] py-2 px-2 label text-[10px] transition-colors btn-tactile"
                  >
                    <Phone className="w-3.5 h-3.5 text-terra" />
                    Call Advisor
                  </a>
                  <a
                    href="https://wa.me/33755749029?text=Hi!%20I%E2%80%99d%20like%20to%20discuss%20my%20study%20abroad%20profile%201-on-1."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 border border-cream/15 hover:border-terra/40 text-cream/80 hover:text-terra min-h-[44px] py-2 px-2 label text-[10px] transition-colors btn-tactile"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-terra" />
                    WhatsApp
                  </a>
                </div>

                <p className="text-[10px] text-cream/30 text-center font-light pt-2">
                  Independent Admissions &amp; Consular Visa Advisory
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
