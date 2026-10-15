/** JSON-LD must only describe information visibly supported on the page. */
export default function JsonLd({data}:{data:Record<string,unknown>}){
 const content=JSON.stringify(data).replace(/</g,"\\u003c");
 return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:content}}/>;
}
