"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { faqItems } from "@/data/editorial";

function FAQRow({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: typeof faqItems[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const details = useRef<HTMLDetailsElement>(null);
  const [hydrated, setHydrated] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (isOpen && details.current) {
      details.current.open = true;
    }
  }, [isOpen]);

  const toggle = (event: React.MouseEvent<HTMLElement>) => {
    if (!hydrated) return;
    event.preventDefault();
    if (!isOpen && details.current) {
      details.current.open = true;
    }
    onToggle();
  };

  return (
    <details ref={details} className="border-b border-ink/15 group">
      <summary
        onClick={toggle}
        className="faq-summary list-none cursor-pointer py-8 lg:py-10 grid grid-cols-[auto_minmax(0,1fr)_auto] gap-5 lg:gap-10 items-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-terra"
      >
        <span className="font-display text-3xl text-ink/25 leading-none">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span>
          <span className="text-[10px] uppercase tracking-widest text-stone block mb-3">
            {item.category}
          </span>
          <span className="font-display text-2xl sm:text-3xl leading-tight block">
            {item.question}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={`font-display text-3xl leading-none transition-transform duration-500 ${
            hydrated
              ? isOpen
                ? "rotate-45 text-terra"
                : "text-stone"
              : "text-stone group-open:rotate-45"
          }`}
        >
          +
        </span>
      </summary>
      <motion.div
        initial={false}
        animate={hydrated ? { height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 } : undefined}
        transition={{ duration: reduce ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => {
          if (!isOpen && details.current) {
            details.current.open = false;
          }
        }}
        className="overflow-hidden"
      >
        <p className="text-sm sm:text-base text-ink/75 font-light leading-relaxed pb-9 pl-12 lg:pl-16 max-w-3xl">
          {item.answer}
        </p>
      </motion.div>
    </details>
  );
}

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="border-t border-ink/15">
      {faqItems.map((item, i) => (
        <FAQRow
          key={item.question}
          item={item}
          index={i}
          isOpen={openIndex === i}
          onToggle={() => handleToggle(i)}
        />
      ))}
    </div>
  );
}
