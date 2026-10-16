import Page from '@/components/althea/Page';
import DestinationComparison from '@/components/althea/DestinationComparison';
import { Section } from '@/components/maison/ui';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('/compare', {title:'Compare Study Abroad Countries', description:'Compare France vs UK, USA, Canada, Germany, Australia and Ireland for study abroad: academic focus, cities, application approach and priorities.'});
export default function ComparePage() {
  return <Page path="/compare" eyebrow="YOUR SHORTLIST, SIDE BY SIDE" title="Different places." accent="A clearer choice." intro="Compare what changes between your destinations, then explore the options that fit your plans." closing={false}><Section tone="ivory"><DestinationComparison /></Section></Page>;
}
