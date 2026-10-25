/**
 * Althéa supports France today: students coming to study there and everyone already living there.
 * The other destinations keep their research guides, labelled "Coming soon" until support opens.
 */
export const liveCountry = "france";

const soonNames: Record<string, string> = {
  uk: "the UK", usa: "the USA", canada: "Canada", germany: "Germany", ireland: "Ireland", australia: "Australia",
};

export const isComingSoon = (slug: string) => slug in soonNames;

/** The country a page belongs to when Althéa's support there is still coming soon. */
export function comingSoonFor(path: string): string | undefined {
  const m = path.match(/^\/(?:destinations|universities)\/([a-z]+)(?:\/|$)/);
  return m ? soonNames[m[1]] : undefined;
}
