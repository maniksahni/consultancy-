"use client";
import { brand } from "@/config/brand";
import Link from "next/link";
import { useEffect, useState } from "react";
const links = [
  ["Home", "/"],
  ["Settle in France", "/settle-in-france"],
  ["Study in France", "/study-in-france"],
  ["Career Support", "/career-support"],
  ["About Harshita", "/about"],
  ["Resources", "/knowledge"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label={`${brand.name} home`}><img className="brand-logo" src={brand.assets.logo} alt={brand.name} width={420} height={96}/></Link>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close ✕" : "Menu ☰"}
      </button>
      <nav
        id="navigation"
        aria-label="Main navigation"
        className={open ? "navigation open" : "navigation"}
      >
        {links.map(([label, url]) => (
          <Link key={url} href={url} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <Link
          className="button small"
          href="/book-consultation"
          onClick={() => setOpen(false)}
        >
          Book a Call <span>↗</span>
        </Link>
      </nav>
    </header>
  );
}
