"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface StatCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

export default function StatCounter({
  value,
  duration = 1.6,
  className = "",
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [display, setDisplay] = useState<string>("");

  // Parse prefix, number, decimals, and suffix
  const parseValue = (raw: string) => {
    const match = raw.match(/^([^0-9.]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
    if (!match) return { prefix: "", num: 0, decimals: 0, suffix: raw };
    const prefix = match[1];
    const num = parseFloat(match[2]);
    const decimals = match[2].includes(".") ? match[2].split(".")[1].length : 0;
    const suffix = match[3];
    return { prefix, num, decimals, suffix };
  };

  const parsed = parseValue(value);

  useEffect(() => {
    // Check reduced motion preference
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(parsed.num.toFixed(parsed.decimals));
      return;
    }

    if (!isInView) {
      setDisplay(parsed.decimals > 0 ? "0.0" : "0");
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = easeOutCubic(progress);
      const current = easedProgress * parsed.num;

      setDisplay(current.toFixed(parsed.decimals));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplay(parsed.num.toFixed(parsed.decimals));
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, parsed.num, parsed.decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}
      {display || (parsed.decimals > 0 ? "0.0" : "0")}
      {parsed.suffix}
    </span>
  );
}
