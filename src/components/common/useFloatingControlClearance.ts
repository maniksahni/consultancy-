"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function useFloatingControlClearance() {
  const pathname = usePathname();
  const [blocked, setBlocked] = useState(true);

  useEffect(() => {
    const selector = ".carousel-snap, .carousel-viewport, [data-carousel], [data-floating-clearance], #comparison, #outcomes, #booking, #footer, footer";
    const visibility = new Map<Element, boolean>();
    const update = () => setBlocked(Array.from(visibility.values()).some(Boolean));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (visibility.has(entry.target)) visibility.set(entry.target, entry.isIntersecting);
      });
      update();
    }, { rootMargin: "40px 0px", threshold: 0 });
    const refresh = () => {
      const targets = new Set(document.querySelectorAll(selector));
      visibility.forEach((_, target) => {
        if (!targets.has(target)) { observer.unobserve(target); visibility.delete(target); }
      });
      targets.forEach((target) => {
        if (visibility.has(target)) return;
        const rect = target.getBoundingClientRect();
        visibility.set(target, rect.width > 0 && rect.height > 0 && rect.bottom > -40 && rect.top < window.innerHeight + 40);
        observer.observe(target);
      });
      update();
    };
    refresh();
    const mutations = new MutationObserver(refresh);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => { observer.disconnect(); mutations.disconnect(); };
  }, [pathname]);

  return blocked;
}
