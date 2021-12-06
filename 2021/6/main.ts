import input from "../../utils/deno/input.ts";
import { solvePart1, solvePart2 } from "./solutions.ts";

console.log(solvePart1(input.raw.trim().split(",").map(Number)));
console.log(solvePart2(input.raw.trim().split(",").map(Number)));
