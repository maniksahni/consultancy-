"use client";

import React, { useState } from "react";
import { MessageCircle, X, Clock, ChevronRight, Phone, Compass } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/919876543210?text=Hi!%20I%E2%80%99d%20like%20to%20discuss%20my%20study%20abroad%20profile%201-on-1.";

export default function FloatingWhatsApp() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3">
      {/* ─── EXPANDED CARD ─── */}
      {expanded && (
        <div className="animate-slide-up-fade w-72 sm:w-80 rounded-2xl border border-slate-700/80 bg-slate-900/95 backdrop-blur-2xl shadow-2xl shadow-black/80 overflow-hidden">
          {/* Card header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 px-4 py-3.5 flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-white/20 flex-shrink-0 bg-slate-950 flex items-center justify-center text-white">
              <Compass className="h-4.5 w-4.5 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold text-white">Pathways Global</p>
                <span className="text-[9px] bg-white/20 text-white rounded-full px-1.5 py-0.2">1-on-1</span>
                {/* Online indicator */}
                <span className="flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-blue-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                <span>Senior Advisor Online &bull; Direct Replies</span>
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
              <div className="h-6 w-6 rounded-lg bg-blue-500/20 border border-blue-500/40 flex-shrink-0 mt-0.5 flex items-center justify-center text-blue-400">
                <Compass className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 bg-slate-800/80 rounded-2xl rounded-tl-sm px-3.5 py-3">
                <p className="text-xs text-slate-200 leading-relaxed">
                  👋 Welcome to <strong className="text-white">Pathways Global</strong>.
                </p>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Have an urgent question regarding <strong className="text-white">university shortlisting</strong>, <strong className="text-white">SOP critique</strong>, or <strong className="text-white">visa interview prep</strong>? Connect directly with a senior mentor.
                </p>
                <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Typically replies within minutes
                </p>
              </div>
            </div>

            {/* Quick reply chips */}
            <div className="flex flex-wrap gap-1.5 ml-8">
              {[
                "🇬🇧 UK 1-Yr Masters",
                "🇺🇸 USA STEM OPT",
                "🇩🇪 Germany €0 Tuition",
                "📋 Consular Visa Prep",
              ].map((chip) => (
                <a
                  key={chip}
                  href={`${WHATSAPP_URL} ${encodeURIComponent(chip)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-semibold text-blue-300 border border-blue-500/30 bg-blue-500/5 rounded-full px-2.5 py-1 hover:bg-blue-500/15 transition-colors whitespace-nowrap"
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
              className="flex items-center justify-between gap-2 w-full rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 text-white py-3 px-4 hover:opacity-95 transition-all group shadow-md shadow-blue-500/20"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs font-bold">Start WhatsApp Conversation</span>
              </div>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Phone link */}
            <a
              href="tel:+919876543210"
              className="flex items-center justify-center gap-2 w-full rounded-xl border border-slate-700 bg-slate-800/50 text-slate-300 py-2 px-4 hover:bg-slate-800 text-xs font-semibold transition-colors"
            >
              <Phone className="h-3.5 w-3.5" /> Call Advisory: +91 98765 43210
            </a>
          </div>
        </div>
      )}

      {/* ─── FLOATING TRIGGER BUTTON ─── */}
      <div className="relative flex items-center">
        {!expanded && (
          <div className="absolute right-full mr-3 animate-slide-up-fade">
            <div className="flex items-center gap-2 rounded-xl bg-slate-900/95 border border-slate-700/80 backdrop-blur-xl px-3.5 py-2 shadow-xl whitespace-nowrap">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-white">Direct WhatsApp Advisory</span>
              <span className="text-[11px] text-blue-400 font-medium">&bull; 1-on-1 Online</span>
            </div>
          </div>
        )}

        <button
          onClick={() => setExpanded((prev) => !prev)}
          aria-label={expanded ? "Close WhatsApp chat" : "Chat with Senior Mentor on WhatsApp"}
          className="relative flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-emerald-500 text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
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
