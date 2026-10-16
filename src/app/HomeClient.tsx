"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, BookOpen, Globe2, Compass,
  CheckCircle2, GraduationCap, Star, MapPin, Sparkles,
  ChevronDown, Award, Users, TrendingUp
} from "lucide-react";
import { AltheaHeader, AltheaFooter } from "@/components/althea/SiteChrome";
import FranceEnquiryForm from "@/components/althea/FranceEnquiryForm";
import StudentReviewsSection from "@/components/althea/StudentReviewsSection";

/* ── Animation Variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};
const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} className={className}>
      {children}
    </motion.div>
  );
}

const services = [
  { no: "01", title: "Academic Discovery", subtitle: "Find your direction", body: "Research universities, disciplines, degree levels and language options that align with your future.", icon: GraduationCap, accent: "rgba(229,201,157,0.18)" },
  { no: "02", title: "Application Guidance", subtitle: "Make every step count", body: "Understand relevant application routes, document preparation and programme-specific requirements.", icon: BookOpen, accent: "rgba(168,203,232,0.18)" },
  { no: "03", title: "A Life in France", subtitle: "Arrive with confidence", body: "Plan ahead for visas, scholarship research, housing and the practical details of your next chapter.", icon: Compass, accent: "rgba(200,230,201,0.18)" },
];

const journey = [
  { number: "I", title: "Discover", text: "Explore your interests, academic profile and the French higher-education landscape." },
  { number: "II", title: "Define", text: "Build a thoughtful shortlist from official university information." },
  { number: "III", title: "Prepare", text: "Organise applications and required documents around programme instructions." },
  { number: "IV", title: "Begin", text: "Plan next steps towards admission, visa preparation and arrival." },
];

const stats = [
  { value: "200+", label: "Universities Mapped", icon: Award },
  { value: "7", label: "Countries Covered", icon: MapPin },
  { value: "500+", label: "Students Guided", icon: Users },
  { value: "95%", label: "Satisfaction Rate", icon: TrendingUp },
];

const cities = [
  { name: "Paris", small: "Where ideas meet art", bg: "#1a237e" },
  { name: "Bordeaux", small: "Culture & innovation", bg: "#37474f" },
  { name: "Grenoble", small: "At the heart of the Alps", bg: "#1b5e20" },
  { name: "Beyond", small: "Discover all of France", bg: "#142E61" },
];

function FloatingOrb({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color, filter: "blur(70px)", opacity: 0.5 }}
      animate={{ y: [0, -25, 0], x: [0, 12, 0] }}
      transition={{ duration: 9 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function AnimCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const num = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 1800, 1);
      setCount(Math.floor(progress * num));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, num]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.4 + 0.4, a: Math.random() * 0.4 + 0.1,
    }));
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229,201,157,${p.a})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden />;
}

export default function HomeClient() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#0D1B3E] text-white">
      <AltheaHeader />

      {/* ══════ HERO ══════ */}
      <section ref={heroRef} className="relative isolate overflow-hidden bg-[#0D1B3E] min-h-[100svh] flex items-center">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 72% 38%, rgba(229,201,157,0.11) 0%, transparent 65%), linear-gradient(135deg, #0D1B3E 0%, #142E61 55%, #0A1628 100%)" }} />
          <ParticleField />
          <FloatingOrb x="8%" y="15%" size={420} color="rgba(229,201,157,0.12)" delay={0} />
          <FloatingOrb x="65%" y="55%" size={480} color="rgba(10,22,40,0.6)" delay={2.5} />
          <FloatingOrb x="78%" y="5%" size={260} color="rgba(229,201,157,0.07)" delay={4} />
        </div>

        <motion.div
          className="relative z-10 mx-auto grid max-w-[1440px] gap-12 px-5 pt-[100px] pb-20 sm:px-9 sm:pt-[120px] sm:pb-24 lg:min-h-[92vh] lg:grid-cols-12 lg:items-center lg:gap-16 lg:px-14"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="relative z-10 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-[#E5C99D]/30 bg-[#E5C99D]/10 px-4 py-1.5 backdrop-blur-sm"
            >
              <Sparkles size={10} className="text-[#E5C99D] animate-pulse" />
              <span className="text-[10px] font-semibold uppercase tracking-[.28em] text-[#E5C99D]">Bienvenu chez Althéa · France admissions</span>
            </motion.div>

            <motion.h1
              className="mt-8 font-display text-[clamp(3rem,9vw,8rem)] leading-[.87] tracking-[-.055em]"
              initial={{ opacity: 0, y: 56 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              Your future,
              <br />
              <motion.em
                className="font-normal text-[#E5C99D]"
                initial={{ opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
              >
                en France.
              </motion.em>
            </motion.h1>

            <motion.p
              className="mt-8 max-w-xl text-[15px] leading-8 text-white/70 sm:text-lg sm:leading-9"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.78 }}
            >
              Study abroad, beautifully considered. A personal, informed and inspiring path toward higher education in France.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.92 }}
            >
              <motion.a
                href="#consultation"
                className="group relative inline-flex min-h-[54px] items-center justify-center gap-3 overflow-hidden bg-[#E5C99D] px-8 py-4 text-[11px] font-bold uppercase tracking-[.14em] text-[#0D1B3E]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.span className="absolute inset-0 bg-white" initial={{ x: "-101%" }} whileHover={{ x: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} />
                <span className="relative z-10 flex items-center gap-3">Begin your journey <ArrowUpRight size={17} /></span>
              </motion.a>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link href="/france" className="inline-flex min-h-[54px] items-center justify-center gap-3 border border-white/25 px-8 py-4 text-[11px] font-bold uppercase tracking-[.14em] text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10">
                  Discover France <ArrowRight size={17} />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/15 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.12 }}
            >
              {["Source-led research", "Personal guidance", "France-focused"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.14em] text-white/55">
                  <CheckCircle2 size={13} className="text-[#E5C99D]" />{item}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="relative min-w-0 lg:col-span-5"
            initial={{ opacity: 0, scale: 0.88, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute -left-4 -top-4 hidden h-full w-full border border-[#E5C99D]/22 lg:block" />
            <div className="absolute -inset-6 rounded-sm bg-[#E5C99D]/5 blur-3xl" />
            <div className="relative aspect-[5/4] overflow-hidden border border-white/10 bg-[#1a2d5a] sm:aspect-[4/3] lg:aspect-[3/4]">
              <motion.img
                src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1100&q=85"
                alt="Parisian street looking towards the Eiffel Tower"
                width={1100} height={1350}
                className="h-full w-full object-cover"
                style={{ scale: imgScale }}
                fetchPriority="high"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D1B3E]/85 via-transparent to-[#0D1B3E]/20" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-5 sm:p-8">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[.3em] text-white/68">A little French magic</p>
                  <p className="mt-2 font-display text-3xl italic text-white sm:text-5xl">La vie, autrement.</p>
                </div>
                <span className="text-[10px] tracking-widest text-white/65">48°51′N</span>
              </div>
            </div>
            <motion.div className="absolute -bottom-5 -right-2 hidden bg-[#E5C99D] px-6 py-3 font-display text-xl italic text-[#0D1B3E] shadow-xl sm:block" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.05 }}>
              Paris, France ↗
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => document.getElementById("stats-row")?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Scroll down"
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 text-white/35 transition-colors hover:text-white/65"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <span className="text-[9px] uppercase tracking-[.25em]">Scroll</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown size={18} />
          </motion.div>
        </motion.button>
      </section>

      {/* ══════ MARQUEE ══════ */}
      <div className="relative overflow-hidden border-y border-[#E5C99D]/18 bg-[#09112A] py-4">
        <motion.div
          className="flex gap-0 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(4)].map((_, i) =>
            ["Élégance in every step", "Official sources. Human advice.", "Discover · Apply · Arrive", "Study in France", "Boutique Consultancy", "Paris · Lyon · Bordeaux"].map((text) => (
              <span key={`${i}-${text}`} className="inline-flex items-center gap-3 px-7 text-[10px] font-semibold uppercase tracking-[.22em] text-[#E5C99D]/55">
                <span className="text-[#E5C99D]/40">✦</span>{text}
              </span>
            ))
          )}
        </motion.div>
      </div>

      {/* ══════ STATS ══════ */}
      <section id="stats-row" className="bg-[#0D1B3E] px-5 py-16 sm:px-9 lg:px-14">
        <div className="mx-auto max-w-[1328px]">
          <AnimSection className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                custom={i * 0.1}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden border border-[#E5C99D]/14 bg-white/[0.03] p-6 text-center backdrop-blur-sm sm:p-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#E5C99D]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <stat.icon size={22} className="mx-auto mb-4 text-[#E5C99D]/55 transition-colors duration-300 group-hover:text-[#E5C99D]" strokeWidth={1.5} />
                <div className="font-display text-4xl text-white sm:text-5xl"><AnimCounter value={stat.value} /></div>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[.2em] text-white/42">{stat.label}</p>
              </motion.div>
            ))}
          </AnimSection>
        </div>
      </section>

      {/* ══════ PHILOSOPHY ══════ */}
      <section id="approach" className="relative overflow-hidden bg-[#FCFAF6] px-5 py-24 text-[#153260] sm:px-9 lg:px-14 lg:py-36">
        <div className="pointer-events-none absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-[#E5C99D]/10 blur-3xl" />
        <div className="mx-auto max-w-[1328px]">
          <AnimSection className="grid gap-10 lg:grid-cols-12 lg:gap-20">
            <motion.div variants={slideLeft} className="lg:col-span-5">
              <p className="text-xs uppercase tracking-[.26em] text-[#AC9068]">01 / Notre philosophie</p>
              <h2 className="mt-6 font-display text-[clamp(2.8rem,6vw,5.5rem)] leading-[.94] tracking-[-.05em]">A different way<br />to <em className="text-[#AC9068]">begin.</em></h2>
              <motion.div className="mt-8 h-px bg-gradient-to-r from-[#AC9068] to-transparent" initial={{ scaleX: 0, originX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3 }} />
            </motion.div>
            <motion.div variants={slideRight} className="lg:col-span-7 lg:pt-14">
              <p className="max-w-2xl font-display text-2xl leading-relaxed text-[#2A4266] sm:text-3xl">Not just a destination. A new language, a new perspective, and a future uniquely yours.</p>
              <p className="mt-6 max-w-2xl text-sm leading-8 text-[#596980]">Althéa brings the calm, care and structure of boutique guidance to a big international decision. We believe beautiful planning starts with accurate information and a conversation about who you want to become.</p>
              <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 320 }}>
                <Link href="/france" className="mt-8 inline-flex min-h-11 items-center gap-3 border-b-2 border-[#173969]/35 text-[11px] font-semibold uppercase tracking-[.14em] text-[#173969] transition-all hover:border-[#173969] hover:gap-5">
                  Explore the France guide <ArrowUpRight size={17} />
                </Link>
              </motion.div>
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ══════ SERVICES ══════ */}
      <section className="bg-[#F1EDE5] px-5 py-24 sm:px-9 lg:px-14 lg:py-32">
        <div className="mx-auto max-w-[1328px]">
          <AnimSection>
            <motion.div variants={fadeUp} className="mb-14 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-xs uppercase tracking-[.26em] text-[#AC9068]">02 / L'accompagnement</p>
                <h2 className="mt-4 font-display text-5xl tracking-tight text-[#153260] sm:text-6xl">Guidance, <em>reimagined.</em></h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-[#627187]">Practical, considered support — not overwhelming promises.</p>
            </motion.div>
            <div className="grid gap-5 lg:grid-cols-3">
              {services.map((s, i) => (
                <motion.article
                  key={s.no}
                  variants={fadeUp}
                  custom={i * 0.12}
                  whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                  className="group relative flex min-w-0 flex-col overflow-hidden border border-[#173969]/12 bg-[#FCFAF6] p-8 sm:p-10"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 85% 85%, ${s.accent}, transparent 65%)` }} />
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-semibold tracking-[.2em] text-[#AE956D]">{s.no} / ALTHÉA</span>
                    <motion.div whileHover={{ rotate: 12, scale: 1.18 }} transition={{ type: "spring", stiffness: 320 }}>
                      <s.icon size={27} strokeWidth={1.3} className="text-[#AE956D]" />
                    </motion.div>
                  </div>
                  <p className="mt-14 text-[10px] font-semibold uppercase tracking-[.24em] text-[#9A8666]">{s.subtitle}</p>
                  <h3 className="mt-3 font-display text-3xl text-[#153260] sm:text-4xl">{s.title}</h3>
                  <p className="mt-5 flex-1 text-sm leading-8 text-[#596980]">{s.body}</p>
                  <div className="mt-8 flex items-center justify-between border-t border-[#173969]/12 pt-5">
                    <motion.div className="h-px bg-gradient-to-r from-[#AC9068] to-transparent" initial={{ width: 0 }} whileInView={{ width: "38%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15 }} />
                    <ArrowUpRight size={17} className="text-[#193B72] opacity-45 transition-opacity group-hover:opacity-100" />
                  </div>
                </motion.article>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ══════ CITIES ══════ */}
      <section className="bg-[#FCFAF6] px-5 py-24 sm:px-9 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-[1328px] gap-12 lg:grid-cols-12 lg:gap-20">
          <AnimSection className="lg:col-span-5">
            <motion.div variants={slideLeft}>
              <p className="text-xs uppercase tracking-[.27em] text-[#AC9068]">03 / Le choix</p>
              <h2 className="mt-5 font-display text-[clamp(3rem,6vw,5.5rem)] leading-[.93] tracking-[-.04em] text-[#153260]">A world of <em>possibility.</em></h2>
              <p className="mt-6 max-w-md text-sm leading-8 text-[#596980]">Explore English-taught options, universities and student-friendly cities. Each directory entry leads you to its original institutional source.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/france/universities" className="inline-flex min-h-12 items-center gap-3 bg-[#173969] px-7 py-3 text-[11px] font-semibold uppercase tracking-[.14em] text-white transition-colors hover:bg-[#285393]">Explore universities <ArrowUpRight size={17} /></Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Link href="/france/programmes" className="inline-flex min-h-12 items-center gap-3 border border-[#173969]/25 px-7 py-3 text-[11px] font-semibold uppercase tracking-[.14em] text-[#173969] transition-colors hover:bg-[#F2EDE4]">Find a course <ArrowUpRight size={17} /></Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {cities.map((c, i) => (
              <motion.div key={c.name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                <Link href="/france/universities" className="group relative flex min-h-[210px] flex-col justify-between overflow-hidden p-6 sm:min-h-[235px] sm:p-8" style={{ background: `linear-gradient(135deg, ${c.bg} 0%, ${c.bg}cc 100%)` }}>
                  <motion.div className="absolute inset-0 bg-white/6" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} transition={{ duration: 0.3 }} />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/25" />
                  <span className="relative flex justify-between gap-3 text-[10px] uppercase tracking-[.2em] text-white/58">France / City <ArrowUpRight size={17} /></span>
                  <div className="relative">
                    <motion.h3 className="font-display text-4xl text-white sm:text-5xl" whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 320 }}>{c.name}</motion.h3>
                    <p className="mt-2 text-xs text-white/65">{c.small}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ JOURNEY ══════ */}
      <section className="relative overflow-hidden bg-[#142E61] px-5 py-24 text-white sm:px-9 lg:px-14 lg:py-36">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <FloatingOrb x="82%" y="8%" size={500} color="rgba(229,201,157,0.06)" delay={1} />
          <FloatingOrb x="-6%" y="62%" size={380} color="rgba(229,201,157,0.04)" delay={3.5} />
        </div>
        <div className="mx-auto grid max-w-[1328px] gap-14 lg:grid-cols-12">
          <AnimSection className="lg:col-span-5">
            <motion.div variants={slideLeft}>
              <p className="text-xs uppercase tracking-[.26em] text-[#E2C596]">04 / Votre parcours</p>
              <h2 className="mt-5 font-display text-5xl leading-[1] sm:text-6xl">Every great story starts with <em className="text-[#E5C99D]">one step.</em></h2>
              <p className="mt-6 max-w-md text-sm leading-8 text-white/58">A thoughtful journey from initial research to the next chapter of your life.</p>
            </motion.div>
          </AnimSection>
          <div className="relative lg:col-span-7">
            {journey.map((j, idx) => (
              <motion.div key={j.number} initial={{ opacity: 0, x: 45 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.72, delay: idx * 0.14, ease: [0.22, 1, 0.36, 1] }} className="group grid grid-cols-[52px_1fr] gap-5 border-b border-white/14 py-7 last:border-0 sm:grid-cols-[76px_1fr]">
                <span className="font-display text-3xl italic text-[#E5C99D] transition-transform duration-300 group-hover:scale-[1.15]" style={{ lineHeight: 1 }}>{j.number}</span>
                <div>
                  <h3 className="font-display text-3xl transition-colors duration-300 group-hover:text-[#E5C99D] sm:text-4xl">{j.title}</h3>
                  <p className="mt-2 max-w-lg text-sm leading-7 text-white/58">{j.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ TRUST ══════ */}
      <section className="mx-auto grid max-w-[1328px] gap-11 px-5 py-24 sm:px-9 lg:grid-cols-12 lg:items-center lg:gap-20 lg:px-14 lg:py-32">
        <AnimSection className="lg:col-span-7">
          <motion.div variants={slideLeft}>
            <p className="text-xs uppercase tracking-[.26em] text-[#AC9068]">05 / Une source de confiance</p>
            <h2 className="mt-5 font-display text-5xl leading-[1] tracking-tight text-[#153260] sm:text-6xl">Rooted in <em>real information.</em></h2>
            <p className="mt-7 max-w-2xl text-sm leading-8 text-[#596980]">Our France guide integrates complete degree programmes, legal work rights (up to 964 hrs/yr), post-study work authorization (2-year APS), and scholarship criteria directly inside your portal — so you never need to search external agencies.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link href="/france/campus-france" className="inline-flex min-h-12 items-center gap-2 bg-[#173969] px-6 py-3 text-xs font-semibold text-white transition-colors hover:bg-[#31558C]">Campus France Guide <ArrowRight size={17} /></Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link href="/jobs" className="inline-flex min-h-12 items-center gap-2 border border-[#173969]/25 px-6 py-3 text-xs font-semibold text-[#173969] transition-colors hover:bg-[#F2EDE4]">Jobs &amp; 2-Year APS Work Rights <ArrowRight size={17} /></Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimSection>
        <motion.div className="relative overflow-hidden border border-[#173969]/12 bg-gradient-to-br from-[#F0EBE3] to-[#E5DDD0] p-8 sm:p-12 lg:col-span-5" initial={{ opacity: 0, scale: 0.93 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} whileHover={{ boxShadow: "0 32px 64px -20px rgba(23,57,105,0.18)", y: -4, transition: { duration: 0.35 } }}>
          <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-[#E5C99D]/25" />
          <Globe2 size={32} strokeWidth={1.2} className="text-[#AC9068]" />
          <p className="mt-9 font-display text-4xl leading-tight text-[#153260]">Know your options.<br /><em>Own your journey.</em></p>
          <p className="mt-5 text-sm leading-8 text-[#596980]">All university dossiers, living cost calculators, and interview simulators available right inside Althéa.</p>
          <div className="mt-8 flex items-center gap-2">
            {[1,2,3,4,5].map((s) => <Star key={s} size={13} className="fill-[#E5C99D] text-[#E5C99D]" />)}
            <span className="ml-2 text-xs text-[#596980]">Trusted by students</span>
          </div>
        </motion.div>
      </section>

      {/* ══════ MENTOR ══════ */}
      <section id="mentor" className="relative overflow-hidden bg-[#F4EFE7] px-5 py-24 sm:px-9 lg:px-14 lg:py-32">
        <div className="mx-auto grid max-w-[1328px] gap-10 lg:grid-cols-12 lg:items-center lg:gap-20">
          <motion.div className="relative flex min-h-[340px] flex-col justify-between overflow-hidden bg-[#142E61] p-8 text-white shadow-2xl sm:min-h-[420px] sm:p-12 lg:col-span-5" initial={{ opacity: 0, scale: 0.92, x: -40 }} whileInView={{ opacity: 1, scale: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <div className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full border border-white/12" />
            <div className="pointer-events-none absolute -left-12 bottom-8 h-36 w-36 rounded-full bg-[#E5C99D]/8 blur-2xl" />
            <span className="relative text-[11px] uppercase tracking-[.28em] text-[#E4C99B]">La personne derrière Althéa</span>
            <div className="relative">
              <span aria-hidden className="font-display italic text-[#E4C99B]" style={{ fontSize: "clamp(7rem,18vw,12rem)", lineHeight: 0.7, letterSpacing: "-0.12em", display: "block" }}>H.</span>
              <p className="mt-8 text-xs uppercase tracking-[.3em] text-white/62">A personal point of view</p>
            </div>
          </motion.div>
          <AnimSection className="lg:col-span-7">
            <motion.div variants={slideRight}>
              <p className="text-xs uppercase tracking-[.28em] text-[#A88E65]">06 / Your guide</p>
              <h2 className="mt-6 font-display text-[clamp(3rem,6vw,5.8rem)] leading-[.93] tracking-[-.04em] text-[#173969]">Meet <em>Harshita.</em></h2>
              <p className="mt-6 font-display text-2xl text-[#345B83]">Harshita Kohli <span className="text-[#A88E65]">·</span> Career Coach &amp; France Expert</p>
              <p className="mt-5 max-w-xl text-sm leading-8 text-[#596980]">Behind the right university shortlist is a conversation about a student's ambitions. Althéa takes a human-first approach to exploring study opportunities and planning the journey ahead.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href="https://www.linkedin.com/in/harshita-kohli-imtbs/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 border border-[#173969]/30 px-6 py-3 text-xs font-semibold text-[#173969] transition-all hover:bg-[#EDE8DF]">LinkedIn profile <ArrowUpRight size={17} /></motion.a>
                <motion.a whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} href="https://www.instagram.com/helloharshita98/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 border border-[#173969]/30 px-6 py-3 text-xs font-semibold text-[#173969] transition-all hover:bg-[#EDE8DF]">Instagram <ArrowUpRight size={17} /></motion.a>
              </div>
            </motion.div>
          </AnimSection>
        </div>
      </section>

      <StudentReviewsSection />

      {/* ══════ CTA ══════ */}
      <section id="consultation" className="relative scroll-mt-20 overflow-hidden bg-[#0D1B3E] px-5 py-24 text-white sm:px-9 lg:px-14 lg:py-36">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <FloatingOrb x="3%" y="18%" size={580} color="rgba(229,201,157,0.06)" delay={0} />
          <FloatingOrb x="68%" y="52%" size={460} color="rgba(10,22,40,0.7)" delay={2.5} />
        </div>
        <div className="mx-auto max-w-[1328px]">
          <AnimSection>
            <motion.div variants={fadeUp} className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[.28em] text-[#E5C99D]/55">Votre avenir / Your future</p>
                <h2 className="mt-5 max-w-4xl font-display text-[clamp(3rem,8vw,6.8rem)] leading-[.9] tracking-[-.05em]">
                  Let's make it{" "}
                  <motion.em className="text-[#E5C99D]" animate={{ opacity: [0.65, 1, 0.65] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>remarkable.</motion.em>
                </h2>
                <p className="mt-6 max-w-xl text-sm leading-8 text-white/52">Start with a conversation about your academic background and what you want from your future in France.</p>
              </div>
              <motion.a href="#enquiry-form" className="inline-flex min-h-[56px] shrink-0 items-center justify-center gap-3 bg-[#E5C99D] px-10 py-4 text-[11px] font-bold uppercase tracking-[.15em] text-[#0D1B3E]" whileHover={{ scale: 1.04, backgroundColor: "#ffffff" }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 320 }}>
                Start a conversation <ArrowRight size={19} />
              </motion.a>
            </motion.div>
          </AnimSection>
        </div>
      </section>

      {/* ══════ FORM ══════ */}
      <section id="enquiry-form" className="bg-[#FCFAF6] px-5 pb-24 pt-16 sm:px-9 lg:px-14 lg:pb-36">
        <motion.div className="mx-auto max-w-[900px]" initial={{ opacity: 0, y: 38 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <FranceEnquiryForm />
        </motion.div>
      </section>

      <AltheaFooter />
    </main>
  );
}
