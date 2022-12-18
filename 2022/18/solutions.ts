import { bounds, max } from "../../utils/deno/arrays.ts";
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

  print(
    minX: number,
    maxX: number,
    minY: number,
    maxY: number,
    out = console.log
  ) {
    for (let y = maxY; y >= minY; y--) {
      out(
        new Array(Math.abs(maxX - minX) + 1)
          .fill(0)
          .map((_, x) => (this.isSet(x + minX, y) ? "#" : "."))
          .join("")
      );
    }
  }
}

function touchesOther(
  a: [number, number, number],
  b: [number, number, number]
): boolean[] {
  return [
    a[0] === b[0] + 1 && a[1] === b[1] && a[2] === b[2], // Left
    a[0] + 1 === b[0] && a[1] === b[1] && a[2] === b[2], // Right
    a[0] === b[0] && a[1] === b[1] + 1 && a[2] === b[2], // Bottom
    a[0] === b[0] && a[1] + 1 === b[1] && a[2] === b[2], // Top
    a[0] === b[0] && a[1] === b[1] && a[2] === b[2] + 1, // Back
    a[0] === b[0] && a[1] === b[1] && a[2] + 1 === b[2], // Front
  ];
}

export function solvePart1(input: Input): number {
  const coordinates: [number, number, number][] = input.raw
    .trim()
    .split("\n")
    .map((x) => x.split(",").map(Number)) as [number, number, number][];

  let sides = 0;
  for (let i = 0; i < coordinates.length; i++) {
    let visible = new Array(6).fill(true);
    for (let j = 0; j < coordinates.length; j++) {
      if (i === j) continue;

      const a = coordinates[i];
      const b = coordinates[j];

      const touching = touchesOther(a, b);
      visible = visible.map((x, i) => x && !touching[i]);
    }

    sides += visible.filter((x) => x).length;
  }

  return sides;
}
