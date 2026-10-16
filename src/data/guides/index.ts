import { franceGuide } from "./france";
import { ukGuide } from "./uk";
import { usaGuide } from "./usa";
import { canadaGuide } from "./canada";
import { germanyGuide } from "./germany";
import { australiaGuide } from "./australia";
import { irelandGuide } from "./ireland";
import type { CountryGuide } from "./types";

export const countryGuides: CountryGuide[] = [franceGuide, ukGuide, usaGuide, canadaGuide, germanyGuide, australiaGuide, irelandGuide];
/** Guides whose chapters live under /destinations/<country>/<chapter>. */
export const destinationGuides = countryGuides.filter((g) => g.country !== "france");
export const guideFor = (country: string) => countryGuides.find((g) => g.country === country);
