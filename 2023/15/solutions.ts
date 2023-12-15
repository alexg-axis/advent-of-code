import { Input } from "../../utils/deno/input.ts";

function hash(x: string): number {
  let currentValue = 0;
  for (let i = 0; i < x.length; i++) {
    currentValue += x.charCodeAt(i);
    currentValue *= 17;
    currentValue %= 256;
  }
  return currentValue;
}

export function solvePart1(input: Input): number {
  return input.raw
    .replaceAll("\n", "")
    .split(",")
    .map(hash)
    .reduce((sum, x) => sum + x);
}
