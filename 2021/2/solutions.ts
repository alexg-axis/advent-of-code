export type Instruction = [string, number];
export type Coordinate = [number, number];

export function solvePart1(instructions: Instruction[]): Coordinate {
  const coordinate = [0, 0] as Coordinate;

  for (const [instruction, amount] of instructions) {
    switch (instruction) {
      case "down":
        coordinate[1] += amount;
        break;
      case "forward":
        coordinate[0] += amount;
        break;
      case "backward":
        coordinate[0] -= amount;
        break;
      case "up":
        coordinate[1] -= amount;
        break;
    }
  }

  return coordinate;
}

export function parseInstructions(input: string): Instruction[] {
  return input.split("\n").map(x => {
    const parts = x.split(" ");
    return [parts[0], Number(parts[1])];
   }) as Instruction[];
}
