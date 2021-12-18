import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import {Input} from "../../utils/deno/input.ts";
import { parseInput, solvePart1, solvePart2, explode, split, reduce, formatMap, sum, sumReduce, magnitude} from "./solutions.ts";

Deno.test("explode - given test case", () => {
  const input = parseInput(new Input("[[[[[9,8],1],2],3],4]"));
  explode(input[0])
  const result = formatMap(input[0]);
  assertEquals(result, "[[[[0,9],2],3],4]");
});

Deno.test("explode - given test case", () => {
  const input = parseInput(new Input("[7,[6,[5,[4,[3,2]]]]]"));
  explode(input[0])
  const result = formatMap(input[0]);
  assertEquals(result, "[7,[6,[5,[7,0]]]]");
});

Deno.test("explode - given test case", () => {
  const input = parseInput(new Input("[[6,[5,[4,[3,2]]]],1]"));
  explode(input[0])
  const result = formatMap(input[0]);
  assertEquals(result, "[[6,[5,[7,0]]],3]");
});

Deno.test("explode - given test case", () => {
  const input = parseInput(new Input("[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]"));
  explode(input[0])
  const result = formatMap(input[0]);
  assertEquals(result, "[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]");
});

Deno.test("explode - given test case", () => {
  const input = parseInput(new Input("[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]"));
  explode(input[0])
  const result = formatMap(input[0]);
  assertEquals(result, "[[3,[2,[8,0]]],[9,[5,[7,0]]]]");
});

Deno.test("split - constructed test case", () => {
  const input = parseInput(new Input("[10,1]"));
  split(input[0])
  const result = formatMap(input[0]);
  assertEquals(result, "[[5,5],1]");
});

Deno.test("split - constructed test case", () => {
  const input = parseInput(new Input("[11,1]"));
  split(input[0])
  const result = formatMap(input[0]);
  assertEquals(result, "[[5,6],1]");
});

Deno.test("reduce - given test case", () => {
  const input = parseInput(new Input("[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]"));
  reduce(input[0]);
  const result = formatMap(input[0]);
  assertEquals(result, "[[[[0,7],4],[[7,8],[6,0]]],[8,1]]");
});

Deno.test("explode - given test case", () => {
  const input = parseInput(new Input("[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]"));
  explode(input[0]);
  const result = formatMap(input[0]);
  assertEquals(result, "[[[[0,7],4],[7,[[8,4],9]]],[1,1]]");
});

Deno.test("explode - given test case", () => {
  const input = parseInput(new Input("[[[[0,7],4],[7,[[8,4],9]]],[1,1]]"));
  explode(input[0]);
  const result = formatMap(input[0]);
  assertEquals(result, "[[[[0,7],4],[15,[0,13]]],[1,1]]");
});

Deno.test("split - given test case", () => {
  const input = parseInput(new Input("[[[[0,7],4],[15,[0,13]]],[1,1]]"));
  split(input[0]);
  const result = formatMap(input[0]);
  assertEquals(result, "[[[[0,7],4],[[7,8],[0,13]]],[1,1]]");
});

Deno.test("split - given test case", () => {
  const input = parseInput(new Input("[[[[0,7],4],[[7,8],[0,13]]],[1,1]]"));
  split(input[0]);
  const result = formatMap(input[0]);
  assertEquals(result, "[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]");
});

Deno.test("split - given test case", () => {
  const input = parseInput(new Input("[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]"));
  explode(input[0]);
  const result = formatMap(input[0]);
  assertEquals(result, "[[[[0,7],4],[[7,8],[6,0]]],[8,1]]");
});

Deno.test("sum - given test case", () => {
  const input = parseInput(new Input(`[1,1]
[2,2]`));
  const result = formatMap(sum(input[0], input[1]));
  assertEquals(result, "[[1,1],[2,2]]");
});

Deno.test("sum reduce - given test case", () => {
  const input = parseInput(new Input(`[[[[4,3],4],4],[7,[[8,4],9]]]
[1,1]`));
  const result = formatMap(sumReduce(input));
  assertEquals(result, "[[[[0,7],4],[[7,8],[6,0]]],[8,1]]");
});

Deno.test("sum reduce - given test case", () => {
  const input = parseInput(new Input(`[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]`));
  const result = formatMap(sumReduce(input));
  assertEquals(result, "[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]");
});

Deno.test("sum reduce - given test case", () => {
  const input = parseInput(new Input(`[[[[7,7],[7,7]],[[8,7],[8,7]]],[[[7,0],[7,7]],9]]
[[[[4,2],2],6],[8,7]]`));
  const result = formatMap(sumReduce(input));
  assertEquals(result, "[[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]");
});

Deno.test("magnitude - given test case", () => {
  const input = parseInput(new Input(`[[1,2],[[3,4],5]]`));
  const result = magnitude(JSON.parse(formatMap(input[0])));
  assertEquals(result, 143);
});

Deno.test("magnitude - given test case", () => {
  const input = parseInput(new Input(`[[[[0,7],4],[[7,8],[6,0]]],[8,1]]`));
  const result = magnitude(JSON.parse(formatMap(input[0])));
  assertEquals(result, 1384);
});


Deno.test("sum reduce - given test case", () => {
  const input = parseInput(new Input(`[[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]
[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]`));
  const result = formatMap(sumReduce(input));
  assertEquals(result, "[[[[6,7],[6,7]],[[7,7],[0,7]]],[[[8,7],[7,7]],[[8,8],[8,0]]]]");
});

Deno.test("part 1 - given test case", () => {
  const input = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;

  const magnitude = solvePart1(parseInput(new Input(input)));
  assertEquals(magnitude, 4140);
});

Deno.test("part 2 - given test case", () => {
  const input = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;

  const magnitude = solvePart2(parseInput(new Input(input)));
  assertEquals(magnitude, 3993);
});
