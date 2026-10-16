"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, Menu, X, Instagram, Linkedin } from "lucide-react";

const navItems = [
  { label: "The Maison", href: "/" },
  { label: "Study in France", href: "/france" },
  { label: "Universities", href: "/france/universities" },
  { label: "Courses", href: "/france/programmes" },
  { label: "Jobs & Careers", href: "/jobs" },
  { label: "Scholarships", href: "/france/scholarships" },
  { label: "Campus France", href: "/france/campus-france" },
  { label: "Resources", href: "/france/resources" },
];

export function AltheaHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 48);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isHomePage = pathname === "/";

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        scrolled || !isHomePage
          ? "border-b border-[#152D57]/12 bg-[#FBF9F3]/95 backdrop-blur-md text-[#142D57] shadow-sm"
          : "bg-transparent text-white border-b border-white/8"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-[76px] w-full max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-9 lg:h-[90px] lg:px-14">
        {/* Logo */}
        <Link href="/" aria-label="Althéa Consulting home" className="relative z-[60] min-w-0 shrink-0 leading-none group">
          <motion.span
            className={`block font-display text-[29px] tracking-[-.055em] sm:text-[33px] transition-colors duration-300 ${
              scrolled || !isHomePage ? "text-[#142D57]" : "text-white"
            }`}
            whileHover={{ x: 1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            Althéa<span className={`ml-1.5 font-normal italic transition-colors duration-300 ${scrolled || !isHomePage ? "text-[#AD8B57]" : "text-[#E5C99D]"}`}>.</span>
          </motion.span>
          <span className={`mt-1.5 block text-[9px] font-semibold uppercase tracking-[.34em] sm:text-[10px] transition-colors duration-300 ${
            scrolled || !isHomePage ? "text-[#142D57]/55" : "text-white/55"
          }`}>
            Consulting · France
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-5 xl:gap-6 xl:flex">
          {navItems.map(({ label, href }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative text-[11px] font-medium uppercase tracking-[.13em] transition-colors ${
                  scrolled || !isHomePage
                    ? active ? "text-[#173969]" : "text-[#142D57]/65 hover:text-[#173969]"
                    : active ? "text-[#E5C99D]" : "text-white/70 hover:text-white"
                }`}
              >
                {label}
                {active && (
                  <motion.span
                    className={`absolute -bottom-1 left-0 right-0 h-px ${scrolled || !isHomePage ? "bg-[#173969]" : "bg-[#E5C99D]"}`}
                    layoutId="nav-underline"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA + Mobile Toggle */}
        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/#consultation"
              className={`hidden min-h-11 items-center gap-2 px-5 py-3 text-[10px] font-semibold uppercase tracking-[.17em] transition-all duration-300 sm:inline-flex ${
                scrolled || !isHomePage
                  ? "bg-[#18356B] text-white hover:bg-[#244A89]"
                  : "bg-[#E5C99D] text-[#0D1B3E] hover:bg-white"
              }`}
            >
              Book a consultation <ArrowUpRight size={15} aria-hidden />
            </Link>
          </motion.div>

          <motion.button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="althea-mobile-nav"
            whileTap={{ scale: 0.92 }}
            className={`relative z-[60] flex h-11 w-11 items-center justify-center border xl:hidden transition-all duration-300 ${
              scrolled || !isHomePage || open
                ? "border-[#142D57]/22 text-[#142D57]"
                : "border-white/25 text-white"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {open
                ? <motion.span key="x" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.2 }}><X size={22} /></motion.span>
                : <motion.span key="menu" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={22} /></motion.span>
              }
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="althea-mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full z-50 max-h-[calc(100dvh-76px)] w-full overflow-auto border-t border-[#142D57]/10 bg-[#FBF9F3] px-5 pb-8 pt-5 shadow-2xl sm:px-9 xl:hidden"
          >
            {navItems.map(({ label, href }, index) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
              >
                <Link
                  onClick={() => setOpen(false)}
                  href={href}
                  className="flex min-h-14 items-center justify-between border-b border-[#142D57]/10 py-3 font-display text-[clamp(1.5rem,6vw,2.1rem)] text-[#142D57] transition-colors hover:text-[#AE8A54]"
                >
                  <span>{label}</span>
                  <span className="flex items-center gap-4 text-[10px] font-sans text-[#7C7770]">
                    <span>0{index + 1}</span><ArrowRight size={18} />
                  </span>
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.05 + 0.05, duration: 0.35 }}
            >
              <Link
                href="/#consultation"
                onClick={() => setOpen(false)}
                className="mt-7 flex min-h-12 items-center justify-center bg-[#18356B] px-6 py-3 text-[11px] font-semibold uppercase tracking-[.2em] text-white hover:bg-[#244A89] transition-colors"
              >
                Book a consultation
              </Link>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export function AltheaFooter() {
  return (
    <footer id="footer" className="bg-[#0A1628] px-5 py-14 text-[#F9F6F0] sm:px-9 lg:px-14 lg:py-20">
      <div className="mx-auto grid max-w-[1328px] grid-cols-1 gap-12 border-b border-white/15 pb-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <motion.div
            className="font-display text-5xl tracking-tight sm:text-6xl"
            whileInView={{ opacity: [0, 1], y: [20, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Althéa<span className="text-[#D7BA87]">.</span>
          </motion.div>
          <div className="mt-2 text-[11px] uppercase tracking-[.32em] text-white/55">Consulting · France</div>
          <p className="mt-7 max-w-md text-sm leading-7 text-white/65">
            A thoughtfully personal path to studying in France. Explore your options with clarity, care, and guidance grounded in official information.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:col-span-6">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#D7BA87]">Explore</p>
            {[
              { label: "Study in France", href: "/france" },
              { label: "Courses", href: "/france/programmes" },
              { label: "Universities", href: "/france/universities" },
              { label: "Jobs & Careers (APS)", href: "/jobs" },
              { label: "Campus France guide", href: "/france/campus-france" },
              { label: "Student resources", href: "/france/resources" },
              { label: "Scholarships", href: "/france/scholarships" },
              { label: "Visa guidance", href: "/france/visas" },
              { label: "Accommodation", href: "/france/living" },
            ].map(({ label, href }) => (
              <Link key={href} className="block text-sm text-white/72 transition-colors hover:text-white" href={href}>{label}</Link>
            ))}
          </div>
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#D7BA87]">Connect</p>
            <a className="flex items-center gap-2 text-sm text-white/72 transition-colors hover:text-white" href="https://www.linkedin.com/in/harshita-kohli-imtbs/" target="_blank" rel="noreferrer">
              <Linkedin size={16} /> LinkedIn
            </a>
            <a className="flex items-center gap-2 text-sm text-white/72 transition-colors hover:text-white" href="https://www.instagram.com/helloharshita98/" target="_blank" rel="noreferrer">
              <Instagram size={16} /> Instagram
            </a>
            <Link className="block text-sm text-white/72 transition-colors hover:text-white" href="/#consultation">Contact the team</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1328px] flex-col justify-between gap-4 pt-6 text-xs leading-6 text-white/42 md:flex-row">
        <span>© {new Date().getFullYear()} Althéa Consulting. All rights reserved.</span>
        <span className="max-w-xl">Independent educational consultancy. Not affiliated with or endorsed by Campus France or any university. Admission and visa outcomes are decided by the relevant institutions and authorities.</span>
      </div>
    </footer>
  );
}
