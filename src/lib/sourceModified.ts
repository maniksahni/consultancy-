import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

/** When a static page's source last changed in git (YYYY-MM-DD), for dateModified; undefined outside a git checkout. */
export function sourceModified(path: string): string | undefined {
  const file = `src/app${path === "/" ? "" : path}/page.tsx`;
  if (!existsSync(file)) return undefined;
  try {
    return execFileSync("git", ["log", "-1", "--format=%cs", "--", file], { encoding: "utf8" }).trim() || undefined;
  } catch {
    return undefined;
  }
}
