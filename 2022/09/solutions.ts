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

function replaceAt(string: string, index: number, replacement: string): string {
  return (
    string.substring(0, index) +
    replacement +
    string.substring(index + replacement.length)
  );
}

function followHead(head: Vector, tail: Vector, direction: Direction) {
  if (touching(head, tail)) {
    return;
  }

  const d = distance(head, tail);
  if (Math.abs(d.x) <= 2 && d.y === 0) {
    moveInDirection(tail, d.x < 0 ? "R" : "L");
  } else if (Math.abs(d.x) === 0 && d.y <= 2) {
    moveInDirection(tail, d.y < 0 ? "U" : "D");
  } else {
    moveInDirection(tail, d.x < 0 ? "R" : "L");
    moveInDirection(tail, d.y < 0 ? "U" : "D");
  }
}

function display(vectors: Vector[], size: Vector, start: Vector) {
  // Deep copy
  vectors = [...vectors.map(({ x, y }) => ({ x, y }))];

  for (const vector of vectors) {
    vector.x += start.x;
    vector.y += start.y;
  }

  const grid: string[] = new Array(size.y).fill(".".repeat(size.x));
  for (let i = vectors.length - 1; i >= 0; i--) {
    const { x, y } = vectors[i];
    grid[y] = replaceAt(grid[y], x, i === 0 ? "H" : i.toString());
  }
  grid[start.y] = replaceAt(grid[start.y], start.x, "S");
  console.log(grid.reverse().join("\n"));
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
      followHead(head, tail, direction);
      visited.add(`${tail.x}:${tail.y}`);
    }
  }

  return visited.size;
}

export function solvePart2(input: Input): number {
  const moves: [Direction, number][] = input.lines.map((x) => {
    const parts = x.split(" ");
    return [parts[0] as Direction, Number(parts[1])];
  });

  const knots: Vector[] = new Array(10).fill(0).map(() => ({ x: 0, y: 0 }));

  const visited = new Set<string>();
  visited.add(`${knots[9].x}:${knots[9].y}`);

  // display(knots, { x: 80, y: 40 }, { x: 11, y: 5 });
  for (const [direction, steps] of moves) {
    for (let i = 0; i < steps; i++) {
      // Move head
      moveInDirection(knots[0], direction);

      // Tails should follow the knot in front of them
      for (let j = 1; j < knots.length; j++) {
        const head = knots[j - 1];
        const tail = knots[j];
        followHead(head, tail, direction);
      }
      visited.add(`${knots[9].x}:${knots[9].y}`);
    }

    // console.log(`== ${direction} ${steps} ==`);
    // display(knots, { x: 80, y: 40 }, { x: 11, y: 5 });
  }

  return visited.size;
}
