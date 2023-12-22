import { Input } from "../../utils/deno/input.ts";

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
