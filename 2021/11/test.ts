import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import {Input} from "../../utils/deno/input.ts";
import { parseInput, solvePart1, solvePart2 } from "./solutions.ts";

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

  const flashes = solvePart1(parseInput(new Input(input)));
  assertEquals(flashes, 1656);
});

Deno.test("part 2 - given test case", () => {
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

  const step = solvePart2(parseInput(new Input(input)));
  assertEquals(step, 195);
});
