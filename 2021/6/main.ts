import input from "../../utils/deno/input.ts";
import { solvePart1 } from "./solutions.ts";

const numbers = input.raw.trim().split(",").map(Number);

console.log(solvePart1(numbers));
