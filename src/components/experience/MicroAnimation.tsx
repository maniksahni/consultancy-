"use client";

import { useEffect, useRef, useState } from "react";

type Kind = "success" | "loading" | "visa-stamp";

export default function MicroAnimation({ kind, className = "" }: { kind: Kind; className?: string }) {
  const host = useRef<HTMLSpanElement>(null);
  const [animation, setAnimation] = useState<Record<string, unknown> | null>(null);
  const [Lottie, setLottie] = useState<typeof import("lottie-react")["LottieLight"] | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = host.current;
    if (!node) return;
    let cancelled = false;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0]?.isIntersecting) return;
      observer.disconnect();
      void Promise.all([
        import("lottie-react"),
        fetch(`/animations/${kind}.json`).then((response) => response.ok ? response.json() : null),
      ]).then(([module, data]) => {
        if (!cancelled && data) { setLottie(() => module.LottieLight); setAnimation(data); }
      }).catch(() => {});
    }, { rootMargin: "100px" });
    observer.observe(node);
    return () => { cancelled = true; observer.disconnect(); };
  }, [kind]);

  return <span ref={host} className={`inline-flex items-center justify-center flex-none ${className}`} aria-hidden="true">
    {Lottie && animation ? <Lottie src={animation} loop={kind === "loading"} autoplay className="w-full h-full" /> :
      kind === "loading" ? <span className="block w-3/5 h-3/5 border-2 border-current border-t-transparent rounded-full animate-spin" /> :
      kind === "success" ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3/5 h-3/5"><path d="m4 12 5 5L20 6" /></svg> :
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3/5 h-3/5"><circle cx="12" cy="12" r="9" /><path d="m7 12 3 3 7-7" /></svg>}
  </span>;
}
