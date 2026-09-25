"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Optional desktop enhancement. All content is visible before this loads. */
export default function ScrollExperience() {
  const pathname = usePathname();

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches || window.innerWidth < 1024) return;

    let disposed = false;
    let cleanup = () => {};
    const start = async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, syncTouch: false, anchors: true });
      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);
      // Lenis uses GSAP's ticker; there is deliberately no second RAF loop.
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      document.documentElement.classList.add("lenis-active");

      const animations: Array<{ kill: () => void }> = [];
      const heroWords = document.querySelectorAll<HTMLElement>("[data-hero-word]");
      if (heroWords.length) {
        animations.push(gsap.from(heroWords, {
          yPercent: 28, opacity: 0, filter: "blur(7px)",
          duration: 1.15, ease: "power3.out", stagger: 0.12, delay: 0.22,
          clearProps: "filter,transform,opacity",
        }));
        const ctas = document.querySelectorAll<HTMLElement>("[data-hero-cta]");
        animations.push(gsap.from(ctas, {
          y: 16, opacity: 0, duration: 0.8, delay: 1.05,
          stagger: 0.1, ease: "power2.out", clearProps: "transform,opacity",
        }));
        const heroLayer = document.querySelector<HTMLElement>("[data-hero-parallax]");
        if (heroLayer) animations.push(gsap.to(heroLayer, {
          yPercent: 12, ease: "none",
          scrollTrigger: { trigger: heroLayer.parentElement, start: "top top", end: "bottom top", scrub: true },
        }));
      }

      document.querySelectorAll<HTMLElement>("[data-reveal-heading]").forEach((heading) => {
        animations.push(gsap.from(heading, {
          y: 35, opacity: 0, filter: "blur(5px)", duration: 1.05,
          ease: "power2.out", clearProps: "transform,opacity,filter",
          scrollTrigger: { trigger: heading, start: "top 88%", once: true },
        }));
        animations.push(gsap.fromTo(heading,
          { letterSpacing: "0.015em", skewX: 1.2 },
          { letterSpacing: "-0.025em", skewX: 0, ease: "none", clearProps: "letterSpacing,skewX",
            scrollTrigger: { trigger: heading, start: "top bottom", end: "top 45%", scrub: true } },
        ));
      });

      // On the full admissions page the large stage numeral stays in view while its stage scrolls.
      document.querySelectorAll<HTMLElement>("[data-stage-number]").forEach((number) => {
        const stage = number.closest<HTMLElement>("[data-stage]");
        if (!stage) return;
        const trigger = ScrollTrigger.create({
          trigger: stage, start: "top 110px", end: "bottom 30%", pin: number,
          pinSpacing: false, invalidateOnRefresh: true,
        });
        animations.push(trigger);
      });
      ScrollTrigger.refresh();

      cleanup = () => {
        animations.forEach((animation) => animation.kill());
        lenis.off("scroll", onScroll);
        gsap.ticker.remove(tick);
        lenis.destroy();
        document.documentElement.classList.remove("lenis-active");
      };
    };

    const timer = window.setTimeout(() => { void start().catch(() => {}); }, 300);
    return () => { disposed = true; window.clearTimeout(timer); cleanup(); };
  }, [pathname]);

  return null;
}
