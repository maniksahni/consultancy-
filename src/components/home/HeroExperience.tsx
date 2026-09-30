"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";

const scenes = [
  { country: "United Kingdom", city: "London", slug: "uk", image: "/images/destinations/uk.webp", coordinates: "51.5072° N / 0.1276° W" },
  { country: "United States", city: "A world of ambition", slug: "usa", image: "/images/destinations/usa.webp", coordinates: "37.0902° N / 95.7129° W" },
  { country: "Germany", city: "New perspectives", slug: "germany", image: "/images/destinations/germany.webp", coordinates: "51.1657° N / 10.4515° E" },
];

export default function HeroExperience() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % scenes.length), 8500);
    return () => window.clearInterval(timer);
  }, [paused]);
  const scene = scenes[active];
  return <section className="cinema-hero" aria-labelledby="hero-title">
    <div className="cinema-scenes" aria-hidden="true">{scenes.map((item,index) => <div key={item.slug} className={`cinema-scene ${index === active ? "is-active" : ""}`}><img src={item.image} alt="" width={1920} height={1080} fetchPriority={index === 0 ? "high" : "auto"} loading={index === 0 ? "eager" : "lazy"} /></div>)}</div>
    <div className="cinema-shade" aria-hidden="true" />
    <div className="cinema-frame" aria-hidden="true" />
    <div className="cinema-content"><div className="cinema-eyebrow"><span /> PRIVATE STUDY ABROAD MENTORSHIP</div><p className="cinema-prelude">Some journeys change everything.</p><h1 id="hero-title">The world awaits.<br /><em>Make it yours.</em></h1><p className="cinema-description">Extraordinary places. A deeply personal path.<br />One dedicated mentor to help you find where you belong.</p><div className="cinema-actions"><a className="cinema-primary" href="#booking">Begin your next chapter <ArrowUpRight size={18} /></a><a className="cinema-secondary" href="#destinations">Discover the destinations <ArrowUpRight size={17} /></a></div></div>
    <div className="cinema-bottom"><a href="#explore-path" className="cinema-scroll"><span><ArrowDown size={17} /></span><div>SCROLL TO DISCOVER<small>A world of possibilities below</small></div></a><div className="cinema-location"><span>IN FOCUS / {String(active+1).padStart(2,"0")}</span><Link href={`/destinations/${scene.slug}`}>{scene.country}<ArrowUpRight size={16} /></Link><small>{scene.coordinates}</small></div><div className="cinema-controls"><div className="cinema-dots" aria-label="Choose destination photo">{scenes.map((item,index) => <button key={item.slug} onClick={() => { setActive(index); setPaused(true); }} aria-label={`Show ${item.country}`} aria-pressed={active === index} className={active === index ? "active" : ""}><span>{String(index+1).padStart(2,"0")}</span><i /></button>)}</div><div className="cinema-control-buttons"><button onClick={() => {setActive((active+scenes.length-1)%scenes.length);setPaused(true);}} aria-label="Previous destination"><ArrowLeft size={16}/></button><button onClick={() => {setActive((active+1)%scenes.length);setPaused(true);}} aria-label="Next destination"><ArrowRight size={16}/></button><button onClick={() => setPaused(value => !value)} aria-label={paused ? "Resume destination slideshow" : "Pause destination slideshow"}>{paused ? "Play" : "Pause"}</button></div></div></div>
  </section>;
}
