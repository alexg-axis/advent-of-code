import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import { solvePart1 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;
  assertEquals(solvePart1(new Input(input)), 13);
});
