import { Input } from "../../utils/deno/input.ts";

/**
 * - `.` ash.
 * - `#` rocks.
 */
type Cell = "." | "#";

function findMirror(map: Cell[][]): [number, number][] {
  const results: [number, number][] = [];

  let row = -1;
  rows: for (let i = 0; i < map.length - 1; i++) {
    const currentRow = map[i].join("");
    if (currentRow !== map[i + 1].join("")) {
      continue rows;
    }

    for (let j = 0; j < i && i + j + 2 < map.length; j++) {
      const above = map[i - j - 1];
      const below = map[i + j + 2];
      if (above.join("") !== below.join("")) {
        continue rows;
      }
    }

    row = i;
    results.push([-1, row]);
  }

  let column = -1;
  columns: for (let i = 0; i < map[0].length - 1; i++) {
    const currentColumn = map.map((x) => x[i]).join("");
    if (currentColumn !== map.map((x) => x[i + 1]).join("")) {
      continue columns;
    }

    for (let j = 0; j < i && i + j + 2 < map[0].length; j++) {
      const left = map.map((x) => x[i - j - 1]);
      const right = map.map((x) => x[i + j + 2]);
      if (left.join("") !== right.join("")) {
        continue columns;
      }
    }

    column = i;
    results.push([column, -1]);
  }

  return results;
}

export function solvePart1(input: Input): number {
  const maps = input.raw
    .trim()
    .split(/\n\n/)
    .map((x) => x.split("\n").map((x) => x.split("") as Cell[]));

  let sum = 0;
  for (const map of maps) {
    const [column, row] = findMirror(map)[0];
    if (column !== -1) {
      sum += column + 1;
    } else if (row !== -1) {
      sum += (row + 1) * 100;
    } else {
      throw new Error("no solution found");
    }
  }

  return sum;
}

export function solvePart2(input: Input): number {
  const maps = input.raw
    .trim()
    .split(/\n\n/)
    .map((x) => x.split("\n").map((x) => x.split("") as Cell[]));

  let sum = 0;
  for (const map of maps) {
    const [originalColumn, originalRow] = findMirror(map)[0];

    const ash = map
      .map((row, y) => row.map((column, x) => (column === "." ? [x, y] : [])))
      .flat()
      .filter((x) => x.length > 0)
      .map((x) => [...x, "#"] as [number, number, Cell]);
    const rocks = map
      .map((row, y) => row.map((column, x) => (column === "#" ? [x, y] : [])))
      .flat()
      .filter((x) => x.length > 0)
      .map((x) => [...x, "."] as [number, number, Cell]);
    const replacements = [...ash, ...rocks];

    replacements: for (const [x, y, target] of replacements) {
      const replacedMap = [...map.map((x) => [...x])];
      replacedMap[y][x] = target;
      for (const [column, row] of findMirror(replacedMap)) {
        if (column !== -1 && column !== originalColumn) {
          sum += column + 1;
          break replacements;
        } else if (row !== -1 && row !== originalRow) {
          sum += (row + 1) * 100;
          break replacements;
        }
      }
    }
  }

  return sum;
}
