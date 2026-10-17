"use client";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CalendarCheck, Check, FileText, Lock, MessageCircle, Upload, X } from "lucide-react";
import { brand } from "@/config/brand";
import { ATS_PASS, jobKeywords, readCv, scoreCv, type AtsResult } from "@/lib/ats";

type Props = { title: string; company: string; url: string; description: string };

const errorText: Record<string, string> = {
  "too-big": "That file is over 8 MB. Export a lighter PDF and try again.",
  type: "Please choose a PDF, Word (.docx) or .txt file. Old .doc files and images cannot be read by most tracking systems either.",
};

/** "Will my CV get through the system?" — scored against this one job ad, on the student's device. */
export default function AtsChecker({ title, company, url, description }: Props) {
  const keywords = useMemo(() => jobKeywords(title, description, company), [title, description, company]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState<AtsResult | null>(null);
  const input = useRef<HTMLInputElement>(null);

  const check = async (file?: File | null) => {
    if (!file) return;
    setBusy(true); setError(null); setResult(null); setFileName(file.name);
    try {
      const cv = await readCv(file);
      setResult(scoreCv(cv, keywords));
    } catch (e) {
      const code = e instanceof Error ? e.message : "";
      setError(errorText[code] || "This file could not be read. If it is a PDF, it may be protected or scanned — that would also block a tracking system.");
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  };

  const whatsapp = `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(
    `Hello Harshita, I checked my CV on the Althéa ATS checker for this job and ${result ? `scored ${result.score}/100` : "need help"}:\n${title} — ${company}\n${url}\nCan we book a CV session?`,
  )}`;

  return <div className="ms-ats">
    {!result && <>
      <div className="ms-ats-intro">
        <h3>Will your CV pass the applicant tracking system?</h3>
        <p>Most companies filter CVs with software before a recruiter reads them. Check yours against <b>this job ad</b> in seconds.</p>
      </div>
      <label className={`ms-ats-drop${busy ? " is-busy" : ""}`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); check(e.dataTransfer.files?.[0]); }}>
        <input ref={input} type="file" accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" onChange={(e) => check(e.target.files?.[0])} disabled={busy} />
        <Upload size={22} aria-hidden="true" />
        <strong>{busy ? `Reading ${fileName}…` : "Choose your CV"}</strong>
        <span>PDF, Word (.docx) or .txt · max 8 MB</span>
      </label>
      <p className="ms-ats-privacy"><Lock size={13} aria-hidden="true" />Your CV never leaves your phone or computer — it is read and scored in your browser.</p>
      {error && <p className="ms-ats-error" role="alert">{error}</p>}
    </>}

    {result && <div className={`ms-ats-result ${result.pass ? "is-pass" : "is-fail"}`} role="status">
      <div className="ms-ats-score">
        <svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" className="track" /><circle cx="60" cy="60" r="52" className="fill" style={{ strokeDashoffset: 327 * (1 - result.score / 100) }} /></svg>
        <div><strong>{result.score}</strong><span>/ 100</span></div>
      </div>
      <div className="ms-ats-verdict">
        <p className="ms-kicker">{result.pass ? "ATS-FRIENDLY" : "NOT ATS-FRIENDLY YET"}</p>
        <h3>{result.pass ? "Your CV should get through the system." : "Your CV is not ATS-friendly for this job."}</h3>
        <p>{result.pass
          ? `It scored ${result.score} — above the ${ATS_PASS} we treat as safe. Tighten anything marked below, then apply.`
          : `It scored ${result.score} out of 100. Software would likely filter it out before a recruiter at ${company} sees it. Let’s fix that together.`}</p>
        <p className="ms-ats-file"><FileText size={13} aria-hidden="true" />{fileName} · {result.words} words</p>
      </div>

      {!result.pass && <div className="ms-ats-cta">
        <p><b>Let’s book an appointment with {brand.person.split(" ")[0]}.</b> In one session we rewrite your CV for recruiters and for this exact role.</p>
        <div className="ms-ats-cta-actions">
          <Link className="ms-btn ms-btn-gold" href="/book-consultation"><span>Book an appointment with {brand.person.split(" ")[0]}</span><CalendarCheck size={16} aria-hidden="true" /></Link>
          <a className="ms-ats-wa" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} aria-hidden="true" />Send my score on WhatsApp</a>
        </div>
      </div>}

      <ul className="ms-ats-checks">
        {result.checks.map((c) => <li key={c.id} className={c.ok ? "is-ok" : "is-bad"}>
          <span className="ms-ats-icon" aria-hidden="true">{c.ok ? <Check size={14} /> : <X size={14} />}</span>
          <div><p><b>{c.label}</b><em>{c.points}/{c.max}</em></p><p>{c.tip}</p></div>
        </li>)}
      </ul>

      {keywords.length > 0 && <div className="ms-ats-keywords">
        {result.missing.length > 0 && <><p><b>Missing from your CV</b> — words this ad uses</p>
          <p className="ms-ats-chips">{result.missing.map((k) => <span key={k} className="is-missing">{k}</span>)}</p></>}
        {result.matched.length > 0 && <><p><b>Already in your CV</b></p>
          <p className="ms-ats-chips">{result.matched.map((k) => <span key={k} className="is-found">{k}</span>)}</p></>}
      </div>}

      <div className="ms-ats-again">
        <button type="button" className="ms-btn ms-btn-ghost" onClick={() => { setResult(null); setTimeout(() => input.current?.click(), 0); }}><span>Check another version</span><Upload size={15} aria-hidden="true" /></button>
        {result.pass && <a className="ms-ats-wa" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={15} aria-hidden="true" />Ask {brand.person.split(" ")[0]} for a final review</a>}
      </div>
      <p className="ms-ats-privacy">An estimate based on common tracking-system rules — every company’s software differs. Your file was not uploaded.</p>
    </div>}
  </div>;
}
