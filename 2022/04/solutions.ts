import type { Input } from "../../utils/deno/input.ts";

function oneFullyContainsTheOther(a: number[], b: number[]): boolean {
  return (a[0] >= b[0] && a[1] <= b[1]) || (b[0] >= a[0] && b[1] <= a[1]);
}

export function solvePart1(input: Input): number {
  return input.lines
    .map((line) => line.split(",").map((range) => range.split("-").map(Number)))
    .filter(([a, b]) => oneFullyContainsTheOther(a, b)).length;
}
