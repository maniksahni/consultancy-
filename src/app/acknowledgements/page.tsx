import photoCredits from "@/data/photoCredits.json";
import type { Metadata } from "next";
import Page from "@/components/althea/Page";

export const metadata: Metadata = {
  alternates: { canonical: "/acknowledgements" },
  title: "Sources & photography.",
  description: "Attribution and the limits of this editorial collection.",
};
export default function Content() {
  return (
    <Page
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
          has a separate dated fee and calendar record in our programme desk.
        </p>
        <a href="https://www.psl.eu/en/education/masters-degree-computer-science">
          PSL Computer Science ↗
        </a>
        <br />
        <a href="https://www.psl.eu/en/education/master-s-degree-artificial-intelligence-and-society">
          PSL Artificial Intelligence and Society ↗
        </a>
        <br />
        <a href="https://www.tse-fr.eu/international-masters-programs">
          TSE international programmes ↗
        </a>
        <h2>Global destination resources</h2>
        <p>
          Country guides link to Study UK (British Council), EducationUSA,
          EduCanada, DAAD, Study Australia and Education in Ireland. These are
          research resources, not partnerships. Destination guidance reviewed on
          14 October 2026; always check the publisher for current requirements.
        </p>
        <h2>Licensed photography</h2>
        <p>
          These photographs are hosted locally. Their responsive derivatives
          retain the source photograph’s licence. Source records reviewed 14
          October 2026.
        </p>
        {photoCredits.map((photo) => (
          <article key={photo.asset} className="photo-credit">
            <h3>
              {photo.asset.includes("destinations")
                ? photo.asset
                    .split("/")
                    .pop()
                    ?.replace(".webp", "")
                    .toUpperCase()
                : "Paris collection"}
            </h3>
            <p>
              <a href={photo.filePage}>{photo.title.replace("File:", "")} ↗</a>
            </p>
            <p>
              Photograph by {photo.artist}.{" "}
              <a href={photo.licenseUrl}>{photo.license} ↗</a>
            </p>
            <p className="muted">{photo.changes}</p>
          </article>
        ))}
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
