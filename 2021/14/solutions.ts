import { Input } from "../../utils/deno/input.ts";

type PairInsertions = {[key: string]: string};

export function parseInput(input: Input): [string, PairInsertions] {
  const template = input.lines[0];
  const insertions = input.lines.slice(2).reduce((insertions, x) => {
    const parts = x.split(" -> ");
    insertions[parts[0]] = parts[1];
    return insertions;
  }, {} as PairInsertions) as PairInsertions;

  return [template, insertions];
}

function solve([template, insertions]: [string, PairInsertions], steps: number): number {
  let pairs: {[key: string]: number} = {};

  const increment = (source: {[key: string]: number}, pair: string, x: number) => source[pair] = (source[pair] ?? 0) + x;

  const decrement = (source: { [key: string]: number }, pair: string, x: number) => {
    source[pair] = (source[pair] ?? 1) - x;
    if (source[pair] === 0)
      delete source[pair];
  }

  // Insert initial pairings
  for (let i = 1; i < template.length; i++) {
    const pair = template.slice(i - 1, i + 1);
    increment(pairs, pair, 1);
  }

  // Loop over each step, inserting pairs as needed
  for (let step = 0; step < steps; step++) {
    const copy: {[key: string]: number} = {};
    Object.assign(copy, pairs);
    for (const pair of Object.keys(pairs)) {
      const insertion = insertions[pair];
      const count = pairs[pair];
      decrement(copy, pair, count);
      increment(copy, pair[0] + insertion, count);
      increment(copy, insertion + pair[1], count);
    }
    pairs = {};
    Object.assign(pairs, copy);
  }

  // Calculate occurances
  const counts: { [key: string]: number } = {};
  for (const pair of Object.keys(pairs)) {
    counts[pair[0]] = (counts[pair[0]] ?? 0) + pairs[pair];
    counts[pair[1]] = (counts[pair[1]] ?? 0) + pairs[pair];
  }

  // Sort entries
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).map(x => x[1]);
  return Math.round((sorted[0] - sorted[sorted.length - 1]) / 2);
}

export function solvePart1(input: [string, PairInsertions]): number {
  return solve(input, 10);
}

export function solvePart2(input: [string, PairInsertions]): number {
  return solve(input, 40);
}
