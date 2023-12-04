import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import { solvePart1, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

  assertEquals(solvePart1(new Input(input)), 13);
});

Deno.test("part 1", () => {
  const input = `Card 178: 39 29 85 95 63 87 52 16 33 90 | 88 76  1 12 81 38 72 77 19 46 11  2 44 85 71 24 57 25 28 69 97 37 98 94 50`;

  assertEquals(solvePart1(new Input(input)), 1);
});

Deno.test("part 1", () => {
  const input = `Card 205: 54 17 93 26 35  9 61 49 81 42 | 94 14 76 52 15 18 38 41 69 28 16 31 73 32 47 37 71 23 82 90 33 75 24 85 11`;

  assertEquals(solvePart1(new Input(input)), 0);
});

Deno.test("part 1", () => {
  const input = `Card 107:  1 12 46 25 11 87 80 82 57 65 |  1 12 17 30 11 95 80 19 22 69 46 82 65 29 34 44 62 57 51 87 25 45  3 23 56`;

  assertEquals(solvePart1(new Input(input)), 512);
});

Deno.test("part 2 - given test case", () => {
  const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

  assertEquals(solvePart2(new Input(input)), 30);
});
