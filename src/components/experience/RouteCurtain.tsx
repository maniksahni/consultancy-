"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** A brief reveal over the destination page; it never handles clicks or scroll. */
export default function RouteCurtain() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  const [routeKey, setRouteKey] = useState<string | null>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (previous.current !== pathname) {
      previous.current = pathname;
      setRouteKey(pathname);
    }
  }, [pathname]);
  if (reduce || !routeKey) return null;
  return <motion.div key={routeKey} aria-hidden="true" className="fixed inset-0 z-[70] pointer-events-none bg-[#14120C]"
    initial={{ clipPath: "inset(0 0 0 0)" }}
    animate={{ clipPath: "inset(0 0 100% 0)" }}
    transition={{ duration: 0.62, ease: [0.76, 0, 0.24, 1] }}
    onAnimationComplete={() => setRouteKey(null)} />;
}
