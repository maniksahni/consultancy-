"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, type HTMLMotionProps } from "framer-motion";
import { useEffect, useState } from "react";

/** One transform owner: pointer translation and hover/tap scale share Framer Motion. */
export default function MagneticLink(props: HTMLMotionProps<"a">) {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 28 });
  const springY = useSpring(y, { stiffness: 180, damping: 28 });

  useEffect(() => {
    const desktopPointer = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const update = () => {
      setEnabled(desktopPointer.matches && !reduceMotion);
      x.set(0);
      y.set(0);
    };
    update();
    desktopPointer.addEventListener("change", update);
    return () => desktopPointer.removeEventListener("change", update);
  }, [reduceMotion, x, y]);

  return <motion.a
    {...props}
    style={{ ...props.style, x: enabled ? springX : 0, y: enabled ? springY : 0 }}
    onPointerMove={event => {
      if (!enabled || event.pointerType === "touch") return;
      const rect = event.currentTarget.getBoundingClientRect();
      x.set(Math.max(-6, Math.min(6, (event.clientX - rect.left - rect.width / 2) * 0.08)));
      y.set(Math.max(-4, Math.min(4, (event.clientY - rect.top - rect.height / 2) * 0.08)));
    }}
    onPointerLeave={() => { x.set(0); y.set(0); }}
    onBlur={() => { x.set(0); y.set(0); }}
  />;
}
