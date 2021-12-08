import type {Input} from "../../utils/deno/input.ts";

type Entry = {
  signalPatterns: string[][],
  outputPatterns: string[][],
};

export function parseInput(input: Input): Entry[] {
  return input.lines.map(line => {
    const [rawPatterns, rawOutput] = line.split(" | ");
    const signalPatterns = rawPatterns.trim().split(" ").map(pattern => pattern.split(""));
    const outputPatterns = rawOutput.trim().split(" ").map(pattern => pattern.split(""));
    return { signalPatterns, outputPatterns};
  });
}

export function solvePart1(entries: Entry[]): number {
  let count = 0;
  for (const entry of entries) {
    for (const pattern of entry.outputPatterns) {
      if (pattern.length === 2)
        count++;
      else if (pattern.length === 3)
        count++;
      else if (pattern.length === 4)
        count++;
      else if (pattern.length === 7)
        count++;
    }
  }
  return count;
}
