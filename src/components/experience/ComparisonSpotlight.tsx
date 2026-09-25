"use client";

import { useEffect, useRef } from "react";

export default function ComparisonSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const node = ref.current;
    const section = node?.parentElement;
    if (!node || !section) return;
    const move = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    };
    const enter = () => node.classList.add("active");
    const leave = () => node.classList.remove("active");
    section.addEventListener("pointermove", move, { passive: true });
    section.addEventListener("pointerenter", enter);
    section.addEventListener("pointerleave", leave);
    return () => { section.removeEventListener("pointermove", move); section.removeEventListener("pointerenter", enter); section.removeEventListener("pointerleave", leave); };
  }, []);
  return <div ref={ref} className="comparison-spotlight" aria-hidden="true" />;
}
