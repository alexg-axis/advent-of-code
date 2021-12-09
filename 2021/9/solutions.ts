import {Input} from "../../utils/deno/input.ts";

type Map = number[][];
type VisitedMap = { [key: number]: { [key: number]: boolean } };

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

export function solvePart2(map: Map): number {
  const basinSizes = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (!isLow(map, x, y))
        continue;

      const [size, visited] = up(map, x, y);
      console.log(x, y, size, visited);
      basinSizes.push(size);
    }
  }
  const sorted = basinSizes.sort((a, b) => b - a);
  console.log(sorted);
  return sorted.slice(0, 3).reduce((product, x) => product * x);
}

function isLow(map: Map, x: number, y: number): boolean {
  const left = (x > 0 ? map[y][x-1] : Number.MAX_VALUE) > map[y][x];
  const right = (x < map[y].length - 1 ? map[y][x+1] : Number.MAX_VALUE) > map[y][x];
  const up = (y > 0 ? map[y - 1][x] : Number.MAX_VALUE) > map[y][x];
  const down = (y < map.length - 1 ? map[y + 1][x] : Number.MAX_VALUE) > map[y][x];
  return left && right && up && down;
}

function up(map: Map, x: number, y: number, visited: VisitedMap = {}): [number, VisitedMap] {
  if (map[y][x] === 9)
    return [0, visited];

  let size = 1;

  const mark = (x: number, y: number) => {
    if (!visited[y])
      visited[y] = {};
    visited[y][x] = true;
  }

  const isMarked = (x: number, y: number) => {
    if (!visited[y])
      return false;
    return visited[y][x] === true;
  }

  mark(x, y);

  // Left
  if (x > 0 && !isMarked(x-1, y) && map[y][x-1] - map[y][x] === 1)
    size += up(map, x-1, y, visited)[0];
  // Right
  if (x < map[y].length - 1 && !isMarked(x+1, y) && map[y][x+1] - map[y][x] === 1)
    size += up(map, x+1, y, visited)[0];
  // Up
  if (y > 0 && !isMarked(x, y-1) && map[y-1][x] - map[y][x] === 1)
    size += up(map, x, y-1, visited)[0];
  // Down
  if (y < map.length - 1 && !isMarked(x, y+1) && map[y+1][x] -map[y][x] === 1)
    size += up(map, x, y+1, visited)[0];

  return [size, visited];
}
