import type { Input } from "../../utils/deno/input.ts";

type Grid<T> = T[][];

function parseGrid(input: Input): Grid<number> {
  return input.lines.map((x) => x.split("").map(Number));
}

function viewingDistances(
  grid: Grid<number>,
  inclusive = false
): Grid<[number, number, number, number]> {
  const distances: Grid<[number, number, number, number]> = new Array(
    grid.length
  )
    .fill(0)
    .map(() => new Array(grid[0].length).fill(0).map(() => [0, 0, 0, 0]));

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      // Above
      let visibleAbove = 0;
      for (
        let y2 = y - 1;
        y2 >= 0 && grid[y2][x] < grid[y][x];
        y2--, visibleAbove++
      );
      distances[y][x][0] = visibleAbove;
      if (inclusive && y - visibleAbove !== 0) {
        distances[y][x][0]++;
      }

      // Left
      let visibleLeft = 0;
      for (
        let x2 = x - 1;
        x2 >= 0 && grid[y][x2] < grid[y][x];
        x2--, visibleLeft++
      );
      distances[y][x][1] = visibleLeft;
      if (inclusive && x - visibleLeft !== 0) {
        distances[y][x][1]++;
      }

      // Left
      let visibleRight = 0;
      for (
        let x2 = x + 1;
        x2 < grid[0].length && grid[y][x2] < grid[y][x];
        x2++, visibleRight++
      );
      distances[y][x][2] = visibleRight;
      if (inclusive && x + visibleRight !== grid[0].length - 1) {
        distances[y][x][2]++;
      }

      // Undler
      let visibleUnder = 0;
      for (
        let y2 = y + 1;
        y2 < grid.length && grid[y2][x] < grid[y][x];
        y2++, visibleUnder++
      );
      distances[y][x][3] = visibleUnder;
      if (inclusive && y + visibleUnder !== grid.length - 1) {
        distances[y][x][3]++;
      }
    }
  }

  return distances;
}

export function solvePart1(input: Input): number {
  const grid = parseGrid(input);
  const distances = viewingDistances(grid);

  let visible = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const [visibleAbove, visibleLeft, visibleRight, visibleUnder] =
        distances[y][x];
      if (
        visibleAbove === y ||
        visibleLeft === x ||
        visibleRight === grid[0].length - (x + 1) ||
        visibleUnder === grid.length - (y + 1)
      ) {
        visible++;
      }
    }
  }

  return visible;
}

export function solvePart2(input: Input): number {
  const grid = parseGrid(input);
  const distances = viewingDistances(grid, true);

  let maxScore = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const score = distances[y][x].reduce((product, x) => product * x, 1);
      if (score > maxScore) {
        maxScore = score;
      }
    }
  }

  return maxScore;
}
