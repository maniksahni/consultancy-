"use client";

import React, { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";

const COOKIE_STORAGE_KEY = "pathways_cookie_consent";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (consent) setIsVisible(false);
    } catch {
      // LocalStorage access restricted
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, "accepted");
    } catch {}
    setIsVisible(false);
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, "dismissed");
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
        <div
          style={{
            position: "fixed",
            bottom: "max(16px, env(safe-area-inset-bottom, 16px))",
          }}
          className="cookie-consent-banner left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-[65]"
          role="region"
          aria-label="Cookie consent banner"
        >
          <div className="bg-[#362F2A] text-cream border border-cream/15 p-4 sm:p-5 shadow-2xl relative">
            <div className="flex items-start justify-between gap-3 mb-2.5">
              <div className="flex items-center gap-2 text-terra">
                <Cookie className="w-4 h-4 text-terra flex-shrink-0" />
                <span className="label text-[10px] text-cream/90 tracking-widest uppercase">
                  Privacy &amp; Cookie Consent
                </span>
              </div>
              <button
                onClick={handleDismiss}
                className="text-cream/40 hover:text-cream transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2 -mt-2"
                aria-label="Dismiss cookie notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-cream/60 leading-relaxed font-light mb-4">
              We use privacy-respecting cookies and local storage to analyze anonymous traffic, preserve your advisory preferences, and ensure seamless booking navigation.
            </p>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleAccept}
                className="flex-1 bg-terra hover:bg-terra-dark text-cream min-h-[44px] py-2.5 px-3.5 label text-[10px] text-center transition-colors btn-tactile btn-tactile-dark"
              >
                Accept &amp; Continue
              </button>
              <button
                onClick={handleDismiss}
                className="border border-cream/15 hover:border-cream/30 text-cream/60 hover:text-cream min-h-[44px] py-2.5 px-3.5 label text-[10px] text-center transition-colors btn-tactile"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
  );
}
