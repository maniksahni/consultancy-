import Link from 'next/link';
import {Btn,Card,Checklist,Chips,Grid,Section,TextLink} from '@/components/maison/ui';
import Page from './Page';
import {ProgrammeResearch,publishedMoney} from '@/data/programmeResearch';
import {destinations} from '@/data/destinations';
import {studyKnowledge} from '@/data/studyKnowledge';
import {programmePlanning} from '@/lib/programmePlanning';
export default function ProgrammeEvidence({p}:{p:ProgrammeResearch}) {
  const plan=programmePlanning(p);
  const scholarship=studyKnowledge.find(e=>e.country===p.country&&e.topic==='Scholarships');
  const admissions=studyKnowledge.find(e=>e.country===p.country&&e.topic==='Admissions');
  const extras=p.slug.startsWith('uci-')?(p.charges?.find(c=>c.label==='Published total fees paid — not an additional charge')?.amount||0)-(p.charges?.find(c=>c.label==='Programme instalments — first four quarters')?.amount||0):0;
  const countryName=destinations.find(d=>d.slug===p.country)?.name;
  return <Page path={`/programmes/${p.slug}`} eyebrow={`${countryName} / ${p.level}`} title={p.title} intro={`${p.institution} · ${p.city} · ${p.duration}`}
    headerActions={<><a href={`/programmes?country=${p.country}`}>← Programme research</a><a href="#programme-fees">Tuition & charges</a><a href="#programme-dates">Application dates</a><a href="#programme-requirements">Requirements</a><a href="#programme-budget">Living & funding</a></>}
    closing={{kicker:"YOUR NEXT STEP",title:"A programme is a start.",accent:"A plan makes it real.",body:"Talk through fit, timing and budget for this programme and its alternatives.",href:`/book-consultation?destination=${p.country}`,action:"Discuss your study plan"}}>
    <Section tone="ivory">
      <p className="ms-kh-review"><span className="mx-live"/>Source-linked programme profile · updated 16 October 2026<span>Fee and calendar evidence retain their stated year</span></p>
      <div className="ms-prog-hero">
        <section className="ms-prog-panel is-ink" id="programme-fees">
          <p className="ms-kicker">PUBLISHED FEE</p>
          <p className="ms-prog-amount">{publishedMoney(p)}</p>
          <p className="ms-prog-period">{p.fee.period}</p>
          <dl className="ms-dir-facts"><div><dt>Fee year / cohort</dt><dd>{p.fee.year}</dd></div><div><dt>Applicant category</dt><dd>{p.fee.category}</dd></div></dl>
          <p>{p.fee.note}</p>
          <div className="ms-prog-reserve"><h3>Tuition planning reserve</h3><p><strong>{plan.feeBudget}</strong></p><p>{plan.feeBudgetBasis}</p></div>
          {p.country==='france'&&<p>CVEC: €105 for 2026–27 unless exempt. <a href="https://cvec.etudiant.gouv.fr/" target="_blank" rel="noreferrer">Official CVEC amount & exemptions ↗</a></p>}
          {p.charges&&<details className="ms-prog-charges"><summary><h3>Published fee breakdown ({p.charges.length} items)</h3></summary><p>Annual figures from the registrar schedule, for the stated cohort. The total row is not added again to individual charges.</p><dl>{p.charges.map(c=><div key={c.label}><dt>{c.label}</dt><dd>{new Intl.NumberFormat('en-IN',{style:'currency',currency:c.currency}).format(c.amount)}<small>{c.period}</small></dd></div>)}</dl></details>}
          {extras>0&&<p><strong>Campus charges and insurance reserve: approximately US${Math.ceil(extras).toLocaleString('en-GB')}.</strong> This equals one published annual extras budget, separate from programme tuition. Keep it as a conservative reserve for later enrolment periods; it is not a final-quarter invoice. Actual charges depend on the billed terms, fee year and insurance eligibility.</p>}
          <p className="ms-prog-src">Fee evidence: <a href={p.fee.source} target="_blank" rel="noreferrer">{new URL(p.fee.source).hostname} ↗</a></p>
        </section>
        <section className="ms-prog-panel" id="programme-dates">
          <p className="ms-kicker">{p.deadline.status}</p>
          <h2 className="ms-prog-title">{p.deadline.label}</h2>
          <p>{p.deadline.scope}</p>
          {p.notes&&<p className="ms-kh-applies">{p.notes}</p>}
          <p className="ms-prog-src">Calendar evidence: <a href={p.deadline.source} target="_blank" rel="noreferrer">{new URL(p.deadline.source).hostname} ↗</a></p>
          <div className="ms-dir-guidance"><h4>{plan.heading}</h4><p>{plan.timing}</p><p className="ms-muted">{plan.basis}</p><a href={plan.source} target="_blank" rel="noreferrer">Application route & calendar source ↗</a></div>
        </section>
      </div>
    </Section>
    <Section tone="ink" id="programme-requirements" kicker="ACADEMIC PREPARATION" title="Know your" accent="application route." intro={p.requirements} align="split">
      <h3 className="ms-sub" style={{marginTop:0}}>Prepare your <em>application file.</em></h3>
      <Checklist columns={2} items={plan.documents}/>
      <p className="ms-muted" style={{marginTop:24}}>This is a preparation checklist; the programme portal determines the required attachments.</p>
      <div className="ms-row" style={{marginTop:18}}><TextLink href={p.requirementsSource||p.programmeUrl}>Official programme & entry requirements</TextLink>{admissions&&<TextLink href={admissions.source}>Official admissions route</TextLink>}</div>
      {admissions&&<p className="ms-lead" style={{marginTop:24}}>{admissions.summary}</p>}
    </Section>
    <Section tone="paper" id="programme-budget" kicker="BEYOND TUITION" title="Living, funding" accent="and next steps.">
      <Grid cols={2}>
        <Card kicker="LIVING & ACCOMMODATION" title="Plan beyond tuition."><p><strong>{plan.living.living}</strong></p><p>{plan.living.housing}</p><p>{plan.living.basis}</p><p>{plan.living.planning}</p>{plan.living.sourceUrls&&<Chips items={plan.living.sourceUrls.map(source=>({label:source.label,href:source.url}))}/>}<TextLink href="/knowledge#budget">Build your personal budget</TextLink></Card>
        <Card kicker="SCHOLARSHIPS & NEXT STEPS" title="Build your funding plan." feature>{scholarship&&<><p>{scholarship.summary}</p><p><a href={scholarship.source} target="_blank" rel="noreferrer">Official scholarship opportunities ↗</a></p></>}<p>Prepare academic results, references and a strong motivation statement. Check award coverage, nationality eligibility, separate application dates and renewal conditions. Keep a self-funded budget until an award is confirmed.</p><div><Btn href={`/book-consultation?destination=${p.country}`}>Discuss your study plan</Btn></div></Card>
      </Grid>
    </Section>
  </Page>;
}
