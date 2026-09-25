"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { faqItems } from "@/data/editorial";

function FAQRow({ item, index }: { item: typeof faqItems[number]; index: number }) {
  const details = useRef<HTMLDetailsElement>(null);
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => { setHydrated(true); }, []);

  const toggle = (event: React.MouseEvent<HTMLElement>) => {
    if (!hydrated) return;
    event.preventDefault();
    if (!open && details.current) details.current.open = true;
    setOpen(!open);
  };

  return <details ref={details} className="border-b border-ink/15 group">
    <summary onClick={toggle} className="faq-summary list-none cursor-pointer py-8 lg:py-10 grid grid-cols-[auto_minmax(0,1fr)_auto] gap-5 lg:gap-10 items-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-terra">
      <span className="font-display text-3xl text-ink/25 leading-none">{String(index + 1).padStart(2, "0")}</span>
      <span><span className="text-[10px] uppercase tracking-widest text-stone block mb-3">{item.category}</span><span className="font-display text-2xl sm:text-3xl leading-tight block">{item.question}</span></span>
      <span aria-hidden="true" className="font-display text-3xl leading-none text-stone group-open:rotate-45 transition-transform duration-500">+</span>
    </summary>
    <motion.div
      initial={false}
      animate={hydrated ? { height: open ? "auto" : 0, opacity: open ? 1 : 0 } : undefined}
      transition={{ duration: reduce ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => { if (!open && details.current) details.current.open = false; }}
      className="overflow-hidden"
    >
      <p className="text-sm sm:text-base text-ink/75 font-light leading-relaxed pb-9 pl-12 lg:pl-16 max-w-3xl">{item.answer}</p>
    </motion.div>
  </details>;
}

export default function FAQAccordion() {
  return <div className="border-t border-ink/15">{faqItems.map((item, i) => <FAQRow key={item.question} item={item} index={i} />)}</div>;
}
