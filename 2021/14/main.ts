import input from "../../utils/deno/input.ts";
import { parseInput, solvePart1 } from "./solutions.ts";

// Due to bug in Deno, console.log(solvePart1(parseInput(input))), wouldn't work
const x = parseInput(input);
console.log(solvePart1(x));
