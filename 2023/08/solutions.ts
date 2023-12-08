import { Input } from "../../utils/deno/input.ts";

type Node = [string, string];

type Graph = {
  moves: string;
  nodes: Record<string, Node>;
};

function parseGraph(input: Input): Graph {
  const moves = input.lines[0].trim();

  // AAA = (BBB, CCC)
  const entries: [string, Node][] = input.lines.slice(2).map((x) => {
    const [from, adjacent] = x.split(" = ");
    const [left, right] = adjacent.slice(1, -1).split(", ");
    return [from, [left, right]];
  });
  const nodes = Object.fromEntries(entries);

  return { moves, nodes };
}

function moves(graph: Graph, start: string, end: string): number {
  let currentNode = start;
  for (let i = 0; i < 20000; i++) {
    const move = graph.moves[i % graph.moves.length];
    currentNode = graph.nodes[currentNode][move === "L" ? 0 : 1];
    if (currentNode === end) {
      return i + 1;
    }
  }
  return -1;
}

export function solvePart1(input: Input): number {
  const graph = parseGraph(input);

  return moves(graph, "AAA", "ZZZ");
}

function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcm(...values: number[]): number {
  if (values.length === 2) {
    return (values[0] * values[1]) / gcd(values[0], values[1]);
  } else {
    return lcm(values[0], lcm(...values.slice(1)));
  }
}

export function solvePart2(input: Input): number {
  const graph = parseGraph(input);

  const startNodes = Object.keys(graph.nodes).filter((x) => x.endsWith("A"));
  const goalNodes = Object.keys(graph.nodes).filter((x) => x.endsWith("Z"));

  const steps = startNodes
    .map((x) => goalNodes.map((y) => moves(graph, x, y)))
    .map((x) => x.find((x) => x !== -1)!);

  return lcm(...steps);
}
