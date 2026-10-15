import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import Page from "@/components/althea/Page";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

export const metadata = pageMetadata("/settle-in-france", {
  title: "Settle in France: Student Support",
  description: `Practical arrival, student life and career orientation for international students and young professionals in France, with ${brand.shortName}.`,
});

const packages = [
  { name: "France Arrival Essentials", label: "FIRST STEPS", includes: ["SIM and connectivity options", "Bank-account preparation and what to ask", "Transport passes and getting around", "Everyday systems and a personal first-steps checklist"] },
  { name: "Student Life Setup", label: "SETTLING IN", includes: ["Accommodation-search guidance and useful sources", "CAF orientation and official information", "Insurance and paperwork checklist", "Local-life orientation for your city"] },
  { name: "Career Launch in France", label: "NEXT CHAPTER", includes: ["French-style CV and LinkedIn feedback", "Job-search strategy and application planning", "Interview preparation", "Internship and alternance orientation"] },
  { name: "Business French for Work", label: "FRENCH IN PRACTICE", includes: ["University and workplace communication", "Practical phrases for administration", "Professional email and meeting practice", "Learning plan around your real situations"] },
  { name: "Personalised France Support Call", label: "ONE-TO-ONE", includes: ["A focused conversation about one specific challenge", "Practical options and next steps", "Follow-up checklist after the call", "Referrals to official or specialist services where appropriate"] },
];

export default function SettleInFrancePage() {
  return <Page path="/settle-in-france" eyebrow="ARRIVAL · STUDENT LIFE · CAREER" title="Settle in France, with a local guide." intro="You’ve arrived. Get practical, personal support for the everyday systems, student life and career questions that come next.">
    <section className="settle-intro"><div><p className="eyebrow">SUPPORT THAT MEETS YOU HERE</p><h2>Less guesswork.<br/><em>More confidence in your next step.</em></h2></div><p>Choose a focused session or explore a broader support package. We’ll agree what’s included and the fee before any work begins. Every service is guidance and preparation tailored to your situation.</p></section>
    <div className="settle-packages">
      {packages.map((item, i) => <article className="settle-package" key={item.name}><div className="settle-package-top"><span>0{i+1}</span><span className="eyebrow">{item.label}</span></div><h2>{item.name}</h2><ul>{item.includes.map(x=><li key={x}><Check size={16}/>{x}</li>)}</ul><div className="settle-package-bottom"><span><small>PRICING</small>Fee confirmed before booking</span><Link href={`/book-consultation?service=${encodeURIComponent(item.name)}`} className="text-link">Ask about this package <ArrowUpRight size={17}/></Link></div></article>)}
    </div>
    <aside className="settle-scope"><p className="eyebrow">CLEAR SCOPE, REALISTIC EXPECTATIONS</p><h2>Guidance you can use.<br/><em>Decisions stay yours.</em></h2><p>Althéa provides orientation, preparation, checklists and referrals where appropriate. We do not provide legal or immigration advice, make decisions for banks or housing providers, guarantee accommodation, or guarantee administrative outcomes. For regulated or official decisions, we’ll point you to the relevant organisation or qualified professional.</p><Link className="button" href="/book-consultation">Book a Call <ArrowUpRight size={17}/></Link></aside>
    <section className="settle-bridge"><p className="eyebrow">YOUR SUPPORT DOESN’T END AT ARRIVAL</p><h2>Planning to study here too?<br/><em>We can help you prepare.</em></h2><Link className="text-link" href="/study-in-france">Explore independent Study in France guidance <ArrowUpRight size={17}/></Link></section>
  </Page>;
}
