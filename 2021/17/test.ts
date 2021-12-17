import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import {Input} from "../../utils/deno/input.ts";
import { parseInput, solvePart1 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `8A004A801A8002F478`;

  const versionSum = solvePart1(new Input(input));
  assertEquals(versionSum, 16);
});

Deno.test("part 1 - given test case", () => {
  const input = `target area: x=20..30, y=-10..-5`;

  const height = solvePart1(parseInput(new Input(input)));
  assertEquals(height, 12);
});
