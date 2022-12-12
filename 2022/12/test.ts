import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import { solvePart1, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;
  assertEquals(solvePart1(new Input(input)), 31);
});

Deno.test("part 2 - given test case", () => {
  const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;
  assertEquals(solvePart2(new Input(input)), 29);
});
