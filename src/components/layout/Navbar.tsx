"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import BrandWordmark from "./BrandWordmark";

const links=[
  {label:"Destinations",href:"/#destinations",no:"01"},
  {label:"Mentorship",href:"/mentorship-model",no:"02"},
  {label:"Roadmap",href:"/admissions-process",no:"03"},
  {label:"Outcomes",href:"/outcomes",no:"04"},
  {label:"Funding",href:"/scholarships",no:"05"},
];

export default function Navbar(){
  const [open,setOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);
  const pathname=usePathname();
  const reduce=useReducedMotion();

  useEffect(()=>{
    const onScroll=()=>setScrolled(window.scrollY>18);
    onScroll();
    window.addEventListener("scroll",onScroll,{passive:true});
    return()=>window.removeEventListener("scroll",onScroll);
  },[]);

  useEffect(()=>{
    document.body.style.overflow=open?"hidden":"";
    return()=>{document.body.style.overflow=""};
  },[open]);

  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{if(e.key==="Escape")setOpen(false)};
    window.addEventListener("keydown",onKey);
    return()=>window.removeEventListener("keydown",onKey);
  },[]);

  return <>
    <header className={`site-navigation h26-nav ${scrolled?"is-scrolled":""}`}>
      <div className="h26-nav-inner">
        <Link href="/" className="h26-nav-brand" aria-label="Study with Harshita home"><BrandWordmark/></Link>
        <nav className="h26-nav-links" aria-label="Primary navigation">
          {links.map(item=><Link key={item.label} href={item.href} className={pathname===item.href?"is-active":""}><sup>{item.no}</sup><span>{item.label}</span></Link>)}
        </nav>
        <div className="h26-nav-actions">
          <Link href="/#booking" className="h26-nav-cta">Strategy call <ArrowRight size={14}/></Link>
          <button onClick={()=>setOpen(true)} className="h26-menu-button" aria-label="Open menu" aria-expanded={open}><Menu size={19}/><span>Menu</span></button>
        </div>
      </div>
    </header>

    <AnimatePresence>
      {open&&<motion.div className="h26-menu" initial={reduce?false:{clipPath:"inset(0 0 100% 0)"}} animate={{clipPath:"inset(0 0 0% 0)"}} exit={{clipPath:"inset(0 0 100% 0)"}} transition={{duration:reduce?0:.7,ease:[.22,1,.36,1]}}>
        <div className="h26-menu-head"><Link href="/" onClick={()=>setOpen(false)}><BrandWordmark/></Link><button onClick={()=>setOpen(false)} aria-label="Close menu"><X size={20}/><span>Close</span></button></div>
        <div className="h26-menu-body">
          <p>EXPLORE THE ADVISORY</p>
          <nav>{links.map((item,index)=><motion.div key={item.label} initial={reduce?false:{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.55,delay:index*.04}}><Link href={item.href} onClick={()=>setOpen(false)}><small>{item.no}</small><span>{item.label}</span><ArrowRight size={18}/></Link></motion.div>)}
            <Link href="/faq" onClick={()=>setOpen(false)}><small>06</small><span>Questions</span><ArrowRight size={18}/></Link>
          </nav>
        </div>
        <div className="h26-menu-foot">
          <div><span>DIRECT ADVISORY</span><a href="https://wa.me/33755749029" target="_blank" rel="noreferrer"><MessageCircle size={14}/> WhatsApp +33 7 55 74 90 29</a></div>
          <Link href="/#booking" onClick={()=>setOpen(false)}>Begin a conversation <ArrowRight size={16}/></Link>
        </div>
      </motion.div>}
    </AnimatePresence>
  </>;
}
