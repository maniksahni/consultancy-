"use client";

import React from "react";
import Link from "next/link";
import { 
  Compass, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Linkedin,
  Instagram,
  Youtube
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-[#05080E] text-stone-400 pt-18 pb-12 overflow-hidden w-full max-w-full">
      {/* Background ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-[#C5A880]/[0.015] blur-[140px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full max-w-full">
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 mb-14">
          
          {/* Col 1: Brand & Ethos (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#C5A880]/40 bg-[#070A11] text-[#E5D3B3] shadow-sm">
                <span className="font-serif text-sm font-semibold tracking-wider">PG</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-serif text-stone-100 tracking-tight leading-none">
                  Pathways<span className="font-serif italic text-[#C5A880] ml-1">Global</span>
                </span>
                <span className="text-[9px] font-sans tracking-widest uppercase text-stone-400 mt-1">
                  1-on-1 Overseas Education Advisory
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light max-w-sm">
              Independent, 1-on-1 overseas education and consular visa advisory. Operating with zero institutional recruitment kickbacks to deliver 100% objective, student-first admissions guidance.
            </p>

            <div className="pt-2">
              <a
                href="https://wa.me/919876543210?text=Hi!%20I%20have%20an%20inquiry%20regarding%20study%20abroad%20admissions."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/[0.1] bg-[#0E131F] px-4 py-2.5 text-xs font-medium text-stone-300 hover:text-white hover:border-[#C5A880]/30 transition-all"
              >
                <MessageCircle className="h-4 w-4 text-[#C5A880]" />
                <span>WhatsApp Advisory: +91 98765 43210</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#E5D3B3]">Navigation</h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <a href="#destinations" className="text-stone-400 hover:text-stone-100 transition-colors">
                  Study Hubs
                </a>
              </li>
              <li>
                <a href="#comparison" className="text-stone-400 hover:text-stone-100 transition-colors">
                  Mentorship Model
                </a>
              </li>
              <li>
                <a href="#process" className="text-stone-400 hover:text-stone-100 transition-colors">
                  Admissions Roadmap
                </a>
              </li>
              <li>
                <a href="#outcomes" className="text-stone-400 hover:text-stone-100 transition-colors">
                  Verified Outcomes
                </a>
              </li>
              <li>
                <Link href="/scholarships" className="text-stone-400 hover:text-stone-100 transition-colors">
                  Scholarships Directory
                </Link>
              </li>
              <li>
                <a href="#booking" className="text-[#C5A880] hover:text-[#E5D3B3] transition-colors font-medium">
                  Schedule Call &rarr;
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Curated Hubs (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#E5D3B3]">Destinations</h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <Link href="/destinations/uk" className="text-stone-400 hover:text-stone-100 transition-colors">
                  United Kingdom
                </Link>
              </li>
              <li>
                <Link href="/destinations/usa" className="text-stone-400 hover:text-stone-100 transition-colors">
                  United States
                </Link>
              </li>
              <li>
                <Link href="/destinations/canada" className="text-stone-400 hover:text-stone-100 transition-colors">
                  Canada
                </Link>
              </li>
              <li>
                <Link href="/destinations/germany" className="text-stone-400 hover:text-stone-100 transition-colors">
                  Germany (€0 Tuition)
                </Link>
              </li>
              <li>
                <Link href="/destinations/australia" className="text-stone-400 hover:text-stone-100 transition-colors">
                  Australia
                </Link>
              </li>
              <li>
                <Link href="/destinations/ireland" className="text-stone-400 hover:text-stone-100 transition-colors">
                  Ireland (Tech Hub)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Social (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#E5D3B3]">Direct Advisory</h4>
            <div className="space-y-3 text-xs text-stone-400 font-light">
              <a
                href="mailto:admissions@pathwaysglobal.org"
                className="flex items-center gap-2.5 hover:text-white transition"
              >
                <Mail className="h-4 w-4 text-[#C5A880] flex-shrink-0" />
                <span>admissions@pathwaysglobal.org</span>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-2.5 hover:text-white transition"
              >
                <Phone className="h-4 w-4 text-[#C5A880] flex-shrink-0" />
                <span>+91 98765 43210 (Direct Cell)</span>
              </a>

              <div className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-stone-500 flex-shrink-0 mt-0.5" />
                <span>Mon — Sat, 10:00 AM — 8:00 PM IST (By Prior Booking)</span>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-stone-500 flex-shrink-0 mt-0.5" />
                <span>National Capital Region &bull; Global Remote Sessions</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-[#0E131F] border border-white/[0.08] flex items-center justify-center text-stone-400 hover:text-white hover:border-[#C5A880]/30 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-[#0E131F] border border-white/[0.08] flex items-center justify-center text-stone-400 hover:text-white hover:border-[#C5A880]/30 transition"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-[#0E131F] border border-white/[0.08] flex items-center justify-center text-stone-400 hover:text-white hover:border-[#C5A880]/30 transition"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Anti-Commission Ethics Disclaimer */}
        <div className="rounded-xl border border-white/[0.08] bg-[#0E131F] p-5 text-xs text-stone-400 leading-relaxed font-light mb-8 flex items-start gap-3.5">
          <ShieldCheck className="h-5 w-5 text-[#C5A880] flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-stone-200 font-medium">Anti-Commission Ethics Standard:</strong> Pathways Global operates strictly under an independent advisory contract. We do not accept recruiter commissions from universities or student loan brokers. All university recommendations and strategic advice are 100% fiduciary and aligned with candidate career ROI. Final admission and visa decisions rest with sovereign consular authorities and university academic boards.
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-light">
          <p>
            &copy; {new Date().getFullYear()} Pathways Global Advisory. All rights reserved.
          </p>
          <p>
            Independent 1-on-1 Overseas Education &amp; Visa Advisory.
          </p>
        </div>

      </div>
    </footer>
  );
}
