import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";
import { solvePart1 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`;
  assertEquals(solvePart1(new Input(input)), 64);
});

Deno.test("part 1 - given test case", () => {
  const input = `1,1,1
2,1,1`;
  assertEquals(solvePart1(new Input(input)), 10);
});

Deno.test("part 1", () => {
  const input = `1,1,1
2,1,1
2,2,1`;
  assertEquals(solvePart1(new Input(input)), 14);
});
