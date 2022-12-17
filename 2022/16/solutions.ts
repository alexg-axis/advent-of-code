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

function minimax(
  graph: Graph,
  open: string[],
  node: string,
  depth: number,
  isMaximizing: boolean,
  alpha: number,
  beta: number
): number {
  if (isMaximizing) {
    let best = Number.MIN_SAFE_INTEGER;
    for (const next of graph[node].next) {
      const value = minimax(graph, open, next, depth + 1, false, alpha, beta);
      best = Math.max(best, value);
      alpha = Math.max(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  } else {
    let best = Number.MAX_SAFE_INTEGER;
    for (const next of graph[node].next) {
      const value = minimax(graph, open, next, depth + 1, true, alpha, beta);
      best = Math.min(best, value);
      alpha = Math.min(alpha, best);
      if (beta <= alpha) break;
    }
    return best;
  }
}

// TODO: normalize sources to use this as maximizing instead
function bellmanFord(graph: Graph, source: string): number {
  const distances: Record<string, number> = Object.fromEntries(
    Object.keys(graph).map((x) => [x, Number.MIN_SAFE_INTEGER])
  );
  distances[source] = 0;

  const path: Record<string, string[]> = Object.fromEntries(
    Object.keys(graph).map((x) => [x, []])
  );

  for (const node of Object.keys(graph)) {
    for (const next of graph[node].next) {
      const weight = 2 + graph[node].flowRate;
      // This is the magic - highest cost is evaluated to lowest cost to work
      // with Bellman-Ford
      // Assumes no cycles
      const normalizedWeight = 1 / weight;
      if (distances[node] + weight > distances[next]) {
        distances[next] = distances[node] + weight;
        path[node].push(next);
      }
    }
  }

  for (const node of Object.keys(graph)) {
    for (const next of graph[node].next) {
      const weight = 2 + graph[node].flowRate;
      if (distances[node] + weight > distances[next]) {
        console.log("cycle");
        // throw new Error("cycle");
      }
    }
  }

  console.log(distances, path);
  return -1;
}

export function solvePart1(input: Input): number {
  const graph = parseInput(input);
  console.log(graph);

  return bellmanFord(graph, "AA");
}
