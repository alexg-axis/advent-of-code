import { Input } from "../../utils/deno/input.ts";

interface Range {
  min: number;
  max: number;
  length: number;
}

interface Almanac {
  seeds: number[];
  maps: Record<string, { destination: Range; source: Range }[]>;
}

// 50 98 2
function parseRange(line: string): { destination: Range; source: Range } {
  const [destinationStart, sourceStart, length] = line
    .trim()
    .split(/ +/)
    .map(Number);

  return {
    destination: {
      min: destinationStart,
      max: destinationStart + length - 1,
      length,
    },
    source: { min: sourceStart, max: sourceStart + length - 1, length },
  };
}

// seeds: 79 14 55 13
//
// seed-to-soil map:
// 50 98 2
// 52 50 48
function parseAlmanac(input: Input): Almanac {
  const parts = input.raw.split("\n\n");

  const seeds = parts[0]
    .replace(/^seeds: +/, "")
    .split(/ +/)
    .map(Number);

  const maps = Object.fromEntries(
    parts.slice(1).map((x) => {
      const lines = x.split("\n");
      const name = lines[0].replace(/ map:.*$/, "");
      const ranges = lines.slice(1).map(parseRange);

      return [name, ranges];
    })
  );

  return {
    seeds,
    maps,
  };
}

function mapLocation(almanac: Almanac, seed: number): number {
  let previous = seed;
  for (const map of Object.values(almanac.maps)) {
    let next = previous;
    for (const range of map) {
      if (previous >= range.source.min && previous <= range.source.max) {
        next = previous - range.source.min + range.destination.min;
        break;
      }
    }
    previous = next;
  }
  return previous;
}

export function solvePart1(input: Input): number {
  const almanac = parseAlmanac(input);

  let minLocation = Number.MAX_VALUE;
  for (const seed of almanac.seeds) {
    const location = mapLocation(almanac, seed);
    if (location < minLocation) {
      minLocation = location;
    }
  }

  return minLocation;
}
