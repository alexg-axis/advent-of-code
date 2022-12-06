import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import { solvePart1 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `bvwbjplbgvbhsrlpgdmjqwftvncz`;
  assertEquals(solvePart1(new Input(input)), 5);
});

Deno.test("part 1 - given test case", () => {
  const input = `nppdvjthqldpwncqszvftbrmjlhg`;
  assertEquals(solvePart1(new Input(input)), 6);
});

Deno.test("part 1 - given test case", () => {
  const input = `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`;
  assertEquals(solvePart1(new Input(input)), 10);
});

Deno.test("part 1 - given test case", () => {
  const input = `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`;
  assertEquals(solvePart1(new Input(input)), 11);
});
