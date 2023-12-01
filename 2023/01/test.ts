import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import { solvePart1 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

  assertEquals(solvePart1(new Input(input)), 142);
});
