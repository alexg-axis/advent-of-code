import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import {Input} from "../../utils/deno/input.ts";
import { parseInput, solvePart1, solvePart2 } from "./solutions.ts";

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

Deno.test("part 2 - given test case", () => {
  const input = `2199943210
3987894921
9856789892
8767896789
9899965678
`;

  const sum = solvePart2(parseInput(new Input(input)));
  assertEquals(sum, 1134);
});

Deno.test("part 2 - constructed test case", () => {
  const input = `79876799545
65989899634
54393988945
43212567976
54101478897
`;

  const sum = solvePart2(parseInput(new Input(input)));
  assertEquals(sum, 1716);
});
