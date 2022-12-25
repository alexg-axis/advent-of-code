import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Input } from "../../utils/deno/input.ts";
import { solvePart1, toNumber, toSNAFU } from "./solutions.ts";

Deno.test("part 1 - given test case", () => {
  const input = `1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`;
  assertEquals(solvePart1(new Input(input)), "2=-1=0");
});

Deno.test("part 1 - conversion", () => {
  const input = `
1 1
2 2
3 1=
4 1-
5 10
6 11
7 12
8 2=
9 2-
10 20
15 1=0
20 1-0
2022 1=11-2
12345 1-0---0
314159265 1121-1110-1=0
1747 1=-0-2
906 12111
198 2=0=
11 21
201 2=01
31 111
1257 20012
32 112
353 1=-1=
107 1-12
7 12
3 1=
37 122
246573259444 2=0200-1==-=01=--
1353001841 11=-=-=21=0-=1
4890 2=-1=0
7653 22111=
35422591760336 2-121-=10=200==2==21`;
  const numbers = input
    .trim()
    .split("\n")
    .map((x) => {
      const parts = x.trim().split(" ");
      return [Number(parts[0]), parts[1]] as [number, string];
    });
  for (const [decimal, snafu] of numbers) {
    assertEquals(toSNAFU(decimal), snafu, `${decimal} -> ${snafu}`);
    assertEquals(toNumber(snafu), decimal, `${snafu} -> ${decimal}`);
  }
});
