"use client";
import { useEffect } from "react";

const CAROUSELS = ".ms-grid, .ms-kh-grid, .ms-dir-grid, .ms-jobs-grid, .ms-jobs-types, .ms-dir-countries, .ms-story-notes, .ms-cities, .ms-journal, .ms-steps, .ms-guide-index, .lx-bento, .lx-quotes, .ms-prog-hero, .comparison-verdicts";

/**
 * On phones, card groups scroll sideways (see mobile.css). This adds a small progress meter
 * under each one, nudges it once when it first appears so the swipe is discoverable,
 * and collapses long guide sections except the first.
 */
export default function SwipeHints() {
  useEffect(() => {
    const phone = window.matchMedia("(max-width:640px)");
    const still = window.matchMedia("(prefers-reduced-motion:reduce)");
    const meters = new Map<HTMLElement, HTMLElement>();
    const nudged = new WeakSet<HTMLElement>();
    const keyboardTargets = new Set<HTMLElement>();

    const update = (el: HTMLElement) => {
      const meter = meters.get(el);
      if (!meter) return;
      const items = el.children.length;
      const visible = Math.max(el.clientWidth / el.scrollWidth, 0.08);
      const progress = el.scrollWidth > el.clientWidth ? el.scrollLeft / (el.scrollWidth - el.clientWidth) : 0;
      const bar = meter.querySelector("b") as HTMLElement;
      bar.style.setProperty("--w", `${visible * 100}%`);
      bar.style.setProperty("--x", `${(progress * (1 - visible) / visible) * 100}%`);
      const first = Math.min(items, Math.round(progress * (items - 1)) + 1);
      (meter.querySelector("em") as HTMLElement).textContent = `${first} / ${items}`;
    };

    const nudge = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (!entry.isIntersecting || nudged.has(el) || el.scrollLeft > 0) continue;
        nudged.add(el);
        nudge.unobserve(el);
        if (still.matches) continue;
        el.scrollBy({ left: 64, behavior: "smooth" });
        window.setTimeout(() => el.scrollBy({ left: -64, behavior: "smooth" }), 650);
      }
    }, { threshold: 0.6 });

    const scan = () => {
      for (const [el, meter] of meters) if (!el.isConnected || !phone.matches) { meter.remove(); meters.delete(el); }
      for (const el of keyboardTargets) if (!el.isConnected || !phone.matches || el.scrollWidth <= el.clientWidth + 8) { el.removeAttribute("tabindex"); keyboardTargets.delete(el); }
      if (!phone.matches) return;
      document.querySelectorAll<HTMLElement>(CAROUSELS).forEach((el) => {
        const scrollable = el.scrollWidth > el.clientWidth + 8 && el.children.length > 1;
        if (!scrollable) { meters.get(el)?.remove(); meters.delete(el); return; }
        if (!el.hasAttribute("tabindex") && !el.querySelector('a[href],button,input,select,textarea,[tabindex="0"]')) {
          el.tabIndex = 0;
          keyboardTargets.add(el);
        }
        if (!meters.has(el)) {
          const meter = document.createElement("div");
          meter.className = "ms-swipe-meter";
          meter.setAttribute("aria-hidden", "true");
          meter.innerHTML = "<span>Swipe</span><i><b></b></i><em></em>";
          el.after(meter);
          meters.set(el, meter);
          el.addEventListener("scroll", () => update(el), { passive: true });
          nudge.observe(el);
        }
        update(el);
      });
    };

    // Guide chapters: keep the first section open on phones, the rest one tap away.
    if (phone.matches) document.querySelectorAll<HTMLDetailsElement>("details.ms-guide-block").forEach((d, i) => { if (i > 0) d.open = Boolean(d.id && window.location.hash === `#${d.id}`); });

    let timer = 0;
    const schedule = () => { if (timer) return; timer = window.setTimeout(() => { timer = 0; scan(); }, 150); };
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", schedule);
    phone.addEventListener("change", schedule);
    scan();
    return () => { observer.disconnect(); nudge.disconnect(); window.removeEventListener("resize", schedule); phone.removeEventListener("change", schedule); meters.forEach((m) => m.remove()); keyboardTargets.forEach(el => el.removeAttribute("tabindex")); };
  }, []);
  return null;
}
