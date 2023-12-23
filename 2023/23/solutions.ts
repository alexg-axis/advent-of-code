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
      continue;
    }

    // Illegal - not following slope
    if (
      (map[y][x] === ">" && dx !== 1) ||
      (map[y][x] === "<" && dx !== -1) ||
      (map[y][x] === "^" && dy !== -1) ||
      (map[y][x] === "v" && dy !== 1)
    ) {
      continue;
    }

    // Illegal - up slope
    if (
      (map[ny][nx] === ">" && dx === -1) ||
      (map[ny][nx] === "<" && dx === 1) ||
      (map[ny][nx] === "^" && dy === 1) ||
      (map[ny][nx] === "v" && dy === -1)
    ) {
      continue;
    }

    // Visited
    if (visited.includes(`${nx}:${ny}`)) {
      continue;
    }

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

  return [bestSteps, bestVisited];
}

function recurse2(
  graph: Map<string, string[]>,
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

  for (const next of graph.get(`${x}:${y}`)!) {
    // Visited
    if (visited.includes(next)) {
      continue;
    }

    const [nx, ny] = next.split(":").map(Number);

    const [currentSteps, currentVisited] = recurse2(
      graph,
      [nx, ny],
      to,
      [...visited, next],
      steps + 1
    );
    if (currentSteps > bestSteps) {
      bestSteps = currentSteps;
      bestVisited = currentVisited;
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

  const [steps, _visited] = recurse(
    map,
    start,
    goal,
    [`${start[0]}:${start[1]}`],
    0
  );
  return steps;
}

export function solvePart2(input: Input): number {
  const map = input.lines.map(
    (x) => x.split("").map((x) => x.replace(/[^#]/, ".")) as Cell[]
  );

  const start: [number, number] = [map[0].indexOf("."), 0];
  const goal: [number, number] = [
    map[map.length - 1].indexOf("."),
    map.length - 1,
  ];

  // Build a graph of the map
  const graph = new Map<string, string[]>();
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      const key = `${x}:${y}`;
      if (map[y][x] === "#") {
        continue;
      }

      if (!graph.has(key)) {
        graph.set(key, []);
      }

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
          continue;
        }

        if (!graph.get(key)!.includes(`${nx}:${ny}`)) {
          graph.get(key)!.push(`${nx}:${ny}`);
        }
      }
    }
  }

  // Simplify all edges so that linear paths become a single edge
  for (const [k, v] of graph.entries()) {
    // Corridors have two nodes - one from, one next
    if (v.length === 2) {
      // Remove this node from the previous one
      graph.set(
        v[0],
        graph.get(v[0])!.filter((x) => x !== k)
      );
      // Add this nodes next node to the previous one
      graph.get(v[0])!.push(v[1]);

      // Remove this node from the next one
      graph.set(
        v[1],
        graph.get(v[1])!.filter((x) => x !== k)
      );
      // Add this nodes previous node to the next one
      graph.get(v[1])!.push(v[0]);
    }
  }

  const [_, visited] = recurse2(
    graph,
    start,
    goal,
    [`${start[0]}:${start[1]}`],
    0
  );

  let totalSteps = 0;
  let V: string[] = [`${start[0]}:${start[1]}`];
  for (let i = 0; i < visited.length - 1; i++) {
    const from = visited[i].split(":").map(Number) as [number, number];
    const to = visited[i + 1].split(":").map(Number) as [number, number];
    console.log(from, to);
    const [steps, newV] = recurse(map, from, to, V, totalSteps);
    V = newV;
    totalSteps = steps;
  }

  return totalSteps;
}
