import type { Input } from "../../utils/deno/input.ts";

export function solvePart1(input: Input): string {
  const [rawStacks, instructions] = input.raw.split("\n\n");

  const lines = rawStacks.split("\n");
  const columns: string[][] = [];
  for (let i = 1; i < lines.at(-1)!.length; i += 4) {
    const column: string[] = [];
    for (let k = 0; k < lines.length - 1; k++) {
      if (lines[k][i] && lines[k][i] !== " ") {
        column.push(lines[k][i]);
      }
    }
    columns.push(column);
  }

  const movements = instructions
    .split("\n")
    .filter((x) => x)
    .map((x) => {
      const parts = x.split(" ");
      return [Number(parts[1]), Number(parts[3]) - 1, Number(parts[5]) - 1];
    });

  for (const [count, from, to] of movements) {
    for (let i = 0; i < count; i++) {
      columns[to].unshift(columns[from].shift()!);
    }
  }

  return columns.map((x) => x[0]).join("");
}

export function solvePart2(input: Input): string {
  const [rawStacks, instructions] = input.raw.split("\n\n");

  const lines = rawStacks.split("\n");
  const columns: string[][] = [];
  for (let i = 1; i < lines.at(-1)!.length; i += 4) {
    const column: string[] = [];
    for (let k = 0; k < lines.length - 1; k++) {
      if (lines[k][i] && lines[k][i] !== " ") {
        column.push(lines[k][i]);
      }
    }
    columns.push(column);
  }

  const movements = instructions
    .split("\n")
    .filter((x) => x)
    .map((x) => {
      const parts = x.split(" ");
      return [Number(parts[1]), Number(parts[3]) - 1, Number(parts[5]) - 1];
    });

  for (const [count, from, to] of movements) {
    columns[to].unshift(...columns[from].splice(0, count));
  }

  return columns.map((x) => x[0]).join("");
}
