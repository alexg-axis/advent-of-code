import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import type {Instruction} from "./solutions.ts";
import { parseInstructions, solvePart1, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

  const instructions = parseInstructions(input);
  const coordinates = solvePart1(instructions);
  assertEquals(coordinates[0], 15);
  assertEquals(coordinates[1], 10);
});

Deno.test("part 2 - given test case", () => {
  const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

  const instructions = parseInstructions(input);
  const coordinates = solvePart2(instructions);
  assertEquals(coordinates[0], 15);
  assertEquals(coordinates[1], 60);
});
