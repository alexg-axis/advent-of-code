import {Input} from "../../utils/deno/input.ts";

type Map = number[][];
type Coordinate = { x: number, y: number };

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

      // Print basin
      // console.log(`=== ${x};${y} - ${size} ===`);
      // for (let y2 = 0; y2 < map.length; y2++) {
      //   console.log(map[y2].map((v, x2) => isVisited(visited, x2, y2) ? 'x' : v).join(""));
      // }

      basinSizes.push(size);
    }
  }
  const sorted = basinSizes.sort((a, b) => b - a);
  return sorted.slice(0, 3).reduce((product, x) => product * x);
}

function isLow(map: Map, x: number, y: number): boolean {
  const left = (x > 0 ? map[y][x-1] : Number.MAX_VALUE) > map[y][x];
  const right = (x < map[y].length - 1 ? map[y][x+1] : Number.MAX_VALUE) > map[y][x];
  const up = (y > 0 ? map[y - 1][x] : Number.MAX_VALUE) > map[y][x];
  const down = (y < map.length - 1 ? map[y + 1][x] : Number.MAX_VALUE) > map[y][x];
  return left && right && up && down;
}

function up(map: Map, x: number, y: number): [number, Coordinate[]] {
  const toVisit: Coordinate[] = [];

  toVisit.push({x, y});

  let size = 0;
  const visited: Coordinate[] = [];

  while (toVisit.length > 0) {
    const {x, y} = toVisit.shift()!;
    if (isVisited(visited, x, y))
      continue;
    if (map[y][x] === 9)
      continue;

    size++;
    visited.push({x, y});

    // Left
    if (x > 0 && map[y][x - 1] < 9)
      toVisit.push({x: x-1, y});
    // Right
    if (x < map[y].length - 1 && map[y][x + 1] < 9)
      toVisit.push({ x: x + 1, y });
    // Up
    if (y > 0 && map[y - 1][x] < 9)
      toVisit.push({ x, y: y - 1});
    // Down
    if (y < map.length - 1 && map[y + 1][x] < 9)
      toVisit.push({ x, y: y + 1 });
  }

  return [size, visited];
}


function isVisited(visited: Coordinate[], x: number, y: number): boolean {
  for (const other of visited) {
    if (other.x === x && other.y === y)
      return true;
  }
  return false;
}
