"use client";
import BrandLockup from "@/components/brand/BrandLockup";
import { brand } from "@/config/brand";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { paris } from "@/lib/paris";

const primary = [["Destinations", "/destinations"], ["Universities", "/universities"], ["Our support", "/services"], ["Jobs & Careers", "/jobs"], ["About", "/about"]];
const menu = [
  { label: "Home", href: "/", image: paris("eiffel-autumn-sky").file, note: "Go further. Become more." },
  { label: "Study in France", href: "/study-in-france", image: paris("bnf-salle-ovale").file, note: "Programmes, routes and budgets" },
  { label: "Destinations", href: "/destinations", image: paris("paris-night-aerial").file, note: "Seven countries, one plan" },
  { label: "Universities & courses", href: "/universities", image: paris("rooftops-eiffel").file, note: "Search the live directory" },
  { label: "Programmes & fees", href: "/programmes", image: paris("louvre-night").file, note: "Published tuition and timing" },
  { label: "Our support", href: "/services", image: paris("cafe-palais-royal").file, note: "Study, settle and succeed" },
  { label: "Settle in France", href: "/settle-in-france", image: paris("paris-window").file, note: "Your first address, your first month" },
  { label: "Jobs & Careers", href: "/jobs", image: paris("la-defense-skyline").file, note: "Work rights and opportunities" },
  { label: "The journal", href: "/knowledge", image: paris("student-cafe").file, note: "Reviewed guidance, seven countries" },
  { label: "About Althéa", href: "/about", image: paris("ile-de-la-cite").file, note: "Founded in Paris by Harshita Kohli" },
];

export default function Navbar(_props: { appearance?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(0);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { const i = menu.findIndex((item) => item.href === pathname); setPreview(i < 0 ? 0 : i); }, [pathname]);

  useEffect(() => {
    const node = panel.current;
    document.documentElement.classList.toggle("ms-menu-open", open);
    if (node) { if (open) node.removeAttribute("inert"); else node.setAttribute("inert", ""); }
    if (!open) return;
    const first = node?.querySelector<HTMLElement>(".ms-menu-list a");
    const focusTimer = window.setTimeout(() => first?.focus(), 80);
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); return; }
      if (event.key !== "Tab" || !node) return;
      const items = [toggle.current, ...node.querySelectorAll<HTMLElement>("a, button")].filter(Boolean) as HTMLElement[];
      const index = items.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && index <= 0) { event.preventDefault(); items[items.length - 1].focus(); }
      else if (!event.shiftKey && index === items.length - 1) { event.preventDefault(); items[0].focus(); }
    };
    window.addEventListener("keydown", key);
    return () => { window.clearTimeout(focusTimer); window.removeEventListener("keydown", key); };
  }, [open]);

  return <header className={`ms-nav${open ? " is-menu" : ""}`}>
    <Link href="/" className="ms-nav-brand" aria-label={`${brand.name} home`}><BrandLockup /></Link>
    <nav className="ms-nav-links" aria-label="Main navigation">{primary.map(([label, href]) => <Link href={href} aria-current={pathname === href ? "page" : undefined} key={href}>{label}</Link>)}</nav>
    <div className="ms-nav-actions">
      <Link href="/book-consultation" className="ms-nav-cta mx-magnetic">Let’s talk<ArrowUpRight size={15} aria-hidden="true" /></Link>
      <button ref={toggle} type="button" className="ms-menu-btn" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="site-menu" onClick={() => setOpen(!open)}>
        <span className="ms-menu-label" aria-hidden="true"><span>Menu</span><span>Close</span></span>
        <span className="ms-burger" aria-hidden="true"><i /><i /></span>
      </button>
    </div>

    <div id="site-menu" ref={panel} className="ms-menu" data-open={open} data-lenis-prevent role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden={!open}>
      <div className="ms-menu-grid">
        <nav className="ms-menu-list" aria-label="Mobile navigation">
          <p className="ms-kicker">EXPLORE ALTHÉA</p>
          <ol>{menu.map((item, i) => <li key={item.href} style={{ "--i": i } as React.CSSProperties}>
            <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} onMouseEnter={() => setPreview(i)} onFocus={() => setPreview(i)} onClick={() => setOpen(false)}>
              <small>{String(i + 1).padStart(2, "0")}</small><span>{item.label}</span><ArrowUpRight size={22} aria-hidden="true" />
            </Link>
          </li>)}</ol>
        </nav>
        <aside className="ms-menu-aside" aria-hidden="true">
          <div className="ms-menu-preview">{menu.map((item, i) => <div key={item.href} className={i === preview ? "is-active" : undefined}><Image src={item.image} alt="" fill sizes="40vw" /><span>{item.note}</span></div>)}</div>
        </aside>
      </div>
      <div className="ms-menu-foot">
        <a href={`mailto:${brand.email}`}><Mail size={15} aria-hidden="true" />{brand.email}</a>
        <a href={`https://wa.me/${brand.whatsappNumber}`} target="_blank" rel="noreferrer"><MessageCircle size={15} aria-hidden="true" />WhatsApp +33 7 55 74 90 29</a>
        <span><MapPin size={15} aria-hidden="true" />{brand.location}</span>
        <Link className="ms-btn ms-btn-gold" href="/book-consultation" onClick={() => setOpen(false)}><span>Start a conversation</span><ArrowUpRight size={17} aria-hidden="true" /></Link>
      </div>
    </div>
  </header>;
}
