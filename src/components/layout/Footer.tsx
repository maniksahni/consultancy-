"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin, Clock, ShieldCheck, ArrowRight } from "lucide-react";

interface FooterProps {
  onOpenConsultation?: () => void;
}

export default function Footer({ onOpenConsultation }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const destinations = [
    { name: "Study in United Kingdom", href: "#destinations" },
    { name: "Study in United States", href: "#destinations" },
    { name: "Study in Canada", href: "#destinations" },
    { name: "Study in Australia", href: "#destinations" },
    { name: "Study in Germany", href: "#destinations" },
    { name: "Study in Ireland", href: "#destinations" },
  ];

  const services = [
    { name: "Profile Evaluation & Shortlisting", href: "#services" },
    { name: "SOP, LOR & Resume Editing", href: "#services" },
    { name: "Visa Filing & Mock Interviews", href: "#services" },
    { name: "Scholarship Hunting Assistance", href: "#services" },
    { name: "IELTS & PTE Test Coaching", href: "#services" },
    { name: "Pre-Departure & Forex Guidance", href: "#services" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      {/* Top CTA Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <div className="text-center lg:text-left space-y-1">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider block">
                Free Initial Profile Assessment
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Turn your study abroad dreams into confirmed admits.
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                Get a personalized university shortlist and visa assessment from experienced consular coaches.
              </p>
            </div>

            <div>
              <a
                href="#eligibility-form"
                onClick={(e) => {
                  if (onOpenConsultation) {
                    onOpenConsultation();
                  }
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition"
              >
                <span>Check Eligibility Free</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Summary */}
          <div className="space-y-4 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Global<span className="text-blue-500">Edu</span>
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Visa & Consulting
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              GlobalEdu is a premier international education consultancy providing end-to-end guidance for university admissions, merit scholarships, standardized test prep, and consular visa filing across the UK, USA, Canada, Australia, Germany, and Ireland.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 rounded-lg bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-300">
                <ShieldCheck className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span>Certified Education & Visa Advisors</span>
              </div>
            </div>
          </div>

          {/* Top Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Study Destinations</h4>
            <ul className="space-y-2 text-xs">
              {destinations.map((d, i) => (
                <li key={i}>
                  <a href={d.href} className="hover:text-blue-400 transition-colors">
                    {d.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Core Services</h4>
            <ul className="space-y-2 text-xs">
              {services.map((s, i) => (
                <li key={i}>
                  <a href={s.href} className="hover:text-blue-400 transition-colors">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details & Office Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact & Support</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <a href="mailto:admissions@globaledu.org" className="hover:text-white transition-colors">
                  admissions@globaledu.org
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>Level 4, Cyber City Hub, DLF Phase 2, Gurugram, India</span>
              </li>
              <li className="flex items-start gap-2 pt-1 border-t border-slate-900">
                <Clock className="h-4 w-4 text-slate-500 flex-shrink-0 mt-0.5" />
                <span>Mon - Sat: 9:30 AM – 7:00 PM (IST)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} GlobalEdu Visa & Consulting Pvt Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-slate-400">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-slate-400">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#disclaimer" onClick={(e) => e.preventDefault()} className="hover:text-slate-400">
              Disclaimers
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
