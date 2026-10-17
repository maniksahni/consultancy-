import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import Booking from "@/components/althea/Booking";
import { Checklist, Kicker, Section } from "@/components/maison/ui";
export const metadata: Metadata = pageMetadata('/book-consultation', {
  title: 'Book a Study in France Consultation',
  description:
    "Book a study abroad consultation with Harshita Kohli in Paris: France universities, Campus France, visa, budget, housing and career questions, one to one.",
});
export default function Content() {
  return (
    <Page path="/book-consultation" eyebrow="A PERSONAL CONVERSATION" title="Book a consultation" accent="with Althéa." intro="Request a conversation. Preferred times are requests, and an appointment is confirmed separately." closing={false}>
      <Section tone="ivory">
        <div className="ms-booking">
          <div className="ms-booking-copy">
            <Kicker>BRING YOUR QUESTIONS</Kicker>
            <h2 className="ms-title">Let’s find your <em>first step.</em></h2>
            <p className="ms-lead">Tell us where you are in your studies, what you want to explore and the questions on your mind.</p>
            <div className="ms-booking-person"><span className="ms-monogram" aria-hidden="true">HK</span><div><strong>{brand.person}</strong><small>{brand.role} · {brand.location}</small></div></div>
            <Checklist items={["Your academic direction and priorities", "Possible programmes and a practical budget", "Your application timeline and next steps"]} />
            <p className="ms-muted">No fee or service commitment is created by this enquiry. The adviser will confirm availability, scope and any fees separately.</p>
          </div>
          <Booking />
        </div>
      </Section>
    </Page>
  );
}
