import Page from '@/components/althea/Page';
import DestinationComparison from '@/components/althea/DestinationComparison';
import { Notice, Section, TextLink } from '@/components/maison/ui';
import { liveCountries } from '@/lib/comingSoon';
import { pageMetadata } from '@/lib/seo';
import { quickAnswers } from "@/data/quickAnswers";

export const metadata = pageMetadata('/compare', {title:'Compare Study Abroad Countries', description:'Compare France vs UK, USA, Canada, Germany, Australia and Ireland for study abroad: academic focus, cities, application approach and priorities.'});
export default function ComparePage() {
  return <Page path="/compare" faqs={quickAnswers["/compare"]} eyebrow="YOUR SHORTLIST, SIDE BY SIDE" title="Different places." accent="A clearer choice." intro="Compare what changes between your destinations, then explore the options that fit your plans." closing={false}><Section tone="ivory">{liveCountries.length > 1 ? <DestinationComparison /> : <Notice kicker={<span className="ms-soon-tag">Coming soon</span>} tone="ink"><p className="ms-notice-title">Side-by-side comparison <em>opens with our next destinations.</em></p><p>Althéa supports France today. Comparing France with the UK, USA, Canada, Germany, Australia and Ireland will open when support for those countries does.</p><TextLink href="/study-in-france">Explore studying in France</TextLink></Notice>}</Section></Page>;
}
