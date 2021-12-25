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


//       O                                     O
// {o)xxx|===============-  *  -===============|xxx(o}
//       O                                     O
// Here be dragons.
// I didn't have time to try kiwi or any other constraint solver,
// so it became nasty quite quickly..

export function solvePart2(entries: Entry[]): number {
  let count = 0;
  for (const entry of entries) {
    // Identified patterns 0-9
    const patterns = new Array<string[] | null>(10).fill(null);
    for (const pattern of entry.signalPatterns) {
      if (pattern.length === 2)
        patterns[1] = pattern;
      else if (pattern.length === 3)
        patterns[7] = pattern;
      else if (pattern.length === 4)
        patterns[4] = pattern;
      else if (pattern.length === 7)
        patterns[8] = pattern;
    }

    const identified: {[key: string]: string} = {};
    // The difference between 7 and 1 is the middle
    identified["top"] = patterns[7]!.filter(x => !patterns[1]!.includes(x))![0];
    // The difference between a 9 and a 4 + the top is the bottom
    identified["bottom"] = filter(entry.signalPatterns, 1, x => (!patterns[4]!.includes(x) && !identified["top"].includes(x)))[0];
    identified["lower-left"] = filter(entry.signalPatterns, 1, x => (!patterns[4]!.includes(x) && !identified["top"].includes(x) && !identified["bottom"].includes(x)))[0];
    identified["middle"] = filter(entry.signalPatterns, 1, x => (!patterns[7]!.includes(x) && !identified["bottom"].includes(x)))[0];

    patterns[0] = patterns[8]!.filter(x => !identified["middle"].includes(x));
    patterns[9] = [...patterns[4]!, ...identified["top"], ...identified["bottom"]];
    patterns[3] = [...patterns[7]!, ...identified["middle"], ...identified["bottom"]];

    identified["lower-right"] = filter(entry.signalPatterns, 1, x => (!patterns[9]!.filter(x => !patterns[1]!.includes(x)).includes(x)))[0];
    identified["top-right"] = patterns[1]!.filter(x => !identified["lower-right"].includes(x))[0];
    identified["top-left"] = patterns[8]!.filter(x => ![...identified["top"], ...identified["bottom"], ...identified["lower-left"], ...identified["middle"], ...identified["lower-right"], ...identified["top-right"]].includes(x))[0];

    let number = "";
    for (const pattern of entry.outputPatterns)
      number += mapNumber(identified, pattern);
    count += Number(number);
  }
  return count;
}

type FilterFunction = (x: string) => boolean;
function filter(patterns: string[][], expectedLength: number, filterFunction: FilterFunction): string[] {
  return patterns.filter(pattern => pattern.filter(filterFunction as any).length === expectedLength)[0].filter(filterFunction as any);
}

function mapNumber(identified: { [key: string]: string }, pattern: string[]): number {
  if (pattern.length == 6 && pattern.includes(identified["top"]) && pattern.includes(identified["top-right"]) && pattern.includes(identified["lower-right"]) && pattern.includes(identified["bottom"]) && pattern.includes(identified["lower-left"]) && pattern.includes(identified["top-left"]))
    return 0;
  if (pattern.length == 2)
    return 1;
  if (pattern.length == 5 && pattern.includes(identified["top"]) && pattern.includes(identified["top-right"]) && pattern.includes(identified["bottom"]) && pattern.includes(identified["lower-left"]) && pattern.includes(identified["middle"]))
    return 2;
  if (pattern.length == 5 && pattern.includes(identified["top"]) && pattern.includes(identified["top-right"]) && pattern.includes(identified["bottom"]) && pattern.includes(identified["lower-right"]) && pattern.includes(identified["middle"]))
    return 3;
  if (pattern.length == 4)
    return 4;
  if (pattern.length == 5 && pattern.includes(identified["top"]) && pattern.includes(identified["top-left"]) && pattern.includes(identified["bottom"]) && pattern.includes(identified["lower-right"]) && pattern.includes(identified["middle"]))
    return 5;
  if (pattern.length == 6 && pattern.includes(identified["top"]) && pattern.includes(identified["top-left"]) && pattern.includes(identified["bottom"]) && pattern.includes(identified["lower-right"]) && pattern.includes(identified["middle"]) && pattern.includes(identified["lower-left"]))
    return 6;
  if (pattern.length == 3)
    return 7;
  if (pattern.length == 7)
    return 8;
  return 9;
}
