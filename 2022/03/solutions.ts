import type { Input } from "../../utils/deno/input.ts";

function parseInput(input: Input): [string[], string[]][] {
  return input.lines.map(
    (x) =>
      [
        x.substring(0, x.length / 2).split(""),
        x.substring(x.length / 2).split(""),
      ] as [string[], string[]]
  );
}

export function priority(c: string): number {
  const a = "a".charCodeAt(0);
  const z = "z".charCodeAt(0);
  const A = "A".charCodeAt(0);
  const Z = "Z".charCodeAt(0);
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

export function solvePart1(input: Input): number {
  return parseInput(input)
    .map((x) => priority(inBoth(...x)))
    .reduce((sum, x) => sum + x, 0);
}
