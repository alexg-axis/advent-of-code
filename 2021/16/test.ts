import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import {Input} from "../../utils/deno/input.ts";
import { solvePart1 } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `8A004A801A8002F478`;

  const versionSum = solvePart1(new Input(input));
  assertEquals(versionSum, 16);
});

Deno.test("part 1 - given test case", () => {
  const input = `620080001611562C8802118E34`;

  const versionSum = solvePart1(new Input(input));
  assertEquals(versionSum, 12);
});

Deno.test("part 1 - given test case", () => {
  const input = `C0015000016115A2E0802F182340`;

  const versionSum = solvePart1(new Input(input));
  assertEquals(versionSum, 23);
});

Deno.test("part 1 - given test case", () => {
  const input = `A0016C880162017C3686B18A3D4780`;

  const versionSum = solvePart1(new Input(input));
  assertEquals(versionSum, 31);
});
