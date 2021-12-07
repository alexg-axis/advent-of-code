import input from "../../utils/deno/input.ts";
import { solvePart1 } from "./solutions.ts";

console.log(solvePart1(input.raw.trim().split(",").map(Number)));
