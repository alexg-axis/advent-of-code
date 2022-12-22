import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";
import { parseInput, solve, solvePart1 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`;
  assertEquals(solvePart1(new Input(input)), 6032);
});

Deno.test("part 1 - wrap right", () => {
  const input = `...

4`;
  assertEquals(solve(...parseInput(new Input(input))), {
    x: 1,
    y: 0,
    direction: "right",
  });
});

Deno.test("part 1 - wrap left", () => {
  const input = `...

RR1`;
  assertEquals(solve(...parseInput(new Input(input))), {
    x: 2,
    y: 0,
    direction: "left",
  });
});

Deno.test("part 1 - wrap down", () => {
  const input = `...
...

R2`;
  assertEquals(solve(...parseInput(new Input(input))), {
    x: 0,
    y: 0,
    direction: "down",
  });
});

Deno.test("part 1 - wrap up", () => {
  const input = `...
...

L1`;
  assertEquals(solve(...parseInput(new Input(input))), {
    x: 0,
    y: 1,
    direction: "up",
  });
});

Deno.test("part 1 - wrap up wall", () => {
  const input = `...
#..

L1`;
  assertEquals(solve(...parseInput(new Input(input))), {
    x: 0,
    y: 0,
    direction: "up",
  });
});

Deno.test("part 1 - wrap left wall", () => {
  const input = `..#

RR1`;
  assertEquals(solve(...parseInput(new Input(input))), {
    x: 0,
    y: 0,
    direction: "left",
  });
});

Deno.test("part 1 - wrap empty y", () => {
  const input = `...
...
 ..
 ..

R2`;
  assertEquals(solve(...parseInput(new Input(input))), {
    x: 0,
    y: 0,
    direction: "down",
  });
});

Deno.test("part 1 - wrap empty x", () => {
  const input = `...
...
 ..
 ..

1R2L2`;
  assertEquals(solve(...parseInput(new Input(input))), {
    x: 1,
    y: 2,
    direction: "right",
  });
});

Deno.test("part 1 - large move", () => {
  const input = `.........................#.

50R`;
  assertEquals(solve(...parseInput(new Input(input))), {
    x: 24,
    y: 0,
    direction: "down",
  });
});

Deno.test("part 1 - large move", () => {
  const input = `.........................

50R`;
  assertEquals(solve(...parseInput(new Input(input))), {
    x: 0,
    y: 0,
    direction: "down",
  });
});
