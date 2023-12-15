import { Input } from "../../utils/deno/input.ts";

function hash(x: string): number {
  let currentValue = 0;
  for (let i = 0; i < x.length; i++) {
    currentValue += x.charCodeAt(i);
    currentValue *= 17;
    currentValue %= 256;
  }
  return currentValue;
}

export function solvePart1(input: Input): number {
  return input.raw
    .replaceAll("\n", "")
    .split(",")
    .map(hash)
    .reduce((sum, x) => sum + x);
}

type Instruction =
  | {
      label: string;
      operation: "-";
    }
  | { label: string; operation: "="; value: number };

function parseInstruction(instruction: string): Instruction {
  const [_, label, operation, value] = instruction.match(/(\w+)([=-])(\d+)?/)!;
  if (operation === "-") {
    return { label, operation };
  } else if (operation === "=") {
    return { label, operation, value: Number(value) };
  } else {
    throw new Error("unreachable");
  }
}

export function solvePart2(input: Input): number {
  const boxes: Record<string, number>[] = new Array(256)
    .fill(null)
    .map(() => ({}));

  const instructions = input.raw
    .replaceAll("\n", "")
    .split(",")
    .map(parseInstruction);

  for (const instruction of instructions) {
    // console.log(instruction);
    const index = hash(instruction.label);
    if (instruction.operation === "=") {
      // Maps in JS have keys ordered by insertion, no need to keep track of internal order
      boxes[index][instruction.label] = instruction.value;
    } else {
      delete boxes[index][instruction.label];
    }
    // console.log(
    //   boxes
    //     .map((x) =>
    //       Object.values(x).length === 0
    //         ? "{}"
    //         : JSON.stringify(Object.entries(x))
    //     )
    //     .join("\n")
    // );
  }

  // console.log(
  //   boxes
  //     .map((x) =>
  //       Object.values(x).length === 0 ? "{}" : JSON.stringify(Object.entries(x))
  //     )
  //     .join("\n")
  // );

  // - One plus the box number of the lens in question.
  // - The slot number of the lens within the box: `1` for the first lens, `2` for the second lens, and so on.
  // - The focal length of the lens.
  let sum = 0;
  for (let i = 0; i < boxes.length; i++) {
    const values = Object.values(boxes[i]);
    for (let j = 0; j < values.length; j++) {
      sum += (1 + i) * (j + 1) * values[j];
    }
  }

  return sum;
}
