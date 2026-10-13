"use client";
import {useEffect,useState} from "react";
import {MessageCircle} from "lucide-react";
const url="https://wa.me/33755749029?text="+encodeURIComponent("Bonjour Althéa, I'd like to ask about studying in France.");
export default function FloatingWhatsApp(){
 const [hidden,setHidden]=useState(false);
 useEffect(()=>{
  const sections=["#consultation","#footer"].map(id=>document.querySelector(id)).filter((x):x is Element=>!!x);
  const observer=new IntersectionObserver(entries=>{
   if(entries.some(e=>e.isIntersecting))setHidden(true);
   else setHidden(sections.some(x=>{const rect=x.getBoundingClientRect();return rect.top<window.innerHeight&&rect.bottom>0;}));
  },{rootMargin:"0px 0px 36px 0px",threshold:0});
  sections.forEach(x=>observer.observe(x));return ()=>observer.disconnect();
 },[]);
 if(hidden)return null;
 return <a href={url} target="_blank" rel="noopener noreferrer" aria-label="Message Althéa Consulting about studying in France on WhatsApp" title="Ask us about studying in France" className="fixed bottom-[max(14px,env(safe-area-inset-bottom))] right-[max(14px,env(safe-area-inset-right))] z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#E5C99D]/60 bg-[#173969] text-white shadow-[0_6px_25px_rgba(10,38,82,.3)] transition-transform hover:scale-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B79B6C] sm:bottom-6 sm:right-6"><MessageCircle size={21} strokeWidth={1.9}/></a>;
}
