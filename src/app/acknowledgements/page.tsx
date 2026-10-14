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
        <p>Country guides link to Study UK (British Council), EducationUSA, EduCanada, DAAD, Study Australia and Education in Ireland. These are research resources, not partnerships. Destination guidance reviewed on 14 October 2026; always check the publisher for current requirements.</p>
        <h2>Photography</h2>
        <p>
          Paris photography is sourced from Unsplash image assets. Photo IDs:
          photo-1502602898657-3e91760cbb34 and photo-1499856871958-5b9627545d1a.
          These locally hosted photographs are used under the Unsplash licence, which permits commercial use. Photographer identity: Not yet verified. The image IDs above are retained for provenance; no endorsement is implied.
        </p>
        <a href="https://unsplash.com/license">Unsplash licence ↗</a>
        <p>Destination photography provenance: Not yet verified. These existing local assets must have their individual source and licence records completed before the acceptance release.</p>
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
