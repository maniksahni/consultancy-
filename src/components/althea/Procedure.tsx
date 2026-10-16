"use client";
import { brand } from "@/config/brand";
import { useState } from "react";
import { checked, official } from "@/data/france";
import { Kicker, Section, Steps, TextLink } from "@/components/maison/ui";

function Toggle({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return <fieldset className="ms-toggle"><legend>{label}</legend><div>{options.map((option) => <button type="button" key={option} aria-pressed={value === option} onClick={() => onChange(option)}>{option}</button>)}</div></fieldset>;
}

/** A two-question route planner for the Campus France / Études en France procedure. */
export default function Procedure() {
  const [residence, setResidence] = useState("India");
  const [offer, setOffer] = useState("No");
  const india = residence === "India";
  return <>
    <Section tone="ivory" kicker="YOUR ROUTE IN TWO QUESTIONS" title="Where are you" accent="in the process?" align="split" intro="Answer two questions and we’ll point you to the official procedure that applies.">
      <div className="ms-planner">
        <div className="ms-planner-controls">
          <Toggle label="Where do you live?" value={residence} options={["India", "Another country"]} onChange={setResidence} />
          <Toggle label="Do you have an admission offer?" value={offer} options={["No", "Yes"]} onChange={setOffer} />
        </div>
        <div className="ms-planner-result" aria-live="polite" key={residence + offer}>
          <Kicker>{india ? "CAMPUS FRANCE INDIA" : "CAMPUS FRANCE"} · {offer === "Yes" ? "WITH AN OFFER" : "BEFORE AN OFFER"}</Kicker>
          <h3>{offer === "Yes" ? "Confirm the post-admission steps." : "Confirm your application route."}</h3>
          <p>{india ? "Start with Campus France India's application and admission procedure. Your chosen institution and course determine which instructions apply." : "Check whether your country of residence uses Études en France, then consult your local Campus France office and the chosen institution."}</p>
          <p>{offer === "Yes" ? "An offer does not by itself complete all administrative or visa steps. Ask the local office about the procedure for applicants who already hold an admission offer." : "Check whether applications go through Études en France or the university's own procedure. Do not assume all institutions use the same route or calendar."}</p>
          <div className="ms-row"><a className="ms-btn ms-btn-gold" href={india ? official.india : official.procedure} target="_blank" rel="noreferrer"><span>Open the official {india ? "Campus France India" : "Campus France"} procedure</span><span aria-hidden="true">↗</span></a></div>
        </div>
      </div>
    </Section>
    <Section tone="paper" kicker="BEFORE AND AFTER" title="Your application," accent="step by step.">
      <Steps items={[
        { title: "Before you submit", body: <><p>Confirm the programme, prerequisites, teaching language, fees, deadlines and requested documents. Use official platforms for applications; this website does not submit to Campus France.</p><p>Keep one working checklist for your chosen programme: required qualification and transcripts, language evidence, motivation statement, CV or portfolio if requested, translations where required, tuition and funding plan, and the exact application calendar. These are preparation prompts, not a universal document list—the institution and your local procedure set the actual requirements.</p><TextLink href="/campus-france-guide">Explore the application procedure guide</TextLink></> },
        { title: "After an admission decision", body: <><p>Read the offer conditions and response deadline carefully. Confirm enrolment steps with the institution, then use the official visa guidance for your nationality and residence. Keep copies of submitted documents and save confirmations from each official platform.</p><div className="ms-row"><TextLink href="https://www.france-visas.gouv.fr/en/web/france-visas/etudiant">France-Visas: official student visa guidance</TextLink><TextLink href="/france/visas">Explore the student visa guide</TextLink></div></> },
      ]} />
      <p className="ms-muted" style={{ marginTop: 30 }}>Process overview checked {checked} against official Campus France guidance. Exact requirements and timelines depend on residence, citizenship and programme. {brand.shortName} is independent and unaffiliated.</p>
    </Section>
  </>;
}
