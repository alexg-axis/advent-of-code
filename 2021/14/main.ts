import input from "../../utils/deno/input.ts";
import { parseInput, solvePart1, solvePart2 } from "./solutions.ts";

// Due to bug in Deno, console.log(solvePart1(parseInput(input))), wouldn't work
const x = parseInput(input);
console.log(solvePart1(x));
const y = parseInput(input);
console.log(solvePart2(y));
