import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { solvePart1, solvePart2 } from "./solutions.ts";

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

Deno.test("part 2 - given test case", () => {
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
  const [oxygenGeneratorRating, co2ScrubberRating] = solvePart2(numbers);
  assertEquals(oxygenGeneratorRating, 23);
  assertEquals(co2ScrubberRating, 10);
});
