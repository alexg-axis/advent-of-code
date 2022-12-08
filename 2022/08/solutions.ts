import type { Input } from "../../utils/deno/input.ts";

export function solvePart1(input: Input): number {
  const grid = input.lines.map((x) => x.split("").map(Number));

  let visible = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const isEdge =
        y === 0 || y === grid.length - 1 || x === 0 || x === grid[0].length - 1;
      if (isEdge) {
        visible++;
        continue;
      }

      // Above
      let visibleAbove = 0;
      for (
        let y2 = y - 1;
        y2 >= 0 && grid[y2][x] < grid[y][x];
        y2--, visibleAbove++
      );

      // Left
      let visibleLeft = 0;
      for (
        let x2 = x - 1;
        x2 >= 0 && grid[y][x2] < grid[y][x];
        x2--, visibleLeft++
      );

      // Left
      let visibleRight = 0;
      for (
        let x2 = x + 1;
        x2 < grid[0].length && grid[y][x2] < grid[y][x];
        x2++, visibleRight++
      );

      // Undler
      let visibleUnder = 0;
      for (
        let y2 = y + 1;
        y2 < grid.length && grid[y2][x] < grid[y][x];
        y2++, visibleUnder++
      );

      if (
        visibleAbove === y ||
        visibleUnder === grid.length - (y + 1) ||
        visibleLeft === x ||
        visibleRight === grid[0].length - (x + 1)
      ) {
        visible++;
      }
    }
  }

  return visible;
}
