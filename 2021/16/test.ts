import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import {Input} from "../../utils/deno/input.ts";
import { solvePart1, solvePart2 } from "./solutions.ts";

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

Deno.test("part 2 - given test case", () => {
  const input = `C200B40A82`;

  const result = solvePart2(new Input(input));
  assertEquals(result, 3);
});

Deno.test("part 2 - given test case", () => {
  const input = `04005AC33890`;

  const result = solvePart2(new Input(input));
  assertEquals(result, 54);
});

Deno.test("part 2 - given test case", () => {
  const input = `880086C3E88112`;

  const result = solvePart2(new Input(input));
  assertEquals(result, 7);
});

Deno.test("part 2 - given test case", () => {
  const input = `CE00C43D881120`;

  const result = solvePart2(new Input(input));
  assertEquals(result, 9);
});

Deno.test("part 2 - given test case", () => {
  const input = `D8005AC2A8F0`;

  const result = solvePart2(new Input(input));
  assertEquals(result, 1);
});

Deno.test("part 2 - given test case", () => {
  const input = `F600BC2D8F`;

  const result = solvePart2(new Input(input));
  assertEquals(result, 0);
});

Deno.test("part 2 - given test case", () => {
  const input = `9C005AC2F8F0`;

  const result = solvePart2(new Input(input));
  assertEquals(result, 0);
});

Deno.test("part 2 - given test case", () => {
  const input = `9C0141080250320F1802104A08`;

  const result = solvePart2(new Input(input));
  assertEquals(result, 1);
});
