"use client";
import { brand } from "@/config/brand";
import Link from "next/link";
import { useEffect, useState } from "react";
const links = [

  ["France", "/study-in-france"],
  ["Universities", "/france/universities"],
  ["Courses", "/france/programmes"],
  ["Services", "/services"],
  ["About", "/about"],
  ["Reviews", "/reviews"],
  ["Knowledge", "/knowledge"],
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
      <Link href="/" className="wordmark" aria-label={`${brand.name} home`}><img className="brand-logo" src={brand.assets.logo} alt={brand.name}/></Link>
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
          Book Consultation <span>↗</span>
        </Link>
      </nav>
    </header>
  );
}
