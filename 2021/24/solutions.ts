import { permutationsWithReplacement } from "https://deno.land/x/combinatorics/mod.ts";

import { Input } from "../../utils/deno/input.ts";

type Instruction = {
  instruction: string,
  operands: string[],
};

type State = {
  x: number,
  y: number,
  z: number,
  w: number,
};

type Variable = keyof State;

type InputFunction = () => number;

export function parseInput(input: Input): Instruction[] {
  // on x=-48..-2,y=-16..31,z=-3..41
  return input.lines.map(x => {
    const parts = x.split(" ");
    return {instruction: parts[0], operands: parts.slice(1)};
  });
}

function run(instructions: Instruction[], input: number[]): State {
  const state: State = {x: 0, y: 0, z: 0, w: 0};

  const value = (operand: string) => {
    if (operand in state)
      return state[operand as Variable];
    return Number(operand);
  }

  for (const {instruction, operands} of instructions) {
    // console.log(instruction, operands);
    switch (instruction) {
      case "inp":
        state[operands[0] as Variable] = input.shift()!;
        break;
      case "add":
        state[operands[0] as Variable] += value(operands[1]);
        break;
      case "div":
        state[operands[0] as Variable] = Math.floor(value(operands[0]) / value(operands[1]));
        break;
      case "mul":
        state[operands[0] as Variable] *= value(operands[1]);
        break;
      case "mod":
        state[operands[0] as Variable] %= value(operands[1]);
        break;
      case "eql":
        state[operands[0] as Variable] = value(operands[0]) === value(operands[1]) ? 1 : 0;
        break;
    }
    // console.log(state);
  }

  return state;
}

function test(input: number[]): number {
  let z = 0;
  for (let i = 0; i < 14; i++)
    z = step(z, input[i], i);

  return z;
}

function step(z: number, w: number, i: number): number {
  const xSum = [10, 13, 12, -12, 11, -13, -9, -12, 14, -9, 15, 11, -16, -2]
  // If the value is 1, division is 0x90 and the condition will be true
  const zDiv = [1, 1, 1, 26, 1, 26, 26, 26, 1, 26, 1, 1, 26, 26];
  const ySum = [5, 9, 4, 4, 10, 14, 14, 12, 14, 14, 5, 10, 8, 15];

  if (zDiv[i] === 1) {
    // This unconditionally adds to z
    // push
    z *= 26;
    z += w + ySum[i];
  } else {
    // We can't afford to grow z here as we're aiming to get 0,
    // input must make sure it's equal to w
    // x basically holds the last digit of z with some offset
    // pop
    const x = z % 26 + xSum[i];
    z = Math.floor(z / 26);
    // conditonally push - must not occur
    // meaning x === w <=> w must undo the push
    if (x !== w) {
      z *= 26;
      z += w + ySum[i];
    }
  }

  /*
  // To undo the push, we must consider the offsets as well
  // + ySum of left + xSum of right
  w0 + 5 - 12 = w7
  w1 + 9 - 9 = w6
  w2 + 4 - 12= w3
  w4 + 10 - 13= w5
  w8 + 14 - 9= w9
  w10 + 5 - 2= w13
  w11 + 10 - 16 = w12
  */
  return z;
}

// Used to pretty print the input
// so that it could be reversed into the test function above
function printAsJavaScript(instructions: Instruction[]) {
  console.log(`let x = 0, y = 0, z = 0, w = 0;`);
  let i = 0;
  for (const { instruction, operands } of instructions) {
    switch (instruction) {
      case "inp":
        console.log(`${operands[0]} = input[${i++}];`);
        break;
      case "add":
        console.log(`${operands[0]} += ${operands[1]};`);
        break;
      case "div":
        if (operands[1] === "1")
          console.log(`${operands[0]} = 1;`)
        else
          console.log(`${operands[0]} = Math.floor(${operands[0]} / ${operands[1]});`);
        break;
      case "mul":
        if (operands[1] === "0")
          console.log(`${operands[0]} = 0;`);
        else
          console.log(`${operands[0]} *= ${operands[1]};`);
        break;
      case "mod":
        console.log(`${operands[0]} %= ${operands[1]};`);
        break;
      case "eql":
        console.log(`${operands[0]} = ${operands[0]} === ${operands[1]} ? 1 : 0;`);
        break;
    }
  }
}

export function solvePart1(): number {
  for (const w of permutationsWithReplacement([9, 8, 7, 6, 5, 4, 3, 2, 1], 7)) {
    /*
    // + ySum of left + xSum of right
    0 w0 + 5 - 12 = w7
    1 w1 + 9 - 9 = w6
    2 w2 + 4 - 12= w3
    3 w4 + 10 - 13= w5
    4 w8 + 14 - 9= w9
    5 w10 + 5 - 2= w13
    6 w11 + 10 - 16 = w12
    */
    const input = [w[0], w[1], w[2], w[2] + 4 - 12, w[3], w[3] + 10 - 13, w[1] + 9 - 9, w[0] + 5 - 12, w[4], w[4] + 14 - 9, w[5], w[6], w[6] + 10 - 16, w[5] + 5 - 2];
    if (input.filter(x => x < 1 || x > 9).length > 0)
      continue;
    if (test(input) === 0)
      return Number(input.join(""));
  }
  return -1;
}

export function solvePart2(): number {
  for (const w of permutationsWithReplacement([1, 2, 3, 4, 5, 6, 7, 8, 9], 7)) {
    // Same as solution 1
    const input = [w[0], w[1], w[2], w[2] + 4 - 12, w[3], w[3] + 10 - 13, w[1] + 9 - 9, w[0] + 5 - 12, w[4], w[4] + 14 - 9, w[5], w[6], w[6] + 10 - 16, w[5] + 5 - 2];
    if (input.filter(x => x < 1 || x > 9).length > 0)
      continue;
    if (test(input) === 0)
      return Number(input.join(""));
  }
  return -1;
}
