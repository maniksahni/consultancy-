import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: { absolute: "Althéa Consulting | Study in France Admissions" },
  description:
    "Althéa Consulting helps students explore study opportunities in France with considered one-to-one guidance and official-source university research.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeClient />;
}