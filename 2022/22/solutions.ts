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
    // const annotated = [...map.map((x) => [...x])];
    // annotated[previous.y][previous.x] = "F" as Tile;
    // annotated[current.y][current.x] = "T" as Tile;
    // console.log("|" + slice(annotated, current) + "|");
    // console.log();
  }

  return current;
}

/*
Works on my ~computer~ input :)
 12
 3
45
6
*/
const regions = [
  [1, 0], // 1
  [2, 0], // 2
  [1, 1], // 3
  [0, 2], // 4
  [1, 2], // 5
  [0, 3], // 6
].map((x) => x.map((y) => y * 50));

function findRegion(position: Position): number {
  return regions.findIndex(
    (region) =>
      position.x >= region[0] &&
      position.x < region[0] + 50 &&
      position.y >= region[1] &&
      position.y < region[1] + 50
  );
}

function moveCube(map: Tile[][], current: Position): Position {
  const { x: dx, y: dy } = delta(current.direction);

  const currentRegion = findRegion(current);

  let nextX = current.x + dx;
  let nextY = current.y + dy;
  let nextRegion = findRegion({
    x: nextX,
    y: nextY,
    direction: current.direction,
  });

  // Directions:
  // 0: right
  // 1: down
  // 2: left
  // 3: up

  // TODO:
  if (nextRegion === -1) {
    switch (currentRegion) {
      case 0:
        switch (current.direction) {
          case 0:
            nextRegion = 1;
            nextX = regions[1][0];
            break;
          case 1:
            nextRegion = 2;
            nextY = regions[2][1];
            break;
          case 2:
            nextRegion = 1;
            nextX = regions[1][0] + 49;
            break;
          case 3:
            nextRegion = 4;
            nextY = regions[4][1] + 49;
            break;
        }
        break;
      case 1:
        switch (current.direction) {
          case 0:
            nextRegion = 0;
            nextX = regions[0][0];
            break;
          case 1:
            nextRegion = 3;
            nextX = regions[2][0] + 49;
            break;
          case 2:
            nextRegion = 0;
            nextX = regions[0][0] + 49;
            break;
          case 3:
            nextRegion = 5;
            nextY = regions[5][1] + 49;
            break;
        }
        break;
      case 2:
        switch (current.direction) {
          case 0:
            nextRegion = 1;
            nextY = regions[1][1] + 49;
            break;
          case 1:
            nextRegion = 4;
            nextY = regions[0][1];
            break;
          case 2:
            nextRegion = 3;
            nextY = regions[3][0];
            break;
          case 3:
            nextRegion = 0;
            nextY = regions[0][1] + 49;
            break;
        }
        break;
      case 3:
        switch (current.direction) {
          case 0:
            nextRegion = 4;
            nextX = regions[4][0];
            break;
          case 1:
            nextRegion = 5;
            nextY = regions[5][1];
            break;
          case 2:
            nextRegion = 0;
            nextX = regions[0][0];
            break;
          case 3:
            nextRegion = 2;
            nextX = regions[2][0];
            break;
        }
        break;
      case 4:
        switch (current.direction) {
          case 0:
            nextRegion = 1;
            nextX = regions[1][0];
            break;
          case 1:
            nextRegion = 2;
            nextY = regions[2][1];
            break;
          case 2:
            nextRegion = 1;
            nextX = regions[1][0] + 49;
            break;
          case 3:
            nextRegion = 4;
            nextY = regions[4][1] + 49;
            break;
        }
        break;
      case 5:
        switch (current.direction) {
          case 0:
            nextRegion = 1;
            nextX = regions[1][0];
            break;
          case 1:
            nextRegion = 2;
            nextY = regions[2][1];
            break;
          case 2:
            nextRegion = 1;
            nextX = regions[1][0] + 49;
            break;
          case 3:
            nextRegion = 4;
            nextY = regions[4][1] + 49;
            break;
        }
        break;
    }
  }

  if (map[nextY][nextX] === ".") {
    return { x: nextX, y: nextY, direction: current.direction };
  }

  return current;
}

export function solveCube(
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

      // Try to move along the direction and wrap as needed, finding out if the
      // destination is valid
      for (let i = 0; i < steps; i++) {
        const next = moveCube(map, current);
        if (
          next.x === current.x &&
          next.y === current.y &&
          next.direction === current.direction
        ) {
          // We didn't move, no use in continuing
          break;
        }
        current.x = next.x;
        current.y = next.y;
        current.direction = next.direction;
      }
    }

    // If the steps led us to a valid location along the path, move
    // console.log(
    //   instruction.type === "turn"
    //     ? ["l", "", "r"][instruction.value + 1]
    //     : instruction.value
    // );
    // console.log(current.x, current.y, current.direction);
    // const annotated = [...map.map((x) => [...x])];
    // annotated[previous.y][previous.x] = "F" as Tile;
    // annotated[current.y][current.x] = "T" as Tile;
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

export function solvePart2(input: Input): number {
  const [map, instructions] = parseInput(input);

  const solved = solveCube(map, instructions);

  return 1000 * (solved.y + 1) + 4 * (solved.x + 1) + solved.direction;
}
