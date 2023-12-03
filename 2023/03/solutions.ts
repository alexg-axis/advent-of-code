import { Input } from "../../utils/deno/input.ts";

export function solvePart1(input: Input): number {
  const map = input.lines;
  const allParts: number[] = [];
  for (let y = 0; y < map.length; y++) {
    const row = map[y];
    for (let x = 0; x < row.length; x++) {
      const cell = row[x];
      if (!cell.match(/[^.0-9]/)) {
        continue;
      }

      const parts: number[] = [];
      const left = row.slice(0, x).match(/\d+$/);
      if (left) {
        parts.push(Number(left[0]));
      }
      const right = row.slice(x + 1).match(/^\d+/);
      if (right) {
        parts.push(Number(right[0]));
      }

      if (y > 0) {
        const left = map[y - 1].slice(0, x).match(/\d+$/);
        const right = map[y - 1].slice(x + 1).match(/^\d+/);
        if (map[y - 1][x].match(/\d/)) {
          const concat = (left?.[0] || "") + map[y - 1][x] + (right?.[0] || "");
          parts.push(Number(concat));
        } else {
          if (left) {
            parts.push(Number(left[0]));
          }
          if (right) {
            parts.push(Number(right[0]));
          }
        }
      }

      if (y < map.length - 1) {
        const left = map[y + 1].slice(0, x).match(/\d+$/);
        const right = map[y + 1].slice(x + 1).match(/^\d+/);
        if (map[y + 1][x].match(/\d/)) {
          const concat = (left?.[0] || "") + map[y + 1][x] + (right?.[0] || "");
          parts.push(Number(concat));
        } else {
          if (left) {
            parts.push(Number(left[0]));
          }
          if (right) {
            parts.push(Number(right[0]));
          }
        }
      }

      allParts.push(...parts);
    }
  }

  return allParts.reduce((sum, x) => sum + x);
}
