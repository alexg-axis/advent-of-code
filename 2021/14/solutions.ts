import { Input } from "../../utils/deno/input.ts";

type PairInsertion = [string, string];

export function parseInput(input: Input): [string, PairInsertion[]] {
  const template = input.lines[0];
  const insertions = input.lines.slice(2).map(x => x.split(" -> ")) as PairInsertion[];

  return [template, insertions];
}

function lookupInsertion(insertions: PairInsertion[], pair: string): string {
  for (const [otherPair, insertion] of insertions) {
    if (pair === otherPair)
      return insertion;
  }
  return "";
}

export function solvePart1([template, insertions]: [string, PairInsertion[]]): number {
  for (let step = 0; step < 10; step++) {
    // Map insertions
    const mappedInsertions: string[] = [];
    for (let i = 1; i < template.length; i++) {
      const pair = template.slice(i-1, i+1);
      const insertion = lookupInsertion(insertions, pair);
      mappedInsertions.push(insertion);
    }

    // Apply insertions
    const output = [...template];
    for (let i = 0; i < mappedInsertions.length; i++)
      output.splice(1 + i * 2, 0, mappedInsertions[i]);
    template = output.join("");
  }

  // Calculate occurances
  const counts: {[key: string]: number} = {};
  for (const ch of template)
    counts[ch] = (counts[ch] ?? 0) + 1;

  // Sort entries
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(x => x[1]);
  return sorted[0] - sorted[sorted.length - 1];
}
