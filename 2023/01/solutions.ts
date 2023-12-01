import { Input } from "../../utils/deno/input.ts";

export function solvePart1(input: Input): number {
  return input.lines
    .map((x) => x.replace(/[^0-9]/g, ""))
    .map((x) => Number(x[0] + x.slice(-1)))
    .reduce((sum, x) => sum + x, 0);
}

const digits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "sever",
  "eight",
  "nine",
];

export function solvePart2(input: Input): number {
  const modified = input.lines
    .map((line) => {
      // Replace written digits left to right
      const leftMatch = line.match(new RegExp(digits.join("|")));
      const leftLine = leftMatch
        ? line.replace(
            leftMatch[0],
            (digits.indexOf(leftMatch[0]) + 1).toString()
          )
        : line;

      // Replace written digits right to left
      let rightLine = line;
      for (let i = rightLine.length - 1; i >= 0; i--) {
        rightLine =
          rightLine.slice(0, i) +
          rightLine
            .slice(i)
            .replace(/^one/, "1")
            .replace(/^two/, "2")
            .replace(/^three/, "3")
            .replace(/^four/, "4")
            .replace(/^five/, "5")
            .replace(/^six/, "6")
            .replace(/^seven/, "7")
            .replace(/^eight/, "8")
            .replace(/^nine/, "9");
      }
      const leftMost = leftLine.replace(/[^0-9]/g, "")[0];
      const rightMost = rightLine.replace(/[^0-9]/g, "").slice(-1);
      return leftMost + rightMost;
    })
    .join("\n");
  return solvePart1(new Input(modified));
}
