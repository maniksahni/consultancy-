// Public government dataset smoke-check; no auth, no private records.
const dataset="fr-esr-principaux-etablissements-enseignement-superieur";
const url="https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/"+dataset+"/records?limit=1&select=etablissement_id_paysage%2Cuo_lib%2Ccom_nom%2Creg_nom%2Curl";
const response=await fetch(url,{signal:AbortSignal.timeout(20000),headers:{"User-Agent":"AltheaStudyInFrance/1.0 (open data verification)","Accept":"application/json"}});
if(!response.ok)throw Error("Official registry HTTP "+response.status);
const body=await response.json();
const valid=Array.isArray(body.results)&&typeof body.total_count==="number"&&typeof body.results[0]?.uo_lib==="string";
if(!valid)throw Error("Registry API returned unexpected schema");
console.log("Official dataset API working; record count:",body.total_count,"sample institution:",body.results[0].uo_lib);
console.log("API CORS header:",response.headers.get("access-control-allow-origin")||"(not exposed in Node; check browser separately)");
