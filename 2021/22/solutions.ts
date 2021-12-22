import { Input } from "../../utils/deno/input.ts";

type RebootStep = {
  on: boolean,
  cube: Cube,
};

export type Cube = {
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  minZ: number,
  maxZ: number,
};

export function parseInput(input: Input): RebootStep[] {
  // on x=-48..-2,y=-16..31,z=-3..41
  return input.lines.map(x => {
    const parts = x.split(" ");
    const on = parts[0] === "on";
    const numbers = parts[1].split(",").map(x => x.slice(2)).map(x => x.split("..")).flat().map(Number);
    return {
      on,
      cube: {
        minX: numbers[0],
        maxX: numbers[1],
        minY: numbers[2],
        maxY: numbers[3],
        minZ: numbers[4],
        maxZ: numbers[5],
      },
    }
  });
}

export function getIntersection(a: Cube, b: Cube): Cube | null {
  // on x=-5..47,y=-31..22,z=-19..33
  // on x = -44..5, y = -27..21, z = -14..35
  const minX = Math.max(a.minX, b.minX);
  const maxX = Math.min(a.maxX, b.maxX);
  const minY = Math.max(a.minY, b.minY);
  const maxY = Math.min(a.maxY, b.maxY);
  const minZ = Math.max(a.minZ, b.minZ);
  const maxZ = Math.min(a.maxZ, b.maxZ);
  if (minX > maxX || minY > maxY || minZ > maxZ)
    return null;
  return { minX, maxX, minY, maxY, minZ, maxZ };
}

function solve(steps: RebootStep[]): number {
  const intersections: RebootStep[] = [];

  for (const { on, cube } of steps) {
    // Cancel out the effect of any previous cube
    const length = intersections.length;
    for (let i = 0; i < length; i++) {
      const other = intersections[i];
      const intersection = getIntersection(other.cube, cube);
      if (intersection === null)
        continue;

      intersections.push({ on: !other.on, cube: intersection });
    }
    if (on)
      intersections.push({ on, cube });
  }

  let count = 0;
  for (const { on, cube: { minX, maxX, minY, maxY, minZ, maxZ } } of intersections) {
    const volume = (maxX - minX + 1) * (maxY - minY + 1) * (maxZ - minZ + 1);
    if (on)
      count += volume;
    else
      count -= volume;
  }

  return count;
}

export function solvePart1(steps: RebootStep[]): number {
  steps = steps.filter(x => x.cube.minX >= -50 && x.cube.minY >= -50 && x.cube.minZ >= -50 && x.cube.maxX <= 50 && x.cube.maxY <= 50 && x.cube.maxZ <= 50);

  return solve(steps);
}

export function solvePart2(steps: RebootStep[]): number {
  return solve(steps);
}
