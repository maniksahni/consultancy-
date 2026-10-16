import registry from "@/data/parisPhotos.json";

// The Paris photography collection: every image has a recorded photographer,
// source and licence (see src/data/parisPhotos.json and /acknowledgements).
export type ParisSlug = keyof typeof registry;
export type ParisPhoto = (typeof registry)[ParisSlug];

export function paris(slug: ParisSlug): ParisPhoto { return registry[slug]; }
export const parisPhotos = Object.entries(registry) as [ParisSlug, ParisPhoto][];

/** The cover photograph for each page, chosen so every chapter of the site feels like Paris. */
const covers: Record<string, ParisSlug> = {
  "/about": "ile-de-la-cite",
  "/services": "cafe-palais-royal",
  "/book-consultation": "cafe-night",
  "/study-in-france": "bnf-salle-ovale",
  "/france": "eiffel-sun-rays",
  "/settle-in-france": "paris-window",
  "/career-support": "la-defense-skyline",
  "/jobs": "la-defense-walk",
  "/first-30-days-france": "tgv-arrival",
  "/admissions-process": "student-late",
  "/campus-france-guide": "eiffel-between-buildings",
  "/france/campus-france": "eiffel-between-buildings",
  "/scholarships": "louvre-sunset",
  "/mentorship-model": "luxembourg-garden",
  "/outcomes": "graduation",
  "/reviews": "montmartre-cafe",
  "/faq": "metro-art-nouveau",
  "/destinations": "paris-night-aerial",
  "/universities": "rooftops-eiffel",
  "/programmes": "louvre-night",
  "/knowledge": "student-cafe",
  "/insights": "paris-bookshop",
  "/privacy": "haussmann-crossing",
  "/terms": "paris-street-dusk",
  "/acknowledgements": "paris-rooftops",
  "/france/universities": "sacre-coeur-dusk",
  "/france/institutions": "conciergerie-dusk",
  "/france/programmes": "paris-skyline-storm",
  "/france/resources": "seine-sunset",
  "/france/costs": "cafe-red-chairs",
  "/france/living": "metro-platform",
  "/france/scholarships": "invalides-sunset",
  "/france/visas": "gare-du-nord",
  "/france/faq": "metro-rain-night",
  "/cities/paris": "eiffel-dusk-leaves",
  "/cities/lyon": "city-lyon",
  "/cities/toulouse": "city-toulouse",
  "/cities/lille": "city-lille",
  "/cities/bordeaux": "city-bordeaux",
  "/cities/nice": "city-nice",
  "/insights/choosing-your-programme": "paris-bookshop",
  "/insights/planning-your-france-budget": "cafe-red-chairs",
  "/insights/understanding-campus-france": "haussmann-facade",
  "/destinations/uk": "london",
  "/destinations/usa": "new-york",
  "/destinations/canada": "toronto",
  "/destinations/australia": "sydney",
  "/destinations/germany": "berlin",
  "/destinations/ireland": "dublin",
};
export const countryPhoto: Record<string, ParisSlug> = { france: "eiffel-dusk-leaves", uk: "london", usa: "new-york", canada: "toronto", australia: "sydney", germany: "berlin", ireland: "dublin" };

export function coverFor(path?: string): ParisPhoto {
  if (path && covers[path]) return paris(covers[path]);
  if (path?.startsWith("/programmes/")) return paris("louvre-night");
  return paris("eiffel-autumn-sky");
}

/** Short place captions; photographer and licence provenance stays in the registry. */
export function photoPlace(photo: ParisPhoto): string {
  const slug = photo.file.split('/').pop()?.replace(/\.webp$/, '') || '';
  const places: Record<string, string> = { london:'London', 'new-york':'New York', toronto:'Toronto', sydney:'Sydney', berlin:'Berlin', dublin:'Dublin', 'city-lyon':'Lyon', 'city-toulouse':'Toulouse', 'city-lille':'Lille', 'city-bordeaux':'Bordeaux', 'city-nice':'Nice' };
  if (places[slug]) return places[slug];
  if (slug.includes('eiffel')) return 'Eiffel Tower · Paris';
  if (slug.includes('louvre')) return 'Louvre · Paris';
  if (slug.includes('la-defense')) return 'La Défense · Paris';
  if (slug.includes('montmartre')) return 'Montmartre · Paris';
  if (slug.includes('pont-alexandre')) return 'Pont Alexandre III · Paris';
  return 'Paris';
}
