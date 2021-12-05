import type {Input} from "../../utils/deno/input.ts";

type Line = {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
};

export function parseInput(input: Input): Line[] {
  // 0,9 -> 5,9
  return input.lines.map(x => {
    const parts = x.split(" -> ");
    const start = parts[0].split(",").map(Number);
    const end = parts[1].split(",").map(Number);
    return {
      x1: start[0],
      y1: start[1],
      x2: end[0],
      y2: end[1],
    };
  })
}

function gridSize(lines: Line[]): [number, number] {
  let width = 0;
  let height = 0;
  for (const line of lines) {
    if (line.x1 > width) width = line.x1;
    if (line.x2 > width) width = line.x2;
    if (line.y1 > height) height = line.y1;
    if (line.y2 > height) height = line.y2;
  }
  // zero-based indexes
  return [width +  1, height + 1];
}

function newGrid(width: number, height: number): number[][] {
  const rows = new Array<number[]>(height);
  for (let i = 0; i < height; i++)
    rows[i] = new Array<number>(width).fill(0);
  return rows;
}


function countIntersections(grid: number[][]): number {
  let count = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] >= 2)
        count++;
    }
  }
  return count;
}

export function solvePart1(lines: Line[]): number {
  const [width, height] = gridSize(lines);
  const grid = newGrid(width, height);

  // Only consider horizontal or vertical lines
  for (const line of lines) {
    if (line.x1 === line.x2) {
      for (let y = Math.min(line.y1, line.y2); y <= Math.max(line.y1, line.y2); y++)
        grid[y][line.x1]++;
    } else if (line.y1 === line.y2) {
      for (let x = Math.min(line.x1, line.x2); x <= Math.max(line.x1, line.x2); x++)
        grid[line.y1][x]++;
    }
  }

  return countIntersections(grid);
}

export function solvePart2(lines: Line[]): number {
  const [width, height] = gridSize(lines);
  const grid = newGrid(width, height);

  for (const line of lines) {
    if (line.x1 === line.x2) {
      for (let y = Math.min(line.y1, line.y2); y <= Math.max(line.y1, line.y2); y++)
        grid[y][line.x1]++;
    } else if (line.y1 === line.y2) {
      for (let x = Math.min(line.x1, line.x2); x <= Math.max(line.x1, line.x2); x++)
        grid[line.y1][x]++;
    } else {
      const deltaY = line.y1 - line.y2 > 0 ? -1 : 1;
      const deltaX = line.x1 - line.x2 > 0 ? -1 : 1;
      for (let i = 0; i <= Math.abs(line.x1 - line.x2); i++)
        grid[line.y1 + (i * deltaY)][line.x1 + (i * deltaX)]++;
    }
  }

  return countIntersections(grid);
}
