import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";
import {
  parseInput,
  rotate,
  solve,
  solveCube,
  solvePart1,
  solvePart2,
} from "./solutions.ts";
import input from "../../utils/deno/input.ts";

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

Deno.test("part 2 - given test case", () => {
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
  assertEquals(solvePart2(new Input(input)), 5031);
});

Deno.test("part 1 - wrap right", () => {
  const input = `...

4`;
  assertEquals(solve(...parseInput(new Input(input))), {
    x: 1,
    y: 0,
    direction: 0,
  });
});

Deno.test("part 1 - wrap left", () => {
  const input = `...

RR1`;
  assertEquals(solve(...parseInput(new Input(input))), {
    x: 2,
    y: 0,
    direction: 2,
  });
});

Deno.test("part 1 - wrap down", () => {
  const input = `...
...
  .

R2`;
  assertEquals(solve(...parseInput(new Input(input))), {
    x: 0,
    y: 0,
    direction: 1,
  });
});

Deno.test("part 1 - wrap up", () => {
  const input = [" ..", " . ", ".. ", ".  ", "", "2"].join("\n");

  assertEquals(
    solve(...parseInput(new Input(input)), {
      x: 1,
      y: 1,
      direction: 3,
    }),
    {
      x: 1,
      y: 2,
      direction: 3,
    }
  );
});

Deno.test("part 1 - wrap up wall", () => {
  const input = `...
#..

L1`;
  assertEquals(solve(...parseInput(new Input(input))), {
    x: 0,
    y: 0,
    direction: 3,
  });
});

Deno.test("part 1 - wrap left wall", () => {
  const input = `..#

RR1`;
  assertEquals(solve(...parseInput(new Input(input))), {
    x: 0,
    y: 0,
    direction: 2,
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
    direction: 1,
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
    direction: 0,
  });
});

Deno.test("part 1 - large move", () => {
  const input = `.........................#.

50R`;
  assertEquals(solve(...parseInput(new Input(input))), {
    x: 24,
    y: 0,
    direction: 1,
  });
});

Deno.test("part 1 - large move", () => {
  const input = `.........................

50R`;
  assertEquals(solve(...parseInput(new Input(input))), {
    x: 0,
    y: 0,
    direction: 1,
  });
});

Deno.test("part 1 - large move", () => {
  const input = `   ...............#.........${"   "}

50`;
  assertEquals(
    solve(...parseInput(new Input(input)), {
      x: 16,
      y: 0,
      direction: 2,
    }),
    {
      x: 19,
      y: 0,
      direction: 2,
    }
  );
});

Deno.test("part 1 - rotate clockwise", () => {
  assertEquals(rotate(0, 1), 1);
  assertEquals(rotate(1, 1), 2);
  assertEquals(rotate(2, 1), 3);
  assertEquals(rotate(3, 1), 0);
});

Deno.test("part 1 - rotate counter clockwise", () => {
  assertEquals(rotate(0, -1), 3);
  assertEquals(rotate(3, -1), 2);
  assertEquals(rotate(2, -1), 1);
  assertEquals(rotate(1, -1), 0);
});

Deno.test("part 1", () => {
  const [map] = parseInput(input);
  assertEquals(
    solve(map, [{ type: "move", value: 21 }], {
      x: 52,
      y: 3,
      direction: 3,
    }),
    { x: 52, y: 132, direction: 3 }
  );
});

Deno.test("part 2 - given test case", () => {
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

1`;
  assertEquals(
    solveCube(...parseInput(new Input(input)), {
      x: 11,
      y: 5,
      direction: 0,
    }),
    { x: 14, y: 8, direction: 3 }
  );
});

Deno.test("part 2 - given test case", () => {
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

1`;
  assertEquals(
    solveCube(...parseInput(new Input(input)), {
      x: 10,
      y: 11,
      direction: 1,
    }),
    { x: 1, y: 7, direction: 3 }
  );
});
