import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import { solvePart1, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `30373
25512
65332
33549
35390`;
  assertEquals(solvePart1(new Input(input)), 21);
});

Deno.test("part 2 - given test case", () => {
  const input = `30373
25512
65332
33549
35390`;
  assertEquals(solvePart2(new Input(input)), 8);
});
