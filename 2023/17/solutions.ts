import { Input } from "../../utils/deno/input.ts";

function isWithinBounds(map: number[][], x: number, y: number): boolean {
  return x >= 0 && x < map[0].length && y >= 0 && y < map.length;
}

function key([x, y]: [number, number]): string {
  return `${x}:${y}`;
}

// Let neighbors be all possible legal moves from this point on
function shifts(
  map: number[][],
  current: [number, number],
  visited: string[],
  previous: Record<string, string | null>
): [number, number][] {
  // TODO
  return [
    [+1, 0],
    [-1, 0],
    [0, +1],
    [0, -1],
  ].filter(
    ([x, y]) =>
      !visited.includes(key([current[0] + x, current[1] + y])) &&
      isWithinBounds(map, current[0] + x, current[1] + y)
  ) as [number, number][];
}

function dijkstra(
  map: number[][],
  from: [number, number]
): Record<string, string | null> {
  const distances: Record<string, number> = Object.fromEntries(
    map
      .map((row, y) =>
        row.map((_, x) => [`${x}:${y}`, Number.POSITIVE_INFINITY])
      )
      .flat()
  );
  distances[key(from)] = 0;

  const previous: Record<string, string | null> = Object.fromEntries(
    map.map((row, y) => row.map((_, x) => [`${x}:${y}`, null])).flat()
  );

  const open: [number, number][] = [];
  open.push(from);

  const visited: string[] = [key(from)];

  while (open.length > 0) {
    const current = open
      .sort((a, b) => distances[key(a)] - distances[key(b)])
      .shift()!;
    visited.push(key(current));

    for (const shift of shifts(map, current, visited, previous)) {
      const next: [number, number] = [
        current[0] + shift[0],
        current[1] + shift[1],
      ];
      if (open.find(([x, y]) => x === next[0] && y === next[1])) {
        continue;
      }
      open.push(next);

      const cost = 1;
      if (distances[key(current)] + cost < distances[key(next)]) {
        distances[key(next)] = distances[key(current)] + 1;
        previous[key(next)] = key(current);
      }
    }
  }

  return previous;
}

export function solvePart1(input: Input): number {
  const map = input.lines.map((x) => x.split("").map(Number));

  const previous = dijkstra(map, [0, 0]);
  console.log(previous);

  const path: [number, number][] = [];
  let next = previous[key([map[0].length - 1, map.length - 1])];
  while (next !== null) {
    path.push(next.split(":").map(Number) as [number, number]);
    next = previous[next];
  }

  const rendered = input.lines.map((x) => x.split("").fill("."));
  for (const [x, y] of path) {
    rendered[y][x] = "#";
  }
  console.log(rendered.map((x) => x.join("")).join("\n"));

  return -1;
}
