import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import Page from "@/components/althea/Page";
import { Btn, Card, Checklist, Grid, Kicker, Notice, Section, Split, TextLink } from "@/components/maison/ui";
import { paris } from "@/lib/paris";

export const metadata = pageMetadata("/settle-in-france", {
  title: "Settle in France: Student Support",
  description: `Practical arrival, student life and career orientation for international students and young professionals in France, with ${brand.shortName}.`,
});

const packages = [
  { name: "France Arrival Essentials", label: "FIRST STEPS", includes: ["SIM and connectivity options", "Bank-account preparation and what to ask", "Transport passes and getting around", "Everyday systems and a personal first-steps checklist"] },
  { name: "Student Life Setup", label: "SETTLING IN", includes: ["Accommodation-search guidance and useful sources", "CAF orientation and official information", "Insurance and paperwork checklist", "Local-life orientation for your city"] },
  { name: "Career Launch in France", label: "NEXT CHAPTER", includes: ["French-style CV and LinkedIn feedback", "Job-search strategy and application planning", "Interview preparation", "Internship and alternance orientation"] },
  { name: "Business French for Work", label: "FRENCH IN PRACTICE", includes: ["University and workplace communication", "Practical phrases for administration", "Professional email and meeting practice", "Learning plan around your real situations"] },
  { name: "Personalised France Support Call", label: "ONE-TO-ONE", includes: ["A focused conversation about one specific challenge", "Practical options and next steps", "Follow-up checklist after the call", "Referrals to official or specialist services where appropriate"] },
];

export default function SettleInFrancePage() {
  const metro = paris("metro-platform");
  return <Page path="/settle-in-france" eyebrow="ARRIVAL · STUDENT LIFE · CAREER" title="Settle in France," accent="with a local guide." intro="You’ve arrived. Get practical, personal support for the everyday systems, student life and career questions that come next.">
    <Section tone="ivory" kicker="SUPPORT THAT MEETS YOU HERE" title="Less guesswork." accent="More confidence in your next step." intro="Choose a focused session or explore a broader support package. We’ll agree what’s included and the fee before any work begins. Every service is guidance and preparation tailored to your situation.">
      <Grid cols={3} className="ms-package-grid">{packages.map((item, i) => <Card key={item.name} index={i + 1} kicker={item.label} title={item.name} href={`/book-consultation?service=${encodeURIComponent(item.name)}#consultation-form`} cta="Ask about this package" feature={i === 0}>
        <Checklist items={item.includes} />
        <p className="ms-card-note">Pricing · fee confirmed before booking</p>
      </Card>)}</Grid>
    </Section>
    <Section tone="paper">
      <Split image={metro.file} alt={metro.alt} caption="Paris" reverse>
        <Kicker>CLEAR SCOPE, REALISTIC EXPECTATIONS</Kicker>
        <h2>Guidance you can use.<br /><em>Decisions stay yours.</em></h2>
        <p>Althéa provides orientation, preparation, checklists and referrals where appropriate. We do not provide legal or immigration advice, make decisions for banks or housing providers, guarantee accommodation, or guarantee administrative outcomes. For regulated or official decisions, we’ll point you to the relevant organisation or qualified professional.</p>
        <Btn href="/book-consultation">Book a call</Btn>
      </Split>
    </Section>
    <Section tone="ivory">
      <Notice kicker="YOUR SUPPORT DOESN’T END AT ARRIVAL" tone="ink"><p className="ms-notice-title">Planning to study here too? <em>We can help you prepare.</em></p><TextLink href="/study-in-france">Explore independent Study in France guidance</TextLink></Notice>
    </Section>
  </Page>;
}
