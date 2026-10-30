import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import "../booking.css";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import Booking from "@/components/althea/Booking";
import { Checklist, Kicker, Section } from "@/components/maison/ui";
import { quickAnswers } from "@/data/quickAnswers";
export const metadata: Metadata = pageMetadata('/book-consultation', {
  title: 'Book a Study in France Consultation',
  description:
    "Book a free 15-minute Google Meet call with Harshita Kohli in Paris. Pick a time online and get the Meet link by email instantly. Study, visa and career help.",
});
export default function Content() {
  return (
    <Page path="/book-consultation" faqs={quickAnswers["/book-consultation"]} eyebrow="A FREE 15-MINUTE CALL" title="Book a consultation" accent="with Althéa." intro="Book a free 15-minute Google Meet call with Harshita Kohli. Pick a time that suits you; the Meet link reaches your inbox straight away." closing={false}>
      <Section tone="ivory">
        <div className="ms-booking">
          <div className="ms-booking-copy">
            <Kicker>BRING YOUR QUESTIONS</Kicker>
            <h2 className="ms-title">Let’s find your <em>first step.</em></h2>
            <p className="ms-lead">Tell us where you are in your studies, what you want to explore and the questions on your mind.</p>
            <div className="ms-booking-person"><span className="ms-monogram" aria-hidden="true">HK</span><div><strong>{brand.person}</strong><small>{brand.role} · {brand.location}</small></div></div>
            <Checklist items={["Your academic direction and priorities", "Possible programmes and a practical budget", "Your application timeline and next steps"]} />
            <p className="ms-muted">The 15-minute call is free and creates no commitment. If you want further support, its scope and any fees are agreed with you separately, before anything starts.</p>
          </div>
          <Booking />
        </div>
      </Section>
    </Page>
  );
}
