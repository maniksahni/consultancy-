import PageIdentity from "@/components/seo/PageIdentity";
import { brand } from "@/config/brand";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { photoFor, photoCaption } from "@/lib/photography";
export default function Page({
  path,
  imagePlacement,
  eyebrow = "La maison",
  title,
  image,
  intro,
  headerActions,
  children,
}: {
  path?: string;
  imagePlacement?: string;
  eyebrow?: string;
  title: string;
  image?: string;
  intro: string;
  headerActions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const assignedPhoto = (imagePlacement || path) ? photoFor((imagePlacement || path)!) : undefined;
  const pageImage = assignedPhoto?.file || image;
  const imageAlt = assignedPhoto ? photoCaption(assignedPhoto) : "Editorial photograph";
  return (
    <>
      {path && <PageIdentity path={path} title={title} description={intro} />}
      <Navbar />
      <main id="main-content" className="maison-interior">
        <header className="interior-cover">
          <div className="wrap interior-cover-layout">
            <div className="page-heading">
              <nav className="interior-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">La Maison {brand.shortName}</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{title}</span>
              </nav>
              <p className="eyebrow">{eyebrow}</p>
              <h1>{title}</h1>
              <p className="lead">{intro}</p>
              {headerActions && <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>{headerActions}</div>}
              <div className="interior-seal" aria-hidden="true">
                <span>{brand.shortName}</span>
                <i>✳</i>
                <small>PERSONAL BY DESIGN</small>
              </div>
            </div>
            {pageImage && <div className="interior-cover-photo">
              <Image
                src={pageImage}
                alt={imageAlt}
                fill
                sizes="(max-width:760px) 90vw, 35vw"
              />
              <span>{imageAlt}</span>
            </div>}
          </div>
        </header>
        <div className="wrap page-content">{children}</div>
        <section className="closing interior-closing">
          <span className="closing-ornament" aria-hidden="true">
            ✳
          </span>
          <p className="eyebrow">LET’S BEGIN</p>
          <h2>
            A wider world.
            <br />
            <em>A personal way forward.</em>
          </h2>
          <p>Bring your questions. Let’s find your first step together.</p>
          <Link className="button light" href="/book-consultation">
            Request a consultation ↗
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
