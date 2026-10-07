"use client";

import { useRef, useState, type TouchEvent } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

interface DestinationItem {
  country: string;
  slug: string;
  flag: string;
  image: string;
  workRight: string;
  tuition: string;
  stream: string;
  tagline: string;
}

const DESTINATIONS: DestinationItem[] = [
  {
    country: "United Kingdom",
    slug: "uk",
    flag: "🇬🇧",
    image: "/images/destinations/uk.webp",
    workRight: "2-Yr Graduate Route",
    tuition: "£16k – £32k / yr",
    stream: "Fast-Track 1-Year Masters",
    tagline: "Russell Group excellence with generous MOI English waivers and London financial gateway.",
  },
  {
    country: "United States",
    slug: "usa",
    flag: "🇺🇸",
    image: "/images/destinations/usa.webp",
    workRight: "3-Yr STEM OPT",
    tuition: "$28k – $55k / yr",
    stream: "Ivy League & Tech Giants",
    tagline: "Lucrative Silicon Valley and Wall St corporate recruitment backed by world-leading faculty.",
  },
  {
    country: "Canada",
    slug: "canada",
    flag: "🇨🇦",
    image: "/images/destinations/canada.webp",
    workRight: "Up to 3-Yr PGWP",
    tuition: "CAD 20k – 42k / yr",
    stream: "SDS Visa Stream",
    tagline: "World-class co-op universities in Ontario & BC with transparent post-study immigration pathways.",
  },
  {
    country: "Germany",
    slug: "germany",
    flag: "🇩🇪",
    image: "/images/destinations/germany.webp",
    workRight: "18-Mo Job Seeker",
    tuition: "€0 – €3k / yr (Public)",
    stream: "€0 Tuition Engineering",
    tagline: "Tuition-free public universities verified via APS, leading global automotive and tech industries.",
  },
  {
    country: "Australia",
    slug: "australia",
    flag: "🇦🇺",
    image: "/images/destinations/australia.webp",
    workRight: "2–4 Yr Subclass 485",
    tuition: "AUD 32k – 54k / yr",
    stream: "Go8 Research Hubs",
    tagline: "Transparent Genuine Student visa standard with high-wage part-time and post-study opportunities.",
  },
  {
    country: "Ireland",
    slug: "ireland",
    flag: "🇮🇪",
    image: "/images/destinations/ireland.webp",
    workRight: "2-Yr Third Level",
    tuition: "€14k – €28k / yr",
    stream: "Silicon Docks HQ",
    tagline: "European tech headquarters with 1-year degrees and rapid multinational corporate absorption.",
  },
];

export default function DestinationGallery() {
  const [selected, setSelected] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const reduceMotion = useReducedMotion();
  const destination = DESTINATIONS[selected];
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };
  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < 44 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;
    setSelected(index => (index + (deltaX < 0 ? 1 : DESTINATIONS.length - 1)) % DESTINATIONS.length);
  };

  return (
    <section id="destinations" className="destination-atlas redesign-destinations" aria-labelledby="atlas-title">
      <motion.div className="destination-atlas-heading" initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
        <p className="luxury-eyebrow">02 / THE DESTINATION COLLECTION</p>
        <h2 id="atlas-title">A world of possibilities.<br /><em>Find your place.</em></h2>
        <p>Six destinations. Countless ways forward. Choose a country and picture your next chapter.</p>
      </motion.div>
      <div className="destination-atlas-layout">
        <div className="destination-atlas-list" role="group" aria-label="Choose a study destination">
          <p className="destination-atlas-instruction">WHERE WILL YOUR STORY BEGIN?</p>
          {DESTINATIONS.map((item, index) => (
            <motion.button whileHover={reduceMotion ? undefined : { x: 3 }} whileTap={reduceMotion ? undefined : { scale: 0.98 }} transition={{ duration: 0.2 }} key={item.slug} type="button" aria-pressed={selected === index} aria-controls="destination-atlas-story" onClick={() => setSelected(index)} className={selected === index ? "is-selected" : ""}>
              <span className="destination-atlas-number">0{index + 1}</span>
              <span>{item.country}</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </motion.button>
          ))}
          <div className="destination-atlas-note"><span>YOUR AMBITION. YOUR DIRECTION.</span><p>One dedicated mentor to help you make sense of the possibilities.</p><a href="#booking">Talk through your options <ArrowRight size={15} /></a></div>
        </div>
        <div id="destination-atlas-story" className="destination-atlas-story" role="group" aria-roledescription="slide" aria-label={`${destination.country} destination`} aria-live="polite" aria-atomic="true" tabIndex={0} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchCancel={() => { touchStart.current = null; }} onKeyDown={event => { if (event.key === "ArrowRight") setSelected(index => (index + 1) % DESTINATIONS.length); if (event.key === "ArrowLeft") setSelected(index => (index + DESTINATIONS.length - 1) % DESTINATIONS.length); }}>
          <div className="redesign-destination-image"><AnimatePresence initial={false}>
            <motion.img key={destination.image} className="destination-atlas-photo" src={destination.image} alt={`${destination.country} cityscape`} loading="lazy" initial={reduceMotion ? false : { opacity: 0, scale: 1.075 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: reduceMotion ? 1 : 1.035 }} transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }} />
          </AnimatePresence></div>
          <div className="destination-atlas-shade" aria-hidden="true" />
          <div className="destination-atlas-top"><span>THE COLLECTION / 0{selected + 1}</span><span>{destination.flag} {destination.country}</span></div>
          <motion.div className="destination-atlas-copy" key={destination.slug} initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}>
            <p className="destination-atlas-kicker">{destination.stream}</p>
            <h3>{destination.country}</h3>
            <p>{destination.tagline}</p>
            <div className="destination-atlas-facts"><div><span>POST-STUDY WORK</span><strong>{destination.workRight}</strong></div><div><span>TUITION RANGE</span><strong>{destination.tuition}</strong></div></div>
            <Link href={`/destinations/${destination.slug}`}>Explore {destination.country}<ArrowUpRight size={20} /></Link>
            <span className="destination-atlas-swipe-hint">SWIPE TO EXPLORE ALL SIX DESTINATIONS</span>
          </motion.div>
        </div>
      </div>
      <div className="destination-atlas-foot"><span>EXPLORE WITH CURIOSITY. CHOOSE WITH CONFIDENCE.</span><span>01—06 / A WORLD WITHIN REACH</span></div>
    </section>
  );
}
