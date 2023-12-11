import { combinations } from "https://deno.land/x/combinatorics@1.0.1/combinations.ts";
import { Input } from "../../utils/deno/input.ts";

export type Cell = "." | "#";

export type Universe = Cell[][];

type Coordinate = [number, number];

export function findExpanded(universe: Universe): [number[], number[]] {
  const expandedColumns: number[] = [];
  for (let x = 0; x < universe[0].length; x++) {
    const column = new Array(universe.length)
      .fill(0)
      .map((_, i) => i)
      .map((i) => universe[i][x]);
    if (column.join("").replaceAll(".", "").length === 0) {
      expandedColumns.push(x);
    }
  }

  // Expand rows
  const expandedRows: number[] = [];
  for (let y = 0; y < universe.length; y++) {
    if (universe[y].join("").replaceAll(".", "").length === 0) {
      expandedRows.push(y);
    }
  }

  return [expandedColumns, expandedRows];
}

function solve(input: Input, expandSize: number): number {
  const universe: Universe = input.lines.map((x) => x.split("") as Cell[]);

  const [expandedColumns, expandedRows] = findExpanded(universe);

  const galaxies: Coordinate[] = [];
  for (let y = 0; y < universe.length; y++) {
    for (let x = 0; x < universe[y].length; x++) {
      if (universe[y][x] === "#") {
        galaxies.push([x, y]);
      }
    }
  }

  // NOTE: assumes distance is equal both ways
  let sum = 0;
  for (const [from, to] of combinations(galaxies, 2)) {
    const [startX, startY] = [
      Math.min(from[0], to[0]),
      Math.min(from[1], to[1]),
    ];
    const [goalX, goalY] = [Math.max(from[0], to[0]), Math.max(from[1], to[1])];

    let distance = 0;
    for (let y = startY; y < goalY; y++) {
      if (expandedRows.includes(y)) {
        distance += expandSize;
      } else {
        distance++;
      }
    }
    for (let x = startX; x < goalX; x++) {
      if (expandedColumns.includes(x)) {
        distance += expandSize;
      } else {
        distance++;
      }
    }
    sum += distance;
  }

  return sum;
}

export function solvePart1(input: Input): number {
  return solve(input, 2);
}

export function solvePart2(input: Input): number {
  return solve(input, 1e6);
}
