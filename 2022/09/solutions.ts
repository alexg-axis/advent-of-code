import type { Input } from "../../utils/deno/input.ts";

type Grid<T> = T[][];

type Vector = {
  x: number;
  y: number;
};

type Direction = "L" | "R" | "U" | "D";

function distance(from: Vector, to: Vector): Vector {
  return {
    x: to.x - from.x,
    y: to.y - from.y,
  };
}

function touching(a: Vector, b: Vector): boolean {
  const d = distance(a, b);
  return Math.abs(d.x) <= 1 && Math.abs(d.y) <= 1;
}

function moveInDirection(coordinate: Vector, direction: Direction) {
  switch (direction) {
    case "L":
      coordinate.x--;
      break;
    case "R":
      coordinate.x++;
      break;
    case "U":
      coordinate.y++;
      break;
    case "D":
      coordinate.y--;
      break;
  }
}

export function solvePart1(input: Input): number {
  const moves: [Direction, number][] = input.lines.map((x) => {
    const parts = x.split(" ");
    return [parts[0] as Direction, Number(parts[1])];
  });

  const head: Vector = { x: 0, y: 0 };
  const tail: Vector = { x: 0, y: 0 };

  const visited = new Set<string>();
  visited.add(`${tail.x}:${tail.y}`);

  for (const [direction, steps] of moves) {
    for (let i = 0; i < steps; i++) {
      moveInDirection(head, direction);

      if (touching(head, tail)) {
        continue;
      }

      const d = distance(head, tail);
      if (
        (Math.abs(d.x) <= 2 && d.y === 0) ||
        (Math.abs(d.x) === 0 && d.y <= 2)
      ) {
        moveInDirection(tail, direction);
      } else {
        moveInDirection(tail, d.x < 0 ? "R" : "L");
        moveInDirection(tail, d.y < 0 ? "U" : "D");
      }

      visited.add(`${tail.x}:${tail.y}`);
    }
  }

  return visited.size;
}
