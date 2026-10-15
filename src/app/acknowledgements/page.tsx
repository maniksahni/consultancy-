import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";
import { imageCredits } from "@/data/imageCredits";
import {photoCaption} from "@/lib/photography";
import photoCollection from "@/data/photoSources.json";

export const metadata: Metadata = pageMetadata('/acknowledgements', {
  title: "Sources & photography.",
  description: "Attribution and the limits of this editorial collection.",
});
export default function Content() {
  return (
    <Page path="/acknowledgements"
      title={"Sources & photography."}
      intro={"Attribution and the limits of this editorial collection."}
    >
      <div className="prose">
        <h2>Official information</h2>
        <p>
          Programme records link to Université PSL and Toulouse School of
          Economics. Campus France resources explain application processes;
          France-Visas is the official visa resource. Review date: 14 October
          2026. The Toulouse listing was found in official search results but
          still needs a complete page review.
        </p>
        <p>PSL Computer Science · PSL Artificial Intelligence and Society · TSE international programmes</p>

        <h2>Global destination resources</h2>
        <p>Country guides link to Study UK (British Council), EducationUSA, EduCanada, DAAD, Study Australia and Education in Ireland. These are research resources, not partnerships. Destination guidance reviewed on 14 October 2026; always check the publisher for current requirements.</p>
        <h2 id="photography">Photographs and image licences</h2>
        <p>
          The Paris and destination images are real photographs of the named
          landmarks and campuses below, sourced from Wikimedia Commons. Each
          local copy was resized and converted to WebP for the site; some page
          layouts crop the image to fit. The listed licences apply to those
          photo files. Photograph use does not imply an affiliation with a
          university or destination organisation.
        </p>
        <ul className="photo-credits">
          {imageCredits.map((photo) => (
            <li key={photo.file}>
              {photo.place} — {photo.author} · {photo.license} · <code>{photo.file}</code>
            </li>
          ))}
        </ul>
        <h2>New editorial photography collection</h2>
        <p>Each page and image placement has its own photograph. Images are resized, converted to WebP and cropped by the page layout. Names below describe the photograph; they do not imply institutional affiliation.</p>
        <ul className="photo-credits">{Object.entries(photoCollection).map(([placement,photo])=><li key={placement}><a href={photo.source} target="_blank" rel="noreferrer">{photoCaption(photo)}</a> — {photo.author} · <a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a> · <code>{photo.file}</code></li>)}</ul>
        <h2>Independent editorial work</h2>
        <p>
          The design is an original implementation inspired by Parisian
          editorial compositions. No Campus France or university endorsement is
          implied. The supplied Parisian collage and business card informed the
          visual direction, brand name and adviser introduction. The Canva
          reference could not be accessed; no Canva template assets were copied.
        </p>
      </div>
    </Page>
  );
}
