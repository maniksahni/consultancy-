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
      try {
        const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({ lerp: 0.08, smoothWheel: true, syncTouch: false, anchors: true });
        const onScroll = () => ScrollTrigger.update();
        lenis.on("scroll", onScroll);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(500, 33);
        document.documentElement.classList.add("lenis-active");

        const animations: Array<{ kill: () => void }> = [];

        // Parallax hero layer if present
        const heroLayer = document.querySelector<HTMLElement>("[data-hero-parallax]");
        if (heroLayer && heroLayer.parentElement) {
          animations.push(
            gsap.to(heroLayer, {
              yPercent: 10,
              ease: "none",
              scrollTrigger: {
                trigger: heroLayer.parentElement,
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            })
          );
        }

        // Clean heading entrance without paint-heavy continuous skewing
        document.querySelectorAll<HTMLElement>("[data-reveal-heading]").forEach((heading) => {
          animations.push(
            gsap.from(heading, {
              y: 28,
              opacity: 0,
              duration: 0.9,
              ease: "power2.out",
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: heading, start: "top 88%", once: true },
            })
          );
        });

        // Top reading progress bar
        const progress = document.querySelector<HTMLElement>("[data-scroll-progress]");
        if (progress) {
          animations.push(
            gsap.fromTo(
              progress,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: document.documentElement,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: 0.1,
                },
              }
            )
          );
        }

        // Pinned stage numerals on admissions process page
        document.querySelectorAll<HTMLElement>("[data-stage-number]").forEach((number) => {
          const stage = number.closest<HTMLElement>("[data-stage]");
          if (!stage) return;
          const trigger = ScrollTrigger.create({
            trigger: stage,
            start: "top 110px",
            end: "bottom 30%",
            pin: number,
            pinSpacing: false,
            invalidateOnRefresh: true,
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
      } catch {
        /* Fallback to native scrolling if libraries fail */
      }
    };

    // Defer initialization until after first contentful paint and interaction idle
    const schedule = (cb: () => void) => {
      const win = window as any;
      if (typeof win.requestIdleCallback === "function") {
        return win.requestIdleCallback(cb, { timeout: 2500 });
      }
      return setTimeout(cb, 1200);
    };

    const cancelSchedule = (id: number) => {
      const win = window as any;
      if (typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };

    const idleId = schedule(() => {
      void start();
    });

    return () => {
      disposed = true;
      cancelSchedule(idleId);
      cleanup();
    };
  }, [pathname]);

  return <div aria-hidden="true" data-scroll-progress className="scroll-progress" />;
}
