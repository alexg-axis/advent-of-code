import { Input } from "../../utils/deno/input.ts";

interface Vector {
  x: number;
  y: number;
}

function printMap(map: string[][]) {
  console.log(
    map
      .map((row) =>
        row
          .map((column) => {
            if (column !== "." && column !== "#") {
              return column.length === 1 ? column : column.length.toString();
            }

            return column;
          })
          .join("")
      )
      .join("\n")
  );
  console.log();
}

function mutate(currentMap: string[][]): string[][] {
  const width = currentMap[0].length;
  const height = currentMap.length;

  const nextMap: string[][] = [
    ...currentMap.map((x) => x.map((x) => (x === "#" ? "#" : "."))),
  ];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (currentMap[y][x] === "." || currentMap[y][x] === "#") {
        continue;
      }

      const directions = currentMap[y][x].split("");
      for (const direction of directions) {
        let nextX = x;
        let nextY = y;

        // Move
        switch (direction) {
          case "<":
            nextX--;
            break;
          case "^":
            nextY--;
            break;
          case ">":
            nextX++;
            break;
          case "v":
            nextY++;
            break;
        }

        // Wrap
        if (nextMap[nextY][nextX] === "#") {
          switch (direction) {
            case "<":
              nextX = width - 2;
              break;
            case "^":
              nextY = height - 2;
              break;
            case ">":
              nextX = 1;
              break;
            case "v":
              nextY = 1;
              break;
          }
        }

        if (nextMap[nextY][nextX] === ".") {
          nextMap[nextY][nextX] = direction;
        } else {
          nextMap[nextY][nextX] += direction;
        }
      }
    }
  }

  return nextMap;
}

function bfs(
  states: string[][][],
  startPosition: Vector,
  goalPosition: Vector,
  initialSteps = 0
): number {
  const width = states[0][0].length;
  const height = states[0].length;

  const toVisit: (Vector & { steps: number; waits: number })[] = [];
  toVisit.push({ ...startPosition, steps: initialSteps, waits: 0 });

  const visited: Record<string, boolean> = {};

  while (toVisit.length > 0) {
    const current = toVisit.shift()!;

    if (current.x === goalPosition.x && current.y === goalPosition.y) {
      return current.steps;
    }

    if (current.steps + 1 >= states.length) {
      throw new Error("there are not enough pre-calculated states");
    }

    const checks = [
      [1, 0], // Right
      [0, 1], // Down
      [-1, 0], // Left
      [0, -1], // Up
      [0, 0], // Wait
    ];

    let moves = 0;
    for (const [dx, dy] of checks) {
      const next: Vector = { x: current.x + dx, y: current.y + dy };
      if (next.x < 0 || next.x >= width || next.y < 0 || next.y >= height)
        continue;

      const map = states[current.steps + 1];
      if (map[next.y][next.x] === ".") {
        const key = `${next.x}:${next.y}:${current.steps + 1}`;
        if (!visited[key]) {
          toVisit.push({
            ...next,
            steps: current.steps + 1,
            waits: 0,
          });
          visited[key] = true;
        }
        moves++;
      }
    }
  }

  return -1;
}

export function solvePart1(input: Input): number {
  const currentMap: string[][] = input.lines.map((x) => x.split(""));

  // Pre-compute blizzard states
  const states: string[][][] = [currentMap];
  for (let i = 1; i < 1000; i++) {
    states.push(mutate(states[i - 1]));
  }

  const startPosition = {
    x: currentMap[0].findIndex((x) => x === "."),
    y: 0,
  };

  const goalPosition = {
    x: currentMap[currentMap.length - 1].findIndex((x) => x === "."),
    y: currentMap.length - 1,
  };

  return bfs(states, startPosition, goalPosition);
}

export function solvePart2(input: Input): number {
  const currentMap: string[][] = input.lines.map((x) => x.split(""));

  // Pre-compute blizzard states
  const states: string[][][] = [currentMap];
  for (let i = 1; i < 1000; i++) {
    states.push(mutate(states[i - 1]));
  }

  const startPosition = {
    x: currentMap[0].findIndex((x) => x === "."),
    y: 0,
  };

  const goalPosition = {
    x: currentMap[currentMap.length - 1].findIndex((x) => x === "."),
    y: currentMap.length - 1,
  };

  const round1 = bfs(states, startPosition, goalPosition);
  const round2 = bfs(states, goalPosition, startPosition, round1);
  const round3 = bfs(states, startPosition, goalPosition, round2);

  return round3;
}
