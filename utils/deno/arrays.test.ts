import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { chunks, product, sum } from "./arrays.ts";

Deno.test("chunks", () => {
  assertEquals([[1, 2], [3, 4], [5]], chunks([1, 2, 3, 4, 5], 2));
});

Deno.test("chunks - reduce", () => {
  assertEquals([[1, 2], [3, 4], [5]], [1, 2, 3, 4, 5].reduce(chunks(2), []));
});

Deno.test("sum", () => {
  assertEquals(6, sum([1, 2, 3]));
});

Deno.test("sum - reduce", () => {
  assertEquals(6, [1, 2, 3].reduce(sum, 0));
});

Deno.test("product", () => {
  assertEquals(24, product([1, 2, 3, 4]));
});

Deno.test("product - reduce", () => {
  assertEquals(24, [1, 2, 3, 4].reduce(product, 1));
});
