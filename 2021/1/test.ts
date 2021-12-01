import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { solvePart1, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `199
200
208
210
200
207
240
269
260
263`;

  const numbers = input.split("\n").map(x => Number(x));
  const increases = solvePart1(numbers);
  assertEquals(increases, 7);
});


Deno.test("part 2 - given test case", () => {
  const input = `199
200
208
210
200
207
240
269
260
263`;

  const numbers = input.split("\n").map(x => Number(x));
  const increases = solvePart2(numbers);
  assertEquals(increases, 5);
});
