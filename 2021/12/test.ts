import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import {Input} from "../../utils/deno/input.ts";
import { parseInput, solvePart1, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `start-A
start-b
A-c
A-b
b-d
A-end
b-end
`;

  const paths = solvePart1(parseInput(new Input(input)));
  assertEquals(paths, 10);
});

Deno.test("part 1 - given test case", () => {
  const input = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`;

  const paths = solvePart1(parseInput(new Input(input)));
  assertEquals(paths, 19);
});

Deno.test("part 1 - given test case", () => {
  const input = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
`;

  const paths = solvePart1(parseInput(new Input(input)));
  assertEquals(paths, 226);
});

Deno.test("part 2 - given test case", () => {
  const input = `start-A
start-b
A-c
A-b
b-d
A-end
b-end
`;

  const paths = solvePart2(parseInput(new Input(input)));
  assertEquals(paths, 36);
});

Deno.test("part 1 - given test case", () => {
  const input = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc
`;

  const paths = solvePart2(parseInput(new Input(input)));
  assertEquals(paths, 103);
});

Deno.test("part 1 - given test case", () => {
  const input = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW
`;

  const paths = solvePart2(parseInput(new Input(input)));
  assertEquals(paths, 3509);
});
