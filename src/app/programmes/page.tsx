import { pageMetadata } from "@/lib/seo";
import Page from '@/components/althea/Page';
import SnapshotFinder from '@/components/althea/SnapshotFinder';
export const metadata=pageMetadata('/programmes', {title: 'Study Programmes & Fees', description: 'Search in-site programme records with published tuition, entry requirements and application dates, where verified.'});
export default function Directory(){return <Page eyebrow="LE PARCOURS · FRANCE" title="Find your programme." intro="Explore the reviewed collection. Published figures and evidence summaries are shown here; unverified details are labelled."><SnapshotFinder kind="programmes"/></Page>}
