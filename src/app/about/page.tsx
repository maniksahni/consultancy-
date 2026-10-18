import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import { Btn, Card, Chips, Facts, Grid, Kicker, Notice, Quote, Section, Split, TextLink } from "@/components/maison/ui";
import { paris } from "@/lib/paris";
import { Compass, HeartHandshake, ScrollText } from "lucide-react";

export const metadata: Metadata = pageMetadata("/about", {
  title: "About Althéa Consulting & Harshita Kohli",
  description: `${brand.name} (altheaconsulting.in): the Paris-based study-in-France advisory founded by ${brand.person}, a former international student guiding Indians.`,
});

export default function AboutPage() {
  const philosophy = paris("haussmann-facade");
  const adviser = paris("bnf-salle-ovale");
  return (
    <Page
      path="/about"
      eyebrow="L’ESPRIT DE LA MAISON"
      title="About Althéa"
      accent="& Harshita Kohli."
      intro="France-based, shaped by lived experience and focused on the practical realities of studying, settling and building a career here."
    >
      <Section tone="ivory" kicker="MAISON IDENTITY · PARIS, FRANCE" title="Althéa Consulting" accent="at a glance." intro={`${brand.name} is an independent advisory based in Paris, France, founded by ${brand.person}. We support international students and young professionals with study planning, settling into life in France, and career preparation. Not to be confused with Althéa, the management consulting firm in the Alan Allman Associates group: we are a separate, independent study-abroad advisory.`}>
        <Facts items={[
          { label: "Founder & adviser", value: brand.person, note: "Career Coach & France Expert" },
          { label: "Headquarters", value: brand.location, note: "Île-de-France, France" },
          { label: "Official portal", value: <a href={brand.canonicalUrl} target="_blank" rel="noreferrer">altheaconsulting.in</a>, note: "Verified official domain" },
          { label: "Direct contact", value: <a href={`mailto:${brand.email}`}>Write to Harshita</a>, note: brand.email },
        ]} />
        <div className="ms-row" style={{ marginTop: 28 }}>
          <Chips items={[{ label: "Study guidance", href: "/study-in-france" }, { label: "Settling support", href: "/settle-in-france" }, { label: "Career preparation", href: "/jobs" }]} />
        </div>
      </Section>

      <Section tone="paper">
        <Split image={philosophy.file} alt={philosophy.alt} caption="Paris">
          <Kicker>THE ALTHÉA PHILOSOPHY</Kicker>
          <h2>Big ambitions.<br /><em>Human conversations.</em></h2>
          <p>A new country is more than an application. It’s the subject you’ll study, the neighbourhood you’ll discover, and the future you’re hoping to build.</p>
          <p>{brand.shortName} brings these questions into one considered conversation. We help you explore academic options alongside the practical details, so your next step has a reason behind it.</p>
          <TextLink href="/services">Discover our support</TextLink>
        </Split>
      </Section>

      <Section tone="ink">
        <Split image={adviser.file} alt={adviser.alt} caption="Paris" reverse tall>
          <Kicker>MEET YOUR ADVISER</Kicker>
          <h2>{brand.person}<br /><em>A personal beginning.</em></h2>
          <p>I’m {brand.person}—France-based career coach and former international student, helping you navigate the realities of life and career in France. I know that arriving is the beginning of a new set of practical questions, not the end of the journey.</p>
          <p>We begin by listening. Then we agree the practical next steps, the scope of support and the fee before we start. For study applications, I offer independent guidance and partner-supported application assistance where appropriate; I do not represent a university.</p>
          <div className="ms-signature"><span>Harshita</span><small>{brand.role} · {brand.location}</small></div>
          <Btn href="/book-consultation">Let’s talk about your next chapter</Btn>
        </Split>
      </Section>

      <Section tone="ivory" kicker="THE WAY WE WORK" title="Care in the details." accent="Clarity in the decisions." align="split" intro="Three commitments shape every conversation, from the first call to your first month in France.">
        <Grid cols={3}>
          <Card index={1} icon={<HeartHandshake size={24} strokeWidth={1.4} />} title="Personal attention"><p>Your questions, constraints and ambitions shape the conversation.</p></Card>
          <Card index={2} icon={<Compass size={24} strokeWidth={1.4} />} title="Considered research"><p>Official information helps you compare options and understand the requirements.</p></Card>
          <Card index={3} icon={<ScrollText size={24} strokeWidth={1.4} />} title="Clear expectations"><p>Agree the support, deliverables and fees before deciding to go further.</p></Card>
        </Grid>
        <Notice kicker="INDEPENDENT BY DESIGN"><p>{brand.shortName} is an independent advisory service. Universities, Campus France and visa authorities manage their own applications and decisions. Admission, scholarships and visas are not guaranteed.</p></Notice>
      </Section>

      <Section tone="sand" narrow>
        <Quote by={brand.person} role={`Founder, ${brand.name}`}>I know that arriving is the beginning of a new set of practical questions, not the end of the journey.</Quote>
      </Section>
    </Page>
  );
}
