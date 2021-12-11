import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import {Input} from "../../utils/deno/input.ts";
import { parseInput, solvePart1 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
`;

  const sum = solvePart1(parseInput(new Input(input)));
  assertEquals(sum, 1656);
});
