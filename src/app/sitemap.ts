import type {MetadataRoute} from "next";
const base="https://consultancyworld2.web.app";
const routes=["/","/france","/france/universities","/france/programmes","/france/institutions","/france/campus-france","/france/resources","/france/scholarships","/france/visas","/france/living","/france/costs","/france/faq","/mentorship-model","/admissions-process","/scholarships","/faq"];
export default function sitemap():MetadataRoute.Sitemap{
 return routes.map((route)=>({url:base+route,changeFrequency:route==="/"?"weekly":"monthly",priority:route==="/"?1:route==="/france"?.9:.6}));
}
