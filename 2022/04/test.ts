import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import { explodeRange, solvePart1, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

  assertEquals(solvePart1(new Input(input)), 2);
});

Deno.test("part 2 - given test case", () => {
  const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

  assertEquals(solvePart2(new Input(input)), 4);
});

Deno.test("part 2 - explodeRange", () => {
  assertEquals(explodeRange("3-7"), new Set([3, 4, 5, 6, 7]));
});
