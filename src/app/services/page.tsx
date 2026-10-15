import JsonLd from "@/components/seo/JsonLd";
import { siteUrl } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Compass, GraduationCap } from "lucide-react";
import Page from "@/components/althea/Page";

export const metadata: Metadata = pageMetadata("/services", {
  title: "France Arrival, Career & Study Support",
  description: `Explore practical settling, career and independent study guidance in France from ${brand.shortName}.`,
});

const journeys = [
  { title: "Settle in France", note: "ARRIVAL & EVERYDAY LIFE", text: "Practical orientation for arrival essentials, student life setup and navigating the everyday systems you encounter in France.", icon: Compass, href: "/settle-in-france", link: "Explore settling packages" },
  { title: "Career Support", note: "CAREER READINESS", text: "French-style CV and LinkedIn guidance, job-search planning, interview preparation and internship or alternance orientation.", icon: BriefcaseBusiness, href: "/career-support", link: "Explore career guidance" },
  { title: "Study in France", note: "INDEPENDENT ADMISSIONS", text: "Programme research, education pathway orientation, application-document feedback and pre-departure planning.", icon: GraduationCap, href: "/study-in-france", link: "Explore study guidance" },
];

export default function ServicesPage() {
  return <Page path="/services" eyebrow="PERSONAL FRANCE SUPPORT" title="Study, settling & career support in France" intro="Choose the support that fits where you are now: preparing to arrive, finding your footing or planning what comes next.">
    <JsonLd data={{ "@context": "https://schema.org", "@graph": journeys.map(journey => ({
      "@type": "Service", "@id": `${siteUrl}${journey.href}#service`,
      name: journey.title, description: journey.text, url: `${siteUrl}${journey.href}`,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: { "@type": "Country", name: "France" },
    })) }} />
    <div className="service-editorial-grid">{journeys.map(({ title, note, text, icon: Icon, href, link }, i) => <article className="service-editorial-card" key={title}><div className="service-editorial-top"><span>0{i+1} /</span><Icon size={26} strokeWidth={1.2}/></div><p className="eyebrow">{note}</p><h2>{title}</h2><p>{text}</p><Link className="text-link" href={href}>{link} <ArrowUpRight size={17}/></Link></article>)}</div>
    <section className="scope-conversation"><div><p className="eyebrow">CLEAR SCOPE & FEES</p><h2>Personal guidance.<br/><em>Agreed before we begin.</em></h2></div><div><p>We discuss your situation, confirm what the chosen support includes and agree the fee before work begins.</p><p className="muted">Althéa provides independent guidance and preparation. Official decisions belong to institutions and authorities; legal, immigration, banking and housing outcomes are outside our control.</p><Link className="button" href="/book-consultation">Book a Call <span>↗</span></Link></div></section>
  </Page>;
}
