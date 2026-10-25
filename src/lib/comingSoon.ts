/**
 * Althéa supports France today: students coming to study there and everyone already living there.
 * Other destinations keep their information pages, but every button that would lead to booking for them
 * says "Coming soon", and the booking form only accepts live countries.
 * To switch a destination on everywhere, add its slug to `liveCountries`.
 */
export const liveCountries: string[] = ["france"];

const names: Record<string, { name: string; prose: string }> = {
  france: { name: "France", prose: "France" },
  uk: { name: "United Kingdom", prose: "the UK" },
  usa: { name: "United States", prose: "the USA" },
  canada: { name: "Canada", prose: "Canada" },
  germany: { name: "Germany", prose: "Germany" },
  ireland: { name: "Ireland", prose: "Ireland" },
  australia: { name: "Australia", prose: "Australia" },
};

export const isLive = (slug: string) => liveCountries.includes(slug);
export const isComingSoon = (slug: string) => slug in names && !isLive(slug);
export const countryName = (slug: string) => names[slug]?.name ?? slug;
export const countryProse = (slug: string) => names[slug]?.prose ?? slug;

/** The coming-soon country a path belongs to (country guides, university directories), if any. */
export function comingSoonFor(path: string): string | undefined {
  const m = path.match(/^\/(?:destinations|universities)\/([a-z]+)(?:\/|$)/);
  return m && isComingSoon(m[1]) ? m[1] : undefined;
}

