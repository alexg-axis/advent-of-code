import { combinations } from "https://deno.land/x/combinatorics@1.0.1/combinations.ts";
import { Input } from "../../utils/deno/input.ts";

export type Cell = "." | "#";

export type Universe = Cell[][];

type Coordinate = [number, number];

export function expand(universe: Universe): Universe {
  const expandedColumns: Cell[][] = [];
  for (let x = 0; x < universe[0].length; x++) {
    const column = new Array(universe.length)
      .fill(0)
      .map((_, i) => i)
      .map((i) => universe[i][x]);
    expandedColumns.push([...column]);
    if (column.join("").replaceAll(".", "").length === 0) {
      expandedColumns.push([...column]);
    }
  }

  const expandedColumnRows: Cell[][] = [];
  for (let y = 0; y < universe.length; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < expandedColumns.length; x++) {
      row.push(expandedColumns[x][y]);
    }
    expandedColumnRows.push(row);
  }

  // Expand rows
  const expandedRows: Cell[][] = [];
  for (let y = 0; y < expandedColumnRows.length; y++) {
    expandedRows.push([...expandedColumnRows[y]]);
    if (expandedColumnRows[y].join("").replaceAll(".", "").length === 0) {
      // Expand
      expandedRows.push([...expandedColumnRows[y]]);
    }
  }

  return expandedRows;
}

function possibleMoves(universe: Universe, start: Coordinate): Coordinate[] {
  const result: Coordinate[] = [];

  if (start[0] > 0) {
    result.push([start[0] - 1, start[1]]);
  }

  if (start[0] < universe[0].length - 1) {
    result.push([start[0] + 1, start[1]]);
  }

  if (start[1] > 0) {
    result.push([start[0], start[1] - 1]);
  }

  if (start[1] < universe.length - 1) {
    result.push([start[0], start[1] + 1]);
  }

  return result;
}

interface Dijkstra {
  distances: Record<string, number>;
  previous: Record<string, string | null>;
}

function dijkstra(universe: Universe, from: Coordinate): Dijkstra {
  const distances: Record<string, number> = Object.fromEntries(
    universe.map((x) => x.map((y) => [`${y[0]}:${y[1]}`, 0]))
  );
  distances[`${from[0]}:${from[1]}`] = 0;

  const previous: Record<string, string | null> = Object.fromEntries(
    universe.map((x) => x.map((y) => [`${y[0]}:${y[1]}`, null]))
  );

  const visited: Coordinate[] = [];

  const toVisit: Coordinate[] = [];
  toVisit.push(from);

  while (toVisit.length > 0) {
    const current = toVisit
      .sort(
        (a, b) => distances[`${a[0]}:${a[1]}`] - distances[`${b[0]}:${b[1]}`]
      )
      .shift()!;
    visited.push(current);
    for (const next of possibleMoves(universe, current)) {
      if (visited.includes(next)) {
        continue;
      }
      toVisit.push(next);

      const currentKey = `${current[0]}:${current[1]}`;
      const nextKey = `${current[0]}:${current[1]}}`;
      if (distances[currentKey] + 1 < distances[nextKey]) {
        distances[nextKey] = distances[currentKey] + 1;
        previous[nextKey] = currentKey;
      }
    }
  }

  return { distances, previous };
}

export function solvePart1(input: Input): number {
  let universe: Universe = input.lines.map((x) => x.split("") as Cell[]);
  universe = expand(universe);

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
    const distance = Math.abs(to[0] - from[0]) + Math.abs(to[1] - from[1]);
    // console.log(from, to, distance);
    sum += distance;
  }

  return sum;
}
