import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import { Card, Grid, Section } from "@/components/maison/ui";

export const metadata: Metadata = pageMetadata('/terms', {
  title: "Terms of Use",
  description: "Terms of use for the Althéa Consulting website and consultation enquiries: what the guidance covers, its limits and how bookings are confirmed.",
});
export default function Content() {
  return (
    <Page path="/terms" eyebrow="TERMS" title="Clear" accent="expectations." intro="General website information and consultation enquiry terms." closing={false}>
      <Section tone="ivory" kicker="THE ESSENTIALS" title="How this website" accent="and our enquiries work.">
        <Grid cols={2}>
          <Card index={1} title="Independent advisory"><p>This website provides general education information and enquiry facilities. It is not an official application service or legal advice. University admissions, scholarships and visas are decided by the responsible organisations.</p></Card>
          <Card index={2} title="Information changes"><p>Check the linked official sources before acting. Programme details, fees, requirements and deadlines may change. Dates shown in the finder describe the scope of the recorded review, not a guarantee of current availability.</p></Card>
          <Card index={3} title="Consultations and services"><p>An enquiry is a request to discuss your plans. Availability, service scope, fees, cancellation terms and deliverables must be agreed separately before a paid service begins. There are no guaranteed outcomes.</p></Card>
          <Card index={4} title="Owner approval"><p>The legal service identity, jurisdiction and full commercial terms require owner confirmation before public release or accepting payments. This website does not accept payments.</p></Card>
        </Grid>
      </Section>
    </Page>
  );
}
