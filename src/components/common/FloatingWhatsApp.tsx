"use client";
import { brand } from "@/config/brand";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, X } from "lucide-react";

/** A quiet contact orb that appears mid-page and opens a small card of ways to reach Althéa. */
export default function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 700 && window.scrollY + window.innerHeight < document.documentElement.scrollHeight - 400);
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return <aside className={`ms-float${visible || open ? " is-visible" : ""}`} aria-label="Contact Althéa">
    {open && <div className="ms-float-card">
      <p className="ms-kicker">A PERSONAL WAY FORWARD</p>
      <p className="ms-float-title">What’s on <em>your mind?</em></p>
      <p>Tell {brand.person} a little about your plans. We’ll help you find a place to start.</p>
      <Link className="ms-btn ms-btn-gold" href="/book-consultation" onClick={() => setOpen(false)}><span>Start a conversation</span><ArrowUpRight size={16} aria-hidden="true" /></Link>
      <a href={`mailto:${brand.email}`}><Mail size={15} aria-hidden="true" />{brand.email}</a>
    </div>}
    <button type="button" className="ms-float-btn" tabIndex={visible || open ? 0 : -1} aria-expanded={open} aria-label={open ? "Close contact options" : "Talk to Althéa"} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <MessageCircle size={20} />}</button>
  </aside>;
}
