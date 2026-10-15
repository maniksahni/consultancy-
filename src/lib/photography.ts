import collection from "@/data/visualCollection.json";

export type EditorialPhoto = { file: string; caption: string };
const photoCollection = collection as Record<string, EditorialPhoto>;

/** Each visible placement has its own reserved photograph, never a random fallback. */
export function photoFor(placement: string): EditorialPhoto | undefined {
  return photoCollection[placement.replace(/\/$/, "")];
}
export function photoCaption(photo: EditorialPhoto): string {
  return photo.caption.replace(/_/g, " ").replace(/\.(jpe?g|png|webp)$/i, "").replace(/^File:/, "").trim();
}
