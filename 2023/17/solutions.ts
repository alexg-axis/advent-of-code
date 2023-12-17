import { Input } from "../../utils/deno/input.ts";

const shifts = [
  [+1, 0],
  [-1, 0],
  [0, +1],
  [0, -1],
];

function isWithinBounds(map: number[][], x: number, y: number): boolean {
  return x >= 0 && x < map[0].length && y >= 0 && y < map.length;
}

function astar(
  map: number[][],
  start: [number, number],
  goal: [number, number]
) {
  const open: [number, number][] = [start];
  const previous: Record<string, string> = {};

  const g: Record<string, number> = Object.fromEntries(
    Object.entries(map).map(([k]) => [k, Number.POSITIVE_INFINITY])
  );
  g[`${start[0]}:${start[1]}`] = 0;

  const h = ([x, y]: [number, number]) =>
    Math.abs(goal[0] - x) + Math.abs(goal[1] - y);

  const d = (a: [number, number], b: [number, number]) => map[b[1]][b[0]];

  const f: Record<string, number> = Object.fromEntries(
    Object.entries(map).map(([k]) => [k, Number.POSITIVE_INFINITY])
  );
  f[`${start[0]}:${start[1]}`] = h(start);

  while (open.length > 0) {
    const current = open
      .sort((a, b) => f[`${a[0]}:${a[1]}`] - f[`${b[0]}:${b[1]}`])
      .shift()!;

    if (current[0] === goal[0] && current[1] === goal[1]) {
      console.log(previous);
      return;
    }

    for (const shift of shifts) {
      const currentKey = `${current[0]}:${current[1]}`;
      const neighbour: [number, number] = [
        current[0] + shift[0],
        current[1] + shift[1],
      ];
      if (!isWithinBounds(map, neighbour[0], neighbour[1])) {
        continue;
      }

      const neighbourKey = `${neighbour[0]}:${neighbour[1]}`;
      const tentativeG = g[currentKey] + d(current, neighbour);
      if (tentativeG < g[currentKey]) {
        previous[neighbourKey] = currentKey;
        g[neighbourKey] = tentativeG;
        f[neighbourKey] = tentativeG + h(neighbour);
        if (!open.find(([x, y]) => x === neighbour[x] && y === neighbour[y])) {
          open.push(neighbour);
        }
      }
    }
  }

  throw new Error("No path found");
}

export function solvePart1(input: Input): number {
  const map = input.lines.map((x) => x.split("").map(Number));

  astar(map, [0, 0], [map[0].length - 1, map.length - 1]);

  return -1;
}
