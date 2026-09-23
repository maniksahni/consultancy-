"use client";

import React from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Heart,
  Linkedin,
  Instagram,
  Youtube,
  ArrowUpRight
} from "lucide-react";

export default function PersonalFooter() {
  return (
    <footer className="relative border-t border-white/[0.08] bg-[#02050E] text-slate-300 pt-16 pb-12 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Column 1: Mentor Identity & Philosophy (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-[1.5px] shadow-lg shadow-emerald-500/20">
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950 text-white">
                  <GraduationCap className="h-5 w-5 text-emerald-400" />
                </div>
              </div>
              <div>
                <span className="text-lg font-extrabold tracking-tight text-white font-display">
                  Pooja Sharma
                </span>
                <p className="text-[11px] font-medium text-emerald-400">
                  Senior Overseas Education &amp; Visa Mentor
                </p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Providing independent, 1-on-1 personalized study abroad guidance. No automated mass-processing, zero kickback-driven university steering, and direct human mentorship from day one until visa grant.
            </p>

            {/* Direct WhatsApp Quick Pill */}
            <div className="pt-2">
              <a
                href="https://wa.me/919876543210?text=Hi%20Pooja%20Didi!%20I%20have%20a%20question%20regarding%20studying%20abroad."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/20 transition-all"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>Direct WhatsApp: +91 98765 43210</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">
                  About Mentor
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-emerald-400 transition-colors">
                  Countries Guided
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-emerald-400 transition-colors">
                  4-Step Process
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-emerald-400 transition-colors">
                  Student Success
                </a>
              </li>
              <li>
                <Link href="/scholarships" className="hover:text-emerald-400 transition-colors">
                  Scholarships Guide
                </Link>
              </li>
              <li>
                <a href="#booking" className="hover:text-emerald-400 transition-colors text-emerald-400 font-semibold">
                  Book 1-on-1 Call &rarr;
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Countries Covered (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Destinations</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/destinations/uk" className="hover:text-emerald-400 transition-colors flex items-center justify-between">
                  <span>🇬🇧 United Kingdom</span>
                </Link>
              </li>
              <li>
                <Link href="/destinations/usa" className="hover:text-emerald-400 transition-colors flex items-center justify-between">
                  <span>🇺🇸 United States</span>
                </Link>
              </li>
              <li>
                <Link href="/destinations/canada" className="hover:text-emerald-400 transition-colors flex items-center justify-between">
                  <span>🇨🇦 Canada</span>
                </Link>
              </li>
              <li>
                <Link href="/destinations/germany" className="hover:text-emerald-400 transition-colors flex items-center justify-between">
                  <span>🇩🇪 Germany (€0 Tuition)</span>
                </Link>
              </li>
              <li>
                <Link href="/destinations/australia" className="hover:text-emerald-400 transition-colors flex items-center justify-between">
                  <span>🇦🇺 Australia</span>
                </Link>
              </li>
              <li>
                <Link href="/destinations/ireland" className="hover:text-emerald-400 transition-colors flex items-center justify-between">
                  <span>🇮🇪 Ireland (Tech Hub)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Office & Hours (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Direct Connect</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <a
                href="mailto:pooja@poojasharmamentor.com"
                className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition"
              >
                <Mail className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>pooja@poojasharmamentor.com</span>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition"
              >
                <Phone className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>+91 98765 43210 (Direct Cell)</span>
              </a>

              <div className="flex items-start gap-2 text-slate-400">
                <Clock className="h-4 w-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <span>1-on-1 Sessions: Mon — Sat, 10:00 AM — 8:00 PM IST (By Prior Booking)</span>
              </div>

              <div className="flex items-start gap-2 text-slate-400">
                <MapPin className="h-4 w-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <span>New Delhi / Gurugram &bull; Virtual 1-on-1 Worldwide</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-slate-900 border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-emerald-500/40 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-slate-900 border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-emerald-500/40 transition"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 rounded-lg bg-slate-900 border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-emerald-500/40 transition"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Anti-agency transparency note */}
        <div className="rounded-2xl border border-white/[0.06] bg-slate-950/60 p-4 text-[11px] text-slate-400 leading-relaxed mb-8 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-300">Independent Mentorship Transparency Notice:</strong> Pooja Sharma provides independent private mentoring, profile assessment, essay/SOP editorial guidance, and visa interview preparation. Admissions decisions and visa grants are subject to university admissions boards and sovereign consular immigration authorities.
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Pooja Sharma. All rights reserved. Built for international aspirants.
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Guiding students with</span>
            <Heart className="h-3 w-3 text-rose-500 fill-rose-500 inline mx-0.5" />
            <span>honesty &amp; dedication.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
