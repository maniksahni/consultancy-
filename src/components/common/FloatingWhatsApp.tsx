"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageCircle, X, Clock, ChevronRight, Phone } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/919876543210?text=Hi%20Pooja%20Didi!%20I%E2%80%99d%20like%20to%20discuss%20my%20study%20abroad%20profile%201-on-1.";

export default function FloatingWhatsApp() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
      {/* ─── EXPANDED CARD ─── */}
      {expanded && (
        <div className="animate-slide-up-fade w-72 sm:w-80 rounded-2xl border border-emerald-500/30 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/70 overflow-hidden">
          {/* Card header */}
          <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 px-4 py-3.5 flex items-center gap-3">
            {/* Mentor Avatar */}
            <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white/40 flex-shrink-0 bg-slate-950">
              <Image
                src="/images/mentor.jpg"
                alt="Pooja Didi"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold text-white">Pooja Didi</p>
                <span className="text-[10px] bg-white/20 text-white rounded-full px-1.5 py-0.2">Mentor</span>
                {/* Online indicator */}
                <span className="flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-100">
                <span className="h-1.5 w-1.5 rounded-full bg-green-300 flex-shrink-0" />
                <span>Active now — Direct personal replies</span>
              </div>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="text-white/70 hover:text-white transition"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Chat bubble */}
          <div className="p-4 space-y-3">
            <div className="flex gap-2.5">
              <div className="relative h-7 w-7 rounded-full overflow-hidden border border-emerald-500/40 flex-shrink-0 mt-0.5">
                <Image
                  src="/images/mentor.jpg"
                  alt="Pooja Didi"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="flex-1 bg-slate-800/90 rounded-2xl rounded-tl-sm px-3.5 py-3">
                <p className="text-xs text-slate-200 leading-relaxed">
                  👋 Hi! I&apos;m Pooja Didi.
                </p>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Ask me about <strong className="text-white">university shortlisting</strong>, <strong className="text-white">SOP review</strong>, or <strong className="text-white">visa interview prep</strong>. No agents or bots — you talk directly with me!
                </p>
                <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Typically replies within minutes
                </p>
              </div>
            </div>

            {/* Quick reply chips */}
            <div className="flex flex-wrap gap-1.5 ml-9">
              {[
                "🇬🇧 UK 1-Yr Masters",
                "🇺🇸 USA STEM OPT",
                "🇩🇪 Germany €0 Tuition",
                "📋 Visa Interview Prep",
              ].map((chip) => (
                <a
                  key={chip}
                  href={`${WHATSAPP_URL} ${encodeURIComponent(chip)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-emerald-400 border border-emerald-500/30 bg-emerald-500/5 rounded-full px-2.5 py-1 hover:bg-emerald-500/15 transition-colors whitespace-nowrap"
                >
                  {chip}
                </a>
              ))}
            </div>

            {/* CTA button */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-4 hover:from-emerald-400 hover:to-teal-400 transition-all group shadow-md shadow-emerald-500/20"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs font-bold">Chat 1-on-1 on WhatsApp</span>
              </div>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Phone link */}
            <a
              href="tel:+919876543210"
              className="flex items-center justify-center gap-2 w-full rounded-xl border border-slate-700 bg-slate-800/50 text-slate-300 py-2 px-4 hover:bg-slate-800 text-xs font-semibold transition-colors"
            >
              <Phone className="h-3.5 w-3.5" /> Call Direct: +91 98765 43210
            </a>
          </div>
        </div>
      )}

      {/* ─── FLOATING TRIGGER BUTTON ─── */}
      <div className="relative flex items-center">
        {/* Tooltip label */}
        {!expanded && (
          <div className="absolute right-full mr-3 animate-slide-up-fade">
            <div className="flex items-center gap-2 rounded-xl bg-slate-900/95 border border-emerald-500/30 backdrop-blur-xl px-3.5 py-2 shadow-xl whitespace-nowrap">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-white">Chat with Pooja Didi</span>
              <span className="text-[11px] text-emerald-400 font-medium">· 1-on-1 Online</span>
            </div>
          </div>
        )}

        {/* Main FAB */}
        <button
          onClick={() => setExpanded((prev) => !prev)}
          aria-label={expanded ? "Close WhatsApp chat" : "Chat with Pooja Didi on WhatsApp"}
          className="relative flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-2xl animate-glow-ring transition-all duration-300 hover:scale-110 active:scale-95"
        >
          {expanded ? (
            <X className="h-6 w-6" />
          ) : (
            <MessageCircle className="h-6 w-6 fill-white" />
          )}
        </button>
      </div>
    </div>
  );
}
