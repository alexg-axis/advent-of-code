import {Input} from "../../utils/deno/input.ts";

type Grid<T> = T[][];

type Coordinate = {x: number, y: number};

const adjacent = [[-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1]];

export function parseInput(input: Input): Grid<number> {
  return input.lines.map(x => x.split("").map(Number));
}

export function solvePart1(grid: Grid<number>): number {
  let flashes = 0;
  for (let i = 0; i < 100; i++) {
    // Increase by one
    grid = grid.map(rows => rows.map(column => column + 1));

    const flashed: Grid<boolean> = grid.map(row => row.map(_ => false));

    // Flash all triggered
    let shouldContinue = true;
    while (shouldContinue) {
      shouldContinue = false;

      for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
          if (grid[y][x] > 9 && !flashed[y][x]) {
            flashed[y][x] = true;
            flashes++;

            for (const [dx, dy] of adjacent) {
              if (grid[y + dy] !== undefined && grid[y + dy][x + dx] !== undefined) {
                grid[y+dy][x+dx]++;
                if (grid[y+dy][x+dx] > 9)
                  shouldContinue = true;
              }
            }
          }
        }
      }
    }

    // Set all flashed to 0
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (flashed[y][x])
          grid[y][x] = 0;
      }
    }

    // Print each iteration
    // console.log(`After step ${i+1}`);
    // console.log("");
    // console.log(grid.map(x => x.join("")).join("\n"));
    // console.log("");
  }

  return flashes;
}
