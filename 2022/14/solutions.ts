import { Input } from "../../utils/deno/input.ts";
import { product, sum } from "../../utils/deno/arrays.ts";

type Packet = number | Packet[];
type Divisor = [[number]];

type Grid<T> = T[][];

type Vector = [number, number];

function parseInput(input: Input): {
  grid: Grid<"#" | "o" | ".">;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
} {
  const lines: Vector[][] = input.raw
    .trim()
    .split("\n")
    .map((x) => x.split(" -> ").map((x) => x.split(",").map(Number) as Vector));

  let minX = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;

  const minY = 0; // Hard coded, sand falls from here
  let maxY = Number.MIN_SAFE_INTEGER;

  for (const line of lines) {
    for (const coordinate of line) {
      if (coordinate[0] < minX) minX = coordinate[0];
      if (coordinate[0] > maxX) maxX = coordinate[0];
      if (coordinate[1] > maxY) maxY = coordinate[1];
    }
  }

  const grid: Grid<"#" | "o"> = new Array(maxY - minY + 1)
    .fill(0)
    .map(() => new Array(maxX - minX + 1).fill("."));

  for (const line of lines) {
    for (let i = 1; i < line.length; i++) {
      const a = line[i - 1];
      const b = line[i];

      if (a[0] === b[0]) {
        for (let y = Math.min(a[1], b[1]); y <= Math.max(a[1], b[1]); y++) {
          grid[y - minY][a[0] - minX] = "#";
        }
      } else if (a[1] === b[1]) {
        for (let x = Math.min(a[0], b[0]); x <= Math.max(a[0], b[0]); x++) {
          grid[a[1] - minY][x - minX] = "#";
        }
      }
    }
  }

  return {
    grid,
    minX,
    maxX,
    minY,
    maxY,
  };
}

function printGrid<T>(grid: Grid<T>) {
  console.log(grid.map((x) => x.join("")).join("\n"));
}

export function solvePart1(input: Input): number {
  const { grid, minX } = parseInput(input);
  // printGrid(grid);

  let sandCurrentX = 500 - minX;
  let sandCurrentY = 0;
  let stable = 0;
  while (true) {
    // Out of bounds down
    if (sandCurrentY + 1 === grid.length) {
      // Abyss
      return stable;
    }

    // Down
    if (grid[sandCurrentY + 1][sandCurrentX] === ".") {
      sandCurrentY++;
      continue;
    }

    // Out of bounds left
    if (sandCurrentX - 1 === -1) {
      // Abyss
      return stable;
    }

    // Left diagonally
    if (grid[sandCurrentY + 1][sandCurrentX - 1] === ".") {
      sandCurrentX--;
      sandCurrentY++;
      continue;
    }

    // Out of bounds right
    if (sandCurrentX + 1 === grid.length) {
      // Abyss
      return stable;
    }

    // Right diagonally
    if (grid[sandCurrentY + 1][sandCurrentX + 1] === ".") {
      sandCurrentX++;
      sandCurrentY++;
      continue;
    }

    // Stable
    grid[sandCurrentY][sandCurrentX] = "o";
    stable++;
    sandCurrentX = 500 - minX;
    sandCurrentY = 0;
    // printGrid(grid);
  }
}
