"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches ||
      window.innerWidth < 1024
    ) {
      return;
    }

    let active = true;
    let cleanup = () => {};

    // Lazy load GSAP only upon the user's first desktop pointer movement
    const onFirstMove = (firstEvent: PointerEvent) => {
      import("gsap")
        .then(({ gsap }) => {
          if (!active || !dot.current || !ring.current) return;
          document.body.classList.add("custom-cursor-active");

          const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power2.out" });
          const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power2.out" });
          const rx = gsap.quickTo(ring.current, "x", { duration: 0.55, ease: "power3.out" });
          const ry = gsap.quickTo(ring.current, "y", { duration: 0.55, ease: "power3.out" });

          dx(firstEvent.clientX);
          dy(firstEvent.clientY);
          rx(firstEvent.clientX);
          ry(firstEvent.clientY);
          dot.current.classList.add("visible");
          ring.current.classList.add("visible");

          const move = (e: PointerEvent) => {
            const target = e.target as Element | null;
            const isInput = target?.closest("input, textarea, select, [contenteditable='true']");
            if (isInput) {
              dot.current?.classList.remove("visible");
              ring.current?.classList.remove("visible");
              return;
            }
            dx(e.clientX);
            dy(e.clientY);
            rx(e.clientX);
            ry(e.clientY);
            dot.current?.classList.add("visible");
            ring.current?.classList.add("visible");
          };

          const over = (e: PointerEvent) => {
            const target = e.target as Element | null;
            const isInput = target?.closest("input, textarea, select, [contenteditable='true']");
            if (isInput) {
              dot.current?.classList.remove("visible");
              ring.current?.classList.remove("visible");
              return;
            }

            const isDrag = target?.closest("[data-cursor-drag], [aria-roledescription='carousel']");
            const isView = target?.closest("[data-cursor-view]");
            const interactive = target?.closest("a, button, [role='button'], .tilt-card");

            const shouldExpand = !!interactive || !!isDrag || !!isView;
            ring.current?.classList.toggle("is-interactive", shouldExpand);

            if (ring.current) {
              if (isDrag && !interactive) {
                ring.current.textContent = "DRAG";
              } else if (isView && !interactive) {
                ring.current.textContent = "VIEW";
              } else {
                ring.current.textContent = "";
              }
            }
          };

          const leave = () => {
            dot.current?.classList.remove("visible");
            ring.current?.classList.remove("visible");
          };

          window.addEventListener("pointermove", move, { passive: true });
          window.addEventListener("pointerover", over, { passive: true });
          document.addEventListener("mouseleave", leave);

          cleanup = () => {
            document.body.classList.remove("custom-cursor-active");
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerover", over);
            document.removeEventListener("mouseleave", leave);
          };
        })
        .catch(() => {});
    };

    window.addEventListener("pointermove", onFirstMove, { passive: true, once: true });

    return () => {
      active = false;
      window.removeEventListener("pointermove", onFirstMove);
      cleanup();
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
