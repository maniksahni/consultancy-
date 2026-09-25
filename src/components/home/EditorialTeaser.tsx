import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function EditorialTeaser({
  id, dark, eyebrow, title, accent, intro, href, linkLabel, highlights,
}: {
  id: string; dark?: boolean; eyebrow: string; title: string; accent: string;
  intro: string; href: string; linkLabel: string;
  highlights: readonly { heading: string; detail?: string; number?: string }[];
}) {
  return (
    <section id={id} className={`py-space-7 ${dark ? "bg-[#14120C] text-cream" : "bg-[#F2EDE4] text-ink"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className={`border-t pt-space-4 sm:pt-space-5 grid lg:grid-cols-12 gap-10 ${dark ? "border-cream/15" : "border-ink/15"}`}>
          <div className="lg:col-span-7">
            <p className={`text-[10px] uppercase tracking-[0.25em] font-mono mb-6 ${dark ? "text-cream/45" : "text-ink/45"}`}>{eyebrow}</p>
            <h2 className="font-display text-[3rem] sm:text-6xl lg:text-7xl leading-[0.9]">
              {title}<br /><em className="text-terra">{accent}</em>
            </h2>
            <p className={`text-base font-light leading-relaxed max-w-xl mt-8 ${dark ? "text-cream/65" : "text-ink/65"}`}>{intro}</p>
            <Link href={href} className={`inline-flex items-center gap-3 border-b text-[11px] uppercase tracking-[0.2em] mt-10 pb-2 ${dark ? "border-cream/50 text-cream hover:border-cream" : "border-ink/50 text-ink hover:border-ink"}`}>
              {linkLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className={`lg:col-span-5 border-t ${dark ? "border-cream/15" : "border-ink/15"}`}>
            {highlights.map((item, i) => (
              <div key={item.heading} className={`border-b py-6 flex gap-6 ${dark ? "border-cream/15" : "border-ink/15"}`}>
                <span className={`font-display text-3xl ${dark ? "text-cream/25" : "text-ink/25"}`}>{item.number ?? `0${i + 1}`}</span>
                <div>
                  <h3 className="font-display text-2xl leading-snug">{item.heading}</h3>
                  {item.detail && <p className={`text-sm mt-2 leading-relaxed ${dark ? "text-cream/60" : "text-ink/60"}`}>{item.detail}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
