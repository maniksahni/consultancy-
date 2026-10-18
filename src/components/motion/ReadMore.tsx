"use client";
import { useEffect } from "react";

const LONG_TEXT = ".ms-prose > p, .ms-cover-intro, .ms-split-copy > p:not(.ms-kicker), .ms-head-aside > p, .ms-notice > div > p:not(.ms-guide-sources), .lx-lead";
const LINES = 4;

/**
 * On phones, long paragraphs show their first four lines with a "Read more" button,
 * so pages stay short while every word is still one tap away. Larger screens are untouched.
 */
export default function ReadMore() {
  useEffect(() => {
    const phone = window.matchMedia("(max-width:640px)");
    const added = new Map<HTMLElement, HTMLButtonElement>();

    const scan = () => {
      for (const [el, button] of added) if (!el.isConnected || !phone.matches) { button.remove(); el.classList.remove("is-clamped"); added.delete(el); }
      if (!phone.matches) return;
      document.querySelectorAll<HTMLElement>(LONG_TEXT).forEach((el) => {
        if (added.has(el) || el.dataset.readmore === "open" || el.closest("details:not([open])")) return;
        const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 24;
        if (el.scrollHeight < lineHeight * (LINES + 1.5)) return;
        el.classList.add("is-clamped");
        const button = document.createElement("button");
        button.type = "button";
        button.className = "ms-readmore";
        button.textContent = "Read more";
        button.setAttribute("aria-expanded", "false");
        button.addEventListener("click", () => {
          const open = el.classList.toggle("is-clamped") === false;
          el.dataset.readmore = open ? "open" : "";
          button.textContent = open ? "Show less" : "Read more";
          button.setAttribute("aria-expanded", String(open));
        });
        el.after(button);
        added.set(el, button);
      });
    };

    let timer = 0;
    // Throttle rather than debounce: some pages change the DOM continuously, which would postpone a debounced scan forever.
    const schedule = () => { if (timer) return; timer = window.setTimeout(() => { timer = 0; scan(); }, 200); };
    const observer = new MutationObserver((records) => { if (records.some((r) => !(r.target instanceof HTMLElement && r.target.classList.contains("ms-readmore")))) schedule(); });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["open"] });
    phone.addEventListener("change", schedule);
    scan();
    return () => { observer.disconnect(); phone.removeEventListener("change", schedule); added.forEach((b, el) => { b.remove(); el.classList.remove("is-clamped"); }); };
  }, []);
  return null;
}
