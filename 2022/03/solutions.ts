import { chunks, sum } from "../../utils/deno/arrays.ts";
import type { Input } from "../../utils/deno/input.ts";

export function priority(c: string): number {
  const a = "a".charCodeAt(0);
  const z = "z".charCodeAt(0);
  const A = "A".charCodeAt(0);
  const x = c.charCodeAt(0);

  if (a <= x && x <= z) {
    return x - a + 1;
  } else {
    return x - A + 27;
  }
}

function inBoth(a: string[], b: string[]): string {
  return a.filter((x) => b.includes(x))[0];
}

function inGroup(a: string[], b: string[], c: string[]): string {
  return a.filter((x) => b.includes(x)).filter((x) => c.includes(x))[0];
}

export function solvePart1(input: Input): number {
  return input.lines
    .map(
      (x) =>
        [
          x.substring(0, x.length / 2).split(""),
          x.substring(x.length / 2).split(""),
        ] as [string[], string[]]
    )
    .map((x) => priority(inBoth(...x)))
    .reduce(sum);
}

export function solvePart2(input: Input): number {
  return input.lines
    .map((x) => x.split(""))
    .reduce(chunks(3), [])
    .map((x) => priority(inGroup(x[0], x[1], x[2])))
    .reduce(sum);
}
