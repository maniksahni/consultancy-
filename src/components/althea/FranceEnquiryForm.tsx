"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import { saveMentorshipBooking } from "@/lib/firebase";

const HELP = ["University & course selection", "Campus France application guidance", "Scholarships and funding", "Student visa preparation", "Full France study journey"] as const;
const INTAKES = ["2027 intake", "2028 intake", "Undecided / researching"] as const;
const wa = (fullName: string, phone: string, help: string) => "https://wa.me/33755749029?text=" + encodeURIComponent("Bonjour Althéa, I'd like to explore studying in France. Name: " + fullName + ". My +91 WhatsApp: " + phone + ". Support: " + help + ".");
const style="min-h-12 w-full rounded-none border border-[#173969]/20 bg-white px-4 py-3 text-sm text-[#173969] outline-none focus-visible:border-[#B49C74] focus-visible:ring-2 focus-visible:ring-[#B49C74]/30";
export default function FranceEnquiryForm(){
 const [data,setData]=useState({name:"",phone:"",email:"",qualification:"",intake:INTAKES[0] as string,help:HELP[0] as string});
 const [status,setStatus]=useState<"idle"|"loading"|"success"|"error">("idle");
 const [error,setError]=useState("");
 const set=(name:keyof typeof data,value:string)=>{setData(d=>({...d,[name]:value}));if(status==="error")setStatus("idle");};
 const messageUrl=wa(data.name.trim(),data.phone.trim(),data.help);
 async function submit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  const name=data.name.trim().replace(/<[^>]+>/g,"").slice(0,100);
  const phone=data.phone.replace(/\D/g,"");
  if(name.length<2||!/^[6-9]\d{9}$/.test(phone)){setStatus("error");setError("Please add your name and a valid Indian 10-digit WhatsApp number.");return;}
  setStatus("loading");setError("");
  const result=await saveMentorshipBooking({
   fullName:name,whatsapp:phone,email:data.email.trim().slice(0,100)||undefined,
   qualification:data.qualification.trim().slice(0,250),targetCountry:"France",
   targetIntake:data.intake,helpNeeded:data.help
  });
  if(result.success){setStatus("success");}else{setStatus("error");setError("We couldn't securely save your request right now. Please use the WhatsApp contact link below instead.");}
 }
 return <div className="border border-[#173969]/15 bg-[#FCFAF6] p-5 shadow-[0_20px_60px_rgba(13,38,79,.05)] sm:p-8">
  {status==="success"?<div role="status" className="py-8 text-center">
   <CheckCircle2 size={36} className="mx-auto text-[#24815C]"/>
   <h3 className="mt-5 font-display text-4xl text-[#173969]">Your enquiry is received.</h3>
   <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#53657B]">Thank you, {data.name.trim()}. Your details were submitted. Our team can review your request; no appointment time is confirmed yet.</p>
   <a href={messageUrl} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center gap-3 bg-[#173969] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white">Continue on WhatsApp <ArrowUpRight size={17}/></a>
   <button type="button" onClick={()=>setStatus("idle")} className="mx-auto mt-4 block min-h-11 text-xs text-[#173969] underline">Send another enquiry</button>
  </div>:<>
   <p className="text-[11px] font-semibold uppercase tracking-[.24em] text-[#AC9068]">Private enquiry · Study in France</p>
   <h3 className="mt-3 font-display text-4xl text-[#173969]">Tell us your story.</h3>
   <p className="mt-3 text-sm leading-7 text-[#596980]">A short introduction is enough to start. We'll never promise admissions or a visa decision.</p>
   <form onSubmit={submit} className="mt-7 grid gap-4 sm:grid-cols-2" noValidate={false}>
    <label><span className="mb-2 block text-xs font-medium text-[#375377]">Your name *</span><input autoComplete="name" required minLength={2} maxLength={100} className={style} value={data.name} onChange={e=>set("name",e.target.value)} placeholder="Full name"/></label>
    <label><span className="mb-2 block text-xs font-medium text-[#375377]">WhatsApp (+91) *</span><input autoComplete="tel-national" inputMode="numeric" type="tel" required pattern="[6-9][0-9]{9}" maxLength={10} className={style} value={data.phone} onChange={e=>set("phone",e.target.value)} placeholder="10-digit Indian mobile"/></label>
    <label><span className="mb-2 block text-xs font-medium text-[#375377]">Email (optional)</span><input type="email" autoComplete="email" maxLength={100} className={style} value={data.email} onChange={e=>set("email",e.target.value)} placeholder="you@example.com"/></label>
    <label><span className="mb-2 block text-xs font-medium text-[#375377]">Current qualification</span><input maxLength={250} className={style} value={data.qualification} onChange={e=>set("qualification",e.target.value)} placeholder="Bachelor's, Class XII..."/></label>
    <label><span className="mb-2 block text-xs font-medium text-[#375377]">Planned intake</span><select className={style} value={data.intake} onChange={e=>set("intake",e.target.value)}>{INTAKES.map(x=><option key={x}>{x}</option>)}</select></label>
    <label><span className="mb-2 block text-xs font-medium text-[#375377]">What help do you need?</span><select className={style} value={data.help} onChange={e=>set("help",e.target.value)}>{HELP.map(x=><option key={x}>{x}</option>)}</select></label>
    <p className="text-xs leading-6 text-[#6B7483] sm:col-span-2">By submitting you agree that Althéa Consulting may contact you about this enquiry. Please don't include passports or other sensitive documents here.</p>
    {status==="error"&&<p role="alert" className="flex items-start gap-2 text-sm text-[#9E3A37] sm:col-span-2"><AlertCircle size={19} className="shrink-0"/>{error}</p>}
    <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
     <button type="submit" disabled={status==="loading"} className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#173969] px-6 py-3 text-[11px] font-semibold uppercase tracking-[.13em] text-white hover:bg-[#2B528A] disabled:opacity-50">{status==="loading"?"Sending securely...":"Submit your enquiry"} <ArrowUpRight size={17}/></button>
     <a href={messageUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#173969]/25 px-5 py-3 text-[11px] font-semibold text-[#173969] hover:bg-[#F0EBE2]">Or message on WhatsApp <ArrowUpRight size={16}/></a>
    </div>
   </form>
  </>}
 </div>;
}
