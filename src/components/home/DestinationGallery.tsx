"use client";

import { useState } from "react";
import Link from "next/link";
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
  const destination = DESTINATIONS[selected];

  return (
    <section id="destinations" className="destination-atlas" aria-labelledby="atlas-title">
      <div className="destination-atlas-heading">
        <p className="luxury-eyebrow">02 / THE DESTINATION COLLECTION</p>
        <h2 id="atlas-title">A world of possibilities.<br /><em>Find your place.</em></h2>
        <p>Six destinations. Countless ways forward. Choose a country and picture your next chapter.</p>
      </div>
      <div className="destination-atlas-layout">
        <div className="destination-atlas-list" role="group" aria-label="Choose a study destination">
          <p className="destination-atlas-instruction">WHERE WILL YOUR STORY BEGIN?</p>
          {DESTINATIONS.map((item, index) => (
            <button key={item.slug} type="button" aria-pressed={selected === index} aria-controls="destination-atlas-story" onClick={() => setSelected(index)} className={selected === index ? "is-selected" : ""}>
              <span className="destination-atlas-number">0{index + 1}</span>
              <span>{item.country}</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          ))}
          <div className="destination-atlas-note"><span>YOUR AMBITION. YOUR DIRECTION.</span><p>One dedicated mentor to help you make sense of the possibilities.</p><a href="#booking">Talk through your options <ArrowRight size={15} /></a></div>
        </div>
        <div id="destination-atlas-story" className="destination-atlas-story" aria-live="polite" aria-atomic="true">
          <img key={destination.image} className="destination-atlas-photo" src={destination.image} alt={`${destination.country} cityscape`} loading="lazy" />
          <div className="destination-atlas-shade" aria-hidden="true" />
          <div className="destination-atlas-top"><span>THE COLLECTION / 0{selected + 1}</span><span>{destination.flag} {destination.country}</span></div>
          <div className="destination-atlas-copy" key={destination.slug}>
            <p className="destination-atlas-kicker">{destination.stream}</p>
            <h3>{destination.country}</h3>
            <p>{destination.tagline}</p>
            <div className="destination-atlas-facts"><div><span>POST-STUDY WORK</span><strong>{destination.workRight}</strong></div><div><span>TUITION RANGE</span><strong>{destination.tuition}</strong></div></div>
            <Link href={`/destinations/${destination.slug}`}>Explore {destination.country}<ArrowUpRight size={20} /></Link>
          </div>
        </div>
      </div>
      <div className="destination-atlas-foot"><span>EXPLORE WITH CURIOSITY. CHOOSE WITH CONFIDENCE.</span><span>01—06 / A WORLD WITHIN REACH</span></div>
    </section>
  );
}
