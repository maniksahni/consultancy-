/** Shared public URL identity. Change NEXT_PUBLIC_SITE_URL only after the custom domain is live and redirects are configured. */
const supplied=process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const SITE_URL=(supplied&&/^https:\/\/[^/]+(?:\/)?$/.test(supplied)?supplied.replace(/\/$/,""):"https://consultancyworld2.web.app");
export const BRAND="Althéa Consulting";
export const SITE_DESC="Independent France study consultancy: compare official university programmes, understand Campus France and Études en France, and plan your admissions journey.";
export function absoluteUrl(path="/"){return SITE_URL+(path==="/"?"/":"/"+path.replace(/^\/+|\/+$/g,""));}
export function breadcrumbData(items:{name:string;path:string}[]){
 return {"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:items.map((item,index)=>({"@type":"ListItem",position:index+1,name:item.name,item:absoluteUrl(item.path)}))};
}
export function organizationData(){return {"@context":"https://schema.org","@graph":[
 {"@type":"Organization","@id":absoluteUrl("/#organization"),name:BRAND,alternateName:"Althea Consulting",url:absoluteUrl("/"),description:SITE_DESC},
 {"@type":"WebSite","@id":absoluteUrl("/#website"),name:BRAND,url:absoluteUrl("/"),inLanguage:"en",publisher:{"@id":absoluteUrl("/#organization")}}
]};}
