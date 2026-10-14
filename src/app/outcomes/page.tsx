import type { Metadata } from "next";
import Page from "@/components/althea/Page";

export const metadata: Metadata = {
  alternates: { canonical: "/outcomes" },
  title: "A first conversation.",
  description:
    "Understand what a consultation can cover before deciding on further support.",
};
export default function Content() {
  return (
    <Page
      title={"A first conversation."}
      intro={
        "Understand what a consultation can cover before deciding on further support."
      }
    >
      <div className="prose">
        <h2>Your starting point</h2>
        <p>
          Discuss your academic background, interests, budget and timing. The
          aim is to organise your questions and decide what needs further
          research.
        </p>
        <h2>A hypothetical journey</h2>
        <p>
          A student interested in a taught master’s might first compare academic
          requirements, then review teaching language and living costs, and
          finally confirm the relevant application route. This is an
          illustration, not a student testimonial or reported outcome.
        </p>
        <h2>Honest expectations</h2>
        <p>
          We do not publish success rates or student stories without documentary
          evidence and permission. No offer, scholarship or visa decision is
          guaranteed.
        </p>
      </div>
    </Page>
  );
}
