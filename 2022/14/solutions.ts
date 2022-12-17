import { Input } from "../../utils/deno/input.ts";

type Vector = [number, number];

class Bitmap {
  private bitmap: Record<number, Record<number, boolean>>;

  constructor() {
    this.bitmap = {};
  }

  set(x: number, y: number) {
    if (!this.bitmap[y]) this.bitmap[y] = {};
    this.bitmap[y][x] = true;
  }

  unset(x: number, y: number) {
    if (!this.bitmap[y]) return;
    delete this.bitmap[y][x];
  }

  isSet(x: number, y: number) {
    return this.bitmap[y] && this.bitmap[y][x] ? true : false;
  }

  print(minX: number, maxX: number, minY: number, maxY: number) {
    for (let y = minY; y <= maxY; y++) {
      console.log(
        new Array(maxX - minX + 1)
          .fill(0)
          .map((_, x) => (this.isSet(x + minX, y) ? "x" : "."))
          .join("")
      );
    }
  }
}

function parseInput(input: Input): {
  bitmap: Bitmap;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
} {
  const lines: Vector[][] = input.raw
    .trim()
    .split("\n")
    .map((x) => x.split(" -> ").map((x) => x.split(",").map(Number) as Vector));

  let minX = Number.MAX_SAFE_INTEGER;
  let maxX = Number.MIN_SAFE_INTEGER;

  const minY = 0; // Hard coded, sand falls from here
  let maxY = Number.MIN_SAFE_INTEGER;

  for (const line of lines) {
    for (const coordinate of line) {
      if (coordinate[0] < minX) minX = coordinate[0];
      if (coordinate[0] > maxX) maxX = coordinate[0];
      if (coordinate[1] > maxY) maxY = coordinate[1];
    }
  }

  const bitmap = new Bitmap();

  for (const line of lines) {
    for (let i = 1; i < line.length; i++) {
      const a = line[i - 1];
      const b = line[i];

      if (a[0] === b[0]) {
        for (let y = Math.min(a[1], b[1]); y <= Math.max(a[1], b[1]); y++) {
          bitmap.set(a[0], y);
        }
      } else if (a[1] === b[1]) {
        for (let x = Math.min(a[0], b[0]); x <= Math.max(a[0], b[0]); x++) {
          bitmap.set(x, a[1]);
        }
      }
    }
  }

  return {
    bitmap,
    minX,
    maxX,
    minY,
    maxY,
  };
}

export function solvePart1(input: Input): number {
  const { bitmap, minX, maxX, maxY } = parseInput(input);

  let sandCurrentX = 500;
  let sandCurrentY = 0;
  let stable = 0;
  while (true) {
    // Out of bounds down
    if (sandCurrentY + 1 > maxY) {
      // Abyss
      return stable;
    }

    // Down
    if (!bitmap.isSet(sandCurrentX, sandCurrentY + 1)) {
      sandCurrentY++;
      continue;
    }

    // Out of bounds left
    if (sandCurrentX - 1 < minX) {
      // Abyss
      return stable;
    }

    // Left diagonally
    if (!bitmap.isSet(sandCurrentX - 1, sandCurrentY + 1)) {
      sandCurrentX--;
      sandCurrentY++;
      continue;
    }

    // Out of bounds right
    if (sandCurrentX + 1 > maxX) {
      // Abyss
      return stable;
    }

    // Right diagonally
    if (!bitmap.isSet(sandCurrentX + 1, sandCurrentY + 1)) {
      sandCurrentX++;
      sandCurrentY++;
      continue;
    }

    // Stable
    bitmap.set(sandCurrentX, sandCurrentY);
    stable++;
    sandCurrentX = 500;
    sandCurrentY = 0;
  }
}

export function solvePart2(input: Input): number {
  const { bitmap, minX, maxX, minY, maxY } = parseInput(input);

  let sandCurrentX = 500;
  let sandCurrentY = 0;
  let stable = 0;
  while (true) {
    // Out of bounds down (floor)
    if (sandCurrentY + 1 === maxY + 2) {
      // Stable
      bitmap.set(sandCurrentX, sandCurrentY);
      stable++;
      sandCurrentX = 500;
      sandCurrentY = 0;
      continue;
    }

    // Down
    if (!bitmap.isSet(sandCurrentX, sandCurrentY + 1)) {
      sandCurrentY++;
      continue;
    }

    // Left diagonally
    if (!bitmap.isSet(sandCurrentX - 1, sandCurrentY + 1)) {
      sandCurrentX--;
      sandCurrentY++;
      continue;
    }

    // Right diagonally
    if (!bitmap.isSet(sandCurrentX + 1, sandCurrentY + 1)) {
      sandCurrentX++;
      sandCurrentY++;
      continue;
    }

    // Stable
    bitmap.set(sandCurrentX, sandCurrentY);
    stable++;

    // Goal
    if (sandCurrentY === 0) {
      return stable;
    }

    sandCurrentX = 500;
    sandCurrentY = 0;
  }
}
