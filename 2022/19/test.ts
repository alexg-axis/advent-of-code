import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";
import { solvePart1, willBePurchaseable } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`;
  assertEquals(solvePart1(new Input(input)), 33);
});

Deno.test("willBePurchaseable", () => {
  assertEquals(
    willBePurchaseable(
      {
        ore: { ore: 1, clay: 0, obsidian: 0 },
        clay: { ore: 2, clay: 0, obsidian: 0 },
        obsidian: { ore: 1, clay: 1, obsidian: 0 },
        geode: { ore: 1, clay: 1, obsidian: 1 },
      },
      { ore: 1, clay: 0, obsidian: 0, geode: 0 },
      "ore"
    ),
    true
  );

  assertEquals(
    willBePurchaseable(
      {
        ore: { ore: 1, clay: 0, obsidian: 0 },
        clay: { ore: 2, clay: 0, obsidian: 0 },
        obsidian: { ore: 1, clay: 1, obsidian: 0 },
        geode: { ore: 1, clay: 1, obsidian: 1 },
      },
      { ore: 1, clay: 0, obsidian: 0, geode: 0 },
      "clay"
    ),
    true
  );

  assertEquals(
    willBePurchaseable(
      {
        ore: { ore: 1, clay: 0, obsidian: 0 },
        clay: { ore: 2, clay: 0, obsidian: 0 },
        obsidian: { ore: 1, clay: 1, obsidian: 0 },
        geode: { ore: 1, clay: 1, obsidian: 1 },
      },
      { ore: 1, clay: 0, obsidian: 0, geode: 0 },
      "obsidian"
    ),
    false
  );

  assertEquals(
    willBePurchaseable(
      {
        ore: { ore: 1, clay: 0, obsidian: 0 },
        clay: { ore: 2, clay: 0, obsidian: 0 },
        obsidian: { ore: 3, clay: 2, obsidian: 0 },
        geode: { ore: 1, clay: 1, obsidian: 1 },
      },
      { ore: 1, clay: 1, obsidian: 0, geode: 0 },
      "obsidian"
    ),
    true
  );
});
