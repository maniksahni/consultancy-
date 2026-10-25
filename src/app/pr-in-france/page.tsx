import { pageMetadata } from "@/lib/seo";
import Page from "@/components/althea/Page";
import { Btn, Card, Checklist, Facts, Grid, Notice, Section, Steps } from "@/components/maison/ui";
import { quickAnswers } from "@/data/quickAnswers";

export const metadata = pageMetadata("/pr-in-france", {
  title: "PR in France for Indian Students",
  description: "How Indian students get PR in France: job-search permit, work permit or Talent Passport, the 10-year resident card after 5 years, and French nationality.",
});

/** Official pages each figure on this page is checked against (October 2026). */
const sources = [
  { label: "Service-Public · Job search or company creation permit (APS / RECE)", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F17319?lang=en" },
  { label: "Campus France India · Working in France after your studies", url: "https://www.inde.campusfrance.org/how-to-find-work-in-france" },
  { label: "Service-Public · Long-term resident card (10 years)", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F17359?lang=en" },
  { label: "Service-Public · French nationality by naturalisation", url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2213?lang=en" },
  { label: "Campus France India · 5-year short-stay visa for alumni", url: "https://www.inde.campusfrance.org/5-year-validity-short-stay-visa" },
];

const roadmap = [
  { title: "Study in France", meta: "Student permit", body: "Complete a master's-level degree at a French institution. Work up to 964 hours a year, do your end-of-studies internship and get your French moving towards B1." },
  { title: "Job-search permit (APS / RECE)", meta: "12 months · renewable once for Indians", body: "Apply in the two months before your student permit ends. You can work without the student hour limit while you look for a job or set up a company." },
  { title: "Work permit or Talent Passport", meta: "Employee or multi-year", body: "With a job related to your studies paying at least €2,800.53 gross a month, switch to an employee permit. Qualified employees earning at least €39,582 gross a year can get a Talent Passport for up to four years, and family can join." },
  { title: "10-year resident card", meta: "After 5 years", body: "After five years of legal, uninterrupted residence on qualifying permits, apply for the 10-year card: income at least at minimum wage, French at B1, the civic exam and health cover." },
  { title: "French nationality", meta: "From 2 years for French graduates", body: "Naturalisation normally needs five years of residence, reduced to two if you graduated from a French higher education institution after two years of study. Sufficient French, the civic exam and a prefecture interview are required." },
];

const checklists = [
  { title: "Job-search permit", items: ["Valid student residence permit (apply before it expires)", "Master's-level diploma or certificate of success", "Passport, photos and proof of address", "Proof of health cover and resources", "€150 permit fee, paid by tax stamp"] },
  { title: "Work permit or Talent Passport", items: ["Signed contract or offer related to your studies", "Salary at or above the threshold for your permit", "Diploma and job-search permit", "Employer documents, where required", "Payslips once you start"] },
  { title: "10-year resident card", items: ["Five years of residence permits, with no long gaps abroad", "Payslips, contracts and French tax notices", "French B1 certificate", "Civic exam certificate", "€350 fee (€250 if you hold a valid permit)"] },
  { title: "French nationality", items: ["Valid residence permit when you apply", "Proof of residence for 5 years, or 2 with a French degree", "Proof of sufficient French (diploma or test)", "Civic exam certificate and stable income", "€255 fee; answer within 18 months"] },
];

const mistakes = [
  "Starting French too late: B1 is required for the 10-year card, so begin in your first year.",
  "Letting a permit lapse: renew well before it expires, and apply for the job-search permit before your student permit ends.",
  "Long absences: more than six months in a row, or ten months in total, can break the five years for the long-term resident card.",
  "Skipping French tax returns: you need tax notices for every year when you apply.",
  "Accepting a job below the threshold or unrelated to your degree when switching from the job-search permit.",
  "Not keeping payslips, contracts and certificates in one folder from day one.",
];

export default function PrInFrancePage() {
  return <Page path="/pr-in-france" faqs={quickAnswers["/pr-in-france"]} eyebrow="STUDY · WORK · STAY" title="PR in France" accent="for Indian students."
    intro="Yes, it is possible. Study in France, use the 12-month job-search permit, move to a work permit or Talent Passport, then apply for the 10-year resident card after five years. French nationality can come after two years if you completed two years of higher education in France."
    headerActions={<><a href="#roadmap">The roadmap</a><a href="#documents">Documents</a><a href="#mistakes">Mistakes to avoid</a><a href="/book-consultation">Plan my PR pathway</a></>}
    closing={{ kicker: "READY TO PLAN YOUR PATHWAY?", title: "Study here. Work here.", accent: "Stay here.", body: "Bring your degree, your job plans and your timeline to a free 15-minute call. Harshita will map the permits and dates for your situation.", href: "/book-consultation", action: "Book a free 15-minute call" }}>
    <Section tone="ivory" kicker="THE SHORT ANSWER · OCTOBER 2026" title="Study, work," accent="then a 10-year card.">
      <Facts items={[
        { label: "Job-search permit", value: "12 months", note: "Renewable once for Indian graduates, per Campus France India" },
        { label: "Salary to switch to a work permit", value: "€2,800.53 gross / month", note: "Job related to your studies" },
        { label: "Talent Passport (qualified employee)", value: "€39,582 gross / year", note: "Up to 4 years; family can join" },
        { label: "10-year resident card", value: "After 5 years", note: "B1 French, civic exam, income ≥ minimum wage" },
        { label: "French nationality", value: "From 2 years", note: "After two years of higher education in France with a diploma" },
        { label: "Resident card fee", value: "€350", note: "€250 if you already hold a valid permit" },
      ]} />
    </Section>
    <Section id="roadmap" tone="paper" kicker="THE ROADMAP" title="From student" accent="to resident." align="split" intro="Each step needs a valid permit before the previous one ends. Gaps in your papers are the most common reason a five-year count restarts.">
      <Steps items={roadmap} />
    </Section>
    <Section id="documents" tone="ivory" kicker="DOCUMENT CHECKLISTS" title="What to keep" accent="for every stage." intro="Start one folder on day one: permits, payslips, contracts, tax notices and certificates. Prefectures may ask for more depending on your case.">
      <Grid cols={2}>{checklists.map((c, i) => <Card key={c.title} index={i + 1} title={c.title}><Checklist items={c.items} /></Card>)}</Grid>
    </Section>
    <Section id="mistakes" tone="paper" kicker="AVOID THESE" title="Six mistakes" accent="that cost students years." align="split">
      <Checklist items={mistakes} />
    </Section>
    <Section tone="ivory" kicker="DUAL CITIZENSHIP" title="French passport," accent="Indian roots." align="split" intro="India does not allow dual citizenship. If you take French nationality you give up Indian citizenship, and can then apply for an OCI card to live, work and own property in India without a visa. Many Indians in France stay on the 10-year resident card for exactly this reason.">
      <Btn href="/book-consultation">Talk it through with Harshita</Btn>
    </Section>
    <Section tone="paper" kicker="OFFICIAL SOURCES" title="Checked against" accent="official pages." align="split" intro="Thresholds and fees change every year. Figures on this page were checked in October 2026; confirm them on the official page before you apply. Althéa gives guidance, not legal advice, and refers complex cases to a qualified immigration lawyer.">
      <ul className="ms-source-list">{sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.label}</a></li>)}</ul>
    </Section>
    <Section tone="ivory">
      <Notice kicker="ALREADY IN FRANCE?" tone="ink"><p className="ms-notice-title">Internships, jobs and paperwork. <em>Help for every stage.</em></p><Btn href="/in-france" variant="light">See how we help in France</Btn></Notice>
    </Section>
  </Page>;
}
