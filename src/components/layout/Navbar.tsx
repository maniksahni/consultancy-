"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, Phone, Menu, X, ArrowRight, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Destinations", href: "#destinations" },
    { name: "Cost Estimator", href: "#cost-estimator" },
    { name: "Services", href: "#services" },
    { name: "Roadmap", href: "#process" },
    { name: "Admissions Team", href: "#team" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#030712]/70 backdrop-blur-2xl transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo with Glow */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-emerald-400 p-[1px] shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-950 text-white">
              <GraduationCap className="h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white font-display">
              Global<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Edu</span>
            </span>
            <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-400">
              Visa & Consulting
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs font-semibold text-slate-300 transition-colors hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Phone className="h-3.5 w-3.5" />
            </div>
            <span>+91 98765 43210</span>
          </a>

          <a
            href="#eligibility-form"
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 p-[1px] font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] hover:shadow-blue-500/40 active:scale-[0.98]"
          >
            <span className="relative flex items-center gap-1.5 rounded-[11px] bg-slate-950/80 px-4 py-2 text-xs font-bold transition-colors group-hover:bg-transparent">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span>Free Assessment</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl p-2 text-slate-300 hover:bg-slate-900 border border-slate-800 md:hidden"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-2xl px-5 pt-4 pb-6 md:hidden space-y-3">
          <div className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-2 text-sm font-medium text-slate-300 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-xs font-medium text-slate-400"
              >
                <Phone className="h-4 w-4 text-blue-400" />
                <span>+91 98765 43210</span>
              </a>
              <a
                href="#eligibility-form"
                onClick={() => setIsOpen(false)}
                className="w-full text-center rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 py-3 text-xs font-bold text-white shadow-lg"
              >
                Start Free Profile Assessment
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
