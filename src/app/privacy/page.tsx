import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import { brand } from "@/config/brand";
import { Card, Grid, Section } from "@/components/maison/ui";
export const metadata: Metadata = pageMetadata('/privacy', { title: "Privacy Policy", description: "How Althéa Consulting handles your details when you book a consultation or use this website: what is collected, why, how long it is kept, your rights." });
export default function Content() {
  return <Page path="/privacy" eyebrow="PRIVACY" title="Your information," accent="considered." intro="How your details are used when you book a free call, and what the website keeps." closing={false}>
    <Section tone="ivory" kicker="IN PLAIN LANGUAGE" title="What happens" accent="to your details." intro="Updated 26 October 2026.">
      <Grid cols={2}>
        <Card index={1} title="What the booking form asks"><p>Your name, email, WhatsApp number, study destination, where you are right now and the help you need (CV review, career guidance or interview preparation). Telling us how you found Althéa is optional. We use these details only to arrange and prepare your call.</p></Card>
        <Card index={2} title="Where your booking is kept"><p>Your booking is saved in Harshita Kohli’s Google account: an event in her Google Calendar with your Google Meet link, and a private booking list in Google Sheets that only Althéa can open. Google sends you the calendar invitation.</p></Card>
        <Card index={3} title="Emails we send"><p>A confirmation with your Meet link, reminders a day and an hour before the call, and one short feedback request afterwards. They come from harshita@altheaconsulting.in. We never add you to a marketing list or share your details with anyone else.</p></Card>
        <Card index={4} title="Your choices"><p>You can browse the website without booking. To change or cancel a call, or to have your details corrected or deleted, reply to any of our emails or write to {brand.email}.</p></Card>
      </Grid>
    </Section>
  </Page>;
}
