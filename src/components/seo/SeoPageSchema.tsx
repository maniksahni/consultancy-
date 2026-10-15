import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbData, BRAND } from "@/lib/siteSeo";
type Crumb={name:string;path:string};
export default function SeoPageSchema({path,title,description,breadcrumbs}:{path:string;title:string;description:string;breadcrumbs:Crumb[]}){
 const data={"@context":"https://schema.org","@graph":[
  {"@type":"WebPage","@id":absoluteUrl(path)+"#webpage",url:absoluteUrl(path),name:title,description,inLanguage:"en",isPartOf:{"@id":absoluteUrl("/#website")},publisher:{"@id":absoluteUrl("/#organization")}},
  {...breadcrumbData([{name:BRAND,path:"/"},...breadcrumbs]),"@id":absoluteUrl(path)+"#breadcrumbs"}
 ]};
 return <JsonLd data={data}/>;
}
