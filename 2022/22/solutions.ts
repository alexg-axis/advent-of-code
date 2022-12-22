import { Input } from "../../utils/deno/input.ts";
import { mod } from "../../utils/deno/math.ts";

type Direction = "up" | "down" | "left" | "right";

type Rotation = "R" | "L";

type Instruction = number | Rotation;

type Tile = " " | "." | "#";

function rotate(current: Direction, rotation: Rotation): Direction {
  switch (current) {
    case "up":
      return rotation === "R" ? "right" : "left";
    case "down":
      return rotation === "R" ? "left" : "right";
    case "left":
      return rotation === "R" ? "up" : "down";
    case "right":
      return rotation === "R" ? "down" : "up";
  }
}

function delta(direction: Direction): { x: number; y: number } {
  switch (direction) {
    case "up":
      return { x: 0, y: -1 };
    case "down":
      return { x: 0, y: +1 };
    case "left":
      return { x: -1, y: 0 };
    case "right":
      return { x: +1, y: 0 };
  }
}

export function parseInput(input: Input): [Tile[][], Instruction[]] {
  const [rawMap, rawPath] = input.raw.trimEnd().split("\n\n");
  const map: Tile[][] = rawMap
    .trimEnd()
    .split("\n")
    .map((x) => x.split("") as Tile[]);
  const instructions: Instruction[] = rawPath
    .trim()
    .replace(/(R|L)/g, ",$1,")
    .replace(/^,|,$/g, "")
    .split(",")
    .map((x) => (x === "R" || x === "L" ? x : Number(x))) as Instruction[];

  return [map, instructions];
}

export function solve(
  map: Tile[][],
  instructions: Instruction[]
): { x: number; y: number; direction: Direction } {
  const height = map.length;

  const visited = [...map.map((x) => [...x])];

  const current = {
    x: map[0].findIndex((x) => x === "."),
    y: 0,
    direction: "right" as Direction,
  };
  // console.log(current.x + 1, current.y + 1, current.direction);
  visited[current.y][current.x] = current.direction
    .replace("left", "<")
    .replace("right", ">")
    .replace("up", "^")
    .replace("down", "v") as Tile;
  for (const instruction of instructions) {
    if (typeof instruction === "string") {
      const rotation = instruction;
      current.direction = rotate(current.direction, rotation);
      // console.log(current.x + 1, current.y + 1, current.direction);
      visited[current.y][current.x] = current.direction
        .replace("left", "<")
        .replace("right", ">")
        .replace("up", "^")
        .replace("down", "v") as Tile;
      continue;
    }

    const steps = instruction;

    const { x: dx, y: dy } = delta(current.direction);

    // Try to move along the direction and wrap as needed, finding out if the
    // destination is valid
    let nextX = current.x;
    let nextY = current.y;
    for (let i = 0, j = 1; i < steps; i++, j++) {
      const potentialNextY = mod(current.y + dy * j, height);
      const width = map[potentialNextY].length;
      const potentialNextX = mod(current.x + dx * j, width);
      const tile = map[potentialNextY][potentialNextX];
      if (tile === "#") {
        break;
      } else if (tile === ".") {
        nextX = potentialNextX;
        nextY = potentialNextY;
        visited[nextY][nextX] = current.direction
          .replace("left", "<")
          .replace("right", ">")
          .replace("up", "^")
          .replace("down", "v") as Tile;
      } else if (tile === " ") {
        // Don't consume a step whilst wrapping
        i--;
      }
    }

    // If the steps led us to a valid location along the path, move
    current.x = nextX;
    current.y = nextY;
  }

  // console.log(visited.map((x) => x.join("")).join("\n"));
  // console.log(
  //   current.x + 1,
  //   current.y + 1,
  //   ["right", "down", "left", "up"].indexOf(current.direction)
  // );
  return current;
}

export function solvePart1(input: Input): number {
  const [map, instructions] = parseInput(input);

  const solved = solve(map, instructions);

  return (
    1000 * (solved.y + 1) +
    4 * (solved.x + 1) +
    ["right", "down", "left", "up"].indexOf(solved.direction)
  );
}
