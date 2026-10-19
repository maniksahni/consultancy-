import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import Page from "@/components/althea/Page";
import Accordion from "@/components/maison/Accordion";
import JsonLd from "@/components/seo/JsonLd";
import { Checklist, Facts, Notice, Prose, Section, Steps } from "@/components/maison/ui";
import { cityGuideFor, frenchInstitution, frenchInstitutions, type Institution } from "@/lib/frenchInstitutions";
import { absoluteUrl } from "@/lib/seo";

/** Fees for non-EU students at public institutions, 2026–27; the same figures as the France costs chapter. */
const PUBLIC_FEES = "€2,902 a year for a Licence (bachelor’s) and €3,950 for a Master at public institutions for non-EU students in 2026–27 (EU rates €178 and €255; PhD €398 for everyone)";
const PER_LEVEL = 25;

export function generateStaticParams() { return frenchInstitutions().map((i) => ({ slug: i.slug })); }

/** Standard abbreviations so long French names stay readable and distinct in a search result. */
const abbreviate = (name: string) => name
  .replace(/^École nationale supérieure d['’]architecture (de |d['’])/i, "ENSA ")
  .replace(/^Institut national des sciences appliquées (de |d['’])/i, "INSA ")
  .replace(/^École nationale supérieure (de |d['’]|des )?/i, "ENS ")
  .replace(/^École normale supérieure (de |d['’])?/i, "ENS ")
  .replace(/^Institut d['’]études politiques (de |d['’])/i, "Sciences Po ");

function titleFor(i: Institution): string | { absolute: string } {
  for (const t of [`${i.name} for Indian Students`, `${i.name}: Courses & Fees`, i.name]) if (t.length <= 39) return t;
  const short = abbreviate(i.name);
  if (short.length <= 39) return short;
  // Still too long: keep the start of the name and add the city, so sister schools stay distinct.
  const city = i.city.replace(/\s+\d+e$/, "");
  return { absolute: short.length <= 60 ? short : `${short.slice(0, 54 - city.length).replace(/\s+\S*$/, "")}… (${city})` };
}
function descriptionFor(i: Institution) {
  const what = i.courses.length ? `${i.courses.length} programmes on Parcoursup 2026` : `${i.typeLabel.toLowerCase().split(" (")[0]} in ${i.city}`;
  const d = `${i.name} (${i.city}) for Indian students: ${what}, ${i.isPublic ? "public" : "private"} status, fees for non-EU students and how to apply through Campus France.`;
  // Apostrophes are escaped in HTML (&#x27;), so keep a margin under the 160-character limit.
  const fit = (s: string) => s.length + (s.match(/['"&]/g) || []).length * 5 <= 158;
  if (fit(d)) return d;
  const short = `${i.name} (${i.city}): ${what}, fees for non-EU students and how to apply from India.`;
  if (fit(short)) return short;
  const name = i.name.length > 70 ? `${i.name.slice(0, 70).replace(/\s+\S*$/, "")}…` : i.name;
  return `${name}: courses, fees for non-EU students and how to apply from India.`;
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const i = frenchInstitution(params.slug);
  return pageMetadata(`/france/universities/${params.slug}`, { title: i ? titleFor(i) : "French institution", description: i ? descriptionFor(i) : undefined });
}

export default function InstitutionPage({ params }: { params: { slug: string } }) {
  const i = frenchInstitution(params.slug);
  if (!i) notFound();
  const path = `/france/universities/${i.slug}`;
  const city = i.city.replace(/\s+\d+e$/, "");
  const cityGuide = cityGuideFor(i.city);
  const levels = [...new Set(i.courses.map((c) => c.level))].map((level) => ({ level, items: i.courses.filter((c) => c.level === level) })).sort((a, b) => b.items.length - a.items.length);
  const apprenticeships = i.courses.filter((c) => c.apprenticeship).length;
  const fee = i.isPublic
    ? `Public status alone does not confirm a programme’s tuition. National-degree fee benchmarks are ${PUBLIC_FEES}. Different tariffs and exemptions can apply; ask ${i.name} for the fee for your exact programme, applicant category and academic year.`
    : `${i.name} is a private institution and sets its own tuition, usually much higher than public university fees. Ask the school for the fee for your programme and year before you apply.`;
  const faqs = [
    { q: `How much does ${i.name} cost for Indian students?`, a: fee },
    { q: `How do Indian students apply to ${i.name}?`, a: `First check ${i.name}’s instructions for your exact programme, nationality and country of residence. Applicants living in India should check Campus France India’s Études en France procedure alongside the institution’s application route. A catalogue listing does not establish eligibility, an application portal or a current deadline.` },
    { q: `Where is ${i.name}?`, a: `${i.name} is in ${city}${i.region ? `, ${i.region}` : ""}, France.${i.enrolment ? ` It had about ${Math.round(i.enrolment).toLocaleString("en-IN")} students enrolled in ${i.enrolmentYear}.` : ""}` },
  ];
  const facts = [
    { label: "City", value: city, note: i.region },
    { label: "Type", value: i.typeLabel.split(" (")[0], note: i.isPublic ? "Public" : "Private" },
    ...(i.enrolment ? [{ label: "Students enrolled", value: Math.round(i.enrolment).toLocaleString("en-IN"), note: i.enrolmentYear }] : []),
    ...(i.courses.length ? [{ label: "First-year programmes", value: String(i.courses.length), note: apprenticeships ? `${apprenticeships} as alternance` : "Parcoursup 2026" }] : []),
  ];
  return <Page path={path} modified={i.sourceDate} eyebrow={`FRANCE · ${i.typeLabel.split(" (")[0].toUpperCase()} · ${city.toUpperCase()}`} title={i.name} accent="for Indian students."
    intro={`${i.name}${i.nativeName && i.nativeName !== i.name ? ` (${i.nativeName})` : ""} is a ${i.isPublic ? "public" : "private"} ${i.typeLabel.split(" (")[0].toLowerCase()} in ${city}, France. ${i.courses.length ? `It lists ${i.courses.length} first-year programmes on Parcoursup 2026. ` : ""}Here is what it offers, what it costs for students from India and how to apply.`}
    about={{ "@type": "CollegeOrUniversity", name: i.name, ...(i.nativeName ? { alternateName: i.nativeName } : {}), identifier: { "@type": "PropertyValue", propertyID: "UAI", value: i.identifier }, address: { "@type": "PostalAddress", addressLocality: city, ...(i.region ? { addressRegion: i.region } : {}), addressCountry: "FR" } }}
    closing={{ kicker: "YOUR OWN PLAN", title: `Thinking about ${i.name}?`, accent: "Let’s check the fit.", body: "Bring your marks, budget and timeline. We will tell you honestly whether this institution suits you, and what to apply for alongside it.", href: "/book-consultation?destination=france", action: "Book a consultation" }}>
    <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", "@id": `${absoluteUrl(path)}#faq`, mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
    <Section tone="ivory">
      <div className="ms-guide-facts"><Facts items={facts} /></div>
      <div className="ms-guide-body">
        {levels.length ? <>
          <details className="ms-guide-block" open><summary><h2>Programmes at {i.name}</h2></summary>
            <Prose><p>These are the first-year programmes {i.name} lists on Parcoursup 2026, the French government catalogue. A catalogue listing is not an application instruction for students in India: confirm the route with the institution and Campus France India. Mon Master can help you research national master’s degrees, but its application eligibility depends on nationality and residence; do not assume it is your application portal.</p></Prose>
          </details>
          {levels.map(({ level, items }, n) => <details key={level} className={`ms-guide-block${n > 1 ? " is-more" : ""}`} open={n <= 1}>
            <summary><h2>{level} ({items.length})</h2></summary>
            <Checklist columns={items.length > 6 ? 2 : 1} items={items.slice(0, PER_LEVEL).map((c) => <>{c.name}{c.apprenticeship ? " · alternance" : ""}{c.city && c.city.replace(/\s+\d+e$/, "") !== city ? ` · ${c.city}` : ""}</>)} />
            {items.length > PER_LEVEL && <Prose><p>And {items.length - PER_LEVEL} more. <Link href={`/universities?country=france&view=courses&q=${encodeURIComponent(i.name)}`}>Search all {i.name} programmes</Link>.</p></Prose>}
          </details>)}
        </> : <details className="ms-guide-block" open><summary><h2>Programmes at {i.name}</h2></summary>
          <Prose><p>{i.name} does not list first-year programmes on Parcoursup 2026. Check its own website for master’s, doctoral or specialised programmes. Mon Master lists national master’s degrees, but does not cover every specialised qualification or applicant route. <Link href={`/universities?country=france&q=${encodeURIComponent(city)}`}>See other institutions in {city}</Link>.</p></Prose>
        </details>}
        <details className="ms-guide-block" open><summary><h2>Fees for students from India</h2></summary>
          <Prose><p>{fee}</p><p>Check whether the CVEC student life contribution applies to your enrolment or whether you qualify for an exemption, and budget for living costs in {city}. <Link href="/france/costs">See the full cost of studying in France</Link>.</p></Prose>
        </details>
        <details className="ms-guide-block" open><summary><h2>How to apply from India</h2></summary>
          <Steps items={[
            { title: "Pick the programme", body: <p>Check the entry level, language of teaching and your eligibility. <Link href="/france/admissions">Admission requirements in France</Link>.</p> },
            { title: "Confirm your application route", body: <p>Check {i.name}’s programme-specific instructions and the Campus France procedure applicable to your residence and nationality before choosing a portal. <Link href="/campus-france-guide">The Campus France process, step by step</Link>.</p> },
            { title: "Accept the offer and get the visa", body: <p>Once {i.name} accepts you, confirm on the platform and apply for the long-stay student visa. <Link href="/france/visas">France student visa for Indians</Link>.</p> },
            { title: "Arrive and settle", body: <p>Housing, bank, health cover and validating your visa in the first weeks. <Link href={cityGuide || "/first-30-days-france"}>{cityGuide ? `Studying in ${city}` : "Your first 30 days in France"}</Link>.</p> },
          ]} />
        </details>
      </div>
    </Section>
    <Section tone="paper" kicker="QUICK ANSWERS" title="Your questions," accent="answered." align="split">
      <Accordion items={faqs.map((f) => ({ q: f.q, a: <p>{f.a}</p> }))} />
    </Section>
    <Section tone="ivory">
      <Notice kicker={`OFFICIAL DATA · ${i.sourceDate}`}>
        <p>Application-route evidence: <a href="https://www.inde.campusfrance.org/application-and-admission-procedure" target="_blank" rel="noopener noreferrer">Campus France India application procedure</a> · <a href="https://www.campusfrance.org/fr/candidature-enseignement-superieur-france" target="_blank" rel="noopener noreferrer">Campus France: choosing the correct admissions platform</a>. Check the live institution calendar before applying.</p>
        <p>Fee evidence: <a href="https://www.campusfrance.org/en/tuition-fees-France" target="_blank" rel="noopener noreferrer">Campus France tuition guidance</a> · <a href="https://www.service-public.gouv.fr/particuliers/vosdroits/F2865" target="_blank" rel="noopener noreferrer">Service-Public university registration fees</a>.</p>
        <p>Institution details come from the French Ministry of Higher Education register (UAI {i.identifier}, Open Licence 2.0); programmes from the Parcoursup 2026 open-data catalogue. Fees follow Campus France and Service-Public for 2026–27. Programmes and fees change each year, so confirm with {i.name} before applying.</p>
      </Notice>
    </Section>
  </Page>;
}
