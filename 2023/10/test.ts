import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import { solvePart1 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `.....
.S-7.
.|.|.
.L-J.
.....`;

  assertEquals(solvePart1(new Input(input)), 4);
});

Deno.test("part 1 - given test case", () => {
  const input = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;

  assertEquals(solvePart1(new Input(input)), 4);
});

Deno.test("part 1 - given test case", () => {
  const input = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

  assertEquals(solvePart1(new Input(input)), 8);
});

Deno.test("part 1 - given test case", () => {
  const input = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`;

  assertEquals(solvePart1(new Input(input)), 8);
});

Deno.test("part 1 - created test case", () => {
  const input = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`;

  assertEquals(solvePart1(new Input(input)), 8);
});
