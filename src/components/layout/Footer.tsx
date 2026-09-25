"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Copy,
  Check,
} from "lucide-react";

function CopyButton({ textToCopy, label }: { textToCopy: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={handleCopy}
        aria-label={`Copy ${label} to clipboard`}
        title={`Copy ${label}`}
        className="p-1 text-cream/40 hover:text-cream transition-colors rounded-none focus:outline-none"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-cream" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>

      {copied && (
        <span
          role="status"
          className="absolute -top-7 left-1/2 -translate-x-1/2 bg-cream text-ink text-[9px] font-mono px-2 py-0.5 whitespace-nowrap pointer-events-none z-20"
        >
          Copied!
        </span>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#14120C] text-cream/60 pt-8 sm:pt-10 lg:pt-12 pb-10 sm:pb-12 overflow-hidden w-full border-t border-cream/10 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">

        {/* ── Dominant Visual Move: Massive Minimalist Bold Statement ── */}
        <div className="border-b border-cream/10 pb-6 sm:pb-8 lg:pb-10 mb-6 sm:mb-8">
          <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-cream/40 font-mono mb-6">
            Boutique Fiduciary Standard
          </div>
          <h2 className="font-display font-normal text-cream leading-[0.88] tracking-[-0.035em] text-[2.75rem] min-[390px]:text-[3.25rem] sm:text-6xl lg:text-7xl xl:text-8xl">
            Independent 1-on-1 Mentorship.<br />
            {/* The single terracotta accent in the entire footer section */}
            <span className="text-terra italic">Zero Institutional Kickbacks.</span>
          </h2>
        </div>

        {/* ── Main Editorial Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 sm:gap-16 mb-12 sm:mb-16">

          {/* Brand & Advisory Line — 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-baseline gap-1">
              <span className="font-display text-3xl text-cream tracking-tight">
                Pathways
              </span>
              <span className="font-display text-3xl text-cream/40 font-light">/</span>
              <span className="text-xs uppercase tracking-[0.25em] text-cream/60 font-mono">
                Global
              </span>
            </Link>

            <p className="text-sm text-cream/50 leading-relaxed font-light max-w-sm">
              Independent, 1-on-1 overseas education and consular visa advisory. Operating with zero institutional recruitment kickbacks to deliver 100% objective, student-first admissions guidance.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-3 border border-cream/15 px-4 py-3 text-cream/80 text-[10px] uppercase tracking-[0.2em] font-mono">
                <a
                  href="https://wa.me/33755749029?text=Hi!%20I%20have%20an%20inquiry%20regarding%20study%20abroad%20admissions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4 text-cream/60" />
                  <span>WhatsApp: +33 7 55 74 90 29</span>
                </a>
                <CopyButton textToCopy="+33 7 55 74 90 29" label="WhatsApp number" />
              </div>
            </div>
          </div>

          {/* Navigation — 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-cream/40 font-mono">
              Navigation
            </h4>
            <ul className="space-y-3 text-xs font-light">
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
                        ? "text-cream hover:text-cream/80 font-medium"
                        : "text-cream/50 hover:text-cream"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations — 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-cream/40 font-mono">
              Destinations
            </h4>
            <ul className="space-y-3 text-xs font-light">
              {[
                { label: "United Kingdom", href: "/destinations/uk" },
                { label: "United States", href: "/destinations/usa" },
                { label: "Canada", href: "/destinations/canada" },
                { label: "Germany (€0 Tuition)", href: "/destinations/germany" },
                { label: "Australia", href: "/destinations/australia" },
                { label: "Ireland (Tech Hub)", href: "/destinations/ireland" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-cream/50 hover:text-cream transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Advisory & Verified Social Links — 3 cols */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-cream/40 font-mono">
              Direct Advisory
            </h4>
            <div className="space-y-3.5 text-xs font-light text-cream/60">
              <div className="flex items-center justify-between border-b border-cream/10 pb-2">
                <a
                  href="mailto:admissions@pathwaysglobal.org"
                  className="flex items-center gap-2 hover:text-cream transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-cream/40 flex-shrink-0" />
                  admissions@pathwaysglobal.org
                </a>
                <CopyButton textToCopy="admissions@pathwaysglobal.org" label="email address" />
              </div>

              <div className="flex items-center justify-between border-b border-cream/10 pb-2">
                <a
                  href="tel:+33755749029"
                  className="flex items-center gap-2 hover:text-cream transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-cream/40 flex-shrink-0" />
                  +33 7 55 74 90 29
                </a>
                <CopyButton textToCopy="+33 7 55 74 90 29" label="phone number" />
              </div>

              <div className="text-cream/40 text-[11px] leading-relaxed pt-1">
                Mon — Sat, 10:00 AM — 8:00 PM IST<br />
                National Capital Region · Global Remote Sessions
              </div>

              {/* Social links (Protected) */}
              <div className="flex items-center gap-3 pt-3">
                <a
                  href="https://www.linkedin.com/in/harshita-kohli-imtbs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="h-9 w-9 border border-cream/15 hover:border-cream text-cream/50 hover:text-cream flex items-center justify-center transition-colors rounded-none"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/helloharshita98/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="h-9 w-9 border border-cream/15 hover:border-cream text-cream/50 hover:text-cream flex items-center justify-center transition-colors rounded-none"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Anti-Commission Ethics Disclaimer: Stark 1px Hairline Block ── */}
        <div className="border border-cream/10 p-6 sm:p-8 text-xs leading-relaxed font-light text-cream/50 mb-8 sm:mb-10 rounded-none">
          <strong className="text-cream font-medium uppercase tracking-wider block mb-1">
            Anti-Commission Ethics Standard
          </strong>
          Pathways Global accepts zero recruiter commissions from universities or loan brokers. All recommendations are 100% fiduciary, aligned with your career ROI. Final admission and visa decisions rest with consular authorities and academic boards.
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-cream/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-cream/30 font-mono">
          <p>© {new Date().getFullYear()} Pathways Global Advisory. All rights reserved.</p>
          <p>Independent 1-on-1 Overseas Education &amp; Visa Advisory.</p>
        </div>

      </div>
    </footer>
  );
}
