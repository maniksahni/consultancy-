"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GraduationCap, Phone, Menu, X, ArrowRight, Sparkles, MessageCircle, Compass } from "lucide-react";

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
    { name: "About Mentor", href: "/#about" },
    { name: "Countries Guided", href: "/#destinations" },
    { name: "Mentorship Process", href: "/#process" },
    { name: "Student Success", href: "/#reviews" },
    { name: "Scholarships", href: "/scholarships" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-emerald-500/20 bg-[#030712]/90 backdrop-blur-2xl shadow-xl shadow-black/40"
          : "border-b border-white/[0.06] bg-[#030712]/75 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Neutral High-Trust Brand Identity */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-blue-500 p-[1.5px] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950 text-white">
              <Compass className="h-5 w-5 text-emerald-400 group-hover:rotate-45 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-white font-display">
                Global Pathway
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Senior Advisor
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 tracking-wide">
              Overseas Education &amp; Visa Mentor
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-medium text-slate-300 hover:text-white transition-colors tracking-wide hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20discuss%20my%20study%20abroad%20profile%201-on-1."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-emerald-500/25 bg-emerald-500/5 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/15 hover:border-emerald-500/40 transition-all"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href="/#booking"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 p-[1px] font-semibold text-white shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] active:scale-[0.98]"
          >
            <span className="relative flex items-center gap-1.5 rounded-[11px] bg-slate-950/85 px-4 py-2 text-xs font-bold text-white transition-colors group-hover:bg-transparent">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span>Book 1-on-1 Counselling Call</span>
              <ArrowRight className="h-3.5 w-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="/#booking"
            className="rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1.5 text-xs font-semibold text-emerald-300 sm:hidden"
          >
            Book Call
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl p-2 text-slate-300 hover:bg-slate-900 border border-white/[0.08]"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="border-t border-white/[0.08] bg-[#030712]/98 text-slate-100 backdrop-blur-2xl px-5 pt-4 pb-6 lg:hidden space-y-4 shadow-2xl">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2.5 px-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900/60 hover:text-emerald-400 transition"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2.5">
            <a
              href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20discuss%20my%20study%20abroad%20profile%201-on-1."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-2.5 text-xs font-bold text-emerald-300"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat Directly on WhatsApp</span>
            </a>
            <a
              href="/#booking"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-500/25"
            >
              <Sparkles className="h-4 w-4 text-white" />
              <span>Book 1-on-1 Counselling Call</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
