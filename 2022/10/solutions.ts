import type { Input } from "../../utils/deno/input.ts";
import { sum } from "../../utils/deno/arrays.ts";

type Instruction = "addx" | "noop";

export function solvePart1(input: Input): number {
  const instructions: [Instruction, number][] = input.lines.map((x) => {
    const parts = x.split(" ");
    return [parts[0] as Instruction, Number(parts[1])];
  });

  let cycle = 1;
  let x = 1;

  const signalStrengths: number[] = [];

  for (const [instruction, arg] of instructions) {
    const cycles = instruction === "noop" ? 1 : 2;
    const toAdd = instruction === "noop" ? 0 : arg;
    for (let i = 0; i < cycles; i++, cycle++) {
      if (cycle === 20 || (cycle - 20) % 40 === 0) {
        signalStrengths.push(x * cycle);
      }
    }
    x += toAdd;
  }

  return signalStrengths.reduce(sum);
}
