import {Input} from "../../utils/deno/input.ts";

type Map = number[][];

export function parseInput(input: Input): Map {
  return input.lines.map(line => line.split("").map(Number));
}

export function solvePart1(map: Map): number {
  let sum = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (isLow(map, x, y)) {
        sum += map[y][x] + 1;
      }
    }
  }
  return sum;
}

function isLow(map: Map, x: number, y: number): boolean {
  const left = (x > 0 ? map[y][x-1] : Number.MAX_VALUE) > map[y][x];
  const right = (x < map[y].length - 1 ? map[y][x+1] : Number.MAX_VALUE) > map[y][x];
  const up = (y > 0 ? map[y - 1][x] : Number.MAX_VALUE) > map[y][x];
  const down = (y < map.length - 1 ? map[y + 1][x] : Number.MAX_VALUE) > map[y][x];
  return left && right && up && down;
}
