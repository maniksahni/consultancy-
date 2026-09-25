"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [mounted, setMounted] = useState(false);
  const [isPastThreshold, setIsPastThreshold] = useState(false);
  const [isInDangerZone, setIsInDangerZone] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Scroll listener for past-hero visibility threshold
  useEffect(() => {
    let rafId: number | null = null;
    let lastPast = false;

    const checkVisibility = () => {
      const threshold = Math.max(window.innerHeight * 0.8, 480);
      const nextPast = window.scrollY > threshold;
      if (nextPast !== lastPast) {
        lastPast = nextPast;
        setIsPastThreshold(nextPast);
      }
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        checkVisibility();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    checkVisibility();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // 2. IntersectionObserver to suppress TOP button when overlapping "danger zone" sections
  // (Destinations, Comparison, Booking, and Footer)
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const dangerMap = new Map<Element, boolean>();

    const setupObserver = () => {
      const dangerSelectors = ["#destinations", "#comparison", "#booking", "#footer", "footer"];
      const elements: Element[] = [];
      dangerSelectors.forEach((sel) => {
        const el = document.querySelector(sel);
        if (el && !elements.includes(el)) elements.push(el);
      });

      if (elements.length === 0) return false;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            dangerMap.set(entry.target, entry.isIntersecting);
          });
          const anyDanger = Array.from(dangerMap.values()).some(Boolean);
          setIsInDangerZone(anyDanger);
        },
        {
          rootMargin: "-4% 0px -8% 0px",
          threshold: 0.06,
        }
      );

      elements.forEach((el) => observer!.observe(el));
      return true;
    };

    if (!setupObserver()) {
      const retryTimer = setTimeout(setupObserver, 500);
      return () => {
        clearTimeout(retryTimer);
        if (observer) observer.disconnect();
      };
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const shouldShow = isPastThreshold && !isInDangerZone;

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.94 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            bottom: "max(22px, env(safe-area-inset-bottom, 22px))",
            left: "max(20px, env(safe-area-inset-left, 20px))",
          }}
          className="z-[60] pointer-events-none hidden md:block"
        >
          <button
            onClick={scrollToTop}
            aria-label="Back to top of page"
            className="pointer-events-auto group inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2.5 rounded-full bg-[#14120C] text-cream border border-cream/25 shadow-2xl hover:border-terra text-xs btn-tactile focus:outline-none focus:ring-2 focus:ring-terra/60 active:scale-[0.96] transition-all"
          >
            <ArrowUp className="w-3.5 h-3.5 text-terra group-hover:-translate-y-0.5 transition-transform duration-200 flex-shrink-0" />
            <span className="label text-[9px] text-cream/90 group-hover:text-terra tracking-widest uppercase font-medium transition-colors">
              Top
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
