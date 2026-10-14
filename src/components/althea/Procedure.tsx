"use client";
import { useState } from "react";
import { official, checked } from "@/data/france";
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
          {offer === "Yes"
            ? "An offer does not by itself complete all administrative or visa steps. Ask the local office about the procedure for applicants who already hold an admission offer."
            : "Check whether applications go through Études en France or the university's own procedure. Do not assume all institutions use the same route or calendar."}
        </p>
        <a
          href={residence === "India" ? official.india : official.procedure}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the relevant official guidance ↗
        </a>
        <h2>Before you submit</h2>
        <p>
          Confirm the programme, prerequisites, teaching language, fees,
          deadlines and requested documents. Use official platforms for
          applications; this website does not submit to Campus France.
        </p>
        <a href={official.visa}>France-Visas student information ↗</a>
        <p className="muted">
          Process overview checked {checked} against official Campus France
          guidance. Exact requirements and timelines depend on residence,
          citizenship and programme. Althéa is independent and unaffiliated.
        </p>
      </div>
    </>
  );
}
