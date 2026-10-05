"use client";

import { AnimatePresence, motion, useReducedMotion, useSpring, useMotionValue } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function GlobalMotionLayer() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [pointerVisible, setPointerVisible] = useState(false);
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const cursorX = useSpring(x, { stiffness: 500, damping: 38, mass: 0.35 });
  const cursorY = useSpring(y, { stiffness: 500, damping: 38, mass: 0.35 });

  useEffect(() => {
    const desktopPointer = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const update = () => {
      setEnabled(desktopPointer.matches && !reduceMotion);
      setPointerVisible(false);
    };
    update();
    desktopPointer.addEventListener("change", update);
    return () => desktopPointer.removeEventListener("change", update);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setPointerVisible(true);
    };
    const onOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      setInteractive(!!target?.closest("a,button,[role='button'],input,select,textarea"));
    };
    const onLeave = () => setPointerVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [enabled, x, y]);

  // Sections and buttons own their motion locally. Transforming a section here
  // would make its fixed dialogs section-relative and compete with Framer Motion.
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          aria-hidden="true"
          className="route-reveal"
          initial={reduceMotion ? false : { scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: reduceMotion ? 0 : 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: EASE }}
        />
      </AnimatePresence>
      {enabled && (
        <>
          <motion.div aria-hidden="true" className="premium-cursor" style={{ x: cursorX, y: cursorY }} animate={{ opacity: pointerVisible ? 1 : 0 }}>
            <motion.span animate={{ scale: interactive ? 1 : 14 / 36 }} transition={{ duration: 0.25, ease: EASE }} />
          </motion.div>
          <motion.div aria-hidden="true" className="pointer-aura" style={{ x: cursorX, y: cursorY }} animate={{ opacity: pointerVisible ? 0.34 : 0 }} />
        </>
      )}
      <style jsx global>{`
        .route-reveal {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          transform-origin: top;
          background: #2d2722;
        }
        .premium-cursor {
          position: fixed;
          left: -18px;
          top: -18px;
          width: 36px;
          height: 36px;
          z-index: 10000;
          pointer-events: none;
          mix-blend-mode: difference;
        }
        .premium-cursor span {
          display: block;
          width: 100%;
          height: 100%;
          border: 1px solid rgba(248,243,232,.82);
          border-radius: 50%;
        }
        .pointer-aura {
          position: fixed;
          left: -420px;
          top: -420px;
          width: 840px;
          height: 840px;
          z-index: 1;
          pointer-events: none;
          background: radial-gradient(circle, rgba(161,98,7,.09), transparent 68%);
        }
        @media (pointer: coarse), (max-width: 1023px), (prefers-reduced-motion: reduce) {
          .premium-cursor, .pointer-aura { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .route-reveal { display: none !important; }
        }
      `}</style>
    </>
  );
}
