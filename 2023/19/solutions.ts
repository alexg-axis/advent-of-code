import { Input } from "../../utils/deno/input.ts";

// Default accept
type Check =
  | { type: "reject" }
  | { type: "accept" }
  | { type: "goto"; branch: string }
  | {
      type: "compare";
      left: "x" | "m" | "a" | "s";
      right: number;
      operator: "<" | ">";
      positiveBranch: string;
    };

interface Rating {
  x: number;
  m: number;
  a: number;
  s: number;
}

function parseInput(input: Input): {
  workflows: Record<string, Check[]>;
  ratings: Rating[];
} {
  const [workflows, ratings] = input.raw.trim().split(/\n\n/);
  return {
    workflows: Object.fromEntries(workflows.split("\n").map(parseWorkflow)),
    ratings: ratings.split("\n").map(parseRating),
  };
}

// vdm{m<3285:R,R}
function parseWorkflow(workflow: string): [string, Check[]] {
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

function parseCheck(check: string): Check {
  if (check === "R") {
    return { type: "reject" };
  } else if (check === "A") {
    return { type: "accept" };
  } else {
    const match = check.match(/(\w+)([<>])(\d+):(.*)/)!;
    if (match) {
      const [_, left, operator, right, positiveBranch] = match;
      return {
        type: "compare",
        left: left as "x" | "m" | "a" | "s",
        right: Number(right),
        operator: operator as "<" | ">",
        positiveBranch,
      };
    } else {
      return { type: "goto", branch: check };
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
  workflows: Record<string, Check[]>
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
      switch (check.type) {
        case "accept":
          return true;
        case "reject":
          return false;
        case "goto":
          current = check.branch;
          break checkLoop;
        case "compare":
          switch (check.operator) {
            case "<":
              if (ratings[check.left] < check.right) {
                current = check.positiveBranch;
                break checkLoop;
              }
              break;
            case ">":
              if (ratings[check.left] > check.right) {
                current = check.positiveBranch;
                break checkLoop;
              }
              break;
          }
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

interface Edge {
  condition:
    | { type: "<"; left: "x" | "m" | "a" | "s"; right: number }
    | { type: ">"; left: "x" | "m" | "a" | "s"; right: number }
    | { type: "unconditional" };
  to: string;
}

export function solvePart2(input: Input): number {
  const { workflows } = parseInput(input);

  // Build a reverse graph, starting from A and R
  const graph: Record<string, Edge[]> = Object.fromEntries(
    Object.keys(workflows).map((x) => [x, []])
  );
  graph["A"] = [];
  graph["R"] = [];

  for (const [from, checks] of Object.entries(workflows)) {
    for (const check of checks) {
      switch (check.type) {
        case "accept":
          graph[from].push({
            condition: { type: "unconditional" },
            to: "A",
          });
          break;
        case "reject":
          graph[from].push({
            condition: { type: "unconditional" },
            to: "R",
          });
          break;
        case "goto":
          graph[from].push({
            condition: { type: "unconditional" },
            to: check.branch,
          });
          break;
        case "compare":
          graph[from].push({
            condition: {
              type: check.operator,
              left: check.left,
              right: check.right,
            },
            to: check.positiveBranch,
          });
          break;
      }
    }
  }

  // Find all the paths from "in" to "A"
  const paths: Edge[][] = [];
  const visited: string[] = [];

  const util = (current: Edge, path: Edge[]) => {
    visited.push(current.to);
    path.push(current);
    if (current.to === "A") {
      paths.push([...path]);
    } else {
      for (const neighbour of graph[current.to]) {
        if (!visited.includes(neighbour.to)) {
          util(neighbour, [...path]);
        }
      }
    }

    path.pop();
    visited.splice(visited.indexOf(current.to), 1);
  };
  for (const edge of graph["in"]) {
    util(edge, []);
  }

  // For each possible path, calculate possible combinations
  for (const path of paths) {
    const min: Record<"x" | "m" | "a" | "s", number> = {
      x: 1,
      m: 1,
      a: 1,
      s: 1,
    };
    const max: Record<"x" | "m" | "a" | "s", number> = {
      x: 4000,
      m: 4000,
      a: 4000,
      s: 4000,
    };
    for (const edge of path) {
      switch (edge.condition.type) {
        case "unconditional":
          continue;
        case "<":
          max[edge.condition.left] = Math.min(
            max[edge.condition.left],
            edge.condition.right
          );
          break;
        case ">":
          min[edge.condition.left] = Math.max(
            min[edge.condition.left],
            edge.condition.right
          );
          break;
      }
    }
    console.log(min, max);
  }

  return -1;
}
