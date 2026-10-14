import { pageMetadata } from "@/lib/seo";
import Page from "@/components/althea/Page";
import Link from "next/link";
import { ArrowDownToLine, ArrowUpRight, Check } from "lucide-react";

export const metadata = pageMetadata("/first-30-days-france", {
  title: "First 30 Days in France Checklist",
  description: "A free, printable checklist to help international students organise the practical first steps after arriving in France.",
});

const groups = [
  ["Before and just after arrival", "Keep passport, admission and accommodation records together", "Save emergency and university contact details", "Arrange a French SIM or other reliable way to stay connected", "Check local transport options and passes"],
  ["First two weeks", "Ask your bank what documents it needs; requirements vary", "Check your institution’s arrival and enrolment instructions", "Review health insurance and student administration steps", "Keep copies and dates for official paperwork and appointments"],
  ["First month", "If eligible, read current CAF housing-aid information and gather questions", "Learn the local routines: shops, healthcare access and transport", "Update your CV and LinkedIn with a France-ready direction", "Choose one realistic study, language or career goal for the next month"],
];

export default function FirstThirtyDaysPage() {
  return <Page eyebrow="FREE STUDENT RESOURCE" title="Your first 30 days in France." intro="A simple checklist for the practical things that can make settling into a new country feel more manageable.">
    <div className="checklist-download"><div><p className="eyebrow">KEEP IT HANDY</p><h2>Take the checklist<br/><em>with you.</em></h2><p>Download a plain, printable copy and work through it at your own pace. Some steps depend on your city, status and individual circumstances—always confirm requirements with the relevant official service.</p><a className="button" href="/downloads/first-30-days-france-checklist.txt" download><ArrowDownToLine size={17}/> Download the free checklist</a></div><div className="checklist-groups">{groups.map(([title,...items])=><section key={title}><h3>{title}</h3>{items.map(item=><p key={item}><Check size={16}/>{item}</p>)}</section>)}</div></div>
    <section className="checklist-next"><p className="eyebrow">WANT PERSONAL GUIDANCE?</p><h2>Get help with the steps<br/><em>that matter to you.</em></h2><Link className="text-link" href="/settle-in-france">Explore Settle in France packages <ArrowUpRight size={17}/></Link></section>
  </Page>;
}
