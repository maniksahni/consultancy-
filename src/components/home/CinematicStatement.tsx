"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CinematicStatement() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section ref={ref} className="colour-statement luxury-interlude" aria-label="A personal path forward">
      <motion.img style={{ y: reduced ? 0 : y }} src="/images/destinations/germany.webp" alt="" loading="lazy" />
      <div className="luxury-interlude-shade" />
      <div className="luxury-interlude-copy">
        <p className="luxury-eyebrow">03 / A DIFFERENT PERSPECTIVE</p>
        <h2>Some places inspire you.<br /><em>The right path transforms you.</em></h2>
        <p>A destination is just the beginning. Thoughtful guidance helps you turn possibility into a plan that is yours.</p>
        <Link href="/admissions-process">Discover your journey <ArrowUpRight size={17} /></Link>
      </div>
      <span className="luxury-interlude-caption">GERMANY / A NEW PERSPECTIVE</span>
    </section>
  );
}
