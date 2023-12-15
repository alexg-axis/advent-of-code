import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import { solvePart1, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `HASH`;

  assertEquals(solvePart1(new Input(input)), 52);
});

Deno.test("part 1 - given test case", () => {
  const input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

  assertEquals(solvePart1(new Input(input)), 1320);
});

Deno.test("part 2 - given test case", () => {
  const input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

  assertEquals(solvePart2(new Input(input)), 145);
});
