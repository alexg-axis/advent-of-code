import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import { solvePart1, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

  assertEquals(solvePart1(new Input(input)), 405);
});

Deno.test("part 1 - input test case", () => {
  const input = `....#.#..
.######.#
##.......
###.....#
.#.#.#.#.
##.#.#.#.
###.....#
##.......
.######.#
....#.#..
....#.#..`;

  assertEquals(solvePart1(new Input(input)), 1000);
});

Deno.test("part 1 - input test case", () => {
  const input = `
#####.#
......#
.##.#.#
.....##
.##.###
#..#..#
.##....
.####..
####.##
.##.#..
.....#.
#..##..
######.
.....#.
#..#..#
#..#..#
.....#.

`;

  assertEquals(solvePart1(new Input(input)), 1500);
});

Deno.test("part 2 - given test case", () => {
  const input = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

  assertEquals(solvePart2(new Input(input)), 400);
});

Deno.test("part 2 - input test case", () => {
  const input = `....#.#..
.######.#
##.......
###.....#
.#.#.#.#.
##.#.#.#.
###.....#
##.......
.######.#
....#.#..
....#.#..`;

  assertEquals(solvePart2(new Input(input)), 500);
});

Deno.test("part 2 - input test case", () => {
  const input = `
#####.#
......#
.##.#.#
.....##
.##.###
#..#..#
.##....
.####..
####.##
.##.#..
.....#.
#..##..
######.
.....#.
#..#..#
#..#..#
.....#.

`;

  assertEquals(solvePart2(new Input(input)), 2);
});

Deno.test("part 2 - input test case", () => {
  const input = `##.#.#..####.
..##.....#..#
..##.....#..#
##.#.#..####.
.#.######..##
.#.#.#...#.#.
###.#.#####.#
#..##.#.##...
.##.#####.###
#.##.####.#.#
#.##.##.#.#.#
.##.#####.###
#..##.#.##...
###.#.#####.#
.#.#.#...#.#.
.#.######..##
##.#.#..####.
`;

  assertEquals(solvePart2(new Input(input)), 1000);
});
