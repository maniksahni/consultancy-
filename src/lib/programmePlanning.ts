import type { ProgrammeResearch } from '@/data/programmeResearch';
import { universityCoverage } from '@/data/universityCoverage';

export function programmePlanning(p: ProgrammeResearch) {
  const money=(n:number)=>new Intl.NumberFormat('en-GB',{style:'currency',currency:p.fee.currency,maximumFractionDigits:0}).format(n);
  const amount=p.fee.amount;
  const feeBudget=`${money(amount)}–${money(Math.ceil(amount*1.1))} for the stated fee period`;
  let timing=`Prepare your documents 8–12 weeks before ${p.deadline.label}. Aim to submit before the official closing date to allow time for corrections.`;
  let heading='Your application preparation plan';
  let basis='Althéa preparation recommendation; the university deadline above remains authoritative.';
  if(p.slug==='psl-ai-society') {
    heading='Next-cycle planning: January–February 2027';
    timing='Have transcripts, CV, motivation letter, research proposal and your academic referee ready by December 2026. The reference cycle ran 15 January–24 February 2026. Use January–February as an estimated preparation window for the next cycle, and submit only against the live PSL portal calendar.';
    basis='Estimated next-cycle window inferred from the dated 2026 university calendar; not an official 2027 deadline.';
  } else if(p.slug==='psl-computer-science') {
    heading='Next-cycle planning: February–March 2027 (M1)';
    timing='Prepare degree evidence, transcripts, CV and language documents by January 2027. The 2026 M1 reference window was 17 February–16 March. For M2, the reference first round ran 27 March–8 June, with some second rounds 12 June–24 August. Select Informatique/MIAGE and the exact year; Mon Master, MyCandidature and Études en France routes depend on your profile.';
    basis='Estimated 2027 preparation window based on the official 2026–27 MIDO calendar; not a confirmed admission deadline.';
  } else if(p.slug==='trinity-computer-science-data-science') {
    heading='Prepare for the November 2026 application opening';
    timing='Trinity’s international admissions guidance says applications open by 1 November for September 2027 entry. Prepare transcripts, computing/programming evidence, CV and English-language evidence now. For your personal planning, aim to have the application ready in November–December 2026; the earlier course cycle closed at the end of January 2026. The live Data Science portal sets the actual closing date.';
    basis='University-wide 2027 opening guidance; November–December is an Althéa preparation target, not a course deadline.';
  }
  const documents=[p.level==='Bachelor'?'School-leaving qualification, subject marks and transcripts':'Bachelor’s qualification, full transcripts and grading scale','CV and a programme-specific statement of purpose','English/other teaching-language evidence or an accepted exemption','Academic references and any programme-specific portfolio, research proposal or test','Passport details and a separate tuition, living-cost and visa-funding plan'];
  return {heading,timing,basis,feeBudget,feeBudgetBasis:'Current listed fee plus an optional 10% budgeting cushion. This is an Althéa planning allowance, not a forecast of university fees, an invoice or a scholarship-adjusted price. Use the fee period above; a semester fee is not an annual fee.',living:universityCoverage[p.country],documents,source:p.slug==='trinity-computer-science-data-science'?'https://www.tcd.ie/study/international/':p.slug==='psl-computer-science'?'https://static2.dauphine.psl.eu/fileadmin/mediatheque/formations/candidatures/2025-2026/2026-2027_FR_Calendrier_candidatures_Masters_MIDO.pdf':p.deadline.source};
}
