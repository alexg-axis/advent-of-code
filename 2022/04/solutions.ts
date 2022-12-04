import type { Input } from "../../utils/deno/input.ts";

function oneFullyContainsTheOther(a: number[], b: number[]): boolean {
  return (a[0] >= b[0] && a[1] <= b[1]) || (b[0] >= a[0] && b[1] <= a[1]);
}

export function explodeRange(range: string): Set<number> {
  const [start, end] = range.split("-").map(Number);
  return new Set(new Array(end - start + 1).fill(0).map((_, i) => start + i));
}

function setOverlaps(a: Set<number>, b: Set<number>): boolean {
  return new Set([...a, ...b]).size !== a.size + b.size;
}

export function solvePart1(input: Input): number {
  return input.lines
    .map((line) => line.split(",").map((range) => range.split("-").map(Number)))
    .filter(([a, b]) => oneFullyContainsTheOther(a, b)).length;
}

export function solvePart2(input: Input): number {
  return input.lines
    .map((line) => line.split(",").map(explodeRange))
    .filter(([a, b]) => setOverlaps(a, b)).length;
}
