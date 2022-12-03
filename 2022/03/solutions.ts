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

function chunks<T>(x: T[], length: number): T[][] {
  return Array(Math.ceil(x.length / length))
    .fill(undefined)
    .map((_, index) => index * length)
    .map((begin) => x.slice(begin, begin + length));
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
    .reduce((sum, x) => sum + x, 0);
}

export function solvePart2(input: Input): number {
  return chunks(
    input.lines.map((x) => x.split("")),
    3
  )
    .map((x) => priority(inGroup(x[0], x[1], x[2])))
    .reduce((sum, x) => sum + x, 0);
}
