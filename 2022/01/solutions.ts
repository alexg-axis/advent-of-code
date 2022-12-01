import type { Input } from "../../utils/deno/input.ts";

function sum(values: number[]): number {
  return values.reduce((sum, x) => sum + x, 0);
}

export function solvePart1(input: Input): number {
  const rations = input.raw.split("\n\n").map((x) => x.split("\n").map(Number));
  return rations.sort((a, b) => sum(b) - sum(a)).map(sum)[0];
}

export function solvePart2(input: Input): number {
  const rations = input.raw.split("\n\n").map((x) => x.split("\n").map(Number));
  const sorted = rations.sort((a, b) => sum(b) - sum(a)).map(sum);
  return sum(sorted.slice(0, 3));
}
