// Validate real Mon Master open-data records and search expression before release.
const base="https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-mon_master/records";
for(const params of ["limit=1","limit=1&where="+encodeURIComponent('search("informatique")')]){
 const u=base+"?"+params;const r=await fetch(u,{signal:AbortSignal.timeout(22000),headers:{Accept:"application/json"}});
 if(!r.ok)throw Error("Mon Master API responded "+r.status+": "+(await r.text()).slice(0,300));
 const body=await r.json();
 if(!Array.isArray(body.results)||typeof body.total_count!=="number")throw Error("Invalid Mon Master API response");
 const sample=body.results[0]||{};
 console.log("MON_MASTER_OK total="+body.total_count+" fields="+Object.keys(sample).join(",")+" sample="+JSON.stringify(sample).slice(0,500));
}
