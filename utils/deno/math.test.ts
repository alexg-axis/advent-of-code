import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { mod } from "./math.ts";

Deno.test("mod", () => {
  assertEquals(mod(1, 2), 1);
  assertEquals(mod(50, 25), 0);
  assertEquals(mod(-1, 10), 9);
  assertEquals(mod(-5, 10), 5);
  assertEquals(mod(-50, 10), 0);
  assertEquals(mod(-49, 10), 1);
  assertEquals(mod(5, 10), 5);
});
