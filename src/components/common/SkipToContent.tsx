"use client";

import React from "react";

export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-3 focus:bg-terra focus:text-cream focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-cream/90 label text-xs uppercase tracking-wider btn-tactile"
    >
      Skip to main content
    </a>
  );
}
