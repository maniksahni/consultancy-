"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

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
          ? "border-b border-slate-800/80 bg-[#030712]/90 backdrop-blur-2xl shadow-xl shadow-black/40"
          : "border-b border-white/[0.05] bg-[#030712]/70 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-emerald-400 p-[1px] shadow-sm shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-950 text-white">
              <Compass className="h-4.5 w-4.5 text-blue-400 group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white font-display">
                Pathways<span className="text-slate-400 font-medium"> Global</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[9px] font-semibold text-blue-400">
                1-on-1 Advisory
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-medium text-slate-400 hover:text-white transition-colors tracking-wide"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#booking"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800/80 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] active:scale-[0.98]"
          >
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Schedule 1-on-1 Call</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="#booking"
            className="rounded-lg bg-blue-600/15 border border-blue-500/30 px-3 py-1.5 text-xs font-semibold text-blue-300"
          >
            Schedule Call
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
        <div className="border-t border-slate-800/80 bg-[#030712]/98 text-slate-100 backdrop-blur-2xl px-5 pt-3 pb-6 md:hidden space-y-3">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2.5 px-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-900/60 hover:text-white transition"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-800">
            <a
              href="#booking"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/20"
            >
              <Sparkles className="h-4 w-4" />
              <span>Schedule 1-on-1 Call</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
