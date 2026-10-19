import Link from "next/link";
import { brand } from "@/config/brand";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import { Card, Grid, Section } from "@/components/maison/ui";
import { parisPhotos, photoPlace } from "@/lib/paris";

export const metadata: Metadata = pageMetadata('/acknowledgements', {
  title: "Sources & Photo Credits",
  description: "Official sources, data registries and photo credits behind the Althéa Consulting study abroad guides, and the limits of this editorial collection.",
});
export default function Content() {
  return (
    <Page path="/acknowledgements" eyebrow="SOURCES & CREDITS" title="Sources" accent="& photography." intro="Attribution and the limits of this editorial collection." closing={false}>
      <Section tone="ivory" kicker="WHERE THE INFORMATION COMES FROM" title="Official sources," accent="clearly credited.">
        <Grid cols={3}>
          <Card index={1} title="Official information"><p>Programme records link to Université PSL and Toulouse School of Economics. Campus France resources explain application processes; France-Visas is the official visa resource. Review date: 14 October 2026. The Toulouse listing was found in official search results but still needs a complete page review.</p><p>PSL Computer Science · PSL Artificial Intelligence and Society · TSE international programmes</p></Card>
          <Card index={2} title="Global destination resources"><p>Country guides link to Study UK (British Council), EducationUSA, EduCanada, DAAD, Study Australia and Education in Ireland. These are research resources, not partnerships. Destination guidance reviewed on 14 October 2026; always check the publisher for current requirements.</p></Card>
          <Card index={3} title="Independent editorial work"><p>The design is an original implementation inspired by Parisian editorial compositions. No Campus France or university endorsement is implied.</p></Card>
        </Grid>
      </Section>
      <Section tone="paper" id="editorial-standards" kicker="HOW TO USE OUR GUIDES" title="Evidence you can check." accent="Limits you can see.">
        <Grid cols={2}>
          <Card title="Who publishes this information"><p>{brand.name} publishes these independent guides. <Link href="/about">{brand.person}</Link>, {brand.role}, is the adviser behind the business. Guides support planning; they do not replace a university’s admissions office or an official authority.</p></Card>
          <Card title="What a review date means"><p>A source-review date records the review stated for that page. It is separate from an application deadline, the year of a fee, or the effective date of a rule. Older catalogue records and estimated future planning windows are not live offers.</p></Card>
          <Card title="Published facts and planning estimates"><p>Follow the cited publisher for entry requirements, fees and procedures. A published fee and a budget estimate serve different purposes: check the currency, fee period, applicant category and academic year before comparing them.</p></Card>
          <Card title="Corrections and personal advice"><p>Spotted a problem? Email <a href={`mailto:${brand.email}`}>{brand.email}</a> with the page URL, the claim and an official source. For your own plan, <Link href="/book-consultation">request a consultation</Link>. Institutions, employers and authorities make their own decisions.</p></Card>
        </Grid>
      </Section>
      <Section tone="paper" id="photography" kicker="THE PARIS COLLECTION" title="Photographs" accent="and image licences." intro="The photographs on this site are real photographs from Pexels, used under the Pexels License. Each local copy is resized and converted to WebP; page layouts crop images to fit without generative edits. Photograph use does not imply an affiliation with a university, landmark or destination organisation.">
        <ul className="ms-credits">{parisPhotos.map(([slug, photo]) => <li key={slug}><a href={photo.source} target="_blank" rel="noreferrer">{photoPlace(photo)}</a><span>{photo.licence}</span></li>)}</ul>
      </Section>
    </Page>
  );
}
