"use client";

import { useEffect, useRef } from "react";

export default function ComparisonSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches ||
      window.innerWidth < 1024
    ) {
      return;
    }

    const node = ref.current;
    const section = node?.parentElement;
    if (!node || !section) return;

    let rect = section.getBoundingClientRect();
    const updateRect = () => {
      rect = section.getBoundingClientRect();
    };

    let rafId = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      });
    };

    const enter = () => {
      updateRect();
      node.classList.add("active");
    };

    const leave = () => {
      cancelAnimationFrame(rafId);
      node.classList.remove("active");
    };

    window.addEventListener("resize", updateRect, { passive: true });
    section.addEventListener("pointermove", move, { passive: true });
    section.addEventListener("pointerenter", enter);
    section.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateRect);
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerenter", enter);
      section.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <div ref={ref} className="comparison-spotlight" aria-hidden="true" />;
}
