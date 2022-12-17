import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import {
  applyShape,
  Bitmap,
  positionIsValid,
  shapes,
  solvePart1,
} from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`;
  assertEquals(solvePart1(new Input(input)), 3068);
});

Deno.test("applyShape 0", () => {
  const bitmap = new Bitmap();
  const shape = shapes[0];

  applyShape(bitmap, shape, 0, 0);
  assertEquals(bitmap.isSet(0, 0), true);
  assertEquals(bitmap.isSet(1, 0), true);
  assertEquals(bitmap.isSet(2, 0), true);
  assertEquals(bitmap.isSet(3, 0), true);
});

Deno.test("applyShape 1", () => {
  const bitmap = new Bitmap();
  const shape = shapes[1];

  applyShape(bitmap, shape, 0, 0);
  assertEquals(bitmap.isSet(1, 0), true);
  assertEquals(bitmap.isSet(0, 1), true);
  assertEquals(bitmap.isSet(1, 1), true);
  assertEquals(bitmap.isSet(2, 1), true);
  assertEquals(bitmap.isSet(1, 2), true);
});

Deno.test("applyShape 2", () => {
  const bitmap = new Bitmap();
  const shape = shapes[2];

  applyShape(bitmap, shape, 0, 0);
  assertEquals(bitmap.isSet(0, 0), true);
  assertEquals(bitmap.isSet(1, 0), true);
  assertEquals(bitmap.isSet(2, 0), true);
  assertEquals(bitmap.isSet(2, 1), true);
  assertEquals(bitmap.isSet(2, 2), true);
});

Deno.test("applyShape 3", () => {
  const bitmap = new Bitmap();
  const shape = shapes[3];

  applyShape(bitmap, shape, 0, 0);
  assertEquals(bitmap.isSet(0, 0), true);
  assertEquals(bitmap.isSet(0, 1), true);
  assertEquals(bitmap.isSet(0, 2), true);
  assertEquals(bitmap.isSet(0, 3), true);
});

Deno.test("applyShape 4", () => {
  const bitmap = new Bitmap();
  const shape = shapes[4];

  applyShape(bitmap, shape, 0, 0);
  assertEquals(bitmap.isSet(0, 0), true);
  assertEquals(bitmap.isSet(1, 0), true);
  assertEquals(bitmap.isSet(0, 1), true);
  assertEquals(bitmap.isSet(1, 1), true);
});

Deno.test("positionIsValid", () => {
  const bitmap = new Bitmap();

  // ####
  assertEquals(positionIsValid(bitmap, shapes[0], 0, 0), [true, true]);
  applyShape(bitmap, shapes[0], 0, 0);
  // ####
  // ####
  assertEquals(positionIsValid(bitmap, shapes[0], 0, 1), [true, true]);
  applyShape(bitmap, shapes[0], 0, 1);
  //     #
  //    ###
  // #####
  // ####
  assertEquals(positionIsValid(bitmap, shapes[1], 3, 1), [true, true]);
  applyShape(bitmap, shapes[1], 3, 1);
  //     #
  //     #
  //   ###
  //     #
  //    ###
  // #####
  // ####
  assertEquals(positionIsValid(bitmap, shapes[2], 2, 4), [true, true]);
  applyShape(bitmap, shapes[2], 2, 4);
  const lines: string[] = [];
  bitmap.print(0, 6, 0, 6, (x) => lines.push(x));
  assertEquals(
    `....#..
....#..
..###..
....#..
...###.
#####..
####...`,
    lines.join("\n")
  );
});

Deno.test("positionIsValid - walls", () => {
  const bitmap = new Bitmap();

  assertEquals(positionIsValid(bitmap, shapes[0], -1, 0), [false, false]);
  assertEquals(positionIsValid(bitmap, shapes[0], 4, 0), [false, false]);
});
