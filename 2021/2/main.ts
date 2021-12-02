import input from "../../utils/deno/input.ts";
import { parseInstructions, solvePart1 } from "./solutions.ts";

console.log(solvePart1(parseInstructions(input.raw)).reduce((product, x) => product * x, 1));
