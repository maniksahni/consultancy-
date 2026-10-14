import { brand } from "@/config/brand";
import {studyKnowledge} from "./studyKnowledge";
export type FrenchGuide = {
 slug:"scholarships"|"visas"|"living"|"costs"|"faq";
 eyebrow:string;title:string;accent:string;summary:string;
 entries:{title:string;description:string;source:string;url:string}[];
 questions?:{q:string;a:string;url:string}[];
};
export const guides:FrenchGuide[]=[
 {slug:"scholarships",eyebrow:"Les bourses / Funding",title:"Funding your",accent:"French future.",summary:"Scholarships are specific to a student's profile and chosen institution. Explore recognised funding programmes, learn who submits the application and confirm every current deadline with the awarding body.",entries:[
  {title:"Campus Bourses",description:"Use the official scholarship search tool to explore funding by nationality, field and degree level. Check each award provider's conditions.",source:"Campus France · Official scholarship search",url:"https://campusbourses.campusfrance.org/"},
  {title:"France Excellence Eiffel",description:"For eligible high-achieving candidates pursuing Master's or PhD studies. French institutions submit nominations, not the student directly. Confirm the current session and institutional deadline.",source:"Campus France · Eiffel scholarship",url:"https://www.campusfrance.org/en/the-france-excellence-eiffel-scholarship-program"},
  {title:"University funding",description:"Many institutions offer scholarships or financial assistance through individual admissions and international-office pages. Examine your intended university directly.",source:"Campus France · Scholarship overview",url:"https://www.campusfrance.org/fr/bourses-etudiants-etrangers"}
 ]},
 {slug:"visas",eyebrow:"Le visa / Official guidance",title:"Your visa,",accent:"clearly explained.",summary:"Your visa type and document requirements depend on your nationality, residence, length of study and acceptance. France-Visas is the authority for verifying applicable instructions.",entries:[
  {title:"France-Visas: Student",description:"Official student visa categories and eligibility requirements, including rules for short- and longer-duration courses.",source:"French government · France-Visas",url:"https://www.france-visas.gouv.fr/en/web/france-visas/etudiant"},
  {title:"Study and training visa overview",description:"Review the visa application journey, supporting documents and online assistant before making plans.",source:"French government · France-Visas",url:"https://www.france-visas.gouv.fr/en/web/france-visas/etudier-se-former"},
  {title:"Études en France application procedure",description:"The process for applicants residing in designated countries, including India, can form part of the admissions-to-visa journey.",source:"Campus France · Études en France",url:"https://www.campusfrance.org/en/application-etudes-en-france-procedure?lang=en"}
 ]},
 {slug:"living",eyebrow:"La vie étudiante / Arrival",title:"A life,",accent:"well prepared.",summary:"From an accommodation plan to living costs, arriving in France is easier when the practical details are researched early. Use trusted official sources and protect yourself from housing scams.",entries:[
  {title:"Finding student accommodation",description:"Understand public student residences, private accommodation, shared flats, rental deposits and guarantor options.",source:"Campus France · Housing guide",url:"https://www.campusfrance.org/en/student-housing-france"},
  {title:"Budgeting for studies in France",description:"Tuition charges vary by institution, degree, citizenship and exemptions. Check both the national guidance and your specific programme.",source:"Campus France · Tuition information",url:"https://www.campusfrance.org/en/tuition-fees-France"},
  {title:"Student visa steps",description:"Prepare supporting documents, finances and visa formalities using the official France-Visas assistant.",source:"French government · France-Visas",url:"https://www.france-visas.gouv.fr/en/web/france-visas/etudiant"}
 ]},
 {slug:"costs",eyebrow:"Le budget / Costs",title:"Plan with",accent:"open eyes.",summary:"There is no single price for studying in France. Public, private, EU and non-EU programmes can differ substantially, and exemptions may apply. Budget tuition, housing, insurance, travel and living expenses separately.",entries:[
  {title:"Tuition in public institutions",description:"Campus France maintains registration-fee guidance for each academic year. Non-EU differentiated fees may apply unless a candidate qualifies for an exemption.",source:"Campus France · Tuition overview",url:"https://www.campusfrance.org/en/tuition-fees-France"},
  {title:"Tuition in private institutions",description:"Private schools set their own fees. Ask each university for a written programme-specific schedule of tuition and other mandatory costs.",source:"French government · Official fee guidance",url:"https://www.service-public.gouv.fr/particuliers/vosdroits/F2865"},
  {title:"Housing and rental support",description:"Compare costs by city and understand possible housing assistance; eligibility is not automatic.",source:"Campus France · Student accommodation",url:"https://www.campusfrance.org/en/student-housing-france"}
 ]},
 {slug:"faq",eyebrow:"Les questions / FAQ",title:"The questions",accent:"that matter.",summary:"Straight answers about French higher education, application pathways and what independent consultancy guidance can and cannot promise.",entries:[
  {title:"Verify your university",description:"Begin with universities' own admissions pages rather than unverified listings and outdated fee claims.",source:"Campus France · Programme finder",url:"https://www.campusfrance.org/en/finding-a-university-programme-France"},
  {title:"Check the application procedure",description:"Nationality, residence and study level determine whether Études en France, DAP, Parcoursup or an institution route applies.",source:"Campus France · Application guide",url:"https://www.campusfrance.org/en/application-etudes-en-france-procedure?lang=en"}
 ],questions:[
  {q:"Do I need to apply through Études en France?",a:"India is among the countries covered by Études en France. Your qualification, citizenship, chosen programme and study level determine the exact procedure; check Campus France and your university.",url:"https://www.campusfrance.org/en/application-etudes-en-france-procedure?lang=en"},
  {q:"Are tuition fees the same for every university?",a:"No. Public and private institutions, programme types, citizenship, academic year and exemptions can all affect the amount. Confirm the fee with the institution.",url:"https://www.campusfrance.org/en/tuition-fees-France"},
  {q:`Can ${brand.shortName} guarantee admission or a visa?`,a:"No. Universities decide admissions, and the French authorities decide visas. We help organise the process, not promise a result.",url:"https://www.france-visas.gouv.fr/en/web/france-visas/etudiant"},
  {q:"How do Eiffel scholarship applications work?",a:"The French higher-education institution submits Eiffel applications; students cannot submit an application to Campus France directly. Institution deadlines can be earlier than the national deadline.",url:"https://www.campusfrance.org/en/the-france-excellence-eiffel-scholarship-program"},
  {q:"Can I apply to English-taught programmes?",a:"Yes, some universities provide programmes taught partly or fully in English. The language of instruction and proof needed vary by programme.",url:"https://www.campusfrance.org/en/finding-a-university-programme-France"},
  {q:"When should I arrange accommodation?",a:"Start early, compare legitimate options and avoid paying unverified landlords. Refer to the Campus France guide for residence types and practical guidance.",url:"https://www.campusfrance.org/en/student-housing-france"}
 ]}
];
export function getGuide(slug:string){return guides.find(g=>g.slug===slug);}

for (const guide of guides) { const topic:Record<string,string>={costs:"Costs",visas:"Visa",scholarships:"Scholarships"}; const record=studyKnowledge.find(e=>e.country==="france"&&e.topic===topic[guide.slug]); if(record)guide.entries.unshift({title:record.title,description:record.summary+" Source review: 14 October 2026. "+record.basis+".",source:record.publisher,url:record.source}); }
