import { Input } from "../../utils/deno/input.ts";

function solve(
  instructions: { direction: "R" | "D" | "L" | "U"; steps: number }[]
): number {
  const coordinate = [0, 0];
  const vertices: [number, number][] = [];

  // total boundary area
  let boundary = 0;
  for (const { direction, steps } of instructions) {
    const step = [0, 0];
    switch (direction) {
      case "U":
        step[1] = -1;
        break;
      case "D":
        step[1] = 1;
        break;
      case "L":
        step[0] = -1;
        break;
      case "R":
        step[0] = 1;
        break;
    }

    coordinate[0] += step[0] * steps;
    coordinate[1] += step[1] * steps;
    vertices.push([...coordinate] as [number, number]);
    boundary += steps;
  }

  // shoelace formula for area of interior points of polygon
  vertices.push(vertices[0]);
  let area = 0;
  for (let i = 0; i < vertices.length - 1; i++) {
    const [x1, y1] = vertices[i];
    const [x2, y2] = vertices[i + 1];
    area += (x2 + x1) * (y2 - y1);
  }
  const interior = Math.abs(area) / 2;

  // Pick's theorem
  return interior - boundary / 2 - 1 + boundary + 2;
}

export function solvePart1(input: Input): number {
  const instructions = input.lines.map((x) => {
    const [direction, steps, color] = x.split(/ +/);
    return {
      direction: direction as "R" | "D" | "L" | "U",
      steps: Number(steps),
      color: color.replace(/\(|\)/g, ""),
    };
  });

  return solve(instructions);
}

export function solvePart2(input: Input): number {
  const instructions = input.lines.map((x) => {
    const [_direction, _steps, color] = x.split(/ +/);
    const instruction = parseInt(color.substring(2, 8), 16);
    const steps = instruction >> 4;
    const direction = ["R", "D", "L", "U"][instruction & 0xf];
    return {
      direction: direction as "R" | "D" | "L" | "U",
      steps: steps,
    };
  });

  return solve(instructions);
}
