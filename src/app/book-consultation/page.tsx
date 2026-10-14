import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import Booking from "@/components/althea/Booking";
export const metadata: Metadata = {
  alternates: { canonical: "/book-consultation" },
  title: "Let’s begin with your story.",
  description:
    "Request a conversation. Preferred times are requests, and an appointment is confirmed separately.",
};
export default function Content() {
  return (
    <Page
      title={"Let’s begin with your story."}
      intro={
        "Request a conversation. Preferred times are requests, and an appointment is confirmed separately."
      }
    >
      <div className="booking-layout">
        <div className="prose">
          <h2>Bring your questions.</h2>
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
