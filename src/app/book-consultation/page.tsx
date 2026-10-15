import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import Booking from "@/components/althea/Booking";
export const metadata: Metadata = pageMetadata('/book-consultation', {
  title: 'Book a Study Abroad Consultation',
  description:
    "Request a conversation. Preferred times are requests, and an appointment is confirmed separately.",
});
export default function Content() {
  return (
    <Page path="/book-consultation"
      title={"Book a consultation with Althéa"}
      intro={
        "Request a conversation. Preferred times are requests, and an appointment is confirmed separately."
      }
    >
      <div className="booking-layout">
        <div className="prose">
          <h2>Bring your questions.</h2><p>{brand.person} — {brand.role}<br/>{brand.location}</p>
          <p>
            Tell us where you are in your studies, what you want to explore and
            the questions on your mind.
          </p>
          <ul>
            <li>Your academic direction and priorities</li>
            <li>Possible programmes and a practical budget</li>
            <li>Your application timeline and next steps</li>
          </ul>
          <p>
            No fee or service commitment is created by this enquiry. The adviser
            will confirm availability, scope and any fees separately.
          </p>
        </div>
        <Booking />
      </div>
    </Page>
  );
}
