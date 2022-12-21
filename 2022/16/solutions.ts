import { sum } from "../../utils/deno/arrays.ts";
import { Input } from "../../utils/deno/input.ts";
import { combinations } from "https://deno.land/x/combinatorics/mod.ts";

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

function branch(
  graph: Graph,
  lookup: Record<string, Dijkstra>,
  toOpen: string[],
  opened: Record<string, number>,
  current: string,
  n: number
): [string[], Record<string, number>] {
  if (n >= 30) {
    return [[], opened];
  }

  let maxGain = 0;
  let selectedOpened = opened;
  let selectedToOpen = toOpen;
  for (const next of toOpen) {
    const [_, cost] = calculateGainAndCost(graph, current, next, n, 30, lookup);
    if (n + cost >= 30) {
      continue;
    }

    const [nextToOpen, nextOpened] = branch(
      graph,
      lookup,
      toOpen.filter((x) => x !== next),
      {
        ...opened,
        [next]: n + cost,
      },
      next,
      n + cost
    );

    const totalGain = Object.keys(nextOpened)
      .map((x) => (30 - nextOpened[x]) * graph[x].flowRate)
      .reduce(sum, 0);

    if (totalGain > maxGain) {
      maxGain = totalGain;
      selectedOpened = nextOpened;
      selectedToOpen = nextToOpen;
    }
  }

  return [selectedToOpen, selectedOpened];
}

export function solvePart1(input: Input): number {
  const graph = parseInput(input);

  // Generate all possible shortest paths
  const lookup: Record<string, Dijkstra> = Object.fromEntries(
    Object.keys(graph).map((x) => [x, dijkstra(graph, x)])
  );

  const [_, opened] = branch(
    graph,
    lookup,
    Object.keys(graph).filter((x) => x !== "AA" && graph[x].flowRate > 0),
    {},
    "AA",
    0
  );

  // console.log(
  //   Object.entries(opened)
  //     .sort((a, b) => a[1] - b[1])
  //     .map(([k, v]) => `${k}: ${v}`)
  //     .join("\n")
  // );

  const total = Object.keys(opened)
    .map((x) => (30 - opened[x]) * graph[x].flowRate)
    .reduce(sum, 0);

  return total;
}

export function solvePart2(input: Input): number {
  const graph = parseInput(input);

  // Generate all possible shortest paths
  const lookup: Record<string, Dijkstra> = Object.fromEntries(
    Object.keys(graph).map((x) => [x, dijkstra(graph, x)])
  );

  const toOpen = Object.keys(graph).filter(
    (x) => x !== "AA" && graph[x].flowRate > 0
  );

  let max = 0;
  let maxOpened: Record<string, number> = {};
  for (const toOpenA of combinations(toOpen, Math.ceil(toOpen.length / 2))) {
    const toOpenB = toOpen.filter((x) => !toOpenA.includes(x));

    const openedA = branch(graph, lookup, toOpenA, {}, "AA", 0)[1];
    const openedB = branch(graph, lookup, toOpenB, {}, "AA", 0)[1];

    const opened = { ...openedA, ...openedB };

    const total = Object.keys(opened)
      .map((x) => (26 - opened[x]) * graph[x].flowRate)
      .reduce(sum, 0);
    if (total > max) {
      max = total;
      maxOpened = opened;
    }
  }

  // console.log(
  //   Object.entries(maxOpened)
  //     .sort((a, b) => a[1] - b[1])
  //     .map(([k, v]) => `${k}: ${v}`)
  //     .join("\n")
  // );

  return max;
}
