import Link from "next/link";
import { ArrowDown, ArrowLeft } from "lucide-react";

export default function LuxuryPageHero({ eyebrow, title, accent, intro, image, chapter }: {
  eyebrow: string; title: string; accent: string; intro: string; image: string; chapter: string;
}) {
  return (
    <header className="luxury-page-hero h26-inner-hero">
      <img className="luxury-page-photo" data-hero-parallax src={image} alt="" fetchPriority="high" />
      <div className="luxury-page-shade" />
      <div className="h26-inner-grid" aria-hidden="true" />
      <div className="h26-inner-chapter"><span>{chapter}</span><i/><small>THE COLLECTION</small></div>
      <div className="luxury-page-copy">
        <Link href="/" className="luxury-back"><ArrowLeft size={14}/> Study with Harshita</Link>
        <p className="luxury-eyebrow">{eyebrow}</p>
        <h1>{title}<br/><em>{accent}</em></h1>
        <p className="luxury-page-intro">{intro}</p>
      </div>
      <div className="luxury-page-bottom">
        <a href="#page-content"><span><ArrowDown size={18}/></span> Enter this chapter</a>
        <span>PERSONAL GUIDANCE / GLOBAL POSSIBILITIES / {chapter}</span>
      </div>
    </header>
  );
}
