import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import { solvePart1, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

  assertEquals(solvePart1(new Input(input)), 21);
});

Deno.test("part 1 - given test case 1", () => {
  const input = `???.### 1,1,3`;

  assertEquals(solvePart1(new Input(input)), 1);
});

Deno.test("part 1 - given test case 2", () => {
  const input = `.??..??...?##. 1,1,3`;

  assertEquals(solvePart1(new Input(input)), 4);
});

Deno.test("part 1 - given test case 3", () => {
  const input = `?#?#?#?#?#?#?#? 1,3,1,6`;

  assertEquals(solvePart1(new Input(input)), 1);
});

Deno.test("part 1 - given test case 4", () => {
  const input = `????.#...#... 4,1,1`;

  assertEquals(solvePart1(new Input(input)), 1);
});

Deno.test("part 1 - given test case 5", () => {
  const input = `????.######..#####. 1,6,5`;

  assertEquals(solvePart1(new Input(input)), 4);
});

Deno.test("part 1 - given test case 6", () => {
  const input = `?###???????? 3,2,1`;

  assertEquals(solvePart1(new Input(input)), 10);
});

Deno.test("part 2 - given test case", () => {
  const input = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

  assertEquals(solvePart2(new Input(input)), 525152);
});

Deno.test("part 2 - given test case 1", () => {
  const input = `???.### 1,1,3`;

  assertEquals(solvePart2(new Input(input)), 1);
});

Deno.test("part 2 - given test case 2", () => {
  const input = `.??..??...?##. 1,1,3`;

  assertEquals(solvePart2(new Input(input)), 16384);
});

Deno.test("part 2 - given test case 3", () => {
  const input = `?#?#?#?#?#?#?#? 1,3,1,6`;

  assertEquals(solvePart2(new Input(input)), 1);
});

Deno.test("part 2 - given test case 4", () => {
  const input = `????.#...#... 4,1,1`;

  assertEquals(solvePart2(new Input(input)), 16);
});

Deno.test("part 2 - given test case 5", () => {
  const input = `????.######..#####. 1,6,5`;

  assertEquals(solvePart2(new Input(input)), 2500);
});

Deno.test("part 2 - given test case 6", () => {
  const input = `?###???????? 3,2,1`;

  assertEquals(solvePart2(new Input(input)), 506250);
});

Deno.test("part 2 - input test case", () => {
  const input = `?#?.??.#?.??? 2,1,1,1`;

  assertEquals(solvePart2(new Input(input)), 2778836); // TODO
});

Deno.test("part 2 - input test case", () => {
  const input = `?????#.?##?????.??? 5,2,1,1,1`;

  assertEquals(solvePart2(new Input(input)), 2778836); // TODO
});
