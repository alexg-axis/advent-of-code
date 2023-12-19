import { Input } from "../../utils/deno/input.ts";

interface Edge {
  condition:
    | { type: "<"; left: "x" | "m" | "a" | "s"; right: number }
    | { type: ">"; left: "x" | "m" | "a" | "s"; right: number }
    | { type: "unconditional" };
  to: string;
}

interface Rating {
  x: number;
  m: number;
  a: number;
  s: number;
}

function parseInput(input: Input): {
  workflows: Record<string, Edge[]>;
  ratings: Rating[];
} {
  const [workflows, ratings] = input.raw.trim().split(/\n\n/);
  return {
    workflows: Object.fromEntries(workflows.split("\n").map(parseWorkflow)),
    ratings: ratings.split("\n").map(parseRating),
  };
}

// vdm{m<3285:R,R}
function parseWorkflow(workflow: string): [string, Edge[]] {
  const [name, part] = workflow.split("{");
  return [name, part.slice(0, -1).split(",").map(parseCheck)];
}

// {x=656,m=803,a=13,s=1540}
function parseRating(rating: string): Rating {
  return Object.fromEntries(
    rating
      .slice(1, -1)
      .split(",")
      .map((x) => [x.split("=")[0], Number(x.split("=")[1])])
  ) as unknown as Rating;
}

function parseCheck(check: string): Edge {
  if (check === "R") {
    return { condition: { type: "unconditional" }, to: "R" };
  } else if (check === "A") {
    return { condition: { type: "unconditional" }, to: "A" };
  } else {
    const match = check.match(/(\w+)([<>])(\d+):(.*)/)!;
    if (match) {
      const [_, left, operator, right, positiveBranch] = match;
      return {
        condition: {
          type: operator as "<" | ">",
          left: left as "x" | "m" | "a" | "s",
          right: Number(right),
        },
        to: positiveBranch,
      };
    } else {
      return { condition: { type: "unconditional" }, to: check };
    }
  }
}

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

function isAccepted(
  ratings: Rating,
  workflows: Record<string, Edge[]>
): boolean {
  let current = "in";
  for (let i = 0; i < 1e3; i++) {
    if (current === "A") {
      return true;
    } else if (current === "R") {
      return false;
    }
    if (!workflows[current]) {
      throw new Error("unreachable");
    }

    const checks = workflows[current];
    checkLoop: for (const check of checks) {
      switch (check.condition.type) {
        case "unconditional":
          current = check.to;
          break checkLoop;
        case "<":
          if (ratings[check.condition.left] < check.condition.right) {
            current = check.to;
            break checkLoop;
          }
          break;
        case ">":
          if (ratings[check.condition.left] > check.condition.right) {
            current = check.to;
            break checkLoop;
          }
          break;
      }
    }
  }

  throw new Error("unreachable");
}

export function solvePart1(input: Input): number {
  const { workflows, ratings } = parseInput(input);

  const accepted = ratings.filter((x) => isAccepted(x, workflows));

  return accepted.reduce((sum, x) => sum + x.x + x.m + x.a + x.s, 0);
}

export function solvePart2(input: Input): number {
  const { workflows } = parseInput(input);

  // Work through all workflows, splitting ranges at conditional
  let sum = 0;
  const queue: [string, Record<"x" | "m" | "a" | "s", [number, number]>][] = [
    ["in", { x: [1, 4000], m: [1, 4000], a: [1, 4000], s: [1, 4000] }],
  ];
  while (queue.length > 0) {
    const [current, ratings] = queue.shift()!;
    if (current === "R") {
      continue;
    } else if (current === "A") {
      sum += Object.values(ratings)
        .map(([a, b]) => b - a + 1)
        .reduce((prod, x) => prod * x, 1);
      continue;
    }

    for (const edge of workflows[current]) {
      const newRatings: Record<"x" | "m" | "a" | "s", [number, number]> = {
        x: [...ratings.x],
        m: [...ratings.m],
        a: [...ratings.a],
        s: [...ratings.s],
      };
      if (edge.condition.type === "unconditional") {
        queue.push([edge.to, newRatings]);
        continue;
      }

      if (edge.condition.type === "<") {
        // Split - positive branch's highest is highest value that fulfills
        // condition, thenegative branch's lowest is the lowest value that
        // doesn't fulfill the condition
        newRatings[edge.condition.left][1] = edge.condition.right - 1;
        ratings[edge.condition.left][0] = edge.condition.right;
      } else if (edge.condition.type === ">") {
        // Like above, but reversed
        newRatings[edge.condition.left][0] = edge.condition.right + 1;
        ratings[edge.condition.left][1] = edge.condition.right;
      }
      queue.push([edge.to, newRatings]);
    }
  }

  return sum;
}
