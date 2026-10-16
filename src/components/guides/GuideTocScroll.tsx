"use client";
import { useEffect } from "react";

/** Brings the current chapter into view when the chapter list scrolls sideways on small screens. */
export default function GuideTocScroll() {
  useEffect(() => {
    const list = document.querySelector<HTMLElement>(".ms-guide-toc ol");
    const current = list?.querySelector<HTMLElement>("[aria-current]")?.parentElement;
    if (list && current && list.scrollWidth > list.clientWidth) list.scrollLeft = current.offsetLeft - list.offsetLeft - 16;
  }, []);
  return null;
}
