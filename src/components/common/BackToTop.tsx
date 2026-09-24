"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;
    let lastVisible = false;

    const checkVisibility = () => {
      const threshold = Math.max(window.innerHeight * 1.2, 600);
      const nextVisible = window.scrollY > threshold;
      if (nextVisible !== lastVisible) {
        lastVisible = nextVisible;
        setIsVisible(nextVisible);
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.92 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            bottom: "max(20px, env(safe-area-inset-bottom, 20px))",
            left: "max(16px, env(safe-area-inset-left, 16px))",
          }}
          className="z-30" // z-30: below overlays/navbars (z-40+) but above section content
        >
          <button
            onClick={scrollToTop}
            aria-label="Back to top of page"
            className="group inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2.5 bg-[#14120C] text-cream border border-cream/20 hover:border-terra text-xs shadow-xl btn-tactile focus:outline-none focus:ring-2 focus:ring-terra/60 active:scale-[0.97]"
          >
            <ArrowUp className="w-3.5 h-3.5 text-terra group-hover:-translate-y-0.5 transition-transform duration-200" />
            <span className="label text-[9px] text-cream/80 group-hover:text-terra tracking-widest uppercase transition-colors">
              Top
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
