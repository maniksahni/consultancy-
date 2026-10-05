"use client";

import { AnimatePresence, motion, useReducedMotion, useSpring, useMotionValue } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function GlobalMotionLayer() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const cursorX = useSpring(x, { stiffness: 500, damping: 38, mass: 0.35 });
  const cursorY = useSpring(y, { stiffness: 500, damping: 38, mass: 0.35 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const canEnable = fine.matches && window.innerWidth >= 1024 && !reduceMotion;
    setEnabled(canEnable);
    if (!canEnable) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a,button,[role='button'],input,select,textarea");
      document.documentElement.dataset.cursorActive = interactive ? "true" : "false";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      delete document.documentElement.dataset.cursorActive;
    };
  }, [reduceMotion, x, y]);

  useEffect(() => {
    if (reduceMotion) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section, main section[id], footer")
    );

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("motion-section-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    sections.forEach(section => {
      section.classList.add("motion-section");
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [pathname, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".cinema-primary, .glow-button, [data-magnetic]")
    );

    const cleanups = elements.map(element => {
      const onMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        element.style.transform = `translate3d(${dx * 0.08}px, ${dy * 0.08}px, 0)`;
      };
      const onLeave = () => {
        element.style.transform = "translate3d(0,0,0)";
      };
      element.addEventListener("pointermove", onMove);
      element.addEventListener("pointerleave", onLeave);
      return () => {
        element.removeEventListener("pointermove", onMove);
        element.removeEventListener("pointerleave", onLeave);
        element.style.transform = "";
      };
    });

    return () => cleanups.forEach(cleanup => cleanup());
  }, [pathname, reduceMotion]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          aria-hidden="true"
          className="route-reveal"
          initial={reduceMotion ? false : { scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
        />
      </AnimatePresence>

      {enabled && (
        <>
          <motion.div
            aria-hidden="true"
            className="premium-cursor"
            style={{ x: cursorX, y: cursorY }}
          />
          <div aria-hidden="true" className="pointer-aura" />
        </>
      )}

      <style jsx global>{`
        :root {
          --pointer-x: 50vw;
          --pointer-y: 35vh;
        }

        .route-reveal {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          transform-origin: top;
          background:
            radial-gradient(circle at 50% 45%, rgba(8,127,140,.18), transparent 42%),
            #2d2722;
        }

        .motion-section {
          --section-reveal-y: 34px;
        }

        @media (prefers-reduced-motion: no-preference) {
          .motion-section {
            opacity: 0;
            transform: translate3d(0,var(--section-reveal-y),0);
            transition:
              opacity .9s cubic-bezier(.22,1,.36,1),
              transform 1s cubic-bezier(.22,1,.36,1);
          }

          .motion-section.motion-section-visible {
            opacity: 1;
            transform: translate3d(0,0,0);
          }

          .motion-section.motion-section-visible h2,
          .motion-section.motion-section-visible [data-reveal-heading] {
            animation: premium-heading-in .95s cubic-bezier(.22,1,.36,1) both;
          }

          @keyframes premium-heading-in {
            from { opacity: 0; transform: translate3d(0,22px,0); filter: blur(8px); }
            to { opacity: 1; transform: translate3d(0,0,0); filter: blur(0); }
          }
        }

        .premium-cursor {
          position: fixed;
          left: -7px;
          top: -7px;
          width: 14px;
          height: 14px;
          border: 1px solid rgba(248,243,232,.82);
          border-radius: 999px;
          z-index: 10000;
          pointer-events: none;
          mix-blend-mode: difference;
          transition: width .25s ease, height .25s ease, left .25s ease, top .25s ease, background .25s ease;
        }

        html[data-cursor-active="true"] .premium-cursor {
          left: -18px;
          top: -18px;
          width: 36px;
          height: 36px;
          background: rgba(255,255,255,.16);
        }

        .pointer-aura {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: .34;
          background: radial-gradient(
            420px circle at var(--pointer-x) var(--pointer-y),
            rgba(8,127,140,.12),
            transparent 68%
          );
        }

        .cinema-hero,
        .redesign-destinations,
        .colour-booking {
          isolation: isolate;
        }

        .cinema-hero > *,
        .redesign-destinations > *,
        .colour-booking > * {
          position: relative;
          z-index: 2;
        }

        .cinema-primary,
        .glow-button,
        [data-magnetic] {
          will-change: transform;
          transition: transform .22s cubic-bezier(.22,1,.36,1);
        }

        @media (pointer: coarse), (max-width: 1023px), (prefers-reduced-motion: reduce) {
          .premium-cursor,
          .pointer-aura {
            display: none !important;
          }

          .motion-section {
            opacity: 1 !important;
            transform: none !important;
          }

          .cinema-primary,
          .glow-button,
          [data-magnetic] {
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}
