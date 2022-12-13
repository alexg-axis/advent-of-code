import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import { solvePart1, compare, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;
  assertEquals(solvePart1(new Input(input)), 13);
});

Deno.test("part 2 - given test case", () => {
  const input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;
  assertEquals(solvePart2(new Input(input)), 140);
});

Deno.test("compare", () => {
  assertEquals(compare([], []), 0);
  assertEquals(compare([1], [1]), 0);
  assertEquals(compare([0], [1]), -1);
  assertEquals(compare([1], [0]), 1);
  assertEquals(compare(0, 0), 0);
  assertEquals(compare(1, 0), 1);
  assertEquals(compare(0, 1), -1);
  assertEquals(compare(0, [1]), -1);
  assertEquals(compare([1], [0]), 1);
  assertEquals(compare([0, 1, 2, 3], [0, 1, 2, 4]), -1);
  assertEquals(compare([0, 1, 2, 4], [0, 1, 2, 3]), 1);
  assertEquals(compare([0, 1, 2, 3], [0, 1, 2, 3]), 0);
  assertEquals(compare([0, [1, 2, 3]], [0, [1, 2, 3]]), 0);
  assertEquals(compare([7, 7, 7, 7], [7, 7, 7]), 1);
  assertEquals(
    compare(
      [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
      [1, [2, [3, [4, [5, 6, 0]]]], 8, 9]
    ),
    1
  );
});
