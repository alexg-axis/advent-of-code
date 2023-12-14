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
  const map = input.lines.map((x) => x.split("") as ("O" | "." | "#")[]);

  for (let y = 1; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "O") {
        for (let y2 = y; y2 > 0; y2--) {
          if (map[y2 - 1][x] === ".") {
            map[y2 - 1][x] = "O";
            map[y2][x] = ".";
          } else {
            break;
          }
        }
      }
    }
  }

  let weight = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "O") {
        weight += map.length - y;
      }
    }
  }

  return weight;
}
