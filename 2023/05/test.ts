import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";

import {
  mapLocationToSeed,
  parseAlmanac,
  solvePart1,
  solvePart2,
} from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

  assertEquals(solvePart1(new Input(input)), 35);
});

Deno.test("part 2 - given test case", () => {
  const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

  assertEquals(solvePart2(new Input(input)), 46);
});

Deno.test("part 2 - map", () => {
  const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

  const almanac = parseAlmanac(new Input(input));
  assertEquals(mapLocationToSeed(almanac, 35), 13);
  assertEquals(mapLocationToSeed(almanac, 46), 82);
});
