import { max } from "../../utils/deno/arrays.ts";
import { Input } from "../../utils/deno/input.ts";
import { mod } from "../../utils/deno/math.ts";

type Direction = 0 | 1 | 2 | 3;

type Rotation = -1 | 1;

type Instruction =
  | { type: "turn"; value: Rotation }
  | { type: "move"; value: number };

type Tile = " " | "." | "#";

interface Position {
  x: number;
  y: number;
  direction: Direction;
}

export function rotate(current: Direction, rotation: Rotation): Direction {
  return mod(current + rotation, 4) as Direction;
}

function delta(direction: Direction): { x: number; y: number } {
  return [
    { x: 1, y: 0 }, // Right
    { x: 0, y: 1 }, // Down
    { x: -1, y: 0 }, // Left
    { x: 0, y: -1 }, // Up
  ][direction];
}

export function parseInput(input: Input): [Tile[][], Instruction[]] {
  const [rawMap, rawPath] = input.raw.trimEnd().split("\n\n");
  const maxWidth = rawMap
    .trimEnd()
    .split("\n")
    .map((x) => x.length)
    .reduce(max);
  const map: Tile[][] = rawMap
    .trimEnd()
    .split("\n")
    .map((x) => {
      const y = x.split("");
      return new Array(maxWidth).fill(0).map((_, i) => y[i] || " ") as Tile[];
    });
  const instructions: Instruction[] = rawPath
    .trim()
    .replace(/(R|L)/g, ",$1,")
    .replace(/^,|,$/g, "")
    .split(",")
    .map((x) => {
      if (x === "R" || x === "L") {
        return { type: "turn", value: x === "R" ? 1 : -1 };
      } else {
        return { type: "move", value: Number(x) };
      }
    }) as Instruction[];

  return [map, instructions];
}

function slice(map: Tile[][], position: Position): string {
  const height = map.length;
  const width = map.map((x) => x.length).reduce(max);

  if (position.direction === 0 || position.direction === 2) {
    return new Array(width)
      .fill(0)
      .map((_, i) => map[position.y][i] || "")
      .join("");
  } else {
    return new Array(height)
      .fill(0)
      .map((_, i) => map[i][position.x] || "")
      .join("");
  }
}

export function solve(
  map: Tile[][],
  instructions: Instruction[],
  start?: Position
): Position {
  const height = map.length;
  const width = map.map((x) => x.length).reduce(max);

  if (!start) {
    start = {
      x: map[0].findIndex((x) => x === "."),
      y: 0,
      direction: 0,
    };
  }

  const current: Position = {
    x: start.x,
    y: start.y,
    direction: start.direction,
  };

  for (const instruction of instructions) {
    const previous = { ...current };
    if (instruction.type === "turn") {
      const rotation = instruction.value;
      current.direction = rotate(current.direction, rotation);
    } else {
      const steps = instruction.value;

      const { x: dx, y: dy } = delta(current.direction);

      // Try to move along the direction and wrap as needed, finding out if the
      // destination is valid
      let nextX = current.x;
      let nextY = current.y;
      for (let i = 0, j = 1; i < steps; i++, j++) {
        const potentialNextY = mod(current.y + dy * j, height);
        const potentialNextX = mod(current.x + dx * j, width);
        const tile = map[potentialNextY][potentialNextX];
        if (tile === "#") {
          break;
        } else if (tile === ".") {
          nextX = potentialNextX;
          nextY = potentialNextY;
        } else {
          // Don't consume a step whilst wrapping
          i--;
        }
      }

      current.x = nextX;
      current.y = nextY;
    }

    // If the steps led us to a valid location along the path, move
    // console.log(
    //   instruction.type === "turn"
    //     ? ["l", "", "r"][instruction.value + 1]
    //     : instruction.value
    // );
    // console.log(current.x, current.y, current.direction);
    const annotated = [...map.map((x) => [...x])];
    annotated[previous.y][previous.x] = "F" as Tile;
    annotated[current.y][current.x] = "T" as Tile;
    // console.log("|" + slice(annotated, current) + "|");
    // console.log();
  }

  return current;
}

export function solvePart1(input: Input): number {
  const [map, instructions] = parseInput(input);

  const solved = solve(map, instructions);

  return 1000 * (solved.y + 1) + 4 * (solved.x + 1) + solved.direction;
}
