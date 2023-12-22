import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import { solvePart1 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`;

  assertEquals(solvePart1(new Input(input)), 11687500);
});
