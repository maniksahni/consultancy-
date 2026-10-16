"use client";
import { useState } from "react";
import { Kicker } from "@/components/maison/ui";

/** Adds the student's own researched figures into one planning total, with a live breakdown. */
export default function BudgetPlanner() {
  const [currency, setCurrency] = useState("EUR");
  const [values, setValues] = useState({ tuition: "", monthly: "", months: "12", oneoff: "" });
  const n = (key: keyof typeof values) => (Number.isFinite(Number(values[key])) ? Math.max(0, Number(values[key])) : 0);
  const living = n("monthly") * n("months");
  const total = n("tuition") + living + n("oneoff");
  const format = (v: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(v);
  const share = (v: number) => (total ? `${(v / total) * 100}%` : "0%");
  const fields: [keyof typeof values, string][] = [["tuition", "Tuition for this study period"], ["monthly", "Living costs per month"], ["months", "Months in your plan"], ["oneoff", "Travel, insurance & other costs"]];
  return <div className="ms-budget" id="budget">
    <div className="ms-budget-copy">
      <Kicker>BUILD YOUR OWN ESTIMATE</Kicker>
      <h2 className="ms-title">A budget for <em>the whole chapter.</em></h2>
      <p className="ms-lead">Use your university’s quoted tuition and researched local costs. This calculator adds your figures; it does not estimate visa eligibility or currency conversion.</p>
    </div>
    <div className="ms-budget-tool">
      <div className="ms-budget-inputs">
        <label className="ms-field"><span>Currency</span><select aria-label="Currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>{["EUR", "GBP", "USD", "CAD", "AUD", "INR"].map((c) => <option key={c}>{c}</option>)}</select></label>
        {fields.map(([k, l]) => <label className="ms-field" key={k}><span>{l}</span><input type="number" min={k === "months" ? 1 : 0} max={k === "months" ? 120 : 100000000} step="1" value={values[k]} onChange={(e) => setValues({ ...values, [k]: e.target.value })} placeholder="Enter researched amount" /></label>)}
      </div>
      <div className="ms-budget-total" aria-live="polite">
        <span>Your planning total</span>
        <strong>{format(total)}</strong>
        <div className="ms-budget-bar" aria-hidden="true"><i style={{ width: share(n("tuition")) }} /><i style={{ width: share(living) }} /><i style={{ width: share(n("oneoff")) }} /></div>
        <ul><li><b /> Tuition: {format(n("tuition"))}</li><li><b /> Living costs: {format(living)}</li><li><b /> Other: {format(n("oneoff"))}</li></ul>
      </div>
      <p className="ms-muted">Changing currency relabels the entered amounts; it does not convert them. Add dependants and a contingency to your own plan. Scholarship funding is excluded until confirmed.</p>
    </div>
  </div>;
}
