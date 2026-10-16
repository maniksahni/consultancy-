/** Published course amounts take precedence. Benchmarks never overwrite source data. */
export type TuitionCourse = {
  id: string; institutionId: string; institution: string; name: string; level?: string; subject?: string;
  durationWeeks?: string; tuition: number | null; currency: string | null; tuitionPeriod?: string;
  tuitionBasis?: string; feeAcademicYear?: string; tuitionSource?: string; tuitionSourceUrl?: string;
  nonTuitionFee?: string;
};
export type FeeContext = {
  reviewedAt?: string; sourceUrl?: string; academicYear?: string;
  courses?: Record<string, { sector: string; apprenticeship: boolean; courseUrl: string }>;
  institutions?: Record<string, Record<string, number>>;
  ranges?: Record<string, { low: number; high: number; count: number }>;
};
export type TuitionSummary = { headline: string; detail: string; period: string; source: string; sourceUrl: string; low: number; high: number; currency: string; estimated: boolean };
const FR = 'https://www.campusfrance.org/fr/cout-etudes-superieures-france-frais-inscription';
const UK = 'https://study-uk.britishcouncil.org/moving-uk/cost-studying';
const AU = 'https://cricos.education.gov.au/';
const currencies: Record<string,string> = { france:'EUR',uk:'GBP',usa:'USD',australia:'AUD',canada:'CAD',germany:'EUR',ireland:'EUR' };
const formatters = new Map<string, Intl.NumberFormat>();
const money = (n:number,currency:string) => {
  let formatter = formatters.get(currency);
  if (!formatter) { formatter = new Intl.NumberFormat('en-GB',{style:'currency',currency,maximumFractionDigits:0}); formatters.set(currency, formatter); }
  return formatter.format(n);
};
function estimate(low:number,high:number,currency:string,detail:string,source:string,sourceUrl:string,period='Planning estimate · annual tuition'):TuitionSummary {
  return {low,high,currency,estimated:true,headline:`${money(low,currency)}${high!==low?`–${money(high,currency)}`:''} / year (approx.)`,detail,source,sourceUrl,period};
}
function usLevel(c:TuitionCourse) {
  if (/first professional/i.test(c.level||'')) return 'professional';
  return /master|doctoral|graduate\/professional|post-baccalaureate/i.test(c.level||'')?'graduate':'undergraduate';
}
// Sort peers once per catalogue, rather than rescanning 25,000 records for every card.
export function createTuitionResolver(country:string,records:TuitionCourse[],context:FeeContext={}) {
  const currency=currencies[country]||'EUR';
  const groups=new Map<string,number[]>();
  if(country==='australia') for(const r of records) {
    const weeks=Number(r.durationWeeks);
    if(r.tuition===null||r.tuition<=0||weeks<=0||!Number.isFinite(weeks))continue;
    const annual=r.tuition*52/weeks;
    for(const key of ['all',`level:${r.level}`,`field:${r.level}:${r.subject}`]) {
      const a=groups.get(key)||[];a.push(annual);groups.set(key,a);
    }
  }
  const peerRanges=new Map([...groups].map(([k,a])=>{a.sort((a,b)=>a-b);return[k,{low:Math.round(a[Math.floor((a.length-1)*.1)]),high:Math.round(a[Math.ceil((a.length-1)*.9)]),count:a.length}] as const;}));
  return (c:TuitionCourse):TuitionSummary => {
    const cur=c.currency||currency;
    if(c.tuition!==null && Number.isFinite(c.tuition) && c.tuition>=0) {
      const weeks=Number(c.durationWeeks);
      const annual=country==='australia'&&weeks>0?c.tuition*52/weeks:c.tuition;
      const period=country==='australia'?'total registered course tuition':c.tuitionPeriod||'published source amount';
      return {low:c.tuition,high:c.tuition,currency:cur,estimated:false,headline:`${money(c.tuition,cur)} ${period}`,period:`Published fee${c.feeAcademicYear?` · ${c.feeAcademicYear}`:''}`,
        detail:country==='australia'&&weeks>0?`Annual equivalent: approximately ${money(annual,cur)} per 52 weeks, pro-rated from the ${weeks}-week registered duration. This is not a separate annual provider quote.`:`${c.tuitionBasis||'Published tuition'}. ${c.nonTuitionFee||'Living expenses, travel, insurance and any additional charges are separate.'}`,
        source:c.tuitionSource|| (country==='australia'?'Australian Government CRICOS':'Official programme fee schedule'),sourceUrl:c.tuitionSourceUrl||(country==='australia'?AU:'')};
    }
    if(country==='france') {
      const info=context.courses?.[c.id];
      const text=`${c.level||''} ${c.name}`;
      if(info?.apprenticeship || /en apprentissage/i.test(c.name))return estimate(0,0,'EUR','Apprenticeship tuition is covered under an eligible apprenticeship contract. An employer contract and the right to work/study are required; this does not guarantee international eligibility. Living costs and personal expenses are separate.','Parcoursup · apprenticeship funding','https://www.parcoursup.gouv.fr/trouver-une-formation/zoom-sur-les-formations-en-apprentissage-1634','Conditional funded route · annual tuition');
      if(info?.sector==='Publics') {
        if(/BTS/i.test(c.level||''))return estimate(0,0,'EUR','Public BTS enrolment has no tuition registration charge. Equipment, accommodation and personal expenses may still apply.','Service Public · public BTS','https://www.service-public.gouv.fr/particuliers/vosdroits/F2865','Public BTS fee rule · tuition only');
        if(/licence|\bBUT\b/i.test(c.level||''))return estimate(178,2902,'EUR','2026–27 national undergraduate fee benchmarks: €178 for EU/EEA/Swiss or eligible exempt students; €2,902 differentiated non-EU rate where applicable. Provider exemptions and specific diplomas change the amount. CVEC and living expenses are extra.','Campus France · 2026–27 national undergraduate fees',FR,'Fee-status benchmark · 2026–27');
        if(/ingénieur/i.test(text))return estimate(630,2620,'EUR','2026–27 public engineering benchmarks: €630 standard MESR rate; €2,620 at specified Centrale/Mines schools. Other supervising ministries and individual schools can charge different fees. CVEC and living expenses are extra.','Campus France · public engineering benchmarks',FR,'Public engineering benchmark · 2026–27');
        // Other public diplomas have specific rules: do not mislabel them as a Licence.
        return estimate(178,3950,'EUR','Broad public higher-education planning envelope using 2026–27 national registration-fee benchmarks. This is not a tariff for this specific diploma; CPGE, health, arts and other specialist routes have separate rules and may be free or cost more. Check the linked official course fiche for its applicable charge.','Campus France · national registration-fee benchmarks',FR,'Broad public-sector estimate · 2026–27');
      }
      return estimate(6000,18000,'EUR',`${info?.sector?`${info.sector}. `:''}Campus France’s general annual private-school tuition range; not a course-specific quote or a maximum. Contracted schools can cost less and some specialist/business schools cost more. Scholarships, fee status and course route can change the amount. Living costs are separate.${!info?' Public/private status could not be matched; this is a conservative private-sector planning scenario, not a classification of this institution.':''}`,'Campus France · general private-school benchmark',FR,'General private-sector planning range');
    }
    if(country==='uk') {
      const pg=/postgraduate|master|doctoral/i.test(c.level||'');
      return estimate(pg?9000:11400,pg?30000:38000,'GBP',`British Council international ${pg?'postgraduate':'undergraduate'} tuition range, used as a country-level planning benchmark rather than a price for this course. Clinical medicine, dentistry and some premium courses can exceed this range. Living costs and additional charges are separate; confirm the intake-specific fee with the provider.`,'British Council · Study UK',UK,'International country benchmark · annual tuition');
    }
    if(country==='usa') {
      const level=usLevel(c);const row=context.institutions?.[c.institutionId];
      const exact=row?.[level];
      const year=context.academicYear||'2023–24';
      if(exact!==undefined)return estimate(exact,exact,'USD',`${year} institution-wide average out-of-state ${level} tuition and required fees, used as an approximate budget for this historical programme record. It is not this programme’s current or confirmed international tuition; specialist programmes and subsequent years can differ. Housing, meals and insurance are extra.`,'NCES IPEDS · institution tuition and required fees',context.sourceUrl||'https://nces.ed.gov/ipeds/use-the-data/download-access-database',`Historical institution benchmark · ${year}`);
      const range=context.ranges?.[level] || {low:6598,high:42930,count:3536};
      return estimate(range.low,range.high,'USD',`${year} NCES IPEDS 10th–90th percentile of ${range.count.toLocaleString('en-GB')} positive out-of-state ${level} tuition-and-required-fee records. Institution/level fee was unavailable, so this is a broad peer benchmark, not a provider quote or current fee. Some programmes fall outside this range. Housing, meals and insurance are extra.`,'NCES IPEDS · national peer estimate',context.sourceUrl||'https://nces.ed.gov/ipeds/datacenter/data/IC2023_AY.zip',`Historical peer estimate · ${year}`);
    }
    if(country==='australia') {
      const field=peerRanges.get(`field:${c.level}:${c.subject}`);const level=peerRanges.get(`level:${c.level}`);
      const p=field&&field.count>=5?field:level&&level.count>=5?level:peerRanges.get('all');
      if(p)return estimate(p.low,p.high,'AUD',`10th–90th percentile of ${p.count.toLocaleString('en-GB')} published CRICOS ${p===field?'same-level, same-field':p===level?'same-level':'all priced'} course records, annualised using registered duration. Planning comparison only; not a provider quote. Living costs and additional charges are separate.`,'Australian Government CRICOS · calculated peer range',AU,'CRICOS peer estimate · annualised');
    }
    throw new Error(`No sourced tuition benchmark for ${country}: ${c.id}`);
  };
}
