import input from "../../utils/deno/input.ts";
import { parseInstructions, solvePart1, solvePart2 } from "./solutions.ts";

console.log(solvePart1(parseInstructions(input.raw)).reduce((product, x) => product * x, 1));
console.log(solvePart2(parseInstructions(input.raw)).reduce((product, x) => product * x, 1));
