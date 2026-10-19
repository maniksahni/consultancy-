import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import { Card, Grid, Section } from "@/components/maison/ui";
export const metadata: Metadata = pageMetadata('/privacy', { title: "Privacy Policy", description: "How Althéa Consulting handles your details when you book a consultation or use this website: what is collected, why, how long it is kept, your rights." });
export default function Content() {
  return <Page path="/privacy" eyebrow="PRIVACY" title="Your information," accent="considered." intro="Privacy information for the consultation enquiry and this website." closing={false}>
    <Section tone="ivory" kicker="IN PLAIN LANGUAGE" title="What happens" accent="to your details." intro="Updated 14 October 2026.">
      <Grid cols={2}>
        <Card index={1} title="Your consultation details"><p>The form asks for your name and what you would like to explore. Phone number, academic background and preferred time are optional; you may also choose a study destination and optionally tell us how you found Althéa. This answer is included in the WhatsApp message you can review.</p></Card>
        <Card index={2} title="Opening WhatsApp"><p>Submitting opens WhatsApp with your details ready to send. You must press Send in WhatsApp to share the message with the adviser. Opening WhatsApp does not confirm an appointment. WhatsApp receives the prefilled details in its URL and applies its own privacy policy.</p></Card>
        <Card index={3} title="Website storage"><p>The website does not store or log consultation details, write them to a database, or add them to a marketing list. Form values stay in the current page until you navigate away. Your browser or WhatsApp may retain the opened URL.</p></Card>
        <Card index={4} title="Your choices"><p>You can browse without completing the form. Leave optional fields blank and review or edit your message in WhatsApp before pressing Send.</p></Card>
      </Grid>
    </Section>
  </Page>;
}
