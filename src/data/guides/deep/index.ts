import type { ChapterDepth } from "../types";
import { franceDepth } from "./france";
import { ukDepth } from "./uk";
import { usaDepth } from "./usa";
import { canadaDepth } from "./canada";
import { germanyDepth } from "./germany";
import { australiaDepth } from "./australia";
import { irelandDepth } from "./ireland";

/** In-depth additions per country, keyed by chapter slug. */
export const depth: Record<string, Record<string, ChapterDepth>> = {
  france: franceDepth,
  uk: ukDepth,
  usa: usaDepth,
  canada: canadaDepth,
  germany: germanyDepth,
  australia: australiaDepth,
  ireland: irelandDepth,
};
