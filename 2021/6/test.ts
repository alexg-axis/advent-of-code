import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { solvePart1, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `3,4,3,1,2
`;

  const count = solvePart1(input.trim().split(",").map(Number));
  assertEquals(count, 5934);
});

Deno.test("part 2 - given test case", () => {
  const input = `3,4,3,1,2
`;

  const count = solvePart2(input.trim().split(",").map(Number));
  assertEquals(count, 26984457539);
});
