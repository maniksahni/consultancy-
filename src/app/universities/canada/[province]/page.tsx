import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import Page from "@/components/althea/Page";
import Accordion from "@/components/maison/Accordion";
import JsonLd from "@/components/seo/JsonLd";
import { Facts, Notice, Prose, Section } from "@/components/maison/ui";
import { absoluteUrl } from "@/lib/seo";
import { canadianProvinces, type Dli } from "@/lib/worldInstitutions";

const find = (slug: string) => canadianProvinces().find((p) => p.slug === slug);
export function generateStaticParams() { return canadianProvinces().map((p) => ({ province: p.slug })); }

const PGWP: Record<string, string> = { Yes: "Yes", No: "No", Details: "Some programmes" };
export function generateMetadata({ params }: { params: { province: string } }) {
  const p = find(params.province);
  const yes = p ? p.dlis.filter((d) => d.pgwp === "Yes").length : 0;
  return pageMetadata(`/universities/canada/${params.province}`, {
    title: p ? (`PGWP-Eligible Colleges in ${p.name}`.length <= 39 ? `PGWP-Eligible Colleges in ${p.name}` : `${p.name} PGWP Colleges`) : "Canadian institutions",
    description: p ? `Every designated learning institution in ${p.name} (${p.dlis.length} DLIs) and whether it offers PGWP-eligible programmes: ${yes} yes, from the IRCC list.` : undefined,
  });
}

function Table({ rows }: { rows: Dli[] }) {
  return <div className="ms-guide-table" role="region" aria-label="Designated learning institutions" tabIndex={0}><table>
    <thead><tr><th scope="col">Institution</th><th scope="col">City</th><th scope="col">PGWP</th><th scope="col">DLI number</th></tr></thead>
    <tbody>{rows.map((d) => <tr key={d.dli + d.city}><th scope="row">{d.name}{d.campus ? ` · ${d.campus}` : ""}</th><td>{d.city}</td><td>{PGWP[d.pgwp] || d.pgwp}</td><td>{d.dli}</td></tr>)}</tbody>
  </table></div>;
}

export default function Province({ params }: { params: { province: string } }) {
  const p = find(params.province);
  if (!p) notFound();
  const path = `/universities/canada/${p.slug}`;
  const pub = p.dlis.filter((d) => d.isPublic), priv = p.dlis.filter((d) => !d.isPublic);
  const yes = p.dlis.filter((d) => d.pgwp === "Yes").length, some = p.dlis.filter((d) => d.pgwp === "Details").length;
  const faqs = [
    { q: `Which colleges in ${p.name} are PGWP-eligible?`, a: `On the IRCC designated learning institutions list, ${yes} of the ${p.dlis.length} DLIs in ${p.name} offer PGWP-eligible programmes, and ${some} more offer them only for some programmes or campuses. The tables on this page list each one.` },
    { q: "Does a PGWP-eligible college guarantee a PGWP?", a: "No. Your programme must also qualify: at least 8 months long, and for college diplomas and certificates, in an eligible field of study. You also need the required language score (CLB 7 for degrees, CLB 5 for college programmes)." },
    { q: `Is a private college in ${p.name} a good choice?`, a: "Check it is a DLI and that your exact programme is PGWP-eligible before you pay anything. Many private institutions do not offer PGWP-eligible programmes." },
  ];
  return <Page path={path} modified={p.sourceDate} eyebrow={`CANADA · ${p.name.toUpperCase()} · DESIGNATED LEARNING INSTITUTIONS`} title={`PGWP colleges in ${p.name}.`} accent="Every DLI, checked."
    intro={`${p.name} has ${p.dlis.length} designated learning institutions (DLIs) that can enrol international students. ${yes} offer programmes that lead to a post-graduation work permit (PGWP); ${some} do so only for some programmes. Here is the full list from IRCC.`}
    about={{ "@type": "AdministrativeArea", name: p.name, containedInPlace: { "@type": "Country", name: "Canada" } }}
    closing={{ kicker: "YOUR OWN PLAN", title: "Choosing a college", accent: `in ${p.name}?`, body: "Tell us your field, budget and goals. We will shortlist programmes that keep your PGWP and permanent residence options open.", href: "/book-consultation?destination=canada", action: "Book a consultation" }}>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", "@id": `${absoluteUrl(path)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
    <Section tone="ivory">
      <div className="ms-guide-facts"><Facts items={[{ label: "DLIs in " + p.name, value: String(p.dlis.length) }, { label: "Offer PGWP programmes", value: String(yes), note: `+${some} for some programmes` }, { label: "Public institutions", value: String(pub.length) }, { label: "Private institutions", value: String(priv.length) }]} /></div>
      <div className="ms-guide-body">
        <details className="ms-guide-block" open><summary><h2>What “PGWP” means in this list</h2></summary><Prose>
          <p><strong>Yes</strong>: the institution offers programmes that can lead to a post-graduation work permit. <strong>Some programmes</strong>: only certain programmes or campuses qualify. <strong>No</strong>: none of its programmes lead to a PGWP. Your own programme must still meet the PGWP rules on length, field of study and language. <Link href="/destinations/canada/after-graduation">PGWP rules in full</Link>.</p>
        </Prose></details>
        <details className="ms-guide-block" open><summary><h2>Public institutions ({pub.length})</h2></summary><Table rows={pub} /></details>
        {priv.length > 0 && <details className="ms-guide-block is-more"><summary><h2>Private institutions ({priv.length})</h2></summary><Table rows={priv} /></details>}
        <details className="ms-guide-block" open><summary><h2>Before you apply</h2></summary><Prose>
          <p>Most college and undergraduate students need a provincial attestation letter (PAL); master’s and PhD students at public institutions do not, since 1 January 2026. You must show CAD 23,448 for living costs (applications from 1 September 2026) on top of tuition, and you can work 24 hours a week off campus during term.</p>
          <p><Link href="/destinations/canada/visa">Canadian study permit for Indians</Link> · <Link href="/destinations/canada/costs">Cost of studying in Canada</Link> · <Link href="/universities/canada">Other provinces</Link></p>
        </Prose></details>
      </div>
    </Section>
    <Section tone="paper" kicker="QUICK ANSWERS" title="Your questions," accent="answered." align="split"><Accordion items={faqs.map((f) => ({ q: f.q, a: <p>{f.a}</p> }))} /></Section>
    <Section tone="ivory"><Notice kicker={`OFFICIAL DATA${p.sourceDate ? ` · ${p.sourceDate}` : ""}`}><p>From the Immigration, Refugees and Citizenship Canada (IRCC) list of designated learning institutions. IRCC updates the list often; check it, and your programme’s PGWP eligibility, before you pay a deposit.</p></Notice></Section>
  </Page>;
}
