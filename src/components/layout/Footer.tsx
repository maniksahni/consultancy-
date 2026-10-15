"use client";

import { brand } from "@/config/brand";
import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { cities } from "@/data/france";
import { destinations, destinationHref } from "@/data/destinations";
import { useEffect } from "react";

const footerGroups = [
  {
    title: "EXPLORE",
    links: [
      ["Directory · all destinations", "/universities?country=france&view=courses#course-finder"],
      ["Universities & courses", "/universities"],
      ["Reviewed programmes & fees", "/programmes"],
      ["Study in France", "/study-in-france"],
      ["Settle in France", "/settle-in-france"],
      ["Career support", "/career-support"],
      ["All services", "/services"],
      ["About Harshita", "/about"],
    ],
  },
  {
    title: "DESTINATIONS",
    links: destinations.map((destination) => [destination.name, destinationHref(destination.slug)]),
  },
  {
    title: "STUDY & ARRIVAL",
    links: [
      ["Admissions process", "/admissions-process"],
      ["Scholarships", "/scholarships"],
      ["Study costs in France", "/france/costs"],
      ["Student life in France", "/france/living"],
      ["Student visa guide", "/france/visas"],
      ["Campus France guide", "/campus-france-guide"],
      ["France universities & institutions", "/france/institutions"],
      ["First 30 days checklist", "/first-30-days-france"],
    ],
  },
  {
    title: "CITY GUIDES",
    links: cities.map((city) => [`Study in ${city.name}`, `/cities/${city.slug}`]),
  },
  {
    title: "MORE TO EXPLORE",
    links: [
      ["Resources & guides", "/knowledge"],
      ["France study library", "/france/resources"],
      ["France study topics", "/france"],
      ["Insights & articles", "/insights"],
      ["FAQs", "/faq"],
      ["Mentorship model", "/mentorship-model"],
      ["Student outcomes", "/outcomes"],
      ["Student reviews", "/reviews"],
      ["Book a call", "/book-consultation"],
    ],
  },
];

export default function Footer() {
  useEffect(() => {
    const groups = Array.from(document.querySelectorAll<HTMLDetailsElement>(".footer-group-details"));
    const media = window.matchMedia("(max-width: 760px)");
    const syncGroups = () => groups.forEach((group) => { group.open = !media.matches; });
    syncGroups();
    media.addEventListener("change", syncGroups);
    return () => media.removeEventListener("change", syncGroups);
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-top footer-sitemap">
        <div className="footer-brand-block">
          <Link className="footer-brand" href="/">
            <img className="footer-brand-logo" src={brand.assets.logoLight} alt={brand.name} width={420} height={96} />
          </Link>
          <p>
            {brand.tagline}
          </p>
          <div className="brand-contact">
            <div className="brand-contact-person">
              <strong>{brand.person}</strong>
              <span>{brand.role} <i aria-hidden="true">·</i> {brand.location}</span>
            </div>
            <div className="brand-contact-actions">
              {brand.email && (
                <a href={`mailto:${brand.email}`}>
                  <Mail size={17} aria-hidden="true" />
                  <span><small>EMAIL</small>{brand.email}</span>
                </a>
              )}
              {brand.whatsappNumber && (
                <>
                  <a href={`tel:+${brand.whatsappNumber}`}>
                    <Phone size={17} aria-hidden="true" />
                    <span><small>CALL</small>+33 7 55 74 90 29</span>
                  </a>
                  <Link href="/book-consultation">
                    <MessageCircle size={17} aria-hidden="true" />
                    <span><small>MESSAGE</small>Start a conversation</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        {footerGroups.map((group) => <details className="footer-group footer-group-details" key={group.title}>
          <summary className="eyebrow footer-group-title">{group.title}</summary>
          <nav className="footer-group-links" aria-label={group.title.toLowerCase()}>
            {group.links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
          </nav>
        </details>)}
      </div>
      <div className="footer-masthead" aria-hidden="true">
        <span>{brand.shortName}.</span>
        <em>
          A wider world.
          <br />A personal way forward.
        </em>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {brand.name} · Independent education advisory · No affiliation with Campus France or universities
        </span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/acknowledgements#photography">Sources & photography</Link>
        </div>
      </div>
    </footer>
  );
}
