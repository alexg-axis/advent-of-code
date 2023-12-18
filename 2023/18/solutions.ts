import { Input } from "../../utils/deno/input.ts";
import { createCanvas } from "https://deno.land/x/canvas/mod.ts";
import * as path from "https://deno.land/std@0.188.0/path/mod.ts";

export function solvePart1(input: Input): number {
  const instructions = input.lines.map((x) => {
    const [direction, steps, color] = x.split(/ +/);
    return {
      direction: direction as "U" | "D" | "L" | "R",
      steps: Number(steps),
      color: color.replace(/\(|\)/g, ""),
    };
  });

  const coordinate = [0, 0];
  const visited: Record<string, string> = {};
  visited["0:0"] = "#FFFFFF";

  for (const { direction, steps, color } of instructions) {
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

    for (let i = 0; i < steps; i++) {
      coordinate[0] += step[0];
      coordinate[1] += step[1];
      if (!visited[`${coordinate[0]}:${coordinate[1]}`]) {
        visited[`${coordinate[0]}:${coordinate[1]}`] = color;
      }
    }
  }

  const trench = Object.keys(visited).map(
    (x) => x.split(":").map(Number) as [number, number]
  );
  const minY = trench.toSorted((a, b) => a[1] - b[1])[0][1];
  const maxY = trench.toSorted((a, b) => b[1] - a[1])[0][1];
  const globalMinX = trench.toSorted((a, b) => a[0] - b[0])[0][0];
  const globalMaxX = trench.toSorted((a, b) => b[0] - a[0])[0][0];

  const canvas = createCanvas(globalMaxX - globalMinX + 1, maxY - minY + 1);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#FF0000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let y = minY; y <= maxY; y++) {
    const row = trench
      .filter(([_, y2]) => y2 === y)
      .sort((a, b) => a[0] - b[0]);
    for (const [x, y] of row) {
      console.log(
        x + Math.abs(globalMinX),
        y + Math.abs(minY),
        visited[`${x}:${y}`]
      );
      ctx.fillStyle = visited[`${x}:${y}`];
      ctx.fillRect(x + Math.abs(globalMinX), y + Math.abs(minY), 1, 1);
    }
  }

  Deno.writeFile(
    path.join(path.dirname(path.fromFileUrl(import.meta.url)), "out.png"),
    canvas.toBuffer()
  );

  return -1;
}
