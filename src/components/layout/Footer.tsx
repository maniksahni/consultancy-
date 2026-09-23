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
  Youtube,
  ArrowUpRight
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-800/80 bg-[#02050E] text-slate-400 pt-16 pb-12 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-blue-600/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Col 1: Brand & Ethos (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-emerald-400 p-[1px]">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-950 text-white">
                  <Compass className="h-4.5 w-4.5 text-blue-400" />
                </div>
              </div>
              <span className="text-base font-bold tracking-tight text-white font-display">
                Pathways<span className="text-slate-400 font-medium"> Global</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Independent, 1-on-1 overseas education and consular visa advisory. Operating with zero institutional recruitment kickbacks to deliver 100% objective, student-first admissions guidance.
            </p>

            <div className="pt-2">
              <a
                href="https://wa.me/919876543210?text=Hi!%20I%20have%20an%20inquiry%20regarding%20study%20abroad%20admissions."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-700 transition-all"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>WhatsApp Advisory: +91 98765 43210</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#destinations" className="hover:text-white transition-colors">
                  Study Hubs
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-white transition-colors">
                  Mentorship Model
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  Admissions Roadmap
                </a>
              </li>
              <li>
                <a href="#outcomes" className="hover:text-white transition-colors">
                  Verified Outcomes
                </a>
              </li>
              <li>
                <Link href="/scholarships" className="hover:text-white transition-colors">
                  Scholarships Directory
                </Link>
              </li>
              <li>
                <a href="#booking" className="hover:text-blue-400 transition-colors text-blue-400 font-semibold">
                  Schedule Call &rarr;
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Curated Hubs (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Destinations</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/destinations/uk" className="hover:text-white transition-colors">
                  United Kingdom
                </Link>
              </li>
              <li>
                <Link href="/destinations/usa" className="hover:text-white transition-colors">
                  United States
                </Link>
              </li>
              <li>
                <Link href="/destinations/canada" className="hover:text-white transition-colors">
                  Canada
                </Link>
              </li>
              <li>
                <Link href="/destinations/germany" className="hover:text-white transition-colors">
                  Germany (€0 Tuition)
                </Link>
              </li>
              <li>
                <Link href="/destinations/australia" className="hover:text-white transition-colors">
                  Australia
                </Link>
              </li>
              <li>
                <Link href="/destinations/ireland" className="hover:text-white transition-colors">
                  Ireland (Tech Hub)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Social (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Direct Advisory</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <a
                href="mailto:admissions@pathwaysglobal.org"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span>admissions@pathwaysglobal.org</span>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span>+91 98765 43210 (Direct Cell)</span>
              </a>

              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <span>Mon — Sat, 10:00 AM — 8:00 PM IST (By Prior Booking)</span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <span>National Capital Region &bull; Global Remote Sessions</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Anti-Commission Ethics Disclaimer */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 text-[11px] text-slate-400 leading-relaxed mb-8 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-300">Anti-Commission Ethics Standard:</strong> Pathways Global operates strictly under an independent advisory contract. We do not accept recruiter commissions from universities or student loan brokers. All university recommendations and strategic advice are 100% fiduciary and aligned with candidate career ROI. Final admission and visa decisions rest with sovereign consular authorities and university academic boards.
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Pathways Global Advisory. All rights reserved.
          </p>
          <p>
            Designed to elite Apple &amp; Linear product standards.
          </p>
        </div>

      </div>
    </footer>
  );
}
