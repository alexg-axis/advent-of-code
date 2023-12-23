import { Input } from "../../utils/deno/input.ts";

// Path, forest, slopes
type Cell = "." | "#" | "^" | "<" | ">" | "v";

function recurse(
  map: Cell[][],
  [x, y]: [number, number],
  to: [number, number],
  visited: string[],
  steps: number
): [number, string[]] {
  if (x === to[0] && y === to[1]) {
    return [steps, visited];
  }

  let bestVisited: string[] = [];
  let bestSteps = 0;

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

    if (!visited.includes(`${nx}:${ny}`)) {
      const [currentSteps, currentVisited] = recurse(
        map,
        [nx, ny],
        to,
        [...visited, `${nx}:${ny}`],
        steps + 1
      );
      if (currentSteps > bestSteps) {
        bestSteps = currentSteps;
        bestVisited = currentVisited;
      }
    }
  }

  return [bestSteps, bestVisited];
}

export function solvePart1(input: Input): number {
  const map = input.lines.map((x) => x.split("") as Cell[]);

  const start: [number, number] = [map[0].indexOf("."), 0];
  const goal: [number, number] = [
    map[map.length - 1].indexOf("."),
    map.length - 1,
  ];

  const [steps, visited] = recurse(
    map,
    start,
    goal,
    [`${start[0]}:${start[1]}`],
    0
  );
  console.log(visited);
  return steps;
}
