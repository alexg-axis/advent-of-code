import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import { solvePart1, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

  assertEquals(solvePart1(new Input(input)), 142);
});

Deno.test("part 2 - given test case", () => {
  const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

  assertEquals(solvePart2(new Input(input)), 281);
});

Deno.test("part 2", () => {
  const input = `zeroonetwothreefourfivesixseveneightnineten`;
  assertEquals(solvePart2(new Input(input)), 19);
});

Deno.test("part 2", () => {
  const input = `9eighthvxnlvthqjtpsjnleightwokq`;
  assertEquals(solvePart2(new Input(input)), 92);
});
