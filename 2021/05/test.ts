import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { Input } from "../../utils/deno/input.ts";
import { parseInput, solvePart1, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`;

  const lines = parseInput(new Input(input));
  const intersections = solvePart1(lines);
  assertEquals(intersections, 5);
});

Deno.test("part 2 - given test case", () => {
  const input = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`;

  const lines = parseInput(new Input(input));
  const intersections = solvePart2(lines);
  assertEquals(intersections, 12);
});
