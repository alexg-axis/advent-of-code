import input from "../../utils/deno/input.ts";
import { parseInput, solvePart1 } from "./solutions.ts";

const [order, boards] = parseInput(input);

const [sum, called] = solvePart1(order, boards);
console.log(sum * called);
