import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import { solvePart1, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

  assertEquals(solvePart1(new Input(input)), 114);
});

Deno.test("part 2 - given test case", () => {
  const input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

  assertEquals(solvePart2(new Input(input)), 2);
});
