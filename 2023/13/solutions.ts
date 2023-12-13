import { Input } from "../../utils/deno/input.ts";

/**
 * - `.` ash.
 * - `#` rocks.
 */
type Cell = "." | "#";

export function solvePart1(input: Input): number {
  const maps = input.raw
    .trim()
    .split(/\n\n/)
    .map((x) => x.split("\n").map((x) => x.split("") as Cell[]));

  let sum = 0;
  for (const map of maps) {
    let row = -1;
    rows: for (let i = 0; i < map.length - 1; i++) {
      const currentRow = map[i].join("");
      if (currentRow !== map[i + 1].join("")) {
        continue rows;
      }

      for (let j = 0; j < i && i + j + 2 < map.length; j++) {
        const up = map[i - j - 1];
        const down = map[i + j + 2];
        if (up.join("") !== down.join("")) {
          continue rows;
        }
      }

      row = i;
      break;
    }
    if (row !== -1) {
      sum += (row + 1) * 100;
      continue;
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
      break;
    }
    if (column !== -1) {
      sum += column + 1;
      continue;
    }
  }

  return sum;
}
