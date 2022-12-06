import type { Input } from "../../utils/deno/input.ts";

function unique<T>(value: T, index: number, self: T[]): boolean {
  return self.indexOf(value) === index;
}

export function solvePart1(input: Input): number {
  const line = input.lines[0];
  const stack: string[] = [];
  for (let i = 0; i <= line.length; i++) {
    stack.push(line[i]);
    if (stack.length > 4) {
      stack.shift();
    }

    if (stack.filter(unique).length === 4) {
      return i + 1;
    }
  }
  return -1;
}

export function solvePart2(input: Input): number {
  const line = input.lines[0];
  const stack: string[] = [];
  for (let i = 0; i <= line.length; i++) {
    stack.push(line[i]);
    if (stack.length > 14) {
      stack.shift();
    }

    if (stack.filter(unique).length === 14) {
      return i + 1;
    }
  }
  return -1;
}
