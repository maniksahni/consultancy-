import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { paris } from "@/lib/paris";

// Maison UI — the shared building blocks for every page on the site.
type Tone = "ivory" | "paper" | "sand" | "ink";

function isExternal(href: string) { return /^(https?:|mailto:|tel:)/.test(href); }

export function Btn({ href, children, variant = "gold", className = "" }: { href: string; children: ReactNode; variant?: "gold" | "ink" | "ghost" | "light"; className?: string }) {
  const cls = `ms-btn ms-btn-${variant} mx-magnetic ${className}`;
  const inner = <><span>{children}</span><ArrowUpRight size={17} aria-hidden="true" /></>;
  return isExternal(href) ? <a className={cls} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a> : <Link className={cls} href={href}>{inner}</Link>;
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  const inner = <><span>{children}</span><ArrowUpRight size={15} aria-hidden="true" /></>;
  return isExternal(href) ? <a className="ms-link" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a> : <Link className="ms-link" href={href}>{inner}</Link>;
}

export function Kicker({ children }: { children: ReactNode }) { return <p className="ms-kicker">{children}</p>; }

export function Head({ kicker, title, accent, intro, action, align = "split", level = 2 }: { kicker?: ReactNode; title: ReactNode; accent?: ReactNode; intro?: ReactNode; action?: ReactNode; align?: "split" | "center" | "left"; level?: 2 | 3 }) {
  const H = level === 2 ? "h2" : "h3";
  return <div className={`ms-head ms-head-${align}`}>
    <div>{kicker && <Kicker>{kicker}</Kicker>}<H className="ms-title">{title}{accent && <> <em>{accent}</em></>}</H></div>
    {(intro || action) && <div className="ms-head-aside">{intro && <p>{intro}</p>}{action}</div>}
  </div>;
}

export function Section({ id, tone = "ivory", kicker, title, accent, intro, action, align, children, className = "", narrow = false, labelledBy }: { id?: string; tone?: Tone; kicker?: ReactNode; title?: ReactNode; accent?: ReactNode; intro?: ReactNode; action?: ReactNode; align?: "split" | "center" | "left"; children?: ReactNode; className?: string; narrow?: boolean; labelledBy?: string }) {
  return <section id={id} className={`ms-section ms-tone-${tone} ${className}`} aria-labelledby={labelledBy}>
    <div className={`ms-wrap${narrow ? " ms-narrow" : ""}`}>
      {title && <Head kicker={kicker} title={title} accent={accent} intro={intro} action={action} align={align} />}
      {children}
    </div>
  </section>;
}

export function Grid({ cols = 3, children, className = "" }: { cols?: 2 | 3 | 4; children: ReactNode; className?: string }) {
  return <div className={`ms-grid ms-cols-${cols} ${className}`}>{children}</div>;
}

export function Card({ index, kicker, title, children, href, cta, icon, feature = false, className = "" }: { index?: string | number; kicker?: ReactNode; title: ReactNode; children?: ReactNode; href?: string; cta?: ReactNode; icon?: ReactNode; feature?: boolean; className?: string }) {
  const body = <>
    {(index !== undefined || icon) && <div className="ms-card-top">{icon && <span className="ms-card-icon">{icon}</span>}{index !== undefined && <span className="ms-card-index">{typeof index === "number" ? String(index).padStart(2, "0") : index}</span>}</div>}
    {kicker && <p className="ms-card-kicker">{kicker}</p>}
    <h3>{title}</h3>
    {children && <div className="ms-card-body">{children}</div>}
    {href && <span className="ms-card-cta">{cta || "Explore"}<ArrowUpRight size={17} aria-hidden="true" /></span>}
  </>;
  const cls = `ms-card${feature ? " is-feature" : ""}${href ? " is-link" : ""} ${className}`;
  if (!href) return <article className={cls} data-spotlight>{body}</article>;
  return isExternal(href) ? <a className={cls} href={href} target="_blank" rel="noreferrer" data-spotlight>{body}</a> : <Link className={cls} href={href} data-spotlight>{body}</Link>;
}

export function Split({ image, alt, caption, reverse = false, children, tall = false }: { image: string; alt: string; caption?: string; reverse?: boolean; children: ReactNode; tall?: boolean }) {
  return <div className={`ms-split${reverse ? " is-reverse" : ""}${tall ? " is-tall" : ""}`}>
    <figure className="ms-split-media"><Image src={image} alt={alt} fill sizes="(max-width:900px) 92vw, 50vw" />{caption && <figcaption>{caption}</figcaption>}</figure>
    <div className="ms-split-copy">{children}</div>
  </div>;
}

export function Steps({ items }: { items: { title: ReactNode; body: ReactNode; meta?: ReactNode }[] }) {
  return <ol className="ms-steps">{items.map((item, i) => <li key={i} data-reveal><span className="ms-step-num">{String(i + 1).padStart(2, "0")}</span><div><h3>{item.title}</h3><div className="ms-step-body">{item.body}</div>{item.meta && <p className="ms-step-meta">{item.meta}</p>}</div></li>)}</ol>;
}

export function Facts({ items }: { items: { label: ReactNode; value: ReactNode; note?: ReactNode }[] }) {
  return <dl className="ms-facts">{items.map((item, i) => <div key={i} data-spotlight><dt>{item.label}</dt><dd>{item.value}</dd>{item.note && <dd className="ms-facts-note">{item.note}</dd>}</div>)}</dl>;
}

export function Checklist({ items, columns = 1 }: { items: ReactNode[]; columns?: 1 | 2 }) {
  return <ul className={`ms-checklist ms-checklist-${columns}`}>{items.map((item, i) => <li key={i}><Check size={16} aria-hidden="true" /><span>{item}</span></li>)}</ul>;
}

export function Notice({ kicker, children, tone = "paper" }: { kicker?: ReactNode; children: ReactNode; tone?: "paper" | "ink" }) {
  return <aside className={`ms-notice ms-notice-${tone}`} data-reveal>{kicker && <Kicker>{kicker}</Kicker>}<div>{children}</div></aside>;
}

export function Quote({ children, by, role }: { children: ReactNode; by?: ReactNode; role?: ReactNode }) {
  return <figure className="ms-quote" data-reveal><blockquote>{children}</blockquote>{by && <figcaption><strong>{by}</strong>{role && <span>{role}</span>}</figcaption>}</figure>;
}

export function Prose({ children }: { children: ReactNode }) { return <div className="ms-prose">{children}</div>; }

export function Chips({ items }: { items: { label: ReactNode; href: string }[] }) {
  return <div className="ms-chips">{items.map((item, i) => isExternal(item.href) ? <a key={i} href={item.href} target="_blank" rel="noreferrer">{item.label}<ArrowUpRight size={13} aria-hidden="true" /></a> : <Link key={i} href={item.href}>{item.label}<ArrowUpRight size={13} aria-hidden="true" /></Link>)}</div>;
}

export function Closing({ kicker = "LET’S BEGIN", title = "A wider world.", accent = "A personal way forward.", body = "Bring your questions. Let’s find your first step together.", href = "/book-consultation", action = "Request a consultation", image = paris("seine-sunset").file }: { kicker?: ReactNode; title?: ReactNode; accent?: ReactNode; body?: ReactNode; href?: string; action?: ReactNode; image?: string }) {
  return <section className="ms-closing" aria-label="Start a conversation">
    <Image className="ms-closing-img" src={image} alt="" fill sizes="100vw" />
    <div className="ms-closing-shade" />
    <div className="ms-wrap ms-closing-copy">
      <Kicker>{kicker}</Kicker>
      <h2>{title}<br /><em>{accent}</em></h2>
      <p>{body}</p>
      <Link className="mx-orb mx-magnetic" href={href} data-cursor="Let’s talk"><span>{action}</span><ArrowUpRight size={24} aria-hidden="true" /></Link>
    </div>
  </section>;
}
