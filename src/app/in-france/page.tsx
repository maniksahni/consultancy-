import { pageMetadata } from "@/lib/seo";
import Page from "@/components/althea/Page";
import { Btn, Card, Checklist, Grid, Kicker, Notice, Section, Split, Steps, TextLink } from "@/components/maison/ui";
import { paris } from "@/lib/paris";
import { quickAnswers } from "@/data/quickAnswers";

export const metadata = pageMetadata("/in-france", {
  title: "Already in France? Internships & Jobs",
  description: "Already studying or working in France? Get help with internships, alternance, your first job, CAF, housing, your titre de séjour and the road to PR.",
});

const help = [
  { kicker: "INTERNSHIPS · ALTERNANCE", title: "Land the stage that counts", href: "/france/part-time-work", cta: "Internship rules and pay",
    items: ["Target internships that match your degree and career", "Convention de stage, pay from €4.50 an hour over two months", "Alternance: a salary while you study, checked against your status"] },
  { kicker: "YOUR FIRST JOB", title: "From CV to signed contract", href: "/career-support", cta: "How career support works",
    items: ["One-page French-style CV and LinkedIn", "Cover letters, interviews and salary expectations", "Where Indian graduates actually get hired"] },
  { kicker: "AFTER YOUR DEGREE", title: "Stay and work legally", href: "/france/after-graduation", cta: "Post-study work options",
    items: ["12-month job-search permit, renewable once for Indians", "Switch to a work permit at €2,800.53 gross a month", "Talent Passport and the 5-year Schengen visa"] },
  { kicker: "TITRE DE SÉJOUR", title: "Keep your papers on time", href: "/france/arrival", cta: "Validation and renewals",
    items: ["Validate your VLS-TS online after you arrive", "Renew on ANEF months before expiry, not weeks", "Change of status: student to job seeker to employee"] },
  { kicker: "CAF · HOUSING · BANK", title: "The everyday systems", href: "/settle-in-france", cta: "Settling-in support",
    items: ["CAF housing aid and a Visale guarantor", "Bank account, health cover (Ameli) and phone", "Your first 30 days, step by step"] },
  { kicker: "PR · NATIONALITY", title: "Make France home", href: "/pr-in-france", cta: "The road to PR in France",
    items: ["10-year resident card after five years", "French nationality after two years for French graduates", "B1 French and the civic exam, planned early"] },
];

const stages = [
  { title: "Just arrived", meta: "Month 1", body: "Validate your visa, open a bank account, get your social security number, apply for CAF and set up your phone and transport." },
  { title: "Studying", meta: "Year 1", body: "Work up to 964 hours a year, build your CV and LinkedIn, and start your French so it reaches B1 before you graduate." },
  { title: "Final year", meta: "6–12 months before graduation", body: "Secure your end-of-studies internship, the most common route into a first job, and plan your job-search permit." },
  { title: "Graduated", meta: "The 12-month window", body: "Apply for the job-search permit before your student permit ends, interview, and switch status as soon as you sign." },
  { title: "Working", meta: "Years 2–5", body: "Renew on time, keep payslips and tax returns, and prepare the 10-year card or naturalisation file." },
];

export default function InFrancePage() {
  const metro = paris("metro-platform");
  return <Page path="/in-france" faqs={quickAnswers["/in-france"]} eyebrow="ALREADY IN FRANCE" title="Already in France?" accent="Let’s get you hired."
    intro="Studying or working in France already? Get help with internships, alternance, your first job, your titre de séjour, CAF and housing, and the road to PR — from an adviser who lives in Paris."
    headerActions={<><a href="#help">How we help</a><a href="#stages">Where are you now?</a><a href="/book-consultation">Free 15-minute call</a></>}
    closing={{ kicker: "YOU’RE ALREADY HERE", title: "Now let’s make it", accent: "your career.", body: "Tell Harshita where you are — internship search, job hunt, papers or PR — and leave the call with your next three steps.", href: "/book-consultation", action: "Book a free 15-minute call" }}>
    <Section id="help" tone="ivory" kicker="WHAT WE HELP WITH" title="Everything after" accent="you land in France." intro="Each area links to the full, checked guide on this site. Book a call when you want a plan for your own situation.">
      <Grid cols={3}>{help.map((item, i) => <Card key={item.title} index={i + 1} kicker={item.kicker} title={item.title} href={item.href} cta={item.cta} feature={i === 0}>
        <Checklist items={item.items} />
      </Card>)}</Grid>
    </Section>
    <Section id="stages" tone="paper" kicker="WHERE ARE YOU RIGHT NOW?" title="One step at a time," accent="from arrival to PR." align="split">
      <Steps items={stages} />
    </Section>
    <Section tone="ivory">
      <Split image={metro.file} alt={metro.alt} caption="Paris" reverse>
        <Kicker>LOCAL, PRACTICAL, HONEST</Kicker>
        <h2>An adviser in Paris,<br /><em>not a call centre.</em></h2>
        <p>Harshita Kohli came to France as an international student herself. She knows the prefecture queues, the CAF forms and what French recruiters look for. Althéa gives guidance, preparation and checklists; administrations make the decisions, and complex immigration cases are referred to a qualified lawyer.</p>
        <Btn href="/book-consultation">Book a free 15-minute call</Btn>
      </Split>
    </Section>
    <Section tone="ivory">
      <Notice kicker="NOT IN FRANCE YET?" tone="ink"><p className="ms-notice-title">Come study in France. <em>We stay with you after you land.</em></p><TextLink href="/study-in-france">Plan your studies in France</TextLink></Notice>
    </Section>
  </Page>;
}
