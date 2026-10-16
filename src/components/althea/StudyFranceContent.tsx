import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Compass, Landmark, Wallet } from "lucide-react";
import Page from "@/components/althea/Page";
import { GuideChapterIndex } from "@/components/guides/GuideChapterPage";
import { franceGuide } from "@/data/guides/france";
import { Btn, Card, Checklist, Grid, Kicker, Notice, Section, Split, TextLink } from "@/components/maison/ui";
import { checked, cities } from "@/data/france";
import { coverFor, paris } from "@/lib/paris";

export default function StudyFranceContent({ imagePlacement = "/study-in-france" }: { imagePlacement?: string }) {
  const student = paris("student-cafe");
  return (
    <Page
      path="/study-in-france"
      imagePlacement={imagePlacement}
      eyebrow="INDEPENDENT ADMISSIONS GUIDANCE"
      title="Study in France from India,"
      accent="with a plan."
      intro="Explore the right education pathway, prepare a thoughtful application and plan for the transition to life in France."
    >
      <Section tone="ivory">
        <Split image={student.file} alt={student.alt} caption="Paris">
          <Kicker>A CLEARER APPLICATION JOURNEY</Kicker>
          <h2>Make each decision<br /><em>with purpose.</em></h2>
          <p>Independent guidance with partner-supported application assistance where appropriate. We help you navigate the process; institutions make admissions decisions.</p>
          <Checklist items={[
            "Choose programmes aligned with your goals and experience",
            "Understand French education pathways and official application routes",
            "Review application documents, CV and statement of purpose",
            "Prepare for interviews and organise application materials",
            "Plan pre-departure steps and practical arrival questions",
          ]} />
          <p className="ms-muted"><strong>Personal by design:</strong> direct guidance with Harshita Kohli, based in Paris, helping you align degree ambitions with French career reality.</p>
          <Btn href="/book-consultation">Discuss your study plan</Btn>
        </Split>
      </Section>

      <Section tone="ink" kicker="A CLEAR START FOR APPLICANTS IN INDIA" title="Study in France from India:" accent="the first answers.">
        <Grid cols={3}>
          <Card index={1} title="Which application route should I follow?" href="/campus-france-guide" cta="The Campus France process, step by step"><p>India is covered by the Études en France procedure: create your account, upload documents, pay the ₹20,000 fee once your file is validated, attend the academic interview, accept one offer and apply for the visa. Our guide walks through every step.</p></Card>
          <Card index={2} title="What should I compare before choosing a course?" href="/universities?country=france&view=courses#course-finder" cta="Browse France course records"><p>Check the curriculum, entry requirements, teaching language, tuition for your applicant category and the institution’s current deadline. Compare English-taught Master’s tracks with public universities and Grandes Écoles.</p></Card>
          <Card index={3} title="Can an adviser guarantee admission or a visa?" href="/france/visas" cta="The French student visa, explained"><p>No. Institutions decide admissions and awards; French authorities decide visas. Our visa chapter lists every document, fee and deadline so your application is complete. Althéa provides independent preparation, not guaranteed outcomes.</p></Card>
        </Grid>
      </Section>

      <Section tone="paper" kicker={`THE COMPLETE FRANCE GUIDE · ${franceGuide.chapters.length} CHAPTERS`} title="Everything, A to Z." accent="On one site." intro="From choosing a programme to your first job in France: fees, Campus France, visa, housing, work and post-study rules, all checked against official French sources in October 2026.">
        <GuideChapterIndex guide={franceGuide} />
      </Section>

      <Section tone="ivory" kicker="FOUR PLANNING MOVES" title="Plan the whole picture," accent="not just the application.">
        <Grid cols={4}>
          <Card icon={<BookOpen size={22} strokeWidth={1.4} />} title="Start with the subject" href="/universities?country=france&view=courses#course-finder" cta="Open the guide"><p>Compare course content, academic prerequisites and teaching language before choosing an institution.</p></Card>
          <Card icon={<Wallet size={22} strokeWidth={1.4} />} title="Build the whole budget" href="/knowledge#budget" cta="Open the guide"><p>Include tuition, housing, deposits, transport, food and arrival costs. Do not assume a scholarship will be awarded.</p></Card>
          <Card icon={<Landmark size={22} strokeWidth={1.4} />} title="Find your application route" href="/campus-france-guide" cta="Open the guide"><p>The institution, degree, nationality and country of residence can affect the route. Check your local Campus France office.</p></Card>
          <Card icon={<Compass size={22} strokeWidth={1.4} />} title="Prepare for everyday France" href="/france/living" cta="Open the guide"><p>Consider campus location, accommodation, transport and French language learning alongside your studies.</p></Card>
        </Grid>
      </Section>

      <Section tone="ink" kicker="SIX STUDENT CITIES" title="Find your city." accent="Then your campus." intro="Paris is only the beginning. Explore the cities where many international students build their French chapter.">
        <div className="ms-cities">{cities.map((c, i) => { const photo = coverFor(`/cities/${c.slug}`); return (
          <Link key={c.slug} href={`/cities/${c.slug}`} className={`ms-city${i === 0 ? " is-lead" : ""}`} data-cursor="Explore">
            <Image src={photo.file} alt={photo.alt} fill sizes="(max-width:900px) 92vw, 33vw" />
            <div className="ms-city-copy"><span>{String(i + 1).padStart(2, "0")}</span><h3>{c.name}</h3><p>{c.tag}</p></div>
            <span className="ms-city-arrow"><ArrowUpRight size={20} aria-hidden="true" /></span>
          </Link>); })}</div>
      </Section>

      <Section tone="ivory" kicker="AFTER THE OFFER LETTER" title="Your support doesn’t end" accent="at the offer." align="split">
        <Grid cols={2}>
          <Card title="Arrival brings its own questions" href="/settle-in-france" cta="Settle in France support"><p>Once you have an offer, arrival brings its own practical questions. Plan your transition with our Settle in France support.</p></Card>
          <Card title="Independent guidance, clearly scoped"><p>Althéa is not a university representative. Any partner-supported application assistance is described before work begins; admission, scholarships and visas are decided by the relevant institutions and authorities and cannot be guaranteed.</p></Card>
        </Grid>
        <Notice kicker="YOUR OFFICIAL STARTING POINTS">
          <div className="ms-row"><TextLink href="/programmes">Explore the programme directory</TextLink><TextLink href="/campus-france-guide">Explore the application procedure guide</TextLink><TextLink href="/france/visas">Explore the student visa guide</TextLink></div>
          <p className="ms-muted" style={{ marginTop: 16 }}>Editorial overview checked {checked}. This is independent orientation; official requirements must be checked for your own circumstances.</p>
        </Notice>
      </Section>
    </Page>
  );
}
