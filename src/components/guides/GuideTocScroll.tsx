"use client";
import { useEffect } from "react";

/** Brings the current chapter into view when the chapter list scrolls sideways on small screens. */
export default function GuideTocScroll() {
  useEffect(() => {
    const list = document.querySelector<HTMLElement>(".ms-guide-toc ol");
    const current = list?.querySelector<HTMLElement>("[aria-current]")?.parentElement;
    if (list && current && list.scrollWidth > list.clientWidth) list.scrollLeft = current.offsetLeft - list.offsetLeft - 16;
    // A shared topic URL should reveal its answer even inside an in-depth section.
    const revealTopic = () => {
      const match = window.location.hash.match(/^#guide-topic-\d+$/);
      if (!match) return;
      const topic = document.getElementById(match[0].slice(1));
      if (topic instanceof HTMLDetailsElement) {
        topic.open = true;
        topic.scrollIntoView({ block: "start" });
      }
    };
    revealTopic();
    window.addEventListener("hashchange", revealTopic);
    return () => window.removeEventListener("hashchange", revealTopic);
  }, []);
  return null;
}
