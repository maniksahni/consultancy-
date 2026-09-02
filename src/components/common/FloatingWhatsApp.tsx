"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const whatsappUrl =
    "https://wa.me/919876543210?text=Hi%20GlobalEdu,%20I%20would%20like%20to%20get%20a%20free%20profile%20evaluation%20for%20studying%20abroad.";

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex items-center gap-2.5 rounded-full bg-emerald-500 px-4 py-3 text-white shadow-xl transition-all duration-300 hover:bg-emerald-600 hover:scale-105 active:scale-95"
      >
        {/* Pulsing status circle */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>

        <MessageCircle className="h-5 w-5 fill-white text-emerald-500" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">
          Chat with Counsellor
        </span>
      </a>
    </div>
  );
}
