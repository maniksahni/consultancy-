"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Site-wide motion layer: a scroll-aware header, magnetic buttons and cursor
// spotlights. Scrolling itself stays native, so the page follows the wheel or
// finger instantly instead of easing behind it.
const REVEAL = [
  "main section:not(:first-of-type) :is(h2, .mx-kicker, blockquote, figure)",
  "main section:not(:first-of-type) article",
  "main [data-reveal]",
  ".ms-page-body .ms-head, .ms-page-body .ms-card, .ms-page-body .ms-split, .ms-page-body .ms-facts > div",
].join(",");
const SPOTLIGHT = ".mx-stat, .mx-quote, [data-spotlight]";
const MAGNETIC = ".mx-magnetic, [data-magnetic]";
const INTERACTIVE = "a, button, select, input, textarea, label, [role=button]";

export default function SiteMotion() {
  const pathname = usePathname();
  // Per-page behaviour, re-run on every route change.
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>(".ms-nav");
    let lastY = scrollY, frame = 0;

    const update = () => {
      frame = 0;
      const y = scrollY;
      if (header) {
        header.dataset.scrolled = String(y > 24);
        const menuOpen = root.classList.contains("ms-menu-open");
        const hide = !reduced && !menuOpen && y > 480 && y > lastY + 4;
        if (hide) header.dataset.tucked = "true";
        else if (y < lastY - 4 || y <= 480 || menuOpen) header.dataset.tucked = "false";
      }
      lastY = y;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });

    const onPointer = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const card = target?.closest?.<HTMLElement>(SPOTLIGHT);
      if (card) {
        const box = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - box.left}px`);
        card.style.setProperty("--my", `${event.clientY - box.top}px`);
      }
    };
    document.addEventListener("pointermove", onPointer, { passive: true });

    // Magnetic calls to action.
    const magnets: (() => void)[] = [];
    if (fine && !reduced) document.querySelectorAll<HTMLElement>(MAGNETIC).forEach((el) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      const move = (event: PointerEvent) => { const box = el.getBoundingClientRect(); xTo((event.clientX - box.left - box.width / 2) * 0.25); yTo((event.clientY - box.top - box.height / 2) * 0.35); };
      const leave = () => { xTo(0); yTo(0); };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      magnets.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); gsap.set(el, { clearProps: "transform" }); });
    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      removeEventListener("scroll", onScroll);
      document.removeEventListener("pointermove", onPointer);
      cancelAnimationFrame(frame);
      window.clearTimeout(refresh);
      magnets.forEach((fn) => fn());
      if (header) header.dataset.tucked = "false";
    };
  }, [pathname]);

  return null;
}
