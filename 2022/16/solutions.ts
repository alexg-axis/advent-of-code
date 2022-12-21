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

interface Dijkstra {
  distances: Record<string, number>;
  previous: Record<string, string | null>;
}

function dijkstra(graph: Graph, from: string): Dijkstra {
  const distances: Record<string, number> = Object.fromEntries(
    Object.entries(graph).map(([k]) => [k, Number.POSITIVE_INFINITY])
  );
  distances[from] = 0;
  const previous: Record<string, string | null> = Object.fromEntries(
    Object.entries(graph).map(([k]) => [k, null])
  );

  const visited: string[] = [];

  const toVisit: string[] = [];
  toVisit.push(from);

  while (toVisit.length > 0) {
    const current = toVisit
      .sort((a, b) => distances[a] - distances[b])
      .shift()!;
    visited.push(current);
    for (const next of graph[current].next) {
      if (visited.includes(next)) {
        continue;
      }
      toVisit.push(next);

      if (distances[current] + 1 < distances[next]) {
        distances[next] = distances[current] + 1;
        previous[next] = current;
      }
    }
  }

  return { distances, previous };
}

function calculateGainAndCost(
  graph: Graph,
  from: string,
  to: string,
  iteration: number,
  iterations: number,
  lookup: Record<string, Dijkstra>
): [number, number] {
  // The iterations it will take until the valve is open
  const cost = lookup[from].distances[to] + 1; // +1 to open
  // The pressure that will be released for the remaining iterations
  const gain = Math.max(0, iterations - iteration - cost) * graph[to].flowRate;
  return [gain, cost];
}

export function solvePart1(input: Input): number {
  const graph = parseInput(input);

  // Generate all possible shortest paths
  const lookup: Record<string, Dijkstra> = Object.fromEntries(
    Object.keys(graph).map((x) => [x, dijkstra(graph, x)])
  );

  console.log(graph);

  let toOpen: string[] = Object.keys(graph).filter((x) => x !== "AA");
  const opened: Record<string, number> = {};
  let current = "AA";
  for (let n = 0; n < 30; n++) {
    let selected = "";
    let maxGain = 0;
    let maxGainCost = 0;
    for (const next of toOpen) {
      const [gain, cost] = calculateGainAndCost(
        graph,
        current,
        next,
        n,
        30,
        lookup
      );
      console.log(`From ${current} to ${next} costs ${cost} for ${gain} gain`);
      if (gain > maxGain) {
        selected = next;
        maxGain = gain;
        maxGainCost = cost;
      }
    }

    // No move found
    if (selected === "") {
      break;
    }

    console.log(`Selected ${selected}`);
    console.log();
    n += maxGainCost;
    toOpen = toOpen.filter((x) => x !== selected);
    opened[selected] = n;
    current = selected;
  }

  console.log(
    Object.entries(opened)
      .sort((a, b) => a[1] - b[1])
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n")
  );
  const total = Object.keys(opened)
    .map((x) => (30 - opened[x]) * graph[x].flowRate)
    .reduce(sum);

  return total;
}
