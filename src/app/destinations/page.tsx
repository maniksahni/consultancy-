import { pageMetadata } from "@/lib/seo";
import Page from '@/components/althea/Page';
import { countryGuides } from "@/data/guides";
import DestinationAtlas from '@/components/althea/DestinationAtlas';
import { Card, Grid, Section } from "@/components/maison/ui";
export const metadata=pageMetadata('/destinations', {title: 'Best Study Abroad Countries for Indians',description:'Best countries to study abroad from India in 2027: compare France, the UK, USA, Canada, Germany, Australia and Ireland on fees, visas and post-study work.'});
export default function Destinations() {
  return <Page path="/destinations" items={countryGuides.map((g) => ({ name: `Study in ${g.prose}`, path: g.hubPath }))} eyebrow="THE ALTHÉA ATLAS" title="The world is your" accent="next chapter." intro="From Parisian avenues to new horizons. Explore seven destinations and find the questions that will shape your decision.">
    <Section tone="ivory" kicker="SEVEN DESTINATIONS" title="Choose a place." accent="Picture a life." align="split" intro="Hover or tap a country to bring it into view. Save up to three to compare them side by side.">
      <DestinationAtlas />
    </Section>
    <Section tone="ink" kicker="BEFORE YOU CHOOSE" title="Choose a life." accent="Not just a location.">
      <Grid cols={3}>{[['Academic fit','Read the actual modules, research interests and entry requirements. Your programme matters more than a postcard.'],['A realistic budget','Add tuition, accommodation, insurance, travel and application costs. Check the latest figures with official sources.'],['Everyday life','Consider language, housing, accessibility, weather and the support you will need when you arrive.']].map(([t,p],i)=><Card key={t} index={i+1} title={t}><p>{p}</p></Card>)}</Grid>
    </Section>
  </Page>;
}
