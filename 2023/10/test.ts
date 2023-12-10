import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import { solvePart1, solvePart2 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `.....
.S-7.
.|.|.
.L-J.
.....`;

  assertEquals(solvePart1(new Input(input)), 4);
});

Deno.test("part 1 - given test case", () => {
  const input = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;

  assertEquals(solvePart1(new Input(input)), 4);
});

Deno.test("part 1 - given test case", () => {
  const input = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

  assertEquals(solvePart1(new Input(input)), 8);
});

Deno.test("part 1 - given test case", () => {
  const input = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`;

  assertEquals(solvePart1(new Input(input)), 8);
});

Deno.test("part 2 - given test case", () => {
  const input = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`;

  assertEquals(solvePart2(new Input(input)), 4);
});

Deno.test("part 2 - given test case", () => {
  const input = `..........
.S------7.
.|F----7|.
.||....||.
.||....||.
.|L-7F-J|.
.|..||..|.
.L--JL--J.
..........`;

  assertEquals(solvePart2(new Input(input)), 4);
});

Deno.test("part 2 - given test case", () => {
  const input = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`;

  assertEquals(solvePart2(new Input(input)), 10);
});

Deno.test("part 2 - given test case", () => {
  const input = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;

  assertEquals(solvePart2(new Input(input)), 10);
});
