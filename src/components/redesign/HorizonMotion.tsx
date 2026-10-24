"use client";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { ArrowUpRight, MessageCircle, ListChecks, FileText, Plane } from "lucide-react";

const reducedMotion = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Progress (0–1) of an element travelling through the viewport. */
function useScrollProgress<T extends HTMLElement>(start = 0.85, end = 0.25) {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (reducedMotion()) { setProgress(1); return; }
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = ref.current?.getBoundingClientRect();
      if (!box) return;
      const from = innerHeight * start, to = innerHeight * end - box.height;
      setProgress(Math.max(0, Math.min(1, (from - box.top) / Math.max(1, from - to))));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); cancelAnimationFrame(frame); };
  }, [start, end]);
  return [ref, progress] as const;
}

const routeSteps = [
  { label: "A first conversation", detail: "Goals, budget, starting point", Icon: MessageCircle },
  { label: "A realistic shortlist", detail: "Programmes that fit you", Icon: ListChecks },
  { label: "Applications, prepared", detail: "Documents and timelines", Icon: FileText },
  { label: "Arrival, planned", detail: "Your first 30 days in France", Icon: Plane },
];

export function RouteCard() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (reducedMotion()) return;
    const timer = window.setInterval(() => setStep((current) => (current + 1) % routeSteps.length), 2600);
    return () => window.clearInterval(timer);
  }, []);
  return <aside className="mx-route" aria-label="How a journey with Althéa unfolds">
    <div className="mx-route-head"><span>YOUR ROUTE</span><span><i className="mx-live" />Guidance from Paris</span></div>
    <div className="mx-route-cities">
      <div><small>FROM</small><strong>India</strong></div>
      <svg viewBox="0 0 160 46" aria-hidden="true"><path className="mx-route-arc" d="M4 40 Q80 -14 156 40" /><path className="mx-route-trail" d="M4 40 Q80 -14 156 40" pathLength={1} style={{ strokeDashoffset: 1 - (step + 1) / routeSteps.length }} /></svg>
      <div><small>TO</small><strong>Paris</strong></div>
    </div>
    <ol>{routeSteps.map(({ label, detail, Icon }, i) => <li key={label} className={i === step ? "is-active" : i < step ? "is-done" : ""}><span><Icon size={15} /></span><div><strong>{label}</strong><small>{detail}</small></div><b>0{i + 1}</b></li>)}</ol>
    <div className="mx-route-foot"><span>48°51′ N · 02°21′ E</span><Link href="/admissions-process">See the full route<ArrowUpRight size={14} /></Link></div>
  </aside>;
}

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  useEffect(() => {
    if (reducedMotion()) return;
    const node = ref.current;
    if (!node) return;
    setShown(0);
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const begin = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - begin) / 1600);
        setShown(Math.round(value * (1 - Math.pow(1 - t, 4))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <span ref={ref}>{shown.toLocaleString("en-IN")}</span>;
}

export type HomeStats = { destinations: number; institutions: number; courses: number; refreshedAt: string };

export function StatsBand({ stats }: { stats: HomeStats }) {
  const refreshed = new Date(`${stats.refreshedAt}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const items = [
    { value: stats.destinations, label: "Study destinations", detail: "Europe, North America & Australia" },
    { value: stats.institutions, label: "Institution records", detail: "From official public registers" },
    { value: stats.courses, label: "Course records", detail: "Searchable, with sourced fee context" },
  ];
  return <section className="mx-stats mx-container" aria-label="The Althéa directory in numbers">
    {items.map((item) => <div className="mx-stat" key={item.label}><strong><CountUp value={item.value} /></strong><span>{item.label}</span><small>{item.detail}</small></div>)}
    <div className="mx-stat mx-stat-note"><span className="mx-live" /><p>Directory refreshed <strong>{refreshed}</strong>. Every figure traces back to a published source.</p><Link href="/universities">Search the directory<ArrowUpRight size={15} /></Link></div>
  </section>;
}

export function ScrollWords({ text, emphasis = [] }: { text: string; emphasis?: string[] }) {
  const [ref, progress] = useScrollProgress<HTMLParagraphElement>(0.9, 0.45);
  const words = text.split(" ");
  return <p className="mx-scroll-words" ref={ref}><span className="sr-only">{text}</span>{words.map((word, i) => {
    const lit = Math.max(0, Math.min(1, progress * words.length * 1.15 - i));
    const clean = word.replace(/[.,—]/g, "");
    return <span aria-hidden="true" key={i} className={emphasis.includes(clean) ? "is-emphasis" : undefined} style={{ opacity: 0.65 + lit * 0.35 }}>{word} </span>;
  })}</p>;
}

export function JourneyTrack({ steps }: { steps: [string, string][] }) {
  const [ref, progress] = useScrollProgress<HTMLDivElement>(0.85, 0.5);
  return <div className="mx-journey-grid" ref={ref} style={{ "--journey": progress } as React.CSSProperties}>
    <span className="mx-journey-line" aria-hidden="true"><i /></span>
    {steps.map(([title, copy], i) => <article key={title} className={progress >= (i + 0.35) / steps.length ? "is-reached" : undefined}><span className="mx-journey-node">0{i + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
  </div>;
}

/** Splits a phrase into characters that cascade in when the heading is revealed. */
export function Chars({ text, start = 0 }: { text: string; start?: number }) {
  let index = start;
  return <><span className="sr-only">{text}</span><span aria-hidden="true" className="sx-chars">{text.split(" ").map((word, w, all) => <Fragment key={w}><span className="sx-word">{[...word].map((char, c) => <span className="ch" key={c} style={{ "--i": index++ } as React.CSSProperties}>{char}</span>)}</span>{w < all.length - 1 ? " " : null}</Fragment>)}</span></>;
}

/** Slow golden dust drifting through the opening frame, leaning towards the cursor. */
export function HeroDust() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current;
    if (!el || reducedMotion()) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    let width = 0, height = 0, frame = 0, visible = true;
    const pointer = { x: 0.5, y: 0.5 };
    const ratio = Math.min(2, devicePixelRatio || 1);
    const count = innerWidth < 760 ? 38 : 80;
    const motes = Array.from({ length: count }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.6 + 0.4, speed: Math.random() * 0.00028 + 0.00008, drift: Math.random() * Math.PI * 2, depth: Math.random() * 0.8 + 0.2 }));
    const resize = () => { width = el.clientWidth; height = el.clientHeight; el.width = width * ratio; el.height = height * ratio; ctx.setTransform(ratio, 0, 0, ratio, 0, 0); };
    const draw = (time: number) => {
      frame = requestAnimationFrame(draw);
      if (!visible) return;
      ctx.clearRect(0, 0, width, height);
      for (const mote of motes) {
        mote.y -= mote.speed * mote.depth * 16;
        if (mote.y < -0.02) { mote.y = 1.02; mote.x = Math.random(); }
        const sway = Math.sin(time * 0.0004 + mote.drift) * 0.012;
        const x = (mote.x + sway + (pointer.x - 0.5) * 0.04 * mote.depth) * width;
        const y = (mote.y + (pointer.y - 0.5) * 0.03 * mote.depth) * height;
        const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(time * 0.0012 + mote.drift * 3));
        const glow = ctx.createRadialGradient(x, y, 0, x, y, mote.r * 5);
        glow.addColorStop(0, `rgba(243,213,159,${0.75 * twinkle * mote.depth})`);
        glow.addColorStop(1, "rgba(243,213,159,0)");
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(x, y, mote.r * 5, 0, Math.PI * 2); ctx.fill();
      }
    };
    const move = (event: PointerEvent) => { pointer.x = event.clientX / innerWidth; pointer.y = event.clientY / innerHeight; };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(el);
    resize();
    frame = requestAnimationFrame(draw);
    addEventListener("resize", resize);
    addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(frame); observer.disconnect(); removeEventListener("resize", resize); removeEventListener("pointermove", move); };
  }, []);
  return <canvas className="mx-dust" ref={canvas} aria-hidden="true" />;
}
