import { Input } from "../../utils/deno/input.ts";

// Path, forest, slopes
type Cell = "." | "#" | "^" | "<" | ">" | "v";

function dfs(map: Cell[][], from: [number, number], to: [number, number]) {
  const visited = new Set<string>();
  const parents = new Map<string, string | null>();
  parents.set(`${from[0]}:${from[1]}`, null);

  const queue: [number, number][] = [from];
  while (queue.length > 0) {
    const [x, y] = queue.shift()!;
    if (x === to[x] && y === to[y]) {
      break;
    }
    visited.add(`${x}:${y}`);
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = x + dx;
      const ny = y + dy;

      // Illegal - not within bounds
      if (nx < 0 || nx >= map[0].length || ny < 0 || ny >= map.length) {
        continue;
      }

      // Illegal - forest
      if (map[ny][nx] === "#") {
        // console.log(nx, ny, "illegal - forest");
        continue;
      }
      // Illegal - not following slope
      if (
        (map[y][x] === ">" && dx !== 1) ||
        (map[y][x] === "<" && dx !== -1) ||
        (map[y][x] === "^" && dy !== -1) ||
        (map[y][x] === "v" && dy !== 1)
      ) {
        // console.log(nx, ny, "illegal - not following slope");
        continue;
      }
      // Illegal - up slope
      if (
        (map[ny][nx] === ">" && dx === -1) ||
        (map[ny][nx] === "<" && dx === 1) ||
        (map[ny][nx] === "^" && dy === 1) ||
        (map[ny][nx] === "v" && dy === -1)
      ) {
        // console.log(nx, ny, "illegal - up slope");
        continue;
      }

      if (!visited.has(`${nx}:${ny}`)) {
        queue.unshift([nx, ny]);
        parents.set(`${nx}:${ny}`, `${x}:${y}`);
      }
    }
  }

  return parents;
}

export function solvePart1(input: Input): number {
  const map = input.lines.map((x) => x.split("") as Cell[]);

  const start: [number, number] = [map[0].indexOf("."), 0];
  const goal: [number, number] = [
    map[map.length - 1].indexOf("."),
    map.length - 1,
  ];

  const previous = dfs(map, start, goal);

  const path: [number, number][] = [];
  let current: string | null = `${goal[0]}:${goal[1]}`;
  while (current != null) {
    path.push(current.split(":").map(Number) as [number, number]);
    current = previous.get(current)!;
  }

  console.log(path.reverse());

  return path.length;
}
