import { pageMetadata } from "@/lib/seo";
import Page from '@/components/althea/Page';
import SnapshotFinder from '@/components/althea/SnapshotFinder';
export const metadata=pageMetadata('/france/institutions', {title: 'French Higher Education Institutions Directory'});
export default function Directory(){return <Page eyebrow="LE PARCOURS · FRANCE" title="French institutions." intro="Explore the reviewed collection. Follow official sources for current applications and requirements."><SnapshotFinder kind="universities"/></Page>}
