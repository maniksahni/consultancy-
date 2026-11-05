import { pageMetadata } from "@/lib/seo";
import {notFound} from 'next/navigation';import {programmeResearch} from '@/data/programmeResearch';import ProgrammeEvidence from '@/components/althea/ProgrammeEvidence';
export function generateStaticParams(){return programmeResearch.map(p=>({slug:p.slug}));}
// Falls back to "<institution> <level>" when a programme's own title would push the "<title> | Althéa
// Consulting" search title past 60 chars - so a newly added long-titled programme (the exact thing that
// silently broke the daily build for two days straight) degrades gracefully instead of failing the build.
// Two programmes at the same institution/level can still collide; searchTitles above is the escape hatch.
function autoTitle(p: { title: string; institution: string; level: string }): string {
  if (p.title.length <= 38) return p.title;
  const institution = p.institution.split(/[–—(,]/)[0].trim();
  const short = `${institution} ${p.level}`;
  return short.length <= 38 ? short : institution.slice(0, 38);
}
const searchTitles:Record<string,string>={
  "bath-operations-logistics":"Bath MSc Operations & Supply Chain",
  "tse-international-economics":"TSE International Economics MSc",
  "melbourne-data-science":"Melbourne Data Science MSc",
  "rmit-data-science":"RMIT Data Science Master's",
  "uci-data-science":"UC Irvine Data Science Master's",
  "agroparistech-master-aetpf-nancy":"AgroParisTech Forests & Environment MSc",
  "aix-marseille-econometrics-statistics":"Aix-Marseille Econometrics M1",
  "angers-master-droit-international":"Angers Master in International Law",
  "arts-et-metiers-master":"Arts et Métiers MSc Programme",
  "aup-undergraduate":"AUP Undergraduate Programmes",
  "bordeaux-wintour":"Bordeaux WINTOUR Enotourism MSc",
  "brest-ubo-master-biologie-marine":"UBO Brest Marine Biology Master",
  "caen-iae-international-management":"Caen IAE International Management",
  "centrale-lille-biomedical":"Centrale Lille Biomedical Eng. MSc",
  "centrale-lyon-master":"Centrale Lyon International Master's",
  "centralesupelec-industry-transformation-management":"CentraleSupélec Transformation MSc",
  "clermont-auvergne-master-relations-internationales":"Clermont Auvergne IR Master",
  "corse-universita-general":"Université de Corse Licence/Master",
  "dauphine-management-international":"Dauphine Int'l Management Master",
  "edhec-master-in-management":"EDHEC Master in Management",
  "emlyon-international-marketing-business-development":"emlyon Int'l Marketing & Biz Dev MSc",
  "ensae-paris-engineering":"ENSAE Paris Engineering Cycle",
  "ensisa-uha-master-electronique":"ENSISA UHA Electronics Master",
  "escp-international-business-diplomacy":"ESCP Int'l Business & Diplomacy MSc",
  "essca-grande-ecole-bachelor":"ESSCA Grande École Bachelor",
  "evry-licence-double-diplome-info-bio":"Évry Dual Licence: CS & Life Sciences",
  "grenoble-alpes-bachelor":"Grenoble Alpes Licence (Bachelor)",
  "insa-lyon-international-bachelor":"INSA Lyon Int'l Engineering Bachelor",
  "lemans-universite-general":"Le Mans Université Licence/Master",
  "limoges-master":"Université de Limoges Master's",
  "montpellier3-licence-llcer":"Montpellier 3 Licence LLCER",
  "nanterre-licence-anthropologie":"Nanterre Licence Anthropology",
  "nantes-graduate-programmes":"Nantes Université Graduate Programmes",
  "neoma-master-management":"NEOMA Master in Management",
  "nice-data-science-ai":"Nice MSc Data Science & AI",
  "paris-saclay-mibs":"Paris-Saclay Int'l Business MSc",
  "pau-uppa-master":"UPPA Pau Master's Programmes",
  "perpignan-master-tourisme":"Perpignan Master in Tourism",
  "sciencespo-international-affairs":"Sciences Po Int'l Affairs Master's",
  "sciencespo-undergraduate-college":"Sciences Po Undergraduate College",
  "skema-two-year-msc":"SKEMA Two-Year MSc Programme",
  "tours-idoh":"Tours IDOH+ Infectious Diseases",
  "ulco-master-international-trade":"ULCO Master in Int'l Trade",
  "cy-cergy-licence-droit":"CY Cergy Paris Licence Droit",
  "nimes-licence-droit":"Nîmes Licence Droit (Law)",
  "poitiers-licence-droit":"Poitiers Licence Droit",
  "uha-licence-droit":"UHA Mulhouse Licence Droit",
  "ieseg-bachelor-international-business":"IÉSEG Bachelor Int'l Business",
  "inseec-bachelor-international-business":"INSEEC Bachelor Int'l Business",
  "lorraine-licence-histoire":"Lorraine Licence Histoire",
  "umlp-franche-comte-licence-histoire":"Franche-Comté Licence Histoire",
  "sorbonne-computer-science":"Sorbonne Computer Science MSc",
  "uci-computer-science":"UC Irvine Computer Science Master's",
};
export function generateMetadata({params}:{params:{slug:string}}){const p=programmeResearch.find(p=>p.slug===params.slug);const description=p?(p.slug==="bath-operations-logistics"?"Bath MSc in operations and supply chain: published tuition, entry requirements and application timing.":[`${p.title} at ${p.institution}, ${p.city}: published tuition, entry requirements, application deadlines and living costs for international students.`,`${p.title} at ${p.institution}, ${p.city}: published tuition, entry requirements, deadlines and living costs.`,`${p.title} at ${p.institution}: published tuition, requirements and application timing.`].find(d=>d.length<=160)):undefined;return pageMetadata(`/programmes/${params.slug}`, {title:searchTitles[params.slug]||(p&&autoTitle(p))||'Programme', description });}
export default function Programme({params}:{params:{slug:string}}){const p=programmeResearch.find(p=>p.slug===params.slug);if(!p)notFound();return <ProgrammeEvidence p={p}/>}
