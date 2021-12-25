import input from "../../utils/deno/input.ts";
import { parseInput, solvePart1, solvePart2 } from "./solutions.ts";

const lines = parseInput(input);

console.log(solvePart1(lines));
console.log(solvePart2(lines));
