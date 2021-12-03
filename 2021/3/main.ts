import input from "../../utils/deno/input.ts";
import { solvePart1, solvePart2 } from "./solutions.ts";

console.log(solvePart1(input.lines).reduce((product, x) => product * x, 1));
console.log(solvePart2(input.lines).reduce((product, x) => product * x, 1));
