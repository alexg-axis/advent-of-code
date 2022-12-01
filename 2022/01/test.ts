import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import { solvePart1, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

  const max = solvePart1(new Input(input));
  assertEquals(max, 24000);
});

Deno.test("part 2 - given test case", () => {
  const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

  const max = solvePart2(new Input(input));
  assertEquals(max, 45000);
});
