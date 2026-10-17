import JsonLd from "@/components/seo/JsonLd";
import { siteUrl } from "@/lib/seo";
import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import type { Metadata } from "next";
import { BriefcaseBusiness, Compass, GraduationCap } from "lucide-react";
import Page from "@/components/althea/Page";
import { Btn, Card, Grid, Kicker, Section, Split, Steps } from "@/components/maison/ui";
import { paris } from "@/lib/paris";

export const metadata: Metadata = pageMetadata("/services", {
  title: "Study in France Consultancy Services",
  description: `Study in France guidance, arrival and settling support, and career coaching in France from ${brand.person} in Paris, for Indian and international students.`,
});

const journeys = [
  { title: "Settle in France", note: "ARRIVAL & EVERYDAY LIFE", text: "Practical orientation for arrival essentials, student life setup and navigating the everyday systems you encounter in France.", icon: Compass, href: "/settle-in-france", link: "Explore settling packages" },
  { title: "Career Support", note: "CAREER READINESS", text: "French-style CV and LinkedIn guidance, job-search planning, interview preparation and internship or alternance orientation.", icon: BriefcaseBusiness, href: "/career-support", link: "Explore career guidance" },
  { title: "Study in France", note: "INDEPENDENT ADMISSIONS", text: "Programme research, education pathway orientation, application-document feedback and pre-departure planning.", icon: GraduationCap, href: "/study-in-france", link: "Explore study guidance" },
];

export default function ServicesPage() {
  const scope = paris("cafe-red-chairs");
  return <Page path="/services" eyebrow="PERSONAL FRANCE SUPPORT" title="Study, settle" accent="& succeed in France." intro="Choose the support that fits where you are now: preparing to arrive, finding your footing or planning what comes next.">
    <JsonLd data={{ "@context": "https://schema.org", "@graph": journeys.map(journey => ({
      "@type": "Service", "@id": `${siteUrl}${journey.href}#service`,
      name: journey.title, description: journey.text, url: `${siteUrl}${journey.href}`,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: { "@type": "Country", name: "France" },
    })) }} />

    <Section tone="ivory" kicker="THREE WAYS IN" title="Wherever you are" accent="in the journey." intro="Each path starts with a conversation about your goals, then turns into practical, personal next steps.">
      <Grid cols={3}>{journeys.map(({ title, note, text, icon: Icon, href, link }, i) => <Card key={title} index={i + 1} icon={<Icon size={24} strokeWidth={1.4} />} kicker={note} title={title} href={href} cta={link} feature={i === 0}><p>{text}</p></Card>)}</Grid>
    </Section>

    <Section tone="ink" kicker="HOW IT WORKS" title="From first call" accent="to clear next steps." align="split">
      <Steps items={[
        { title: "A first conversation", body: <p>We discuss your situation, your goals and the questions you want answered.</p> },
        { title: "Scope and fee, agreed", body: <p>We confirm what the chosen support includes and agree the fee before work begins.</p> },
        { title: "Guidance you can act on", body: <p>Checklists, feedback, preparation and referrals to the right official or specialist service where appropriate.</p> },
      ]} />
    </Section>

    <Section tone="paper">
      <Split image={scope.file} alt={scope.alt} caption="Paris">
        <Kicker>CLEAR SCOPE & FEES</Kicker>
        <h2>Personal guidance.<br /><em>Agreed before we begin.</em></h2>
        <p>We discuss your situation, confirm what the chosen support includes and agree the fee before work begins.</p>
        <p>Althéa provides independent guidance and preparation. Official decisions belong to institutions and authorities; legal, immigration, banking and housing outcomes are outside our control.</p>
        <Btn href="/book-consultation">Book a call</Btn>
      </Split>
    </Section>
  </Page>;
}
