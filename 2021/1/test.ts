import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { solve } from "./solutions.ts";

Deno.test("given test case", () => {
  const input = `199
200
208
210
200
207
240
269
260
263`;

  const numbers = input.split("\n").map(x => Number(x));
  const increases = solve(numbers);
  assertEquals(increases, 7);
});
