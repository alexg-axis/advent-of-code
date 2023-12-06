import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import { solvePart1 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `Time:      7  15   30
Distance:  9  40  200`;

  assertEquals(solvePart1(new Input(input)), 288);
});
