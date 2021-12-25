import input from "../../utils/deno/input.ts";
import { parseInput, solvePart1, solvePart2 } from "./solutions.ts";

const [order, boards] = parseInput(input);

console.log(solvePart1(order, boards).reduce((product, x) => product * x));
console.log(solvePart2(order, boards).reduce((product, x) => product * x));
