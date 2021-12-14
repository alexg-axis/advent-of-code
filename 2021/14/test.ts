import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import {Input} from "../../utils/deno/input.ts";
import { parseInput, solvePart1 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`;

  const paths = solvePart1(parseInput(new Input(input)));
  assertEquals(paths, 1588);
});
