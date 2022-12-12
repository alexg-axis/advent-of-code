import type { Input } from "../../utils/deno/input.ts";

type Vector = {
  x: number;
  y: number;
};

interface Heightmap {
  startPosition: Vector;
  goalPosition: Vector;
  heightmap: number[][];
}

function parseInput(input: Input): Heightmap {
  const heightmap: ("S" | "E" | number)[][] = input.lines.map((x) =>
    x
      .split("")
      .map((x) => (x === "S" || x === "E" ? x : Number(x.charCodeAt(0) - 97)))
  );

  let startPosition = { x: 0, y: 0 };
  let goalPosition = { x: 0, y: 0 };
  for (let y = 0; y < heightmap.length; y++) {
    for (let x = 0; x < heightmap[0].length; x++) {
      if (heightmap[y][x] === "S") {
        startPosition = { x, y };
        heightmap[y][x] = 0;
      } else if (heightmap[y][x] === "E") {
        goalPosition = { x, y };
        heightmap[y][x] = 25;
      }
    }
  }

  return {
    startPosition,
    goalPosition,
    heightmap: heightmap as number[][],
  };
}

export function solvePart1(input: Input): number {
  const { startPosition, goalPosition, heightmap } = parseInput(input);

  const toVisit: (Vector & { steps: number })[] = [];
  toVisit.push({ ...startPosition, steps: 0 });

  const visited: Vector[] = [];
  visited.push(startPosition);

  while (toVisit.length > 0) {
    const current = toVisit.shift()!;

    if (current.x === goalPosition.x && current.y === goalPosition.y) {
      return current.steps;
    }

    const checks = [
      [-1, 0], // Left
      [1, 0], // Right
      [0, -1], // Up
      [0, 1], // Down
    ];

    for (const [dx, dy] of checks) {
      const next: Vector = { x: current.x + dx, y: current.y + dy };

      if (
        next.x >= 0 &&
        next.x < heightmap[0].length &&
        next.y >= 0 &&
        next.y < heightmap.length
      ) {
        if (heightmap[next.y][next.x] - heightmap[current.y][current.x] > 1)
          continue;

        if (!visited.find((x) => x.x === next.x && x.y === next.y)) {
          visited.push(next);
          toVisit.push({
            ...next,
            steps: current.steps + 1,
          });
        }
      }
    }
  }

  return -1;
}
