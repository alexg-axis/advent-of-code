import { bounds, min } from "../../utils/deno/arrays.ts";
import { Input } from "../../utils/deno/input.ts";

export class Bitmap {
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

  *iterate(): Generator<[number, number], void> {
    for (const [y, row] of Object.entries(this.bitmap)) {
      for (const x of Object.keys(row)) {
        yield [Number(x), Number(y)];
      }
    }
  }

  print(
    minX: number,
    maxX: number,
    minY: number,
    maxY: number,
    out = console.log
  ) {
    for (let y = minY; y <= maxY; y++) {
      out(
        new Array(Math.abs(maxX - minX) + 1)
          .fill(0)
          .map((_, x) => (this.isSet(x + minX, y) ? "#" : "."))
          .join("")
      );
    }
  }

  bounds() {
    const [minY, maxY] = bounds(Object.keys(this.bitmap).map(Number));
    let minX = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;

    for (const row of Object.values(this.bitmap)) {
      const [min, max] = bounds(Object.keys(row).map(Number));
      if (min < minX) minX = min;
      if (max > maxX) maxX = max;
    }

    return [minX, maxX, minY, maxY];
  }
}

export function solvePart1(input: Input): number {
  let bitmap = new Bitmap();
  const lines = input.lines;
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === "#") bitmap.set(x, y);
    }
  }

  const checks = [
    // North
    (x: number, y: number) =>
      !bitmap.isSet(x - 1, y - 1) &&
      !bitmap.isSet(x, y - 1) &&
      !bitmap.isSet(x + 1, y - 1),
    // South
    (x: number, y: number) =>
      !bitmap.isSet(x - 1, y + 1) &&
      !bitmap.isSet(x, y + 1) &&
      !bitmap.isSet(x + 1, y + 1),
    // West
    (x: number, y: number) =>
      !bitmap.isSet(x - 1, y + 1) &&
      !bitmap.isSet(x - 1, y) &&
      !bitmap.isSet(x - 1, y - 1),
    // East
    (x: number, y: number) =>
      !bitmap.isSet(x + 1, y - 1) &&
      !bitmap.isSet(x + 1, y) &&
      !bitmap.isSet(x + 1, y + 1),
  ];

  const performMoves: ((
    count: Record<string, number>,
    moves: [[number, number], [number, number]][],
    x: number,
    y: number
  ) => void)[] = [
    // North
    (count, moves, x, y) => {
      count[`${x}:${y - 1}`] = (count[`${x}:${y - 1}`] || 0) + 1;
      moves.push([
        [x, y],
        [x, y - 1],
      ]);
    },
    // South
    (count, moves, x, y) => {
      count[`${x}:${y + 1}`] = (count[`${x}:${y + 1}`] || 0) + 1;
      moves.push([
        [x, y],
        [x, y + 1],
      ]);
    },
    // West
    (count, moves, x, y) => {
      count[`${x - 1}:${y}`] = (count[`${x - 1}:${y}`] || 0) + 1;
      moves.push([
        [x, y],
        [x - 1, y],
      ]);
    },
    // East
    (count, moves, x, y) => {
      count[`${x + 1}:${y}`] = (count[`${x + 1}:${y}`] || 0) + 1;
      moves.push([
        [x, y],
        [x + 1, y],
      ]);
    },
  ];

  for (let i = 0; i < 10; i++) {
    const count: Record<string, number> = {};
    const moves: [[number, number], [number, number]][] = [];
    const nextBitmap = new Bitmap();
    for (const [x, y] of bitmap.iterate()) {
      let adjacent = "";
      bitmap.print(x - 1, x + 1, y - 1, y + 1, (x) => (adjacent += x));
      if (adjacent.split("").filter((x) => x === "#").length === 1) {
        // No adjacent elves, do nothing
        nextBitmap.set(x, y);
        continue;
      }

      let performedMove = false;
      for (let j = 0; j < 4; j++) {
        const check = (i + j) % 4;
        if (checks[check](x, y)) {
          performMoves[check](count, moves, x, y);
          performedMove = true;
          break;
        }
      }

      if (!performedMove) {
        // Do nothing
        nextBitmap.set(x, y);
      }
    }

    for (const [from, to] of moves) {
      if (count[`${to[0]}:${to[1]}`] === 1) {
        nextBitmap.set(...to);
      } else {
        nextBitmap.set(...from);
      }
    }
    bitmap = nextBitmap;
    // bitmap.print(-12, 24, -12, 12);
    // console.log();
  }

  const [minX, maxX, minY, maxY] = bitmap.bounds();
  let result = "";
  bitmap.print(minX, maxX, minY, maxY, (x) => (result += x));

  return result.split("").filter((x) => x === ".").length;
}

export function solvePart2(input: Input): number {
  let bitmap = new Bitmap();
  const lines = input.lines;
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === "#") bitmap.set(x, y);
    }
  }

  const checks = [
    // North
    (x: number, y: number) =>
      !bitmap.isSet(x - 1, y - 1) &&
      !bitmap.isSet(x, y - 1) &&
      !bitmap.isSet(x + 1, y - 1),
    // South
    (x: number, y: number) =>
      !bitmap.isSet(x - 1, y + 1) &&
      !bitmap.isSet(x, y + 1) &&
      !bitmap.isSet(x + 1, y + 1),
    // West
    (x: number, y: number) =>
      !bitmap.isSet(x - 1, y + 1) &&
      !bitmap.isSet(x - 1, y) &&
      !bitmap.isSet(x - 1, y - 1),
    // East
    (x: number, y: number) =>
      !bitmap.isSet(x + 1, y - 1) &&
      !bitmap.isSet(x + 1, y) &&
      !bitmap.isSet(x + 1, y + 1),
  ];

  const performMoves: ((
    count: Record<string, number>,
    moves: [[number, number], [number, number]][],
    x: number,
    y: number
  ) => void)[] = [
    // North
    (count, moves, x, y) => {
      count[`${x}:${y - 1}`] = (count[`${x}:${y - 1}`] || 0) + 1;
      moves.push([
        [x, y],
        [x, y - 1],
      ]);
    },
    // South
    (count, moves, x, y) => {
      count[`${x}:${y + 1}`] = (count[`${x}:${y + 1}`] || 0) + 1;
      moves.push([
        [x, y],
        [x, y + 1],
      ]);
    },
    // West
    (count, moves, x, y) => {
      count[`${x - 1}:${y}`] = (count[`${x - 1}:${y}`] || 0) + 1;
      moves.push([
        [x, y],
        [x - 1, y],
      ]);
    },
    // East
    (count, moves, x, y) => {
      count[`${x + 1}:${y}`] = (count[`${x + 1}:${y}`] || 0) + 1;
      moves.push([
        [x, y],
        [x + 1, y],
      ]);
    },
  ];

  for (let i = 0; i < 1000; i++) {
    const count: Record<string, number> = {};
    const moves: [[number, number], [number, number]][] = [];
    const nextBitmap = new Bitmap();
    for (const [x, y] of bitmap.iterate()) {
      let adjacent = "";
      bitmap.print(x - 1, x + 1, y - 1, y + 1, (x) => (adjacent += x));
      if (adjacent.split("").filter((x) => x === "#").length === 1) {
        // No adjacent elves, do nothing
        nextBitmap.set(x, y);
        continue;
      }

      let performedMove = false;
      for (let j = 0; j < 4; j++) {
        const check = (i + j) % 4;
        if (checks[check](x, y)) {
          performMoves[check](count, moves, x, y);
          performedMove = true;
          break;
        }
      }

      if (!performedMove) {
        // Do nothing
        nextBitmap.set(x, y);
      }
    }

    if (moves.length === 0) {
      return i + 1;
    }

    for (const [from, to] of moves) {
      if (count[`${to[0]}:${to[1]}`] === 1) {
        nextBitmap.set(...to);
      } else {
        nextBitmap.set(...from);
      }
    }
    bitmap = nextBitmap;
    // bitmap.print(-12, 24, -12, 12);
    // console.log();
  }

  return -1;
}
