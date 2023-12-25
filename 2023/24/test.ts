import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import { solvePart1 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`;

  assertEquals(solvePart1(new Input(input), 7, 27), 2);
});

Deno.test("part 1 - input test case", () => {
  const input = `298793064594510, 263093335773079, 376515029011499 @ -14,  59, -89
300501970298399, 314329447278049, 467279541164790 @ -32, 34, -91`;

  assertEquals(solvePart1(new Input(input)), 1);
});

Deno.test("part 1 - input test case", () => {
  const input = `298793064594510, 263093335773079, 376515029011499 @ -14,  59, -89
388143561918162, 279175111435661, 308798092369721 @ -134, 61, -61`;

  assertEquals(solvePart1(new Input(input)), 1);
});
