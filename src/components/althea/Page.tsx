import { BrandMark } from "@/components/brand/BrandLockup";
import PageIdentity from "@/components/seo/PageIdentity";
import { brand } from "@/config/brand";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Closing } from "@/components/maison/ui";
import Link from "next/link";
import Image from "next/image";
import { Fragment, type ComponentProps, type ReactNode } from "react";
import { trailFor } from "@/lib/trail";
import { coverFor, photoPlace, paris, type ParisSlug } from "@/lib/paris";

/** The shell for every inner page: cinematic cover, page body, closing invitation. */
export default function Page({
  path,
  imagePlacement,
  photo,
  eyebrow = "A PERSONAL WAY FORWARD",
  title,
  accent,
  intro,
  headerActions,
  closing,
  modified,
  about,
  children,
}: {
  path?: string;
  imagePlacement?: string;
  photo?: ParisSlug;
  eyebrow?: string;
  title: string;
  accent?: string;
  /** @deprecated covers come from the Paris collection; kept so older call sites compile. */
  image?: string;
  intro: string;
  headerActions?: ReactNode;
  closing?: false | ComponentProps<typeof Closing>;
  /** When the page's facts were last checked; published as dateModified. */
  modified?: string;
  /** Structured-data entity the page is about. */
  about?: Record<string, unknown>;
  children: ReactNode;
}) {
  const cover = photo ? paris(photo) : coverFor(imagePlacement || path);
  const pageImage = cover.file;
  const imageAlt = cover.alt;
  const heading = accent ? `${title} ${accent}` : title;
  const trail = path ? trailFor(path, heading) : [{ path: "/", name: "Home" }, { path: "", name: heading }];
  return (
    <>
      {path && <PageIdentity path={path} title={heading} description={intro} image={pageImage} imageAlt={imageAlt} modified={modified} about={about} />}
      <Navbar />
      <main id="main-content" className="ms-page">
        <header className="ms-cover">
          <figure className="ms-cover-media">
            <Image src={pageImage} alt={imageAlt} fill priority sizes="100vw" />
            <figcaption>{photoPlace(cover)}</figcaption>
          </figure>
          <div className="ms-cover-shade" aria-hidden="true" />
          <div className="ms-wrap ms-cover-copy">
            <nav className="ms-crumbs" aria-label="Breadcrumb">
              <Link href="/"><BrandMark size={18} /> {brand.shortName}</Link>
              {trail.slice(1).map((c, i, rest) => <Fragment key={c.path}>
                <span aria-hidden="true">/</span>
                {i === rest.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.path}>{c.name}</Link>}
              </Fragment>)}
            </nav>
            <p className="ms-kicker">{eyebrow}</p>
            <h1><span className="ms-cover-line"><span>{title}</span></span>{accent && <span className="ms-cover-line"><em>{accent}</em></span>}</h1>
            <p className="ms-cover-intro">{intro}</p>
            {headerActions && <div className="ms-cover-actions">{headerActions}</div>}
          </div>
          <div className="ms-cover-cue" aria-hidden="true"><span>SCROLL</span><i /></div>
        </header>
        <div className="ms-page-body">{children}</div>
        {closing !== false && <Closing {...(closing || {})} />}
      </main>
      <Footer />
    </>
  );
}
