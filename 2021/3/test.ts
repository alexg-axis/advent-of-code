import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { solvePart1 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

  const numbers = input.split("\n");
  const [gamma, epsilon] = solvePart1(numbers);
  assertEquals(gamma, 22);
  assertEquals(epsilon, 9);
});
