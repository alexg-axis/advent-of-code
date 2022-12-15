import { Input } from "../../utils/deno/input.ts";

type Vector = [number, number];

// Sensor at x=1638847, y=3775370: closest beacon is at x=2498385, y=3565515
function parseInput(
  input: Input
): { sensor: Vector; beacon: Vector; range: number }[] {
  return input.raw
    .trim()
    .split("\n")
    .map((x) =>
      x
        .match(
          /Sensor at x=(-?[0-9]+), y=(-?[0-9]+): closest beacon is at x=(-?[0-9]+), y=(-?[0-9]+)/
        )!
        .slice(1)
        .map(Number)
    )
    .map((x) => ({
      sensor: [x[0], x[1]],
      beacon: [x[2], x[3]],
      range: Math.abs(x[0] - x[2]) + Math.abs(x[1] - x[3]),
    }));
}

function isWithinRange(from: Vector, to: Vector, range: number) {
  const distance = Math.abs(from[0] - to[0]) + Math.abs(from[1] - to[1]);
  return distance <= range;
}

export function solvePart1(input: Input, targetRow = 2000000): number {
  const pairs = parseInput(input);

  let minX = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;

  for (const { sensor, range } of pairs) {
    if (sensor[0] - range < minX) minX = sensor[0] - range;
    if (sensor[1] + range > maxX) maxX = sensor[0] + range;
  }

  let possible = 0;
  for (let x = minX; x <= maxX; x++) {
    const withinRange = pairs.filter(({ sensor, range }) =>
      isWithinRange(sensor, [x, targetRow], range)
    );
    if (withinRange.length > 0) possible++;
  }

  return possible - 1;
}
