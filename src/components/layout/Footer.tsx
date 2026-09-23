"use client";

import React from "react";
import Link from "next/link";
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#14120C] text-cream/40 pt-16 pb-10 overflow-hidden w-full border-t border-cream/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-14">

          {/* Brand — 5 cols */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="inline-flex items-baseline gap-px group">
              <span className="font-serif text-2xl font-normal text-cream/90 tracking-[-0.02em] group-hover:text-cream transition-colors">
                Pathways
              </span>
              <span className="font-serif text-2xl text-terra mx-0.5 font-light">/</span>
              <span className="font-sans text-sm font-light text-cream/50 tracking-wide group-hover:text-cream/70 transition-colors">
                Global
              </span>
            </Link>

            <p className="text-sm text-cream/35 leading-relaxed font-light max-w-sm">
              Independent, 1-on-1 overseas education and consular visa advisory. Operating with zero institutional recruitment kickbacks to deliver 100% objective, student-first admissions guidance.
            </p>

            <a
              href="https://wa.me/919876543210?text=Hi!%20I%20have%20an%20inquiry%20regarding%20study%20abroad%20admissions."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-cream/10 hover:border-terra/50 text-cream/40 hover:text-cream/70 px-4 py-2.5 label text-[10px] transition-all"
            >
              <MessageCircle className="h-4 w-4 text-terra" />
              WhatsApp Advisory: +91 98765 43210
            </a>
          </div>

          {/* Navigation — 2 cols */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="label text-cream/50">Navigation</h4>
            <ul className="space-y-2.5 text-xs font-light">
              {[
                { label: "Study Hubs", href: "/#destinations" },
                { label: "Mentorship Model", href: "/#comparison" },
                { label: "Admissions Roadmap", href: "/#process" },
                { label: "Verified Outcomes", href: "/#outcomes" },
                { label: "Scholarships Directory", href: "/scholarships" },
                { label: "Schedule Call →", href: "/#booking", accent: true },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`transition-colors ${
                      item.accent
                        ? "text-terra/70 hover:text-terra font-medium"
                        : "hover:text-cream/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations — 2 cols */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="label text-cream/50">Destinations</h4>
            <ul className="space-y-2.5 text-xs font-light">
              {[
                { label: "United Kingdom", href: "/destinations/uk" },
                { label: "United States", href: "/destinations/usa" },
                { label: "Canada", href: "/destinations/canada" },
                { label: "Germany (€0 Tuition)", href: "/destinations/germany" },
                { label: "Australia", href: "/destinations/australia" },
                { label: "Ireland (Tech Hub)", href: "/destinations/ireland" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-cream/70 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — 3 cols */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="label text-cream/50">Direct Advisory</h4>
            <div className="space-y-3 text-xs font-light">
              <a
                href="mailto:admissions@pathwaysglobal.org"
                className="flex items-center gap-2.5 hover:text-cream/70 transition-colors"
              >
                <Mail className="h-4 w-4 text-terra/60 flex-shrink-0" />
                admissions@pathwaysglobal.org
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2.5 hover:text-cream/70 transition-colors"
              >
                <Phone className="h-4 w-4 text-terra/60 flex-shrink-0" />
                +91 98765 43210 (Direct Cell)
              </a>
              <div className="flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-cream/20 flex-shrink-0 mt-0.5" />
                Mon — Sat, 10:00 AM — 8:00 PM IST (By Prior Booking)
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-cream/20 flex-shrink-0 mt-0.5" />
                National Capital Region · Global Remote Sessions
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2 pt-2">
              {[
                { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
                { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
                { href: "https://youtube.com", label: "YouTube", Icon: Youtube },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-8 w-8 border border-cream/10 hover:border-terra/40 hover:text-cream/70 flex items-center justify-center transition-all"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Ethics disclaimer ── */}
        <div className="border border-cream/8 p-5 text-xs leading-relaxed font-light flex items-start gap-3.5 mb-8">
          <ShieldCheck className="h-5 w-5 text-terra/60 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-cream/50 font-medium">Anti-Commission Ethics Standard: </strong>
            Pathways Global operates strictly under an independent advisory contract. We do not accept recruiter commissions from universities or student loan brokers. All university recommendations and strategic advice are 100% fiduciary and aligned with candidate career ROI. Final admission and visa decisions rest with sovereign consular authorities and university academic boards.
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-cream/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-cream/20 font-light">
          <p>© {new Date().getFullYear()} Pathways Global Advisory. All rights reserved.</p>
          <p>Independent 1-on-1 Overseas Education &amp; Visa Advisory.</p>
        </div>

      </div>
    </footer>
  );
}
