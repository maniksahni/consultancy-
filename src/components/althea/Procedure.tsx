"use client";
import { brand } from "@/config/brand";
import { useState } from "react";
import { checked } from "@/data/france";
import { official } from "@/data/france";
import Link from "next/link";
export default function Procedure() {
  const [residence, setResidence] = useState("India");
  const [offer, setOffer] = useState("No");
  return (
    <>
      <div className="finder-filters">
        <label>
          Where do you live?
          <select
            value={residence}
            onChange={(e) => setResidence(e.target.value)}
          >
            <option>India</option>
            <option>Another country</option>
          </select>
        </label>
        <label>
          Do you have an admission offer?
          <select value={offer} onChange={(e) => setOffer(e.target.value)}>
            <option>No</option>
            <option>Yes</option>
          </select>
        </label>
      </div>
      <div className="prose" aria-live="polite">
        <h2>
          {offer === "Yes"
            ? "Confirm the post-admission steps."
            : "Confirm your application route."}
        </h2>
        <p>
          {residence === "India"
            ? "Start with Campus France India's application and admission procedure. Your chosen institution and course determine which instructions apply."
            : "Check whether your country of residence uses Études en France, then consult your local Campus France office and the chosen institution."}
        </p>
        <p>
          <a href={residence === "India" ? official.india : official.procedure} target="_blank" rel="noreferrer">
            Open the official {residence === "India" ? "Campus France India" : "Campus France"} procedure ↗
          </a>
        </p>
        <p>
          {offer === "Yes"
            ? "An offer does not by itself complete all administrative or visa steps. Ask the local office about the procedure for applicants who already hold an admission offer."
            : "Check whether applications go through Études en France or the university's own procedure. Do not assume all institutions use the same route or calendar."}
        </p>
        <Link href="/campus-france-guide">Explore the application procedure guide ↗</Link>
        <h2>Before you submit</h2>
        <p>
          Confirm the programme, prerequisites, teaching language, fees,
          deadlines and requested documents. Use official platforms for
          applications; this website does not submit to Campus France.
        </p>
        <p>Keep one working checklist for your chosen programme: required qualification and transcripts, language evidence, motivation statement, CV or portfolio if requested, translations where required, tuition and funding plan, and the exact application calendar. These are preparation prompts, not a universal document list—the institution and your local procedure set the actual requirements.</p>
        <h2>After an admission decision</h2>
        <p>Read the offer conditions and response deadline carefully. Confirm enrolment steps with the institution, then use the official visa guidance for your nationality and residence. Keep copies of submitted documents and save confirmations from each official platform.</p>
        <p><a href="https://www.france-visas.gouv.fr/en/web/france-visas/etudiant" target="_blank" rel="noreferrer">France-Visas: official student visa guidance ↗</a></p>
        <Link href="/france/visas">Explore the student visa guide ↗</Link>
        <p className="muted">
          Process overview checked {checked} against official Campus France
          guidance. Exact requirements and timelines depend on residence,
          citizenship and programme. {brand.shortName} is independent and unaffiliated.
        </p>
      </div>
    </>
  );
}
