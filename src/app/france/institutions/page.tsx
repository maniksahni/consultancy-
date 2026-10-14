import Page from '@/components/althea/Page';
import LiveFrenchRegistry from '@/components/althea/LiveFrenchRegistry';
export const metadata={title:'Official French institution registry'};
export default function Institutions(){return <Page eyebrow="OPEN GOVERNMENT DATA" title="A world of institutions." intro="Search the French Ministry of Higher Education’s public institution register. Open university websites and continue your research at the source."><LiveFrenchRegistry/></Page>}
