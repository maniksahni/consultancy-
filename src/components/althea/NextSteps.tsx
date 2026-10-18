import Link from "next/link";
import { Card, Grid, Section } from "@/components/maison/ui";
import { nextStepsFor } from "@/lib/nextSteps";

/** "Where to go next": the pages that answer the reader's likely next question, on every inner page. */
export default function NextSteps({ path }: { path: string }) {
  const steps = nextStepsFor(path);
  if (!steps.length) return null;
  return <Section tone="paper" className="ms-nextsteps" kicker="WHERE TO GO NEXT" title="Keep going:" accent="the pages that help next." intro={<>Each card says what you will find there. Looking for something else? <Link href="/site-map">See every page on the site</Link>.</>}>
    <Grid cols={3}>{steps.map((s) => <Card key={s.href} kicker={s.kind} title={s.title} href={s.href} cta="Go to this page"><p>{s.see}</p></Card>)}</Grid>
  </Section>;
}
