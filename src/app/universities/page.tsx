import { pageMetadata } from "@/lib/seo";
import Page from '@/components/althea/Page';
import SnapshotFinder from '@/components/althea/SnapshotFinder';
export const metadata=pageMetadata('/universities', {title: 'French Universities: Explore Institutions & Programmes'});
export default function Directory(){return <Page eyebrow="LE PARCOURS · FRANCE" title="Find your university." intro="Explore the reviewed collection. Follow official sources for current applications and requirements."><SnapshotFinder kind="universities"/></Page>}
