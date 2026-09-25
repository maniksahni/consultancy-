"use client";

import type { MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 140, damping: 22 });
  const springY = useSpring(y, { stiffness: 140, damping: 22 });
  const rotateY = useTransform(springX, [-1, 1], [-2.2, 2.2]);
  const rotateX = useTransform(springY, [-1, 1], [2.2, -2.2]);

  const move = (event: MouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  return <motion.div
    className={`tilt-card ${className}`}
    style={{ rotateX, rotateY, transformPerspective: 1200 }}
    onMouseMove={move}
    onMouseLeave={() => { x.set(0); y.set(0); }}
  >{children}</motion.div>;
}
