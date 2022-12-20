import { permutations } from "https://deno.land/x/combinatorics/mod.ts";
import { sum } from "../../utils/deno/arrays.ts";
import { Input } from "../../utils/deno/input.ts";

type Graph = Record<string, { flowRate: number; next: string[] }>;

// Valve AA has flow rate=0; tunnels lead to valves DD, II, BB
function parseInput(input: Input): Graph {
  return input.raw
    .trim()
    .split("\n")
    .reduce((result, x) => {
      const [_, name, flowRate, next] = x.match(
        /Valve ([A-Z]+) has flow rate=([0-9]+); tunnels? leads? to valves? ([A-Z]+(, [A-Z]+)*)/
      )!;

      return {
        ...result,
        [name]: { flowRate: Number(flowRate), next: next.split(", ") },
      };
    }, {});
}

const cache: Record<string, number> = {};

function bfs(graph: Graph, from: string, to: string): number {
  const key = `${from}:${to}`;
  if (Object.hasOwn(cache, key)) {
    return cache[key];
  }

  const toVisit: { node: string; steps: number }[] = [];
  toVisit.push({ node: from, steps: 0 });

  const visited: string[] = [];
  visited.push(from);

  while (toVisit.length > 0) {
    const current = toVisit.shift()!;

    if (current.node === to) {
      cache[key] = current.steps;
      return current.steps;
    }

    for (const next of graph[current.node].next) {
      if (!visited.includes(next)) {
        visited.push(next);
        toVisit.push({
          node: next,
          steps: current.steps + 1,
        });
      }
    }
  }

  return -1;
}

function evaluate(graph: Graph, path: string[], iterations = 30): number {
  // Keep track of when we opened a certain valve
  const open: Record<string, number> = {};
  for (let n = 0; n < iterations; n++) {
    for (let i = 1; i < path.length; i++) {
      const from = path[i - 1];
      const to = path[i];

      const steps = bfs(graph, from, to);
      n += steps;
      // Open valve if possible
      if (n < iterations) {
        n++;
        open[to] = n;
      }
    }
  }

  // Calculate the released pressure
  return Object.entries(open)
    .map(
      ([valve, iteration]) => (iterations - iteration) * graph[valve].flowRate
    )
    .reduce(sum);
}

export function solvePart1(input: Input): number {
  const graph = parseInput(input);

  let maxFlow = 0;
  for (const steps of permutations(
    Object.keys(graph).filter((x) => x !== "AA")
  )) {
    const path = ["AA", ...steps];
    const flow = evaluate(graph, path);
    maxFlow = Math.max(maxFlow, flow);
  }

  return maxFlow;
}
