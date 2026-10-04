"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const principles = [
  { title: "A familiar voice.", description: "Work with the same mentor who knows your background, understands your ambitions, and remembers the details." },
  { title: "Advice built around you.", description: "Explore courses and universities through your academic profile, budget, and long-term direction." },
  { title: "Independent by design.", description: "Zero university recruiter commissions. Your interests guide the recommendations." },
];

export default function MentorSpotlight() {
  const reduceMotion = useReducedMotion();
  return <section id="mentorship" className="mentor-editorial" aria-labelledby="mentor-title">
    <div className="mentor-editorial-top"><span>05 / THE HUMAN DIFFERENCE</span><span>PERSONAL, FROM THE VERY BEGINNING</span></div>
    <div className="mentor-editorial-grid">
      <motion.div className="mentor-editorial-image" initial={reduceMotion ? false : { opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}><div className="mentor-photo-frame"><img src="/images/mentor-spotlight.webp" alt="Senior admissions mentor in a consultation session" loading="lazy" width={560} height={700} /><div className="mentor-photo-caption"><span>ONE-TO-ONE MENTORSHIP</span><p>A conversation.<br /><em>A connection. A way forward.</em></p></div></div><p className="mentor-photo-footnote"><span>01 : 01</span> Individual attention. Shared ambition.</p></motion.div>
      <motion.div className="mentor-editorial-copy" initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}><p className="luxury-eyebrow">YOUR STORY DESERVES TO BE HEARD</p><h2 id="mentor-title">A big decision.<br /><em>A personal connection.</em></h2><p className="mentor-editorial-intro">Behind every application is a person, a family, and a future. Get thoughtful guidance from someone who takes the time to understand yours.</p><div className="mentor-principles">{principles.map((item,index) => <motion.div key={item.title} initial={reduceMotion ? false : { opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : index * 0.09, ease: [0.22, 1, 0.36, 1] }}><span>0{index+1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></motion.div>)}</div><Link href="/mentorship-model">Meet your mentorship experience <ArrowUpRight size={20} /></Link></motion.div>
    </div>
  </section>;
}
