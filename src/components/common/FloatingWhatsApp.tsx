"use client";
import { brand } from "@/config/brand";
import { waLink, waMessages, whatsApp } from "@/config/contact";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Mail, X } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

/** WhatsApp, always one tap away: a green button bottom-right that opens a small card (WhatsApp first, then a call or email). */
export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  useEffect(() => setOpen(false), [pathname]);
  if (pathname?.startsWith("/admin")) return null;
  return <aside className="ms-float is-visible" aria-label="Contact Althéa">
    {open && <div className="ms-float-card" id="wa-card">
      <p className="ms-kicker">USUALLY REPLIES THE SAME DAY</p>
      <p className="ms-float-title">Talk to <em>{brand.person.split(" ")[0]}</em> directly.</p>
      <p>Message on WhatsApp about courses, applications, jobs or life in France. Your message is already written; just add your details.</p>
      <a className="ms-btn ms-btn-wa" href={waLink(waMessages.general)} target="_blank" rel="noopener noreferrer" data-wa onClick={() => setOpen(false)}><span>Chat on WhatsApp</span><WhatsAppIcon size={18} /></a>
      <Link href="/book-consultation" onClick={() => setOpen(false)}><CalendarDays size={15} aria-hidden="true" />Prefer a call? Book 15 minutes</Link>
      <a href={`mailto:${brand.email}`}><Mail size={15} aria-hidden="true" />{brand.email}</a>
      <small className="ms-float-num">WhatsApp {whatsApp.display}</small>
    </div>}
    <button type="button" className="ms-float-btn ms-float-wa" aria-expanded={open} aria-controls="wa-card" aria-label={open ? "Close contact options" : "Chat with Harshita on WhatsApp"} onClick={() => setOpen(!open)}>
      {open ? <X size={22} /> : <WhatsAppIcon size={28} />}
      {!open && <span className="ms-float-label">Chat with {brand.person.split(" ")[0]}</span>}
    </button>
  </aside>;
}
