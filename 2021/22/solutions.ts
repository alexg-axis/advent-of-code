import { Input } from "../../utils/deno/input.ts";

type RebootStep = {
  on: boolean,
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  minZ: number,
  maxZ: number,
};

type Cube = {[key: number]: {[key: number]: {[key: number]: boolean}}};

export function parseInput(input: Input): RebootStep[] {
  // on x=-48..-2,y=-16..31,z=-3..41
  return input.lines.map(x => {
    const parts = x.split(" ");
    const on = parts[0] === "on";
    const numbers = parts[1].split(",").map(x => x.slice(2)).map(x => x.split("..")).flat().map(Number);
    return {
      on,
      minX: numbers[0],
      maxX: numbers[1],
      minY: numbers[2],
      maxY: numbers[3],
      minZ: numbers[4],
      maxZ: numbers[5],
    }
  });
}

export function solvePart1(steps: RebootStep[]): number {
  // steps = steps.map(x => ({
  //   on: x.on,
  //   minX: Math.max(x.minX, -50),
  //   minY: Math.max(x.minY, -50),
  //   minZ: Math.max(x.minZ, -50),
  //   maxX: Math.min(x.maxX, 50),
  //   maxY: Math.min(x.maxY, 50),
  //   maxZ: Math.min(x.maxZ, 50),
  // }))

  steps = steps.filter(x => x.minX >= -50 && x.minY >= -50 && x.minZ >= -50 && x.maxX <= 50 && x.maxY <= 50 && x.maxZ <= 50);

  const cube: Cube = {};
  let count = 0;
  for (const {on, minX, maxX, minY, maxY, minZ, maxZ} of steps) {
    // console.log(on, minX, maxX, minY, maxY, minZ, maxZ);
    for (let x = minX; x <= maxX; x++) {
      if (typeof cube[x] === "undefined")
        cube[x] = {};
      for (let y = minY; y <= maxY; y++) {
        if (typeof cube[x][y] === "undefined")
          cube[x][y] = {};
        for (let z = minZ; z <= maxZ; z++) {
          if (!cube[x][y][z] && on)
            count++;
          if (cube[x][y][z] && !on)
            count--;
          cube[x][y][z] = on;
        }
      }
    }
    // console.log(count);
  }

  return count;
}
