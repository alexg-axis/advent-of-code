import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import {Input} from "../../utils/deno/input.ts";
import { parseInput, solvePart1, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `target area: x=20..30, y=-10..-5`;

  const height = solvePart1(parseInput(new Input(input)));
  assertEquals(height, 45);
});

Deno.test("part 1 - given test case", () => {
  const input = `target area: x=20..30, y=-10..-5`;

  const height = solvePart2(parseInput(new Input(input)));
  assertEquals(height, 112);
});
