import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";
import { solvePart1, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `1
2
-3
3
-2
0
4`;
  assertEquals(solvePart1(new Input(input)), 3);
});

Deno.test("part 1 - given test case", () => {
  const input = `1
2
-3
3
-2
0
4`;
  assertEquals(solvePart2(new Input(input)), 1623178306);
});
