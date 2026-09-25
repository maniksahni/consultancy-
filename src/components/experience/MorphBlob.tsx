"use client";

import { useEffect, useRef } from "react";

const A = "M80 15 C116 10 153 38 153 81 C153 125 119 154 79 151 C39 148 12 119 14 78 C16 42 43 19 80 15 Z";
const B = "M80 11 C130 16 158 43 149 83 C143 115 128 149 83 154 C40 159 10 122 11 80 C13 40 35 12 80 11 Z";

export default function MorphBlob() {
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches ||
      window.innerWidth < 1024
    ) {
      return;
    }

    let active = true;
    let cleanup = () => {};

    const schedule = (cb: () => void) => {
      const win = window as any;
      if (typeof win.requestIdleCallback === "function") {
        return win.requestIdleCallback(cb, { timeout: 3500 });
      }
      return setTimeout(cb, 2200);
    };

    const cancelSchedule = (id: number) => {
      const win = window as any;
      if (typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };

    const idleId = schedule(() => {
      Promise.all([import("flubber"), import("gsap")])
        .then(([{ interpolate }, { gsap }]) => {
          if (!active || !path.current) return;
          const ab = interpolate(A, B, { maxSegmentLength: 4 });
          const ba = interpolate(B, A, { maxSegmentLength: 4 });
          const state = { t: 0 };
          const timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
          timeline.to(state, {
            t: 1,
            duration: 6,
            ease: "sine.inOut",
            onUpdate: () => path.current?.setAttribute("d", ab(state.t)),
          });
          timeline.to(state, {
            t: 0,
            duration: 6,
            ease: "sine.inOut",
            onUpdate: () => path.current?.setAttribute("d", ba(1 - state.t)),
          });
          cleanup = () => timeline.kill();
        })
        .catch(() => {});
    });

    return () => {
      active = false;
      cancelSchedule(idleId);
      cleanup();
    };
  }, []);

  return (
    <svg
      viewBox="0 0 165 165"
      aria-hidden="true"
      className="hidden lg:block absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] pointer-events-none opacity-35 blur-sm"
    >
      <path ref={path} d={A} fill="#C25B1A" />
    </svg>
  );
}
