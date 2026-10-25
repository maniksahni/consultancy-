import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import { Btn, Card, Checklist, Grid, Notice, Section } from "@/components/maison/ui";

export const metadata: Metadata = pageMetadata('/outcomes', {
  title: "What a Study Abroad Consultation Covers",
  description:
    "What a first study in France consultation covers: academic background, budget, course options and a prioritised research plan, with no admission guarantees.",
});
export default function Content() {
  return (
    <Page path="/outcomes" eyebrow="WHAT A CONSULTATION COVERS" title="A first" accent="conversation." intro="Understand what a consultation can cover before deciding on further support.">
      <Section tone="ivory" kicker="WHAT TO EXPECT" title="Clarity first." accent="Commitment later.">
        <Grid cols={2}>
          <Card index={1} title="Your starting point"><p>Discuss your academic background, interests, budget and timing. The aim is to organise your questions and decide what needs further research.</p><p>Bring a current CV or study summary if you have one, plus links to the programmes or job paths you are considering. If you are still exploring, that is fine: a question list is enough to begin.</p></Card>
          <Card index={2} title="A hypothetical journey"><p>A student interested in a taught master’s might first compare academic requirements, then review teaching language and living costs, and finally confirm the relevant application route. This is an illustration, not a student testimonial or reported outcome.</p><p>A useful result from that conversation can be a short, prioritised research plan: which requirements to verify first, which official pages to use, and what information is still missing. Any further work is optional and discussed separately.</p></Card>
        </Grid>
        <Notice kicker="HONEST EXPECTATIONS" tone="ink"><p>We do not publish success rates or student stories without documentary evidence and permission. No offer, scholarship or visa decision is guaranteed.</p></Notice>
      </Section>
      <Section tone="paper" kicker="WHAT YOU CAN PREPARE NOW" title="Bring these" accent="to your call." action={<Btn href="/book-consultation">Request a consultation</Btn>} intro="Book a free 15-minute Google Meet call online; your Meet link arrives by email straight away. The call creates no commitment; scope and any fee are agreed before further work begins.">
        <Checklist columns={2} items={["Your preferred study level, subject or career direction.", "Two or three questions that would unblock your next decision.", "Your target timing, budget range and any practical constraints.", "Links to official programme, employer or authority pages you have already checked."]} />
      </Section>
    </Page>
  );
}
