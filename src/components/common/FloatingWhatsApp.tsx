"use client";

import React, { useState } from "react";
import { MessageCircle, X, Clock, ChevronRight, Phone } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/919876543210?text=Hi!%20I%E2%80%99d%20like%20to%20discuss%20my%20study%20abroad%20profile%201-on-1.";

export default function FloatingWhatsApp() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-50 flex flex-col items-end gap-3 max-w-[calc(100vw-2rem)]">
      {/* ─── EXPANDED CARD ─── */}
      {expanded && (
        <div className="animate-slide-up-fade w-[calc(100vw-2rem)] max-w-xs sm:w-80 rounded-2xl border border-white/[0.12] bg-[#0E131F]/98 backdrop-blur-2xl shadow-2xl shadow-black/90 overflow-hidden">
          {/* Card header */}
          <div className="bg-[#121929] border-b border-white/[0.08] px-4 py-3.5 flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg border border-[#C5A880]/30 flex-shrink-0 bg-[#070A11] flex items-center justify-center text-[#E5D3B3] font-serif text-sm font-semibold">
              PG
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-xs sm:text-sm font-serif text-stone-100 truncate">Pathways Global</p>
                <span className="text-[9px] border border-[#C5A880]/30 bg-[#C5A880]/10 text-[#E5D3B3] rounded-full px-1.5 py-0.2">1-on-1</span>
                {/* Online indicator */}
                <span className="flex h-2 w-2 flex-shrink-0 ml-0.5">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#C5A880] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C5A880]" />
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-stone-400 truncate">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>Senior Advisor Online &bull; Direct Replies</span>
              </div>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="text-stone-400 hover:text-white transition p-1"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Chat bubble */}
          <div className="p-4 space-y-3.5">
            <div className="flex gap-2.5">
              <div className="h-6 w-6 rounded-md bg-[#C5A880]/10 border border-[#C5A880]/20 flex-shrink-0 mt-0.5 flex items-center justify-center text-[#C5A880] text-xs font-serif">
                P
              </div>
              <div className="flex-1 bg-[#151D2F] border border-white/[0.06] rounded-xl rounded-tl-sm px-3.5 py-3">
                <p className="text-xs text-stone-200 leading-relaxed font-light">
                  👋 Welcome to <strong className="text-white font-medium">Pathways Global</strong>.
                </p>
                <p className="text-xs text-stone-300 mt-1.5 leading-relaxed font-light">
                  Have an urgent question regarding <strong className="text-white font-medium">university shortlisting</strong>, <strong className="text-white font-medium">SOP critique</strong>, or <strong className="text-white font-medium">visa interview prep</strong>? Connect directly with a senior mentor.
                </p>
                <p className="text-[10px] text-stone-400 mt-2.5 flex items-center gap-1.5 font-light">
                  <Clock className="h-3 w-3 text-[#C5A880]" /> Typically replies within minutes
                </p>
              </div>
            </div>

            {/* Quick reply chips */}
            <div className="flex flex-wrap gap-1.5 ml-8">
              {[
                "UK 1-Yr Masters",
                "USA STEM OPT",
                "Germany €0 Tuition",
                "Consular Visa Prep",
              ].map((chip) => (
                <a
                  key={chip}
                  href={`${WHATSAPP_URL} ${encodeURIComponent(chip)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-medium text-stone-300 border border-white/[0.1] bg-black/40 rounded-full px-2.5 py-1 hover:border-[#C5A880]/40 hover:text-[#E5D3B3] transition-colors whitespace-nowrap"
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
              className="flex items-center justify-between gap-2 w-full rounded-lg bg-[#C5A880] hover:bg-[#D4AF37] text-[#070A11] py-2.5 px-4 transition-all group shadow-md"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs font-semibold tracking-wide">Start WhatsApp Conversation</span>
              </div>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Phone link */}
            <a
              href="tel:+919876543210"
              className="flex items-center justify-center gap-2 w-full rounded-lg border border-white/[0.08] bg-black/30 text-stone-300 py-2 px-4 hover:border-white/20 text-xs font-medium transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-[#C5A880]" /> Call Advisory: +91 98765 43210
            </a>
          </div>
        </div>
      )}

      {/* ─── FLOATING TRIGGER BUTTON ─── */}
      <div className="relative flex items-center">
        {/* Tooltip label (Desktop only to prevent mobile overflow) */}
        {!expanded && (
          <div className="hidden sm:block absolute right-full mr-3 animate-slide-up-fade pointer-events-none">
            <div className="flex items-center gap-2.5 rounded-lg bg-[#0E131F]/95 border border-white/[0.1] backdrop-blur-xl px-3.5 py-2 shadow-xl whitespace-nowrap">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A880] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C5A880]" />
              </span>
              <span className="text-xs font-medium text-stone-200 font-serif">Direct WhatsApp Advisory</span>
              <span className="text-[10px] text-[#C5A880] font-light">&bull; 1-on-1 Online</span>
            </div>
          </div>
        )}

        <button
          onClick={() => setExpanded((prev) => !prev)}
          aria-label={expanded ? "Close WhatsApp chat" : "Chat with Senior Mentor on WhatsApp"}
          className="relative flex items-center justify-center h-12 w-12 sm:h-13 sm:w-13 rounded-full bg-[#0E131F] border border-[#C5A880]/50 text-[#E5D3B3] hover:border-[#C5A880] hover:scale-105 shadow-xl transition-all duration-300 active:scale-95"
        >
          {expanded ? (
            <X className="h-5 w-5" />
          ) : (
            <MessageCircle className="h-5 w-5 fill-[#C5A880]/20 text-[#E5D3B3]" />
          )}
        </button>
      </div>
    </div>
  );
}
