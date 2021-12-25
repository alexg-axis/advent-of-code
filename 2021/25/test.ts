import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import {Input} from "../../utils/deno/input.ts";
import { parseInput, solvePart1} from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `v...>>.vv>
.vv>>.vv..
>>.>v>...v
>>v>>.>.v.
v>v.vv.v..
>.>>..v...
.vv..>.>v.
v.v..>>v.v
....v..v.>`;
  const steps = solvePart1(parseInput(new Input(input)));
  assertEquals(steps, 58);
});
