"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap, Phone, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Destinations", href: "#destinations" },
    { name: "Services", href: "#services" },
    { name: "Roadmap", href: "#process" },
    { name: "Scholarships", href: "/scholarships" },
    { name: "Success Stories", href: "#testimonials" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Global<span className="text-blue-600">Edu</span>
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
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
              className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600"
          >
            <Phone className="h-4 w-4 text-blue-600" />
            +91 98765 43210
          </a>
          <a
            href="#eligibility-form"
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Free Assessment
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pt-3 pb-6 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="py-1.5 text-sm font-medium text-slate-700 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 pt-3 border-t border-slate-100">
              <a
                href="#eligibility-form"
                onClick={() => setIsOpen(false)}
                className="w-full text-center rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white"
              >
                Free Assessment
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
