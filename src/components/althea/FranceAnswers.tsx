import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
const answers=[
 {q:"How do students in India apply to universities in France?",a:"Start with the official Campus France India guidance, then check the university's own admissions page. India is part of the Études en France procedure, but the route depends on the diploma, study level and institution.",source:"Campus France India",href:"https://www.inde.campusfrance.org/application-and-admission-procedure"},
 {q:"Can I study a Bachelor's or Master's in France in English?",a:"Yes, some French institutions offer programmes taught wholly or partly in English. Language requirements differ by programme; verify the teaching language and certificates on the university's official listing.",source:"Campus France programme catalogues",href:"https://www.campusfrance.org/en/finding-a-university-programme-France"},
 {q:"Are French university fees the same for all international students?",a:"No. Tuition depends on the institution, programme, degree, academic year, nationality and possible exemptions. Never rely on a single generic fee figure for your budget.",source:"Campus France tuition guidance",href:"https://www.campusfrance.org/en/tuition-fees-France"},
 {q:"Does using a consultancy guarantee admission or a student visa?",a:"No. Universities decide admissions, while the French authorities decide visa applications. A consultancy can help with research and preparation, not guarantee either outcome.",source:"France-Visas official student guidance",href:"https://www.france-visas.gouv.fr/en/web/france-visas/etudiant"},
];
export default function FranceAnswers(){
 return <section aria-labelledby="france-answers-heading" className="mx-auto max-w-[1328px] px-5 py-16 sm:px-9 lg:px-14 lg:py-24">
  <div className="grid gap-9 lg:grid-cols-12 lg:gap-14">
   <div className="lg:col-span-4"><p className="text-[11px] font-semibold uppercase tracking-[.22em] text-[#A58C67]">Answers / France study questions</p>
    <h2 id="france-answers-heading" className="mt-5 font-display text-5xl leading-[1] text-[#153260] sm:text-6xl">Straight answers.<br/><em>No guesswork.</em></h2>
    <p className="mt-6 text-sm leading-7 text-[#596A80]">Short, source-linked answers for students comparing French university options. Editorially reviewed 15 October 2026.</p>
    <Link href="/france/faq" className="mt-6 inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-[#173969] underline underline-offset-4">Read all questions <ArrowUpRight size={16}/></Link>
   </div>
   <div className="space-y-4 lg:col-span-8">{answers.map((item,i)=><article key={item.q} className="border border-[#173969]/15 bg-white p-6 sm:p-8">
    <p className="text-[10px] font-semibold uppercase tracking-[.19em] text-[#A58C67]">0{i+1} / Essential answer</p>
    <h3 className="mt-4 font-display text-3xl leading-[1.15] text-[#173969]">{item.q}</h3>
    <p className="mt-4 text-sm leading-8 text-[#52647A]">{item.a}</p>
    <a href={item.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-[11px] font-semibold text-[#315787] underline underline-offset-4">Check {item.source} <ArrowUpRight size={15}/></a>
   </article>)}</div>
  </div>
 </section>;
}
