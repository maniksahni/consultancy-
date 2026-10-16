import { pageMetadata } from "@/lib/seo";
import { brand } from "@/config/brand";
import Page from "@/components/althea/Page";
import { Btn, Kicker, Section, Split, Steps, TextLink } from "@/components/maison/ui";
import { paris } from "@/lib/paris";

export const metadata = pageMetadata("/career-support", {
  title: "Career Coach in France for Students",
  description: `Build your job search plan in France with practical CV, LinkedIn, interview, internship and alternance guidance from ${brand.shortName}.`,
});

const steps = [
  ["French-style CV", "Clarify your experience and adapt your CV structure and language to French recruitment conventions."],
  ["LinkedIn & positioning", "Make your profile easier to understand for recruiters and align it with the roles you’re targeting."],
  ["Internships & alternance", "Plan a focused search, prepare application materials and get oriented to the process."],
  ["Interviews & workplace French", "Practice how to present your strengths and communicate with confidence in professional situations."],
];

export default function CareerSupportPage() {
  const walk = paris("la-defense-walk");
  return <Page path="/career-support" eyebrow="CAREER SUPPORT IN FRANCE" title="Career support" accent="in France." intro="Practical career preparation for international students and young professionals building a future in France.">
    <Section tone="ivory" kicker="WHERE WE START" title="Your experience." accent="A workable plan." intro="Start with your goals, current experience, language level and the reality of your target sector. Together, we turn those details into a clear and workable plan." action={<Btn href="/book-consultation">Book a career support call</Btn>}>
      <Steps items={steps.map(([title, text]) => ({ title, body: <p>{text}</p> }))} />
    </Section>
    <Section tone="ink">
      <Split image={walk.file} alt={walk.alt} caption="La Défense" reverse>
        <Kicker>PERSONAL, INDEPENDENT GUIDANCE</Kicker>
        <h2>A plan built around<br /><em>your own experience.</em></h2>
        <p>We provide coaching, feedback and preparation. Hiring, admission to a programme, internship offers and work authorisation decisions belong to employers and official authorities and cannot be guaranteed.</p>
        <TextLink href="/settle-in-france">See all settling support</TextLink>
        <TextLink href="/jobs">Explore jobs & opportunities in France</TextLink>
      </Split>
    </Section>
  </Page>;
}
