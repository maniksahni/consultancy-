"use client";
import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";

/** One-open-at-a-time disclosure list used for FAQs and long guidance. */
export default function Accordion({ items, initial = 0, idPrefix }: { items: { q: ReactNode; a: ReactNode }[]; initial?: number | null; idPrefix?: string }) {
  const [open, setOpen] = useState<number | null>(initial);
  const auto = useId();
  const prefix = idPrefix || `acc-${auto.replace(/:/g, "")}`;
  return <div className="ms-accordion">{items.map((item, i) => {
    const isOpen = open === i;
    return <div className={`ms-acc-item${isOpen ? " is-open" : ""}`} key={i}>
      <h3><button type="button" aria-expanded={isOpen} aria-controls={`${prefix}-${i}`} onClick={() => setOpen(isOpen ? null : i)}><span className="ms-acc-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><span className="ms-acc-q">{item.q}</span><span className="ms-acc-icon" aria-hidden="true"><Plus size={18} /></span></button></h3>
      <div className="ms-acc-panel" id={`${prefix}-${i}`} hidden={!isOpen}><div>{item.a}</div></div>
    </div>;
  })}</div>;
}
