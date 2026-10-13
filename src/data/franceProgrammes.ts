/**
 * Manually verified programme examples from public university programme listings.
 * Checked 2026-10-14. Not a full catalogue, not live admission availability.
 * Official pages, not Althéa or Campus France, control requirements and applications.
 */
export type FranceProgramme = {
 id:string; title:string; institution:string; city:string; level:"Bachelor"|"Master";
 field:"AI & Technology"|"Business"|"Physics"|"Science"; language:string;
 sourceUrl:string; checkedAt:string; note:string;
};
export const franceProgrammes:FranceProgramme[]=[
 {id:"ups-ai",title:"M1 Artificial Intelligence",institution:"Université Paris-Saclay",city:"Paris region",level:"Master",field:"AI & Technology",language:"English-taught programme listing",sourceUrl:"https://www.universite-paris-saclay.fr/en/education/masters-programmes-taught-english",checkedAt:"2026-10-14",note:"Listed in the university’s official English-taught Master's directory."},
 {id:"ups-ibus",title:"M1 International Business and Sustainability",institution:"Université Paris-Saclay",city:"Paris region",level:"Master",field:"Business",language:"English-taught programme listing",sourceUrl:"https://www.universite-paris-saclay.fr/en/education/masters-programmes-taught-english",checkedAt:"2026-10-14",note:"Check the programme page for precise entry and language conditions."},
 {id:"ups-dkai",title:"M1 Data, Knowledge and Hybrid Artificial Intelligence",institution:"Université Paris-Saclay",city:"Paris region",level:"Master",field:"AI & Technology",language:"English-taught programme listing",sourceUrl:"https://www.universite-paris-saclay.fr/en/education/masters-programmes-taught-english",checkedAt:"2026-10-14",note:"Listed within the university's English-taught Master's selections."},
 {id:"psl-ai",title:"International Bachelor of Science in AI",institution:"Université PSL",city:"Paris",level:"Bachelor",field:"AI & Technology",language:"English",sourceUrl:"https://psl.eu/en/programs-and-tracks-taught-english",checkedAt:"2026-10-14",note:"Check PSL admissions for the applicant's country-specific route."},
 {id:"sorbonne-physics",title:"Paris Physics Master",institution:"Sorbonne Université",city:"Paris",level:"Master",field:"Physics",language:"English",sourceUrl:"https://www.sorbonne-universite.fr/en/programs-english",checkedAt:"2026-10-14",note:"Programme details and current application rules are on Sorbonne's website."},
 {id:"bordeaux-business",title:"Business Administration — International Master",institution:"Université de Bordeaux",city:"Bordeaux",level:"Master",field:"Business",language:"English",sourceUrl:"https://www.u-bordeaux.fr/en/international/come-to-bordeaux/international-students/international-study-programmes",checkedAt:"2026-10-14",note:"International Master's offerings and conditions are maintained by the university."},
 {id:"bordeaux-chemistry",title:"Analytical Chemistry for Drugs and Natural Products",institution:"Université de Bordeaux",city:"Bordeaux",level:"Master",field:"Science",language:"English",sourceUrl:"https://wwwprod.u-bordeaux.fr/en/international/come-to-bordeaux/international-students/international-study-programmes/masters-english",checkedAt:"2026-10-14",note:"Featured on Bordeaux's official international Master's listing."}
];
