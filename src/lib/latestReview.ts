import { programmeResearch } from "@/data/programmeResearch";

/** The most recent real `reviewedAt` across every researched programme - not a hardcoded date, so the
 * "updated ..." badges on /programmes stay true as new records are verified and added. */
export const latestReviewedAt = programmeResearch.reduce(
  (max, p) => (p.reviewedAt > max ? p.reviewedAt : max),
  programmeResearch[0]?.reviewedAt ?? "2026-01-01"
);

export function formatReviewDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(d);
}
