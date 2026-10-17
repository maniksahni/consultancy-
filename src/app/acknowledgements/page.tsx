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
      <Section tone="paper" id="photography" kicker="THE PARIS COLLECTION" title="Photographs" accent="and image licences." intro="The photographs on this site are real photographs from Pexels, used under the Pexels License. Each local copy is resized and converted to WebP; page layouts crop images to fit without generative edits. Photograph use does not imply an affiliation with a university, landmark or destination organisation.">
        <ul className="ms-credits">{parisPhotos.map(([slug, photo]) => <li key={slug}><a href={photo.source} target="_blank" rel="noreferrer">{photoPlace(photo)}</a><span>{photo.licence}</span></li>)}</ul>
      </Section>
    </Page>
  );
}
