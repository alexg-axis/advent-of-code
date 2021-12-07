import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { solvePart1, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `16,1,2,0,4,2,7,1,2,14
`;

  const count = solvePart1(input.trim().split(",").map(Number));
  assertEquals(count, 37);
});

Deno.test("part 2 - given test case", () => {
  const input = `16,1,2,0,4,2,7,1,2,14
`;

  const count = solvePart2(input.trim().split(",").map(Number));
  assertEquals(count, 168);
});
