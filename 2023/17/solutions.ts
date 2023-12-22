import { Input } from "../../utils/deno/input.ts";

type State = [
  [number, number],
  string[],
  [number, number],
  [number, number],
  [number, number, number, number][],
  number
];

export function solvePart1(input: Input): number {
  const map = input.lines.map((x) => x.split("").map(Number));

  const cache: Map<string, number> = new Map();
  let minCost = Number.MAX_VALUE;
  let minPath: [number, number, number, number][] = [];

  const queue: State[] = [[[0, 0], ["0:0"], [0, 0], [1, 0], [], 0]];
  while (queue.length > 0) {
    queue.sort((a, b) => a[5] - b[5]);
    const [[x, y], visited, history, direction, path, cost] = queue.shift()!;
    console.log((x + y) / (map[0].length + map.length));
    if (x === map[0].length - 1 && y == map.length - 1) {
      // console.log(cost);
      if (cost < minCost) {
        minCost = cost;
        minPath = path;
      }
      continue;
    }

    const key = `${x}:${y},${history.join(":")},${direction.join(":")}`;
    const existing = cache.get(key);
    if (typeof existing !== "undefined" && existing < cost) {
      continue;
    }
    cache.set(key, cost);

    // console.log("at", x, y);
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = x + dx;
      const ny = y + dy;
      // Out of bounds
      if (nx < 0 || nx >= map[0].length || ny < 0 || ny >= map.length) {
        // console.log("  ", nx, ny, "out of bounds");
        continue;
      }
      // Illegal - too many straight moves
      if (Math.abs(history[0] + dx) >= 3 || Math.abs(history[1] + dy) >= 3) {
        // console.log("  ", nx, ny, "too many straight moves");
        continue;
      }
      // Illegal - backwards
      if (
        (direction[0] !== 0 && direction[0] === -dx) ||
        (direction[1] !== 0 && direction[1] === -dy)
      ) {
        // console.log("  ", nx, ny, "backwards");
        continue;
      }
      // Visited
      const key = `${nx}:${ny}`;
      if (visited.includes(key)) {
        // console.log("  ", nx, ny, "visited");
        continue;
      }
      // console.log("  ", nx, ny, "ok");
      queue.push([
        [nx, ny],
        [...visited, key],
        // Empty history when turning
        direction[0] === dx && direction[1] === dy
          ? [history[0] + dx, history[1] + dy]
          : [0, 0],
        [dx, dy],
        [...path, [nx, ny, dx, dy]],
        cost + map[ny][nx],
      ]);
    }
  }

  const rendered = map.map((x) => x.map((x) => x.toString()));
  for (const [x, y, dx, dy] of minPath) {
    let mark = " ";
    if (dx === 1) {
      mark = ">";
    } else if (dx === -1) {
      mark = "<";
    } else if (dy === 1) {
      mark = "v";
    } else if (dy === -1) {
      mark = "^";
    }
    rendered[y][x] = mark;
  }
  console.log(rendered.map((x) => x.join("")).join("\n"));

  return minCost;
}
