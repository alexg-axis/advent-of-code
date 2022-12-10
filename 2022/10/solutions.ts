import type { Input } from "../../utils/deno/input.ts";
import { sum } from "../../utils/deno/arrays.ts";

type Instruction = "addx" | "noop";

function replaceAt(string: string, index: number, replacement: string): string {
  return (
    string.substring(0, index) +
    replacement +
    string.substring(index + replacement.length)
  );
}

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

export function solvePart2(input: Input): string {
  const instructions: [Instruction, number][] = input.lines.map((x) => {
    const parts = x.split(" ");
    return [parts[0] as Instruction, Number(parts[1])];
  });

  let crt = ".".repeat(6 * 40);

  let cycle = 1;
  let x = 1;

  for (const [instruction, arg] of instructions) {
    const cycles = instruction === "noop" ? 1 : 2;
    const toAdd = instruction === "noop" ? 0 : arg;
    for (let i = 0; i < cycles; i++, cycle++) {
      crt = replaceAt(
        crt,
        cycle - 1,
        (cycle - 1) % 40 === x - 1 ||
          (cycle - 1) % 40 === x ||
          (cycle - 1) % 40 === x + 1
          ? "#"
          : "."
      );
    }
    x += toAdd;
  }

  return crt.match(/.{40}/g)!.join("\n");
}
