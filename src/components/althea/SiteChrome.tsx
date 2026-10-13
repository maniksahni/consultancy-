"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, Menu, X, Instagram, Linkedin } from "lucide-react";

const navItems = [
  { label: "The Maison", href: "/" },
  { label: "Study in France", href: "/france" },
  { label: "Universities", href: "/france/universities" },
  { label: "Campus France", href: "/france#campus-france" },
  { label: "Our Approach", href: "/#approach" },
];

export function AltheaHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = old;
    };
  }, [open]);
  return (
    <header className="relative z-50 w-full border-b border-[#152D57]/10 bg-[#FBF9F3] text-[#142D57]">
      <div className="mx-auto flex h-[76px] w-full max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-9 lg:h-[90px] lg:px-14">
        <Link href="/" aria-label="Althéa Consulting home" className="relative z-[60] min-w-0 shrink-0 leading-none">
          <span className="block font-display text-[29px] tracking-[-.055em] sm:text-[33px]">Althéa<span className="ml-1.5 font-normal italic text-[#AD8B57]">.</span></span>
          <span className="mt-1.5 block text-[9px] font-semibold uppercase tracking-[.34em] sm:text-[10px]">Consulting · France</span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {navItems.map(({ label, href }) => (
            <Link key={href} href={href} className="text-[11px] font-medium uppercase tracking-[.13em] transition-colors hover:text-[#AE8A54] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B68E50]">{label}</Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <Link href="/#consultation" className="hidden min-h-11 items-center gap-2 bg-[#18356B] px-5 py-3 text-[10px] font-semibold uppercase tracking-[.17em] text-white transition-colors hover:bg-[#244A89] sm:inline-flex">
            Book a consultation <ArrowUpRight size={15} aria-hidden />
          </Link>
          <button type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="althea-mobile-navigation" className="relative z-[60] flex h-11 w-11 items-center justify-center border border-[#142D57]/20 lg:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18356B]">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="althea-mobile-navigation" aria-label="Mobile navigation" className="absolute left-0 top-full z-50 max-h-[calc(100dvh-76px)] w-full overflow-auto border-t border-[#142D57]/10 bg-[#FBF9F3] px-5 pb-8 pt-5 shadow-2xl sm:px-9 lg:hidden">
          {navItems.map(({ label, href }, index) => (
            <Link key={href} onClick={() => setOpen(false)} href={href} className="flex min-h-14 items-center justify-between border-b border-[#142D57]/10 py-3 font-display text-[clamp(1.5rem,6vw,2.15rem)] text-[#142D57]">
              <span>{label}</span><span className="flex items-center gap-4 text-[10px] font-sans text-[#7C7770]"><span>0{index + 1}</span><ArrowRight size={18}/></span>
            </Link>
          ))}
          <Link href="/#consultation" onClick={() => setOpen(false)} className="mt-7 flex min-h-12 items-center justify-center bg-[#18356B] px-6 py-3 text-[11px] font-semibold uppercase tracking-[.2em] text-white">Book a consultation</Link>
        </nav>
      )}
    </header>
  );
}

export function AltheaFooter() {
  return (
    <footer className="bg-[#102B58] px-5 py-14 text-[#F9F6F0] sm:px-9 lg:px-14 lg:py-20">
      <div className="mx-auto grid max-w-[1328px] grid-cols-1 gap-12 border-b border-white/20 pb-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <div className="font-display text-5xl tracking-tight sm:text-6xl">Althéa<span className="text-[#D7BA87]">.</span></div>
          <div className="mt-2 text-[11px] uppercase tracking-[.32em] text-white/65">Consulting · France</div>
          <p className="mt-7 max-w-md text-sm leading-7 text-white/70">A thoughtfully personal path to studying in France. Explore your options with clarity, care, and guidance grounded in official information.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 md:col-span-6">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#D7BA87]">Explore</p>
            <Link className="block text-sm text-white/80 hover:text-white" href="/france">Study in France</Link>
            <Link className="block text-sm text-white/80 hover:text-white" href="/france/universities">Universities</Link>
            <Link className="block text-sm text-white/80 hover:text-white" href="/france#campus-france">Campus France guide</Link>
          </div>
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[.24em] text-[#D7BA87]">Connect</p>
            <a className="flex items-center gap-2 text-sm text-white/80 hover:text-white" href="https://www.linkedin.com/in/harshita-kohli-imtbs/" target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn</a>
            <a className="flex items-center gap-2 text-sm text-white/80 hover:text-white" href="https://www.instagram.com/helloharshita98/" target="_blank" rel="noreferrer"><Instagram size={16}/> Instagram</a>
            <Link className="block text-sm text-white/80 hover:text-white" href="/#consultation">Contact the team</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1328px] flex-col justify-between gap-4 pt-6 text-xs leading-6 text-white/50 md:flex-row">
        <span>© {new Date().getFullYear()} Althéa Consulting. All rights reserved.</span>
        <span className="max-w-xl">Independent educational consultancy. Not affiliated with or endorsed by Campus France or any university. Admission and visa outcomes are decided by the relevant institutions and authorities.</span>
      </div>
    </footer>
  );
}
