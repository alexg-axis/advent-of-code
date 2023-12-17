import { Input } from "../../utils/deno/input.ts";

type Coordinate = [number, number];

type Map = number[][];

function isWithinBounds(map: Map, x: number, y: number): boolean {
  return x >= 0 && x < map[0].length && y >= 0 && y < map.length;
}

function key([x, y]: Coordinate): string {
  return `${x}:${y}`;
}

function getPath(
  previous: Record<string, string | null>,
  from: Coordinate,
  steps = Number.POSITIVE_INFINITY
): Coordinate[] {
  const path: Coordinate[] = [from];
  let next = previous[key(from)];
  for (let i = 0; i < steps - 1 && next !== null; i++) {
    path.push(next.split(":").map(Number) as Coordinate);
    next = previous[next];
  }
  return path;
}

// Let neighbors be all possible legal moves from this point on
function shifts(
  map: Map,
  current: Coordinate,
  visited: string[],
  previous: Record<string, string | null>
): Coordinate[] {
  // Shift from the past three moves
  const history = getPath(previous, current, 3);

  const direction =
    history.length < 2
      ? [0, 0]
      : [
          current[0] - history[history.length - 1][0],
          current[1] - history[history.length - 1][1],
        ];

  const past = history.reduce(
    (sum, [x, y]) => [sum[0] + x, sum[1] + y],
    [0, 0]
  );

  // TODO - filter by allowed direction
  return [
    [+1, 0],
    [-1, 0],
    [0, +1],
    [0, -1],
  ].filter(
    ([x, y]) =>
      // Not visited
      !visited.includes(key([current[0] + x, current[1] + y])) &&
      // Possible
      isWithinBounds(map, current[0] + x, current[1] + y) &&
      // Not straight line
      past[0] + x <= 3 &&
      past[1] + y <= 3
  ) as Coordinate[];
}

function dijkstra(map: Map, from: Coordinate): Record<string, string | null> {
  const rendered = map.map((x) => new Array(x.length).fill("."));
  const distances: Record<string, number> = Object.fromEntries(
    map
      .map((row, y) =>
        row.map((_, x) => [key([x, y]), Number.POSITIVE_INFINITY])
      )
      .flat()
  );
  distances[key(from)] = 0;

  const previous: Record<string, string | null> = Object.fromEntries(
    map.map((row, y) => row.map((_, x) => [key([x, y]), null])).flat()
  );

  const open: Coordinate[] = [];
  open.push(from);

  const visited: string[] = [key(from)];

  while (open.length > 0) {
    const current = open
      .sort((a, b) => distances[key(a)] - distances[key(b)])
      .shift()!;
    visited.push(key(current));

    for (const shift of shifts(map, current, visited, previous)) {
      const next: Coordinate = [current[0] + shift[0], current[1] + shift[1]];
      if (open.find(([x, y]) => x === next[0] && y === next[1])) {
        continue;
      }
      open.push(next);
      rendered[next[1]][next[0]] = "#";
      console.log(rendered.map((x) => x.join("")).join("\n"));
      console.log();

      const cost = map[next[1]][next[0]];
      if (distances[key(current)] + cost < distances[key(next)]) {
        distances[key(next)] = distances[key(current)] + cost;
        previous[key(next)] = key(current);
      }
    }
  }

  return previous;
}

export function solvePart1(input: Input): number {
  const map = input.lines.map((x) => x.split("").map(Number));

  const previous = dijkstra(map, [0, 0]);

  // TODO: The start node should not be included
  const path = getPath(previous, [map[0].length - 1, map.length - 1]);
  console.log(path);

  let heatLoss = 0;
  console.log(path);
  const rendered = input.lines.map((x) => x.split("").fill("."));
  for (const [x, y] of path) {
    rendered[y][x] = "#";
    heatLoss += map[y][x];
  }
  console.log(rendered.map((x) => x.join("")).join("\n"));

  return heatLoss;
}
