import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import { solvePart1 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

  assertEquals(solvePart1(new Input(input)), 6440);
});
