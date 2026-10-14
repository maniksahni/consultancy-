"use client";
import {useEffect} from "react";
/** Content starts visible; only below-fold sections receive progressive reveals. */
export default function EditorialMotion() {
  useEffect(()=>{
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    if(reduced.matches || !('IntersectionObserver' in window)) return;
    const sections=Array.from(document.querySelectorAll<HTMLElement>('main > section'));
    const observer=new IntersectionObserver(entries=>{
      for(const entry of entries) if(entry.isIntersecting) {
        (entry.target as HTMLElement).dataset.reveal='visible';
        observer.unobserve(entry.target);
      }
    },{rootMargin:'0px 0px 80px 0px',threshold:0.01});
    for(const section of sections) if(section.getBoundingClientRect().top>window.innerHeight) {
      section.dataset.reveal='pending'; observer.observe(section);
    }
    const reset=()=>{if(reduced.matches) for(const s of sections) delete s.dataset.reveal;};
    reduced.addEventListener('change',reset);
    return ()=>{observer.disconnect();reduced.removeEventListener('change',reset);for(const s of sections)delete s.dataset.reveal;};
  },[]);
  return null;
}
