import type { Input } from "../../utils/deno/input.ts";

export function solvePart1(input: Input): number {
  return input.lines
    .map((x) =>
      Number(x.replace(/[^0-9]/g, "")[0] + x.replace(/[^0-9]/g, "").slice(-1))
    )
    .reduce((sum, x) => sum + x, 0);
}
