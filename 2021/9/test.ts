import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import {Input} from "../../utils/deno/input.ts";
import { parseInput, solvePart1 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `2199943210
3987894921
9856789892
8767896789
9899965678
`;

  const sum = solvePart1(parseInput(new Input(input)));
  assertEquals(sum, 15);
});
