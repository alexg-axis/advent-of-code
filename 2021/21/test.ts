import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import {Input} from "../../utils/deno/input.ts";
import { parseInput, solvePart1, solvePart2} from "./solutions.ts";

Deno.test("part 1 - constructed test case", () => {
  const input = `Player 1 starting position: 4
Player 2 starting position: 8`;
  const product = solvePart1(parseInput(new Input(input)));
  assertEquals(product, 739785);
});

Deno.test("part 2 - constructed test case", () => {
  const input = `Player 1 starting position: 4
Player 2 starting position: 8`;
  const wins = solvePart2(parseInput(new Input(input)));
  assertEquals(wins, 444356092776315);
});
