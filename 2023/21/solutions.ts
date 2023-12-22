import { Input } from "../../utils/deno/input.ts";
import { mod } from "../../utils/deno/math.ts";

type Cell = "." | "#" | "S";

export function solvePart1(input: Input, steps = 64): number {
  const map = input.lines.map((x) => x.split("") as Cell[]);

  const [startX, startY] = map
    .map((row, y) => row.map((_, x) => [x, y]))
    .flat()
    .find(([x, y]) => map[y][x] === "S")!;

  let currentQueue: [number, number][] = [[startX, startY]];
  let nextQueue: [number, number][] = [];
  for (let i = 0; i < steps; i++) {
    const visited: string[] = [];
    nextQueue = [];
    while (currentQueue.length > 0) {
      const [x, y] = currentQueue.shift()!;
      visited.push(`${x}:${y}`);

      for (const [dx, dy] of [
        [-1, 0],
        [0, -1],
        [1, 0],
        [0, 1],
      ]) {
        const nextX = x + dx;
        const nextY = y + dy;
        const key = `${nextX}:${nextY}`;
        if (
          nextX < 0 ||
          nextX >= map[0].length ||
          nextY < 0 ||
          nextY >= map.length ||
          map[nextY][nextX] === "#" ||
          visited.includes(key) ||
          nextQueue.find(([x, y]) => x === nextX && y === nextY)
        ) {
          continue;
        }

        nextQueue.push([nextX, nextY]);
      }
    }
    currentQueue = nextQueue;
    // const rendered: string[][] = [...map.map((x) => [...x])];
    // for (const [x, y] of currentQueue) {
    //   rendered[y][x] = "O";
    // }
    // console.log(rendered.map((x) => x.join("")).join("\n"));
  }

  return currentQueue.length;
}

// Map is square. Start is in center, row and column is empty - aka will touch
// edges, so there will be a diamond shape on the map.
// Initial map radius is 65, diameter is 131. Next step is 130, diameter 196.
// So map grows with 65 each edge, size is 131, so size grows quadratically:
// x = 65 + 131n. If we find the first three values, we can interpolate to find
// the answer
// x1 = 65 (i = 64: 2722 for test, 3957 for input)
// x2 = 196 (i = 195: 25621 for test, 35223 for input)
// x3 = 261 (i = 260: 45473 for test, 97645 for input)
// x4 = x1 + x2 + x3 + ?
// ...
// xn = x1 + x2 + x3 + ...
// (26501365-65)/131 = 202300
// So we're looking for x202300
// Quadratic regression: y=ax2+bx+c
//
//
// x202300 = 637537341306357
export function solvePart2(input: Input, steps = 26501365): number {
  const map = input.lines.map((x) => x.split("") as Cell[]);

  const [startX, startY] = map
    .map((row, y) => row.map((_, x) => [x, y]))
    .flat()
    .find(([x, y]) => map[y][x] === "S")!;

  let currentQueue: [number, number][] = [[startX, startY]];
  let nextQueue: [number, number][] = [];
  let x1 = 0;
  let x2 = 0;
  let x3 = 0;
  for (let i = 0; i < 261; i++) {
    console.log(i);
    const visited = new Set<string>();
    nextQueue = [];
    while (currentQueue.length > 0) {
      const [x, y] = currentQueue.shift()!;
      visited.add(`${x}:${y}`);

      for (const [dx, dy] of [
        [-1, 0],
        [0, -1],
        [1, 0],
        [0, 1],
      ]) {
        const nextX = x + dx;
        const nextY = y + dy;
        const key = `${nextX}:${nextY}`;
        if (
          map[mod(nextY, map.length)][mod(nextX, map[0].length)] === "#" ||
          visited.has(key) ||
          nextQueue.find(([x, y]) => x === nextX && y === nextY)
        ) {
          continue;
        }

        nextQueue.push([nextX, nextY]);
      }
    }
    currentQueue = nextQueue;

    console.log("  ", nextQueue.length);
    if (i === 64) {
      x1 = nextQueue.length;
    } else if (i === 195) {
      x2 = nextQueue.length;
    } else if (i === 260) {
      x3 = nextQueue.length;
    }
  }

  console.log(x1, x2, x3);

  const fit = (n: number) =>
    x1 + n * Math.floor(x2 - x1 + ((n - 1) * (x3 - x2 - x2 + x1)) / 2);

  return fit((steps - 65) / 131);
}
