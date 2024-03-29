import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";
import { solvePart1, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`;
  assertEquals(solvePart1(new Input(input)), 152);
});

Deno.test("part 2 - given test case", () => {
  const input = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`;
  assertEquals(solvePart2(new Input(input)), 301);
});
