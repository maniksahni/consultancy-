import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import Page from "@/components/althea/Page";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

export const metadata = pageMetadata("/career-support", {
  title: "Career Support in France for International Students",
  description: `Build your job search plan in France with practical CV, LinkedIn, interview, internship and alternance guidance from ${brand.shortName}.`,
});

const steps = [
  ["French-style CV", "Clarify your experience and adapt your CV structure and language to French recruitment conventions."],
  ["LinkedIn & positioning", "Make your profile easier to understand for recruiters and align it with the roles you’re targeting."],
  ["Internships & alternance", "Plan a focused search, prepare application materials and get oriented to the process."],
  ["Interviews & workplace French", "Practice how to present your strengths and communicate with confidence in professional situations."],
];

export default function CareerSupportPage() {
  return <Page eyebrow="CAREER SUPPORT IN FRANCE" title="Make your next move with confidence." intro="Practical career preparation for international students and young professionals building a future in France.">
    <div className="career-intro"><p>Start with your goals, current experience, language level and the reality of your target sector. Together, we turn those details into a clear and workable plan.</p><Link className="button" href="/book-consultation">Book a career support call <ArrowUpRight size={17}/></Link></div>
    <div className="career-steps">{steps.map(([title,text], i)=><article key={title}><span>0{i+1}</span><Check size={19}/><h2>{title}</h2><p>{text}</p></article>)}</div>
    <aside className="settle-scope"><p className="eyebrow">PERSONAL, INDEPENDENT GUIDANCE</p><h2>A plan built around<br/><em>your own experience.</em></h2><p>We provide coaching, feedback and preparation. Hiring, admission to a programme, internship offers and work authorisation decisions belong to employers and official authorities and cannot be guaranteed.</p><Link className="text-link" href="/settle-in-france">See all settling support <ArrowUpRight size={17}/></Link></aside>
  </Page>;
}
