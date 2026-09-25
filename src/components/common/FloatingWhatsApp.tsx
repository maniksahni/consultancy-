"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, X, Clock, ChevronRight, Phone } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/33755749029?text=Hi!%20I%E2%80%99d%20like%20to%20discuss%20my%20study%20abroad%20profile%201-on-1.";

export default function FloatingWhatsApp() {
  const [expanded, setExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [isBookingInView, setIsBookingInView] = useState(false);
  const [isNearCarousel, setIsNearCarousel] = useState(false);

  // 1. Scroll listener for hero threshold & scroll-direction (rAF-throttled)
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let rafId: number | null = null;
    let currentVisible = false;
    let currentScrollingUp = false;

    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      const nextVisible = currentScrollY > 380;
      if (nextVisible !== currentVisible) {
        currentVisible = nextVisible;
        setIsVisible(nextVisible);
      }

      if (Math.abs(currentScrollY - lastScrollY) > 6) {
        const nextScrollingUp = currentScrollY < lastScrollY;
        if (nextScrollingUp !== currentScrollingUp) {
          currentScrollingUp = nextScrollingUp;
          setIsScrollingUp(nextScrollingUp);
        }
        lastScrollY = currentScrollY;
      }
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updateScrollState();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollState();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // 2. IntersectionObserver to suppress entirely on/near the Booking and Footer sections
  useEffect(() => {
    const suppressIds = ["booking", "footer"];
    const elements = suppressIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const suppressMap = new Map<Element, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          suppressMap.set(entry.target, entry.isIntersecting);
        });
        const anySuppressed = Array.from(suppressMap.values()).some(Boolean);
        setIsBookingInView(anySuppressed);
      },
      {
        rootMargin: "40px 0px 40px 0px",
        threshold: 0.05,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 3. IntersectionObserver on carousels to shrink pill into a compact icon bubble
  useEffect(() => {
    const carouselIds = ["destinations", "comparison", "outcomes"];
    const elements = carouselIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const anyIntersecting = entries.some((e) => e.isIntersecting);
        setIsNearCarousel(anyIntersecting);
      },
      {
        rootMargin: "-10% 0px -10% 0px",
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Suppress entirely if not past hero, OR if booking section is in view
  const shouldRender = isVisible && !isBookingInView;

  // On mobile: show if scrolling up OR expanded; hide on scroll down
  const showMobile = shouldRender && (isScrollingUp || expanded);

  return (
    <div
      className={`fixed z-50 flex flex-col items-end gap-3 pointer-events-none transition-all duration-300 right-[max(10px,env(safe-area-inset-right,10px))] bottom-[max(12px,env(safe-area-inset-bottom,12px))] sm:right-[max(16px,env(safe-area-inset-right,16px))] sm:bottom-[max(16px,env(safe-area-inset-bottom,16px))] ${
        shouldRender
          ? showMobile
            ? "opacity-100 translate-y-0"
            : "max-sm:opacity-0 max-sm:translate-y-8 opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      {/* ─── Expanded card ─── */}
      {expanded && (
        <div className="pointer-events-auto animate-slide-up-fade w-[calc(100vw-2rem)] max-w-xs sm:w-80 border border-ink/15 bg-cream-50 shadow-2xl overflow-hidden">
          {/* Card header */}
          <div className="bg-cream-200 border-b border-ink/10 px-4 py-3.5 flex items-center gap-3">
            <div className="h-9 w-9 border border-ink/15 flex-shrink-0 bg-cream flex items-center justify-center">
              <span className="font-serif text-sm font-medium text-ink tracking-wide">PG</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-display text-sm text-ink truncate">Pathways Global</p>
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terra opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-terra" />
                </span>
              </div>
              <p className="label text-[9px] text-stone mt-0.5">Senior Advisor Online · Direct Replies</p>
            </div>
            <button
              onClick={() => setExpanded(false)}
              className="text-stone hover:text-ink transition-colors p-1"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Chat area */}
          <div className="p-4 space-y-3.5 bg-cream-50">
            <div className="flex gap-2.5">
              <div className="h-6 w-6 border border-ink/10 bg-cream flex-shrink-0 mt-0.5 flex items-center justify-center font-serif text-xs text-ink">
                P
              </div>
              <div className="flex-1 border border-ink/10 bg-cream px-3.5 py-3">
                <p className="text-xs text-ink leading-relaxed">
                  Welcome to <strong className="font-semibold">Pathways Global</strong>.
                </p>
                <p className="text-xs text-stone mt-1.5 leading-relaxed font-light">
                  Have an urgent question regarding{" "}
                  <strong className="text-ink font-medium">university shortlisting</strong>,{" "}
                  <strong className="text-ink font-medium">SOP critique</strong>, or{" "}
                  <strong className="text-ink font-medium">visa interview prep</strong>? Connect directly with a senior mentor.
                </p>
                <p className="text-[10px] text-stone mt-2.5 flex items-center gap-1.5 font-light">
                  <Clock className="h-3 w-3 text-terra" />
                  Typically replies within minutes
                </p>
              </div>
            </div>

            {/* Quick chips */}
            <div className="flex flex-wrap gap-1.5 ml-8">
              {["UK 1-Yr Masters", "USA STEM OPT", "Germany €0 Tuition", "Consular Visa Prep"].map((chip) => (
                <a
                  key={chip}
                  href={`${WHATSAPP_URL} ${encodeURIComponent(chip)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-medium text-stone border border-ink/12 bg-cream hover:border-terra/40 hover:text-terra px-2.5 py-1 transition-colors whitespace-nowrap"
                >
                  {chip}
                </a>
              ))}
            </div>

            {/* CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 w-full bg-terra hover:bg-terra-dark text-cream min-h-[44px] py-2.5 px-4 label text-[10px] transition-colors group"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Start WhatsApp Conversation
              </div>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Phone */}
            <a
              href="tel:+33755749029"
              className="flex items-center justify-center gap-2 w-full border border-ink/10 hover:border-ink/20 text-stone min-h-[44px] py-2 label text-[10px] transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-terra" />
              Call Advisory: +33 7 55 74 90 29
            </a>
          </div>
        </div>
      )}

      {/* ─── Mobile Trigger: Always Compact 38-40px Circular Button ─── */}
      <div className="sm:hidden flex items-center pointer-events-auto">
        <button
          onClick={() => setExpanded((prev) => !prev)}
          aria-label={expanded ? "Close WhatsApp chat" : "Chat with Senior Mentor on WhatsApp"}
          className="h-10 w-10 min-h-0 min-w-0 rounded-full p-0 relative inline-flex items-center justify-center bg-[#14120C] text-cream border border-terra/60 shadow-2xl active:scale-[0.96] transition-transform duration-200"
        >
          {expanded ? (
            <X className="h-4 w-4 text-cream" />
          ) : (
            <>
              <span className="absolute top-1.5 right-1.5 flex h-1.5 w-1.5 pointer-events-none">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terra opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-terra" />
              </span>
              <MessageCircle className="h-3.5 w-3.5 text-terra" />
            </>
          )}
        </button>
      </div>

      {/* ─── Desktop: Square Trigger Button ─── */}
      <div className="hidden sm:flex relative items-center pointer-events-auto">
        <button
          onClick={() => setExpanded((prev) => !prev)}
          aria-label={expanded ? "Close WhatsApp chat" : "Chat with Senior Mentor on WhatsApp"}
          className="relative flex items-center justify-center h-12 w-12 border border-ink/20 bg-cream-50 hover:border-terra text-ink hover:text-terra shadow-lg hover:shadow-xl btn-tactile active:scale-[0.98]"
        >
          {expanded ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
}
