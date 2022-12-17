import { Input } from "../../utils/deno/input.ts";

export const shapes = `
####

 #
###
 #

  #
  #
###

#
#
#
#

##
##`
  .trim()
  .split("\n\n")
  .map((x) => x.trimEnd());

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

export function applyShape(
  bitmap: Bitmap,
  shape: string,
  x: number,
  y: number
) {
  const s = shape
    .split("\n")
    .map((x) => x.split(""))
    .reverse();
  const height = s.length;

  for (let row = 0; row < height; row++) {
    for (let column = 0; column < s[row].length; column++) {
      if (s[row][column] === "#") bitmap.set(x + column, y + row);
    }
  }
}

export function positionIsValid(
  bitmap: Bitmap,
  shape: string,
  x: number,
  y: number
): [boolean, boolean] {
  const s = shape
    .split("\n")
    .map((x) => x.split(""))
    .reverse();
  const height = s.length;
  const width = [...s].sort((a, b) => b.length - a.length)[0].length;

  // Check walls
  if (x < 0 || x + width - 1 >= 7) {
    return [false, false];
  }

  // Check floor
  if (y < 0) {
    return [false, false];
  }

  let stuck = y === 0;
  for (let row = 0; row < height; row++) {
    for (let column = 0; column < s[row].length; column++) {
      if (s[row][column] === "#" && bitmap.isSet(x + column, y + row - 1))
        stuck = true;

      if (s[row][column] === "#" && bitmap.isSet(x + column, y + row)) {
        return [stuck, false];
      }
    }
  }

  return [stuck, true];
}

export function solvePart1(input: Input, n = 2022): number {
  const directions = input.raw.trim();
  const bitmap = new Bitmap();
  let maxY = 0;
  // Spawn is x of left, y of bottom
  const spawn = { x: 2, y: maxY + 3 };

  let j = 0;
  for (let i = 0; i < n; i++) {
    const shape = shapes[i % shapes.length];
    const shapeHeight = shape.split("\n").length;

    let x = spawn.x;
    let y = spawn.y;
    while (true) {
      const direction = directions[j++ % directions.length];

      // Apply wind
      let stuck = false;
      let valid = false;
      if (direction === "<") {
        [stuck, valid] = positionIsValid(bitmap, shape, x - 1, y);
        if (valid) {
          x--;
        }
      } else {
        [stuck, valid] = positionIsValid(bitmap, shape, x + 1, y);
        if (valid) {
          x++;
        }
      }

      // Apply gravity
      [stuck, valid] = positionIsValid(bitmap, shape, x, y - 1);
      if (valid) {
        y--;
      }

      // We couldn't move down, but we're still stuck aka
      // this move caused us to settle
      if (!valid) {
        [stuck, valid] = positionIsValid(bitmap, shape, x, y);
        if (stuck) {
          maxY = Math.max(maxY, y + shapeHeight - 1);
          applyShape(bitmap, shape, x, y);
          spawn.y = maxY + 3 + 1; // maxY is inclusive
          break;
        }
      }
    }

    // bitmap.print(0, 6, 0, maxY, (x) => console.log("|" + x + "|"));
    // console.log();
  }

  // maxY is the zero-based position of the top + 1 = height
  return maxY + 1;
}
