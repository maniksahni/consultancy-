/**
 * Search titles for institution pages, built around what students type into Google:
 * "<school> fees for Indian students", "<school> admission for Indian students", "<school> tuition fees".
 * The brand suffix is dropped (absolute title) so the keywords fit in 60 characters.
 */
export function institutionSearchTitle(name: string, shortName = name, city = ""): { absolute: string } {
  for (const n of [name, shortName]) {
    for (const t of [`${n} Fees & Admission for Indian Students`, `${n}: Fees for Indian Students`, `${n} Fees & Courses for Indians`, `${n} Fees & Courses`]) if (t.length <= 60) return { absolute: t };
  }
  if (shortName.length <= 60) return { absolute: shortName };
  // Very long names: keep the start and the city so sister schools stay distinct.
  return { absolute: `${shortName.slice(0, 54 - city.length).replace(/\s+\S*$/, "")}… (${city})` };
}
