"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MagneticLink from "@/components/experience/MagneticLink";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";

const scenes = [
  { country: "United Kingdom", city: "London", slug: "uk", image: "/images/destinations/uk.webp", coordinates: "51.5072° N / 0.1276° W" },
  { country: "United States", city: "A world of ambition", slug: "usa", image: "/images/destinations/usa.webp", coordinates: "37.0902° N / 95.7129° W" },
  { country: "Germany", city: "New perspectives", slug: "germany", image: "/images/destinations/germany.webp", coordinates: "51.1657° N / 10.4515° E" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroExperience() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const interactionPause = useRef({ pointer: false, focus: false });
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden && !interactionPause.current.pointer && !interactionPause.current.focus) {
        setActive(index => (index + 1) % scenes.length);
      }
    }, 8500);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);
  const scene = scenes[active];
  const reveal = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  };
  const stagger = { hidden: {}, visible: { transition: { delayChildren: 0.08, staggerChildren: 0.04 } } };

  return <section
    className="cinema-hero redesign-hero"
    aria-labelledby="hero-title"
    onPointerEnter={() => { interactionPause.current.pointer = true; }}
    onPointerLeave={() => { interactionPause.current.pointer = false; }}
    onFocusCapture={() => { interactionPause.current.focus = true; }}
    onBlurCapture={event => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) interactionPause.current.focus = false;
    }}
  >
    <div className="cinema-scenes" data-hero-parallax aria-hidden="true">{scenes.map((item, index) => <div key={item.slug} className={`cinema-scene ${index === active ? "is-active" : ""}`}><img src={item.image} alt="" width={1920} height={1080} fetchPriority={index === 0 ? "high" : "auto"} loading={index === 0 ? "eager" : "lazy"} /></div>)}</div>
    <div className="cinema-shade" aria-hidden="true" />
    <div className="cinema-frame" aria-hidden="true" />
    <motion.div className="cinema-content" variants={stagger} initial={reduceMotion ? false : "hidden"} animate="visible">
      <motion.div className="cinema-eyebrow" variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.6, ease }}><span /> PRIVATE STUDY ABROAD MENTORSHIP</motion.div>
      <motion.p className="cinema-prelude" variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.6, ease }}>Some journeys change everything.</motion.p>
      <motion.h1 id="hero-title" variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.6, ease }}>The world awaits.<br /><em>Make it yours.</em></motion.h1>
      <motion.p className="cinema-description" variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.6, ease }}>Extraordinary places. A deeply personal path.<br />One dedicated mentor to help you find where you belong.</motion.p>
      <motion.div className="cinema-actions" variants={reveal} transition={{ duration: reduceMotion ? 0 : 0.6, ease }}>
        <MagneticLink className="cinema-primary" href="#booking" whileHover={reduceMotion ? undefined : { scale: 1.02 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }} transition={{ duration: 0.3, ease }}>Begin your next chapter <ArrowUpRight size={18} /></MagneticLink>
        <MagneticLink className="cinema-secondary" href="#destinations" whileHover={reduceMotion ? undefined : { scale: 1.02 }} transition={{ duration: 0.3, ease }}>Discover the destinations <ArrowUpRight size={17} /></MagneticLink>
      </motion.div>
    </motion.div>
    <motion.div className="cinema-bottom" initial={reduceMotion ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : 0.2, ease }}>
      <a href="#destinations" className="cinema-scroll"><span><ArrowDown size={17} /></span><div>SCROLL TO DISCOVER<small>A world of possibilities below</small></div></a>
      <div className="cinema-location"><span>IN FOCUS / {String(active + 1).padStart(2, "0")}</span><Link href={`/destinations/${scene.slug}`}>{scene.country}<ArrowUpRight size={16} /></Link><small>{scene.coordinates}</small></div>
      <div className="cinema-controls"><div className="cinema-dots" aria-label="Choose destination photo">{scenes.map((item, index) => <button key={item.slug} onClick={() => { setActive(index); setPaused(true); }} aria-label={`Show ${item.country}`} aria-pressed={active === index} className={index === active ? "active" : ""}><span>{String(index + 1).padStart(2, "0")}</span><i /></button>)}</div><div className="cinema-control-buttons"><button onClick={() => { setActive((active + scenes.length - 1) % scenes.length); setPaused(true); }} aria-label="Previous destination"><ArrowLeft size={16} /></button><button onClick={() => { setActive((active + 1) % scenes.length); setPaused(true); }} aria-label="Next destination"><ArrowRight size={16} /></button><button onClick={() => setPaused(value => !value)} aria-label={paused ? "Resume destination slideshow" : "Pause destination slideshow"}>{paused ? "Play" : "Pause"}</button></div></div>
    </motion.div>
  </section>;
}
